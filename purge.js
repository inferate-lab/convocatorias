const fs = require('fs');

// Leer datos crudos
// Como el repositorio usa scanner.js para almacenar GLOBAL_RADAR, 
// extraemos el arreglo directamente
const { GLOBAL_RADAR } = require('./scanner.js');
const convocatorias = GLOBAL_RADAR || [];

// Fecha estricta del sistema para el corte
const fechaCorte = new Date('2026-07-02'); 

const vigentes = [];
const ruidoDescartado = [];

convocatorias.forEach(conv => {
    if (!conv.fecha_cierre || conv.fecha_cierre === 'N/D') {
        vigentes.push(conv); // Ventanilla abierta
    } else {
        const fechaStr = conv.fecha_cierre.toLowerCase();
        if (fechaStr.includes('rolling') || fechaStr.includes('open') || fechaStr.includes('permanente')) {
            vigentes.push(conv);
            return;
        }
        
        const fechaCierre = new Date(conv.fecha_cierre);
        if (fechaCierre >= fechaCorte) {
            vigentes.push(conv);
        } else {
            // Se envía a ruido descartado con motivo
            conv.motivo_descarte = "Fecha expirada";
            ruidoDescartado.push(conv);
        }
    }
});

// Escribir ambos archivos para que la web pueda leer el ruido
// Actualizamos el scanner.js preservando el resto del archivo y reemplazando solo el array
let src = fs.readFileSync('./scanner.js', 'utf8');
const radarStart = src.indexOf('const GLOBAL_RADAR = [');
const radarEnd = src.indexOf('];\n\nconst EPM_PLATFORM');
if(radarStart !== -1 && radarEnd !== -1) {
    const newRadar = 'const GLOBAL_RADAR = ' + JSON.stringify(vigentes, null, 4);
    src = src.substring(0, radarStart) + newRadar + src.substring(radarEnd + 1);
    fs.writeFileSync('./scanner.js', src);
}

fs.writeFileSync('./ruido.json', JSON.stringify(ruidoDescartado, null, 2));
console.log(`Purga completada: ${vigentes.length} vigentes, ${ruidoDescartado.length} descartadas.`);
