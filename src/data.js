export const site = {
  title: 'Welli Irawan — System Administrator',
  eyebrow: 'System Administrator · Jakarta, Indonesia',
  name: ['Welli', 'Irawan'],
  positioning:
    "I run infrastructure at PT Asuransi Raksa Pratikara: Oracle databases replicated across three cities. Right now, rebuilding the company's 20-year-old HR platform.",
  status: {
    lead: 'Operational',
    rest: ' — open to sysadmin / devops / sre roles · Jakarta · UTC+7',
  },
  facts: ['3 DR sites', '$0 CloudWatch bill', '20-yr legacy system in Docker'],
  links: {
    email: 'weliirawanxd@gmail.com',
    phone: '+62 896 5076 7958',
    phoneHref: 'tel:+6289650767958',
    linkedin: 'https://www.linkedin.com/in/welli-irawan-370ba835a/',
    github: 'https://github.com/xwelijr',
  },
}

export const whatIDo = [
  'Production infrastructure: Windows Server, Linux, VMware, Oracle.',
  'Grafana and Prometheus dashboards that page only when it matters.',
  'Deployment pipelines and internal tools that cut manual work.',
]

export const skillGroups = [
  { label: 'OS & Virtualization', skills: ['Linux', 'Windows Server', 'VMware', 'Networking'] },
  { label: 'Containers & Cloud', skills: ['Docker', 'Kubernetes', 'AWS', 'Azure'] },
  { label: 'Observability', skills: ['Grafana', 'Prometheus'] },
  { label: 'Automation & Databases', skills: ['PowerShell', 'AWS Lambda', 'Oracle DB'] },
]

// Metric strings wrapped in <strong class="metric"> at render time — only these.
export const metricStrings = ['PHP 7.4', 'three DRC sites', '20-year-old', '4,700+', '$0']

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
      'Reverse-engineered the company’s undocumented PHP HR system. Now rebuilding it on React and Laravel.',
    highlights: [
      'Got the 20-year-old app booting in Docker against production database dumps.',
      'Wrote PHP 7.4 compatibility shims. No source edits.',
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
    summary: 'Built the test-and-deploy path for the eHRD rebuild.',
    highlights: [
      'Test database and dev environment at ehrd.dev.rks-a.com.',
      'Pipeline runs dev to production on Linode. Phase 1 is live.',
    ],
    status: { text: 'Status: Phase 1 shipped', variant: 'green' },
    evidence: 'pipeline',
  },
  {
    id: 'rks-test-environment',
    title: 'RKS-M & RKS-W Developer Test Environment',
    period: '2026',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['AWS EC2', 'AWS Lambda', 'VPC', 'Database environments'],
    summary:
      'Developers tested RKS-M and RKS-W database changes against production, so I built test environments on AWS.',
    highlights: [
      'Test databases on AWS EC2, wired to Lambda through the VPC.',
      'The first test environment the dev team has had in years.',
    ],
    status: { text: 'Status: In use', variant: 'green' },
    evidence: 'none',
  },
  {
    id: 'report-converter',
    title: 'Oracle Report to Excel',
    period: '2026',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Internal web app', 'Excel export', 'Oracle reports', 'Trilingual UI'],
    summary:
      'Internal web app that converts Oracle HTML reports to Excel, with an Indonesian, English, and Chinese UI.',
    highlights: [
      '4,700+ files converted so far.',
      'Batch jobs up to 1 GB. Files deleted after download.',
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
    id: 'grafana-monitoring',
    title: 'Grafana Monitoring Platform',
    period: '2025 — Present',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Grafana', 'Prometheus', 'AWS RDS', 'CloudWatch', 'Alerting'],
    summary: 'Grafana and Prometheus dashboards for the internal server fleet and AWS.',
    highlights: [
      'RDS monitoring tuned to keep the CloudWatch bill at $0.',
      'Rebuilt alert routing so pages reach the right person.',
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
    id: 'usb-device-control',
    title: 'Endpoint USB Control with ManageEngine',
    period: '2026',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['ManageEngine', 'Endpoint security', 'DLP', 'Device control'],
    summary:
      'Evaluated and rolled out ManageEngine device control to lock down USB ports on company endpoints.',
    highlights: [
      'Unauthorized removable storage is blocked by default.',
      'Temporary access auto-expires. Every connection attempt logged.',
    ],
    status: { text: 'Status: Implemented', variant: 'green' },
    evidence: 'none',
  },
  {
    id: 'disaster-recovery',
    title: 'Disaster Recovery Infrastructure',
    period: '2025',
    org: 'PT Asuransi Raksa Pratikara',
    tags: ['Oracle Data Guard', 'Windows Server', 'Multi-site DR'],
    summary: 'Implemented Oracle Data Guard across Jakarta, Bandung, and Surabaya.',
    highlights: [
      'Real-time redo log shipping across the three DRC sites.',
      'Tested failover until it was routine.',
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
]

export const principles = [
  {
    label: 'Monitoring',
    text: 'Dashboards should surface real problems, not decorate a wall. Alerts that matter; silence that is earned.',
  },
  {
    label: 'Automation',
    text: 'Do it by hand once, script it forever. The script is the documentation. Scale confidence, not just capacity.',
  },
  {
    label: 'Resilience',
    text: 'Design for failure, then rehearse it. A recovery procedure you haven’t tested is a rumor.',
  },
]

export const contactIntro = {
  before: 'Based in Jakarta (GMT+7). Email is fastest, LinkedIn works too. Code at ',
  linkText: 'github.com/xwelijr',
  after: '.',
}
