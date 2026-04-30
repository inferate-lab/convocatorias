const fs = require('fs');
const scannerPath = 'c:/Users/LENOVO/.gemini/antigravity/scratch/inteligencia-fondos/scanner.js';
let content = fs.readFileSync(scannerPath, 'utf8');

// Find all items block in GLOBAL_RADAR.
// An item starts with "    {" and ends with "    },"
// Let's use a regex to match the inner content.
// Since Javascript RegExp doesn't handle nested braces easily if nested,
// we'll just check if it contains a fecha_cierre before 2026-04-21.

const lines = content.split('\n');
let newLines = [];
let i = 0;
while (i < lines.length) {
    if (lines[i].trim() === '{') {
        // Collect block to see if it's an object in GLOBAL_RADAR
        let blockLines = [lines[i]];
        let blockStart = i;
        let pcount = 1;
        i++;
        while (i < lines.length && pcount > 0) {
            blockLines.push(lines[i]);
            if (lines[i].indexOf('{') !== -1) pcount += (lines[i].match(/\{/g) || []).length;
            if (lines[i].indexOf('}') !== -1) pcount -= (lines[i].match(/\}/g) || []).length;
            i++;
        }
        // block collected
        let blockText = blockLines.join('\n');
        let m = blockText.match(/fecha_cierre:\s*'([^']+)'/);
        if (m) {
            let fecha = m[1];
            if (fecha < '2026-04-29') {
                console.log('REMOVING expired object with fecha_cierre: ' + fecha);
                // Also remove trailing comma if present outside the block, wait, the block ends with }
                // So the next line might be `,` or `},` if the brace was on the same line as comma
                // Wait, if we drop this block, we shouldn't push it.
                continue;
            }
        }
        // If not dropped, push blockLines to newLines
        newLines.push(...blockLines);
    } else {
        newLines.push(lines[i]);
        i++;
    }
}

fs.writeFileSync(scannerPath, newLines.join('\n'));
console.log('Clean completed.');
