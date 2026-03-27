const PRESET_CATEGORIES = [
  {
    id: 'windows',
    title: 'Coming from Windows',
    icon: 'WIN',
    iconBg: 'rgba(0,120,212,0.15)',
    desc: 'Familiar apps and equivalents for users switching from Windows.',
    presets: [
      {
        id: 'win-everyday',
        name: 'Everyday Windows User',
        icon: '',
        desc: 'The essentials every Windows migrant expects: browser, office suite, media player, communication apps, and desktop polish.',
        tags: ['beginner', 'no dev tools', 'daily driver'],
        packages: {
          browsers:  ['Google Chrome', 'Firefox'],
          apps:      ['Thunderbird', 'Telegram', 'Discord', 'Zoom', 'Spotify', 'VLC', 'LibreOffice', 'Dropbox', 'AnyDesk', 'Flameshot', 'OBS Studio'],
          media:     ['GIMP'],
          gnome:     ['GNOME Tweaks', 'Dash to Dock', 'Papirus Icons', 'BleachBit', 'Stacer'],
          fonts:     ['Ubuntu Fonts', 'Noto Fonts', 'Microsoft Core Fonts'],
        },
      },
      {
        id: 'win-office',
        name: 'Office Worker',
        icon: '',
        desc: 'Office suites, email, video conferencing, cloud sync, remote desktop — the full corporate desktop on Linux.',
        tags: ['office', 'email', 'meetings', 'cloud'],
        packages: {
          browsers:  ['Google Chrome', 'Microsoft Edge'],
          apps:      ['LibreOffice', 'OnlyOffice', 'Thunderbird', 'Zoom', 'Microsoft Teams', 'Slack', 'Nextcloud Desktop', 'Dropbox', 'Flameshot', 'Remmina', 'AnyDesk'],
          gnome:     ['GNOME Tweaks', 'Papirus Icons'],
          fonts:     ['Microsoft Core Fonts', 'Noto Fonts'],
        },
      },
      {
        id: 'win-creative',
        name: 'Creative Suite',
        icon: '',
        desc: 'Open-source alternatives to Photoshop, Illustrator, Premiere, and more — everything a creative professional needs.',
        tags: ['design', 'video', 'audio', 'photo editing'],
        packages: {
          media:   ['GIMP', 'Inkscape', 'Darktable', 'Blender', 'Kdenlive', 'Shotcut', 'Audacity', 'Handbrake', 'Krita', 'Rawtherapee', 'Shotwell'],
          apps:    ['OBS Studio', 'VLC', 'Flameshot'],
          browsers:['Google Chrome', 'Firefox'],
          fonts:   ['Nerd Fonts (FiraCode)', 'Nerd Fonts (JetBrainsMono)', 'Noto Fonts'],
        },
      },
      {
        id: 'win-gamer',
        name: 'Linux Gamer',
        icon: '',
        desc: 'Steam, Lutris, Heroic, and OBS — everything to keep playing your Windows games and streaming on Linux.',
        tags: ['gaming', 'steam', 'wine', 'proton', 'streaming'],
        packages: {
          apps:    ['Steam', 'Lutris', 'Heroic Games Launcher', 'OBS Studio', 'Discord', 'Flameshot'],
          media:   ['Audacity'],
          browsers:['Google Chrome'],
        },
      },
    ],
  },
  {
    id: 'developer',
    title: 'Developer Bundles',
    icon: 'DEV',
    iconBg: 'rgba(129,140,248,0.15)',
    desc: 'Opinionated dev stacks for common workflows, ready to go.',
    presets: [
      {
        id: 'dev-fullstack',
        name: 'Full-Stack Web Dev',
        icon: '',
        desc: 'Node.js via NVM, PHP 8.3, MySQL, PostgreSQL, Redis, Docker, VS Code, Postman and GitHub CLI — everything for modern web development.',
        tags: ['node', 'php', 'mysql', 'docker', 'postgres'],
        packages: {
          dbs:        ['PostgreSQL', 'MySQL', 'Redis'],
          dbtools:    ['DBeaver CE', 'phpMyAdmin'],
          editors:    ['VS Code'],
          vcs:        ['GitHub CLI', 'lazygit', 'delta'],
          browsers:   ['Google Chrome', 'Firefox'],
          containers: ['Docker Engine', 'Docker Compose v2'],
          devtools:   ['Postman', 'make'],
          cli:        ['tmux', 'bat', 'fzf', 'jq', 'htop'],
          apps:       ['Slack', 'Discord'],
          langs:      ['Node.js (LTS via NVM)'],
        },
        phpVersions: ['8.3'],
      },
      {
        id: 'dev-devops',
        name: 'Backend / DevOps',
        icon: '',
        desc: 'Docker, Kubernetes, Terraform, Ansible, AWS/Azure/GCloud CLIs, Trivy, and a sharp terminal setup for infrastructure and backend work.',
        tags: ['docker', 'k8s', 'terraform', 'ansible', 'aws'],
        packages: {
          containers: ['Docker Engine', 'Docker Compose v2', 'Kubectl', 'Helm', 'k9s', 'Portainer CE'],
          cloud:      ['AWS CLI v2', 'Azure CLI', 'Google Cloud CLI', 'Terraform', 'Ansible'],
          editors:    ['VS Code', 'Neovim'],
          vcs:        ['GitHub CLI', 'lazygit'],
          cli:        ['tmux', 'htop', 'btop', 'ripgrep', 'fzf', 'jq', 'bat', 'eza', 'ncdu', 'zoxide'],
          devtools:   ['make', 'Trivy'],
          security:   ['fail2ban', 'UFW'],
          networking: ['nmap', 'iperf3'],
        },
      },
      {
        id: 'dev-datascience',
        name: 'Data Scientist',
        icon: '',
        desc: 'Python + pyenv, Jupyter, PyTorch, scikit-learn, Pandas, NumPy, Matplotlib, HuggingFace, Ollama, and VS Code — the full ML stack.',
        tags: ['python', 'jupyter', 'pytorch', 'ml', 'ai'],
        packages: {
          langs:   ['Python 3 + pip', 'Julia'],
          editors: ['VS Code'],
          ides:    ['PyCharm CE'],
          aiml:    ['Ollama', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'Hugging Face CLI', 'LangChain'],
          cli:     ['htop', 'tmux', 'jq', 'bat', 'fzf'],
          vcs:     ['GitHub CLI'],
        },
      },
      {
        id: 'dev-java',
        name: 'Java / JVM Dev',
        icon: '',
        desc: 'OpenJDK 21, Kotlin, Scala, Maven, Gradle, IntelliJ IDEA, and git utilities.',
        tags: ['java', 'kotlin', 'maven', 'gradle', 'intellij'],
        packages: {
          langs:    ['Java (OpenJDK 21)', 'Kotlin', 'Scala (SBT)'],
          devtools: ['Maven', 'Gradle'],
          ides:     ['IntelliJ IDEA CE'],
          editors:  ['VS Code'],
          vcs:      ['GitHub CLI', 'lazygit'],
          cli:      ['htop', 'tmux', 'bat'],
        },
      },
      {
        id: 'dev-terminal',
        name: 'Minimal Terminal Dev',
        icon: '',
        desc: 'A lean, terminal-first setup: Neovim, Helix, tmux, fish, starship, zoxide, and all the best CLI tools. No GUI needed.',
        tags: ['terminal', 'neovim', 'tmux', 'minimal', 'cli'],
        packages: {
          editors: ['Neovim', 'Helix'],
          vcs:     ['lazygit', 'delta', 'GitHub CLI', 'pre-commit'],
          cli:     ['tmux', 'fish shell', 'starship', 'zoxide', 'ripgrep', 'fzf', 'bat', 'eza', 'fd', 'jq', 'htop', 'btop', 'nnn', 'ncdu', 'duf', 'dust', 'pv', 'rclone'],
          fonts:   ['Nerd Fonts (FiraCode)', 'Nerd Fonts (JetBrainsMono)'],
        },
      },
      {
        id: 'dev-ai-builder',
        name: 'AI App Builder',
        icon: '',
        desc: 'Ollama for local LLMs, Open WebUI, LangChain, OpenAI + Anthropic SDKs, Python, and VS Code — build AI-powered apps locally.',
        tags: ['llm', 'ollama', 'langchain', 'openai', 'python'],
        packages: {
          langs:   ['Python 3 + pip'],
          editors: ['VS Code'],
          aiml:    ['Ollama', 'Open WebUI', 'LangChain', 'OpenAI SDK', 'Anthropic SDK', 'Hugging Face CLI', 'Jupyter'],
          vcs:     ['GitHub CLI'],
          cli:     ['htop', 'tmux', 'jq', 'bat'],
          containers: ['Docker Engine', 'Docker Compose v2'],
        },
      },
    ],
  },
  {
    id: 'server',
    title: 'Server & Homelab',
    icon: 'SRV',
    iconBg: 'rgba(110,231,183,0.12)',
    desc: 'Pre-configured stacks for self-hosted services and server administration.',
    presets: [
      {
        id: 'srv-lamp',
        name: 'LAMP Stack',
        icon: '',
        desc: 'Linux + Apache2 + MySQL + PHP 8.3 with phpMyAdmin — the classic battle-tested web server stack.',
        tags: ['apache', 'mysql', 'php', 'phpmyadmin'],
        packages: {
          dbs:     ['MySQL'],
          dbtools: ['phpMyAdmin'],
          devtools:['make'],
          cli:     ['htop', 'ncdu'],
        },
        phpVersions: ['8.3'],
        webserver: 'Apache2',
      },
      {
        id: 'srv-lemp',
        name: 'LEMP Stack',
        icon: '',
        desc: 'Linux + Nginx + MySQL + PHP 8.3 — the modern, high-performance alternative.',
        tags: ['nginx', 'mysql', 'php', 'performance'],
        packages: {
          dbs:     ['MySQL'],
          dbtools: ['phpMyAdmin'],
          cli:     ['htop', 'ncdu'],
        },
        phpVersions: ['8.3'],
        webserver: 'Nginx',
      },
      {
        id: 'srv-homelab',
        name: 'Homelab / Self-hosted',
        icon: '',
        desc: 'Docker, Portainer CE, Tailscale, fail2ban, UFW, and essential system monitoring — everything for a home server.',
        tags: ['docker', 'portainer', 'self-hosted', 'tailscale'],
        packages: {
          containers: ['Docker Engine', 'Docker Compose v2', 'Portainer CE'],
          security:   ['fail2ban', 'UFW', 'ClamAV'],
          cli:        ['htop', 'btop', 'ncdu', 'tmux', 'jq', 'bat', 'duf'],
          networking: ['nmap', 'iperf3', 'Tailscale'],
        },
      },
      {
        id: 'srv-security',
        name: 'Security & Audit',
        icon: '',
        desc: 'Network scanning, firewall setup, rootkit detection, VPN, and intrusion prevention for a hardened server.',
        tags: ['security', 'nmap', 'wireshark', 'fail2ban', 'ufw'],
        packages: {
          security:   ['fail2ban', 'UFW', 'ClamAV', 'Lynis', 'rkhunter', 'chkrootkit', 'openssl', 'openssh-server', 'age'],
          networking: ['nmap', 'Wireshark', 'Netcat', 'iperf3', 'tcpdump', 'mtr', 'WireGuard', 'Tailscale'],
          cli:        ['htop', 'tmux', 'jq'],
        },
      },
      {
        id: 'srv-nodejs',
        name: 'Node.js API Server',
        icon: '',
        desc: 'Node.js LTS via NVM, PostgreSQL, Redis, Nginx, PM2 (via npm), GitHub CLI, and Docker for a production-ready Node API backend.',
        tags: ['node', 'postgres', 'redis', 'nginx', 'api'],
        packages: {
          langs:      ['Node.js (LTS via NVM)'],
          dbs:        ['PostgreSQL', 'Redis'],
          containers: ['Docker Engine', 'Docker Compose v2'],
          vcs:        ['GitHub CLI'],
          cli:        ['htop', 'tmux', 'jq', 'bat', 'ncdu'],
          security:   ['fail2ban', 'UFW'],
        },
        webserver: 'Nginx',
      },
    ],
  },
];

const _appliedPresets = new Set();

function applyPreset(presetId) {
  let preset = null;
  for (const cat of PRESET_CATEGORIES) {
    preset = cat.presets.find(p => p.id === presetId);
    if (preset) break;
  }
  if (!preset) return;

  const wasApplied = _appliedPresets.has(presetId);

  if (wasApplied) {
    _removePreset(preset);
    _appliedPresets.delete(presetId);
  } else {
    _applyPreset(preset);
    _appliedPresets.add(presetId);
  }

  const card = document.querySelector(`.preset-card[data-preset-id="${presetId}"]`);
  if (card) {
    card.classList.toggle('applied', !wasApplied);
    card.querySelector('.preset-load-btn').textContent = wasApplied ? '+ Load preset' : '✓ Applied';
  }

  updateAll();

  if (!wasApplied) {
    showToast(`✓ "${preset.name}" — ${_countPresetItems(preset)} packages loaded`);
    setTimeout(() => switchTab('packages'), 700);
  } else {
    showToast(`✕ "${preset.name}" removed`);
  }
}

function _applyPreset(preset) {
  if (preset.phpVersions) {
    preset.phpVersions.forEach(v => {
      if (!state.phpVersions.includes(v)) {
        state.phpVersions.push(v);
        const card = document.querySelector(`.php-card[data-value="${v}"]`);
        if (card) card.classList.add('selected');
      }
    });
    const ext = document.getElementById('php-ext-section');
    if (ext) ext.style.display = state.phpVersions.length ? 'block' : 'none';
  }

  if (preset.webserver) {
    state.webserver = preset.webserver;
    document.querySelectorAll('.radio-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === preset.webserver);
    });
  }

  if (preset.packages) {
    for (const [stateKey, values] of Object.entries(preset.packages)) {
      const group = _stateKeyToGroup(stateKey);
      if (!group) continue;
      if (!state[stateKey]) state[stateKey] = [];
      values.forEach(val => {
        if (!state[stateKey].includes(val)) {
          state[stateKey].push(val);
          const card = document.querySelector(`.option-card[data-group="${group}"][data-value="${val}"]`);
          if (card) {
            card.classList.add('selected');
            const box = card.querySelector('.check-box');
            if (box) box.textContent = '✓';
          }
        }
      });
    }
  }
}

function _removePreset(preset) {
  if (preset.phpVersions) {
    preset.phpVersions.forEach(v => {
      state.phpVersions = state.phpVersions.filter(x => x !== v);
      const card = document.querySelector(`.php-card[data-value="${v}"]`);
      if (card) card.classList.remove('selected');
    });
    const ext = document.getElementById('php-ext-section');
    if (ext) ext.style.display = state.phpVersions.length ? 'block' : 'none';
  }

  if (preset.packages) {
    for (const [stateKey, values] of Object.entries(preset.packages)) {
      const group = _stateKeyToGroup(stateKey);
      if (!group || !state[stateKey]) continue;
      state[stateKey] = state[stateKey].filter(v => !values.includes(v));
      values.forEach(val => {
        const card = document.querySelector(`.option-card[data-group="${group}"][data-value="${val}"]`);
        if (card) {
          card.classList.remove('selected');
          const box = card.querySelector('.check-box');
          if (box) box.textContent = '';
        }
      });
    }
  }
}

function _stateKeyToGroup(stateKey) {
  const map = {
    dbs:'db', langs:'lang', dbtools:'dbtool', editors:'editor', ides:'ide',
    vcs:'vcs', browsers:'browser', containers:'container', cloud:'cloud',
    cli:'cli', devtools:'devtool', networking:'network', security:'security',
    aiml:'aiml', apps:'app', media:'media', graphics:'media', fonts:'font', gnome:'gnome',
  };
  return map[stateKey] || null;
}

function _countPresetItems(preset) {
  let n = (preset.phpVersions || []).length + (preset.webserver ? 1 : 0);
  if (preset.packages) for (const vals of Object.values(preset.packages)) n += vals.length;
  return n;
}

function renderPresetsTab() {
  const container = document.getElementById('preset-categories');
  if (!container) return;

  container.innerHTML = PRESET_CATEGORIES.map(cat => `
    <div class="preset-category">
      <div class="preset-category-header">
        <div class="preset-category-icon" style="background:${cat.iconBg}">${cat.icon}</div>
        <div>
          <div class="preset-category-title">${cat.title}</div>
          <div class="preset-category-desc">${cat.desc}</div>
        </div>
      </div>
      <div class="preset-cards-grid">
        ${cat.presets.map(p => _renderPresetCard(p)).join('')}
      </div>
    </div>
  `).join('');
}

function _renderPresetCard(preset) {
  const total  = _countPresetItems(preset);
  const allPkgs = _getAllPackageNames(preset);

  return `
    <div class="preset-card" data-preset-id="${preset.id}">
      <div class="preset-card-header">
        ${preset.icon ? `<span class="preset-card-icon">${preset.icon}</span>` : ''}
        <span class="preset-applied-badge">Applied</span>
      </div>
      <div class="preset-card-name">${preset.name}</div>
      <div class="preset-card-desc">${preset.desc}</div>
      <div class="preset-card-tags">${preset.tags.map(t => `<span class="preset-tag">${t}</span>`).join('')}</div>
      <div class="preset-pkg-list" id="pkglist-${preset.id}">
        <div class="preset-pkg-list-inner">${allPkgs.map(n => `<span class="ppkg">${n}</span>`).join('')}</div>
      </div>
      <div class="preset-count-bar">
        <span><strong>${total}</strong> packages &nbsp;·&nbsp;
          <button class="preset-toggle-list" onclick="event.stopPropagation();togglePkgList('${preset.id}')">show list ▾</button>
        </span>
        <button class="preset-load-btn" onclick="applyPreset('${preset.id}')">+ Load preset</button>
      </div>
    </div>`;
}

function _getAllPackageNames(preset) {
  const names = [];
  if (preset.phpVersions) preset.phpVersions.forEach(v => names.push(`PHP ${v}`));
  if (preset.webserver)   names.push(preset.webserver);
  if (preset.packages)    for (const vals of Object.values(preset.packages)) vals.forEach(v => names.push(v));
  return names;
}

function togglePkgList(presetId) {
  const el = document.getElementById(`pkglist-${presetId}`);
  if (!el) return;
  const isOpen = el.classList.toggle('open');
  const btn = el.parentElement.querySelector('.preset-toggle-list');
  if (btn) btn.textContent = isOpen ? 'hide list ▴' : 'show list ▾';
}
