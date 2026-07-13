'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');
const TEMP_FILE = path.join(__dirname, 'data.json.tmp');
const REQUEST_TIMEOUT_MS = 15000;

function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        const request = client.get(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'CENTINELA-Convocatorias/5.1'
            }
        }, response => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                response.resume();
                fetchAPI(new URL(response.headers.location, url).toString()).then(resolve, reject);
                return;
            }

            if (response.statusCode < 200 || response.statusCode >= 300) {
                response.resume();
                reject(new Error(`HTTP ${response.statusCode} al consultar ${url}`));
                return;
            }

            let raw = '';
            response.setEncoding('utf8');
            response.on('data', chunk => {
                raw += chunk;
                if (raw.length > 10 * 1024 * 1024) {
                    request.destroy(new Error('La respuesta supera el límite de 10 MB'));
                }
            });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(raw));
                } catch (error) {
                    reject(new Error(`JSON inválido en ${url}: ${error.message}`));
                }
            });
        });

        request.setTimeout(REQUEST_TIMEOUT_MS, () => {
            request.destroy(new Error(`Tiempo de espera agotado al consultar ${url}`));
        });
        request.on('error', reject);
    });
}

function normalizeOpportunity(item, sourceIndex = 0) {
    const titulo = item.titulo || item.Título || item.Titulo || item.title || '';
    const fechaCierre = item.fecha_cierre || item['Fecha de Vencimiento'] || item.Fecha_Vencimiento || item.deadline || '';
    const fuenteUrl = item.fuente_url || item.Link || item.link || item.url || '';
    if (!titulo) return null;

    return {
        ...item,
        id: item.id || `feed_${sourceIndex}_${titulo.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
        titulo,
        donante: item.donante || item.Fuente || item.source || 'Fuente externa',
        fuente: item.fuente || item.Fuente || item.source || 'Fuente externa',
        sector: item.sector || item.categoria || item.category || 'General',
        presupuesto_usd: Number(item.presupuesto_usd || item.amount_usd || 0),
        fecha_cierre: fechaCierre,
        estado: item.estado || item.status || 'ACTIVA',
        pais_elegible: item.pais_elegible || item.country || 'Por verificar',
        afinidad_pivot: Number(item.afinidad_pivot || 50),
        pivot: item.pivot || item.Descripción || item.Descripcion || item.description || '',
        obstaculo: item.obstaculo || 'Validar requisitos en la fuente oficial.',
        fuente_url: fuenteUrl,
        tags: Array.isArray(item.tags) ? item.tags : ['RASTREADOR'],
        tipo: item.tipo || 'fondo'
    };
}

function isActive(item, today) {
    if (!item.fecha_cierre) return true;
    const value = String(item.fecha_cierre).trim().toLowerCase();
    if (['rolling', 'permanente', 'open', 'open until filled'].some(token => value.includes(token))) {
        return true;
    }

    const deadline = new Date(`${value}T23:59:59Z`);
    return Number.isNaN(deadline.getTime()) || deadline >= today;
}

function deduplicate(items) {
    const seen = new Map();
    for (const item of items) {
        const key = (item.fuente_url || item.titulo).trim().toLowerCase();
        if (!key) continue;
        const current = seen.get(key);
        if (!current || item.afinidad_pivot > current.afinidad_pivot) {
            seen.set(key, item);
        }
    }
    return [...seen.values()];
}

function extractFeedItems(payload) {
    if (Array.isArray(payload)) return payload;
    for (const key of ['results', 'items', 'data', 'opportunities', 'convocatorias']) {
        if (Array.isArray(payload && payload[key])) return payload[key];
    }
    return [];
}

async function ejecutarRastreador() {
    console.log('Iniciando rastreador de oportunidades...');

    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const feedUrls = (process.env.SCRAPER_FEEDS || '')
        .split(',')
        .map(value => value.trim())
        .filter(Boolean);

    const external = [];
    const failures = [];

    for (const [index, url] of feedUrls.entries()) {
        try {
            const payload = await fetchAPI(url);
            external.push(...extractFeedItems(payload).map(item => normalizeOpportunity(item, index)).filter(Boolean));
            console.log(`Fuente consultada correctamente: ${url}`);
        } catch (error) {
            failures.push({ url, error: error.message });
            console.warn(`Fuente omitida: ${error.message}`);
        }
    }

    const today = new Date();
    const active = deduplicate(
        [...existing, ...external]
            .map((item, index) => normalizeOpportunity(item, index))
            .filter(Boolean)
            .filter(item => isActive(item, today))
    ).sort((a, b) => b.afinidad_pivot - a.afinidad_pivot);

    fs.writeFileSync(TEMP_FILE, `${JSON.stringify(active, null, 2)}\n`, 'utf8');
    fs.renameSync(TEMP_FILE, DATA_FILE);

    console.log(`Rastreo exitoso: ${active.length} oportunidades vigentes; ${external.length} registros externos procesados.`);
    if (!feedUrls.length) {
        console.log('SCRAPER_FEEDS no está configurado; se aplicaron filtrado y deduplicación al radar existente.');
    }
    if (failures.length) {
        console.warn(`${failures.length} fuente(s) externa(s) no respondieron; se conservaron los datos válidos existentes.`);
    }
}

ejecutarRastreador().catch(error => {
    console.error('Error fatal al ejecutar el rastreador:', error);
    if (fs.existsSync(TEMP_FILE)) fs.unlinkSync(TEMP_FILE);
    process.exitCode = 1;
});
