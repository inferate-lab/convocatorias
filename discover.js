'use strict';
/**
 * discover.js — Motor de descubrimiento REAL (reemplaza fetchOpenDataAPI/dummyResponse de scanner.js)
 *
 * A diferencia del "crawler" anterior (que devolvía datos inventados con Date.now()),
 * este script hace una llamada real a la API de Claude con la herramienta de búsqueda
 * web activada, para encontrar convocatorias vigentes que aún no estén en data.json.
 *
 * Requiere la variable de entorno ANTHROPIC_API_KEY (secreto de GitHub Actions).
 * No debe correr sin ella: si falta, termina con error explícito en vez de inventar datos.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const LOG_DIR = path.join(__dirname, 'data');
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';
const MAX_NEW_PER_RUN = 12;

const { EPM_PLATFORM, DIMENSIONES } = require('./scanner.js');

function readJson(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJsonAtomic(file, value) {
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(tmp, file);
}

function buildPrompt(existing) {
    const knownUrls = existing.map(o => o.fuente_url).filter(Boolean).slice(0, 200);
    const dims = Object.values(DIMENSIONES).map(d => `${d.icon} ${d.label}: ${d.desc}`).join('\n');
    const pivots = Object.entries(EPM_PLATFORM.pivot_logic).map(([k, v]) => `- ${k}: ${v}`).join('\n');

    return `Eres el motor de búsqueda de CENTINELA, el radar de convocatorias de financiamiento internacional de la ${EPM_PLATFORM.name} (${EPM_PLATFORM.territory}).

PERFIL DE LA ORGANIZACIÓN (para evaluar afinidad, no para descartar):
Tipo: ${EPM_PLATFORM.type}
Activos físicos: ${EPM_PLATFORM.activos.fisicos.join(', ')}
Capacidad de ejecución autónoma: hasta USD ${EPM_PLATFORM.financiero.max_autonomo_usd.toLocaleString('en-US')}; con consorcio hasta USD ${EPM_PLATFORM.financiero.con_consorcio_usd.toLocaleString('en-US')}

DIMENSIONES DE INTERÉS:
${dims}

LÓGICA DE PIVOTE (cómo esta organización puede aplicar a convocatorias de distintos temas):
${pivots}

TAREA: Usa la herramienta de búsqueda web para encontrar convocatorias, becas institucionales (no individuales), premios, fondos concursables o llamados a propuestas ABIERTOS HOY, de organismos multilaterales, fundaciones internacionales, agencias de cooperación bilateral, bancos de desarrollo (BID, CAF, Banco Mundial), o programas corporativos ESG, para los que Colombia sea elegible (o no esté explícitamente excluida).

Además de tu búsqueda general, busca específicamente novedades relacionadas con estas plataformas y organismos (no las scrapees directamente — búscalas, ya que algunas bloquean el acceso automatizado o cargan su contenido con JavaScript):
- Grant Hub Latam (agregador de convocatorias para Latinoamérica)
- APC Colombia — convocatorias de cooperación internacional (portalservicios-apccolombia.gov.co respeta robots.txt: no lo rastrees directamente, solo busca sobre sus convocatorias vigentes por otras fuentes que las mencionen: noticias, boletines, redes de cooperación)
- Otras plataformas agregadoras de cooperación internacional para LATAM que encuentres relevantes (repórtalas si detectas alguna nueva y útil, junto con su URL, para evaluar agregarla como fuente directa en el futuro)

REGLAS:
- NO incluyas becas para personas individuales.
- NO repitas ninguna de estas URLs ya conocidas: ${knownUrls.slice(0, 40).join(', ') || '(ninguna todavía)'}
- Verifica en la propia página fuente que la convocatoria siga abierta antes de reportarla.
- Máximo ${MAX_NEW_PER_RUN} resultados, prioriza los de mayor afinidad y los de cierre más próximo.
- Si no encuentras nada nuevo y genuino, responde con una lista vacía. NUNCA inventes una oportunidad.

Responde ÚNICAMENTE con un bloque JSON (sin texto antes ni después) con este formato exacto:
{
  "oportunidades": [
    {
      "titulo": "string",
      "donante": "string",
      "fuente": "string (nombre del portal o institución donde lo encontraste)",
      "sector": "string",
      "dimension": "ambiental|social|educacion|cultural|general",
      "presupuesto_usd": number o null,
      "fecha_cierre": "YYYY-MM-DD o null si es rolling/permanente",
      "estado": "string breve",
      "pais_elegible": "string",
      "afinidad_pivot": number (0-100),
      "pivot": "string: cómo esta organización pivotaría para aplicar",
      "obstaculo": "string: principal obstáculo para postular",
      "fuente_url": "URL real y verificable de la fuente",
      "tags": ["string"],
      "tipo": "roja|fondo|reconocimiento"
    }
  ],
  "fuentes_sugeridas": [
    {"nombre": "string", "url": "string", "por_que": "string breve: por qué valdría la pena agregarla como fuente fija"}
  ]
}`;
}

async function callClaude(prompt) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY no está definida. No se puede ejecutar el descubrimiento real.');

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: 4000,
            tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 12 }],
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`API de Anthropic respondió ${response.status}: ${body.slice(0, 500)}`);
    }
    const data = await response.json();
    const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    const match = textBlocks.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('La respuesta de la IA no contenía un JSON reconocible.');
    const parsed = JSON.parse(match[0]);
    return {
        oportunidades: Array.isArray(parsed.oportunidades) ? parsed.oportunidades : [],
        fuentes_sugeridas: Array.isArray(parsed.fuentes_sugeridas) ? parsed.fuentes_sugeridas : []
    };
}

function slug(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

async function run() {
    const existing = readJson(DATA_FILE, []);
    const prompt = buildPrompt(existing);

    let found = [];
    let sugeridas = [];
    let errorMsg = null;
    try {
        const result = await callClaude(prompt);
        found = result.oportunidades;
        sugeridas = result.fuentes_sugeridas;
    } catch (error) {
        errorMsg = error.message;
        console.error('Error en descubrimiento real:', errorMsg);
    }

    const knownUrls = new Set(existing.map(o => (o.fuente_url || '').toLowerCase()));
    const nuevas = found
        .filter(o => o && o.titulo && o.fuente_url && !knownUrls.has(String(o.fuente_url).toLowerCase()))
        .slice(0, MAX_NEW_PER_RUN)
        .map(o => ({
            id: `discovered-${slug(o.titulo)}-${Date.now().toString(36)}`,
            titulo: o.titulo,
            donante: o.donante || '',
            fuente: o.fuente || 'Descubrimiento IA (búsqueda en vivo)',
            sector: o.sector || '',
            dimension: o.dimension || 'general',
            presupuesto_usd: Number(o.presupuesto_usd) || 0,
            fecha_cierre: o.fecha_cierre || 'Revisar en plataforma',
            estado: o.estado || 'ABIERTA',
            pais_elegible: o.pais_elegible || '',
            afinidad_pivot: Math.max(0, Math.min(100, Number(o.afinidad_pivot) || 60)),
            pivot: o.pivot || '',
            obstaculo: o.obstaculo || '',
            fuente_url: o.fuente_url,
            tags: Array.isArray(o.tags) ? o.tags : [],
            tipo: ['roja', 'fondo', 'reconocimiento'].includes(o.tipo) ? o.tipo : 'fondo',
            rastreado: true,
            origen_rastreo: 'discover-ia',
            metodo_deteccion: 'busqueda_ia_en_vivo',
            primera_deteccion: new Date().toISOString(),
            analizado_ia: true
        }));

    writeJsonAtomic(DATA_FILE, [...existing, ...nuevas]);

    // Fuentes nuevas que la IA sugiere agregar como rastreo fijo — quedan para revisión
    // humana en scraper.js, nunca se agregan solas como fuente automática.
    if (sugeridas.length > 0) {
        const suggFile = path.join(LOG_DIR, 'fuentes-sugeridas.json');
        const suggLog = readJson(suggFile, []);
        const knownSugg = new Set(suggLog.map(s => (s.url || '').toLowerCase()));
        sugeridas.forEach(s => {
            if (s.url && !knownSugg.has(s.url.toLowerCase())) {
                suggLog.push({ ...s, sugerida_el: new Date().toISOString(), revisada: false });
            }
        });
        writeJsonAtomic(suggFile, suggLog);
    }

    fs.mkdirSync(LOG_DIR, { recursive: true });
    const logFile = path.join(LOG_DIR, 'discover-log.json');
    const log = readJson(logFile, []);
    log.unshift({
        corrida_en: new Date().toISOString(),
        encontradas_por_ia: found.length,
        nuevas_agregadas: nuevas.length,
        fuentes_sugeridas: sugeridas.length,
        error: errorMsg
    });
    writeJsonAtomic(logFile, log.slice(0, 100));

    console.log(`Descubrimiento real finalizado: ${found.length} resultado(s) de la IA, ${nuevas.length} nueva(s) agregada(s), ${sugeridas.length} fuente(s) nueva(s) sugerida(s) para revisión.`);
    if (errorMsg) {
        console.error(`Nota: hubo un error, no se agregó nada inventado: ${errorMsg}`);
        process.exitCode = 1;
    }
}

run().catch(error => {
    console.error('Error fatal en discover.js:', error);
    process.exitCode = 1;
});
