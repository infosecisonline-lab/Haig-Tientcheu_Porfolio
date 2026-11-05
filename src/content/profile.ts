// Single source of truth for the portfolio, the US resume, the business card and the vCard.
// Source: Haig's resume "Haig_SOC_Analyst_August2026.pdf" + the git history of SongFromWithin and StokNextra.
// Wording rule from Haig: never "senior" for security roles; use "Level 2" / "Tier 2" / "Associate".

import type { Locale } from "@/i18n/locales";
import { links } from "@/config/site";
import type { IconKey } from "@/components/icons";

export type Capability = {
  id: string;
  icon: IconKey;
  name: string;
  approach: string;
  tools: string;
  outcome: string;
  keywords: string;
};

export type Job = {
  // siteOnly: shown on the portfolio timeline, left out of the PDF resume (it has its own Projects section)
  siteOnly?: boolean;
  icon: IconKey;
  title: string;
  company: string;
  client?: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type Venture = {
  id: "songfromwithin" | "stoknextra" | "portfolio";
  name: string;
  url: string;
  role: string;
  period: string;
  commits?: string;
  summary: string;
  highlights: string[];
  stack: string;
  security: string;
  image: { main: string; mobile?: string; alt: string; video?: string };
};

export type Row = { name: string; detail?: string; value: string; href?: string; logo?: string };

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  shortTitle: string;
  roles: { icon: IconKey; label: string }[];
  badge: string;
  openTo: { title: string; mode: string; roles: { icon: IconKey; label: string }[]; locations: string[] };
  tagline: string;
  location: string;
  facts: { icon: IconKey; label: string }[];
  stats: { value: string; label: string }[];
  about: { heading: string; paragraphs: string[]; points: { icon: IconKey; text: string }[] };
  seoDescription: string;
  capabilities: Capability[];
  jobs: Job[];
  toolbox: { icon: IconKey; label: string; items: string[] }[];
  certifications: { icon: IconKey; name: string; issuer: string }[];
  education: { degree: string; school: string }[];
  vibe: { icon: IconKey; name: string; use: string }[];
  vibeStats: { value: string; label: string }[];
  ventures: Venture[];
  leadership: {
    paragraph: string;
    facts: { label: string; value: string }[];
    lists: { label: string; rows: Row[] }[];
    image: { src: string; alt: string };
  };
  resume: {
    summary: string;
    skills: { label: string; items: string }[];
    projects: string[];
    leadership: string[];
  };
  vcardNote: string;
};

const certifications: Profile["certifications"] = [
  { icon: "azure", name: "Microsoft Certified: Azure Solutions Architect Expert", issuer: "Microsoft" },
  { icon: "server", name: "Microsoft Certified: Azure Administrator Associate", issuer: "Microsoft" },
  { icon: "securityx", name: "CompTIA SecurityX (CASP+)", issuer: "CompTIA" },
  { icon: "pentest", name: "CompTIA PenTest+ ce", issuer: "CompTIA" },
  { icon: "cysa", name: "CompTIA CySA+ ce", issuer: "CompTIA" },
  { icon: "secplus", name: "CompTIA Security+ ce", issuer: "CompTIA" },
  { icon: "netplus", name: "CompTIA Network+ ce", issuer: "CompTIA" },
  { icon: "project", name: "CompTIA Project+ ce", issuer: "CompTIA" },
  { icon: "sscp", name: "Systems Security Certified Practitioner (SSCP)", issuer: "ISC2" },
];

const toolItems = {
  siem: ["Microsoft Sentinel", "MS Defender XDR", "CrowdStrike", "Elastic SIEM", "LMNTRIX XDR", "Defender for Identity", "Defender for IoT"],
  vuln: ["Tenable Nessus", "Qualys", "Tanium"],
  network: ["Palo Alto Panorama", "Zscaler"],
  identity: ["Entra ID", "Intune (MDM)", "SCCM", "Microsoft Purview"],
  code: ["KQL", "PowerShell", "Python", "SQL", "Terraform", "Bicep", "ARM", "SOAR playbooks", "Logic Apps"],
  frameworks: ["MITRE ATT&CK", "Cyber Kill Chain", "NIST CSF", "CIS Benchmarks", "SOC 2", "OSINT"],
  itsm: ["ServiceNow", "KnowBe4"],
};

const en: Profile = {
  name: "Haig Tientcheu",
  firstName: "Haig",
  lastName: "Tientcheu",
  title: "SOC Analyst | Threat Hunter | Vulnerability Management | Incident Response | Cloud Security",
  shortTitle: "SOC Analyst & Threat Hunter · Cloud Security",
  roles: [
    { icon: "soc", label: "SOC Analyst" },
    { icon: "hunt", label: "Threat Hunter" },
    { icon: "vuln", label: "Vulnerability Management" },
    { icon: "ir", label: "Incident Response" },
    { icon: "cloud", label: "Cloud Security" },
    { icon: "engineering", label: "Security Engineering" },
    { icon: "ai", label: "Website & SaaS Builder" },
  ],
  badge: "Open to work · Remote or hybrid",
  openTo: {
    title: "Open to these roles",
    mode: "Remote or hybrid",
    roles: [
      { icon: "soc", label: "Level 2 SOC Analyst" },
      { icon: "vuln", label: "Vulnerability Management Analyst" },
      { icon: "cloud", label: "Cloud Security Administrator" },
      { icon: "engineering", label: "Cloud Security Engineer" },
      { icon: "ir", label: "Incident Responder" },
      { icon: "ai", label: "Vibe Coding Developer" },
    ],
    locations: ["California", "Atlanta, GA", "Maryland", "Minnesota"],
  },
  tagline: "Securing critical infrastructure through advanced detection, threat hunting & zero-trust architecture.",
  location: "Riverdale, GA",
  facts: [
    { icon: "location", label: "Riverdale, GA" },
    { icon: "clearance", label: "Active clearance eligible" },
    { icon: "relocate", label: "Willing to relocate" },
  ],
  stats: [
    { value: "9", label: "Security & cloud certifications" },
    { value: "5+", label: "Years in IT & security" },
    { value: "30%", label: "Faster remediation SLA" },
    { value: "500+", label: "End users secured" },
  ],
  about: {
    heading: "Defender by trade, builder by passion",
    paragraphs: [
      "I implement, manage and monitor security controls across Microsoft 365, Azure and hybrid environments. Today I hunt threats and respond to incidents for critical infrastructure, with Microsoft Defender XDR, Sentinel, Palo Alto Panorama and KQL as daily tools.",
      "Before the SOC, I ran vulnerability management across multi-tenant environments and administered Entra ID, Intune and Purview for 500+ users. I support NIST CSF, CIS Benchmarks and SOC 2 programs, and I am currently pursuing the CCSP. In my own time I build and ship SaaS products with AI, which keeps my security thinking close to real code.",
    ],
    points: [
      { icon: "soc", text: "Tier 2 SOC: triage, escalation, containment with MDR partners" },
      { icon: "hunt", text: "Threat hunting with KQL, MITRE ATT&CK TTPs and CTI feeds" },
      { icon: "vuln", text: "Vulnerability management with Nessus and Qualys, 30% faster SLA" },
      { icon: "cloud", text: "Azure, Entra ID and Zero Trust: Conditional Access, PIM, RBAC" },
    ],
  },
  seoDescription:
    "Haig Tientcheu, SOC Analyst and Threat Hunter: Microsoft Defender XDR, Sentinel, KQL, vulnerability management, incident response and Azure cloud security. Builder of SaaS products with Claude Code.",
  capabilities: [
    {
      id: "soc", icon: "soc", name: "SOC monitoring & triage",
      approach: "Monitor and triage SIEM alerts across critical infrastructure, escalate confirmed incidents",
      tools: "Microsoft Sentinel, Defender XDR, Elastic SIEM",
      outcome: "Confirmed incidents escalated and contained with MDR partners",
      keywords: "soc siem sentinel triage alert monitoring tier 2 defender xdr",
    },
    {
      id: "hunt", icon: "hunt", name: "Threat hunting",
      approach: "Hunt persistent threats from adversary TTPs and indicators of attack",
      tools: "KQL, MITRE ATT&CK, CTI feeds",
      outcome: "Threats found by hypothesis and query, not by luck",
      keywords: "threat hunting kql mitre att&ck ttp ioa cti hunt",
    },
    {
      id: "ir", icon: "ir", name: "Incident response",
      approach: "Tier 2 escalation: investigation, eradication and post-incident reviews",
      tools: "Defender XDR, SOAR, runbooks",
      outcome: "Corrective actions in place so incidents do not recur",
      keywords: "incident response ir eradication containment post-incident runbook",
    },
    {
      id: "vuln", icon: "vuln", name: "Vulnerability management",
      approach: "Scan, prioritize CVEs by CVSS, exploitability and business impact, drive patching",
      tools: "Tenable Nessus, Qualys, CIS Benchmarks",
      outcome: "Remediation SLA cut by 30%",
      keywords: "vulnerability management nessus qualys cve cvss patch cis",
    },
    {
      id: "cloud", icon: "cloud", name: "Azure cloud security",
      approach: "Secure Azure with NSGs, Key Vault, Azure Policy and landing zones",
      tools: "Azure, Azure Policy, Key Vault, Terraform, Bicep",
      outcome: "Governed, least-privilege cloud environments",
      keywords: "azure cloud security key vault policy nsg landing zone terraform bicep arm",
    },
    {
      id: "identity", icon: "identity", name: "Identity & Zero Trust",
      approach: "Conditional Access, PIM, RBAC, MFA and privileged access controls",
      tools: "Entra ID, Conditional Access, PIM",
      outcome: "No implicit trust, zero-day privilege termination",
      keywords: "zero trust identity entra id conditional access pim rbac mfa",
    },
    {
      id: "endpoint", icon: "endpoint", name: "Endpoint security",
      approach: "Deploy Defender for Endpoint and Intune compliance with hardening baselines",
      tools: "Defender for Endpoint, Intune, SCCM",
      outcome: "Hardened Windows and Linux endpoints across tenants",
      keywords: "endpoint edr defender intune mdm hardening baseline",
    },
    {
      id: "network", icon: "network", name: "Network & firewall security",
      approach: "Investigate events and optimize firewall rules and security profiles",
      tools: "Palo Alto Panorama, Zscaler",
      outcome: "Better detection with less operational noise",
      keywords: "network firewall palo alto panorama zscaler log analysis",
    },
    {
      id: "automation", icon: "automation", name: "Security automation",
      approach: "Build Logic Apps and SOAR workflows, write PowerShell and Python",
      tools: "Logic Apps, SOAR, PowerShell, Python",
      outcome: "Faster, repeatable detection and response",
      keywords: "automation soar logic apps powershell python playbook script",
    },
    {
      id: "grc", icon: "grc", name: "Compliance & GRC",
      approach: "Implement and validate controls mapped to frameworks, collect evidence",
      tools: "NIST CSF, CIS Benchmarks, SOC 2",
      outcome: "Audit-ready evidence for GRC teams",
      keywords: "grc compliance nist csf cis soc 2 audit evidence",
    },
    {
      id: "data", icon: "data", name: "Data protection",
      approach: "Configure DLP policies, sensitivity labels and retention",
      tools: "Microsoft Purview",
      outcome: "Sensitive data classified and protected",
      keywords: "data protection purview dlp sensitivity label retention",
    },
    {
      id: "cti", icon: "cti", name: "Threat intelligence & reporting",
      approach: "Analyze multi-source threat data, brief executives and teams",
      tools: "OSINT, CTI feeds, Cyber Kill Chain",
      outcome: "Clear risk and mitigation for decision makers",
      keywords: "threat intelligence cti osint report executive kill chain",
    },
    {
      id: "vibe", icon: "ai", name: "Vibe coding & SaaS",
      approach: "Build and ship web apps with Claude Code and ChatGPT",
      tools: "Claude Code, ChatGPT, Next.js, Stripe",
      outcome: "Three websites in production",
      keywords: "vibe coding claude code chatgpt ai saas nextjs stripe web development",
    },
  ],
  jobs: [
    {
      siteOnly: true,
      icon: "ai",
      title: "Website & SaaS Developer (Vibe Coding)",
      company: "Independent · StokNextra, SongFromWithin",
      location: "Remote",
      dates: "Sep 2026 – Present",
      bullets: [
        "Design, build and ship production websites and SaaS platforms with Claude Code and ChatGPT: StokNextra (117 commits) and SongFromWithin (94 commits), plus this portfolio.",
        "Build full-stack apps with Next.js, React, NestJS, PostgreSQL, Supabase and Stripe, deployed on Vercel and Docker.",
        "Apply security by design: tenant isolation, RBAC, Argon2 password hashing, strict Content Security Policy and no secrets in code.",
      ],
    },
    {
      icon: "soc",
      title: "Security Operations Analyst & Threat Hunter",
      company: "Computer Aid Inc (CAI)",
      client: "Client: Metropolitan Water District of Southern California (U.S. critical infrastructure)",
      location: "La Verne, CA",
      dates: "Mar 2025 – Present",
      bullets: [
        "Monitored and triaged security alerts from SIEMs across critical infrastructure environments, escalating confirmed incidents and coordinating containment with internal teams and MDR partners.",
        "Provided Tier 2 escalation support for security incidents, coordinating investigation, eradication and post-incident reviews to implement corrective actions and prevent recurrence.",
        "Built and maintained security automation using Logic Apps and SOAR workflows, and developed runbooks for common alert triage and incident response scenarios.",
        "Investigated security events using Palo Alto Panorama (log analysis, threat validation, escalation) and optimized firewall rules and security profiles to reduce operational noise.",
        "Executed threat hunts based on adversary TTPs and indicators of attack, using KQL with open- and closed-source CTI feeds to detect and isolate persistent threats.",
        "Compiled multi-format intelligence reports and communicated technical risks and mitigation strategies to executive management and cross-functional teams.",
      ],
    },
    {
      icon: "vuln",
      title: "Vulnerability Management Analyst (On-Call)",
      company: "Ozzy's Cyber Consultancy Services",
      location: "Atlanta, GA (Remote)",
      dates: "Jun 2023 – Mar 2025",
      bullets: [
        "Executed end-to-end vulnerability assessments with Tenable Nessus and Qualys; managed agent deployment, scan configuration and health monitoring across multi-tenant environments.",
        "Prioritized CVEs by CVSS severity, exploitability and business impact, cutting remediation SLA by 30% while maintaining CIS Benchmark alignment.",
        "Implemented and validated technical controls mapped to NIST CSF and SOC 2, supporting GRC teams with evidence collection and assessment documentation.",
        "Delivered vulnerability reports and remediation guidance to IT leadership and C-level stakeholders; supported incident response with root-cause analysis.",
      ],
    },
    {
      icon: "sysadmin",
      title: "System Admin | Help Desk Analyst II",
      company: "Computer Aid Inc (CAI)",
      location: "Allentown, PA (Remote)",
      dates: "May 2021 – Feb 2025",
      bullets: [
        "Deployed and maintained Microsoft Defender for Endpoint and Intune compliance policies with hardening baselines across Windows and Linux.",
        "Managed Entra ID (Conditional Access, PIM, RBAC, app registrations), Intune MDM and Exchange for 500+ end users across multiple tenants.",
        "Configured Azure security controls (NSGs, Key Vault, Azure Policy) and enforced MFA and privileged access through Conditional Access.",
        "Configured Microsoft Purview DLP, sensitivity labels and retention; automated onboarding and offboarding with PowerShell for zero-day privilege termination.",
      ],
    },
    {
      icon: "lab",
      title: "Azure Cloud Engineer (Intern & Lab Projects)",
      company: "Hands-on Azure lab",
      location: "Remote",
      dates: "Lab & projects",
      bullets: [
        "Designed and deployed Azure landing zones with Azure Policy, RBAC, networking and storage controls.",
        "Automated VM provisioning and patching with Azure PowerShell and ARM/Bicep; validated backup, disaster recovery and monitoring scenarios.",
      ],
    },
  ],
  toolbox: [
    { icon: "siem", label: "SIEM & XDR", items: toolItems.siem },
    { icon: "vuln", label: "Vulnerability management", items: toolItems.vuln },
    { icon: "network", label: "Network & Zero Trust", items: toolItems.network },
    { icon: "identity", label: "Identity, endpoint & data", items: toolItems.identity },
    { icon: "code", label: "Automation, IaC & query", items: toolItems.code },
    { icon: "frameworks", label: "Frameworks & methods", items: toolItems.frameworks },
    { icon: "itsm", label: "ITSM & awareness", items: toolItems.itsm },
  ],
  certifications,
  education: [
    { degree: "M.S. Cybersecurity & Information Assurance", school: "Western Governors University (WGU)" },
    { degree: "B.S. Cybersecurity & Information Assurance", school: "Western Governors University (WGU)" },
    { degree: "A.S. Cybersecurity", school: "Atlanta Technical College" },
  ],
  vibe: [
    { icon: "claude", name: "Claude Code", use: "My AI pair engineer in the terminal and VS Code. It plans, writes, tests and reviews code with me: every commit on my SaaS projects is co-authored with Claude." },
    { icon: "chatgpt", name: "ChatGPT", use: "Brainstorming, product copy, research and quick prototypes before a feature reaches code." },
    { icon: "terraform", name: "Terraform", use: "Infrastructure as code for Azure: environments written, reviewed and rebuilt the same way every time." },
    { icon: "deploy", name: "GitHub, Vercel & Docker", use: "Version control, previews and one-command deploys, so ideas reach production the same day." },
  ],
  vibeStats: [
    { value: "3", label: "Websites in production" },
    { value: "211", label: "Commits co-authored with Claude" },
    { value: "2026", label: "All built this year" },
  ],
  ventures: [
    {
      id: "stoknextra",
      name: "StokNextra",
      url: links.stoknextra,
      role: "Founder · built with Claude Code",
      period: "Oct 2026 – present",
      commits: "117 commits",
      summary:
        "Till, stock, invoicing and accounting software for shops in West and Central Africa. It keeps selling when the internet drops and syncs when the network is back.",
      highlights: [
        "Multi-tenant architecture with role-based access",
        "Offline-first till with barcode scanning and Mobile Money",
        "Real-time stock analytics and low-stock alerts",
        "WhatsApp invoices and SYSCOHADA accounting",
      ],
      stack: "Next.js 16, React 19, NestJS, PostgreSQL, Drizzle ORM, Docker, Turborepo",
      security: "Tenant isolation, RBAC, Argon2 password hashing and signed JWT sessions.",
      image: {
        main: "/work/stoknextra-desktop.jpg",
        mobile: "/work/stoknextra-mobile.jpg",
        alt: "StokNextra home page: “Your business keeps running, even when the internet drops”, with a synced till receipt paid by Orange Money",
      },
    },
    {
      id: "songfromwithin",
      name: "SongFromWithin",
      url: links.songfromwithin,
      role: "Founder · built with Claude Code",
      period: "Sep 2026 – present",
      commits: "94 commits",
      summary:
        "An e-commerce audio platform that turns a customer’s story into a personalised song for a milestone. The customer approves the lyrics before paying.",
      highlights: [
        "Stripe payments with pricing in USD and FCFA",
        "AI-assisted lyrics with the Claude API",
        "Order lifecycle engine, client portal and email notifications",
        "Bilingual site with error monitoring",
      ],
      stack: "Next.js, React, Supabase, Stripe, Claude API, Resend, Sentry, Vercel",
      security: "Card data handled by Stripe only; server-side secrets and monitored errors.",
      image: {
        main: "/work/songfromwithin-desktop.jpg",
        mobile: "/work/songfromwithin-mobile.jpg",
        video: "/work/sfw-loop.webm",
        alt: "SongFromWithin home page: “A song they’ll never forget”, with the Create my song button from $19.99",
      },
    },
    {
      id: "portfolio",
      name: "This website",
      url: "https://haig-tientcheu.vercel.app",
      role: "Built with Claude Code",
      period: "Nov 2026",
      summary:
        "This bilingual portfolio, my US resume and a digital business card with QR code, NFC link, vCard and Google Wallet, built with Claude Code.",
      highlights: [
        "Strict nonce-based Content Security Policy and security headers",
        "English and French, light and dark themes",
        "Business card: QR, NFC, one-tap contact save",
      ],
      stack: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vercel",
      security: "Strict CSP, HSTS, no secrets in code, security.txt.",
      image: {
        main: "/work/portfolio-desktop.jpg",
        mobile: "/work/portfolio-mobile.jpg",
        alt: "This portfolio’s home page: Haig Tientcheu, SOC Analyst and Threat Hunter, on a navy and gold background",
      },
    },
  ],
  leadership: {
    paragraph:
      "In 2017 I founded The Way of Hope, an international NGO that supports vulnerable people in Cameroon and beyond: education, healthcare, vocational training and families facing rare diseases. I lead it the way I run a security programme, with clear priorities, honest reporting and people who can count on it.",
    facts: [
      { label: "Founded", value: "2017" },
      { label: "Based in", value: "Cameroon, working worldwide" },
      { label: "Role", value: "Founder & President" },
    ],
    lists: [
      {
        label: "Service",
        rows: [
          { name: "The Way of Hope", value: "Founder", href: links.wayofhope, logo: "/orgs/wayofhope-emblem.png" },
          { name: "Shield of Faith Charities International", detail: "Help for needy children worldwide", value: "Volunteer", href: links.shieldcharities, logo: "/orgs/shield-of-faith.png" },
        ],
      },
      {
        label: "Writing",
        rows: [{ name: "Au-delà du voile", detail: "On discernment and leadership", value: "Author" }],
      },
    ],
    image: {
      src: "/work/wayofhope-supplies.jpg",
      alt: "School supplies, backpacks and exercise books ready for distribution in front of a The Way of Hope / La Voie de l’Espoir banner",
    },
  },
  resume: {
    summary:
      "Cybersecurity professional with experience implementing, managing and monitoring security controls across Microsoft 365, Azure and hybrid environments. Hands-on expertise with Microsoft Defender XDR, Entra ID, Intune, Palo Alto Panorama and Purview, with a track record of hardening endpoints and tuning security alerts. Azure-certified with practical experience in cloud administration, architecture, identity, networking and security. Experienced in supporting NIST CSF, CIS Benchmarks, SOC 2 and GRC compliance across multi-tenant managed services environments. Currently pursuing the CCSP certification.",
    skills: [
      { label: "SIEM & XDR", items: toolItems.siem.join(", ") },
      { label: "Vulnerability Management", items: toolItems.vuln.join(", ") },
      { label: "Network & Zero Trust", items: toolItems.network.join(", ") },
      { label: "Identity, Endpoint & Data", items: toolItems.identity.join(", ") },
      { label: "Automation, IaC & Query", items: toolItems.code.join(", ") },
      { label: "Frameworks", items: toolItems.frameworks.join(", ") },
      { label: "ITSM & Awareness", items: toolItems.itsm.join(", ") },
    ],
    projects: [
      "StokNextra (stoknextra.com), Oct 2026 – present: multi-tenant till, stock and accounting SaaS (Next.js, NestJS, PostgreSQL, Docker) built with Claude Code; tenant isolation, RBAC, Argon2 hashing.",
      "SongFromWithin (songfromwithin.com), Sep 2026 – present: e-commerce audio platform (Next.js, Supabase, Stripe, Claude API) built with Claude Code; card data handled by Stripe only.",
      "Personal portfolio and digital business card, Nov 2026: Next.js 16 with a strict nonce-based Content Security Policy, built with Claude Code.",
    ],
    leadership: [
      "Founder & President, The Way of Hope (international NGO, Cameroon), 2017 – present",
      "Volunteer, Shield of Faith Charities International (support for needy children worldwide)",
    ],
  },
  vcardNote:
    "SOC Analyst & Threat Hunter (Defender XDR, Sentinel, KQL, Azure). Founder of SongFromWithin and StokNextra. Founder of The Way of Hope.",
};

const fr: Profile = {
  ...en,
  title: "Analyste SOC | Threat Hunter | Gestion des vulnérabilités | Réponse aux incidents | Sécurité cloud",
  shortTitle: "Analyste SOC & Threat Hunter · Sécurité cloud",
  roles: [
    { icon: "soc", label: "Analyste SOC" },
    { icon: "hunt", label: "Threat Hunter" },
    { icon: "vuln", label: "Gestion des vulnérabilités" },
    { icon: "ir", label: "Réponse aux incidents" },
    { icon: "cloud", label: "Sécurité cloud" },
    { icon: "engineering", label: "Ingénierie sécurité" },
    { icon: "ai", label: "Création de sites & SaaS" },
  ],
  badge: "Disponible · Télétravail ou hybride",
  openTo: {
    title: "Ouvert à ces postes",
    mode: "Télétravail ou hybride",
    roles: [
      { icon: "soc", label: "Analyste SOC niveau 2" },
      { icon: "vuln", label: "Analyste en gestion des vulnérabilités" },
      { icon: "cloud", label: "Administrateur sécurité cloud" },
      { icon: "engineering", label: "Ingénieur sécurité cloud" },
      { icon: "ir", label: "Spécialiste en réponse aux incidents" },
      { icon: "ai", label: "Développeur vibe coding" },
    ],
    locations: ["Californie", "Atlanta (Géorgie)", "Maryland", "Minnesota"],
  },
  tagline: "Je sécurise des infrastructures critiques grâce à la détection avancée, au threat hunting et à l’architecture Zero Trust.",
  facts: [
    { icon: "location", label: "Riverdale, Géorgie (USA)" },
    { icon: "clearance", label: "Éligible à une habilitation (clearance)" },
    { icon: "relocate", label: "Mobile géographiquement" },
  ],
  stats: [
    { value: "9", label: "Certifications sécurité & cloud" },
    { value: "5+", label: "Ans en informatique & sécurité" },
    { value: "30 %", label: "De délai de correction en moins" },
    { value: "500+", label: "Utilisateurs sécurisés" },
  ],
  about: {
    heading: "Défenseur de métier, bâtisseur par passion",
    paragraphs: [
      "Je mets en place, gère et surveille des contrôles de sécurité sur Microsoft 365, Azure et des environnements hybrides. Aujourd’hui, je traque les menaces et je réponds aux incidents pour une infrastructure critique, avec Microsoft Defender XDR, Sentinel, Palo Alto Panorama et KQL au quotidien.",
      "Avant le SOC, j’ai piloté la gestion des vulnérabilités sur des environnements multi-tenant et administré Entra ID, Intune et Purview pour plus de 500 utilisateurs. J’accompagne des programmes NIST CSF, CIS Benchmarks et SOC 2, et je prépare la certification CCSP. Sur mon temps libre, je construis et lance des produits SaaS avec l’IA, ce qui garde ma vision de la sécurité proche du vrai code.",
    ],
    points: [
      { icon: "soc", text: "SOC niveau 2 : tri, escalade, confinement avec les partenaires MDR" },
      { icon: "hunt", text: "Threat hunting avec KQL, les TTP MITRE ATT&CK et la CTI" },
      { icon: "vuln", text: "Gestion des vulnérabilités avec Nessus et Qualys, délais réduits de 30 %" },
      { icon: "cloud", text: "Azure, Entra ID et Zero Trust : accès conditionnel, PIM, RBAC" },
    ],
  },
  seoDescription:
    "Haig Tientcheu, analyste SOC et threat hunter : Microsoft Defender XDR, Sentinel, KQL, gestion des vulnérabilités, réponse aux incidents et sécurité cloud Azure. Créateur de produits SaaS avec Claude Code.",
  capabilities: [
    { ...en.capabilities[0], name: "Surveillance & tri SOC", approach: "Surveiller et trier les alertes SIEM d’une infrastructure critique, escalader les incidents confirmés", outcome: "Incidents confirmés escaladés et contenus avec les partenaires MDR", keywords: en.capabilities[0].keywords + " surveillance tri" },
    { ...en.capabilities[1], approach: "Traquer les menaces persistantes à partir des TTP adverses et des indicateurs d’attaque", tools: "KQL, MITRE ATT&CK, flux CTI", outcome: "Des menaces trouvées par hypothèse et requête, pas par chance", keywords: en.capabilities[1].keywords + " menace" },
    { ...en.capabilities[2], name: "Réponse aux incidents", approach: "Escalade niveau 2 : investigation, éradication et revues post-incident", tools: "Defender XDR, SOAR, procédures", outcome: "Des actions correctives pour que l’incident ne se reproduise pas", keywords: en.capabilities[2].keywords + " réponse incident" },
    { ...en.capabilities[3], name: "Gestion des vulnérabilités", approach: "Scanner, prioriser les CVE par CVSS, exploitabilité et impact métier, suivre les correctifs", outcome: "Délai de correction réduit de 30 %", keywords: en.capabilities[3].keywords + " vulnérabilité correctif" },
    { ...en.capabilities[4], name: "Sécurité cloud Azure", approach: "Sécuriser Azure avec NSG, Key Vault, Azure Policy et landing zones", outcome: "Des environnements cloud gouvernés, au moindre privilège" },
    { ...en.capabilities[5], name: "Identité & Zero Trust", approach: "Accès conditionnel, PIM, RBAC, MFA et contrôle des accès à privilèges", tools: "Entra ID, accès conditionnel, PIM", outcome: "Aucune confiance implicite, privilèges retirés le jour même", keywords: en.capabilities[5].keywords + " identité accès" },
    { ...en.capabilities[6], name: "Sécurité des postes", approach: "Déployer Defender for Endpoint et la conformité Intune avec des bases de durcissement", outcome: "Postes Windows et Linux durcis sur plusieurs tenants", keywords: en.capabilities[6].keywords + " poste durcissement" },
    { ...en.capabilities[7], name: "Sécurité réseau & pare-feu", approach: "Enquêter sur les événements et optimiser règles et profils de sécurité", outcome: "Une meilleure détection avec moins de bruit", keywords: en.capabilities[7].keywords + " réseau pare-feu" },
    { ...en.capabilities[8], name: "Automatisation de la sécurité", approach: "Créer des workflows Logic Apps et SOAR, écrire du PowerShell et du Python", outcome: "Une détection et une réponse plus rapides et reproductibles", keywords: en.capabilities[8].keywords + " automatisation" },
    { ...en.capabilities[9], name: "Conformité & GRC", approach: "Mettre en place et valider des contrôles alignés sur les référentiels, collecter les preuves", outcome: "Des preuves prêtes pour l’audit", keywords: en.capabilities[9].keywords + " conformité audit preuve" },
    { ...en.capabilities[10], name: "Protection des données", approach: "Configurer les politiques DLP, les étiquettes de confidentialité et la rétention", outcome: "Données sensibles classées et protégées", keywords: en.capabilities[10].keywords + " données" },
    { ...en.capabilities[11], name: "Renseignement sur les menaces", approach: "Analyser des données de menace multi-sources, informer la direction et les équipes", tools: "OSINT, flux CTI, Cyber Kill Chain", outcome: "Des risques et des mesures clairs pour les décideurs", keywords: en.capabilities[11].keywords + " renseignement rapport direction" },
    { ...en.capabilities[12], approach: "Construire et mettre en ligne des applications web avec Claude Code et ChatGPT", outcome: "Trois sites en production" },
  ],
  jobs: [
    {
      ...en.jobs[0],
      title: "Développeur de sites web & SaaS (vibe coding)",
      company: "Indépendant · StokNextra, SongFromWithin",
      location: "À distance",
      dates: "Sept. 2026 – aujourd’hui",
      bullets: [
        "Conçois, construis et mets en ligne des sites web et des plateformes SaaS avec Claude Code et ChatGPT : StokNextra (117 commits) et SongFromWithin (94 commits), ainsi que ce portfolio.",
        "Développe des applications full-stack avec Next.js, React, NestJS, PostgreSQL, Supabase et Stripe, déployées sur Vercel et Docker.",
        "Applique la sécurité dès la conception : isolation des tenants, RBAC, hachage Argon2, politique CSP stricte et aucun secret dans le code.",
      ],
    },
    {
      ...en.jobs[1],
      title: "Analyste en opérations de sécurité & Threat Hunter",
      client: "Client : Metropolitan Water District of Southern California (infrastructure critique, USA)",
      dates: "Mars 2025 – aujourd’hui",
      bullets: [
        "Surveillé et trié les alertes de sécurité issues des SIEM d’environnements critiques ; escaladé les incidents confirmés et coordonné le confinement avec les équipes internes et les partenaires MDR.",
        "Assuré le support d’escalade niveau 2 : coordination de l’investigation, de l’éradication et des revues post-incident pour mettre en place des actions correctives.",
        "Construit et maintenu des automatisations de sécurité avec Logic Apps et des workflows SOAR, et rédigé les procédures de tri des alertes et de réponse aux incidents.",
        "Enquêté sur les événements avec Palo Alto Panorama (analyse de logs, validation des menaces, escalade) et optimisé les règles de pare-feu pour réduire le bruit.",
        "Mené des campagnes de threat hunting à partir des TTP adverses et des indicateurs d’attaque, avec KQL et des flux CTI ouverts et privés.",
        "Rédigé des rapports de renseignement et présenté risques techniques et mesures d’atténuation à la direction et aux équipes transverses.",
      ],
    },
    {
      ...en.jobs[2],
      title: "Analyste en gestion des vulnérabilités (astreinte)",
      location: "Atlanta, GA (à distance)",
      dates: "Juin 2023 – mars 2025",
      bullets: [
        "Réalisé des évaluations de vulnérabilités de bout en bout avec Tenable Nessus et Qualys ; géré le déploiement des agents, la configuration et le suivi des scans en multi-tenant.",
        "Priorisé les CVE selon le CVSS, l’exploitabilité et l’impact métier, réduisant de 30 % le délai de correction tout en restant aligné sur les CIS Benchmarks.",
        "Mis en place et validé des contrôles techniques alignés sur NIST CSF et SOC 2, avec collecte des preuves pour les équipes GRC.",
        "Présenté rapports de vulnérabilités et recommandations à la DSI et à la direction ; appuyé la réponse aux incidents par l’analyse des causes racines.",
      ],
    },
    {
      ...en.jobs[3],
      title: "Administrateur système | Analyste support niveau 2",
      location: "Allentown, PA (à distance)",
      dates: "Mai 2021 – févr. 2025",
      bullets: [
        "Déployé et maintenu Microsoft Defender for Endpoint et les politiques de conformité Intune avec des bases de durcissement sur Windows et Linux.",
        "Administré Entra ID (accès conditionnel, PIM, RBAC, inscriptions d’applications), Intune et Exchange pour plus de 500 utilisateurs sur plusieurs tenants.",
        "Configuré les contrôles de sécurité Azure (NSG, Key Vault, Azure Policy) et imposé la MFA et le contrôle des accès à privilèges.",
        "Configuré Microsoft Purview (DLP, étiquettes, rétention) ; automatisé les arrivées et départs en PowerShell pour retirer les privilèges le jour même.",
      ],
    },
    {
      ...en.jobs[4],
      title: "Ingénieur cloud Azure (stage & projets de lab)",
      company: "Lab Azure pratique",
      location: "À distance",
      dates: "Lab & projets",
      bullets: [
        "Conçu et déployé des landing zones Azure avec Azure Policy, RBAC, réseau et stockage.",
        "Automatisé le provisionnement et les correctifs des VM avec Azure PowerShell et ARM/Bicep ; validé sauvegarde, reprise après sinistre et supervision.",
      ],
    },
  ],
  toolbox: [
    { icon: "siem", label: "SIEM & XDR", items: toolItems.siem },
    { icon: "vuln", label: "Gestion des vulnérabilités", items: toolItems.vuln },
    { icon: "network", label: "Réseau & Zero Trust", items: toolItems.network },
    { icon: "identity", label: "Identité, postes & données", items: toolItems.identity },
    { icon: "code", label: "Automatisation, IaC & requêtes", items: toolItems.code },
    { icon: "frameworks", label: "Référentiels & méthodes", items: toolItems.frameworks },
    { icon: "itsm", label: "ITSM & sensibilisation", items: toolItems.itsm },
  ],
  education: [
    { degree: "Master (M.S.) en cybersécurité & assurance de l’information", school: "Western Governors University (WGU)" },
    { degree: "Licence (B.S.) en cybersécurité & assurance de l’information", school: "Western Governors University (WGU)" },
    { degree: "Diplôme associé (A.S.) en cybersécurité", school: "Atlanta Technical College" },
  ],
  vibe: [
    { icon: "claude", name: "Claude Code", use: "Mon ingénieur IA dans le terminal et VS Code. Il planifie, écrit, teste et relit le code avec moi : chaque commit de mes SaaS est co-signé par Claude." },
    { icon: "chatgpt", name: "ChatGPT", use: "Idées, textes produit, recherche et prototypes rapides avant qu’une fonctionnalité passe au code." },
    { icon: "terraform", name: "Terraform", use: "L’infrastructure as code pour Azure : des environnements écrits, relus et reconstruits à l’identique." },
    { icon: "deploy", name: "GitHub, Vercel & Docker", use: "Versionnement, prévisualisations et déploiement en une commande : une idée arrive en production le jour même." },
  ],
  vibeStats: [
    { value: "3", label: "Sites en production" },
    { value: "211", label: "Commits co-signés avec Claude" },
    { value: "2026", label: "Tous construits cette année" },
  ],
  ventures: [
    {
      ...en.ventures[0],
      role: "Fondateur · construit avec Claude Code",
      period: "Oct. 2026 – aujourd’hui",
      summary:
        "Logiciel de caisse, de stock, de facturation et de comptabilité pour les commerces d’Afrique de l’Ouest et centrale. Il continue de vendre quand internet coupe et se synchronise au retour du réseau.",
      highlights: [
        "Architecture multi-tenant avec contrôle d’accès par rôle",
        "Caisse hors ligne avec scan de codes-barres et Mobile Money",
        "Analyses de stock en temps réel et alertes de rupture",
        "Factures par WhatsApp et comptabilité SYSCOHADA",
      ],
      security: "Isolation des tenants, RBAC, hachage Argon2 et sessions JWT signées.",
    },
    {
      ...en.ventures[1],
      role: "Fondateur · construit avec Claude Code",
      period: "Sept. 2026 – aujourd’hui",
      summary:
        "Une plateforme e-commerce audio qui transforme l’histoire d’un client en chanson personnalisée pour un grand moment. Le client valide les paroles avant de payer.",
      highlights: [
        "Paiements Stripe, prix en USD et en FCFA",
        "Paroles assistées par l’IA avec l’API Claude",
        "Suivi des commandes, espace client et e-mails automatiques",
        "Site bilingue avec suivi des erreurs",
      ],
      security: "Données de carte gérées uniquement par Stripe ; secrets côté serveur et erreurs surveillées.",
    },
    {
      ...en.ventures[2],
      name: "Ce site",
      role: "Construit avec Claude Code",
      period: "Nov. 2026",
      summary:
        "Ce portfolio bilingue, mon CV américain et une carte de visite numérique avec QR code, lien NFC, vCard et Google Wallet, construits avec Claude Code.",
      highlights: [
        "Politique CSP stricte avec nonce et en-têtes de sécurité",
        "Anglais et français, thèmes clair et sombre",
        "Carte de visite : QR, NFC, contact enregistré en un geste",
      ],
      security: "CSP stricte, HSTS, aucun secret dans le code, security.txt.",
      image: { ...en.ventures[2].image, alt: "Page d’accueil de ce portfolio : Haig Tientcheu, analyste SOC et threat hunter, sur fond bleu nuit et or" },
    },
  ],
  leadership: {
    paragraph:
      "En 2017, j’ai fondé The Way of Hope, une ONG internationale qui soutient les personnes vulnérables au Cameroun et au-delà : éducation, santé, formation professionnelle et familles touchées par des maladies rares. Je la dirige comme un programme de sécurité : des priorités claires, des comptes rendus honnêtes et des gens qui peuvent compter dessus.",
    facts: [
      { label: "Fondée en", value: "2017" },
      { label: "Basée au", value: "Cameroun, action internationale" },
      { label: "Rôle", value: "Fondateur & président" },
    ],
    lists: [
      {
        label: "Engagement",
        rows: [
          { name: "The Way of Hope", value: "Fondateur", href: links.wayofhope, logo: "/orgs/wayofhope-emblem.png" },
          { name: "Shield of Faith Charities International", detail: "Aide aux enfants dans le besoin, partout dans le monde", value: "Bénévole", href: links.shieldcharities, logo: "/orgs/shield-of-faith.png" },
        ],
      },
      {
        label: "Écriture",
        rows: [{ name: "Au-delà du voile", detail: "Discernement et leadership", value: "Auteur" }],
      },
    ],
    image: {
      src: "/work/wayofhope-supplies.jpg",
      alt: "Fournitures scolaires, sacs à dos et cahiers prêts à être distribués devant une banderole The Way of Hope / La Voie de l’Espoir",
    },
  },
  resume: {
    summary:
      "Professionnel de la cybersécurité : mise en place, gestion et surveillance de contrôles de sécurité sur Microsoft 365, Azure et des environnements hybrides. Expertise pratique de Microsoft Defender XDR, Entra ID, Intune, Palo Alto Panorama et Purview, avec un historique de durcissement des postes et de réglage des alertes. Certifié Azure, avec une expérience concrète de l’administration, de l’architecture, de l’identité, du réseau et de la sécurité cloud. Accompagnement de programmes NIST CSF, CIS Benchmarks, SOC 2 et GRC en environnement multi-tenant. Certification CCSP en préparation.",
    skills: [
      { label: "SIEM & XDR", items: toolItems.siem.join(", ") },
      { label: "Gestion des vulnérabilités", items: toolItems.vuln.join(", ") },
      { label: "Réseau & Zero Trust", items: toolItems.network.join(", ") },
      { label: "Identité, postes & données", items: toolItems.identity.join(", ") },
      { label: "Automatisation, IaC & requêtes", items: toolItems.code.join(", ") },
      { label: "Référentiels", items: toolItems.frameworks.join(", ") },
      { label: "ITSM & sensibilisation", items: toolItems.itsm.join(", ") },
    ],
    projects: [
      "StokNextra (stoknextra.com), oct. 2026 – aujourd’hui : SaaS multi-tenant de caisse, stock et comptabilité (Next.js, NestJS, PostgreSQL, Docker) construit avec Claude Code ; isolation des tenants, RBAC, hachage Argon2.",
      "SongFromWithin (songfromwithin.com), sept. 2026 – aujourd’hui : plateforme e-commerce audio (Next.js, Supabase, Stripe, API Claude) construite avec Claude Code ; cartes gérées uniquement par Stripe.",
      "Portfolio et carte de visite numérique, nov. 2026 : Next.js 16 avec une politique CSP stricte, construit avec Claude Code.",
    ],
    leadership: [
      "Fondateur & président, The Way of Hope (ONG internationale, Cameroun), depuis 2017",
      "Bénévole, Shield of Faith Charities International (aide aux enfants dans le besoin)",
    ],
  },
  vcardNote:
    "Analyste SOC & Threat Hunter (Defender XDR, Sentinel, KQL, Azure). Fondateur de SongFromWithin et StokNextra. Fondateur de The Way of Hope.",
};

export const profiles: Record<Locale, Profile> = { en, fr };

export function getProfile(locale: Locale) {
  return profiles[locale];
}
