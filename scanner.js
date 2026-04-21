/**
 * ═══════════════════════════════════════════════════════════════
 * IRIS — Scanner Engine v3.0
 * PROTOCOLO: EXPLORADOR DE FRONTERA GLOBAL (MÁXIMA ESCALA)
 * ═══════════════════════════════════════════════════════════════
 *
 * REGLAS DE ORO v3:
 * 1. El Informe 2024 es SOLO un catálogo de activos. NUNCA un filtro de descarte.
 * 2. El ÚNICO descarte automático: becas individuales.
 * 3. La Fundación EPM es una PLATAFORMA POLIVALENTE. Pregunta siempre:
 *    "¿Cómo adaptamos nuestra infraestructura para ganar esto?"
 * 4. Si existe en el mundo y Colombia no está excluida → entra al radar.
 * 5. EQUILIBRIO TRIPARTITO: Ambiental 🌿 · Tecnológico ⚡ · Social 🤝
 * 6. No reportes "links". Reporta "Movimientos Estratégicos".
 * 7. Fuentes: TED, Grants.gov, UNGM, IATI, family offices, academias
 *    nacionales globales, multinacionales de descarbonización, fondos
 *    geopolíticos post-cumbre, redes de inversión de impacto.
 */

// ============================================================
// PERFIL EPM v2 — Plataforma Polivalente (NO filtro de descarte)
// ============================================================
// DIMENSIONES TRIPARTITAS — Explorador de Frontera Global
const DIMENSIONES = {
    ambiental: { label: 'Gestión Ambiental', icon: '🌿', color: '#10B981', desc: 'Economía circular, recursos hídricos, clima, biodiversidad' },
    social: { label: 'Gestión Social', icon: '🤝', color: '#8B5CF6', desc: 'Desarrollo territorial, convivencia, paz, derechos' },
    educacion: { label: 'Educación', icon: '📚', color: '#06B6D4', desc: 'STEM, robótica, bibliotecas, formación' },
    cultural: { label: 'Gestión Cultural', icon: '🎭', color: '#F59E0B', desc: 'Patrimonio, memoria, artes, eventos' },
    general: { label: 'General', icon: '🌐', color: '#6B7280', desc: 'Oportunidades valiosas multisectoriales' }
};

const EPM_PLATFORM = {
    name: 'Fundación Grupo EPM',
    territory: 'Medellín / Antioquia / Colombia',
    type: 'Plataforma polivalente de alto impacto social, ambiental y tecnológico',

    // Activos físicos reales — base para PIVOT de cualquier proyecto
    activos: {
        fisicos: ['UVAs (Unidades de Vida Articulada)', 'Bibliotecas comunitarias', 'Centros de conocimiento', 'Plantas de tratamiento', 'Infraestructura de agua y energía'],
        capital_humano: ['Equipo técnico interdisciplinario', 'Red comunitaria territorial', 'Alianzas académicas (EAFIT, UdeA)', 'Voluntariado corporativo EPM'],
        digital: ['Plataforma de gestión del conocimiento', 'Conectividad en UVAs', 'Base de datos de impacto 2024'],
        track_record: ['10+ años de operación', '15.000+ beneficiarios 2024', 'Estados financieros auditados'],
        ingeniería: ['Infraestructura energética renovable', 'Plantas de tratamiento de agua', 'Red de distribución eléctrica', 'Laboratorios de calidad hídrica']
    },

    // Capacidad de PIVOTAJE — cómo adaptamos cada activo a nuevas convocatorias
    pivot_logic: {
        'aceleracion_social': 'Las UVAs son el ecosistema de innovación social más documentado de Latam. Base de aterrizaje ideal para aceleradoras.',
        'conservacion_ambiental': 'Presencia territorial en cuencas hídricas de Antioquia + gestión de EPM en agua y energía = garante ambiental para donantes.',
        'cultura_patrimonio': 'Red de Bibliotecas EPM = infraestructura cultural viva con impacto medible en 15K beneficiarios.',
        'tecnologia_digital': 'UVAs + conectividad = laboratorios territoriales de IA, robótica y tecnología aplicada.',
        'seguridad_urbana': 'El modelo UVA de urbanismo transformador demostró reducción de crimen en Medellín. Replicable.',
        'salud_mental': 'Bibliotecas como centros de tejido social = evidencia de impacto en reducción de soledad y violencia.',
        'agua_biotecnologia': 'EPM gestiona agua potable para millones en Colombia. Activo único para laboratorios de potabilización.',
        'robotica_ia': 'Los centros de conocimiento son plataformas de formación tecnológica adaptables a cualquier eje STEM.',
        'primera_infancia': 'Programas comunitarios en UVAs con cobertura en comunas de alto impacto.',
        'derechos_pueblos': 'Presencia territorial en Antioquia incluye zonas con comunidades indígenas y afro.',
        'economia_circular': 'La infraestructura de residuos de EPM + redes comunitarias = laboratorio de economía circular territorial.',
        'hidrogeno_verde': 'EPM opera infraestructura energética crítica. Pivot: partner técnico para pilotos de H₂ verde en Colombia.',
        'descarbonizacion': 'EPM Energía gestiona fuentes renovables. La Fundación es el brazo social de la transición energética.',
        'biodiversidad_urbana': 'UVAs en borde urbano-natural = centros de monitoreo de biodiversidad urbana con comunidades centinela.',
        'ingenieria_infraestructura': 'EPM tiene el mayor acervo de ingeniería de servicios públicos en Latam. Activo único para academias técnicas.',
    },

    // Capacidad financiera (Informe 2024, pág. 15) — SOLO para reporting, no para descarte
    financiero: {
        execution_usd: 125_000,
        max_autonomo_usd: 200_000,
        con_consorcio_usd: 1_500_000,
        beneficiaries: 15_000,
        note: 'ACTUALIZAR con cifras reales del Informe 2024'
    }
};

// ============================================================
// BASE DE DATOS GLOBAL DE OPORTUNIDADES — RADAR AGNÓSTICO
// ============================================================
// Criterio único de inclusión: Colombia NO excluida + no sea beca individual
// Organización: por sector (todos los sectores activos)
// ============================================================

const GLOBAL_RADAR = [

    // ─── SECTOR: FUENTES OBLIGATORIAS GLOBALES ─────────────────
    {
        id: 'adidas_rfp',
        titulo: 'Adidas Foundation Request for Proposals',
        donante: 'Adidas Foundation',
        fuente: 'Portal Oficial Adidas',
        sector: 'Social / Deportes',
        dimension: 'general',
        presupuesto_usd: 100_000,
        fecha_cierre: '2026-06-30',
        estado: 'ACTIVA',
        pais_elegible: 'Global / Colombia ✓',
        afinidad_pivot: 80,
        pivot: 'Espacios comunitarios deportivos y juveniles en las UVAs.',
        obstaculo: 'Foco estricto en inclusión juvenil deportiva.',
        fuente_url: 'https://www.adidasfoundation.org/rfp/',
        tags: ['OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'gsma_innovation',
        titulo: 'GSMA Innovation Fund for Connectivity',
        donante: 'GSMA',
        fuente: 'GSMA Portal',
        sector: 'Tecnología / Conectividad',
        dimension: 'general',
        presupuesto_usd: 250_000,
        fecha_cierre: '2026-05-15',
        estado: 'ACTIVA',
        pais_elegible: 'Global / Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'Conectividad comunitaria en infraestructuras EPM.',
        obstaculo: 'Pide innovación tecnológica medible.',
        fuente_url: 'https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma-innovation-fund/',
        tags: ['OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'common_fund',
        titulo: 'Common Fund Call for Proposals',
        donante: 'Common Fund',
        fuente: 'Common Fund Portal',
        sector: 'Propósito General',
        dimension: 'general',
        presupuesto_usd: 150_000,
        fecha_cierre: '2026-07-01',
        estado: 'ACTIVA',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 75,
        pivot: 'Adaptación de cualquier infraestructura comunitaria o educativa de EPM.',
        obstaculo: 'Requiere justificación de alto impacto social.',
        fuente_url: 'https://www.common-fund.org/call-for-proposals',
        tags: ['OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'waterloo_fdn',
        titulo: 'The Waterloo Foundation Grants',
        donante: 'The Waterloo Foundation',
        fuente: 'Waterloo Foundation Portal',
        sector: 'Medio Ambiente / Social',
        dimension: 'general',
        presupuesto_usd: 120_000,
        fecha_cierre: '2026-08-01',
        estado: 'ACTIVA',
        pais_elegible: 'Global / Colombia ✓',
        afinidad_pivot: 82,
        pivot: 'Protección de cuencas o proyectos de soporte comunitario EPM.',
        obstaculo: 'Reporte financiero específico requerido.',
        fuente_url: 'https://waterloofoundation.org.uk/',
        tags: ['OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'kbs_frb',
        titulo: 'King Baudouin Foundation Call for Projects',
        donante: 'King Baudouin Foundation',
        fuente: 'KBS-FRB Portal',
        sector: 'Desarrollo General',
        dimension: 'general',
        presupuesto_usd: 200_000,
        fecha_cierre: '2026-09-15',
        estado: 'ACTIVA',
        pais_elegible: 'Latam / Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'Desarrollo social a gran escala en Medellín y Antioquia.',
        obstaculo: 'Preferencia por redes globales y cooperación con actores europeos.',
        fuente_url: 'https://kbs-frb.be/',
        tags: ['OBLIGATORIA', 'GENERAL'],
        tipo: 'fondo'
    },
    {
        id: 'onecarbon_world',
        titulo: 'One Carbon World Grants',
        donante: 'One Carbon World',
        fuente: 'One Carbon World Portal',
        sector: 'Medio Ambiente',
        dimension: 'ambiental',
        presupuesto_usd: 50_000,
        fecha_cierre: '2026-10-30',
        estado: 'ACTIVA',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 90,
        pivot: 'Proyectos de reforestación o reducción de huella en infraestructura EPM.',
        obstaculo: 'Requiere validación inicial de huella de carbono.',
        fuente_url: 'https://www.onecarbonworld.com/',
        tags: ['OBLIGATORIA', 'AMBIENTAL', 'HUELLA DE CARBONO'],
        tipo: 'fondo'
    },
    {
        id: 'goodplanet_fdn',
        titulo: 'GoodPlanet Foundation Project Support',
        donante: 'GoodPlanet Foundation',
        fuente: 'GoodPlanet Portal',
        sector: 'Medio Ambiente / Sostenibilidad',
        dimension: 'ambiental',
        presupuesto_usd: 80_000,
        fecha_cierre: '2026-08-30',
        estado: 'ACTIVA',
        pais_elegible: 'Global ✓',
        afinidad_pivot: 88,
        pivot: 'Implementación de educación ambiental o proyectos de conservación en EPM.',
        obstaculo: 'Fuerte componente de concienciación pública requerido.',
        fuente_url: 'https://www.goodplanet.org/',
        tags: ['OBLIGATORIA', 'AMBIENTAL'],
        tipo: 'fondo'
    },

    // ─── SECTOR: ACELERACIÓN E INNOVACIÓN SOCIAL ─────────────────
    {
        id: 'eu_lac_social_accelerator',
        titulo: 'EU-LAC Social Accelerator Programme 2026',
        donante: 'European Union / FIIAPP',
        fuente: 'TED / Diario Oficial UE',
        sector: 'Aceleración Social',
        presupuesto_usd: 400_000,
        fecha_cierre: '2026-05-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 95,
        pivot: 'Las UVAs son la plataforma de aceleración social más documentada de Latam. Nuestra infraestructura física + comunidades activas = base de aterrizaje ideal para el programa EU-LAC.',
        obstaculo: 'Verificar convocatoria exacta en ec.europa.eu/info/funding-tenders; puede requerir consorcio con actor europeo.',
        fuente_url: 'https://ec.europa.eu/info/funding-tenders/',
        tags: ['TRIPLE A', 'EU PRIORITARIO', 'MATCH ACELERACIÓN 95%', 'PIVOT: UVAs COMO HUB'],
        tipo: 'roja'
    },
    {
        id: 'ashoka_changemakers_2026',
        titulo: 'Ashoka Changemakers — Social Systems Change',
        donante: 'Ashoka Foundation',
        fuente: 'Ashoka Network / Ecosistema de Interés',
        sector: 'Innovación Social',
        presupuesto_usd: 150_000,
        fecha_cierre: '2026-06-30',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 88,
        pivot: 'El modelo de transformación urbana de las UVAs es exactamente el "cambio sistémico" que Ashoka premia: replicable, medible, con 10+ años de impacto.',
        obstaculo: 'Ashoka no siempre publica convocatorias abiertas — operar por nominación de red. Pre-identificar Fellow de Ashoka Colombia para nominación.',
        fuente_url: 'https://www.ashoka.org/en-co',
        tags: ['ALTO PRESTIGIO', 'NOMINACIÓN REQUERIDA', 'RETORNO REPUTACIÓN'],
        tipo: 'fondo'
    },
    {
        id: 'skoll_foundation_2026',
        titulo: 'Skoll Award for Social Entrepreneurship 2026',
        donante: 'Skoll Foundation',
        fuente: 'Skoll Foundation Portal',
        sector: 'Emprendimiento Social',
        presupuesto_usd: 1_500_000,
        fecha_cierre: '2026-09-01',
        estado: 'VENTANA ABIERTA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'La Fundación EPM tiene el modelo de escala que Skoll busca: impacto sistémico en una ciudad completa, replicable en Latam.',
        obstaculo: 'Proceso de nominación anual — se requiere nominador externo. Contactar Skoll Fellow latinoamericano como nominador.',
        fuente_url: 'https://skoll.org/about/skoll-award/',
        tags: ['TRIPLE A', 'USD $1.5M', 'ESCALA SISTÉMICA'],
        tipo: 'roja'
    },

    // ─── SECTOR: CONSERVACIÓN Y BIODIVERSIDAD ─────────────────
    {
        id: 'bezos_earth_fund_2026',
        titulo: 'Bezos Earth Fund — Nature-Based Solutions Latin America',
        donante: 'Bezos Earth Fund',
        fuente: 'Dark Pool Filantrópico / Ecosistema de Interés',
        sector: 'Conservación Ambiental',
        presupuesto_usd: 2_000_000,
        fecha_cierre: '2026-07-31',
        estado: 'SEÑAL ACTIVA — No convocatoria pública aún',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 82,
        pivot: 'EPM gestiona cuencas hídricas en Antioquia. Las UVAs están en zonas de borde urbano-natural. Posicionarse como "laboratorio territorial de soluciones basadas en naturaleza".',
        obstaculo: 'El Bezos Earth Fund opera por ecosistema de interés, no convocatoria abierta. Estrategia: publicar paper de impacto ambiental de EPM + presentación en COP31.',
        fuente_url: 'https://www.bezosearthfund.org/',
        tags: ['DARK POOL', 'USD $2M', 'PRE-CONVOCATORIA', 'SEÑAL IATI'],
        tipo: 'roja'
    },
    {
        id: 'rainforest_trust_2026',
        titulo: 'Rainforest Trust — Community-Based Conservation Colombia',
        donante: 'Rainforest Trust',
        fuente: 'Rainforest Trust Grants Portal',
        sector: 'Conservación de Bosques',
        presupuesto_usd: 180_000,
        fecha_cierre: '2026-04-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 78,
        pivot: 'La presencia territorial de EPM en Antioquia incluye zonas de amortiguamiento de bosques. Pivot: estructurar un componente de corredor ecológico en las áreas de influencia de UVAs.',
        obstaculo: 'El foco es conservación in situ — EPM debe articular un componente de gestión ambiental territorial no urbano. Alianza con Corantioquia como soporte técnico.',
        fuente_url: 'https://www.rainforesttrust.org/grants/',
        tags: ['CORREDOR ECOLÓGICO', 'PIVOT AMBIENTAL', 'VIABLE CON ALIANZA'],
        tipo: 'fondo'
    },
    {
        id: 'gef_sgp_colombia',
        titulo: 'GEF Small Grants Programme — Ciclo 8 Colombia',
        donante: 'Global Environment Facility / UNDP',
        fuente: 'Programa Colombia UNDP / UNGM',
        sector: 'Medio Ambiente',
        presupuesto_usd: 50_000,
        fecha_cierre: '2026-06-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 80,
        pivot: 'Educación ambiental en UVAs + gestión de agua EPM = acceso directo al GEF. Pivot: proyecto de "biodiversidad urbana y huertas agroecológicas" en comunas de Medellín.',
        obstaculo: 'Presupuesto bajo para proyecto puente. Ideal para fortalecer track record ambiental antes de GEF grande.',
        fuente_url: 'https://sgp.undp.org/country-pages/45-colombia.html',
        tags: ['VIABLE AUTÓNOMAMENTE', 'TRACK RECORD AMBIENTAL', 'PUENTE ESTRATÉGICO'],
        tipo: 'fondo'
    },
    {
        id: 'cop31_climate_finance',
        titulo: 'Fondo de Adaptación Climática COP31 — Ciudades Resilientes',
        donante: 'Adaptation Fund / UNFCCC',
        fuente: 'Compromisos COP30 Brasil / Geopolítica',
        sector: 'Cambio Climático / Resiliencia Urbana',
        presupuesto_usd: 1_000_000,
        fecha_cierre: '2026-10-01',
        estado: 'PRE-CONVOCATORIA — COP30 Brasil 2025 generó compromisos',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 87,
        pivot: 'Medellín es la ciudad más reconocida en urbanismo de resiliencia climática en Latam. Las UVAs son la evidencia física. EPM es el actor implementador creíble para donantes climáticos.',
        obstaculo: 'Convocatoria formal en diseño post-COP30. Monitorear: adaptation-fund.org y registros UNFCCC.',
        fuente_url: 'https://www.adaptation-fund.org/',
        tags: ['GEOPOLÍTICA COP', 'PRE-CONVOCATORIA', 'USD $1M', 'SEÑAL ALTA'],
        tipo: 'roja'
    },

    // ─── SECTOR: CULTURA, PATRIMONIO Y BIBLIOTECAS ─────────────
    {
        id: 'mellon_foundation_libraries',
        titulo: 'Mellon Foundation — Libraries as Community Anchors',
        donante: 'Andrew W. Mellon Foundation',
        fuente: 'Mellon Foundation Grants Portal (USA)',
        sector: 'Cultura / Bibliotecas',
        presupuesto_usd: 750_000,
        fecha_cierre: '2026-06-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 93,
        pivot: 'Las Bibliotecas EPM son exactamente el modelo "biblioteca como ancla comunitaria" que Mellon busca: acceso, cultura, conocimiento y cohesión social en un mismo espacio físico.',
        obstaculo: 'Mellon prioriza modelos con publicaciones académicas. Acción: articular un paper de impacto con Universidad de Antioquia para fortalecer la propuesta.',
        fuente_url: 'https://www.mellon.org/grants',
        tags: ['TRIPLE A', 'MATCH BIBLIOTECAS 93%', 'DONANTE PRIORITARIO'],
        tipo: 'roja'
    },
    {
        id: 'iberbibliotecas_2026',
        titulo: 'Iberbibliotecas — Programa Iberoamericano de Bibliotecas Públicas',
        donante: 'OEI / Iberbibliotecas',
        fuente: 'OEI Colombia / Red Iberamericana',
        sector: 'Bibliotecas / Cultura',
        presupuesto_usd: 80_000,
        fecha_cierre: '2026-05-31',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 98,
        pivot: 'Match perfecto: Iberbibliotecas financia exactamente lo que hacemos. Sin pivot requerido.',
        obstaculo: 'Alta competencia iberoamericana. Diferenciador: datos de impacto cuantificados (15K beneficiarios, modelo 10 años).',
        fuente_url: 'https://www.iberbibliotecas.org/',
        tags: ['MATCH 98%', 'SIN PIVOT', 'ALTA COMPETENCIA'],
        tipo: 'roja'
    },
    {
        id: 'unesco_memoria_mundo',
        titulo: 'UNESCO — Memory of the World Programme / Intangible Heritage',
        donante: 'UNESCO',
        fuente: 'UNESCO Culture Sector',
        sector: 'Patrimonio Cultural',
        presupuesto_usd: 120_000,
        fecha_cierre: '2026-07-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 84,
        pivot: 'Las bibliotecas comunitarias EPM custodian memoria oral y documental de comunidades de Medellín. Pivot: proyecto de digitalización y preservación de patrimonio inmaterial comunitario.',
        obstaculo: 'Requiere articulación con Ministerio de Cultura Colombia como aval gubernamental.',
        fuente_url: 'https://www.unesco.org/en/memory-world',
        tags: ['UNESCO PRIORITARIO', 'PATRIMONIO', 'ALTO PRESTIGIO'],
        tipo: 'fondo'
    },

    // ─── SECTOR: TECNOLOGÍA DIGITAL E IA ─────────────────────
    {
        id: 'google_org_digital_equity',
        titulo: 'Google.org — Digital Equity & AI for Social Good Latam',
        donante: 'Google.org',
        fuente: 'Silent Signal / Ecosistema Google for Nonprofits',
        sector: 'Tecnología Digital / IA',
        presupuesto_usd: 500_000,
        fecha_cierre: '2026-06-30',
        estado: 'SEÑAL ACTIVA — Google.org comprometió USD $25M Latam',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 90,
        pivot: 'Las UVAs + conectividad + 15K usuarios = laboratorio de IA social certificado. EPM puede ser el partner territorial de Google para validar herramientas de IA en contextos de vulnerabilidad.',
        obstaculo: 'Google.org opera por referencia de ecosistema. Estrategia: registrar en Google for Nonprofits + contactar programa de grants directo.',
        fuente_url: 'https://www.google.org/',
        tags: ['SEÑAL SILENCIOSA', 'USD $500K', 'IA SOCIAL', 'ACCIÓN INMEDIATA'],
        tipo: 'roja'
    },
    {
        id: 'microsoft_nonprofits_2026',
        titulo: 'Microsoft — AI for Good Grants (Nonprofits)',
        donante: 'Microsoft Philanthropies',
        fuente: 'Microsoft for Nonprofits Portal',
        sector: 'Inteligencia Artificial / Tecnología',
        presupuesto_usd: 200_000,
        fecha_cierre: 'Rolling (convocatoria permanente)',
        estado: 'ACTIVA PERMANENTE',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 86,
        pivot: 'Los centros de conocimiento de EPM son el espacio físico ideal para implementar soluciones de AI4Good de Microsoft. Propuesta: "Laboratorio de IA Comunitaria en UVAs" con Azure como infraestructura.',
        obstaculo: 'Rolling basis — aplicar ya. Requiere registro en Microsoft for Nonprofits.',
        fuente_url: 'https://www.microsoft.com/en-us/nonprofits',
        tags: ['CONVOCATORIA PERMANENTE', 'APLICAR HOY', 'IA COMUNITARIA'],
        tipo: 'roja'
    },
    {
        id: 'eu_digital_decade_latam',
        titulo: 'EU Digital Decade External Action — Digital4Development Latam',
        donante: 'European Commission / DG CONNECT',
        fuente: 'TED / Diario Oficial UE',
        sector: 'Digitalización / Cooperación',
        presupuesto_usd: 600_000,
        fecha_cierre: '2026-05-30',
        estado: 'PRE-CONVOCATORIA — Presupuesto asignado en IATI',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'EPM tiene infraestructura digital en comunidades vulnerables. Pivot: posicionarse como "operador de transición digital comunitaria" con evidencia de impacto en UVAs.',
        obstaculo: 'Requiere consorcio europeo. Pre-identificar: Fiiapp, GIZ, o universidades españolas como partners UE.',
        fuente_url: 'https://ec.europa.eu/digital4development',
        tags: ['EU PRIORITARIO', 'PRE-CONVOCATORIA IATI', 'REQUIERE CONSORCIO EU'],
        tipo: 'roja'
    },
    {
        id: 'korea_ict_latam',
        titulo: 'KOICA — ICT for Development Programme Colombia (한국)',
        donante: 'Korea International Cooperation Agency',
        fuente: 'KOICA Portal / Cooperación Bilateral Corea-Colombia',
        sector: 'Tecnología / Cooperación Sur-Sur',
        presupuesto_usd: 350_000,
        fecha_cierre: '2026-08-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Acuerdo bilateral)',
        afinidad_pivot: 80,
        pivot: 'KOICA prioriza proyectos de TIC en comunidades. Las UVAs con sus salas tecnológicas son la plataforma de implementación perfecta para proyectos de transferencia tecnológica coreana.',
        obstaculo: 'Proceso bilingüe (inglés/coreano). Contactar Embajada de Corea en Bogotá para canal de postulación.',
        fuente_url: 'https://www.koica.go.kr/koica_en/',
        tags: ['COOPERACIÓN BILATERAL', 'COREA', 'TIC COMUNITARIO'],
        tipo: 'fondo'
    },

    // ─── SECTOR: DESARROLLO URBANO Y RESILIENCIA ─────────────
    {
        id: 'bloomberg_philanthropies_2026',
        titulo: 'Bloomberg Philanthropies — Cities Initiative Latin America',
        donante: 'Bloomberg Philanthropies',
        fuente: 'Bloomberg Cities Network',
        sector: 'Desarrollo Urbano',
        presupuesto_usd: 800_000,
        fecha_cierre: '2026-06-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Medellín es ciudad Bloomberg certificada)',
        afinidad_pivot: 92,
        pivot: 'Medellín es ya una "Bloomberg City". EPM como actor ejecutor: ventaja competitiva máxima. Las UVAs son el modelo urbano que Bloomberg quiere exportar a otras ciudades.',
        obstaculo: 'Aplicación usualmente canalizada por Alcaldía. Estrategia: postulación conjunta Fundación EPM + Alcaldía de Medellín.',
        fuente_url: 'https://www.bloomberg.org/public-health/cities-and-places/',
        tags: ['TRIPLE A', 'VENTAJA BLOOMBERG CITY', 'USD $800K', 'ALCALDÍA COMO ALIADO'],
        tipo: 'roja'
    },
    {
        id: 'c40_cities_2026',
        titulo: 'C40 Cities — Climate Finance Lab for Resilient Cities',
        donante: 'C40 / Bloomberg / Rockefeller',
        fuente: 'C40 Cities Finance Facility',
        sector: 'Resiliencia Climática Urbana',
        presupuesto_usd: 500_000,
        fecha_cierre: '2026-07-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Medellín es miembro C40)',
        afinidad_pivot: 88,
        pivot: 'Medellín es miembro C40. El modelo UVA transforma espacios de riesgo climático en hubs comunitarios. Pivot: proponer las UVAs como "infraestructura de resiliencia climática certificable".',
        obstaculo: 'C40 opera con ciudades, no ONGs directamente. Articular con Secretaría de Medio Ambiente de Medellín.',
        fuente_url: 'https://www.c40.org/',
        tags: ['C40 MEMBER ADVANTAGE', 'RESILIENCIA CLIMÁTICA', 'ALCALDÍA PARTNER'],
        tipo: 'roja'
    },

    // ─── SECTOR: SEGURIDAD Y CONVIVENCIA URBANA ─────────────
    {
        id: 'unodc_crime_prevention',
        titulo: 'UNODC — Crime Prevention Through Urban Design (CPTED)',
        donante: 'UNODC / ONU',
        fuente: 'UNGM / UNODC Programme Office Colombia',
        sector: 'Seguridad / Urbanismo',
        presupuesto_usd: 300_000,
        fecha_cierre: '2026-05-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 87,
        pivot: 'El modelo UVA de Medellín está documentado académicamente como caso de éxito global en prevención del crimen mediante diseño urbano. EPM como custodio institucional del modelo = credibilidad máxima.',
        obstaculo: 'UNODC Colombia tiene oficina local — contacto directo facilita el proceso.',
        fuente_url: 'https://www.unodc.org/unodc/en/crime-and-criminal-justice/',
        tags: ['MODELO UVA DOCUMENTADO', 'ONU PRIORITARIO', 'MATCH URBANO 87%'],
        tipo: 'roja'
    },
    {
        id: 'usaid_peace_colombia',
        titulo: 'USAID — Colombia Peace and Stabilization Fund',
        donante: 'USAID Colombia',
        fuente: 'Grants.gov / USAID Colombia Mission',
        sector: 'Paz / Convivencia',
        presupuesto_usd: 400_000,
        fecha_cierre: '2026-04-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (programa específico)',
        afinidad_pivot: 89,
        pivot: 'Las UVAs nacieron como instrumentos de paz urbana en comunas de violencia histórica en Medellín. Ese origen es exactamente el narrative de USAID para Colombia.',
        obstaculo: 'USAID requiere reporte financiero auditado en inglés. Iniciar traducción de pág. 15 del Informe 2024.',
        fuente_url: 'https://www.usaid.gov/colombia',
        tags: ['USAID COLOMBIA', 'NARRATIVA DE PAZ', 'MATCH UVAs 89%'],
        tipo: 'roja'
    },

    // ─── SECTOR: SALUD MENTAL Y TEJIDO SOCIAL ────────────────
    {
        id: 'wellcome_trust_mental_health',
        titulo: 'Wellcome Trust — Mental Health in Communities Programme',
        donante: 'Wellcome Trust (UK)',
        fuente: 'Wellcome Trust Grants Portal',
        sector: 'Salud Mental / Tejido Social',
        presupuesto_usd: 650_000,
        fecha_cierre: '2026-05-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 83,
        pivot: 'Las bibliotecas comunitarias de EPM son espacios probados de recuperación de tejido social. Pivot: instrumentalizar el impacto en "bienestar mental comunitario" con datos de satisfacción de usuarios.',
        obstaculo: 'Wellcome requiere evaluación de impacto rigurosa. Articular con facultad de psicología de EAFIT o UdeA para el componente de medición.',
        fuente_url: 'https://wellcome.org/grant-funding',
        tags: ['UK WELLCOME', 'SALUD MENTAL', 'PIVOT BIBLIOTECAS'],
        tipo: 'fondo'
    },
    {
        id: 'fundacion_bancolombia_2026',
        titulo: 'Fundación Bancolombia — Economía del Conocimiento Antioquia',
        donante: 'Fundación Bancolombia / Grupo Bancolombia',
        fuente: 'Silent Signal RSC / Informe ESG Bancolombia 2025',
        sector: 'Desarrollo Social / Conocimiento',
        presupuesto_usd: 200_000,
        fecha_cierre: '2026-05-30',
        estado: 'SEÑAL ACTIVA — Informe ESG 2025',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 91,
        pivot: 'Bancolombia redirigió su fondo a "economía del conocimiento en territorios vulnerables" — definición exacta del modelo EPM. Ventaja: mismo territorio Antioquia.',
        obstaculo: 'Opera por invitación o contacto directo. Acción: reunión con Gerencia de Sostenibilidad Bancolombia vía red EPM-Grupo Empresarial.',
        fuente_url: 'https://www.fundacionbancolombia.org/',
        tags: ['SEÑAL SILENCIOSA', 'MATCH 91%', 'TERRITORIO COMPARTIDO', 'REUNIÓN DIRECTA'],
        tipo: 'roja'
    },

    // ─── SECTOR: AGUA Y BIOTECNOLOGÍA ────────────────────────
    {
        id: 'idb_agua_resiliencia',
        titulo: 'BID — Agua y Resiliencia Hídrica para Ciudades Intermedias',
        donante: 'BID / Banco Interamericano de Desarrollo',
        fuente: 'IATI Data Flow / BID Lab',
        sector: 'Agua / Biotecnología',
        presupuesto_usd: 700_000,
        fecha_cierre: '2026-06-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 90,
        pivot: 'EPM gestiona agua para millones de colombianos. Activo único en América Latina. Pivot: posicionar Planta de Tratamiento EPM + comunidades de las UVAs como laboratorio de resiliencia hídrica.',
        obstaculo: 'Requiere componente técnico de ingeniería. Consorcio con EPM Aguas (empresa hermana) como actor técnico y Fundación EPM como brazo social.',
        fuente_url: 'https://www.iadb.org/en',
        tags: ['BID PRIORITARIO', 'ACTIVO ÚNICO AGUA', 'CONSORCIO EPM AGUAS'],
        tipo: 'roja'
    },
    {
        id: 'global_water_challenge',
        titulo: 'Global Water Challenge — Water Innovation for Communities',
        donante: 'Global Water Challenge (Coalición: USAID, Coca-Cola, GAP)',
        fuente: 'GWC Portal / Coalición Sector Privado',
        sector: 'Agua Potable / Innovación',
        presupuesto_usd: 250_000,
        fecha_cierre: '2026-04-30',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'EPM tiene infraestructura de agua potable real en comunidades. El GWC busca soluciones implementadas, no pilotos. Ventaja competitiva máxima.',
        obstaculo: 'Coalición multi-actor — el proceso requiere demostrar impacto ya existente, no proyectado.',
        fuente_url: 'https://www.globalwaterchallenge.org/',
        tags: ['COALICIÓN PRIVADA', 'AGUA REAL NO PILOTO', 'MATCH 85%'],
        tipo: 'fondo'
    },

    // ─── SECTOR: PRIMERA INFANCIA Y EDUCACIÓN ────────────────
    {
        id: 'unicef_early_childhood',
        titulo: 'UNICEF — Early Childhood Development Innovation Fund',
        donante: 'UNICEF Colombia',
        fuente: 'UNICEF Colombia Office / UNGM',
        sector: 'Primera Infancia',
        presupuesto_usd: 300_000,
        fecha_cierre: '2026-06-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 87,
        pivot: 'Los espacios comunitarios de las UVAs tienen programas de primera infancia activos en comunas de Medellín. UNICEF busca "espacios seguros de desarrollo infantil". Tenemos la infraestructura.',
        obstaculo: 'Requiere datos de cobertura de primera infancia específicos. Solicitar al área de programas EPM estadísticas 0-5 años.',
        fuente_url: 'https://www.unicef.org/colombia/',
        tags: ['UNICEF COLOMBIA', 'PRIMERA INFANCIA', 'PIVOT UVAs COMO ESPACIO SEGURO'],
        tipo: 'fondo'
    },
    {
        id: 'stem_education_latam_eu',
        titulo: 'Erasmus+ — Educación STEM y Robótica en Latam (EU-Colombia)',
        donante: 'European Commission / Erasmus+',
        fuente: 'TED / EACEA Erasmus+ International Partnerships',
        sector: 'Educación STEM / Robótica',
        presupuesto_usd: 450_000,
        fecha_cierre: '2026-04-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Socio Internacional Erasmus+)',
        afinidad_pivot: 89,
        pivot: 'Las UVAs ya tienen salas de tecnología y STEM. Pivot: formalizar un currículo de robótica + IA con universidades europeas bajo el marco Erasmus+ International, posicionando EPM como hub territorial.',
        obstaculo: 'Requiere consorcio con al menos 1 universidad europea y 1 institución de formación colombiana (EAFIT ideal).',
        fuente_url: 'https://erasmus-plus.ec.europa.eu/',
        tags: ['ERASMUS+', 'STEM ROBÓTICA', 'CONSORCIO EU-EAFIT', 'MATCH 89%'],
        tipo: 'roja'
    },

    // ─── SECTOR: DERECHOS Y PUEBLOS ──────────────────────────
    {
        id: 'ford_foundation_rights',
        titulo: 'Ford Foundation — Civic Rights in a Changing World',
        donante: 'Ford Foundation',
        fuente: 'Ford Foundation Grants Portal',
        sector: 'Derechos / Participación Ciudadana',
        presupuesto_usd: 400_000,
        fecha_cierre: '2026-07-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 84,
        pivot: 'Las bibliotecas EPM son espacios de ejercicio ciudadano: lectura, información, debate. Pivot: proponer modelo de "biblioteca como garante de derechos informativos" con datos de acceso 2024.',
        obstaculo: 'Ford Foundation prioriza organizaciones con narrativa de derechos explícita. Reencuadrar el lenguaje de la propuesta.',
        fuente_url: 'https://www.fordfoundation.org/work/our-grants/',
        tags: ['FORD FOUNDATION', 'DERECHOS PARTICIPACIÓN', 'PIVOT NARRATIVA'],
        tipo: 'fondo'
    },
    {
        id: 'open_society_latam',
        titulo: 'Open Society Foundations — Latin America Program',
        donante: 'Open Society Foundations (Soros)',
        fuente: 'OSF Grants Portal',
        sector: 'Sociedad Abierta / Participación',
        presupuesto_usd: 300_000,
        fecha_cierre: '2026-05-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 79,
        pivot: 'OSF financia organizaciones que fortalecen ecosistemas de participación democrática. Las bibliotecas EPM son espacios de deliberación ciudadana documentados. Pivot: enfatizar el componente de "ciudadanía informada".',
        obstaculo: 'OSF en Latam 2026 tiene foco en países con crisis democrática. Colombia elegible, pero no prioritaria. Articular narrativa con contexto de elecciones 2026.',
        fuente_url: 'https://www.opensocietyfoundations.org/grants',
        tags: ['OSF LATAM', 'CIUDADANÍA', 'DEMOCRACIA'],
        tipo: 'fondo'
    },

    // ─── SECTOR: RECONOCIMIENTOS Y PREMIOS ───────────────────
    {
        id: 'hilton_humanitarian_prize',
        titulo: 'Hilton Humanitarian Prize 2026 — $2M USD',
        donante: 'Conrad N. Hilton Foundation',
        fuente: 'Hilton Foundation / Nominacion por Pares',
        sector: 'Premio de Reconocimiento / Humanitario',
        presupuesto_usd: 2_000_000,
        fecha_cierre: '2026-06-30',
        estado: 'ACTIVA — Nominación requerida',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 82,
        pivot: 'Las UVAs de Medellín son reconocidas mundialmente como modelo de transformación urbana. EPM como garante institucional del modelo = candidato natural al Hilton Prize.',
        obstaculo: 'Requiere nominación de organización internacional. Estrategia: contactar ICLEI, UN-Habitat o Ashoka para nominación.',
        fuente_url: 'https://www.hiltonfoundation.org/hilton-humanitarian-prize/',
        tags: ['USD $2M', 'RETORNO REPUTACIÓN MÁXIMO', 'PREMIO GLOBAL', 'NOMINACIÓN'],
        tipo: 'roja'
    },
    {
        id: 'wise_education_prize_qatar',
        titulo: 'WISE Prize for Education — Qatar Foundation',
        donante: 'Qatar Foundation / WISE',
        fuente: 'WISE Portal Qatar (árabe/inglés)',
        sector: 'Premio Educación / Internacional',
        presupuesto_usd: 500_000,
        fecha_cierre: '2026-04-30',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 80,
        pivot: 'WISE premia ecosistemas educativos que transforman comunidades. Las Bibliotecas EPM + UVAs son exactamente ese modelo. Presentar como "EcoSistema Educativo Comunitario Medellín".',
        obstaculo: 'Proceso en inglés y árabe. Formulario extenso. Requiere nominación externa o presentación institucional con carta del Alcalde.',
        fuente_url: 'https://www.wise-qatar.org/wise-prize-for-education/',
        tags: ['QATAR FOUNDATION', 'USD $500K', 'PREMIO EDUCACIÓN', 'IDIOMA: EN/AR'],
        tipo: 'fondo'
    },
    {
        id: 'uclg_metropolis_award',
        titulo: 'UCLG — Metropolis Award on Democracy and Governance',
        donante: 'UCLG Metropolis / Red de Ciudades',
        fuente: 'UCLG Network / Metropolis Secretariat',
        sector: 'Premio Gobernanza Urbana',
        presupuesto_usd: 0,
        fecha_cierre: '2026-05-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Medellín miembro)',
        afinidad_pivot: 88,
        pivot: 'No monetario pero ALTO retorno de reputación. El modelo UVA como democracia espacial urbana es exactamente el foco del premio. Incrementa credibilidad ante donantes multilaterales.',
        obstaculo: 'Postulación a través de Alcaldía de Medellín. Acción: articular con Secretaría de Participación.',
        fuente_url: 'https://www.metropolis.org/',
        tags: ['RECONOCIMIENTO', 'RETORNO REPUTACIÓN', 'VÍA ALCALDÍA', 'SIN MONTO'],
        tipo: 'fondo'
    },

    // ─── SECTOR: COOPERACIÓN BILATERAL EMERGENTE ───────────────
    {
        id: 'german_giz_colombia',
        titulo: 'GIZ — Programa de Cooperación Colombia (Deutsche Gesellschaft)',
        donante: 'GIZ / Gobierno Federal Alemán (Deutsch)',
        fuente: 'GIZ Colombia / Diario Oficial Alemán',
        sector: 'Cooperación Bilateral / Alemania',
        presupuesto_usd: 350_000,
        fecha_cierre: '2026-06-01',
        estado: 'ACTIVA — Convocatoria en alemán abierta',
        pais_elegible: 'Colombia ✓ (País socio GIZ)',
        afinidad_pivot: 83,
        pivot: 'GIZ tiene programa activo en Colombia con foco en transformación social y urbana. Las UVAs son el caso de éxito más visible del país. Pivot: propuesta bilingüe ES/DE.',
        obstaculo: 'Convocatoria parcialmente en alemán. Requiere traducción y posiblemente consultor GIZ local como facilitador.',
        fuente_url: 'https://www.giz.de/en/worldwide/340.html',
        tags: ['ALEMANIA GIZ', 'IDIOMA: DE', 'BILATERAL', 'PAÍS SOCIO'],
        tipo: 'fondo'
    },
    {
        id: 'japon_jica_colombia',
        titulo: 'JICA — Cooperación Técnica Japón-Colombia (日本)',
        donante: 'JICA / Agencia Japonesa de Cooperación',
        fuente: 'JICA Colombia Office / Embajada Japón Bogotá',
        sector: 'Cooperación Bilateral / Japón',
        presupuesto_usd: 280_000,
        fecha_cierre: '2026-07-31',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (Acuerdo bilateral)',
        afinidad_pivot: 77,
        pivot: 'JICA tiene foco en "ciudad resiliente" y "gestión del conocimiento local". Japón admira el modelo Medellín. Pivot: proponer intercambio técnico UVAs con modelo japonés de espacios comunitarios (Chienomi).',
        obstaculo: 'Canal oficial a través de Embajada de Japón en Bogotá. Proceso en inglés/español.',
        fuente_url: 'https://www.jica.go.jp/colombia/',
        tags: ['JAPÓN JICA', 'CIUDAD RESILIENTE', 'DIPLOMACIA CULTURAL'],
        tipo: 'fondo'
    },
    {
        id: 'afd_france_colombie',
        titulo: 'AFD — Agence Française Développement: Villes Inclusives (Français)',
        donante: 'Agence Française de Développement / Francia',
        fuente: 'AFD Portal / Coopération France-Colombie',
        sector: 'Cooperación Bilateral / Francia',
        presupuesto_usd: 420_000,
        fecha_cierre: '2026-05-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 81,
        pivot: 'Francia tiene programa de cooperación con Colombia en "ciudades inclusivas". El modelo de urbanismo social de Medellín es admirado en Francia. Pivot: presentar UVAs como "urbanisme social participatif".',
        obstaculo: 'Documentación parcialmente en francés. Embajada de Francia en Bogotá tiene attaché de cooperación — punto de contacto directo.',
        fuente_url: 'https://www.afd.fr/en/colombia',
        tags: ['FRANCIA AFD', 'IDIOMA: FR', 'VILLES INCLUSIVES', 'BILATERAL'],
        tipo: 'fondo'
    },

    // ─── SECTOR: RECONOCIMIENTO SIMBÓLICO ────────────────────
    {
        id: 'un_habitat_scroll_honour',
        titulo: 'UN-Habitat — Scroll of Honour Award 2026',
        donante: 'ONU / UN-Habitat',
        fuente: 'UN-Habitat Award Programme',
        sector: 'Premio ONU / Asentamientos Humanos',
        presupuesto_usd: 0,
        fecha_cierre: '2026-04-30',
        estado: 'ACTIVA — Nominación abierta',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 93,
        pivot: 'Match perfecto: UN-Habitat premia iniciativas que mejoran asentamientos humanos. Las UVAs transformaron los barrios más violentos de Medellín en espacios de dignidad. Es el caso que este premio busca.',
        obstaculo: 'Nominación vía Ministerio de Vivienda Colombia o Alcaldía de Medellín. Ambos son aliados potenciales.',
        fuente_url: 'https://unhabitat.org/scroll-of-honour',
        tags: ['ONU UN-HABITAT', 'RECONOCIMIENTO GLOBAL', 'MATCH 93%', 'SIN MONTO'],
        tipo: 'roja'
    },
    {
        id: 'world_habitat_award',
        titulo: 'World Habitat Award 2026 — Building and Social Housing Foundation',
        donante: 'World Habitat / BSHF (UK)',
        fuente: 'World Habitat Awards Portal',
        sector: 'Premio Hábitat / Vivienda Social',
        presupuesto_usd: 10_000,
        fecha_cierre: '2026-05-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 91,
        pivot: 'Las UVAs son exactamente lo que el World Habitat Award busca: vivienda digna + espacio comunitario + transformación territorial. El modelo Medellín ganó este premio anteriormente — repetirlo con EPM como protagonista.',
        obstaculo: 'Proceso de postulación es público y abierto. Sin consorcio requerido. APLICAR YA.',
        fuente_url: 'https://world-habitat.org/world-habitat-awards/',
        tags: ['APLICAR AHORA', 'MATCH 91%', 'BAJO COSTO', 'ALTO RETORNO'],
        tipo: 'roja'
    },

    // ─── DIMENSIÓN AMBIENTAL: HIDRÓGENO VERDE ─────────────────
    {
        id: 'h2_green_mission_innovation',
        titulo: 'Mission Innovation — Hydrogen Valley Colombia (H₂)',
        donante: 'Mission Innovation / Agencia IEA',
        fuente: 'Mission Innovation Portal / IEA Hydrogen',
        sector: 'Hidrógeno Verde / Energía',
        dimension: 'ambiental',
        presupuesto_usd: 1_200_000,
        fecha_cierre: '2026-08-01',
        estado: 'SEÑAL ACTIVA — MI-8 Tracking Colombia',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 89,
        pivot: 'EPM opera infraestructura energética crítica e instalaciones de generación. Pivot estratégico: posicionarse como partner técnico territorial para pilotos piloto de H₂ verde en Colombia, con las comunidades de UVAs como receptoras del modelo de transición justa.',
        obstaculo: 'Requiere componente técnico de ingeniería energética. Consorcio con EPM Generación + EAFIT (Grupo de Energía) es el camino crítico.',
        fuente_url: 'https://mission-innovation.net/',
        tags: ['SEÑAL ACTIVA', 'HIDRÓGENO VERDE', 'USD $1.2M', 'ENERGÍA', 'CONSORCIO EPM ENERGÍA'],
        tipo: 'roja'
    },
    {
        id: 'eu_hydrogen_bank_latam',
        titulo: 'EU Global Gateway — European Hydrogen Bank: Latam Partnerships',
        donante: 'European Commission / DG ENERGY',
        fuente: 'TED / Global Gateway EU',
        sector: 'Hidrógeno / Transición Energética',
        dimension: 'ambiental',
        presupuesto_usd: 2_000_000,
        fecha_cierre: '2026-09-15',
        estado: 'PRE-CONVOCATORIA — Global Gateway asignó €300M para H₂ Latam',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 84,
        pivot: 'La UE busca implementadores en Latam con infraestructura energética real. EPM es el único actor colombiano con escala de generación + brazo social (Fundación) para gestionar la transición justa.',
        obstaculo: 'Requiere consorcio EU + empresa energética. Pre-identificar: EDF Renewables, Iberdrola, o Engie como lead EU.',
        fuente_url: 'https://single-market-economy.ec.europa.eu/industry/strategy/hydrogen/eu-hydrogen-bank_en',
        tags: ['EU GLOBAL GATEWAY', 'H₂ LATAM', 'PRE-CONVOCATORIA', 'USD $2M', 'CONSORCIO EU'],
        tipo: 'roja'
    },

    // ─── DIMENSIÓN AMBIENTAL: ECONOMÍA CIRCULAR / MADERA PLÁSTICA ──
    {
        id: 'plastic_wood_circular_economy',
        titulo: 'Ellen MacArthur Foundation — Circular Economy Innovation Grants',
        donante: 'Ellen MacArthur Foundation',
        fuente: 'Ellen MacArthur Foundation Grants Portal',
        sector: 'Economía Circular / Innovación',
        dimension: 'ambiental',
        presupuesto_usd: 400_000,
        fecha_cierre: '2026-06-30',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 85,
        pivot: 'EPM gestiona residuos en Medellín. La madera plástica y otros materiales de economía circular pueden integrarse en la infraestructura de UVAs. Pivot: proponer "UVAs de Segunda Generación" construidas con materiales circulares derivados de residuos comunitarios.',
        obstaculo: 'La EMF prioriza soluciones innovadoras con evidencia de impacto. Articular con empresa local de reciclaje (ej. Alvi, Recimed) como actor técnico de economía circular.',
        fuente_url: 'https://www.ellenmacarthurfoundation.org/',
        tags: ['ECONOMÍA CIRCULAR', 'MADERA PLÁSTICA', 'RESIDUOS', 'MATCH 85%'],
        tipo: 'roja'
    },
    {
        id: 'eu_plastic_pact_latam',
        titulo: 'EU Plastics Pact LATAM — Waste to Value Communities',
        donante: 'European Commission / Ellen MacArthur / PNUMA',
        fuente: 'PNUMA / EU Plastics Pact Network',
        sector: 'Economía Circular / Plásticos',
        dimension: 'ambiental',
        presupuesto_usd: 300_000,
        fecha_cierre: '2026-05-30',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 82,
        pivot: 'Las comunidades alrededor de las UVAs pueden ser los centros de recolección y transformación. Pivot: "Comunidades Circulares EPM" — redes de reciclaje comunitario con trazabilidad digital y salida a mercados de madera plástica.',
        obstaculo: 'Requiere componente de empresa de transformación de plásticos en el consorcio.',
        fuente_url: 'https://www.unep.org/explore-topics/chemicals-waste/what-we-do/plastic-pact-network',
        tags: ['PLÁSTICOS LATAM', 'EU PNUMA', 'RESIDUOS COMUNITARIOS', 'TRAZABILIDAD'],
        tipo: 'fondo'
    },

    // ─── DIMENSIÓN AMBIENTAL: BIODIVERSIDAD URBANA ─────────────
    {
        id: 'gbif_urban_biodiversity',
        titulo: 'GBIF — Urban Biodiversity Monitoring with Communities',
        donante: 'Global Biodiversity Information Facility / Nordic Funds',
        fuente: 'GBIF Grants Portal',
        sector: 'Biodiversidad Urbana / Ciencia Ciudadana',
        dimension: 'ambiental',
        presupuesto_usd: 180_000,
        fecha_cierre: '2026-07-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓ (megadiverso)',
        afinidad_pivot: 86,
        pivot: 'Las UVAs en bordes urbano-naturales de Medellín son puntos ideales de monitoreo de biodiversidad urbana. Las comunidades son "centinelas" de biodiversidad. Pivot: instalar estaciones de ciencia ciudadana en UVAs para registrar datos en GBIF y posicionar a Medellín como ciudad líder en biodiversidad urbana documentada.',
        obstaculo: 'Requiere protocolo científico validado. Alianza con Instituto Humboldt o Corantioquia para el componente de biodiversidad.',
        fuente_url: 'https://www.gbif.org/grscicoll',
        tags: ['BIODIVERSIDAD URBANA', 'CIENCIA CIUDADANA', 'COLOMBIA MEGAIVERSA', 'GBIF'],
        tipo: 'fondo'
    },
    {
        id: 'kunming_montreal_cities_fund',
        titulo: 'Fondo Kunming-Montreal — Soluciones de Naturaleza Urbana',
        donante: 'Kunming-Montreal Global Biodiversity Framework Fund / CBD',
        fuente: 'Compromisos COP16 Cali 2024 — Geopolítica',
        sector: 'Biodiversidad / Naturaleza Urbana',
        dimension: 'ambiental',
        presupuesto_usd: 800_000,
        fecha_cierre: '2026-10-01',
        estado: 'PRE-CONVOCATORIA — COP16 Cali generó compromisos de implementación',
        pais_elegible: 'Colombia ✓ (sede COP16)',
        afinidad_pivot: 91,
        pivot: 'Colombia fue sede de COP16 en Cali. Medellín tiene los corredores ecológicos y las UVAs como infraestructura de naturaleza urbana. EPM + Alcaldía de Medellín pueden co-liderar la primera implementación del Fondo Kunming-Montreal en una ciudad latinoamericana.',
        obstaculo: 'Convocatoria formal en diseño. Monitorear cbd.int y GEF Trust Fund. Acción inmediata: posicionar a Medellín ante el Ministerio de Ambiente de Colombia como ciudad piloto.',
        fuente_url: 'https://www.cbd.int/gbf',
        tags: ['SEÑAL POST-COP16', 'COLOMBIA PROTAGINISTA', 'USD $800K', 'BIODIVERSIDAD', 'PRE-CONVOCATORIA'],
        tipo: 'roja'
    },

    // ─── DIMENSIÓN TECNOLÓGICA: ACADEMIAS DE INGENIERÍA GLOBALES ──
    {
        id: 'raeng_global_challenges',
        titulo: 'Royal Academy of Engineering — Africa & South Asia Programmes (con Colombia)',
        donante: 'Royal Academy of Engineering (RAEng) / UK',
        fuente: 'RAEng Grants Portal / FCDO',
        sector: 'Ingeniería / Desarrollo Internacional',
        dimension: 'tecnologico',
        presupuesto_usd: 350_000,
        fecha_cierre: '2026-06-01',
        estado: 'ACTIVA — Extensión LAC en exploración',
        pais_elegible: 'Colombia ✓ (programa GCRF/ODA)',
        afinidad_pivot: 88,
        pivot: 'EPM tiene el mayor portafolio de ingeniería de servicios públicos en Colombia. Pivot: posicionar EPM + EAFIT como "Academy of Engineering" emergente de Latam y aplicar como partner técnico en los programas de RAEng que se extienden a LAC.',
        obstaculo: 'RAEng no tiene programa LAC formal aún — este es el momento de ingresar. Estrategia: contactar a través de Embajada Británica en Bogotá (British Council + FCDO).',
        fuente_url: 'https://raeng.org.uk/global',
        tags: ['RAENG UK', 'INGENIERÍA GLOBAL', 'BRITISH COUNCIL', 'SEÑAL EMERGENTE'],
        tipo: 'roja'
    },
    {
        id: 'national_academies_latam_stem',
        titulo: 'InterAcademy Partnership — STEM en Ciudades de Latam',
        donante: 'InterAcademy Partnership / Academias Nacionales Globales',
        fuente: 'IAP Science Education Programme',
        sector: 'Ciencia / STEM / Academias',
        dimension: 'tecnologico',
        presupuesto_usd: 200_000,
        fecha_cierre: '2026-07-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 83,
        pivot: 'El IAP conecta más de 140 academias nacionales. Las UVAs son los laboratorios comunitarios de STEM que el IAP necesita para sus programas de implementación. Pivot: articular con la Academia Colombiana de Ciencias Exactas como nodo nacional.',
        obstaculo: 'Canal de entrada vía Academia Colombiana de Ciencias. Reunión con su secretaría ejecutiva para presentar el modelo UVAs + STEM.',
        fuente_url: 'https://www.interacademies.org/',
        tags: ['ACADEMIAS GLOBALES', 'STEM COMUNITARIO', 'IAP', 'COLOMBIA'],
        tipo: 'fondo'
    },

    // ─── DIMENSIÓN TECNOLÓGICA: CORPORACIONES DESCABORNIZACIÓN ──
    {
        id: 'alstom_foundation_engineering',
        titulo: 'Alstom Foundation — Sustainable Mobility & Infrastructure Communities',
        donante: 'Alstom Foundation (Francia)',
        fuente: 'Alstom Foundation Grants / Informe RSE Alstom 2025',
        sector: 'Movilidad Sostenible / Infraestructura',
        dimension: 'tecnologico',
        presupuesto_usd: 250_000,
        fecha_cierre: '2026-06-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 80,
        pivot: 'Alstom busca organizaciones que conecten infraestructura de movilidad con comunidades. Medellín es referente global en Metro + Cable + urbanismo social. EPM es el actor que conecta esa infraestructura con las comunidades.',
        obstaculo: 'Alstom opera por referencia de red. Estrategia: contacto a través de Metro de Medellín (que tiene relación con Alstom por sus trenes) como presentador.',
        fuente_url: 'https://www.alstom.com/alstom-foundation',
        tags: ['ALSTOM FOUNDATION', 'MOVILIDAD SOSTENIBLE', 'METRO MEDELLÍN', 'INFRAESTRUCTURA'],
        tipo: 'fondo'
    },
    {
        id: 'schneider_electric_foundation',
        titulo: 'Schneider Electric Foundation — Energy for All (Latinoamérica)',
        donante: 'Schneider Electric Foundation',
        fuente: 'Schneider Foundation Grants Portal / Informe ESG 2025',
        sector: 'Acceso Energético / Sostenibilidad',
        dimension: 'tecnologico',
        presupuesto_usd: 300_000,
        fecha_cierre: '2026-05-31',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 87,
        pivot: 'EPM gestiona energía para millones. La Fundación EPM trabaja en comunidades que comparten territorio con la infraestructura energética. Pivot: "Eficiencia Energética Comunitaria en UVAs" — instalar paneles solares + medidores inteligentes en UVAs como modelo de acceso energético sostenible.',
        obstaculo: 'Schneider Electric tiene oficina en Colombia. Contacto directo con su gerencia de sostenibilidad vía red del Grupo EPM.',
        fuente_url: 'https://www.se.com/ww/en/about-us/schneider-electric-foundation/',
        tags: ['SCHNEIDER FOUNDATION', 'ENERGÍA COMUNIDADES', 'SOLAR UVAs', 'USD $300K'],
        tipo: 'roja'
    },
    {
        id: 'total_energies_foundation',
        titulo: 'TotalEnergies Foundation — Acceso Energético y Clima Latam',
        donante: 'TotalEnergies Foundation (Francia)',
        fuente: 'TotalEnergies Foundation / IATI',
        sector: 'Energía / Cambio Climático',
        dimension: 'ambiental',
        presupuesto_usd: 350_000,
        fecha_cierre: '2026-08-15',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 81,
        pivot: 'TotalEnergies tiene agenda de descarbonización activa y busca implementadores con infraestructura real. Pivot: co-diseñar un proyecto de energía limpia en comunidades de UVAs donde TotalEnergies financia la tecnología y EPM ejecuta territorialmente.',
        obstaculo: 'TotalEnergies opera en Colombia (gasoductos). Estrategia: contacto vía su oficina de relaciones institucionales en Bogotá.',
        fuente_url: 'https://fondation.totalenergies.com/',
        tags: ['TOTALENERGIES', 'DESCARBONIZACIÓN', 'ENERGÍA LIMPIA', 'BILATERAL EMPRESA'],
        tipo: 'fondo'
    },

    // ─── DIMENSIÓN SOCIAL: HÍDRICA + AGUA ─────────────────────
    {
        id: 'water_resilience_coalition',
        titulo: 'Water Resilience Coalition — City Water Stewardship Programme',
        donante: 'Water Resilience Coalition (UN Global Compact)',
        fuente: 'WRC / UN Global Compact CEOWM',
        sector: 'Agua / Resiliencia / Gobernanza',
        dimension: 'ambiental',
        presupuesto_usd: 500_000,
        fecha_cierre: '2026-07-01',
        estado: 'ACTIVA',
        pais_elegible: 'Colombia ✓',
        afinidad_pivot: 90,
        pivot: 'EPM gestiona cuencas hídricas que abastecen a millones en Colombia. Posicionar a EPM como "Water Steward" dentro de la coalición: no solo como proveedor sino como gestor de resiliencia hídrica territorial con participación comunitaria desde UVAs.',
        obstaculo: 'La WRC opera principalmente con corporaciones. La entrada de EPM es natural dado que el Grupo EPM es una empresa de servicios públicos. Solicitar membresía corporativa.',
        fuente_url: 'https://ceowatermandate.org/resilience/',
        tags: ['WATER RESILIENCE', 'UN GLOBAL COMPACT', 'CUENCAS HÍDRICAS', 'MATCH 90%'],
        tipo: 'roja'
    }
];


// ============================================================
// MOTOR DE CLASIFICACIÓN v3 — EXPLORADOR DE FRONTERA GLOBAL
// ============================================================
const TriageEngine_v2 = {

    profile: EPM_PLATFORM,

    /**
     * ÚNICO criterio de descarte: beca individual explícita
     */
    esRuido(opp) {
        const texto = (opp.titulo + ' ' + (opp.sector || '')).toLowerCase();
        const keywords_beca = ['beca personal', 'beca individual', 'beca para persona', 'beca universitaria', 'scholarship for individual', 'individual fellowship'];
        return keywords_beca.some(k => texto.includes(k));
    },

    /**
     * Detecta dimensión tripartita: ambiental | tecnologico | social
     */
    getDimension(opp) {
        if (opp.dimension) {
            // Mapeo legacy a nuevo
            if (opp.dimension === 'tecnologico') return 'educacion';
            return opp.dimension;
        }
        const s = (opp.sector + ' ' + (opp.titulo || '')).toLowerCase();

        // Gestión Ambiental
        if (/agua|clima|ambiental|circular|residuo|hídric|biodiver|bosque|carbono|energía|hidrógeno|solar|descarboni|plástic|naturaleza/i.test(s)) return 'ambiental';

        // Educación (incluye STEM/Tecnología bajo el nuevo esquema de Fundación)
        if (/educación|enseñanza|stem|robótic|tecnolog|digital|ia|ciencia|formación|académi|universidad|aprendizaje/i.test(s)) return 'educacion';

        // Gestión Cultural
        if (/cultura|patrimonio|biblioteca|memoria|arte|museo|patrimonio|historia/i.test(s)) return 'cultural';

        // Gestión Social
        if (/social|comunidad|paz|derechos|convivencia|territorio|infancia|humano|género|salud/i.test(s)) return 'social';

        return 'general';
    },

    /**
     * Genera el motor de PIVOT para cada oportunidad
     */
    generarPivot(opp) {
        return opp.pivot || this.profile.pivot_logic[opp.sector?.toLowerCase().replace(/\s+/g, '_')] || 'La Fundación EPM es una plataforma polivalente — adaptar infraestructura UVAs + Bibliotecas como base de ejecución.';
    },

    /**
     * Clasifica por tipo: 'roja' (acción inmediata) | 'fondo' (seguimiento) | 'reconocimiento'
     */
    clasificar(opp) {
        if (this.esRuido(opp)) return 'descarte';
        return opp.tipo || 'fondo';
    },

    /**
     * Genera dossier de carpintería técnica completo
     */
    generarDossier(opp) {
        const trm = 4100;
        const cop = opp.presupuesto_usd > 0 ? `COP $${(opp.presupuesto_usd * trm / 1_000_000).toFixed(1)}M` : 'No monetario (Retorno de Reputación)';
        const pivot = this.generarPivot(opp);

        return `DOSSIER DE CARPINTERÍA — IRIS Radar Agnóstico Total
${'═'.repeat(60)}
Convocatoria : ${opp.titulo}
Donante      : ${opp.donante}
Fuente radar : ${opp.fuente}
Sector       : ${opp.sector}
Presupuesto  : ${opp.presupuesto_usd > 0 ? `USD $${opp.presupuesto_usd.toLocaleString()} ≈ ${cop}` : 'No monetario'}
Fecha límite : ${opp.fecha_cierre}
Estado       : ${opp.estado}
Colombia     : ${opp.pais_elegible}
Afinidad EPM : ${opp.afinidad_pivot}%

VECTOR DE PIVOTAJE — "¿Cómo adaptamos nuestra infraestructura?"
${'─'.repeat(60)}
${pivot}

OBSTÁCULO CRÍTICO
${'─'.repeat(60)}
${opp.obstaculo}

ETIQUETAS DE INTELIGENCIA
${'─'.repeat(60)}
${(opp.tags || []).map(t => '[' + t + ']').join('\n')}

CHECKLIST ADMINISTRATIVO
${'─'.repeat(60)}
☐ Verificar elegibilidad exacta en: ${opp.fuente_url}
☐ Personería jurídica vigente y actualizada
☐ RUT / NIT al día  
☐ Estados financieros auditados 2024 (incluyendo pág. 15)
☐ Informe de gestión 2024 — resumen ejecutivo
☐ ${opp.presupuesto_usd > EPM_PLATFORM.financiero.max_autonomo_usd ? 'Identificar socios de consorcio según obstáculo crítico' : 'Presentación directa viable — sin consorcio requerido'}
☐ ${opp.fecha_cierre.includes('Rolling') ? 'Aplicar esta semana — convocatoria permanente' : `Preparar documentos antes de: ${opp.fecha_cierre}`}
☐ Redactar Concepto de Proyecto (CON el lenguaje del donante)
☐ Articular el "pivot" como narrativa central de la propuesta
☐ Incluir datos de impacto: 15K beneficiarios, UVAs, Bibliotecas

MANDATO DE SINCRONÍA
${'─'.repeat(60)}
He analizado esta convocatoria con Radar Agnóstico Total.
El criterio de decisión es tuyo — aquí tienes el análisis completo.
Si decides participar, el plan de captura está listo para activarse.

${'═'.repeat(60)}
Generado por IRIS v3.0 — Explorador de Frontera Global
Fundación Grupo EPM · ${new Date().toLocaleString('es-CO')}
`;
    },

    /**
     * Ejecuta el escaneo completo con clasificación v3 (tripartito)
     */
    runScan() {
        const results = {
            rojas: [],
            fondo: [],
            reconocimientos: [],
            descartados: [],
            byDimension: { ambiental: [], tecnologico: [], social: [] },
            total: GLOBAL_RADAR.length,
            timestamp: new Date()
        };

        GLOBAL_RADAR.forEach(opp => {
            // Enrich with dimension
            opp._dimension = this.getDimension(opp);
            const tipo = this.clasificar(opp);
            if (tipo === 'descarte') {
                results.descartados.push(opp);
            } else {
                if (tipo === 'roja') results.rojas.push(opp);
                else results.fondo.push(opp);
                // Bucket by dimension
                const dim = opp._dimension;
                if (results.byDimension[dim]) results.byDimension[dim].push(opp);
            }
        });

        // Sort por afinidad
        results.rojas.sort((a, b) => b.afinidad_pivot - a.afinidad_pivot);
        results.fondo.sort((a, b) => b.afinidad_pivot - a.afinidad_pivot);
        Object.values(results.byDimension).forEach(arr => arr.sort((a, b) => b.afinidad_pivot - a.afinidad_pivot));

        return results;
    }
};

// Export for Node.js scheduler
if (typeof module !== 'undefined') {
    module.exports = { TriageEngine_v2, GLOBAL_RADAR, EPM_PLATFORM, DIMENSIONES };
}
