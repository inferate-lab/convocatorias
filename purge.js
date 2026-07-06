const fs = require('fs');

// Carga de la persistencia de datos actual
const rawData = fs.readFileSync('./data.json');
const convocatorias = JSON.parse(rawData);

// Control de tiempo basado en la fecha actual de operación
const fechaCorte = new Date('2026-07-06'); 

const vigentes = [];
const ruidoDescartado = [];

convocatorias.forEach(conv => {
    if (!conv.fecha_cierre || conv.fecha_cierre === 'N/D') {
        vigentes.push(conv); // Mantener fondos continuos o de ventanilla abierta
    } else {
        const fechaCierre = new Date(conv.fecha_cierre);
        if (fechaCierre >= fechaCorte) {
            vigentes.push(conv);
        } else {
            conv.motivo_descarte = "Fecha expirada";
            ruidoDescartado.push(conv);
        }
    }
});

// Escritura y segregación de bases de datos para consumo de la interfaz
fs.writeFileSync('./data.json', JSON.stringify(vigentes, null, 2));
fs.writeFileSync('./ruido.json', JSON.stringify(ruidoDescartado, null, 2));
console.log(`Proceso finalizado. Vigentes: ${vigentes.length} | Descartados: ${ruidoDescartado.length}`);
