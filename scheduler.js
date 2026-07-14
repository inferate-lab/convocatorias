'use strict';

const cron = require('node-cron');
const { spawn } = require('child_process');
const path = require('path');

const ROOT = __dirname;
const CRON_EXPRESSION = process.env.SCRAPER_CRON || '0 */6 * * *';
let running = false;

function runScript(script) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [path.join(ROOT, script)], {
            cwd: ROOT,
            stdio: 'inherit'
        });
        child.once('error', reject);
        child.once('exit', code => code === 0
            ? resolve()
            : reject(new Error(`${script} terminó con código ${code}`)));
    });
}

async function runPipeline() {
    if (running) {
        console.warn('Se omite el ciclo: ya hay un rastreo en ejecución.');
        return;
    }
    running = true;
    console.log(`[${new Date().toISOString()}] Iniciando ciclo real de rastreo.`);
    try {
        await runScript('scraper.js');
        await runScript('purge.js');
        console.log(`[${new Date().toISOString()}] Ciclo completado.`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Ciclo fallido: ${error.message}`);
        process.exitCode = 1;
    } finally {
        running = false;
    }
}

if (!cron.validate(CRON_EXPRESSION)) {
    console.error(`Expresión cron inválida: ${CRON_EXPRESSION}`);
    process.exit(1);
}

cron.schedule(CRON_EXPRESSION, runPipeline, { timezone: 'America/Bogota' });
runPipeline();
console.log(`Scheduler activo: "${CRON_EXPRESSION}" (America/Bogota).`);
