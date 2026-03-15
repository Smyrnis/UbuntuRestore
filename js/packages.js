/**
 * packages.js
 * Pure data layer — no DOM, no state mutations.
 * Every package: { value, label, tag?, lines[] }
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
  {
    value: 'MariaDB', label: 'MariaDB',
    lines: [
      'echo "→ Installing MariaDB..."',
      'sudo apt install -y mariadb-server mariadb-client',
      'sudo systemctl enable --now mariadb',
    ],
  },
  {
    value: 'MySQL', label: 'MySQL',
    lines: [
      'echo "→ Installing MySQL..."',
      'sudo apt install -y mysql-server mysql-client',
      'sudo systemctl enable --now mysql',
    ],
  },
  {
    value: 'PostgreSQL', label: 'PostgreSQL',
    lines: [
      'sudo apt install -y postgresql postgresql-contrib',
      'sudo systemctl enable --now postgresql',
    ],
  },
  {
    value: 'SQLite3', label: 'SQLite3',
    lines: ['sudo apt install -y sqlite3'],
  },
  {
    value: 'Redis', label: 'Redis',
    lines: [
      'sudo apt install -y redis-server',
      'sudo systemctl enable --now redis-server',
    ],
  },
  {
    value: 'MongoDB', label: 'MongoDB',
    lines: [
      'curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg',
      'echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list',
      'sudo apt update && sudo apt install -y mongodb-org',
      'sudo systemctl enable mongod',
    ],
  },
  {
    value: 'Cassandra', label: 'Cassandra',
    lines: [
      'wget -q -O - https://downloads.apache.org/cassandra/KEYS | sudo apt-key add -',
      'echo "deb https://downloads.apache.org/cassandra/debian 41x main" | sudo tee /etc/apt/sources.list.d/cassandra.list',
      'sudo apt update && sudo apt install -y cassandra',
    ],
  },
  {
    value: 'CouchDB', label: 'CouchDB',
    lines: [
      'curl -fsSL https://couchdb.apache.org/repo/keys.asc | sudo gpg --dearmor -o /usr/share/keyrings/couchdb-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/couchdb-archive-keyring.gpg] https://apache.jfrog.io/artifactory/couchdb-deb/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/couchdb.list',
      'sudo apt update && sudo apt install -y couchdb',
    ],
  },
  {
    value: 'InfluxDB', label: 'InfluxDB', tag: 'time-series',
    lines: [
      'wget -q https://repos.influxdata.com/influxdata-archive_compat.key -O /tmp/influx.key',
      'sudo gpg --dearmor < /tmp/influx.key | sudo tee /usr/share/keyrings/influxdata-archive_compat.gpg > /dev/null',
      'echo "deb [signed-by=/usr/share/keyrings/influxdata-archive_compat.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list',
      'sudo apt update && sudo apt install -y influxdb2',
      'sudo systemctl enable --now influxdb',
    ],
  },
  {
    value: 'Neo4j', label: 'Neo4j', tag: 'graph',
    lines: [
      'wget -O - https://debian.neo4j.com/neotechnology.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/neo4j.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/neo4j.gpg] https://debian.neo4j.com stable latest" | sudo tee /etc/apt/sources.list.d/neo4j.list',
      'sudo apt update && sudo apt install -y neo4j',
      'sudo systemctl enable --now neo4j',
    ],
  },
  {
    value: 'Elasticsearch', label: 'Elasticsearch', tag: 'search',
    lines: [
      'curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/elasticsearch.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elasticsearch.list',
      'sudo apt update && sudo apt install -y elasticsearch',
      'sudo systemctl enable --now elasticsearch',
    ],
  },
  {
    value: 'Memcached', label: 'Memcached',
    lines: ['sudo apt install -y memcached', 'sudo systemctl enable --now memcached'],
  },
  {
    value: 'RabbitMQ', label: 'RabbitMQ', tag: 'message queue',
    lines: [
      'sudo apt install -y rabbitmq-server',
      'sudo systemctl enable --now rabbitmq-server',
    ],
  },
  {
    value: 'Apache Kafka', label: 'Apache Kafka', tag: 'streaming',
    lines: [
      'sudo apt install -y default-jre-headless',
      'KAFKA_VER="3.7.0"',
      'wget -q "https://downloads.apache.org/kafka/${KAFKA_VER}/kafka_2.13-${KAFKA_VER}.tgz" -O /tmp/kafka.tgz',
      'sudo tar -xzf /tmp/kafka.tgz -C /opt/',
      'sudo ln -sfn /opt/kafka_2.13-${KAFKA_VER} /opt/kafka',
      'rm /tmp/kafka.tgz',
      'echo "Kafka installed at /opt/kafka"',
    ],
  },
  {
    value: 'MinIO', label: 'MinIO', tag: 's3-compatible',
    lines: [
      'wget -q https://dl.min.io/server/minio/release/linux-amd64/minio -O /tmp/minio',
      'sudo install /tmp/minio /usr/local/bin/minio',
      'sudo mkdir -p /etc/minio /data/minio',
      'echo "MinIO installed. Run: minio server /data/minio"',
    ],
  },
  {
    value: 'Valkey', label: 'Valkey', tag: 'redis-fork',
    lines: [
      'sudo apt install -y valkey || sudo snap install valkey || true',
    ],
  },
];

// ── Languages ─────────────────────────────────────────────────────────────────
const LANGUAGES = [
  {
    value: 'Node.js (LTS via NVM)', label: 'Node.js LTS', tag: 'nvm',
    lines: [
      'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash',
      'export NVM_DIR="$HOME/.nvm"',
      '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"',
      'nvm install --lts',
    ],
  },
  {
    value: 'Bun', label: 'Bun', tag: 'js runtime',
    lines: [
      'curl -fsSL https://bun.sh/install | bash',
    ],
  },
  {
    value: 'Deno', label: 'Deno', tag: 'js runtime',
    lines: [
      'curl -fsSL https://deno.land/install.sh | sh',
    ],
  },
  {
    value: 'Python 3 + pip', label: 'Python 3 + pip',
    lines: [
      'sudo apt install -y python3 python3-pip python3-venv python3-dev',
    ],
  },
  {
    value: 'Python (pyenv)', label: 'Python (pyenv)', tag: 'version manager',
    lines: [
      'sudo apt install -y build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev',
      'curl https://pyenv.run | bash',
      'echo \'export PYENV_ROOT="$HOME/.pyenv"\' >> ~/.bashrc',
      'echo \'[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"\' >> ~/.bashrc',
      'echo \'eval "$(pyenv init -)"\' >> ~/.bashrc',
    ],
  },
  {
    value: 'Go', label: 'Go',
    lines: [
      'sudo add-apt-repository ppa:longsleep/golang-backports -y',
      'sudo apt update && sudo apt install -y golang-go',
    ],
  },
  {
    value: 'Rust', label: 'Rust', tag: 'rustup',
    lines: [
      "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
      'source "$HOME/.cargo/env"',
    ],
  },
  {
    value: 'Ruby', label: 'Ruby',
    lines: ['sudo apt install -y ruby-full'],
  },
  {
    value: 'Ruby (rbenv)', label: 'Ruby (rbenv)', tag: 'version manager',
    lines: [
      'sudo apt install -y rbenv ruby-build',
      'echo \'eval "$(rbenv init -)"\' >> ~/.bashrc',
    ],
  },
  {
    value: 'Java (OpenJDK 21)', label: 'Java 21', tag: 'LTS',
    lines: ['sudo apt install -y openjdk-21-jdk'],
  },
  {
    value: 'Java (OpenJDK 17)', label: 'Java 17', tag: 'LTS',
    lines: ['sudo apt install -y openjdk-17-jdk'],
  },
  {
    value: 'Java (OpenJDK 11)', label: 'Java 11', tag: 'LTS',
    lines: ['sudo apt install -y openjdk-11-jdk'],
  },
  {
    value: 'Kotlin', label: 'Kotlin',
    lines: ['sudo snap install kotlin --classic'],
  },
  {
    value: 'Scala', label: 'Scala',
    lines: [
      'sudo apt install -y scala || sudo snap install scala --classic || true',
    ],
  },
  {
    value: 'Groovy', label: 'Groovy', tag: 'JVM',
    lines: ['sudo snap install groovy --classic'],
  },
  {
    value: 'Clojure', label: 'Clojure', tag: 'JVM',
    lines: [
      'sudo apt install -y default-jre-headless',
      'curl -L -O https://github.com/clojure/brew-install/releases/latest/download/linux-install.sh',
      'chmod +x linux-install.sh && sudo ./linux-install.sh && rm linux-install.sh',
    ],
  },
  {
    value: '.NET SDK', label: '.NET SDK',
    lines: [
      'UBUNTU_VER=$(lsb_release -rs)',
      'wget -q "https://packages.microsoft.com/config/ubuntu/${UBUNTU_VER}/packages-microsoft-prod.deb" -O /tmp/ms-prod.deb',
      'sudo dpkg -i /tmp/ms-prod.deb && rm /tmp/ms-prod.deb',
      'sudo apt update && sudo apt install -y dotnet-sdk-8.0',
    ],
  },
  {
    value: 'C / C++', label: 'C / C++', tag: 'build-essential',
    lines: ['sudo apt install -y build-essential gcc g++ gdb cmake make'],
  },
  {
    value: 'Lua', label: 'Lua',
    lines: ['sudo apt install -y lua5.4 luarocks'],
  },
  {
    value: 'Perl', label: 'Perl',
    lines: ['sudo apt install -y perl cpanminus'],
  },
  {
    value: 'R', label: 'R',
    lines: [
      'sudo apt install -y r-base r-base-dev',
    ],
  },
  {
    value: 'Julia', label: 'Julia',
    lines: [
      'curl -fsSL https://install.julialang.org | sh -s -- -y',
    ],
  },
  {
    value: 'Swift', label: 'Swift',
    lines: [
      'sudo apt install -y binutils git gnupg2 libc6-dev libcurl4-openssl-dev libedit2 libgcc-11-dev libpython3-dev libsqlite3-dev libstdc++-11-dev libxml2-dev libz3-dev pkg-config tzdata unzip zlib1g-dev',
      'SWIFT_VER="swift-5.10-RELEASE"',
      'wget -q "https://download.swift.org/${SWIFT_VER}-ubuntu$(lsb_release -rs)/${SWIFT_VER}-ubuntu$(lsb_release -rs).tar.gz" -O /tmp/swift.tar.gz || true',
      'sudo tar -xzf /tmp/swift.tar.gz -C /opt/ && rm /tmp/swift.tar.gz || true',
      'echo "Swift installed. Add /opt/${SWIFT_VER}-ubuntu*/usr/bin to PATH"',
    ],
  },
  {
    value: 'Dart', label: 'Dart',
    lines: [
      'sudo apt install -y apt-transport-https',
      'curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/dart.gpg] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main" | sudo tee /etc/apt/sources.list.d/dart_stable.list',
      'sudo apt update && sudo apt install -y dart',
    ],
  },
  {
    value: 'Flutter', label: 'Flutter', tag: 'dart',
    lines: ['sudo snap install flutter --classic'],
  },
  {
    value: 'Elixir', label: 'Elixir',
    lines: [
      'wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -O /tmp/erlang.deb',
      'sudo dpkg -i /tmp/erlang.deb && rm /tmp/erlang.deb',
      'sudo apt update && sudo apt install -y esl-erlang elixir',
    ],
  },
  {
    value: 'Erlang', label: 'Erlang',
    lines: [
      'wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -O /tmp/erlang.deb',
      'sudo dpkg -i /tmp/erlang.deb && rm /tmp/erlang.deb',
      'sudo apt update && sudo apt install -y esl-erlang',
    ],
  },
  {
    value: 'Haskell', label: 'Haskell', tag: 'ghc+stack',
    lines: [
      'curl --proto "=https" --tlsv1.2 -sSf https://get-ghcup.haskell.org | BOOTSTRAP_HASKELL_NONINTERACTIVE=1 sh',
    ],
  },
  {
    value: 'OCaml', label: 'OCaml',
    lines: ['sudo apt install -y ocaml opam', 'opam init -y'],
  },
  {
    value: 'Zig', label: 'Zig',
    lines: [
      'sudo snap install zig --classic --beta || true',
    ],
  },
  {
    value: 'Nim', label: 'Nim',
    lines: [
      'curl https://nim-lang.org/choosenim/init.sh -sSf | sh -s -- -y',
    ],
  },
  {
    value: 'Crystal', label: 'Crystal',
    lines: [
      'curl -fsSL https://crystal-lang.org/install.sh | sudo bash',
    ],
  },
  {
    value: 'V Lang', label: 'V Lang', tag: 'vlang',
    lines: [
      'sudo apt install -y git build-essential',
      'git clone https://github.com/vlang/v /tmp/vlang',
      'cd /tmp/vlang && make && sudo ./v symlink',
    ],
  },
  {
    value: 'TypeScript', label: 'TypeScript', tag: 'npm global',
    lines: ['npm install -g typescript ts-node'],
  },
  {
    value: 'Tcl/Tk', label: 'Tcl/Tk',
    lines: ['sudo apt install -y tcl tk'],
  },
  {
    value: 'Fortran', label: 'Fortran', tag: 'gfortran',
    lines: ['sudo apt install -y gfortran'],
  },
  {
    value: 'COBOL', label: 'COBOL', tag: 'gnucobol',
    lines: ['sudo apt install -y gnucobol'],
  },
  {
    value: 'Assembly (NASM)', label: 'Assembly', tag: 'nasm',
    lines: ['sudo apt install -y nasm'],
  },
  {
    value: 'LLVM / Clang', label: 'LLVM / Clang',
    lines: ['sudo apt install -y clang llvm lld'],
  },
  {
    value: 'Prolog (SWI)', label: 'Prolog', tag: 'swi-prolog',
    lines: ['sudo apt install -y swi-prolog'],
  },
  {
    value: 'Racket', label: 'Racket', tag: 'lisp/scheme',
    lines: ['sudo apt install -y racket'],
  },
  {
    value: 'Apache Groovy (apt)', label: 'Groovy (apt)',
    lines: ['sudo apt install -y groovy'],
  },
];

// ── Web Servers ───────────────────────────────────────────────────────────────
const WEB_SERVERS = [
  {
    value: 'Apache2',
    lines: [
      'sudo apt install -y apache2',
      'sudo systemctl enable --now apache2',
    ],
  },
  {
    value: 'Nginx',
    lines: [
      'sudo apt install -y nginx',
      'sudo systemctl enable --now nginx',
    ],
  },
  {
    value: 'Caddy',
    lines: [
      'sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https',
      'curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/caddy-stable-archive-keyring.gpg] https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" | sudo tee /etc/apt/sources.list.d/caddy-stable.list',
      'sudo apt update && sudo apt install -y caddy',
    ],
  },
  {
    value: 'Traefik', tag: 'proxy',
    lines: [
      'wget -q https://github.com/traefik/traefik/releases/latest/download/traefik_linux_amd64.tar.gz -O /tmp/traefik.tar.gz',
      'tar -xzf /tmp/traefik.tar.gz -C /tmp && sudo install /tmp/traefik /usr/local/bin/',
      'rm /tmp/traefik.tar.gz',
    ],
  },
  { value: 'None', lines: [] },
];

// ── DB Tools ──────────────────────────────────────────────────────────────────
const DB_TOOLS = [
  {
    value: 'phpMyAdmin', label: 'phpMyAdmin',
    lines: ['export DEBIAN_FRONTEND=noninteractive', 'sudo apt install -y phpmyadmin'],
  },
  {
    value: 'Adminer', label: 'Adminer',
    lines: [
      'sudo mkdir -p /var/www/html/adminer',
      'sudo wget -q https://www.adminer.org/latest.php -O /var/www/html/adminer/index.php',
    ],
  },
  {
    value: 'DBeaver CE', label: 'DBeaver CE',
    lines: [
      'curl -fsSL https://dbeaver.io/debs/dbeaver.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/dbeaver.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/dbeaver.gpg] https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list',
      'sudo apt update && sudo apt install -y dbeaver-ce',
    ],
  },
  {
    value: 'TablePlus', label: 'TablePlus', tag: 'snap',
    lines: ['sudo snap install tableplus'],
  },
  {
    value: 'DataGrip', label: 'DataGrip', tag: 'JetBrains',
    lines: ['sudo snap install datagrip --classic'],
  },
  {
    value: 'pgAdmin 4', label: 'pgAdmin 4', tag: 'postgres',
    lines: [
      'curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg',
      'sudo sh -c \'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list\'',
      'sudo apt update && sudo apt install -y pgadmin4-desktop',
    ],
  },
  {
    value: 'MongoDB Compass', label: 'MongoDB Compass',
    lines: [
      'wget -q https://downloads.mongodb.com/compass/mongodb-compass_1.44.4_amd64.deb -O /tmp/compass.deb',
      'sudo apt install -y /tmp/compass.deb && rm /tmp/compass.deb',
    ],
  },
  {
    value: 'Redis Insight', label: 'Redis Insight',
    lines: ['sudo snap install redisinsight'],
  },
  {
    value: 'MySQL Workbench', label: 'MySQL Workbench',
    lines: ['sudo apt install -y mysql-workbench-community || sudo snap install mysql-workbench-community || true'],
  },
  {
    value: 'Beekeeper Studio', label: 'Beekeeper Studio', tag: 'snap',
    lines: ['sudo snap install beekeeper-studio'],
  },
];

// ── Editors ───────────────────────────────────────────────────────────────────
const EDITORS = [
  {
    value: 'VS Code', label: 'VS Code',
    lines: [
      'sudo snap install code',
    ],
  },
  {
    value: 'VS Codium', label: 'VS Codium', tag: 'FOSS',
    lines: [
      'wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/vscodium-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg] https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/debs vscodium main" | sudo tee /etc/apt/sources.list.d/vscodium.list',
      'sudo apt update && sudo apt install -y codium',
    ],
  },
  {
    value: 'Zed Editor', label: 'Zed Editor',
    lines: ['curl -fsSL https://zed.dev/install.sh | sh || true'],
  },
  {
    value: 'Vim', label: 'Vim',
    lines: ['sudo apt install -y vim vim-gtk3'],
  },
  {
    value: 'Neovim', label: 'Neovim',
    lines: [
      'sudo apt install -y neovim',
      'pip3 install --user neovim || true',
    ],
  },
  {
    value: 'Emacs', label: 'Emacs',
    lines: ['sudo apt install -y emacs'],
  },
  {
    value: 'Nano', label: 'Nano',
    lines: ['sudo apt install -y nano'],
  },
  {
    value: 'Sublime Text', label: 'Sublime Text',
    lines: [
      'curl -fsSL https://download.sublimetext.com/sublimehq-pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/sublimehq-archive.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/sublimehq-archive.gpg] https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list',
      'sudo apt update && sudo apt install -y sublime-text',
    ],
  },
  {
    value: 'Kate', label: 'Kate', tag: 'KDE',
    lines: ['sudo apt install -y kate'],
  },
  {
    value: 'Geany', label: 'Geany', tag: 'lightweight',
    lines: ['sudo apt install -y geany geany-plugins'],
  },
  {
    value: 'Lapce', label: 'Lapce', tag: 'rust-based',
    lines: ['sudo snap install lapce || true'],
  },
  {
    value: 'Helix', label: 'Helix', tag: 'modal',
    lines: [
      'sudo add-apt-repository ppa:maveonair/helix-editor -y',
      'sudo apt update && sudo apt install -y helix',
    ],
  },
  {
    value: 'Cursor', label: 'Cursor AI', tag: 'appimage',
    lines: [
      'wget -q "https://downloader.cursor.sh/linux/appImage/x64" -O ~/Cursor.AppImage',
      'chmod +x ~/Cursor.AppImage',
      'echo "Cursor downloaded to ~/Cursor.AppImage"',
    ],
  },
  {
    value: 'Windsurf', label: 'Windsurf', tag: 'AI editor',
    lines: [
      'curl -fsSL "https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg" | sudo gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/windsurf-stable-archive-keyring.gpg arch=amd64] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list',
      'sudo apt update && sudo apt install -y windsurf',
    ],
  },
];

// ── IDEs ──────────────────────────────────────────────────────────────────────
const IDES = [
  {
    value: 'IntelliJ IDEA CE', label: 'IntelliJ IDEA CE', tag: 'snap',
    lines: ['sudo snap install intellij-idea-community --classic'],
  },
  {
    value: 'IntelliJ IDEA Ultimate', label: 'IntelliJ Ultimate', tag: 'snap',
    lines: ['sudo snap install intellij-idea-ultimate --classic'],
  },
  {
    value: 'PhpStorm', label: 'PhpStorm', tag: 'snap',
    lines: ['sudo snap install phpstorm --classic'],
  },
  {
    value: 'PyCharm CE', label: 'PyCharm CE', tag: 'snap',
    lines: ['sudo snap install pycharm-community --classic'],
  },
  {
    value: 'PyCharm Pro', label: 'PyCharm Pro', tag: 'snap',
    lines: ['sudo snap install pycharm-professional --classic'],
  },
  {
    value: 'WebStorm', label: 'WebStorm', tag: 'snap',
    lines: ['sudo snap install webstorm --classic'],
  },
  {
    value: 'GoLand', label: 'GoLand', tag: 'snap',
    lines: ['sudo snap install goland --classic'],
  },
  {
    value: 'RubyMine', label: 'RubyMine', tag: 'snap',
    lines: ['sudo snap install rubymine --classic'],
  },
  {
    value: 'CLion', label: 'CLion', tag: 'snap',
    lines: ['sudo snap install clion --classic'],
  },
  {
    value: 'Rider', label: 'Rider (.NET)', tag: 'snap',
    lines: ['sudo snap install rider --classic'],
  },
  {
    value: 'DataSpell', label: 'DataSpell', tag: 'snap',
    lines: ['sudo snap install dataspell --classic'],
  },
  {
    value: 'Android Studio', label: 'Android Studio', tag: 'snap',
    lines: ['sudo snap install android-studio --classic'],
  },
  {
    value: 'Eclipse', label: 'Eclipse',
    lines: ['sudo snap install eclipse --classic'],
  },
  {
    value: 'NetBeans', label: 'NetBeans',
    lines: ['sudo snap install netbeans --classic'],
  },
  {
    value: 'Code::Blocks', label: 'Code::Blocks', tag: 'C/C++',
    lines: ['sudo apt install -y codeblocks'],
  },
  {
    value: 'Arduino IDE', label: 'Arduino IDE',
    lines: ['sudo snap install arduino'],
  },
  {
    value: 'Fleet', label: 'Fleet', tag: 'JetBrains',
    lines: ['sudo snap install fleet --classic || true'],
  },
];

// ── VCS ───────────────────────────────────────────────────────────────────────
const VCS_TOOLS = [
  {
    value: 'Sourcegit (GUI)', label: 'Sourcegit', tag: 'gui',
    lines: [
      'curl -fsSL https://codeberg.org/api/packages/yataro/debian/repository.key | sudo tee /etc/apt/keyrings/sourcegit.asc',
      'echo "deb [signed-by=/etc/apt/keyrings/sourcegit.asc, arch=amd64,arm64] https://codeberg.org/api/packages/yataro/debian generic main" | sudo tee /etc/apt/sources.list.d/sourcegit.list',
      'sudo apt update && sudo apt install -y sourcegit',
    ],
  },
  {
    value: 'GitKraken', label: 'GitKraken', tag: 'snap',
    lines: ['sudo snap install gitkraken --classic'],
  },
  {
    value: 'GitHub CLI', label: 'GitHub CLI',
    lines: ['sudo apt install -y gh'],
  },
  {
    value: 'GitLab CLI', label: 'GitLab CLI (glab)',
    lines: [
      'curl -s https://raw.githubusercontent.com/cli/go-gh/trunk/script/build.sh | bash || true',
      'sudo snap install glab || true',
    ],
  },
  {
    value: 'Git LFS', label: 'Git LFS',
    lines: ['sudo apt install -y git-lfs && git lfs install'],
  },
  {
    value: 'Meld', label: 'Meld', tag: 'diff tool',
    lines: ['sudo apt install -y meld'],
  },
  {
    value: 'lazygit', label: 'lazygit', tag: 'tui',
    lines: [
      'LAZYGIT_VER=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po \'"tag_name": "v\\K[^"]*\')',
      'curl -Lo /tmp/lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VER}_Linux_x86_64.tar.gz"',
      'tar xf /tmp/lazygit.tar.gz -C /tmp && sudo install /tmp/lazygit /usr/local/bin && rm /tmp/lazygit.tar.gz',
    ],
  },
  {
    value: 'delta', label: 'delta', tag: 'git diff',
    lines: [
      'wget -q https://github.com/dandavison/delta/releases/latest/download/git-delta_amd64.deb -O /tmp/delta.deb',
      'sudo apt install -y /tmp/delta.deb && rm /tmp/delta.deb',
    ],
  },
  {
    value: 'pre-commit', label: 'pre-commit',
    lines: ['pip3 install pre-commit || true'],
  },
  {
    value: 'SVN', label: 'SVN', tag: 'subversion',
    lines: ['sudo apt install -y subversion'],
  },
];

// ── Browsers ──────────────────────────────────────────────────────────────────
const BROWSERS = [
  {
    value: 'Google Chrome', label: 'Google Chrome',
    lines: [
      'wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/chrome.deb',
      'sudo apt install -y /tmp/chrome.deb && rm /tmp/chrome.deb',
    ],
  },
  {
    value: 'Firefox', label: 'Firefox',
    lines: ['sudo apt install -y firefox'],
  },
  {
    value: 'Brave', label: 'Brave',
    lines: [
      'sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list',
      'sudo apt update && sudo apt install -y brave-browser',
    ],
  },
  {
    value: 'Chromium', label: 'Chromium', tag: 'snap',
    lines: ['sudo snap install chromium'],
  },
  {
    value: 'Microsoft Edge', label: 'Microsoft Edge',
    lines: [
      'curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor > /usr/share/keyrings/microsoft-edge.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/microsoft-edge.gpg] https://packages.microsoft.com/repos/edge stable main" | sudo tee /etc/apt/sources.list.d/microsoft-edge.list',
      'sudo apt update && sudo apt install -y microsoft-edge-stable',
    ],
  },
  {
    value: 'Tor Browser', label: 'Tor Browser', tag: 'privacy',
    lines: ['sudo apt install -y torbrowser-launcher'],
  },
  {
    value: 'Vivaldi', label: 'Vivaldi',
    lines: [
      'wget -q https://downloads.vivaldi.com/stable/vivaldi-stable_amd64.deb -O /tmp/vivaldi.deb',
      'sudo apt install -y /tmp/vivaldi.deb && rm /tmp/vivaldi.deb',
    ],
  },
  {
    value: 'Opera', label: 'Opera', tag: 'snap',
    lines: ['sudo snap install opera'],
  },
  {
    value: 'Min Browser', label: 'Min', tag: 'minimal',
    lines: [
      'wget -q https://github.com/minbrowser/min/releases/latest/download/min_amd64.deb -O /tmp/min.deb',
      'sudo apt install -y /tmp/min.deb && rm /tmp/min.deb',
    ],
  },
  {
    value: 'Lynx', label: 'Lynx', tag: 'terminal',
    lines: ['sudo apt install -y lynx'],
  },
  {
    value: 'w3m', label: 'w3m', tag: 'terminal',
    lines: ['sudo apt install -y w3m'],
  },
];

// ── Containers & Kubernetes ───────────────────────────────────────────────────
const CONTAINERS = [
  {
    value: 'Docker Engine', label: 'Docker Engine',
    lines: [
      'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg',
      'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list',
      'sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin',
      'sudo usermod -aG docker "$USER"',
      'sudo systemctl enable --now docker',
    ],
  },
  {
    value: 'Docker Compose v2', label: 'Docker Compose v2',
    lines: ['sudo apt install -y docker-compose-plugin'],
  },
  {
    value: 'Portainer CE', label: 'Portainer CE', tag: 'ui',
    lines: [
      'sudo docker volume create portainer_data || true',
      'sudo docker run -d -p 9443:9443 --name portainer --restart=always \\',
      '  -v /var/run/docker.sock:/var/run/docker.sock \\',
      '  -v portainer_data:/data portainer/portainer-ce:latest || true',
    ],
  },
  {
    value: 'kubectl', label: 'kubectl',
    lines: [
      'curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg',
      'echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list',
      'sudo apt update && sudo apt install -y kubectl',
    ],
  },
  {
    value: 'k9s', label: 'k9s', tag: 'tui',
    lines: [
      'wget -q https://github.com/derailed/k9s/releases/latest/download/k9s_linux_amd64.deb -O /tmp/k9s.deb',
      'sudo dpkg -i /tmp/k9s.deb && rm /tmp/k9s.deb',
    ],
  },
  {
    value: 'Helm', label: 'Helm', tag: 'k8s package manager',
    lines: [
      'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash',
    ],
  },
  {
    value: 'Minikube', label: 'Minikube', tag: 'local k8s',
    lines: [
      'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64',
      'sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64',
    ],
  },
  {
    value: 'Kind', label: 'Kind', tag: 'k8s in docker',
    lines: [
      '[ $(uname -m) = x86_64 ] && curl -Lo /tmp/kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64',
      'sudo install /tmp/kind /usr/local/bin/kind && rm /tmp/kind',
    ],
  },
  {
    value: 'Podman', label: 'Podman', tag: 'daemonless',
    lines: [
      'sudo apt install -y podman',
    ],
  },
  {
    value: 'Buildah', label: 'Buildah',
    lines: ['sudo apt install -y buildah'],
  },
  {
    value: 'Skopeo', label: 'Skopeo',
    lines: ['sudo apt install -y skopeo'],
  },
  {
    value: 'Hadolint', label: 'Hadolint', tag: 'dockerfile linter',
    lines: [
      'wget -q https://github.com/hadolint/hadolint/releases/latest/download/hadolint-Linux-x86_64 -O /tmp/hadolint',
      'sudo install /tmp/hadolint /usr/local/bin/hadolint && rm /tmp/hadolint',
    ],
  },
  {
    value: 'ctop', label: 'ctop', tag: 'container top',
    lines: [
      'wget -q https://github.com/bcicen/ctop/releases/latest/download/ctop-linux-amd64 -O /tmp/ctop',
      'sudo install /tmp/ctop /usr/local/bin/ctop && rm /tmp/ctop',
    ],
  },
  {
    value: 'Dive', label: 'Dive', tag: 'image explorer',
    lines: [
      'wget -q https://github.com/wagoodman/dive/releases/latest/download/dive_amd64.deb -O /tmp/dive.deb',
      'sudo apt install -y /tmp/dive.deb && rm /tmp/dive.deb',
    ],
  },
];

// ── Cloud & IaC ───────────────────────────────────────────────────────────────
const CLOUD = [
  {
    value: 'AWS CLI v2', label: 'AWS CLI', tag: 'amazon',
    lines: [
      'curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip',
      'unzip -q /tmp/awscliv2.zip -d /tmp && sudo /tmp/aws/install && rm -rf /tmp/aws /tmp/awscliv2.zip',
    ],
  },
  {
    value: 'Azure CLI', label: 'Azure CLI', tag: 'microsoft',
    lines: [
      'curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash',
    ],
  },
  {
    value: 'Google Cloud CLI', label: 'GCloud CLI', tag: 'google',
    lines: [
      'curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list',
      'sudo apt update && sudo apt install -y google-cloud-cli',
    ],
  },
  {
    value: 'Terraform', label: 'Terraform', tag: 'HashiCorp',
    lines: [
      'wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list',
      'sudo apt update && sudo apt install -y terraform',
    ],
  },
  {
    value: 'Packer', label: 'Packer', tag: 'HashiCorp',
    lines: [
      'wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg 2>/dev/null || true',
      'sudo apt update && sudo apt install -y packer',
    ],
  },
  {
    value: 'Vault', label: 'Vault', tag: 'HashiCorp',
    lines: ['sudo apt install -y vault'],
  },
  {
    value: 'Consul', label: 'Consul', tag: 'HashiCorp',
    lines: ['sudo apt install -y consul'],
  },
  {
    value: 'Nomad', label: 'Nomad', tag: 'HashiCorp',
    lines: ['sudo apt install -y nomad'],
  },
  {
    value: 'Pulumi', label: 'Pulumi',
    lines: [
      'curl -fsSL https://get.pulumi.com | sh',
    ],
  },
  {
    value: 'Ansible', label: 'Ansible',
    lines: [
      'sudo add-apt-repository ppa:ansible/ansible -y',
      'sudo apt update && sudo apt install -y ansible',
    ],
  },
  {
    value: 'Vagrant', label: 'Vagrant', tag: 'HashiCorp',
    lines: ['sudo apt install -y vagrant'],
  },
  {
    value: 'Serverless Framework', label: 'Serverless', tag: 'npm',
    lines: ['npm install -g serverless || true'],
  },
  {
    value: 'OpenTofu', label: 'OpenTofu', tag: 'TF fork',
    lines: [
      'curl --proto "=https" --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o /tmp/install-opentofu.sh',
      'chmod +x /tmp/install-opentofu.sh && sudo /tmp/install-opentofu.sh --install-method deb && rm /tmp/install-opentofu.sh',
    ],
  },
  {
    value: 'Flux CD', label: 'Flux CD', tag: 'GitOps',
    lines: [
      'curl -s https://fluxcd.io/install.sh | sudo bash',
    ],
  },
  {
    value: 'ArgoCD CLI', label: 'ArgoCD CLI',
    lines: [
      'curl -sSL -o /tmp/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64',
      'sudo install /tmp/argocd /usr/local/bin/argocd && rm /tmp/argocd',
    ],
  },
];

// ── CLI Tools ─────────────────────────────────────────────────────────────────
const CLI_TOOLS = [
  {
    value: 'Composer (PHP)', label: 'Composer', tag: 'php',
    lines: [
      'curl -sS https://getcomposer.org/installer | php -- --install-dir=/tmp',
      'sudo mv /tmp/composer.phar /usr/local/bin/composer',
    ],
  },
  {
    value: 'pnpm + yarn', label: 'pnpm + yarn',
    lines: ['npm install -g pnpm yarn || true'],
  },
  {
    value: 'httpie', label: 'HTTPie',
    lines: ['sudo apt install -y httpie'],
  },
  {
    value: 'curlie', label: 'curlie', tag: 'curl+httpie',
    lines: [
      'wget -q https://github.com/rs/curlie/releases/latest/download/curlie_linux_amd64.deb -O /tmp/curlie.deb',
      'sudo apt install -y /tmp/curlie.deb && rm /tmp/curlie.deb',
    ],
  },
  {
    value: 'jq', label: 'jq',
    lines: ['sudo apt install -y jq'],
  },
  {
    value: 'yq', label: 'yq', tag: 'yaml processor',
    lines: [
      'sudo snap install yq',
    ],
  },
  {
    value: 'fzf', label: 'fzf',
    lines: ['sudo apt install -y fzf'],
  },
  {
    value: 'bat', label: 'bat', tag: 'better cat',
    lines: [
      'sudo apt install -y bat',
      'mkdir -p ~/.local/bin && ln -sf /usr/bin/batcat ~/.local/bin/bat 2>/dev/null || true',
    ],
  },
  {
    value: 'eza', label: 'eza', tag: 'better ls',
    lines: ['sudo apt install -y eza'],
  },
  {
    value: 'lsd', label: 'lsd', tag: 'better ls',
    lines: [
      'wget -q https://github.com/lsd-rs/lsd/releases/latest/download/lsd_amd64.deb -O /tmp/lsd.deb',
      'sudo apt install -y /tmp/lsd.deb && rm /tmp/lsd.deb',
    ],
  },
  {
    value: 'htop / btop', label: 'htop / btop',
    lines: ['sudo apt install -y htop btop'],
  },
  {
    value: 'glances', label: 'Glances', tag: 'system monitor',
    lines: ['sudo apt install -y glances'],
  },
  {
    value: 'neofetch', label: 'Neofetch',
    lines: ['sudo apt install -y neofetch'],
  },
  {
    value: 'fastfetch', label: 'Fastfetch', tag: 'system info',
    lines: ['sudo snap install fastfetch || sudo apt install -y fastfetch || true'],
  },
  {
    value: 'tmux', label: 'tmux',
    lines: ['sudo apt install -y tmux'],
  },
  {
    value: 'screen', label: 'screen',
    lines: ['sudo apt install -y screen'],
  },
  {
    value: 'zsh + Oh My Zsh', label: 'zsh + Oh My Zsh',
    lines: [
      'sudo apt install -y zsh',
      'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended',
    ],
  },
  {
    value: 'fish shell', label: 'Fish Shell',
    lines: [
      'sudo apt install -y fish',
      'chsh -s $(which fish) || true',
    ],
  },
  {
    value: 'Starship prompt', label: 'Starship', tag: 'prompt',
    lines: ['curl -sS https://starship.rs/install.sh | sh -s -- -y'],
  },
  {
    value: 'zoxide', label: 'zoxide', tag: 'smart cd',
    lines: ['sudo apt install -y zoxide || curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh || true'],
  },
  {
    value: 'thefuck', label: 'thefuck', tag: 'autocorrect',
    lines: ['pip3 install thefuck --user || true'],
  },
  {
    value: 'tldr', label: 'tldr', tag: 'simplified man',
    lines: ['sudo npm install -g tldr || sudo apt install -y tldr || true'],
  },
  {
    value: 'ripgrep', label: 'ripgrep', tag: 'fast grep',
    lines: ['sudo apt install -y ripgrep'],
  },
  {
    value: 'fd', label: 'fd', tag: 'fast find',
    lines: ['sudo apt install -y fd-find && ln -sf $(which fdfind) ~/.local/bin/fd 2>/dev/null || true'],
  },
  {
    value: 'sd', label: 'sd', tag: 'sed replacement',
    lines: ['cargo install sd || sudo snap install sd || true'],
  },
  {
    value: 'hyperfine', label: 'hyperfine', tag: 'benchmarking',
    lines: [
      'wget -q https://github.com/sharkdp/hyperfine/releases/latest/download/hyperfine_amd64.deb -O /tmp/hyperfine.deb',
      'sudo apt install -y /tmp/hyperfine.deb && rm /tmp/hyperfine.deb',
    ],
  },
  {
    value: 'dust', label: 'dust', tag: 'better du',
    lines: [
      'wget -q https://github.com/bootandy/dust/releases/latest/download/du-dust_amd64.deb -O /tmp/dust.deb',
      'sudo apt install -y /tmp/dust.deb && rm /tmp/dust.deb',
    ],
  },
  {
    value: 'duf', label: 'duf', tag: 'better df',
    lines: ['sudo apt install -y duf || sudo snap install duf-utility || true'],
  },
  {
    value: 'ncdu', label: 'ncdu', tag: 'disk usage',
    lines: ['sudo apt install -y ncdu'],
  },
  {
    value: 'ranger', label: 'ranger', tag: 'file manager',
    lines: ['sudo apt install -y ranger'],
  },
  {
    value: 'nnn', label: 'nnn', tag: 'file manager',
    lines: ['sudo apt install -y nnn'],
  },
  {
    value: 'mc', label: 'Midnight Commander', tag: 'file manager',
    lines: ['sudo apt install -y mc'],
  },
  {
    value: 'Terminator', label: 'Terminator', tag: 'terminal',
    lines: ['sudo apt install -y terminator'],
  },
  {
    value: 'Alacritty', label: 'Alacritty', tag: 'terminal',
    lines: ['sudo snap install alacritty --classic'],
  },
  {
    value: 'Kitty', label: 'Kitty', tag: 'terminal',
    lines: ['sudo apt install -y kitty'],
  },
  {
    value: 'WezTerm', label: 'WezTerm', tag: 'terminal',
    lines: [
      'curl -fsSL https://apt.fury.io/wez/gpg.key | sudo gpg --yes --dearmor -o /usr/share/keyrings/wezterm-fury.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/wezterm-fury.gpg] https://apt.fury.io/wez/ * *" | sudo tee /etc/apt/sources.list.d/wezterm.list',
      'sudo apt update && sudo apt install -y wezterm',
    ],
  },
  {
    value: 'Zellij', label: 'Zellij', tag: 'multiplexer',
    lines: [
      'cargo install zellij || sudo snap install zellij || true',
    ],
  },
  {
    value: 'pv', label: 'pv', tag: 'pipe viewer',
    lines: ['sudo apt install -y pv'],
  },
  {
    value: 'rsync', label: 'rsync',
    lines: ['sudo apt install -y rsync'],
  },
  {
    value: 'rclone', label: 'rclone', tag: 'cloud sync',
    lines: ['sudo apt install -y rclone'],
  },
  {
    value: 'tree', label: 'tree',
    lines: ['sudo apt install -y tree'],
  },
  {
    value: 'watch', label: 'watch',
    lines: ['sudo apt install -y procps'],
  },
  {
    value: 'parallel', label: 'GNU Parallel',
    lines: ['sudo apt install -y parallel'],
  },
  {
    value: 'xargs extras', label: 'moreutils',
    lines: ['sudo apt install -y moreutils'],
  },
];

// ── Dev Tools ─────────────────────────────────────────────────────────────────
const DEV_TOOLS = [
  {
    value: 'make', label: 'make / cmake',
    lines: ['sudo apt install -y make cmake'],
  },
  {
    value: 'gcc extras', label: 'GCC Extras', tag: 'build-essential',
    lines: ['sudo apt install -y build-essential binutils autoconf automake libtool'],
  },
  {
    value: 'pkg-config', label: 'pkg-config',
    lines: ['sudo apt install -y pkg-config'],
  },
  {
    value: 'Meson + Ninja', label: 'Meson + Ninja', tag: 'build system',
    lines: ['sudo apt install -y meson ninja-build'],
  },
  {
    value: 'Bazel', label: 'Bazel', tag: 'build system',
    lines: [
      'sudo apt install -y apt-transport-https curl gnupg',
      'curl -fsSL https://bazel.build/bazel-release.pub.gpg | sudo gpg --dearmor > /usr/share/keyrings/bazel-archive-keyring.gpg',
      'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/bazel-archive-keyring.gpg] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list',
      'sudo apt update && sudo apt install -y bazel',
    ],
  },
  {
    value: 'Gradle', label: 'Gradle',
    lines: ['sudo apt install -y gradle || sudo snap install gradle --classic || true'],
  },
  {
    value: 'Maven', label: 'Maven', tag: 'Java',
    lines: ['sudo apt install -y maven'],
  },
  {
    value: 'Watchman', label: 'Watchman', tag: 'file watcher',
    lines: ['sudo apt install -y watchman || true'],
  },
  {
    value: 'strace', label: 'strace', tag: 'syscall tracer',
    lines: ['sudo apt install -y strace'],
  },
  {
    value: 'ltrace', label: 'ltrace', tag: 'lib call tracer',
    lines: ['sudo apt install -y ltrace'],
  },
  {
    value: 'valgrind', label: 'Valgrind', tag: 'memory analysis',
    lines: ['sudo apt install -y valgrind'],
  },
  {
    value: 'gdb', label: 'GDB', tag: 'debugger',
    lines: ['sudo apt install -y gdb gdb-multiarch'],
  },
  {
    value: 'perf', label: 'perf', tag: 'profiling',
    lines: ['sudo apt install -y linux-tools-generic linux-tools-common'],
  },
  {
    value: 'Postman', label: 'Postman', tag: 'snap',
    lines: ['sudo snap install postman'],
  },
  {
    value: 'Insomnia', label: 'Insomnia', tag: 'API client',
    lines: [
      'curl -1sLf "https://packages.konghq.com/public/insomnia/gpg.3F3841089AE67FBE.key" | sudo gpg --dearmor -o /usr/share/keyrings/insomnia.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/insomnia.gpg] https://packages.konghq.com/public/insomnia/deb/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/insomnia.list',
      'sudo apt update && sudo apt install -y insomnia',
    ],
  },
  {
    value: 'Bruno', label: 'Bruno', tag: 'API client',
    lines: ['sudo snap install bruno || true'],
  },
  {
    value: 'ngrok', label: 'ngrok', tag: 'tunnel',
    lines: [
      'curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null',
      'echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list',
      'sudo apt update && sudo apt install -y ngrok',
    ],
  },
  {
    value: 'localtunnel', label: 'localtunnel', tag: 'tunnel',
    lines: ['npm install -g localtunnel || true'],
  },
  {
    value: 'act', label: 'act', tag: 'local GitHub Actions',
    lines: [
      'curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash',
    ],
  },
  {
    value: 'Mermaid CLI', label: 'Mermaid CLI', tag: 'diagrams',
    lines: ['npm install -g @mermaid-js/mermaid-cli || true'],
  },
  {
    value: 'Pandoc', label: 'Pandoc', tag: 'document converter',
    lines: ['sudo apt install -y pandoc'],
  },
  {
    value: 'LaTeX (texlive)', label: 'LaTeX', tag: 'typesetting',
    lines: ['sudo apt install -y texlive-full'],
  },
  {
    value: 'Doxygen', label: 'Doxygen', tag: 'docs generator',
    lines: ['sudo apt install -y doxygen graphviz'],
  },
  {
    value: 'wkhtmltopdf', label: 'wkhtmltopdf', tag: 'html→pdf',
    lines: ['sudo apt install -y wkhtmltopdf'],
  },
  {
    value: 'ImageMagick', label: 'ImageMagick', tag: 'image processing',
    lines: ['sudo apt install -y imagemagick'],
  },
  {
    value: 'ffmpeg', label: 'FFmpeg', tag: 'media processing',
    lines: ['sudo apt install -y ffmpeg'],
  },
  {
    value: 'SQLFluff', label: 'SQLFluff', tag: 'SQL linter',
    lines: ['pip3 install sqlfluff || true'],
  },
  {
    value: 'Prettier', label: 'Prettier', tag: 'code formatter',
    lines: ['npm install -g prettier || true'],
  },
  {
    value: 'ESLint', label: 'ESLint', tag: 'JS linter',
    lines: ['npm install -g eslint || true'],
  },
  {
    value: 'SonarQube Scanner', label: 'SonarQube Scanner',
    lines: ['sudo snap install sonar-scanner || true'],
  },
  {
    value: 'Trivy', label: 'Trivy', tag: 'vulnerability scanner',
    lines: [
      'sudo apt install -y wget apt-transport-https gnupg',
      'wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo gpg --dearmor -o /usr/share/keyrings/trivy.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list',
      'sudo apt update && sudo apt install -y trivy',
    ],
  },
];

// ── Networking Tools ──────────────────────────────────────────────────────────
const NETWORKING = [
  {
    value: 'curl', label: 'curl',
    lines: ['sudo apt install -y curl'],
  },
  {
    value: 'wget', label: 'wget',
    lines: ['sudo apt install -y wget'],
  },
  {
    value: 'nmap', label: 'nmap', tag: 'port scanner',
    lines: ['sudo apt install -y nmap'],
  },
  {
    value: 'netcat', label: 'netcat',
    lines: ['sudo apt install -y netcat-traditional'],
  },
  {
    value: 'traceroute', label: 'traceroute',
    lines: ['sudo apt install -y traceroute'],
  },
  {
    value: 'mtr', label: 'mtr', tag: 'network diagnostic',
    lines: ['sudo apt install -y mtr-tiny'],
  },
  {
    value: 'tcpdump', label: 'tcpdump', tag: 'packet capture',
    lines: ['sudo apt install -y tcpdump'],
  },
  {
    value: 'Wireshark', label: 'Wireshark', tag: 'GUI packet analyzer',
    lines: [
      'sudo apt install -y wireshark',
      'sudo usermod -aG wireshark "$USER"',
    ],
  },
  {
    value: 'iperf3', label: 'iperf3', tag: 'bandwidth test',
    lines: ['sudo apt install -y iperf3'],
  },
  {
    value: 'dnsutils', label: 'dig / nslookup',
    lines: ['sudo apt install -y dnsutils'],
  },
  {
    value: 'whois', label: 'whois',
    lines: ['sudo apt install -y whois'],
  },
  {
    value: 'net-tools', label: 'net-tools', tag: 'ifconfig, route',
    lines: ['sudo apt install -y net-tools'],
  },
  {
    value: 'ss', label: 'ss / iproute2',
    lines: ['sudo apt install -y iproute2'],
  },
  {
    value: 'OpenVPN', label: 'OpenVPN',
    lines: ['sudo apt install -y openvpn'],
  },
  {
    value: 'WireGuard', label: 'WireGuard',
    lines: ['sudo apt install -y wireguard'],
  },
  {
    value: 'Tailscale', label: 'Tailscale', tag: 'mesh VPN',
    lines: [
      'curl -fsSL https://tailscale.com/install.sh | sh',
    ],
  },
  {
    value: 'nginx proxy manager', label: 'NGINX Proxy Manager', tag: 'docker',
    lines: [
      'echo "Use Docker: docker run -d -p 80:80 -p 81:81 -p 443:443 --name npm jc21/nginx-proxy-manager:latest"',
    ],
  },
  {
    value: 'Caddy as proxy', label: 'Caddy (proxy)',
    lines: [
      'echo "Caddy also selected under Web Servers if applicable"',
    ],
  },
  {
    value: 'HTTPie Desktop', label: 'HTTPie Desktop', tag: 'snap',
    lines: ['sudo snap install httpie-desktop || true'],
  },
  {
    value: 'speedtest-cli', label: 'speedtest-cli',
    lines: ['sudo apt install -y speedtest-cli'],
  },
  {
    value: 'bandwhich', label: 'bandwhich', tag: 'bandwidth monitor',
    lines: ['cargo install bandwhich || sudo snap install bandwhich || true'],
  },
  {
    value: 'sshuttle', label: 'sshuttle', tag: 'VPN over SSH',
    lines: ['sudo apt install -y sshuttle'],
  },
];

// ── Security Tools ────────────────────────────────────────────────────────────
const SECURITY = [
  {
    value: 'ufw', label: 'UFW', tag: 'firewall',
    lines: ['sudo apt install -y ufw', 'sudo ufw enable || true'],
  },
  {
    value: 'fail2ban', label: 'fail2ban',
    lines: ['sudo apt install -y fail2ban', 'sudo systemctl enable --now fail2ban'],
  },
  {
    value: 'ClamAV', label: 'ClamAV', tag: 'antivirus',
    lines: ['sudo apt install -y clamav clamav-daemon', 'sudo freshclam || true'],
  },
  {
    value: 'gnupg', label: 'GnuPG',
    lines: ['sudo apt install -y gnupg'],
  },
  {
    value: 'pass', label: 'pass', tag: 'password manager',
    lines: ['sudo apt install -y pass'],
  },
  {
    value: 'KeePassXC', label: 'KeePassXC', tag: 'password manager',
    lines: ['sudo snap install keepassxc'],
  },
  {
    value: 'Bitwarden', label: 'Bitwarden', tag: 'password manager',
    lines: ['sudo snap install bitwarden'],
  },
  {
    value: 'openssl', label: 'OpenSSL',
    lines: ['sudo apt install -y openssl'],
  },
  {
    value: 'openssh-server', label: 'OpenSSH Server',
    lines: ['sudo apt install -y openssh-server', 'sudo systemctl enable --now ssh'],
  },
  {
    value: 'mkcert', label: 'mkcert', tag: 'local TLS',
    lines: [
      'sudo apt install -y libnss3-tools',
      'wget -q https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-v1.4.4-linux-amd64 -O /tmp/mkcert',
      'sudo install /tmp/mkcert /usr/local/bin/mkcert && rm /tmp/mkcert',
      'mkcert -install',
    ],
  },
  {
    value: 'certbot', label: 'Certbot', tag: "Let's Encrypt",
    lines: ['sudo snap install certbot --classic'],
  },
  {
    value: 'age', label: 'age', tag: 'file encryption',
    lines: [
      'sudo apt install -y age || true',
    ],
  },
  {
    value: 'sops', label: 'sops', tag: 'secret management',
    lines: [
      'wget -q https://github.com/getsops/sops/releases/latest/download/sops_linux_amd64.deb -O /tmp/sops.deb',
      'sudo apt install -y /tmp/sops.deb && rm /tmp/sops.deb',
    ],
  },
  {
    value: 'lynis', label: 'Lynis', tag: 'security audit',
    lines: ['sudo apt install -y lynis'],
  },
  {
    value: 'rkhunter', label: 'rkhunter', tag: 'rootkit detection',
    lines: ['sudo apt install -y rkhunter'],
  },
  {
    value: 'chkrootkit', label: 'chkrootkit',
    lines: ['sudo apt install -y chkrootkit'],
  },
  {
    value: 'Metasploit', label: 'Metasploit', tag: 'pentesting',
    lines: [
      'curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > /tmp/msfinstall',
      'chmod 755 /tmp/msfinstall && sudo /tmp/msfinstall && rm /tmp/msfinstall || true',
    ],
  },
  {
    value: 'John the Ripper', label: 'John the Ripper', tag: 'pentesting',
    lines: ['sudo apt install -y john'],
  },
  {
    value: 'Hashcat', label: 'Hashcat', tag: 'pentesting',
    lines: ['sudo apt install -y hashcat'],
  },
];

// ── AI / ML ───────────────────────────────────────────────────────────────────
const AI_ML = [
  {
    value: 'Ollama', label: 'Ollama', tag: 'local LLMs',
    lines: [
      'curl -fsSL https://ollama.com/install.sh | sh',
    ],
  },
  {
    value: 'PyTorch', label: 'PyTorch', tag: 'pip',
    lines: [
      'pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu || true',
    ],
  },
  {
    value: 'TensorFlow', label: 'TensorFlow', tag: 'pip',
    lines: ['pip3 install tensorflow || true'],
  },
  {
    value: 'Keras', label: 'Keras', tag: 'pip',
    lines: ['pip3 install keras || true'],
  },
  {
    value: 'scikit-learn', label: 'scikit-learn', tag: 'pip',
    lines: ['pip3 install scikit-learn || true'],
  },
  {
    value: 'Pandas', label: 'Pandas', tag: 'pip',
    lines: ['pip3 install pandas || true'],
  },
  {
    value: 'NumPy', label: 'NumPy', tag: 'pip',
    lines: ['pip3 install numpy || true'],
  },
  {
    value: 'Matplotlib', label: 'Matplotlib', tag: 'pip',
    lines: ['pip3 install matplotlib || true'],
  },
  {
    value: 'Jupyter', label: 'JupyterLab', tag: 'pip',
    lines: [
      'pip3 install jupyterlab notebook || true',
    ],
  },
  {
    value: 'Hugging Face', label: 'HuggingFace Hub', tag: 'pip',
    lines: ['pip3 install transformers datasets huggingface_hub || true'],
  },
  {
    value: 'LangChain', label: 'LangChain', tag: 'pip',
    lines: ['pip3 install langchain langchain-community || true'],
  },
  {
    value: 'LlamaIndex', label: 'LlamaIndex', tag: 'pip',
    lines: ['pip3 install llama-index || true'],
  },
  {
    value: 'OpenAI SDK', label: 'OpenAI SDK', tag: 'pip',
    lines: ['pip3 install openai || true'],
  },
  {
    value: 'Anthropic SDK', label: 'Anthropic SDK', tag: 'pip',
    lines: ['pip3 install anthropic || true'],
  },
  {
    value: 'MLflow', label: 'MLflow', tag: 'pip',
    lines: ['pip3 install mlflow || true'],
  },
  {
    value: 'DVC', label: 'DVC', tag: 'data versioning',
    lines: ['pip3 install dvc || true'],
  },
  {
    value: 'CUDA Toolkit', label: 'CUDA Toolkit', tag: 'nvidia',
    lines: [
      'sudo apt install -y nvidia-cuda-toolkit',
    ],
  },
  {
    value: 'Open WebUI', label: 'Open WebUI', tag: 'docker',
    lines: [
      'sudo docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway \\',
      '  -v open-webui:/app/backend/data --name open-webui --restart always \\',
      '  ghcr.io/open-webui/open-webui:main || true',
      'echo "Open WebUI running at http://localhost:3000"',
    ],
  },
  {
    value: 'Stable Diffusion WebUI', label: 'SD WebUI', tag: 'auto1111',
    lines: [
      'sudo apt install -y wget git python3 python3-venv libgl1 libglib2.0-0',
      'git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui ~/stable-diffusion-webui || true',
      'echo "Run ~/stable-diffusion-webui/webui.sh to start"',
    ],
  },
  {
    value: 'ComfyUI', label: 'ComfyUI', tag: 'stable diffusion',
    lines: [
      'sudo apt install -y git python3 python3-venv',
      'git clone https://github.com/comfyanonymous/ComfyUI ~/ComfyUI || true',
      'echo "Run: cd ~/ComfyUI && pip install -r requirements.txt && python main.py"',
    ],
  },
];

// ── Communication & Productivity ──────────────────────────────────────────────
const APPS = [
  {
    value: 'Slack', label: 'Slack', tag: 'snap',
    lines: ['sudo snap install slack --classic'],
  },
  {
    value: 'Discord', label: 'Discord', tag: 'deb',
    lines: [
      'wget -q "https://discord.com/api/download?platform=linux&format=deb" -O /tmp/discord.deb',
      'sudo apt install -y /tmp/discord.deb && rm /tmp/discord.deb',
    ],
  },
  {
    value: 'Zoom', label: 'Zoom', tag: 'deb',
    lines: [
      'wget -q https://zoom.us/client/latest/zoom_amd64.deb -O /tmp/zoom.deb',
      'sudo apt install -y /tmp/zoom.deb && rm /tmp/zoom.deb',
    ],
  },
  {
    value: 'Telegram', label: 'Telegram', tag: 'snap',
    lines: ['sudo snap install telegram-desktop'],
  },
  {
    value: 'Signal', label: 'Signal',
    lines: [
      'wget -O- https://updates.signal.org/desktop/apt/keys.asc | sudo gpg --dearmor -o /usr/share/keyrings/signal-desktop-keyring.gpg',
      'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/signal-desktop-keyring.gpg] https://updates.signal.org/desktop/apt xenial main" | sudo tee /etc/apt/sources.list.d/signal-xenial.list',
      'sudo apt update && sudo apt install -y signal-desktop',
    ],
  },
  {
    value: 'Microsoft Teams', label: 'MS Teams', tag: 'deb',
    lines: [
      'wget -q https://go.microsoft.com/fwlink/p/?linkid=2187327 -O /tmp/teams.deb',
      'sudo apt install -y /tmp/teams.deb && rm /tmp/teams.deb || sudo snap install teams-for-linux || true',
    ],
  },
  {
    value: 'Element (Matrix)', label: 'Element', tag: 'matrix',
    lines: [
      'sudo apt install -y wget apt-transport-https',
      'wget -O /usr/share/keyrings/element-io-archive-keyring.gpg https://packages.element.io/archive-keyring.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/element-io-archive-keyring.gpg] https://packages.element.io/debian/ default main" | sudo tee /etc/apt/sources.list.d/element-io.list',
      'sudo apt update && sudo apt install -y element-desktop',
    ],
  },
  {
    value: 'Mattermost', label: 'Mattermost', tag: 'snap',
    lines: ['sudo snap install mattermost-desktop'],
  },
  {
    value: 'Thunderbird', label: 'Thunderbird', tag: 'email',
    lines: ['sudo apt install -y thunderbird'],
  },
  {
    value: 'Evolution', label: 'Evolution', tag: 'email',
    lines: ['sudo apt install -y evolution'],
  },
  {
    value: 'Spotify', label: 'Spotify', tag: 'snap',
    lines: ['sudo snap install spotify'],
  },
  {
    value: 'LibreOffice', label: 'LibreOffice', tag: 'snap',
    lines: ['sudo snap install libreoffice'],
  },
  {
    value: 'OnlyOffice', label: 'OnlyOffice', tag: 'snap',
    lines: ['sudo snap install onlyoffice-desktopeditors'],
  },
  {
    value: 'WPS Office', label: 'WPS Office', tag: 'deb',
    lines: [
      'wget -q https://wps-community.org/downloads/wps-office_11.1.0.11720_amd64.deb -O /tmp/wps.deb',
      'sudo apt install -y /tmp/wps.deb && rm /tmp/wps.deb || true',
    ],
  },
  {
    value: 'Obsidian', label: 'Obsidian', tag: 'appimage',
    lines: [
      "OBSIDIAN_URL=$(curl -s https://api.github.com/repos/obsidianmd/obsidian-releases/releases/latest | grep browser_download_url | grep AppImage | cut -d '\"' -f 4 | head -1)",
      '[[ -n "$OBSIDIAN_URL" ]] && wget -q "$OBSIDIAN_URL" -O ~/Obsidian.AppImage && chmod +x ~/Obsidian.AppImage',
    ],
  },
  {
    value: 'Logseq', label: 'Logseq', tag: 'snap',
    lines: ['sudo snap install logseq || true'],
  },
  {
    value: 'Notion', label: 'Notion', tag: 'snap',
    lines: ['sudo snap install notion-snap-reborn || sudo snap install notion-app-enhanced || true'],
  },
  {
    value: 'Anytype', label: 'Anytype',
    lines: ['sudo snap install anytype || true'],
  },
  {
    value: 'Dropbox', label: 'Dropbox',
    lines: [
      'wget -q https://www.dropbox.com/download?plat=lnx.x86_64 -O ~/dropbox-install.py',
      'python3 ~/dropbox-install.py start -i || true',
    ],
  },
  {
    value: 'Nextcloud Desktop', label: 'Nextcloud', tag: 'snap',
    lines: ['sudo snap install nextcloud-client'],
  },
  {
    value: 'VLC', label: 'VLC', tag: 'media player',
    lines: ['sudo snap install vlc'],
  },
  {
    value: 'Remmina', label: 'Remmina', tag: 'remote desktop',
    lines: ['sudo snap install remmina'],
  },
  {
    value: 'AnyDesk', label: 'AnyDesk', tag: 'remote desktop',
    lines: [
      'wget -qO - https://keys.anydesk.com/repos/DEB-GPG-KEY | sudo gpg --dearmor -o /usr/share/keyrings/anydesk.gpg',
      'echo "deb [signed-by=/usr/share/keyrings/anydesk.gpg] http://deb.anydesk.com/ all main" | sudo tee /etc/apt/sources.list.d/anydesk-stable.list',
      'sudo apt update && sudo apt install -y anydesk',
    ],
  },
  {
    value: 'TeamViewer', label: 'TeamViewer', tag: 'remote desktop',
    lines: [
      'wget -q https://download.teamviewer.com/download/linux/teamviewer_amd64.deb -O /tmp/teamviewer.deb',
      'sudo apt install -y /tmp/teamviewer.deb && rm /tmp/teamviewer.deb',
    ],
  },
  {
    value: 'Flameshot', label: 'Flameshot', tag: 'screenshots',
    lines: ['sudo apt install -y flameshot'],
  },
  {
    value: 'peek', label: 'Peek', tag: 'gif recorder',
    lines: ['sudo apt install -y peek || sudo snap install peek || true'],
  },
  {
    value: 'OBS Studio', label: 'OBS Studio', tag: 'streaming/recording',
    lines: [
      'sudo add-apt-repository ppa:obsproject/obs-studio -y',
      'sudo apt update && sudo apt install -y obs-studio',
    ],
  },
  {
    value: 'Kdenlive', label: 'Kdenlive', tag: 'video editor',
    lines: ['sudo snap install kdenlive'],
  },
  {
    value: 'Shotcut', label: 'Shotcut', tag: 'video editor',
    lines: ['sudo snap install shotcut --classic'],
  },
  {
    value: 'DaVinci Resolve', label: 'DaVinci Resolve', tag: 'manual install',
    lines: ['echo "Download DaVinci Resolve manually from: https://www.blackmagicdesign.com/products/davinciresolve"'],
  },
  {
    value: 'Calibre', label: 'Calibre', tag: 'ebook manager',
    lines: ['sudo apt install -y calibre'],
  },
  {
    value: 'Master PDF Editor', label: 'Master PDF', tag: 'PDF editor',
    lines: ['sudo snap install master-pdf-editor-5 || true'],
  },
  {
    value: 'qBittorrent', label: 'qBittorrent',
    lines: ['sudo apt install -y qbittorrent'],
  },
  {
    value: 'Timeshift', label: 'Timeshift', tag: 'backup',
    lines: ['sudo apt install -y timeshift'],
  },
  {
    value: 'Deja Dup', label: 'Deja Dup', tag: 'backup',
    lines: ['sudo apt install -y deja-dup'],
  },
  {
    value: 'Steam', label: 'Steam', tag: 'gaming',
    lines: ['sudo apt install -y steam'],
  },
  {
    value: 'Lutris', label: 'Lutris', tag: 'gaming',
    lines: [
      'sudo add-apt-repository ppa:lutris-team/lutris -y',
      'sudo apt update && sudo apt install -y lutris',
    ],
  },
  {
    value: 'Heroic Games', label: 'Heroic Games', tag: 'gaming',
    lines: ['sudo snap install heroic-games-launcher || true'],
  },
];

// ── Media & Graphics ──────────────────────────────────────────────────────────
const MEDIA = [
  {
    value: 'GIMP', label: 'GIMP', tag: 'image editor',
    lines: ['sudo snap install gimp'],
  },
  {
    value: 'Inkscape', label: 'Inkscape', tag: 'vector graphics',
    lines: ['sudo snap install inkscape'],
  },
  {
    value: 'Krita', label: 'Krita', tag: 'digital painting',
    lines: ['sudo snap install krita'],
  },
  {
    value: 'Blender', label: 'Blender', tag: '3D creation',
    lines: ['sudo snap install blender --classic'],
  },
  {
    value: 'Darktable', label: 'Darktable', tag: 'RAW photo editor',
    lines: ['sudo apt install -y darktable'],
  },
  {
    value: 'RawTherapee', label: 'RawTherapee', tag: 'RAW photo editor',
    lines: ['sudo apt install -y rawtherapee'],
  },
  {
    value: 'Kdenlive', label: 'Kdenlive', tag: 'video editor',
    lines: ['sudo snap install kdenlive'],
  },
  {
    value: 'Audacity', label: 'Audacity', tag: 'audio editor',
    lines: ['sudo snap install audacity'],
  },
  {
    value: 'Ardour', label: 'Ardour', tag: 'DAW',
    lines: ['sudo apt install -y ardour'],
  },
  {
    value: 'LMMS', label: 'LMMS', tag: 'music production',
    lines: ['sudo snap install lmms'],
  },
  {
    value: 'Kdenlive video', label: 'HandBrake', tag: 'video converter',
    lines: ['sudo snap install handbrake-jz'],
  },
  {
    value: 'MKVToolNix', label: 'MKVToolNix', tag: 'video tools',
    lines: [
      'sudo apt install -y mkvtoolnix mkvtoolnix-gui',
    ],
  },
  {
    value: 'Pinta', label: 'Pinta', tag: 'simple image editor',
    lines: ['sudo snap install pinta'],
  },
  {
    value: 'Aseprite', label: 'Aseprite', tag: 'pixel art',
    lines: ['sudo snap install aseprite || true'],
  },
  {
    value: 'digiKam', label: 'digiKam', tag: 'photo manager',
    lines: ['sudo snap install digikam'],
  },
  {
    value: 'Shotwell', label: 'Shotwell', tag: 'photo manager',
    lines: ['sudo apt install -y shotwell'],
  },
  {
    value: 'Scribus', label: 'Scribus', tag: 'desktop publishing',
    lines: ['sudo apt install -y scribus'],
  },
  {
    value: 'FontForge', label: 'FontForge', tag: 'font editor',
    lines: ['sudo apt install -y fontforge'],
  },
];

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS = [
  {
    value: 'JetBrains Mono', label: 'JetBrains Mono',
    lines: [
      'wget -q https://github.com/JetBrains/JetBrainsMono/releases/latest/download/JetBrainsMono.zip -O /tmp/JetBrainsMono.zip',
      'sudo unzip -q /tmp/JetBrainsMono.zip "fonts/ttf/*" -d /usr/share/fonts/JetBrainsMono && rm /tmp/JetBrainsMono.zip',
      'sudo fc-cache -fv',
    ],
  },
  {
    value: 'Fira Code', label: 'Fira Code', tag: 'ligatures',
    lines: ['sudo apt install -y fonts-firacode'],
  },
  {
    value: 'Cascadia Code', label: 'Cascadia Code',
    lines: [
      'wget -q https://github.com/microsoft/cascadia-code/releases/latest/download/CascadiaCode.zip -O /tmp/CascadiaCode.zip',
      'sudo unzip -q /tmp/CascadiaCode.zip "ttf/*" -d /usr/share/fonts/CascadiaCode && rm /tmp/CascadiaCode.zip',
      'sudo fc-cache -fv',
    ],
  },
  {
    value: 'Hack', label: 'Hack',
    lines: ['sudo apt install -y fonts-hack'],
  },
  {
    value: 'Noto Fonts', label: 'Noto Fonts',
    lines: ['sudo apt install -y fonts-noto fonts-noto-color-emoji'],
  },
  {
    value: 'Inter', label: 'Inter',
    lines: ['sudo apt install -y fonts-inter || pip3 install fonttools && wget -q https://github.com/rsms/inter/releases/latest/download/Inter.zip -O /tmp/inter.zip && sudo unzip -q /tmp/inter.zip -d /usr/share/fonts/Inter && sudo fc-cache -fv && rm /tmp/inter.zip || true'],
  },
  {
    value: 'Nerd Fonts', label: 'Nerd Fonts', tag: 'icons in terminal',
    lines: [
      'NERD_FONT="JetBrainsMono"',
      'wget -q "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/${NERD_FONT}.zip" -O /tmp/NerdFont.zip',
      'sudo unzip -q /tmp/NerdFont.zip -d /usr/share/fonts/NerdFonts && rm /tmp/NerdFont.zip',
      'sudo fc-cache -fv',
    ],
  },
  {
    value: 'Ubuntu Fonts', label: 'Ubuntu Fonts',
    lines: ['sudo apt install -y fonts-ubuntu'],
  },
  {
    value: 'Powerline Fonts', label: 'Powerline Fonts', tag: 'terminal',
    lines: ['sudo apt install -y fonts-powerline'],
  },
  {
    value: 'Microsoft Core Fonts', label: 'MS Core Fonts', tag: 'Arial, Times…',
    lines: [
      'sudo apt install -y ttf-mscorefonts-installer',
      'sudo fc-cache -fv',
    ],
  },
];

// ── GNOME ─────────────────────────────────────────────────────────────────────
const GNOME_TOOLS = [
  {
    value: 'GNOME Tweaks', label: 'GNOME Tweaks',
    lines: ['sudo apt install -y gnome-tweaks'],
  },
  {
    value: 'Extension Manager', label: 'Extension Manager',
    lines: ['sudo apt install -y gnome-shell-extension-manager'],
  },
  {
    value: 'Gogh Themes', label: 'Gogh Terminal Themes',
    lines: ['bash -c "$(wget -qO- https://git.io/vQgMr)" || true'],
  },
  {
    value: 'Dconf Editor', label: 'Dconf Editor',
    lines: ['sudo apt install -y dconf-editor'],
  },
  {
    value: 'Synaptic', label: 'Synaptic', tag: 'package manager GUI',
    lines: ['sudo apt install -y synaptic'],
  },
  {
    value: 'Ulauncher', label: 'Ulauncher', tag: 'app launcher',
    lines: [
      'sudo add-apt-repository ppa:agornostal/ulauncher -y',
      'sudo apt update && sudo apt install -y ulauncher',
    ],
  },
  {
    value: 'Albert', label: 'Albert', tag: 'app launcher',
    lines: ['sudo apt install -y albert || sudo snap install albert || true'],
  },
  {
    value: 'Plank', label: 'Plank', tag: 'dock',
    lines: ['sudo apt install -y plank'],
  },
  {
    value: 'Dash to Dock', label: 'Dash to Dock',
    lines: ['sudo apt install -y gnome-shell-extension-dashtodock || true'],
  },
  {
    value: 'Papirus Icons', label: 'Papirus Icons',
    lines: [
      'sudo add-apt-repository ppa:papirus/papirus -y',
      'sudo apt update && sudo apt install -y papirus-icon-theme',
    ],
  },
  {
    value: 'Numix Icons', label: 'Numix Icons',
    lines: [
      'sudo add-apt-repository ppa:numix/ppa -y',
      'sudo apt update && sudo apt install -y numix-icon-theme-circle',
    ],
  },
  {
    value: 'Grub Customizer', label: 'Grub Customizer',
    lines: [
      'sudo add-apt-repository ppa:danielrichter2007/grub-customizer -y',
      'sudo apt update && sudo apt install -y grub-customizer',
    ],
  },
  {
    value: 'Stacer', label: 'Stacer', tag: 'system optimizer',
    lines: [
      'sudo add-apt-repository ppa:oguzhaninan/stacer -y',
      'sudo apt update && sudo apt install -y stacer',
    ],
  },
  {
    value: 'BleachBit', label: 'BleachBit', tag: 'disk cleaner',
    lines: ['sudo apt install -y bleachbit'],
  },
  {
    value: 'Conky', label: 'Conky', tag: 'system monitor widget',
    lines: ['sudo apt install -y conky-all'],
  },
  {
    value: 'GDM Settings', label: 'GDM Settings', tag: 'login screen',
    lines: ['sudo apt install -y gdm-settings || pip3 install gdm-settings || true'],
  },
  {
    value: 'Variety', label: 'Variety', tag: 'wallpaper manager',
    lines: [
      'sudo add-apt-repository ppa:varietywalls/variety -y',
      'sudo apt update && sudo apt install -y variety',
    ],
  },
];
