const fs = require('fs');
const CUTOFF = '2026-05-05';
const path = 'scanner.js';
let src = fs.readFileSync(path, 'utf8');

// IDs to force-remove (verified closed by web search)
const FORCE_REMOVE = [
  'global_water_challenge',       // closed 2026-04-30
  'wise_education_prize_qatar',   // closed 2026-04-30
  'un_habitat_scroll_honour',     // closed 2026-04-30
  'world_habitat_award',          // closed 2026-05-01
  'uclg_metropolis_award',        // closed 2026-05-01
  'unodc_crime_prevention',       // closed 2026-05-01
  'hilton_humanitarian_prize',    // 2027-cycle, deadline was April 30
  'gsma_innovation',              // closed April 6 (verified)
  'skoll_foundation_2026',        // 2026 winners already announced
];

// Fix verified deadlines
src = src.replace("fecha_cierre: '2026-06-25'", "fecha_cierre: '2026-06-22'");  // Zayed verified June 22
src = src.replace("fecha_cierre: '2026-10-15'", "fecha_cierre: '2026-09-30'"); // Suqia verified Sept 30

// Split into blocks and filter
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
    const forced = FORCE_REMOVE.some(r => id.startsWith(r));

    if (expired || forced) {
      removed.push(id + ' (' + fecha + ')');
    } else {
      result.push(...block);
    }
  } else {
    result.push(lines[i]);
    i++;
  }
}

fs.writeFileSync(path, result.join('\n'));
console.log('PURGADOS (' + removed.length + '):');
removed.forEach(r => console.log('  - ELIMINADO: ' + r));
console.log('DONE. Archivo actualizado.');
