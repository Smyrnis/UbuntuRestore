/**
 * ui.js
 * All DOM interactions: toggle handlers, count badges, sidebar rendering.
 */

// ── Card toggles ──────────────────────────────────────────────────────────────

function toggleSysCard(id) {
  const card = document.getElementById(id + '-card');
  const nowSelected = !card.classList.contains('selected');
  card.classList.toggle('selected', nowSelected);
  card.querySelector('.check-box').textContent = nowSelected ? '✓' : '';
  if (id === 'sys-update') state.sysUpdate = nowSelected;
  else                     state.sysDeps   = nowSelected;
  updateAll();
}

function togglePhpCard(card) {
  const nowSelected = !card.classList.contains('selected');
  card.classList.toggle('selected', nowSelected);
  const v = card.dataset.value;
  if (nowSelected) {
    if (!state.phpVersions.includes(v)) state.phpVersions.push(v);
  } else {
    state.phpVersions = state.phpVersions.filter(x => x !== v);
  }
  document.getElementById('php-ext-section').style.display =
    state.phpVersions.length ? 'block' : 'none';
  updateAll();
}

function toggleCard(card) {
  const nowSelected = !card.classList.contains('selected');
  card.classList.toggle('selected', nowSelected);
  const box = card.querySelector('.check-box');
  if (box) box.textContent = nowSelected ? '✓' : '';
  syncGroupToState(card.dataset.group);
  updateAll();
}

function selectWebserver(card) {
  document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  state.webserver = card.dataset.value;
  updateAll();
}

// ── Bulk helpers ──────────────────────────────────────────────────────────────

function toggleGroup(group, mode) {
  const cards = document.querySelectorAll(`.option-card[data-group="${group}"]`);
  const check = mode === 'all';
  cards.forEach(card => {
    card.classList.toggle('selected', check);
    const box = card.querySelector('.check-box');
    if (box) box.textContent = check ? '✓' : '';
  });
  syncGroupToState(group);
  updateAll();
}

function selectAllExt() {
  document.querySelectorAll('.ext-pill').forEach(p => {
    p.classList.add('selected');
    if (!state.phpExtensions.includes(p.dataset.ext)) state.phpExtensions.push(p.dataset.ext);
  });
  updateAll();
}

function selectNoneExt() {
  document.querySelectorAll('.ext-pill').forEach(p => p.classList.remove('selected'));
  state.phpExtensions = [];
  updateAll();
}

function selectCommonExt() {
  const common = PHP_COMMON_EXTENSIONS;
  document.querySelectorAll('.ext-pill').forEach(p => {
    const isCommon = common.includes(p.dataset.ext);
    p.classList.toggle('selected', isCommon);
  });
  state.phpExtensions = [...common];
  updateAll();
}

// ── State sync ────────────────────────────────────────────────────────────────

const GROUP_MAP = {
  db: 'dbs', lang: 'langs', dbtool: 'dbtools', editor: 'editors',
  ide: 'ides', vcs: 'vcs', browser: 'browsers', container: 'containers',
  cloud: 'cloud', cli: 'cli', devtool: 'devtools', network: 'networking',
  security: 'security', aiml: 'aiml', app: 'apps', media: 'media',
  font: 'fonts', gnome: 'gnome',
};

function syncGroupToState(group) {
  const key = GROUP_MAP[group];
  if (!key) return;
  state[key] = Array.from(
    document.querySelectorAll(`.option-card[data-group="${group}"].selected`)
  ).map(card => card.dataset.value);
}

// ── Count badges ──────────────────────────────────────────────────────────────

function updateCounts() {
  const countMap = {
    'php-count':       state.phpVersions.length,
    'db-count':        state.dbs.length,
    'lang-count':      state.langs.length,
    'dbtool-count':    state.dbtools.length,
    'editor-count':    state.editors.length,
    'ide-count':       state.ides.length,
    'vcs-count':       state.vcs.length,
    'browser-count':   state.browsers.length,
    'container-count': state.containers.length,
    'cloud-count':     state.cloud.length,
    'cli-count':       state.cli.length,
    'devtool-count':   state.devtools.length,
    'network-count':   state.networking.length,
    'security-count':  state.security.length,
    'aiml-count':      state.aiml.length,
    'app-count':       state.apps.length,
    'media-count':     state.media.length,
    'font-count':      state.fonts.length,
    'gnome-count':     state.gnome.length,
  };

  for (const [id, n] of Object.entries(countMap)) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.textContent = n ? `${n} selected` : '0 selected';
    el.classList.toggle('has-items', n > 0);
  }

  const total = Object.values(countMap).reduce((s, n) => s + n, 0)
    + (state.sysUpdate ? 1 : 0)
    + (state.sysDeps   ? 1 : 0);

  const el = document.getElementById('total-count');
  if (el) {
    el.textContent = `${total} package${total !== 1 ? 's' : ''} selected`;
    el.classList.toggle('has-items', total > 0);
  }
  // Update left-nav count badges
  updateNavCounts(countMap);
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function renderSidebar(script) {
  const preview = document.getElementById('script-preview');

  const total = Object.keys(GROUP_MAP).reduce((sum, g) => {
    const key = GROUP_MAP[g];
    return sum + (state[key] ? state[key].length : 0);
  }, 0) + state.phpVersions.length;

  if (total === 0 && !state.sysUpdate && !state.sysDeps) {
    preview.innerHTML = `
      <div class="empty-preview">
        <div>Nothing selected yet.</div>
        <div style="color:var(--text-muted)">Pick packages on the left<br>to build your script.</div>
      </div>`;
    document.getElementById('sidebar-summary').textContent = 'Select packages to generate script';
    return;
  }

  const lineCount = script.split('\n').length;
  document.getElementById('sidebar-summary').textContent = `~${lineCount} lines · ready to download`;
  preview.innerHTML = `<pre>${syntaxHighlight(script)}</pre>`;
  preview.scrollTop = 0;
}

function syntaxHighlight(script) {
  return script.split('\n').map(line => {
    const esc = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (esc.startsWith('#')) return `<span class="sh-comment">${esc}</span>`;
    if (/^(sudo|curl|wget|echo|export|mkdir|chmod|git|nvm|sh|bash|pip3?|npm|snap|cargo|UBUNTU_VER|NVM_DIR|OBSIDIAN_URL|KAFKA_VER|SWIFT_VER|LAZYGIT_VER|NERD_FONT)/.test(esc))
      return `<span class="sh-cmd">${esc}</span>`;
    if (/^(set |if |fi|done|do|\[\[)/.test(esc)) return `<span class="sh-flag">${esc}</span>`;
    return `<span>${esc}</span>`;
  }).join('\n');
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function showToast(message = 'Copied to clipboard') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── Master update ─────────────────────────────────────────────────────────────

function updateAll() {
  updateCounts();
  renderSidebar(generateScript());
}
