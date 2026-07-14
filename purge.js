'use strict';

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const NOISE_FILE = path.join(__dirname, 'ruido.json');
const STATUS_FILE = path.join(__dirname, 'data', 'scraper-status.json');
const today = new Date();
today.setHours(0, 0, 0, 0);

function parseDeadline(value) {
    if (!value || ['N/D', 'Revisar en plataforma'].includes(value)) return null;
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T23:59:59`)
        : new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function writeJson(file, value) {
    const temporary = `${file}.tmp`;
    fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(temporary, file);
}

const opportunities = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const active = [];
const expired = [];

for (const opportunity of opportunities) {
    const deadline = parseDeadline(opportunity.fecha_cierre);
    if (!deadline || deadline >= today) {
        active.push(opportunity);
    } else {
        expired.push({ ...opportunity, motivo_descarte: 'Fecha expirada' });
    }
}

writeJson(DATA_FILE, active);
writeJson(NOISE_FILE, expired);

if (fs.existsSync(STATUS_FILE)) {
    const status = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    status.active_opportunities = active.length;
    status.scraped_opportunities = active.filter(item => item.rastreado).length;
    status.expired_removed = expired.length;
    writeJson(STATUS_FILE, status);
}

console.log(`Proceso finalizado. Vigentes: ${active.length} | Descartados: ${expired.length}`);
