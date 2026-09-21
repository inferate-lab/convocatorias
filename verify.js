'use strict';
/**
 * verify.js — Verificación activa de vigencia (lo que pediste explícitamente:
 * "identificar si ya no está activa la convocatoria y sacarla del sistema").
 *
 * purge.js ya elimina por fecha de cierre vencida (matemática simple, sin red).
 * Este script va más allá: para las convocatorias SIN fecha de cierre confiable
 * ("Revisar en plataforma", rolling, permanente) o que llevan tiempo sin verificarse,
 * vuelve a entrar realmente a la página fuente (vía Claude + web_search) y
 * confirma si la convocatoria sigue abierta. Si la fuente confirma que está cerrada,
 * se saca del sistema y se archiva con el motivo — no desaparece sin dejar rastro.
 *
 * Requiere ANTHROPIC_API_KEY. Sin ella, no verifica nada (no asume, no inventa).
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const CLOSED_FILE = path.join(__dirname, 'ruido.json');
const LOG_DIR = path.join(__dirname, 'data');
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';
const BATCH_SIZE = 8; // cuántas convocatorias se verifican por corrida (control de costo)
const RECHECK_AFTER_DAYS = 5; // no reverificar algo que ya se confirmó activo hace menos de esto

function readJson(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJsonAtomic(file, value) {
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(tmp, file);
}
function daysSince(iso) {
    if (!iso) return Infinity;
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return Infinity;
    return (Date.now() - then) / (1000 * 60 * 60 * 24);
}

function pickCandidates(all) {
    return all
        .filter(o => o.fuente_url)
        .filter(o => {
            const noDeadline = !o.fecha_cierre || o.fecha_cierre === 'Revisar en plataforma' || /rolling|permanente|open until filled/i.test(String(o.fecha_cierre));
            return noDeadline || daysSince(o.ultima_verificacion) >= RECHECK_AFTER_DAYS;
        })
        .sort((a, b) => daysSince(b.ultima_verificacion) - daysSince(a.ultima_verificacion))
        .slice(0, BATCH_SIZE);
}

function buildPrompt(candidates) {
    const list = candidates.map((o, i) => `${i + 1}. "${o.titulo}" — ${o.fuente_url}`).join('\n');
    return `Verifica, entrando realmente a cada URL con la herramienta de búsqueda/navegación web, si estas convocatorias siguen abiertas para postulación hoy:

${list}

Para cada una, confirma en la página real (no supongas por el título) si sigue vigente. Responde SOLO con un bloque JSON, sin texto adicional, con este formato exacto (un objeto por cada número de la lista, en el mismo orden):
[
  {"indice": 1, "estado": "activa|cerrada|no_verificable", "motivo": "string breve explicando qué viste en la página"}
]

"cerrada" solo si la propia página lo confirma explícitamente (dice cerrada, vencida, ya no acepta postulaciones, o el enlace ya no existe). "no_verificable" si no pudiste confirmar con certeza — en ese caso NO la marques como cerrada.`;
}

async function callClaude(prompt) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY no está definida.');
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: 2000,
            tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 16 }],
            messages: [{ role: 'user', content: prompt }]
        })
    });
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`API de Anthropic respondió ${response.status}: ${body.slice(0, 500)}`);
    }
    const data = await response.json();
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Respuesta sin JSON reconocible.');
    return JSON.parse(match[0]);
}

async function run() {
    const all = readJson(DATA_FILE, []);
    const closedArchive = readJson(CLOSED_FILE, []);
    const candidates = pickCandidates(all);

    const logEntry = { corrida_en: new Date().toISOString(), verificadas: 0, cerradas: 0, error: null };

    if (candidates.length === 0) {
        console.log('Nada pendiente de verificar en esta corrida.');
    } else {
        try {
            const results = await callClaude(buildPrompt(candidates));
            const now = new Date().toISOString();
            const closedIds = new Set();

            results.forEach(r => {
                const candidate = candidates[Number(r.indice) - 1];
                if (!candidate) return;
                const target = all.find(o => o.id === candidate.id);
                if (!target) return;
                target.ultima_verificacion = now;
                target.veces_verificada = (target.veces_verificada || 0) + 1;
                if (r.estado === 'cerrada') {
                    closedIds.add(target.id);
                    closedArchive.push({ ...target, motivo_descarte: `Verificación activa: ${r.motivo || 'confirmada cerrada en la fuente'}`, cerrada_el: now });
                }
            });

            const remaining = all.filter(o => !closedIds.has(o.id));
            writeJsonAtomic(DATA_FILE, remaining);
            writeJsonAtomic(CLOSED_FILE, closedArchive);

            logEntry.verificadas = candidates.length;
            logEntry.cerradas = closedIds.size;
            console.log(`Verificación real finalizada: ${candidates.length} revisadas, ${closedIds.size} confirmadas cerradas y removidas del sistema.`);
        } catch (error) {
            logEntry.error = error.message;
            console.error('Error en verificación real:', error.message);
        }
    }

    fs.mkdirSync(LOG_DIR, { recursive: true });
    const logFile = path.join(LOG_DIR, 'verify-log.json');
    const log = readJson(logFile, []);
    log.unshift(logEntry);
    writeJsonAtomic(logFile, log.slice(0, 100));

    if (logEntry.error) process.exitCode = 1;
}

run().catch(error => {
    console.error('Error fatal en verify.js:', error);
    process.exitCode = 1;
});
