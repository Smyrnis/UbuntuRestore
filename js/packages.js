/**
 * packages.js
 * Pure data layer — no DOM, no state mutations.
 * Every package: { value, label?, tag?, lines[] }
 * To add/remove/update a package, only edit this file.
 */

// ── PHP ───────────────────────────────────────────────────────────────────────
const PHP_VERSIONS = [
  { value: '8.1', sub: 'Legacy LTS' },
  { value: '8.2', sub: 'Stable'     },
  { value: '8.3', sub: 'Current'    },
  { value: '8.4', sub: 'Latest'     },
  { value: '8.5', sub: 'Preview'    },
];

const PHP_EXTENSIONS = [
  'mysql','curl','gd','mbstring','xml','zip','intl','bcmath','imagick',
  'redis','xdebug','pgsql','sqlite3','soap','ldap','imap','fpm',
  'mongodb','amqp','igbinary','msgpack','pcov','ast','uuid',
];

const PHP_COMMON_EXTENSIONS = ['mysql','curl','gd','mbstring','xml','zip','intl'];

// ── Databases ─────────────────────────────────────────────────────────────────
const DATABASES = [
  { value: 'MariaDB', lines: ['echo "→ Installing MariaDB..."','sudo apt install -y mariadb-server mariadb-client','sudo systemctl enable --now mariadb'] },
  { value: 'MySQL', lines: ['echo "→ Installing MySQL..."','sudo apt install -y mysql-server mysql-client','sudo systemctl enable --now mysql'] },
  { value: 'PostgreSQL', lines: ['sudo apt install -y postgresql postgresql-contrib','sudo systemctl enable --now postgresql'] },
  { value: 'SQLite3', lines: ['sudo apt install -y sqlite3'] },
  { value: 'Redis', lines: ['sudo apt install -y redis-server','sudo systemctl enable --now redis-server'] },
  { value: 'MongoDB', lines: ['curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg','echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list','sudo apt update && sudo apt install -y mongodb-org','sudo systemctl enable --now mongod'] },
  { value: 'Cassandra', lines: ['echo "deb https://debian.cassandra.apache.org 41x main" | sudo tee /etc/apt/sources.list.d/cassandra.list','curl -fsSL https://downloads.apache.org/cassandra/KEYS | sudo gpg --dearmor -o /usr/share/keyrings/cassandra.gpg','sudo apt update && sudo apt install -y cassandra','sudo systemctl enable --now cassandra'] },
  { value: 'Elasticsearch', lines: ['wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list','sudo apt update && sudo apt install -y elasticsearch','sudo systemctl enable --now elasticsearch'] },
  { value: 'ClickHouse', lines: ['sudo apt install -y apt-transport-https ca-certificates','echo "deb [signed-by=/usr/share/keyrings/clickhouse-keyring.gpg] https://packages.clickhouse.com/deb stable main" | sudo tee /etc/apt/sources.list.d/clickhouse.list','curl -fsSL https://packages.clickhouse.com/rpm/lts/repodata/repomd.xml.key | sudo gpg --dearmor -o /usr/share/keyrings/clickhouse-keyring.gpg','sudo apt update && sudo apt install -y clickhouse-server clickhouse-client'] },
  { value: 'Neo4j', lines: ['wget -O - https://debian.neo4j.com/neotechnology.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/neo4j.gpg','echo "deb [signed-by=/usr/share/keyrings/neo4j.gpg] https://debian.neo4j.com stable latest" | sudo tee /etc/apt/sources.list.d/neo4j.list','sudo apt update && sudo apt install -y neo4j','sudo systemctl enable --now neo4j'] },
  { value: 'CockroachDB', lines: ['curl -fsSL https://binaries.cockroachdb.com/cockroach-latest.linux-amd64.tgz -o /tmp/cockroach.tgz','tar -xzf /tmp/cockroach.tgz -C /tmp','sudo cp /tmp/cockroach-*/cockroach /usr/local/bin/ && rm -rf /tmp/cockroach*'] },
  { value: 'MinIO', tag: 'object storage', lines: ['wget -q https://dl.min.io/server/minio/release/linux-amd64/minio -O /tmp/minio','sudo install /tmp/minio /usr/local/bin/minio && rm /tmp/minio','echo "Start with: minio server /data/minio"'] },
  { value: 'Valkey', tag: 'redis-fork', lines: ['sudo apt install -y valkey || sudo snap install valkey || true'] },
];

// ── Languages ─────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { value: 'Node.js (LTS via NVM)', label: 'Node.js LTS', tag: 'nvm', lines: ['curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash','export NVM_DIR="$HOME/.nvm"','[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"','nvm install --lts'] },
  { value: 'Bun', tag: 'js runtime', lines: ['curl -fsSL https://bun.sh/install | bash'] },
  { value: 'Deno', tag: 'js runtime', lines: ['curl -fsSL https://deno.land/install.sh | sh'] },
  { value: 'Python 3 + pip', lines: ['sudo apt install -y python3 python3-pip python3-venv python3-dev'] },
  { value: 'Python (pyenv)', tag: 'version manager', lines: ['sudo apt install -y build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev','curl https://pyenv.run | bash','echo \'export PYENV_ROOT="$HOME/.pyenv"\' >> ~/.bashrc','echo \'[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"\' >> ~/.bashrc','echo \'eval "$(pyenv init -)"\' >> ~/.bashrc'] },
  { value: 'Go', lines: ['sudo add-apt-repository ppa:longsleep/golang-backports -y','sudo apt update && sudo apt install -y golang-go'] },
  { value: 'Rust', tag: 'rustup', lines: ["curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",'source "$HOME/.cargo/env"'] },
  { value: 'Java (OpenJDK 21)', label: 'Java 21', lines: ['sudo apt install -y openjdk-21-jdk openjdk-21-jre'] },
  { value: 'Java (OpenJDK 17)', label: 'Java 17', lines: ['sudo apt install -y openjdk-17-jdk openjdk-17-jre'] },
  { value: 'Kotlin', lines: ['sudo snap install kotlin --classic'] },
  { value: 'Scala (SBT)', label: 'Scala + SBT', lines: ['echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | sudo tee /etc/apt/sources.list.d/sbt.list','curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | sudo gpg --dearmor -o /usr/share/keyrings/sbt.gpg','sudo apt update && sudo apt install -y sbt'] },
  { value: 'Ruby (rbenv)', label: 'Ruby (rbenv)', lines: ['sudo apt install -y rbenv','rbenv install 3.2.0 && rbenv global 3.2.0 || true'] },
  { value: 'Elixir', lines: ['sudo apt install -y elixir'] },
  { value: 'Erlang', lines: ['sudo apt install -y erlang'] },
  { value: 'Haskell', tag: 'ghcup', lines: ['curl --proto "=https" --tlsv1.2 -sSf https://get-ghcup.haskell.org | BOOTSTRAP_HASKELL_NONINTERACTIVE=1 sh'] },
  { value: 'OCaml', lines: ['sudo apt install -y ocaml opam'] },
  { value: 'Zig', lines: ['sudo snap install zig --classic --beta || true'] },
  { value: 'Nim', lines: ['curl https://nim-lang.org/choosenim/init.sh -sSf | sh -s -- -y || true'] },
  { value: 'Dart', lines: ['wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg','echo "deb [signed-by=/usr/share/keyrings/dart.gpg] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main" | sudo tee /etc/apt/sources.list.d/dart_stable.list','sudo apt update && sudo apt install -y dart'] },
  { value: 'Flutter', tag: 'dart', lines: ['sudo snap install flutter --classic'] },
  { value: 'Swift', lines: ['SWIFT_VER=5.10','wget -q "https://download.swift.org/swift-${SWIFT_VER}-release/ubuntu2204/swift-${SWIFT_VER}-RELEASE/swift-${SWIFT_VER}-RELEASE-ubuntu22.04.tar.gz" -O /tmp/swift.tar.gz','sudo tar -xzf /tmp/swift.tar.gz -C /opt && rm /tmp/swift.tar.gz','echo "export PATH=/opt/swift-${SWIFT_VER}-RELEASE-ubuntu22.04/usr/bin:\\"$PATH\\"" >> ~/.bashrc'] },
  { value: 'C# (.NET)', label: 'C# / .NET', lines: ['wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb','sudo dpkg -i /tmp/packages-microsoft-prod.deb && rm /tmp/packages-microsoft-prod.deb','sudo apt update && sudo apt install -y dotnet-sdk-8.0'] },
  { value: 'R', tag: 'statistics', lines: ['sudo apt install -y r-base r-base-dev'] },
  { value: 'Julia', lines: ['curl -fsSL https://install.julialang.org | sh -s -- -y'] },
  { value: 'Perl', lines: ['sudo apt install -y perl'] },
  { value: 'Lua', lines: ['sudo apt install -y lua5.4'] },
  { value: 'PHP (CLI only)', tag: 'no extensions', lines: ['sudo add-apt-repository ppa:ondrej/php -y','sudo apt update && sudo apt install -y php-cli'] },
  { value: 'Clang / LLVM', tag: 'C/C++', lines: ['sudo apt install -y clang llvm lld'] },
  { value: 'Prolog (SWI)', label: 'Prolog', tag: 'swi-prolog', lines: ['sudo apt install -y swi-prolog'] },
  { value: 'Racket', tag: 'lisp/scheme', lines: ['sudo apt install -y racket'] },
  { value: 'Apache Groovy (apt)', label: 'Groovy (apt)', lines: ['sudo apt install -y groovy'] },
  { value: 'Tcl/Tk', lines: ['sudo apt install -y tcl tk'] },
  { value: 'Fortran', tag: 'gfortran', lines: ['sudo apt install -y gfortran'] },
  { value: 'COBOL', lines: ['sudo apt install -y gnucobol'] },
  { value: 'Assembly (NASM)', label: 'Assembly', tag: 'nasm', lines: ['sudo apt install -y nasm'] },
  { value: 'V Lang', lines: ['sudo snap install vlang --classic || true'] },
  { value: 'Crystal', lines: ['curl -fsSL https://crystal-lang.org/install.sh | sudo bash'] },
];

// ── Web Servers ───────────────────────────────────────────────────────────────
const WEB_SERVERS = [
  { value: 'Apache2', lines: ['sudo apt install -y apache2','sudo systemctl enable --now apache2'] },
  { value: 'Nginx', lines: ['sudo apt install -y nginx','sudo systemctl enable --now nginx'] },
  { value: 'Caddy', lines: ['sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https','curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/caddy-stable-archive-keyring.gpg] https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" | sudo tee /etc/apt/sources.list.d/caddy-stable.list','sudo apt update && sudo apt install -y caddy'] },
  { value: 'Traefik', tag: 'proxy', lines: ['wget -q https://github.com/traefik/traefik/releases/latest/download/traefik_linux_amd64.tar.gz -O /tmp/traefik.tar.gz','tar -xzf /tmp/traefik.tar.gz -C /tmp && sudo install /tmp/traefik /usr/local/bin/','rm /tmp/traefik.tar.gz'] },
  { value: 'None', lines: [] },
];

// ── DB Tools ──────────────────────────────────────────────────────────────────
const DB_TOOLS = [
  { value: 'phpMyAdmin', lines: ['export DEBIAN_FRONTEND=noninteractive','sudo apt install -y phpmyadmin'] },
  { value: 'Adminer', lines: ['sudo mkdir -p /var/www/html/adminer','sudo wget -q https://www.adminer.org/latest.php -O /var/www/html/adminer/index.php'] },
  { value: 'DBeaver CE', lines: ['curl -fsSL https://dbeaver.io/debs/dbeaver.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/dbeaver.gpg','echo "deb [signed-by=/usr/share/keyrings/dbeaver.gpg] https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list','sudo apt update && sudo apt install -y dbeaver-ce'] },
  { value: 'TablePlus', tag: 'snap', lines: ['sudo snap install tableplus'] },
  { value: 'DataGrip', tag: 'JetBrains', lines: ['sudo snap install datagrip --classic'] },
  { value: 'pgAdmin 4', tag: 'postgres', lines: ['curl -fsSL https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg','sudo sh -c \'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list\'','sudo apt update && sudo apt install -y pgadmin4-desktop'] },
  { value: 'MongoDB Compass', lines: ['wget -q https://downloads.mongodb.com/compass/mongodb-compass_1.44.4_amd64.deb -O /tmp/compass.deb','sudo apt install -y /tmp/compass.deb && rm /tmp/compass.deb'] },
  { value: 'Redis Insight', lines: ['sudo snap install redisinsight'] },
  { value: 'MySQL Workbench', lines: ['sudo apt install -y mysql-workbench-community || sudo snap install mysql-workbench-community || true'] },
  { value: 'Beekeeper Studio', tag: 'snap', lines: ['sudo snap install beekeeper-studio'] },
];

// ── Editors ───────────────────────────────────────────────────────────────────
const EDITORS = [
  { value: 'VS Code', lines: ['sudo snap install code'] },
  { value: 'VS Codium', tag: 'FOSS', lines: ['wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/vscodium-archive-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg] https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/debs vscodium main" | sudo tee /etc/apt/sources.list.d/vscodium.list','sudo apt update && sudo apt install -y codium'] },
  { value: 'Zed Editor', lines: ['curl -fsSL https://zed.dev/install.sh | sh || true'] },
  { value: 'Cursor', label: 'Cursor AI', tag: 'appimage', lines: ['wget -q "https://downloader.cursor.sh/linux/appImage/x64" -O ~/Cursor.AppImage','chmod +x ~/Cursor.AppImage','echo "Cursor downloaded to ~/Cursor.AppImage"'] },
  { value: 'Windsurf', tag: 'AI editor', lines: ['curl -fsSL "https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg" | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/windsurf-stable-archive-keyring.gpg arch=amd64] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list','sudo apt update && sudo apt install -y windsurf'] },
  { value: 'Sublime Text', lines: ['curl -fsSL https://download.sublimetext.com/sublimehq-pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/sublimehq-archive.gpg','echo "deb [signed-by=/usr/share/keyrings/sublimehq-archive.gpg] https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list','sudo apt update && sudo apt install -y sublime-text'] },
  { value: 'Vim', lines: ['sudo apt install -y vim vim-gtk3'] },
  { value: 'Neovim', lines: ['sudo apt install -y neovim','pip3 install --user neovim || true'] },
  { value: 'Emacs', lines: ['sudo apt install -y emacs'] },
  { value: 'Nano', lines: ['sudo apt install -y nano'] },
  { value: 'Kate', tag: 'KDE', lines: ['sudo apt install -y kate'] },
  { value: 'Geany', tag: 'lightweight', lines: ['sudo apt install -y geany geany-plugins'] },
  { value: 'Lapce', tag: 'rust-based', lines: ['sudo snap install lapce || true'] },
  { value: 'Helix', tag: 'modal', lines: ['sudo add-apt-repository ppa:maveonair/helix-editor -y','sudo apt update && sudo apt install -y helix'] },
];

// ── IDEs ──────────────────────────────────────────────────────────────────────
const IDES = [
  { value: 'IntelliJ IDEA CE', label: 'IntelliJ IDEA CE', tag: 'snap', lines: ['sudo snap install intellij-idea-community --classic'] },
  { value: 'IntelliJ IDEA Ultimate', label: 'IntelliJ Ultimate', tag: 'snap', lines: ['sudo snap install intellij-idea-ultimate --classic'] },
  { value: 'PhpStorm', tag: 'snap', lines: ['sudo snap install phpstorm --classic'] },
  { value: 'PyCharm CE', tag: 'snap', lines: ['sudo snap install pycharm-community --classic'] },
  { value: 'PyCharm', label: 'PyCharm Pro', tag: 'snap', lines: ['sudo snap install pycharm-professional --classic'] },
  { value: 'WebStorm', tag: 'snap', lines: ['sudo snap install webstorm --classic'] },
  { value: 'GoLand', tag: 'snap', lines: ['sudo snap install goland --classic'] },
  { value: 'RubyMine', tag: 'snap', lines: ['sudo snap install rubymine --classic'] },
  { value: 'CLion', tag: 'snap', lines: ['sudo snap install clion --classic'] },
  { value: 'Rider', tag: 'snap', lines: ['sudo snap install rider --classic'] },
  { value: 'DataSpell', tag: 'snap', lines: ['sudo snap install dataspell --classic'] },
  { value: 'Android Studio', tag: 'snap', lines: ['sudo snap install android-studio --classic'] },
  { value: 'Eclipse', lines: ['sudo snap install eclipse --classic'] },
  { value: 'NetBeans', lines: ['sudo snap install netbeans --classic'] },
  { value: 'Code::Blocks', tag: 'C/C++', lines: ['sudo apt install -y codeblocks'] },
  { value: 'Arduino IDE', lines: ['sudo snap install arduino'] },
  { value: 'Fleet', tag: 'JetBrains', lines: ['sudo snap install fleet --classic || true'] },
];

// ── VCS ───────────────────────────────────────────────────────────────────────
const VCS_TOOLS = [
  { value: 'Sourcegit (GUI)', label: 'Sourcegit', tag: 'gui', lines: ['curl -fsSL https://codeberg.org/api/packages/yataro/debian/repository.key | sudo tee /etc/apt/keyrings/sourcegit.asc','echo "deb [signed-by=/etc/apt/keyrings/sourcegit.asc, arch=amd64,arm64] https://codeberg.org/api/packages/yataro/debian generic main" | sudo tee /etc/apt/sources.list.d/sourcegit.list','sudo apt update && sudo apt install -y sourcegit'] },
  { value: 'GitKraken', tag: 'snap', lines: ['sudo snap install gitkraken --classic'] },
  { value: 'GitHub CLI', lines: ['sudo apt install -y gh'] },
  { value: 'GitLab CLI', lines: ['sudo snap install glab || true'] },
  { value: 'Git LFS', lines: ['sudo apt install -y git-lfs && git lfs install'] },
  { value: 'Meld', tag: 'diff tool', lines: ['sudo apt install -y meld'] },
  { value: 'lazygit', tag: 'tui', lines: ['LAZYGIT_VER=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po \'"tag_name": "v\\K[^"]*\')','curl -Lo /tmp/lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VER}_Linux_x86_64.tar.gz"','tar xf /tmp/lazygit.tar.gz -C /tmp && sudo install /tmp/lazygit /usr/local/bin && rm /tmp/lazygit.tar.gz'] },
  { value: 'delta', tag: 'git diff', lines: ['wget -q https://github.com/dandavison/delta/releases/latest/download/git-delta_amd64.deb -O /tmp/delta.deb','sudo apt install -y /tmp/delta.deb && rm /tmp/delta.deb'] },
  { value: 'pre-commit', lines: ['pip3 install pre-commit || true'] },
  { value: 'SVN', tag: 'subversion', lines: ['sudo apt install -y subversion'] },
];

// ── Browsers ──────────────────────────────────────────────────────────────────
const BROWSERS = [
  { value: 'Google Chrome', lines: ['wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/chrome.deb','sudo apt install -y /tmp/chrome.deb && rm /tmp/chrome.deb'] },
  { value: 'Firefox', lines: ['sudo apt install -y firefox'] },
  { value: 'Brave', lines: ['sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list','sudo apt update && sudo apt install -y brave-browser'] },
  { value: 'Chromium', tag: 'snap', lines: ['sudo snap install chromium'] },
  { value: 'Microsoft Edge', lines: ['curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor > /usr/share/keyrings/microsoft-edge.gpg','echo "deb [signed-by=/usr/share/keyrings/microsoft-edge.gpg] https://packages.microsoft.com/repos/edge stable main" | sudo tee /etc/apt/sources.list.d/microsoft-edge.list','sudo apt update && sudo apt install -y microsoft-edge-stable'] },
  { value: 'Vivaldi', lines: ['wget -q https://downloads.vivaldi.com/stable/vivaldi-stable_amd64.deb -O /tmp/vivaldi.deb','sudo apt install -y /tmp/vivaldi.deb && rm /tmp/vivaldi.deb'] },
  { value: 'Opera', tag: 'snap', lines: ['sudo snap install opera'] },
  { value: 'Tor Browser', tag: 'privacy', lines: ['sudo apt install -y torbrowser-launcher'] },
  { value: 'Min Browser', label: 'Min', tag: 'minimal', lines: ['wget -q https://github.com/minbrowser/min/releases/latest/download/min_amd64.deb -O /tmp/min.deb','sudo apt install -y /tmp/min.deb && rm /tmp/min.deb'] },
  { value: 'Lynx', tag: 'terminal', lines: ['sudo apt install -y lynx'] },
  { value: 'w3m', tag: 'terminal', lines: ['sudo apt install -y w3m'] },
];

// ── Containers & Kubernetes ───────────────────────────────────────────────────
const CONTAINERS = [
  { value: 'Docker Engine', lines: ['curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg','echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list','sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin','sudo usermod -aG docker "$USER"'] },
  { value: 'Docker Compose v2', lines: ['sudo apt install -y docker-compose-plugin || true','docker compose version'] },
  { value: 'Portainer CE', tag: 'ui', lines: ['sudo docker volume create portainer_data','sudo docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest || true','echo "Portainer at https://localhost:9443"'] },
  { value: 'Podman', tag: 'daemonless', lines: ['sudo apt install -y podman'] },
  { value: 'Kubectl', label: 'kubectl', lines: ['curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg','echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list','sudo apt update && sudo apt install -y kubectl'] },
  { value: 'Helm', lines: ['curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash'] },
  { value: 'Minikube', tag: 'local k8s', lines: ['curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64','sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64'] },
  { value: 'Kind', tag: 'k8s in docker', lines: ['curl -Lo /tmp/kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64','sudo install /tmp/kind /usr/local/bin/kind && rm /tmp/kind'] },
  { value: 'k9s', tag: 'tui', lines: ['sudo snap install k9s || true'] },
  { value: 'Buildah', lines: ['sudo apt install -y buildah'] },
  { value: 'Skopeo', lines: ['sudo apt install -y skopeo'] },
  { value: 'Hadolint', tag: 'linter', lines: ['wget -q https://github.com/hadolint/hadolint/releases/latest/download/hadolint-Linux-x86_64 -O /tmp/hadolint','sudo install /tmp/hadolint /usr/local/bin/hadolint && rm /tmp/hadolint'] },
  { value: 'ctop', tag: 'container top', lines: ['wget -q https://github.com/bcicen/ctop/releases/latest/download/ctop-linux-amd64 -O /tmp/ctop','sudo install /tmp/ctop /usr/local/bin/ctop && rm /tmp/ctop'] },
  { value: 'Dive', tag: 'image explorer', lines: ['wget -q https://github.com/wagoodman/dive/releases/latest/download/dive_amd64.deb -O /tmp/dive.deb','sudo apt install -y /tmp/dive.deb && rm /tmp/dive.deb'] },
];

// ── Cloud & IaC ───────────────────────────────────────────────────────────────
const CLOUD = [
  { value: 'AWS CLI v2', label: 'AWS CLI', tag: 'amazon', lines: ['curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip','unzip -q /tmp/awscliv2.zip -d /tmp && sudo /tmp/aws/install && rm -rf /tmp/aws /tmp/awscliv2.zip'] },
  { value: 'Azure CLI', tag: 'microsoft', lines: ['curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash'] },
  { value: 'Google Cloud CLI', label: 'GCloud CLI', tag: 'google', lines: ['curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg','echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list','sudo apt update && sudo apt install -y google-cloud-cli'] },
  { value: 'Terraform', tag: 'HashiCorp', lines: ['wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg','echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list','sudo apt update && sudo apt install -y terraform'] },
  { value: 'OpenTofu', tag: 'TF fork', lines: ['curl --proto "=https" --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o /tmp/install-opentofu.sh','chmod +x /tmp/install-opentofu.sh && sudo /tmp/install-opentofu.sh --install-method deb && rm /tmp/install-opentofu.sh'] },
  { value: 'Packer', tag: 'HashiCorp', lines: ['sudo apt update && sudo apt install -y packer'] },
  { value: 'Vault', tag: 'HashiCorp', lines: ['sudo apt install -y vault'] },
  { value: 'Consul', tag: 'HashiCorp', lines: ['sudo apt install -y consul'] },
  { value: 'Nomad', tag: 'HashiCorp', lines: ['sudo apt install -y nomad'] },
  { value: 'Pulumi', lines: ['curl -fsSL https://get.pulumi.com | sh'] },
  { value: 'Ansible', lines: ['sudo add-apt-repository ppa:ansible/ansible -y','sudo apt update && sudo apt install -y ansible'] },
  { value: 'Vagrant', tag: 'HashiCorp', lines: ['sudo apt install -y vagrant'] },
  { value: 'Serverless Framework', label: 'Serverless', tag: 'npm', lines: ['npm install -g serverless || true'] },
  { value: 'Flux CD', tag: 'GitOps', lines: ['curl -s https://fluxcd.io/install.sh | sudo bash'] },
  { value: 'ArgoCD CLI', lines: ['curl -sSL -o /tmp/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64','sudo install /tmp/argocd /usr/local/bin/argocd && rm /tmp/argocd'] },
];

// ── CLI Tools ─────────────────────────────────────────────────────────────────
const CLI_TOOLS = [
  { value: 'zsh + Oh My Zsh', lines: ['sudo apt install -y zsh','sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended || true','chsh -s $(which zsh) || true'] },
  { value: 'fish shell', lines: ['sudo apt install -y fish','echo "Set default: chsh -s $(which fish)"'] },
  { value: 'starship', label: 'Starship prompt', tag: 'prompt', lines: ['curl -sS https://starship.rs/install.sh | sh -s -- -y'] },
  { value: 'tmux', lines: ['sudo apt install -y tmux'] },
  { value: 'Zellij', tag: 'multiplexer', lines: ['cargo install --locked zellij || sudo snap install zellij --classic || true'] },
  { value: 'screen', lines: ['sudo apt install -y screen'] },
  { value: 'Alacritty', tag: 'terminal', lines: ['sudo apt install -y alacritty || sudo snap install alacritty --classic || true'] },
  { value: 'Kitty', tag: 'terminal', lines: ['sudo apt install -y kitty'] },
  { value: 'WezTerm', tag: 'terminal', lines: ['curl -fsSL https://apt.fury.io/wez/gpg.key | sudo gpg --yes --dearmor -o /usr/share/keyrings/wezterm-fury.gpg','echo "deb [signed-by=/usr/share/keyrings/wezterm-fury.gpg] https://apt.fury.io/wez/ * *" | sudo tee /etc/apt/sources.list.d/wezterm.list','sudo apt update && sudo apt install -y wezterm'] },
  { value: 'Terminator', tag: 'terminal', lines: ['sudo apt install -y terminator'] },
  { value: 'bat', tag: 'better cat', lines: ['sudo apt install -y bat','mkdir -p ~/.local/bin && ln -sf /usr/bin/batcat ~/.local/bin/bat 2>/dev/null || true'] },
  { value: 'eza', tag: 'better ls', lines: ['sudo apt install -y eza'] },
  { value: 'lsd', tag: 'better ls', lines: ['wget -q https://github.com/lsd-rs/lsd/releases/latest/download/lsd_amd64.deb -O /tmp/lsd.deb','sudo apt install -y /tmp/lsd.deb && rm /tmp/lsd.deb'] },
  { value: 'ripgrep', tag: 'better grep', lines: ['sudo apt install -y ripgrep'] },
  { value: 'fd', tag: 'better find', lines: ['sudo apt install -y fd-find','ln -sf $(which fdfind) ~/.local/bin/fd 2>/dev/null || true'] },
  { value: 'fzf', lines: ['sudo apt install -y fzf'] },
  { value: 'jq', lines: ['sudo apt install -y jq'] },
  { value: 'yq', tag: 'yaml processor', lines: ['sudo snap install yq'] },
  { value: 'htop', lines: ['sudo apt install -y htop'] },
  { value: 'btop', tag: 'resource monitor', lines: ['sudo apt install -y btop'] },
  { value: 'ncdu', tag: 'disk usage', lines: ['sudo apt install -y ncdu'] },
  { value: 'dust', tag: 'better du', lines: ['cargo install du-dust || sudo snap install dust || true'] },
  { value: 'duf', tag: 'better df', lines: ['sudo apt install -y duf'] },
  { value: 'hyperfine', tag: 'benchmark', lines: ['wget -q https://github.com/sharkdp/hyperfine/releases/latest/download/hyperfine_amd64.deb -O /tmp/hyperfine.deb','sudo apt install -y /tmp/hyperfine.deb && rm /tmp/hyperfine.deb'] },
  { value: 'zoxide', tag: 'smart cd', lines: ['sudo apt install -y zoxide || curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash || true'] },
  { value: 'ranger', tag: 'file manager', lines: ['sudo apt install -y ranger'] },
  { value: 'nnn', tag: 'file manager', lines: ['sudo apt install -y nnn'] },
  { value: 'mc', label: 'Midnight Cmdr', tag: 'file manager', lines: ['sudo apt install -y mc'] },
  { value: 'rclone', tag: 'cloud sync', lines: ['sudo apt install -y rclone'] },
  { value: 'rsync', lines: ['sudo apt install -y rsync'] },
  { value: 'pv', tag: 'pipe viewer', lines: ['sudo apt install -y pv'] },
  { value: 'tree', lines: ['sudo apt install -y tree'] },
  { value: 'parallel', label: 'GNU Parallel', lines: ['sudo apt install -y parallel'] },
  { value: 'thefuck', lines: ['pip3 install thefuck || true'] },
  { value: 'Composer (PHP)', label: 'Composer', tag: 'php', lines: ['curl -sS https://getcomposer.org/installer | php -- --install-dir=/tmp','sudo mv /tmp/composer.phar /usr/local/bin/composer'] },
  { value: 'pnpm + yarn', lines: ['npm install -g pnpm yarn || true'] },
];

// ── Dev Tools ─────────────────────────────────────────────────────────────────
const DEV_TOOLS = [
  { value: 'make', label: 'make / cmake', lines: ['sudo apt install -y make cmake'] },
  { value: 'gcc extras', label: 'GCC Extras', lines: ['sudo apt install -y build-essential gcc g++ gdb'] },
  { value: 'Meson + Ninja', lines: ['sudo apt install -y meson ninja-build'] },
  { value: 'Bazel', lines: ['sudo apt install -y bazel || sudo snap install bazel --classic || true'] },
  { value: 'Maven', lines: ['sudo apt install -y maven'] },
  { value: 'Gradle', lines: ['sudo apt install -y gradle || sudo snap install gradle --classic || true'] },
  { value: 'Postman', lines: ['sudo snap install postman'] },
  { value: 'Insomnia', tag: 'API client', lines: ['sudo snap install insomnia'] },
  { value: 'Bruno', tag: 'API client', lines: ['sudo snap install bruno || true'] },
  { value: 'ngrok', tag: 'tunnel', lines: ['curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo gpg --dearmor -o /etc/apt/keyrings/ngrok.gpg','echo "deb [signed-by=/etc/apt/keyrings/ngrok.gpg] https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list','sudo apt update && sudo apt install -y ngrok'] },
  { value: 'act', tag: 'local CI', lines: ['curl --proto "=https" --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash'] },
  { value: 'gdb', label: 'GDB', tag: 'debugger', lines: ['sudo apt install -y gdb'] },
  { value: 'Valgrind', lines: ['sudo apt install -y valgrind'] },
  { value: 'strace', lines: ['sudo apt install -y strace'] },
  { value: 'perf', tag: 'profiling', lines: ['sudo apt install -y linux-tools-common linux-tools-generic'] },
  { value: 'Mermaid CLI', lines: ['npm install -g @mermaid-js/mermaid-cli || true'] },
  { value: 'Pandoc', lines: ['sudo apt install -y pandoc'] },
  { value: 'LaTeX (texlive)', label: 'LaTeX', lines: ['sudo apt install -y texlive-full'] },
  { value: 'ImageMagick', lines: ['sudo apt install -y imagemagick'] },
  { value: 'ffmpeg', label: 'FFmpeg', lines: ['sudo apt install -y ffmpeg'] },
  { value: 'Prettier', lines: ['npm install -g prettier || true'] },
  { value: 'ESLint', lines: ['npm install -g eslint || true'] },
  { value: 'Trivy', tag: 'vuln scanner', lines: ['sudo apt install -y wget apt-transport-https gnupg','wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo gpg --dearmor -o /usr/share/keyrings/trivy.gpg','echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list','sudo apt update && sudo apt install -y trivy'] },
  { value: 'Doxygen', lines: ['sudo apt install -y doxygen graphviz'] },
  { value: 'wkhtmltopdf', lines: ['sudo apt install -y wkhtmltopdf'] },
];

// ── Networking ────────────────────────────────────────────────────────────────
const NETWORKING = [
  { value: 'nmap', tag: 'port scanner', lines: ['sudo apt install -y nmap'] },
  { value: 'Netcat', label: 'Netcat', lines: ['sudo apt install -y netcat-traditional'] },
  { value: 'traceroute', lines: ['sudo apt install -y traceroute'] },
  { value: 'mtr', tag: 'network diag', lines: ['sudo apt install -y mtr-tiny'] },
  { value: 'tcpdump', tag: 'packet capture', lines: ['sudo apt install -y tcpdump'] },
  { value: 'Wireshark', tag: 'GUI', lines: ['sudo apt install -y wireshark','sudo usermod -aG wireshark "$USER"'] },
  { value: 'iperf3', tag: 'bandwidth test', lines: ['sudo apt install -y iperf3'] },
  { value: 'OpenVPN', lines: ['sudo apt install -y openvpn network-manager-openvpn'] },
  { value: 'WireGuard', lines: ['sudo apt install -y wireguard'] },
  { value: 'Tailscale', lines: ['curl -fsSL https://tailscale.com/install.sh | sh'] },
  { value: 'ssh config', label: 'SSH hardening', lines: ['sudo apt install -y openssh-server','sudo systemctl enable --now ssh'] },
];

// ── Security ──────────────────────────────────────────────────────────────────
const SECURITY = [
  { value: 'fail2ban', lines: ['sudo apt install -y fail2ban','sudo systemctl enable --now fail2ban'] },
  { value: 'UFW', lines: ['sudo apt install -y ufw','sudo ufw --force enable','sudo ufw default deny incoming','sudo ufw default allow outgoing','sudo ufw allow ssh'] },
  { value: 'ClamAV', lines: ['sudo apt install -y clamav clamav-daemon','sudo freshclam || true'] },
  { value: 'OpenVPN', lines: ['sudo apt install -y openvpn'] },
  { value: 'WireGuard', lines: ['sudo apt install -y wireguard'] },
  { value: 'Lynis', label: 'Lynis', tag: 'security audit', lines: ['sudo apt install -y lynis'] },
  { value: 'rkhunter', tag: 'rootkit detection', lines: ['sudo apt install -y rkhunter'] },
  { value: 'chkrootkit', lines: ['sudo apt install -y chkrootkit'] },
  { value: 'openssl', label: 'OpenSSL', lines: ['sudo apt install -y openssl'] },
  { value: 'openssh-server', label: 'OpenSSH Server', lines: ['sudo apt install -y openssh-server','sudo systemctl enable --now ssh'] },
  { value: 'mkcert', tag: 'local TLS', lines: ['sudo apt install -y libnss3-tools','wget -q https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-v1.4.4-linux-amd64 -O /tmp/mkcert','sudo install /tmp/mkcert /usr/local/bin/mkcert && rm /tmp/mkcert','mkcert -install'] },
  { value: 'certbot', label: 'Certbot', tag: "Let's Encrypt", lines: ['sudo snap install certbot --classic'] },
  { value: 'age', tag: 'encryption', lines: ['sudo apt install -y age || true'] },
  { value: 'Metasploit', tag: 'pentesting', lines: ['curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > /tmp/msfinstall','chmod 755 /tmp/msfinstall && sudo /tmp/msfinstall && rm /tmp/msfinstall || true'] },
];

// ── AI / ML ───────────────────────────────────────────────────────────────────
const AI_ML = [
  { value: 'Ollama', tag: 'local LLMs', lines: ['curl -fsSL https://ollama.com/install.sh | sh'] },
  { value: 'PyTorch', tag: 'pip', lines: ['pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu || true'] },
  { value: 'TensorFlow', tag: 'pip', lines: ['pip3 install tensorflow || true'] },
  { value: 'scikit-learn', tag: 'pip', lines: ['pip3 install scikit-learn || true'] },
  { value: 'Pandas', tag: 'pip', lines: ['pip3 install pandas || true'] },
  { value: 'NumPy', tag: 'pip', lines: ['pip3 install numpy || true'] },
  { value: 'Matplotlib', tag: 'pip', lines: ['pip3 install matplotlib || true'] },
  { value: 'Jupyter', label: 'JupyterLab', tag: 'pip', lines: ['pip3 install jupyterlab notebook || true'] },
  { value: 'Jupyter Lab (pip)', label: 'JupyterLab', tag: 'pip', lines: ['pip3 install jupyterlab || true'] },
  { value: 'Hugging Face CLI', label: 'HuggingFace', tag: 'pip', lines: ['pip3 install transformers datasets huggingface_hub || true'] },
  { value: 'LangChain', tag: 'pip', lines: ['pip3 install langchain langchain-community || true'] },
  { value: 'OpenAI SDK', tag: 'pip', lines: ['pip3 install openai || true'] },
  { value: 'Anthropic SDK', tag: 'pip', lines: ['pip3 install anthropic || true'] },
  { value: 'MLflow', tag: 'pip', lines: ['pip3 install mlflow || true'] },
  { value: 'CUDA Toolkit', tag: 'nvidia', lines: ['sudo apt install -y nvidia-cuda-toolkit'] },
  { value: 'Open WebUI', tag: 'docker', lines: ['sudo docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main || true','echo "Open WebUI running at http://localhost:3000"'] },
];

// ── Communication & Productivity ──────────────────────────────────────────────
const APPS = [
  { value: 'Slack', tag: 'snap', lines: ['sudo snap install slack --classic'] },
  { value: 'Discord', tag: 'deb', lines: ['wget -q "https://discord.com/api/download?platform=linux&format=deb" -O /tmp/discord.deb','sudo apt install -y /tmp/discord.deb && rm /tmp/discord.deb'] },
  { value: 'Zoom', lines: ['wget -q https://zoom.us/client/latest/zoom_amd64.deb -O /tmp/zoom.deb','sudo apt install -y /tmp/zoom.deb && rm /tmp/zoom.deb'] },
  { value: 'Telegram', lines: ['sudo snap install telegram-desktop'] },
  { value: 'Signal', lines: ['curl -fsSL https://updates.signal.org/desktop/apt/keys.asc | sudo gpg --dearmor -o /usr/share/keyrings/signal-desktop-keyring.gpg','echo "deb [arch=amd64 signed-by=/usr/share/keyrings/signal-desktop-keyring.gpg] https://updates.signal.org/desktop/apt xenial main" | sudo tee /etc/apt/sources.list.d/signal-xenial.list','sudo apt update && sudo apt install -y signal-desktop'] },
  { value: 'Microsoft Teams', label: 'MS Teams', lines: ['curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg','echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/ms-teams stable main" | sudo tee /etc/apt/sources.list.d/teams.list','sudo apt update && sudo apt install -y teams || sudo snap install teams-for-linux || true'] },
  { value: 'Element (Matrix)', label: 'Element', tag: 'matrix', lines: ['sudo snap install element-desktop'] },
  { value: 'Mattermost', lines: ['sudo snap install mattermost-desktop'] },
  { value: 'Thunderbird', tag: 'email', lines: ['sudo apt install -y thunderbird'] },
  { value: 'Spotify', lines: ['sudo snap install spotify'] },
  { value: 'VLC', lines: ['sudo apt install -y vlc'] },
  { value: 'LibreOffice', lines: ['sudo apt install -y libreoffice'] },
  { value: 'OnlyOffice', lines: ['sudo snap install onlyoffice-desktopeditors'] },
  { value: 'WPS Office', lines: ['wget -q https://wps-community.org/downloads?vl=snap -O /tmp/wps.snap || sudo snap install wps-office-all-langpack-zh-cn || true'] },
  { value: 'Obsidian', lines: ['sudo snap install obsidian --classic'] },
  { value: 'Logseq', lines: ['sudo flatpak install -y flathub com.logseq.Logseq || sudo snap install logseq || true'] },
  { value: 'Notion', lines: ['sudo snap install notion-snap-reborn || true'] },
  { value: 'Nextcloud Desktop', label: 'Nextcloud', lines: ['sudo apt install -y nextcloud-desktop'] },
  { value: 'Dropbox', lines: ['wget -q https://www.dropbox.com/download?plat=lnx.x86_64 -O /tmp/dropbox.tar.gz','tar -xzf /tmp/dropbox.tar.gz -C ~/ && rm /tmp/dropbox.tar.gz','~/.dropbox-dist/dropboxd &','echo "Dropbox daemon started"'] },
  { value: 'OBS Studio', lines: ['sudo apt install -y obs-studio'] },
  { value: 'Flameshot', tag: 'screenshots', lines: ['sudo apt install -y flameshot'] },
  { value: 'Remmina', tag: 'remote desktop', lines: ['sudo apt install -y remmina remmina-plugin-rdp remmina-plugin-vnc'] },
  { value: 'AnyDesk', lines: ['wget -qO - https://keys.anydesk.com/repos/DEB-GPG-KEY | sudo gpg --dearmor -o /usr/share/keyrings/anydesk.gpg','echo "deb [signed-by=/usr/share/keyrings/anydesk.gpg] http://deb.anydesk.com/ all main" | sudo tee /etc/apt/sources.list.d/anydesk-stable.list','sudo apt update && sudo apt install -y anydesk'] },
  { value: 'TeamViewer', lines: ['wget -q https://download.teamviewer.com/download/linux/teamviewer_amd64.deb -O /tmp/teamviewer.deb','sudo apt install -y /tmp/teamviewer.deb && rm /tmp/teamviewer.deb'] },
  { value: 'Kdenlive', tag: 'video editor', lines: ['sudo apt install -y kdenlive'] },
  { value: 'Shotcut', tag: 'video editor', lines: ['sudo snap install shotcut --classic'] },
  { value: 'Steam', lines: ['sudo apt install -y steam'] },
  { value: 'Lutris', lines: ['sudo apt install -y lutris'] },
  { value: 'Heroic Games Launcher', lines: ['sudo snap install heroic || true'] },
  { value: 'Calibre', tag: 'ebook', lines: ['sudo apt install -y calibre'] },
];

// ── Media & Graphics ──────────────────────────────────────────────────────────
const MEDIA = [
  { value: 'GIMP', lines: ['sudo apt install -y gimp'] },
  { value: 'Inkscape', lines: ['sudo apt install -y inkscape'] },
  { value: 'Darktable', tag: 'photo editing', lines: ['sudo apt install -y darktable'] },
  { value: 'Blender', lines: ['sudo snap install blender --classic'] },
  { value: 'Kdenlive', tag: 'video editor', lines: ['sudo apt install -y kdenlive'] },
  { value: 'Shotcut', tag: 'video editor', lines: ['sudo snap install shotcut --classic'] },
  { value: 'Audacity', tag: 'audio editor', lines: ['sudo apt install -y audacity'] },
  { value: 'Handbrake', tag: 'video converter', lines: ['sudo apt install -y handbrake'] },
  { value: 'OBS Studio', tag: 'streaming/recording', lines: ['sudo apt install -y obs-studio'] },
  { value: 'Krita', tag: 'digital painting', lines: ['sudo apt install -y krita'] },
  { value: 'Natron', tag: 'compositing', lines: ['sudo apt install -y natron || true'] },
  { value: 'Rawtherapee', tag: 'raw photo', lines: ['sudo apt install -y rawtherapee'] },
  { value: 'digiKam', tag: 'photo manager', lines: ['sudo snap install digikam'] },
  { value: 'Shotwell', tag: 'photo manager', lines: ['sudo apt install -y shotwell'] },
  { value: 'Scribus', tag: 'desktop publishing', lines: ['sudo apt install -y scribus'] },
  { value: 'FontForge', tag: 'font editor', lines: ['sudo apt install -y fontforge'] },
];

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS = [
  { value: 'JetBrains Mono', lines: ['wget -q https://github.com/JetBrains/JetBrainsMono/releases/latest/download/JetBrainsMono.zip -O /tmp/JetBrainsMono.zip','sudo unzip -q /tmp/JetBrainsMono.zip "fonts/ttf/*" -d /usr/share/fonts/JetBrainsMono && rm /tmp/JetBrainsMono.zip','sudo fc-cache -fv'] },
  { value: 'Fira Code', tag: 'ligatures', lines: ['sudo apt install -y fonts-firacode'] },
  { value: 'Nerd Fonts (FiraCode)', label: 'Nerd Fonts FiraCode', tag: 'icons', lines: ['NERD_FONT="FiraCode"','wget -q "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/${NERD_FONT}.zip" -O /tmp/NerdFont.zip','sudo unzip -q /tmp/NerdFont.zip -d /usr/share/fonts/NerdFonts-${NERD_FONT} && rm /tmp/NerdFont.zip','sudo fc-cache -fv'] },
  { value: 'Nerd Fonts (JetBrainsMono)', label: 'Nerd Fonts JetBrains', tag: 'icons', lines: ['NERD_FONT="JetBrainsMono"','wget -q "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/${NERD_FONT}.zip" -O /tmp/NerdFont.zip','sudo unzip -q /tmp/NerdFont.zip -d /usr/share/fonts/NerdFonts-${NERD_FONT} && rm /tmp/NerdFont.zip','sudo fc-cache -fv'] },
  { value: 'Cascadia Code', lines: ['wget -q https://github.com/microsoft/cascadia-code/releases/latest/download/CascadiaCode.zip -O /tmp/CascadiaCode.zip','sudo unzip -q /tmp/CascadiaCode.zip "ttf/*" -d /usr/share/fonts/CascadiaCode && rm /tmp/CascadiaCode.zip','sudo fc-cache -fv'] },
  { value: 'Hack', lines: ['sudo apt install -y fonts-hack'] },
  { value: 'Noto Fonts', lines: ['sudo apt install -y fonts-noto fonts-noto-color-emoji'] },
  { value: 'Ubuntu Fonts', lines: ['sudo apt install -y fonts-ubuntu'] },
  { value: 'Powerline Fonts', tag: 'terminal', lines: ['sudo apt install -y fonts-powerline'] },
  { value: 'Microsoft Core Fonts', label: 'MS Core Fonts', tag: 'Arial, Times…', lines: ['sudo apt install -y ttf-mscorefonts-installer','sudo fc-cache -fv'] },
];

// ── GNOME & Desktop ───────────────────────────────────────────────────────────
const GNOME_TOOLS = [
  { value: 'GNOME Tweaks', lines: ['sudo apt install -y gnome-tweaks'] },
  { value: 'Extension Manager', lines: ['sudo apt install -y gnome-shell-extension-manager'] },
  { value: 'Dconf Editor', lines: ['sudo apt install -y dconf-editor'] },
  { value: 'Ulauncher', tag: 'app launcher', lines: ['sudo add-apt-repository ppa:agornostal/ulauncher -y','sudo apt update && sudo apt install -y ulauncher'] },
  { value: 'Albert', tag: 'app launcher', lines: ['sudo apt install -y albert || sudo snap install albert || true'] },
  { value: 'Plank', tag: 'dock', lines: ['sudo apt install -y plank'] },
  { value: 'Dash to Dock', lines: ['sudo apt install -y gnome-shell-extension-dashtodock || true'] },
  { value: 'Papirus Icons', lines: ['sudo add-apt-repository ppa:papirus/papirus -y','sudo apt update && sudo apt install -y papirus-icon-theme'] },
  { value: 'Numix Icons', lines: ['sudo add-apt-repository ppa:numix/ppa -y','sudo apt update && sudo apt install -y numix-icon-theme-circle'] },
  { value: 'Grub Customizer', lines: ['sudo add-apt-repository ppa:danielrichter2007/grub-customizer -y','sudo apt update && sudo apt install -y grub-customizer'] },
  { value: 'Stacer', tag: 'optimizer', lines: ['sudo add-apt-repository ppa:oguzhaninan/stacer -y','sudo apt update && sudo apt install -y stacer'] },
  { value: 'BleachBit', tag: 'cleaner', lines: ['sudo apt install -y bleachbit'] },
  { value: 'Synaptic', lines: ['sudo apt install -y synaptic'] },
  { value: 'Conky', lines: ['sudo apt install -y conky-all'] },
  { value: 'Variety', tag: 'wallpapers', lines: ['sudo add-apt-repository ppa:varietywalls/variety -y','sudo apt update && sudo apt install -y variety'] },
  { value: 'Gogh Themes', label: 'Gogh Terminal Themes', lines: ['bash -c "$(wget -qO- https://git.io/vQgMr)" || true'] },
];
