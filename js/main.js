/**
 * main.js — entry point
 */

document.addEventListener('DOMContentLoaded', () => {
  // Render grids
  renderGrid('grid-db',        DATABASES,   'db');
  renderGrid('grid-lang',      LANGUAGES,   'lang');
  renderGrid('grid-dbtool',    DB_TOOLS,    'dbtool');
  renderGrid('grid-editor',    EDITORS,     'editor');
  renderGrid('grid-ide',       IDES,        'ide');
  renderGrid('grid-vcs',       VCS_TOOLS,   'vcs');
  renderGrid('grid-browser',   BROWSERS,    'browser');
  renderGrid('grid-container', CONTAINERS,  'container');
  renderGrid('grid-cloud',     CLOUD,       'cloud');
  renderGrid('grid-cli',       CLI_TOOLS,   'cli');
  renderGrid('grid-devtool',   DEV_TOOLS,   'devtool');
  renderGrid('grid-network',   NETWORKING,  'network');
  renderGrid('grid-security',  SECURITY,    'security');
  renderGrid('grid-aiml',      AI_ML,       'aiml');
  renderGrid('grid-app',       APPS,        'app');
  renderGrid('grid-media',     MEDIA,       'media');
  renderGrid('grid-font',      FONTS,       'font');
  renderGrid('grid-gnome',     GNOME_TOOLS, 'gnome');
  renderWebserverGrid('grid-webserver');

  // PHP pills
  renderExtPills();
  document.getElementById('ext-pills').addEventListener('click', e => {
    const pill = e.target.closest('.ext-pill');
    if (!pill) return;
    pill.classList.toggle('selected');
    const ext = pill.dataset.ext;
    if (pill.classList.contains('selected')) {
      if (!state.phpExtensions.includes(ext)) state.phpExtensions.push(ext);
    } else {
      state.phpExtensions = state.phpExtensions.filter(x => x !== ext);
    }
    updateAll();
  });

  // Presets tab
  renderPresetsTab();

  // Left-nav
  initLeftNav();

  updateAll();
});

// ── Grid renderers ────────────────────────────────────────────────────────────

function renderGrid(id, defs, group) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = defs.map(pkg => {
    const label = pkg.label || pkg.value;
    const tag   = pkg.tag ? `<span class="option-tag">${pkg.tag}</span>` : '';
    return `<div class="option-card" data-group="${group}" data-value="${pkg.value}" onclick="toggleCard(this)"><span class="check-box"></span><span class="option-label">${label}</span>${tag}</div>`;
  }).join('');
}

function renderWebserverGrid(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('radio-grid');
  el.innerHTML = WEB_SERVERS.map(ws => {
    const sel = ws.value === state.webserver;
    const tag = ws.tag ? `<span class="option-tag">${ws.tag}</span>` : '';
    return `<div class="radio-card${sel ? ' selected' : ''}" data-value="${ws.value}" onclick="selectWebserver(this)"><span class="radio-dot"></span><span class="radio-label">${ws.value}</span>${tag}</div>`;
  }).join('');
}

function renderExtPills() {
  const el = document.getElementById('ext-pills');
  if (!el) return;
  el.innerHTML = PHP_EXTENSIONS.map(ext => {
    const sel = state.phpExtensions.includes(ext);
    return `<span class="ext-pill${sel ? ' selected' : ''}" data-ext="${ext}">${ext}</span>`;
  }).join('');
}

// ── Left-nav ──────────────────────────────────────────────────────────────────

function initLeftNav() {
  const scroller = document.getElementById('main-packages');
  if (!scroller) return;

  const links    = Array.from(document.querySelectorAll('.lnav-link[data-sec]'));
  const sections = links.map(l => document.getElementById(l.dataset.sec)).filter(Boolean);
  if (!links.length || !sections.length) return;

  // ── Click: scroll section to CENTER of the viewport ──────────────────────
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = document.getElementById(link.dataset.sec);
      if (!sec) return;

      // Target: place the section's top at ~35% down the scroller height
      // (feels like centre; pure 50% feels too low when section is tall)
      const offset = Math.round(scroller.clientHeight * 0.30);
      const target = sec.offsetTop - offset;

      scroller.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    });
  });

  // ── Scroll spy ───────────────────────────────────────────────────────────
  //
  // Two-pass algorithm that correctly handles the bottom-of-page problem:
  //
  // Pass 1 (normal): find the last section whose top has scrolled past
  //   a trigger line 40% from the top of the visible area.
  //
  // Pass 2 (bottom clamp): if we're within 8px of the bottom of the
  //   scrollable content, force the LAST section active regardless.
  //
  function updateActive() {
    const scrollTop      = scroller.scrollTop;
    const clientHeight   = scroller.clientHeight;
    const scrollHeight   = scroller.scrollHeight;
    const triggerY       = scrollTop + clientHeight * 0.40;

    // Pass 1 — last section whose offsetTop is above the trigger line
    let activeIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= triggerY) activeIdx = i;
    }

    // Pass 2 — bottom clamp: if at (or very near) the bottom, always
    // activate the last section so Fonts / GNOME can light up
    const atBottom = scrollTop + clientHeight >= scrollHeight - 8;
    if (atBottom) activeIdx = sections.length - 1;

    links.forEach((l, i) => l.classList.toggle('active', i === activeIdx));

    // Keep active link visible inside the left-nav's own scroll
    const nav        = document.getElementById('left-nav');
    const activeLink = links[activeIdx];
    if (nav && activeLink) {
      const linkTop    = activeLink.offsetTop;
      const linkBottom = linkTop + activeLink.offsetHeight;
      const navTop     = nav.scrollTop;
      const navBottom  = navTop + nav.clientHeight;
      if      (linkTop    < navTop)    nav.scrollTop = linkTop - 8;
      else if (linkBottom > navBottom) nav.scrollTop = linkBottom - nav.clientHeight + 8;
    }
  }

  scroller.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// ── Nav count badge updates ───────────────────────────────────────────────────

function updateNavCounts(countMap) {
  const secCountMap = {
    'sec-db':        'db-count',
    'sec-lang':      'lang-count',
    'sec-dbtool':    'dbtool-count',
    'sec-editor':    'editor-count',
    'sec-ide':       'ide-count',
    'sec-vcs':       'vcs-count',
    'sec-browser':   'browser-count',
    'sec-container': 'container-count',
    'sec-cloud':     'cloud-count',
    'sec-cli':       'cli-count',
    'sec-devtool':   'devtool-count',
    'sec-network':   'network-count',
    'sec-security':  'security-count',
    'sec-ai':        'aiml-count',
    'sec-apps':      'app-count',
    'sec-media':     'media-count',
    'sec-fonts':     'font-count',
    'sec-gnome':     'gnome-count',
  };

  document.querySelectorAll('.lnav-link[data-sec]').forEach(link => {
    const countId = secCountMap[link.dataset.sec];
    const n = countId ? (parseInt(countMap[countId]) || 0) : 0;
    let badge = link.querySelector('.lnav-count');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'lnav-count';
      link.appendChild(badge);
    }
    badge.textContent = n;
    link.classList.toggle('has-items', n > 0);
  });

  // System section
  const sysLink = document.querySelector('.lnav-link[data-sec="sec-system"]');
  if (sysLink) {
    const n = (state.sysUpdate ? 1 : 0) + (state.sysDeps ? 1 : 0);
    let badge = sysLink.querySelector('.lnav-count');
    if (!badge) { badge = document.createElement('span'); badge.className = 'lnav-count'; sysLink.appendChild(badge); }
    badge.textContent = n;
    sysLink.classList.toggle('has-items', n > 0);
  }

  // PHP section
  const phpLink = document.querySelector('.lnav-link[data-sec="sec-php"]');
  if (phpLink) {
    const n = state.phpVersions.length;
    let badge = phpLink.querySelector('.lnav-count');
    if (!badge) { badge = document.createElement('span'); badge.className = 'lnav-count'; phpLink.appendChild(badge); }
    badge.textContent = n;
    phpLink.classList.toggle('has-items', n > 0);
  }
}

// ── Clear all ─────────────────────────────────────────────────────────────────

function clearAll() {
  state.sysUpdate = false;
  state.sysDeps   = false;
  const sysUpd = document.getElementById('sys-update-card');
  const sysDep = document.getElementById('sys-deps-card');
  if (sysUpd) { sysUpd.classList.remove('selected'); sysUpd.querySelector('.check-box').textContent = ''; }
  if (sysDep) { sysDep.classList.remove('selected');  sysDep.querySelector('.check-box').textContent = ''; }

  state.phpVersions = [];
  document.querySelectorAll('.php-card.selected').forEach(c => c.classList.remove('selected'));
  const extSection = document.getElementById('php-ext-section');
  if (extSection) extSection.style.display = 'none';

  document.querySelectorAll('.option-card.selected').forEach(card => {
    card.classList.remove('selected');
    const box = card.querySelector('.check-box');
    if (box) box.textContent = '';
  });

  state.webserver = 'None';
  document.querySelectorAll('.radio-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.value === 'None');
  });

  Object.assign(state, {
    dbs:[], langs:[], dbtools:[], editors:[], ides:[], vcs:[],
    browsers:[], containers:[], cloud:[], cli:[], devtools:[],
    networking:[], security:[], aiml:[], apps:[], media:[], fonts:[], gnome:[]
  });

  document.querySelectorAll('.preset-card.applied').forEach(c => {
    c.classList.remove('applied');
    const btn = c.querySelector('.preset-load-btn');
    if (btn) btn.textContent = '+ Load preset';
  });
  if (typeof _appliedPresets !== 'undefined') _appliedPresets.clear();

  updateAll();
  showToast('All selections cleared');
}

// ── Sidebar actions ───────────────────────────────────────────────────────────

function downloadScript() {
  const blob = new Blob([generateScript()], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'install.sh' });
  a.click();
  URL.revokeObjectURL(url);
}

function copyScript() {
  navigator.clipboard.writeText(generateScript()).then(() => showToast('Script copied to clipboard'));
}
