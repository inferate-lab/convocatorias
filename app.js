/**
 * CENTINELA v5.0 — App Core
 * FUNDACIÓN GRUPO EPM · NODO DE INTELIGENCIA ESTRATÉGICA AUTÓNOMA
 * Sincronización automática: rastreo diario y ejecución manual
 */

// Estado global
let currentScanResults = null;
let scanLog = [];
let activeDossier = null;
let activeDimFilter = 'all'; // 'all' | 'ambiental' | 'tecnologico' | 'social'

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
}

function safeExternalUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
    } catch {
        return '#';
    }
}

// ============================================================
// PROTOCOLO DE SALIDA v3 — Voz del Director de Estrategia
// ============================================================
const OutputProtocol = {
    voice(level, message) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-CO', { hour12: false });
        const entry = { time: timeStr, level, message };
        scanLog.push(entry);

        const terminal = document.getElementById('outputTerminal');
        if (!terminal) return;
        const line = document.createElement('div');
        line.className = 'terminal-line';

        const tagMap = {
            system: ['tag-system', 'SISTEMA'],
            red: ['tag-red', 'ALERTA ROJA'],
            amber: ['tag-amber', 'INTEL'],
            shadow: ['tag-shadow', 'SHADOW'],
            noise: ['tag-noise', 'DESCARTE'],
            ok: ['tag-ok', 'OK'],
            pivot: ['tag-purple', 'PIVOT'],
            geo: ['tag-cyan', 'GEOPOLÍTICA'],
            ambiental: ['tag-ok', '🌿 AMBIENTAL'],
            educacion: ['tag-cyan', '📚 EDUCACIÓN'],
            cultural: ['tag-amber', '🎭 CULTURAL'],
            social: ['tag-purple', '🤝 SOCIAL'],
            estrategica: ['tag-warn', '⭐ ESTRATÉGICA'],
            general: ['tag-system', '🌐 GENERAL'],
        };
        const [tagClass, tagLabel] = tagMap[level] || ['tag-system', 'INFO'];
        line.innerHTML = `<span class="mono terminal-time">[${timeStr}]</span><span class="terminal-tag ${tagClass}">${tagLabel}</span><span>${message}</span>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    },

    reportOpportunity(opp) {
        const dim = opp._dimension || 'social';
        const dimIcons = { ambiental: '🌿', tecnologico: '⚡', social: '🤝' };
        const accion = opp.tipo === 'roja'
            ? `He detectado un <strong>Movimiento Estratégico de alto valor</strong>`
            : `He detectado una señal estratégica en el radar global`;
        const needsConsortium = opp.presupuesto_usd > EPM_PLATFORM.financiero.max_autonomo_usd;
        return `${dimIcons[dim]} ${accion}: <strong>${opp.titulo}</strong> [${opp.sector}] — ${opp.afinidad_pivot}% de afinidad estratégica. ${needsConsortium ? '⚠ Consorcio recomendado.' : '✅ Ejecución autónoma viable.'} Fuente: ${opp.fuente}.`;
    }
};

// Dimension badge helper
function dimBadge(opp) {
    const d = opp._dimension || 'social';
    const map = { ambiental: '🌿', educacion: '📚', cultural: '🎭', social: '🤝', estrategica: '⭐' };
    const colors = { ambiental: 'tag-match', educacion: 'tag-cyan-badge', cultural: 'tag-warn', social: 'tag', estrategica: 'tag-warn pulse' };
    return `<span class="tag ${colors[d] || 'tag'}">${map[d] || '⭐'} ${d.charAt(0).toUpperCase() + d.slice(1)}</span>`;
}

// Tag CSS helper
function tagCss(tag) {
    if (tag === 'NUEVA') return 'tag tag-warn pulse'; // Highlighting new opportunities
    if (tag.includes('TRIPLE A') || tag.includes('USD') || tag.includes('ROJA')) return 'tag tag-warn';
    if (tag.includes('MATCH') || tag.includes('%') || tag.includes('VIABLE')) return 'tag tag-match';
    if (tag.includes('PIVOT') || tag.includes('SEÑAL')) return 'tag';
    return 'tag';
}

// ============================================================
// DIMENSION FILTER
// ============================================================
function filterByDimension(dim) {
    activeDimFilter = dim;
    // Update buttons
    document.querySelectorAll('.dim-filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.dim === dim);
    });
    if (!currentScanResults) return;
    const r = currentScanResults;
    const filterFn = opp => dim === 'all' || opp._dimension === dim;
    renderRedAlerts(r.rojas.filter(filterFn));
    renderIntel(r.fondo.filter(filterFn));
}

// ============================================================
// RENDER: RED ALERTS (Rojas)
// ============================================================
function renderRedAlerts(opps) {
    const container = document.getElementById('redAlertContainer');
    if (!opps.length) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">📡</div><p>Buscando nuevas oportunidades en tiempo real...</p><p class="empty-sub">Monitorizando fuentes estratégicas (Adidas, GSMA, etc.) sin resultados vigentes detectados hoy.</p></div>`;
        return;
    }
    container.innerHTML = '';
    opps.forEach((opp, i) => {
        const needsC = opp.presupuesto_usd > EPM_PLATFORM.financiero.max_autonomo_usd;
        const title = escapeHtml(opp.titulo);
        const donor = escapeHtml(opp.donante);
        const sector = escapeHtml(opp.sector);
        const source = escapeHtml(opp.fuente);
        const country = escapeHtml(opp.pais_elegible);
        const pivot = escapeHtml(opp.pivot?.substring(0, 120));
        const obstacle = escapeHtml(opp.obstaculo?.substring(0, 100));
        const sourceUrl = safeExternalUrl(opp.fuente_url);
        const card = document.createElement('div');
        card.className = 'opp-card card-red';
        card.style.animationDelay = `${i * 0.06}s`;
        card.innerHTML = `
      <div class="opp-card-header">
        <div class="opp-title">${title}</div>
        <div class="opp-budget">${opp.presupuesto_usd > 0 ? `USD $${(opp.presupuesto_usd / 1000).toFixed(0)}K` : '🏆 Premio'}</div>
      </div>
      <div class="opp-donor">${donor} &nbsp;·&nbsp; <span style="color:rgba(255,255,255,0.6);font-size:10px;">${sector}</span></div>
      <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-bottom:8px;font-family:var(--font-mono);">📡 ${source} &nbsp;·&nbsp; ${country}</div>
      <div class="opp-desc" style="font-size:11px;color:rgba(255,255,255,0.9);margin-bottom:8px;font-style:italic;">🔄 PIVOT: ${pivot}...</div>
      <div class="opp-tags">
        ${dimBadge(opp)}
        ${(opp.tags || []).map(t => `<span class="${tagCss(String(t))}">${escapeHtml(t)}</span>`).join('')}
        ${needsC ? '<span class="tag tag-warn">⚠ CONSORCIO</span>' : '<span class="tag tag-match">✓ AUTÓNOMO</span>'}
      </div>
      <div class="opp-match-bar">
        <div class="match-label"><span>Vector de Afinidad Estratégica</span><span>${opp.afinidad_pivot}%</span></div>
        <div class="match-track"><div class="match-fill" style="width:0%" data-target="${opp.afinidad_pivot}"></div></div>
      </div>
      <div style="font-size:10px;color:#ffca28;margin-bottom:10px;">⚠ OBSTÁCULO: ${obstacle}...</div>
      <div class="opp-actions">
        <button class="btn-dossier" onclick="openDossier('${opp.id}')">📁 Dossier de Carpintería</button>
        <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="dossier-btn">📁 Dossier / Ir a la Fuente</a>
      </div>
    `;
        container.appendChild(card);
    });
    animateBars();
}

// ============================================================
// RENDER: INTEL (Fondo)
// ============================================================
function renderIntel(opps) {
    const container = document.getElementById('intelContainer');
    if (!opps.length) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p>Buscando nuevas oportunidades en tiempo real...</p><p class="empty-sub">Monitorizando inteligencia de fondo post-limpieza.</p></div>`;
        return;
    }
    container.innerHTML = '';
    opps.forEach((opp, i) => {
        const sourceUrl = safeExternalUrl(opp.fuente_url);
        const item = document.createElement('div');
        item.className = 'intel-item';
        item.style.animationDelay = `${i * 0.06}s`;
        item.innerHTML = `
      <div class="intel-category">${escapeHtml(opp.sector?.toUpperCase())} · ${opp.afinidad_pivot}% AFINIDAD · ${escapeHtml(opp.estado)}</div>
      <div class="intel-title">${escapeHtml(opp.titulo)}</div>
      <div class="intel-desc">${escapeHtml(opp.donante)} · ${opp.presupuesto_usd > 0 ? `USD $${opp.presupuesto_usd.toLocaleString()}` : 'No monetario'} · Límite: ${escapeHtml(opp.fecha_cierre)}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-top:6px;">🔄 ${escapeHtml(opp.pivot?.substring(0, 100))}...</div>
      <div class="opp-actions intel-actions">
        <button class="btn-detail" onclick="openDossier('${opp.id}')">📁 Dossier</button>
        <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="dossier-btn">📁 Dossier / Ir a la Fuente</a>
      </div>
    `;
        container.appendChild(item);
    });
}

// ============================================================
// RENDER: SHADOW WORK — Señales Emergentes Frontera Global
// ============================================================
function renderShadow() {
    const container = document.getElementById('shadow-cards-container');
    if (!container) return;

    const signals = [
        { icon: '🟢', dim: 'ambiental', company: 'Mission Innovation / IEA', type: 'H₂ VERDE — Tracking Colombia Q2 2026', text: 'Mission Innovation-8 está rastreando Colombia como candidata a "Hydrogen Valley" en Latam. Los fondos de implementación post-cumbre están siendo asignados. El corredor Bogotá-Medellín es la zona más observada.', action: 'Consorcio EPM Generación + EAFIT + Fundación. Presentar ante UPME Colombia como operador técnico de transición.', sourceUrl: 'https://mission-innovation.net/missions/hydrogen/' },
        { icon: '🟢', dim: 'ambiental', company: 'Kunming-Montreal GBF / COP16', type: 'BIODIVERSIDAD URBANA — Medellín Ciudad Piloto', text: 'El Marco Mundial de Biodiversidad Kunming-Montreal impulsa recursos y compromisos de implementación. Colombia puede articular infraestructura de naturaleza urbana con participación comunitaria.', action: 'Posicionamiento ante Ministerio de Ambiente + Instituto Humboldt para co-postulación.', sourceUrl: 'https://www.cbd.int/gbf' },
        { icon: '⚡', dim: 'tecnologico', company: 'Schneider Electric + TotalEnergies', type: 'FUNDACIONES CORPORATIVAS DE DESCARBONIZACIÓN', text: 'Las multinacionales con agenda ESG 2030 buscan activos territoriales en Latinoamérica para ejecutar compromisos de descarbonización. El Grupo EPM combina infraestructura energética y capacidad social.', action: 'Mapear agendas ESG de las principales multinacionales energéticas con presencia en Colombia.', sourceUrl: 'https://www.se.com/ww/en/about-us/sustainability/' },
        { icon: '📡', dim: 'ambiental', company: 'IATI / Ellen MacArthur Foundation', type: 'ECONOMÍA CIRCULAR — Madera Plástica Colombia', text: 'Los flujos hacia proyectos de economía circular muestran oportunidades de valorización de residuos en ciudades latinoamericanas. Las comunidades pueden conformar redes de recolección y transformación.', action: 'Mapear empresas de reciclaje de plásticos en Antioquia para estructurar un consorcio técnico.', sourceUrl: 'https://www.ellenmacarthurfoundation.org/' },
        { icon: '🌐', dim: 'tecnologico', company: 'Royal Academy of Engineering', type: 'ACADEMIAS GLOBALES DE INGENIERÍA — LATAM', text: 'Las alianzas internacionales de ingeniería ofrecen una vía para conectar capacidad técnica, educación y retos territoriales. EPM + EAFIT tienen perfil para estructurar un nodo regional.', action: 'Contactar British Council Colombia + Academia Colombiana de Ciencias y presentar el concepto Engineering Hub.', sourceUrl: 'https://raeng.org.uk/' },
        { icon: '📡', dim: 'social', company: 'Bancolombia / Telefónica ESG', type: 'SEÑALES SILENCIOSAS LOCALES', text: 'Las agendas de sostenibilidad corporativa ofrecen oportunidades para proyectos de economía del conocimiento e inclusión digital en territorios vulnerables.', action: 'Gestionar reuniones con las áreas de sostenibilidad para validar encaje, convocatoria y ruta de financiación.', sourceUrl: 'https://www.grupobancolombia.com/sostenibilidad' }
    ];

    container.innerHTML = '';
    signals.forEach((sig, i) => {
        const dimColors = { ambiental: '#10B981', tecnologico: '#06B6D4', social: '#8B5CF6' };
        const dimLabels = { ambiental: '🌿 Ambiental', tecnologico: '⚡ Tecnológico', social: '🤝 Social' };
        const card = document.createElement('article');
        card.className = 'shadow-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.style.borderLeftColor = dimColors[sig.dim] || '#00ff88';
        card.innerHTML = `
            <div class="shadow-type">${sig.icon} SEÑAL FRONTERA · <span style="color:${dimColors[sig.dim]};">${dimLabels[sig.dim]}</span> · ${sig.type} · <strong>${sig.company}</strong></div>
            <p class="shadow-text">“${sig.text}”</p>
            <span class="shadow-action action-text">→ Acción: ${sig.action}</span>
            <a class="source-link-btn" href="${sig.sourceUrl}" target="_blank" rel="noopener noreferrer">Consultar fuente oficial ↗</a>
        `;
        container.appendChild(card);
    });
}

// ============================================================
// RENDER: NOISE (solo becas individuales)
// ============================================================
function renderNoise(opps) {
    const container = document.getElementById('noiseContainer');
    if (!opps.length) {
        container.innerHTML = `<div class="empty-state"><p>Sin descartes. El Radar Agnóstico procesó todo.</p></div>`;
        return;
    }
    container.innerHTML = '';
    opps.forEach((opp, i) => {
        const item = document.createElement('div');
        item.className = 'noise-item';
        item.innerHTML = `<span class="noise-name">❌ ${opp.titulo}</span><span class="noise-reason">Beca individual — único criterio de descarte</span>`;
        container.appendChild(item);
    });
}

function updateStats(results) {
    animateNumber('countRed', results.rojas.length);
    animateNumber('countAmber', results.fondo.length);
    animateNumber('countSilent', 6); // Frontier shadow signals
    animateNumber('countNoise', results.descartados.length);
    // Update dimension bars if elements exist
    const dims = results.byDimension || {};
    ['ambiental', 'social', 'educacion', 'cultural', 'estrategica'].forEach(d => {
        const el = document.getElementById(`dimCount_${d}`);
        if (el) el.textContent = (dims[d] || []).length;
    });
}

// ============================================================
// MAIN SCAN
// ============================================================
async function runFullScan() {
    const btn = document.getElementById('runScanBtn');
    btn.classList.add('scanning');
    btn.disabled = true;
    btn.textContent = 'Analizando...';

    const overlay = document.createElement('div');
    overlay.className = 'scanning-overlay';
    overlay.innerHTML = '<div class="scan-beam"></div>';
    document.body.appendChild(overlay);

    OutputProtocol.voice('system', '━━━ CENTINELA v5.0 — NODO DE INTELIGENCIA ESTRATÉGICA AUTóNOMA iniciado ━━━');
    await delay(400);
    OutputProtocol.voice('system', 'Protocolo activo. Datos vigentes cargados; rastreo automático y purga dinámica habilitados.');
    await delay(500);
    OutputProtocol.voice('geo', 'Escaneando (Grants, Awards, Prizes, Nominations, Open Calls, Call for entries): TED (UE), Grants.gov, UNGM, Suqia UAE, Zayed, IWA, SURA, Scotiabank...');
    await delay(500);
    OutputProtocol.voice('geo', 'Procesando señales geopolíticas: COP16 compromisos biodiversidad, H₂ verde MI-8, Global Gateway EU €300M, GBIF urban data...');
    await delay(600);
    OutputProtocol.voice('ambiental', 'Radarizando: Hidrógeno verde · Economía circular · Biodiversidad urbana · Madera plástica · Cuencas hídricas...');
    await delay(400);
    OutputProtocol.voice('tecnologico', 'Radarizando: RAEng · InterAcademy · Alstom · Schneider · TotalEnergies · IAP STEM · EU Digital...');
    await delay(400);
    OutputProtocol.voice('pivot', 'Motor de Pivotaje v3 activo. No reportamos links. Reportamos Movimientos Estratégicos.');
    await delay(400);

    const results = await TriageEngine_v2.runScan();
    
    // Fetch ruido.json si existe
    let ruidoExterno = [];
    try {
        const response = await fetch('./ruido.json');
        if (response.ok) {
            ruidoExterno = await response.json();
        }
    } catch (e) {
        console.log("No se encontró ruido.json o hay error de CORS");
    }
    
    // Unir descartados locales con el ruido purgado
    const todosDescartados = [...results.descartados, ...ruidoExterno];
    results.descartados = todosDescartados;
    
    currentScanResults = results;

    const dims = results.byDimension || {};
    OutputProtocol.voice('ok', `Radar completo: ${results.total} oportunidades · 🌿 ${(dims.ambiental || []).length} Ambiental · ⚡ ${(dims.tecnologico || []).length} Tecnológico · 🤝 ${(dims.social || []).length} Social.`);
    await delay(200);

    results.rojas.slice(0, 5).forEach(opp => {
        OutputProtocol.voice('red', OutputProtocol.reportOpportunity(opp));
    });
    if (results.rojas.length > 5) {
        OutputProtocol.voice('red', `...y ${results.rojas.length - 5} alertas rojas adicionales en el panel.`);
    }
    results.fondo.slice(0, 3).forEach(opp => {
        OutputProtocol.voice('amber', `Movimiento estratégico: ${opp.titulo} [${opp.sector}] — ${opp.afinidad_pivot}% afinidad. PIVOT: ${opp.pivot?.substring(0, 80)}...`);
    });
    if (results.descartados.length > 0) {
        OutputProtocol.voice('noise', `${results.descartados.length} descartados (becas individuales — único criterio de descarte).`);
    }

    await delay(300);
    OutputProtocol.voice('ok', `CICLO COMPLETO. ${results.rojas.length} Alertas Rojas · ${results.fondo.length} Intel de Fondo · 6 Señales Frontera · ${todosDescartados.length} Descartados.`);

    renderRedAlerts(results.rojas);
    renderIntel(results.fondo);
    renderShadow();
    renderNoise(todosDescartados);
    updateStats({ ...results, descartados: todosDescartados });

    document.getElementById('lastScanTime').textContent = new Date().toLocaleTimeString('es-CO', { hour12: false });

    btn.classList.remove('scanning');
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Ejecutar Escaneo`;
    document.body.removeChild(overlay);
}

// ============================================================
// DOSSIER
// ============================================================
function openDossier(oppId) {
    const results = currentScanResults;
    if (!results) return;
    const allOpps = [...results.rojas, ...results.fondo];
    const opp = allOpps.find(o => o.id === oppId);
    if (!opp) return;
    activeDossier = opp;

    const needsC = opp.presupuesto_usd > EPM_PLATFORM.financiero.max_autonomo_usd;
    const content = document.getElementById('dossierContent');
    content.innerHTML = `
    <div style="margin-bottom:16px;padding:16px;background:rgba(${opp.tipo === 'roja' ? '217,43,58' : '224,138,0'},.05);border:1px solid rgba(${opp.tipo === 'roja' ? '217,43,58' : '224,138,0'},.2);border-radius:10px;">
      <div style="font-size:10px;color:${opp.tipo === 'roja' ? '#d92b3a' : '#e08a00'};font-weight:700;letter-spacing:1px;margin-bottom:6px;">${opp.tipo === 'roja' ? '🔴 ALERTA ROJA' : '🟡 INTEL DE FONDO'} &nbsp;·&nbsp; ${opp.sector?.toUpperCase()}</div>
      <div style="font-size:17px;font-weight:800;margin-bottom:4px;color:#0f172a;">${opp.titulo}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.8);">${opp.donante}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:4px;">📡 Fuente Radar: ${opp.fuente}</div>
      <div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap;">
        <div style="font-size:11px;color:rgba(255,255,255,0.9);">💰 <strong style="color:rgba(255,255,255,0.8);">${opp.presupuesto_usd > 0 ? `USD $${opp.presupuesto_usd.toLocaleString()}` : 'No monetario'}</strong></div>
        <div style="font-size:11px;color:rgba(255,255,255,0.9);">📅 <strong style="color:#ffca28;">${opp.fecha_cierre}</strong></div>
        <div style="font-size:11px;color:rgba(255,255,255,0.9);">🎯 <strong style="color:#004b8d;">${opp.afinidad_pivot}%</strong></div>
        <div style="font-size:11px;color:rgba(255,255,255,0.9);">🌍 ${opp.pais_elegible}</div>
      </div>
    </div>

    <div class="dossier-section">
      <div class="dossier-section-title">🔄 Vector de Pivotaje — "¿Cómo adaptamos nuestra infraestructura?"</div>
      <div class="dossier-win-analysis">${opp.pivot}</div>
    </div>

    <div class="dossier-section">
      <div class="dossier-section-title" style="color:#ffca28;">⚠ Obstáculo Crítico</div>
      <div class="dossier-win-analysis" style="color:#b45309;">${opp.obstaculo}</div>
    </div>

    ${needsC ? `
    <div class="dossier-section">
      <div class="dossier-section-title" style="color:#F59E0B;">🤝 Consorcio Recomendado</div>
      <div style="padding:12px;background:rgba(224,138,0,.07);border:1px solid rgba(224,138,0,.2);border-radius:8px;font-size:12px;color:rgba(255,255,255,0.9);">
        El presupuesto (USD $${opp.presupuesto_usd.toLocaleString()}) supera la ejecución autónoma segura (USD $${EPM_PLATFORM.financiero.max_autonomo_usd.toLocaleString()}).<br><br>
        <strong style="color:#0f172a;">Socios pre-identificados:</strong><br>
        ${EPM_PLATFORM.activos.capital_humano.map(s => '• ' + s).join('<br>')}
      </div>
    </div>` : ''}

    <div class="dossier-section">
      <div class="dossier-section-title">🏷 Etiquetas de Inteligencia</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${(opp.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <div class="dossier-section">
      <div class="dossier-section-title">✅ Checklist de Carpintería</div>
      <ul class="dossier-checklist">
        ${[
            `Verificar elegibilidad exacta en: ${opp.fuente_url}`,
            'Personería jurídica vigente y actualizada',
            'RUT / NIT al día',
            'Estados financieros auditados 2024 (pág. 15)',
            'Informe de gestión 2024 — resumen ejecutivo',
            needsC ? 'Identificar socio de consorcio según obstáculo crítico' : 'Presentación directa — sin consorcio',
            opp.fecha_cierre.includes('Rolling') ? 'APLICAR ESTA SEMANA — convocatoria permanente' : `Preparar documentos antes de: ${opp.fecha_cierre}`,
            'Articular el PIVOT como narrativa central de la propuesta',
            'Incluir datos de impacto: 15K beneficiarios, UVAs, Bibliotecas'
        ].map(item => `<li><span class="check-icon">☑</span><span>${item}</span></li>`).join('')}
      </ul>
    </div>
  `;
    document.getElementById('dossierModal').classList.add('open');
}

function closeDossier(e) { if (e.target === e.currentTarget) closeDossierBtn(); }
function closeDossierBtn() { document.getElementById('dossierModal').classList.remove('open'); }

function exportDossier() {
    if (!activeDossier) return;
    const text = TriageEngine_v2.generarDossier(activeDossier);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dossier-epm-${activeDossier.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ============================================================
// CAPACITY VALIDATOR
// ============================================================
function validateCapacity() {
    const reqBudget = parseFloat(document.getElementById('reqBudget').value) || 0;
    const reqCofinancing = document.getElementById('reqCofinancing').value;
    const result = document.getElementById('capacityResult');
    const profile = EPM_PLATFORM.financiero;

    if (!reqBudget) {
        result.innerHTML = `<div class="result-placeholder">Ingresa el presupuesto de la convocatoria.</div>`;
        result.className = 'capacity-result';
        return;
    }

    if (reqBudget <= profile.max_autonomo_usd) {
        result.className = 'capacity-result result-green';
        result.innerHTML = `<div style="width:100%"><div class="result-verdict verdict-green">✅ AUTÓNOMO</div><div class="result-body"><strong>Ejecución directa sin consorcio.</strong><br><br>USD $${reqBudget.toLocaleString()} ≤ capacidad segura USD $${profile.max_autonomo_usd.toLocaleString()}<br>${reqCofinancing === 'si' ? '⚠ La convocatoria requiere cofinanciación — explorar alianza local.' : '✓ Sin cofinanciación requerida.'}</div></div>`;
    } else if (reqBudget <= profile.con_consorcio_usd) {
        result.className = 'capacity-result result-amber';
        result.innerHTML = `<div style="width:100%"><div class="result-verdict verdict-amber">⚠ CONSORCIO</div><div class="result-body">He pre-identificado socios. Brecha: <strong>USD $${(reqBudget - profile.max_autonomo_usd).toLocaleString()}</strong><br><br>${EPM_PLATFORM.activos.capital_humano.map(s => '• ' + s).join('<br>')}</div></div>`;
    } else {
        result.className = 'capacity-result result-red';
        result.innerHTML = `<div style="width:100%"><div class="result-verdict verdict-red">⚠ CONSORCIO MAYOR</div><div class="result-body">USD $${reqBudget.toLocaleString()} es de escala macro. EPM puede participar como <strong>ejecutor territorial subconcesionario</strong> con un actor mayor como lead (UdeA, Alcaldía, ONG internacional).</div></div>`;
    }
}

// ============================================================
// SCHEDULER MODAL
// ============================================================
function openScheduler() { document.getElementById('schedulerModal').classList.add('open'); }
function closeScheduler(e) { if (e.target === e.currentTarget) closeSchedulerBtn(); }
function closeSchedulerBtn() { document.getElementById('schedulerModal').classList.remove('open'); }

// ============================================================
// LOG ACTIONS
// ============================================================
function clearLog() {
    document.getElementById('outputTerminal').innerHTML = '';
    scanLog = [];
    OutputProtocol.voice('system', 'Log limpiado. Sistema en espera de nuevo ciclo.');
}
function exportLog() {
    if (!scanLog.length) return;
    const text = scanLog.map(e => `[${e.time}] [${e.level.toUpperCase()}] ${e.message.replace(/<[^>]*>/g, '')}`).join('\n');
    const blob = new Blob([`LOG IRIS v2.0 — ${new Date().toLocaleString('es-CO')}\n${'='.repeat(50)}\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iris-log-v2-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ============================================================
// UTILITIES
// ============================================================
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function formatDate(d) { return new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }); }
function animateBars() {
    setTimeout(() => {
        document.querySelectorAll('.match-fill').forEach(b => { b.style.width = b.dataset.target + '%'; });
    }, 400);
}
function animateNumber(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let c = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const t = setInterval(() => { c = Math.min(c + step, target); el.textContent = c; if (c >= target) clearInterval(t); }, 30);
}

async function loadScraperStatus() {
    try {
        const response = await fetch(`data/scraper-status.json?v=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const status = await response.json();
        const sourcesOk = (status.sources || []).filter(source => source.ok || source.status === 'success').length;
        const lastRun = new Date(status.last_run);
        if (!Number.isNaN(lastRun.getTime())) {
            document.getElementById('lastScanTime').textContent = lastRun.toLocaleString('es-CO', { hour12: false });
        }
        document.getElementById('statusText').textContent = `Radar activo · ${sourcesOk}/${status.sources?.length || 0} fuentes`;
    } catch (error) {
        console.warn('Estado del rastreador no disponible:', error.message);
    }
}

// ============================================================
// INIT v3.0
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadScraperStatus();
    OutputProtocol.voice('system', 'CENTINELA v5.0 inicializado — NODO DE INTELIGENCIA ESTRATÉGICA AUTÓNOMA activo.');
    OutputProtocol.voice('system', `Protocolo: 🌿 Ambiental · ⚡ Tecnológico · 🤝 Social. Fuentes: TED·UNGM·IATI·RAEng·Mission Innovation·MacArthur·Academias Globales.`);
    OutputProtocol.voice('geo', 'Control de vigencia activo: las fechas vencidas se eliminan automáticamente en cada ciclo.');

    // Inject dimension filter bar
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        const filterBar = document.createElement('div');
        filterBar.className = 'dim-filter-bar';
        filterBar.innerHTML = `
          <button class="dim-filter-btn active" data-dim="all" onclick="filterByDimension('all')">🌐 Todos</button>
          <button class="dim-filter-btn" data-dim="ambiental" onclick="filterByDimension('ambiental')">🌿 Gestión Ambiental <span class="dim-count" id="dimCount_ambiental">—</span></button>
          <button class="dim-filter-btn" data-dim="social" onclick="filterByDimension('social')">🤝 Gestión Social <span class="dim-count" id="dimCount_social">—</span></button>
          <button class="dim-filter-btn" data-dim="educacion" onclick="filterByDimension('educacion')">📚 Educación <span class="dim-count" id="dimCount_educacion">—</span></button>
          <button class="dim-filter-btn" data-dim="cultural" onclick="filterByDimension('cultural')">🎭 Gestión Cultural <span class="dim-count" id="dimCount_cultural">—</span></button>
        `;
        statsRow.after(filterBar);
    }

    setTimeout(() => { runFullScan(); }, 1500);
});
