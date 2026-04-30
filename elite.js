const fs = require('fs');
let content = fs.readFileSync('c:/Users/LENOVO/.gemini/antigravity/scratch/inteligencia-fondos/scanner.js', 'utf8');

const newItems = `    {
        id: 'suqia_uae_water',
        titulo: 'Mohammed bin Rashid Al Maktoum Global Water Award',
        donante: 'Suqia UAE',
        fuente: 'Portal Oficial Suqia',
        sector: 'Agua / Medio Ambiente',
        dimension: 'ambiental',
        presupuesto_usd: 1000000,
        fecha_cierre: '2026-10-15',
        estado: 'VENTANA ABIERTA - Premio',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 90,
        pivot: 'Premios de agua -> Gestión Ambiental. Plantas de EPM y comunidades pueden postular.',
        obstaculo: 'Ninguno.',
        fuente_url: 'https://www.suqia.ae/',
        tags: ['NUEVA', 'OBLIGATORIA', 'AMBIENTAL', 'PREMIO'],
        tipo: 'roja'
    },
    {
        id: 'zayed_sustainability',
        titulo: 'Zayed Sustainability Prize',
        donante: 'UAE Government',
        fuente: 'Zayed Prize Portal',
        sector: 'Agua, Energía y Salud',
        dimension: 'social',
        presupuesto_usd: 600000,
        fecha_cierre: '2026-06-25',
        estado: 'ABIERTA',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 90,
        pivot: 'Zayed / Sura -> Gestión Social.',
        obstaculo: 'Competencia alta.',
        fuente_url: 'https://zayedsustainabilityprize.com/',
        tags: ['NUEVA', 'OBLIGATORIA', 'SOCIAL', 'PREMIO'],
        tipo: 'roja'
    },
    {
        id: 'iwa_network',
        titulo: 'IWA Bio-cluster and Innovation Awards',
        donante: 'International Water Association',
        fuente: 'IWA Network Portal',
        sector: 'Agua / Innovación',
        dimension: 'ambiental',
        presupuesto_usd: 0,
        fecha_cierre: '2026-08-30',
        estado: 'NOMINACIONES ABIERTAS',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 85,
        pivot: 'Premios de agua -> Gestión Ambiental.',
        obstaculo: 'Requiere nominación.',
        fuente_url: 'https://iwa-network.org/',
        tags: ['NUEVA', 'OBLIGATORIA', 'AMBIENTAL', 'AWARD'],
        tipo: 'fondo'
    },
    {
        id: 'scotiabank_rise',
        titulo: 'Scotiabank Rise (Net-Zero / Impacto Social)',
        donante: 'Scotiabank',
        fuente: 'Fondos Bancarios - Scotiabank',
        sector: 'Social / Medio Ambiente',
        dimension: 'general',
        presupuesto_usd: 200000,
        fecha_cierre: '2026-07-10',
        estado: 'ABIERTA',
        pais_elegible: 'Latam ✓',
        afinidad_pivot: 88,
        pivot: 'Gestión social y proyectos ESG EPM.',
        obstaculo: 'Reporte ESG detallado.',
        fuente_url: 'https://www.scotiabank.com/',
        tags: ['NUEVA', 'OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'fundacion_sura',
        titulo: 'Fundación SURA - Gestión Cultural',
        donante: 'Fundación SURA',
        fuente: 'Fundación SURA Portal',
        sector: 'Cultura',
        dimension: 'cultural',
        presupuesto_usd: 150000,
        fecha_cierre: '2026-05-30',
        estado: 'CONVOCATORIA ABIERTA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 95,
        pivot: 'Zayed / Sura -> Gestión Cultural.',
        obstaculo: 'Requiere alianzas locales.',
        fuente_url: 'https://www.fundacionsura.com/',
        tags: ['NUEVA', 'OBLIGATORIA', 'CULTURAL'],
        tipo: 'roja'
    },
`;

content = content.replace('const GLOBAL_RADAR = [', 'const GLOBAL_RADAR = [\n' + newItems);

fs.writeFileSync('c:/Users/LENOVO/.gemini/antigravity/scratch/inteligencia-fondos/scanner.js', content);
console.log('Elite URLs injected.');
