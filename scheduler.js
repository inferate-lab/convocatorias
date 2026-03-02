/**
 * IRIS — Scheduler Autónomo
 * Ejecuta escaneos globales cada X horas sin intervención humana.
 * 
 * PREREQUISITOS:
 *   npm install node-cron axios
 * 
 * EJECUCIÓN:
 *   node scheduler.js
 * 
 * CONFIGURACIÓN:
 *   Edita SCAN_INTERVAL_HOURS para ajustar la frecuencia.
 */

const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURACIÓN
// ============================================================
const CONFIG = {
    SCAN_INTERVAL_HOURS: 6,          // ← Ajusta la frecuencia aquí
    OUTPUT_DIR: './data/scans',
    LOG_FILE: './data/iris.log',
    NOTIFY_WEBHOOK: null,            // ← Pega tu webhook de Slack/Teams/Discord aquí (opcional)
};

// ============================================================
// LOGGER
// ============================================================
function log(level, message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    console.log(entry);
    fs.appendFileSync(CONFIG.LOG_FILE, entry + '\n');
}

// ============================================================
// BASE DE DATOS DE OPORTUNIDADES (misma que scanner.js)
// En producción: reemplazar con peticiones HTTP reales
// ============================================================
const MOCK_OPPORTUNITIES = [
    {
        id: "eu_horizon_2025_01",
        title: "EU Horizon Europe — Social Innovation & Community Resilience",
        donor: "European Commission",
        budget_usd: 850000,
        deadline: "2026-04-15",
        prestige: "AAA",
        friction: "medium",
        match_keywords: ["resiliencia", "innovación social", "comunidad"],
    },
    {
        id: "usaid_latin_2025_02",
        title: "USAID — Citizen Participation & Local Governance Fund",
        donor: "USAID",
        budget_usd: 500000,
        deadline: "2026-03-30",
        prestige: "AAA",
        friction: "low",
        match_keywords: ["participación", "gobernanza", "comunidad"],
    },
    {
        id: "noise_001",
        title: "Beca individual — Maestría en Gestión Cultural",
        donor: "OEI Colombia",
        budget_usd: 5000,
        deadline: "2026-03-15",
        prestige: "N/A",
        friction: "low",
        type: "beca_individual",
    },
];

// ============================================================
// TRIAGE ENGINE (versión Node.js)
// ============================================================
const PROFILE = {
    execution_capacity_usd: 125000,   // ← ACTUALIZAR con informe 2024 pág.15
    max_comfortable_usd: 200000,
    preferred_donors: ["EU", "USAID", "Gates", "IDB", "BID", "UNDP", "Skoll"],
    focus_keywords: ["comunidad", "conocimiento", "biblioteca", "tecnología", "resiliencia", "aprendizaje"],
    noise_max_budget: 10000,
    noise_types: ["beca_individual", "subsidio_persona"],
    min_budget_red_alert: 100000,
};

function classify(opp) {
    if (opp.budget_usd <= PROFILE.noise_max_budget) {
        return { level: 3, reason: `Presupuesto USD $${opp.budget_usd} < mínimo` };
    }
    if (opp.type && PROFILE.noise_types.includes(opp.type)) {
        return { level: 3, reason: `Tipo excluido: ${opp.type}` };
    }
    const isPreferredDonor = PROFILE.preferred_donors.some(d =>
        opp.donor.toLowerCase().includes(d.toLowerCase())
    );
    if (isPreferredDonor && opp.budget_usd >= PROFILE.min_budget_red_alert && opp.prestige === "AAA" && opp.friction !== "high") {
        return { level: 1, reason: "Triple A" };
    }
    return { level: 2, reason: "Seguimiento estratégico" };
}

function runTriage(opportunities) {
    const results = { level1: [], level2: [], level3: [], timestamp: new Date().toISOString() };
    opportunities.forEach(opp => {
        const classification = classify(opp);
        if (classification.level === 1) results.level1.push({ ...opp, classification });
        else if (classification.level === 2) results.level2.push({ ...opp, classification });
        else results.level3.push({ ...opp, classification });
    });
    return results;
}

// ============================================================
// NOTIFICACIÓN (Webhook opcional)
// ============================================================
async function sendNotification(results) {
    if (!CONFIG.NOTIFY_WEBHOOK) return;

    const message = {
        text: `🔴 *IRIS — Escaneo Completado*\n\n` +
            `• Alertas Rojas (Triple A): ${results.level1.length}\n` +
            `• Inteligencia de Fondo: ${results.level2.length}\n` +
            `• Descartados: ${results.level3.length}\n\n` +
            (results.level1.length > 0 ? `*🚨 ALERTA ROJA:* ${results.level1[0].title} — USD $${results.level1[0].budget_usd.toLocaleString()}` : '')
    };

    try {
        const axios = require('axios');
        await axios.post(CONFIG.NOTIFY_WEBHOOK, message);
        log('ok', 'Notificación enviada al webhook');
    } catch (err) {
        log('error', `Error enviando notificación: ${err.message}`);
    }
}

// ============================================================
// CICLO DE ESCANEO PRINCIPAL
// ============================================================
async function runScanCycle() {
    log('system', '━━━ Iniciando ciclo de escaneo global IRIS ━━━');

    // En producción: aquí harías peticiones HTTP reales a:
    // - https://ec.europa.eu/info/funding-tenders/
    // - https://www.grants.gov/
    // - https://www.usaid.gov/work-usaid/resources-us-organizations
    // - https://www.gatesfoundation.org/about/commitments/
    // Por ahora: usamos la base de datos mock
    const opportunities = MOCK_OPPORTUNITIES;
    log('system', `${opportunities.length} oportunidades encontradas en fuentes de datos`);

    const results = runTriage(opportunities);
    log('ok', `Triaje completo: ${results.level1.length} Rojas | ${results.level2.length} Fondo | ${results.level3.length} Ruido`);

    // Guardar resultados
    if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
        fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
    }
    const filename = path.join(CONFIG.OUTPUT_DIR, `scan-${Date.now()}.json`);
    fs.writeFileSync(filename, JSON.stringify(results, null, 2));
    log('system', `Resultados guardados en: ${filename}`);

    // Alertas rojas
    if (results.level1.length > 0) {
        log('red', '🔴 ALERTAS ROJAS DETECTADAS:');
        results.level1.forEach(opp => {
            log('red', `  → ${opp.title} | ${opp.donor} | USD $${opp.budget_usd.toLocaleString()}`);
        });
    }

    await sendNotification(results);
    log('system', `━━━ Ciclo completado. Próximo escaneo en ${CONFIG.SCAN_INTERVAL_HOURS}h ━━━\n`);
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

// Crear directorio de datos si no existe
if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });

log('system', `IRIS Scheduler Autónomo iniciado. Intervalo: cada ${CONFIG.SCAN_INTERVAL_HOURS} horas.`);
log('system', `Perfil: Capacidad USD $${PROFILE.max_comfortable_usd.toLocaleString()} | Donantes prioritarios: ${PROFILE.preferred_donors.join(', ')}`);

// Ejecutar inmediatamente al arrancar
runScanCycle();

// Programar el ciclo recurrente
const cronExpression = `0 */${CONFIG.SCAN_INTERVAL_HOURS} * * *`; // Cada X horas
cron.schedule(cronExpression, () => {
    runScanCycle();
});

log('system', `Scheduler activo. Expresión cron: "${cronExpression}"`);
log('system', 'Para detener: Ctrl+C');
log('system', 'Para personalizar: edita SCAN_INTERVAL_HOURS y NOTIFY_WEBHOOK en scheduler.js');
