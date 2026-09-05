export const site = {
  title: 'Welli Irawan — System Administrator',
  eyebrow: 'System Administrator · Jakarta, Indonesia',
  name: ['Welli', 'Irawan'],
  positioning:
    "I run production infrastructure for PT Asuransi Raksa Pratikara: Oracle databases replicated across three cities, monitoring that catches problems before users do, and automation that keeps deployments boring. Right now I'm rebuilding the company's 20-year-old HR platform for the modern web.",
  status: {
    lead: 'Operational',
    rest: ' — open to sysadmin / devops / sre roles · Jakarta · UTC+7',
  },
  facts: ['3 DR sites', 'Hours → minutes provisioning', '20-yr legacy system in Docker'],
  links: {
    email: 'weliirawanxd@gmail.com',
    phone: '+62 896 5076 7958',
    phoneHref: 'tel:+6289650767958',
    linkedin: 'https://www.linkedin.com/in/welli-irawan-370ba835a/',
    github: 'https://github.com/xwelijr',
  },
}

export const about =
  'System administrator at PT Asuransi Raksa Pratikara, an insurance company in Jakarta. My job is to make infrastructure uneventful: databases that fail over cleanly, dashboards that tell the truth, and deployments that don’t need a human standing by. Currently deep in a legacy modernization — reverse-engineering a 20-year-old PHP HR system and rebuilding it on React and Laravel, with a real pipeline from dev to production.'

export const whatIDo = [
  'Run production infrastructure — Windows Server, Linux, VMware, and Oracle databases replicated across three sites.',
  'Build monitoring teams actually trust — Grafana and Prometheus dashboards that surface real problems and page only when it matters.',
  'Automate the repetitive — Ansible playbooks and deployment pipelines that turn manual hours into minutes.',
]

export const skillGroups = [
  { label: 'OS & Virtualization', skills: ['Linux', 'Windows Server', 'VMware', 'Networking'] },
  { label: 'Containers & Cloud', skills: ['Docker', 'Kubernetes', 'AWS', 'Azure'] },
  { label: 'Observability', skills: ['Grafana', 'Prometheus'] },
  { label: 'Automation & Databases', skills: ['Ansible', 'PowerShell', 'Oracle DB'] },
]

// Metric strings wrapped in <strong class="metric"> at render time — only these.
export const metricStrings = ['PHP 7.4', 'hours to minutes', 'three DRC sites', '20-year-old', '4,700+']

export const ehrdCode = `# docker-compose.yml — 20-yr-old eHRD, reproducible anywhere
services:
  app:
    image: php:7.4-fpm      # prod runs 5.6; 8.x ruled out
    volumes:
      - ./ehrd:/var/www/html
      - ./compat/prepend.php:/opt/prepend.php
    # gd built with FreeType — login captcha needs it

# compat/prepend.php — shims, zero source edits
if (!function_exists('split')) {
  function split($p, $s, $l = -1) {
    return preg_split('/'.$p.'/', $s, $l);
  }
}
if (!function_exists('mysql_fetch_array')) {
  /* mysqli bridge for 2 legacy call sites */
}`

export const projects = [
  {
    id: 'ehrd-modernization',
    title: 'eHRD — Legacy HR Platform Modernization',
    period: '2025 — Present',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Legacy PHP', 'Docker', 'React', 'Laravel', 'Reverse engineering'],
    summary:
      'A 20-year-old PHP HR system that every employee depends on — undocumented, and impossible to run anywhere but production. I reverse-engineered it, made it reproducible, and am now rebuilding it on a modern stack.',
    highlights: [
      'Reverse-engineered two decades of undocumented legacy PHP to map how the system actually behaves.',
      'Built a reproducible Docker runtime that boots the full application against production database dumps, writing PHP 7.4 compatibility shims so it runs identically on any machine.',
      'Now migrating the platform to React + Laravel without interrupting the live system.',
    ],
    status: { text: 'Status: Ongoing', variant: 'amber' },
    evidence: 'code',
  },
  {
    id: 'ehrd-cicd',
    title: 'eHRD CI/CD Pipeline & Environments',
    period: '2025 — 2026',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['CI/CD', 'Linode', 'Environments', 'Deployment pipeline'],
    summary:
      'The modernization needed a safe path to production. I built it: a test database, a dedicated dev environment, and a deployment pipeline out to Linode — so changes are proven before they touch the live HR system.',
    highlights: [
      'Stood up a test database so changes are validated against real data shapes before release.',
      'Built the dev environment at ehrd.dev.rks-a.com as a staging ground ahead of production.',
      'Wired the deployment pipeline from dev through to production on Linode — Phase 1 (environments + pipeline) is live.',
    ],
    status: { text: 'Status: Phase 1 shipped', variant: 'green' },
    evidence: 'pipeline',
  },
  {
    id: 'report-converter',
    title: 'Oracle Report to Excel',
    period: '2026',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Internal web app', 'Excel export', 'Oracle reports', 'Trilingual UI'],
    summary:
      'Oracle reports come out as clunky HTML files that teams then reworked by hand. I built the internal web app that turns them into clean Excel — drag, drop, done — with an Indonesian, English, and Chinese UI.',
    highlights: [
      '4,700+ files converted by internal teams — about as clear as usefulness gets.',
      'Batch-friendly: drop multiple reports at once and get a single zip back; jobs up to 1 GB.',
      'Nothing stored: files are processed on an internal server and deleted the moment the result is downloaded.',
    ],
    status: { text: 'Status: In daily use', variant: 'green' },
    evidence: 'image',
    image: {
      src: '/assets/report-converter.png',
      width: 1902,
      height: 858,
      caption: 'Oracle Report to Excel — 4,700+ files converted',
      alt: 'Internal Oracle Report to Excel converter showing a three-step drag-and-drop conversion flow with a live counter of files converted',
    },
  },
  {
    id: 'disaster-recovery',
    title: 'Disaster Recovery Infrastructure',
    period: '2023',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Oracle Data Guard', 'Windows Server', 'Multi-site DR'],
    summary:
      'An insurer cannot lose its databases. I implemented Oracle Data Guard across three sites — Jakarta, Bandung, and Surabaya — so a failure in one city doesn’t take the company down.',
    highlights: [
      'Configured real-time redo log shipping across the three DRC sites.',
      'Kept standby databases synchronized with the primary at all times.',
      'Tested failover until it was routine, not a gamble.',
    ],
    status: { text: 'Status: In production', variant: 'green' },
    evidence: 'gallery',
    gallery: {
      lead: {
        src: '/assets/oracle-dataguard.png',
        width: 1387,
        height: 768,
        caption: 'Oracle Data Guard — real-time redo log shipping, 3 sites',
        alt: 'Oracle Data Guard console showing redo log shipping status across three sites',
      },
      pair: [
        {
          src: '/assets/oracle-validation.png',
          width: 1390,
          height: 770,
          caption: 'Standby synchronization — Jakarta / Bandung / Surabaya',
          alt: 'Oracle standby database synchronization status',
        },
        {
          src: '/assets/oracle-monitoring.png',
          width: 1387,
          height: 769,
          caption: 'DRC tablespace maintenance — SQL*Plus',
          alt: 'SQL*Plus session on a DRC server showing tablespace tempfile maintenance during an Oracle migration',
        },
      ],
    },
  },
  {
    id: 'grafana-monitoring',
    title: 'Grafana Monitoring Platform',
    period: '2023',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Grafana', 'Prometheus', 'Alerting'],
    summary:
      'Before this, checking system health meant logging into servers one by one. I built the Grafana platform that puts infrastructure, database, and network health on a single set of dashboards.',
    highlights: [
      'Centralized visibility across infrastructure, databases, and the network.',
      'Rebuilt alert routing so pages reach the right person with the right context — faster incident response, less noise.',
    ],
    status: { text: 'Status: In production', variant: 'green' },
    evidence: 'image',
    image: {
      src: '/assets/grafana-dashboard.png',
      width: 1598,
      height: 816,
      caption: 'Grafana — infrastructure / database / network dashboards',
      alt: 'Grafana dashboard showing infrastructure, database, and network health panels',
    },
    flipped: true,
  },
  {
    id: 'provisioning-automation',
    title: 'Provisioning Automation',
    period: '2023',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Ansible', 'Python', 'PowerShell'],
    summary:
      'Server setup used to be a manual checklist that took hours and drifted between machines. I replaced it with reusable Ansible playbooks.',
    highlights: [
      'Cut routine provisioning from hours to minutes.',
      'Playbooks double as documentation — the setup procedure is code: versioned, reviewed, repeatable.',
    ],
    status: { text: 'Status: In daily use', variant: 'green' },
    evidence: 'none',
  },
]

export const principles = [
  {
    label: 'Monitoring',
    text: 'Dashboards should surface real problems, not decorate a wall. Alerts that matter; silence that is earned.',
  },
  {
    label: 'Automation',
    text: 'Do it by hand once, script it forever. The playbook is the documentation. Scale confidence, not just capacity.',
  },
  {
    label: 'Resilience',
    text: 'Design for failure, then rehearse it. A recovery procedure you haven’t tested is a rumor.',
  },
]

export const contactIntro = {
  before: 'Based in Jakarta, Indonesia (GMT+7). Open to sysadmin, DevOps, and SRE conversations — email is fastest, LinkedIn works too, and the code lives at ',
  linkText: 'github.com/xwelijr',
  after: '.',
}
