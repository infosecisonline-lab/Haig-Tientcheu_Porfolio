import Image from "next/image";

// Visual vocabulary of the site, all self-hosted (CSP img-src 'self'):
// - 3D activity icons: Microsoft Fluent Emoji 3D (MIT licence) in /icons/3d/
// - Certification badges: the official Microsoft Learn and Credly (CompTIA, ISC2) badges in /badges/
// - Brand logos: Simple Icons (CC0) + Wikimedia Commons in /logos/
const SRC = {
  // security domains (3D)
  soc: "/icons/3d/soc.png", // desktop monitor
  hunt: "/icons/3d/hunt.png", // detective with magnifier
  vuln: "/icons/3d/vuln.png", // bug
  ir: "/icons/3d/ir.png", // siren
  cloud: "/icons/3d/cloud.png",
  engineering: "/icons/3d/engineering.png", // shield
  identity: "/icons/3d/identity.png", // key
  endpoint: "/icons/3d/endpoint.png", // laptop
  network: "/icons/3d/network.png", // brick wall = firewall
  automation: "/icons/3d/automation.png", // robot
  grc: "/icons/3d/grc.png", // clipboard
  data: "/icons/3d/data.png", // padlock
  cti: "/icons/3d/cti.png", // bullseye
  siem: "/icons/3d/siem.png", // satellite antenna
  code: "/icons/3d/code.png", // keyboard
  itsm: "/icons/3d/itsm.png", // ticket
  frameworks: "/icons/3d/frameworks.png", // books
  // jobs & facts
  sysadmin: "/icons/3d/sysadmin.png",
  lab: "/icons/3d/lab.png",
  location: "/icons/3d/location.png",
  clearance: "/icons/3d/clearance.png",
  relocate: "/icons/3d/relocate.png",
  degree: "/icons/3d/degree.png",
  ngo: "/icons/3d/ngo.png",
  volunteer: "/icons/3d/volunteer.png",
  book: "/icons/3d/book.png",
  globe: "/icons/3d/globe.png",
  // vibe coding
  ai: "/icons/3d/ai.png",
  deploy: "/icons/3d/deploy.png",
  claude: "/logos/claude.svg",
  chatgpt: "/logos/chatgpt.svg",
  terraform: "/logos/terraform.svg",
  // official certification badges
  azure: "/badges/ms-expert.svg",
  server: "/badges/ms-associate.svg",
  securityx: "/badges/securityx.png",
  pentest: "/badges/pentest.png",
  cysa: "/badges/cysa.png",
  secplus: "/badges/secplus.png",
  netplus: "/badges/netplus.png",
  project: "/badges/project.png",
  sscp: "/badges/sscp.png",
  award: "/icons/3d/medal.png",
} as const;

export type IconKey = keyof typeof SRC;

export function Icon({ name, size = 24, className = "" }: { name: IconKey; size?: number; className?: string }) {
  return (
    <Image
      src={SRC[name]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      unoptimized
      className={`inline-block shrink-0 object-contain ${className}`}
    />
  );
}

// Real brand logos for tools and stacks. `wordmark` logos already spell the name.
const LOGOS: { match: RegExp; src: string; wordmark?: boolean }[] = [
  { match: /^entra id/i, src: "/logos/entra.svg" },
  { match: /sentinel|defender|intune|sccm|purview|^ms /i, src: "/logos/microsoft.svg" },
  { match: /^(azure|bicep|arm|logic apps|kql)/i, src: "/logos/azure.svg" },
  { match: /^crowdstrike/i, src: "/logos/crowdstrike.svg", wordmark: true },
  { match: /^servicenow/i, src: "/logos/servicenow.svg", wordmark: true },
  { match: /^elastic/i, src: "/logos/elastic.svg" },
  { match: /^qualys/i, src: "/logos/qualys.svg" },
  { match: /palo alto/i, src: "/logos/paloaltonetworks.svg" },
  { match: /^powershell/i, src: "/logos/powershell.png" },
  { match: /^python/i, src: "/logos/python.svg" },
  { match: /^terraform/i, src: "/logos/terraform.svg" },
  { match: /^claude/i, src: "/logos/claude.svg" },
  { match: /^chatgpt/i, src: "/logos/chatgpt.svg" },
  { match: /^next\.?js/i, src: "/logos/nextdotjs.svg" },
  { match: /^react/i, src: "/logos/react.svg" },
  { match: /^nestjs/i, src: "/logos/nestjs.svg" },
  { match: /^postgresql/i, src: "/logos/postgresql.svg" },
  { match: /^drizzle/i, src: "/logos/drizzle.svg" },
  { match: /^docker/i, src: "/logos/docker.svg" },
  { match: /^turborepo/i, src: "/logos/turborepo.svg" },
  { match: /^supabase/i, src: "/logos/supabase.svg" },
  { match: /^stripe/i, src: "/logos/stripe.svg" },
  { match: /^resend/i, src: "/logos/resend.svg" },
  { match: /^sentry/i, src: "/logos/sentry.svg" },
  { match: /^vercel/i, src: "/logos/vercel.svg" },
  { match: /^typescript/i, src: "/logos/typescript.svg" },
  { match: /^tailwind/i, src: "/logos/tailwindcss.svg" },
  { match: /^github/i, src: "/logos/github.svg" },
  { match: /^linux/i, src: "/logos/linux.svg" },
];

export function logoFor(name: string) {
  return LOGOS.find((l) => l.match.test(name.trim()));
}

// A tool name with its real logo when one exists.
export function ToolChip({ name, dark = false }: { name: string; dark?: boolean }) {
  const logo = logoFor(name);
  const base = dark
    ? "border-white/10 bg-white/[0.06] text-[#e6eaf2]"
    : "border-line bg-surface-2 text-ink";
  return (
    <span className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-2.5 py-1 text-[0.8125rem] font-medium ${base}`}>
      {logo ? (
        <span className={`grid h-6 place-items-center rounded-full bg-white ${logo.wordmark ? "px-2" : "w-6"}`}>
          <Image
            src={logo.src}
            alt={logo.wordmark ? name : ""}
            aria-hidden={!logo.wordmark}
            width={logo.wordmark ? 64 : 15}
            height={15}
            unoptimized
            className={logo.wordmark ? "h-3 w-auto" : "h-[15px] w-[15px] object-contain"}
          />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
      )}
      {logo?.wordmark ? <span className="sr-only">{name}</span> : name}
    </span>
  );
}
