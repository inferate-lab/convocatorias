'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, 'data.json');
const DATA_TMP = path.join(__dirname, 'data.json.tmp');
const STATUS_FILE = path.join(__dirname, 'data', 'scraper-status.json');
const STATUS_TMP = path.join(__dirname, 'data', 'scraper-status.json.tmp');
const TIMEOUT_MS = 25000;
const MAX_CONTENT_BYTES = 8 * 1024 * 1024;
const USER_AGENT = 'CENTINELA-Convocatorias/6.0 (+https://inferate-lab.github.io/convocatorias/)';
const TODAY = new Date();

const SOURCES = [
    {
        id: 'open-society',
        name: 'Open Society Foundations',
        url: 'https://www.opensocietyfoundations.org/grants/open-society-fellowship',
        adapter: 'single',
        title: 'Open Society Fellowship',
        sector: 'Derechos humanos / Desarrollo social'
    },
    {
        id: 'premios-portafolio',
        name: 'Premios Portafolio',
        url: 'https://premios.portafolio.co/usuario/postulacion',
        adapter: 'single',
        title: 'Premios Portafolio 2026',
        sector: 'Innovación / Gestión social'
    },
    {
        id: 'earthna-prize',
        name: 'Earthna Prize',
        url: 'https://www.earthna.qa/earthna-prize-2026',
        adapter: 'single',
        title: 'Earthna Prize 2026',
        sector: 'Sostenibilidad / Conocimiento tradicional'
    },
    {
        id: 'qs-impact',
        name: 'QS ImpACT Awards',
        url: 'https://qsimpact.org/awards',
        adapter: 'single',
        title: 'QS ImpACT Awards',
        sector: 'Educación / Impacto social'
    },
    {
        id: 'ong-link',
        name: 'ONG Link',
        url: 'https://onglink.org/oportunidades/Financiamiento',
        adapter: 'generic-list',
        sector: 'Cooperación / Financiamiento'
    },
    {
        id: 'wepropel',
        name: 'Oportunidades Propel',
        url: 'https://www.wepropel.org/oportunidades',
        adapter: 'wepropel',
        sector: 'Cooperación / Grants'
    },
    {
        id: 'red-exposocial',
        name: 'Red ExpoSocial',
        url: 'https://redexposocial.org/category/convocatorias/feed/',
        publicUrl: 'https://redexposocial.org/convocatorias/',
        adapter: 'rss',
        sector: 'Desarrollo social / Convocatorias'
    },
    {
        id: 'global-health-learning',
        name: 'Global Health & Learning',
        url: 'https://ghl.spread.name/',
        adapter: 'generic-list',
        sector: 'Salud / Aprendizaje'
    }
];

const http = axios.create({
    timeout: TIMEOUT_MS,
    maxContentLength: MAX_CONTENT_BYTES,
    maxBodyLength: MAX_CONTENT_BYTES,
    responseType: 'text',
    headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,application/rss+xml;q=0.9',
        'Accept-Language': 'es-CO,es;q=0.9,en;q=0.7',
        'User-Agent': USER_AGENT
    },
    validateStatus: status => status >= 200 && status < 400
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim();
const trimText = (value, max = 700) => cleanText(value).slice(0, max);

function slug(value) {
    return cleanText(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 90);
}

function stableId(sourceId, title, url) {
    const hash = crypto.createHash('sha1').update(`${sourceId}|${title}|${url}`).digest('hex').slice(0, 10);
    return `scraped-${sourceId}-${slug(title).slice(0, 45)}-${hash}`;
}

function absoluteUrl(candidate, base) {
    try {
        const parsed = new URL(candidate || base, base);
        return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : base;
    } catch {
        return base;
    }
}

const MONTHS = {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
    noviembre: 11, diciembre: 12, january: 1, february: 2, march: 3,
    april: 4, may: 5, june: 6, july: 7, august: 8, september: 9,
    october: 10, november: 11, december: 12
};

function isoDate(year, month, day) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59));
    if (Number.isNaN(date.getTime())) return '';
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function extractDeadline(text) {
    const value = cleanText(text).toLowerCase();
    let match = value.match(/\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/);
    if (match) return isoDate(match[1], match[2], match[3]);

    match = value.match(/\b(\d{1,2})[/.](\d{1,2})[/.](20\d{2})\b/);
    if (match) return isoDate(match[3], match[2], match[1]);

    match = value.match(/\b(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(20\d{2})\b/);
    if (match && MONTHS[match[2]]) return isoDate(match[3], MONTHS[match[2]], match[1]);

    match = value.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2}),?\s+(20\d{2})\b/);
    if (match) return isoDate(match[3], MONTHS[match[1]], match[2]);
    return '';
}

function isActive(item) {
    if (!item.fecha_cierre || item.fecha_cierre === 'Revisar en plataforma') return true;
    const deadline = new Date(`${item.fecha_cierre}T23:59:59Z`);
    return Number.isNaN(deadline.getTime()) || deadline >= TODAY;
}

function inferSector(text, fallback) {
    const value = cleanText(text).toLowerCase();
    if (/clima|ambient|agua|biodivers|sostenib|energ/.test(value)) return 'Ambiente / Sostenibilidad';
    if (/educa|aprendiz|univers|student|youth|j[oó]ven/.test(value)) return 'Educación / Juventud';
    if (/salud|health|bienestar|mental/.test(value)) return 'Salud / Bienestar';
    if (/tecnolog|digital|software|innovaci[oó]n| ai |inteligencia artificial/.test(` ${value} `)) return 'Tecnología / Innovación';
    if (/derechos|inclusi[oó]n|social|paz|cultura|intercultural/.test(value)) return 'Desarrollo social / Derechos';
    return fallback;
}

function inferAffinity(text) {
    const value = cleanText(text).toLowerCase();
    let score = 58;
    if (/colombia|antioquia|am[eé]rica latina|latin america/.test(value)) score += 14;
    if (/organizaci[oó]n|fundaci[oó]n|nonprofit|ong|comunitar/.test(value)) score += 9;
    if (/agua|energ|biodivers|educa|tecnolog|social|territori/.test(value)) score += 7;
    return Math.min(score, 92);
}

function amountUsd(text) {
    const value = cleanText(text).replace(/,/g, '');
    const currency = value.match(/\b(USD|US\$|\$)\s*([0-9]+(?:\.[0-9]+)?)/i);
    return currency ? Math.round(Number(currency[2])) : 0;
}

function makeOpportunity(source, fields) {
    const title = trimText(fields.title, 220);
    const sourceUrl = absoluteUrl(fields.url || source.publicUrl || source.url, source.url);
    const combined = `${title} ${fields.description || ''} ${fields.eligibility || ''}`;
    const affinity = inferAffinity(combined);
    const budget = Number(fields.budgetUsd || 0);
    return {
        id: stableId(source.id, title, sourceUrl),
        titulo: title,
        donante: trimText(fields.entity || source.name, 140),
        fuente: source.name,
        sector: inferSector(combined, source.sector),
        dimension: inferSector(combined, source.sector).startsWith('Ambiente') ? 'ambiental' : 'social',
        presupuesto_usd: budget,
        fecha_cierre: fields.deadline || 'Revisar en plataforma',
        estado: fields.deadline ? 'CONVOCATORIA VIGENTE' : 'VERIFICAR VIGENCIA EN LA FUENTE',
        pais_elegible: /colombia/i.test(combined) ? 'Colombia mencionada ✓' : 'Validar elegibilidad',
        afinidad_pivot: affinity,
        pivot: trimText(fields.description || `Oportunidad publicada por ${source.name}. Validar requisitos y elegibilidad en la fuente original.`, 700),
        obstaculo: fields.deadline ? 'Validar requisitos, documentación y elegibilidad en la fuente oficial.' : 'La fuente no publica una fecha estructurada; verificar vigencia antes de postular.',
        fuente_url: sourceUrl,
        tags: ['RASTREO EN VIVO', source.name.toUpperCase().slice(0, 34)],
        tipo: budget >= 100000 || affinity >= 82 ? 'roja' : 'fondo',
        rastreado: true,
        origen_rastreo: source.id,
        capturado_en: new Date().toISOString()
    };
}

function labeledValue($, root, label) {
    let result = '';
    $(root).find('.text-weight-semibold').each((_, node) => {
        if (result || cleanText($(node).text()).toLowerCase() !== label.toLowerCase()) return;
        const parent = $(node).parent();
        result = cleanText(parent.find('.text-color-gray').first().text());
    });
    return result;
}

function parseWePropel(source, html) {
    const $ = cheerio.load(html);
    const opportunities = [];
    $('.fs_modal-1_wrapper.is-base').each((_, wrapper) => {
        const title = cleanText($(wrapper).find('.base_modal-title').first().text());
        if (!title) return;
        const entity = cleanText($(wrapper).find('.base_modal-header .text-color-gray').first().text()) || source.name;
        const deadline = extractDeadline(labeledValue($, wrapper, 'Fecha de cierre'));
        const description = labeledValue($, wrapper, 'Descripción');
        const eligibility = labeledValue($, wrapper, 'Elegibilidad');
        const detailedAmount = labeledValue($, wrapper, 'Monto detallado');
        const applyUrl = $(wrapper).find('a.button.is-apply[href], a[class*="is-apply"][href]').first().attr('href');
        const amountText = cleanText($(wrapper).find('.base_amount.is-small').first().text());
        const item = makeOpportunity(source, {
            title,
            entity,
            deadline,
            description,
            eligibility,
            budgetUsd: amountUsd(`${amountText} ${detailedAmount}`),
            url: applyUrl || source.url
        });
        if (isActive(item)) opportunities.push(item);
    });
    return opportunities.slice(0, 40);
}

function parseRss(source, xml) {
    const $ = cheerio.load(xml, { xmlMode: true });
    const opportunities = [];
    $('item').each((_, item) => {
        const title = cleanText($(item).children('title').first().text());
        const link = cleanText($(item).children('link').first().text()) || source.publicUrl;
        const publishedAt = new Date(cleanText($(item).children('pubDate').first().text()));
        const rawDescription = $(item).children('content\\:encoded, description').first().text();
        const description = cleanText(cheerio.load(rawDescription).text());
        if (!title) return;
        const deadline = extractDeadline(`${title} ${description}`);
        const staleWithoutDeadline = !deadline
            && !Number.isNaN(publishedAt.getTime())
            && TODAY.getTime() - publishedAt.getTime() > 120 * 24 * 60 * 60 * 1000;
        if (staleWithoutDeadline) return;
        const opportunity = makeOpportunity(source, {
            title,
            description,
            deadline,
            url: link
        });
        if (isActive(opportunity)) opportunities.push(opportunity);
    });
    return opportunities;
}

function parseSingle(source, html) {
    const $ = cheerio.load(html);
    $('script,style,noscript,svg,nav,footer').remove();
    const body = cleanText($('body').text());
    const deadline = extractDeadline(body);
    const title = source.title || cleanText($('h1').first().text()) || cleanText($('title').text());
    const metaDescription = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');
    const description = metaDescription || $('main p, article p').filter((_, p) => cleanText($(p).text()).length > 80).first().text();
    const openSignal = Boolean(deadline) || /apply now|submit your application|postulaci[oó]n|applications? (?:are )?open|convocatoria|award 2026|premios? portafolio 2026/i.test(`${title} ${body}`);
    const closedSignal = /applications? (?:are )?closed|convocatoria cerrada|submissions? (?:are )?closed/i.test(body);
    if (!title || !openSignal || (closedSignal && !deadline)) return [];
    const opportunity = makeOpportunity(source, { title, description, deadline, url: source.url });
    return isActive(opportunity) ? [opportunity] : [];
}

function parseGenericList(source, html) {
    const $ = cheerio.load(html);
    const opportunities = [];
    const selector = 'article, .post, .card, .views-row, [class*="opportunity-card"], [class*="grant-card"]';
    $(selector).slice(0, 40).each((_, node) => {
        const title = cleanText($(node).find('h1,h2,h3,h4,[class*="title"]').first().text());
        const text = cleanText($(node).text());
        const href = $(node).find('a[href]').first().attr('href');
        if (!title || text.length < 80 || !/grant|fondo|financia|convocatoria|award|premio|fellowship|beca|oportunidad/i.test(text)) return;
        const opportunity = makeOpportunity(source, {
            title,
            description: text,
            deadline: extractDeadline(text),
            budgetUsd: amountUsd(text),
            url: href || source.url
        });
        if (isActive(opportunity)) opportunities.push(opportunity);
    });
    return opportunities;
}

const robotsCache = new Map();
async function robotsAllows(url) {
    const parsed = new URL(url);
    const origin = parsed.origin;
    if (!robotsCache.has(origin)) {
        try {
            const response = await http.get(`${origin}/robots.txt`, { headers: { Accept: 'text/plain' } });
            robotsCache.set(origin, String(response.data || ''));
        } catch {
            robotsCache.set(origin, '');
        }
    }
    const lines = robotsCache.get(origin).split(/\r?\n/);
    let applies = false;
    const disallowed = [];
    for (const raw of lines) {
        const line = raw.replace(/#.*/, '').trim();
        if (!line) continue;
        const [key, ...rest] = line.split(':');
        const value = rest.join(':').trim();
        if (key.toLowerCase() === 'user-agent') applies = value === '*';
        if (applies && key.toLowerCase() === 'disallow' && value) disallowed.push(value);
    }
    return !disallowed.some(rule => parsed.pathname.startsWith(rule));
}

async function scrapeSource(source) {
    if (!(await robotsAllows(source.url))) {
        return { source, status: 'skipped', opportunities: [], message: 'Bloqueado por robots.txt' };
    }
    const response = await http.get(source.url);
    const html = String(response.data || '');
    let opportunities = [];
    if (source.adapter === 'wepropel') opportunities = parseWePropel(source, html);
    else if (source.adapter === 'rss') opportunities = parseRss(source, html);
    else if (source.adapter === 'single') opportunities = parseSingle(source, html);
    else opportunities = parseGenericList(source, html);
    return { source, status: 'success', opportunities, message: `HTTP ${response.status}` };
}

function deduplicate(items) {
    const byKey = new Map();
    for (const item of items.filter(isActive)) {
        const key = `${cleanText(item.fuente_url).toLowerCase()}|${cleanText(item.titulo).toLowerCase()}`;
        const current = byKey.get(key);
        if (!current || Number(item.afinidad_pivot || 0) > Number(current.afinidad_pivot || 0)) byKey.set(key, item);
    }
    return [...byKey.values()].sort((a, b) => Number(b.afinidad_pivot || 0) - Number(a.afinidad_pivot || 0));
}

function atomicWrite(target, temp, value) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(temp, target);
}

async function run() {
    console.log('Iniciando rastreo real de convocatorias...');
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const results = [];

    for (const source of SOURCES) {
        try {
            console.log(`Rastreando ${source.name}...`);
            results.push(await scrapeSource(source));
        } catch (error) {
            results.push({ source, status: 'failed', opportunities: [], message: error.message });
            console.warn(`${source.name}: ${error.message}`);
        }
        await sleep(1200);
    }

    const refreshedIds = new Set(results.filter(result => result.status === 'success').map(result => result.source.id));
    const curated = existing.filter(item => !item.rastreado);
    const retainedScraped = existing.filter(item => item.rastreado && !refreshedIds.has(item.origen_rastreo));
    const scraped = results.flatMap(result => result.opportunities);
    const combined = deduplicate([...curated, ...retainedScraped, ...scraped]);

    const status = {
        last_run: new Date().toISOString(),
        active_opportunities: combined.length,
        scraped_opportunities: combined.filter(item => item.rastreado).length,
        sources_ok: results.filter(result => result.status === 'success').length,
        sources_failed: results.filter(result => result.status === 'failed').length,
        sources_skipped: results.filter(result => result.status === 'skipped').length,
        sources: results.map(result => ({
            id: result.source.id,
            name: result.source.name,
            status: result.status,
            found: result.opportunities.length,
            message: result.message
        }))
    };

    atomicWrite(DATA_FILE, DATA_TMP, combined);
    atomicWrite(STATUS_FILE, STATUS_TMP, status);
    console.log(`Rastreo finalizado: ${status.scraped_opportunities} oportunidades rastreadas, ${status.active_opportunities} activas en total.`);
    console.log(`Fuentes: ${status.sources_ok} correctas, ${status.sources_failed} con error, ${status.sources_skipped} omitidas.`);
}

run().catch(error => {
    console.error('Error fatal del rastreador:', error);
    for (const temp of [DATA_TMP, STATUS_TMP]) if (fs.existsSync(temp)) fs.unlinkSync(temp);
    process.exitCode = 1;
});
