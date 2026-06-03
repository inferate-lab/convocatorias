const fs = require('fs');
const path = require('path');

// Usar fecha actual en lugar de hardcodeada
const CUTOFF = new Date().toISOString().split('T')[0];
const SCANNER_FILE = './scanner.js';
const LOG_FILE = './purge.log';

// IDs a eliminar (verificados vencidos)
const FORCE_REMOVE = [
  'global_water_challenge',
  'wise_education_prize_qatar',
  'un_habitat_scroll_honour',
  'world_habitat_award',
  'uclg_metropolis_award',
  'unodc_crime_prevention',
  'hilton_humanitarian_prize',
  'gsma_innovation',
  'skoll_foundation_2026',
];

function log(level, msg) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${level}] ${msg}`;
  console.log(entry);
  fs.appendFileSync(LOG_FILE, entry + '\n');
}

try {
  log('INFO', 'Iniciando purga. CUTOFF: ' + CUTOFF);
  let src = fs.readFileSync(SCANNER_FILE, 'utf8');
  const originalSize = src.length;

  // Correcciones de fecha verificadas
  src = src.replace("fecha_cierre: '2026-06-25'", "fecha_cierre: '2026-06-22'");
  src = src.replace("fecha_cierre: '2026-10-15'", "fecha_cierre: '2026-09-30'");

  const lines = src.split('\n');
  let result = [];
  let i = 0;
  let removed = [];

  while (i < lines.length) {
    if (/^\s{4}\{/.test(lines[i])) {
      let block = [];
      let depth = 0;
      while (i < lines.length) {
        const line = lines[i];
        depth += (line.match(/\{/g) || []).length;
        depth -= (line.match(/\}/g) || []).length;
        block.push(line);
        i++;
        if (depth <= 0) break;
      }
      const blockStr = block.join('\n');
      const idMatch = blockStr.match(/id:\s*'([^']+)'/);
      const dateMatch = blockStr.match(/fecha_cierre:\s*'([^']+)'/);
      const id = idMatch ? idMatch[1] : '';
      const fecha = dateMatch ? dateMatch[1] : '';

      const lower = fecha.toLowerCase();
      const isRolling = lower.includes('rolling') || lower.includes('open until') || lower.includes('permanente');
      const expired = fecha && fecha < CUTOFF && !isRolling;
      const forced = FORCE_REMOVE.some(r => id.includes(r));

      if (expired || forced) {
        removed.push(id + ' (' + fecha + ')');
        log('REMOVED', id + ' - ' + (forced ? 'LISTA FUERZA' : 'VENCIDA'));
      } else {
        result.push(...block);
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  const newContent = result.join('\n').replace(/\n\n\n+/g, '\n\n');
  fs.writeFileSync(SCANNER_FILE, newContent);
  
  log('SUCCESS', `Purga completada. Eliminadas: ${removed.length}`);
  log('INFO', `Tamaño: ${originalSize} → ${newContent.length} bytes`);
  
  if (removed.length > 0) {
    log('DETAILS', 'ELIMINADAS: ' + removed.join(', '));
  }

} catch (err) {
  log('ERROR', err.message);
  process.exit(1);
}
