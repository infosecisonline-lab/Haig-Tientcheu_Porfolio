// Writes brand logos from the Simple Icons package (official brand colours) to public/logos/.
// Run: node scripts/build-logos.mjs
import * as si from "simple-icons";
import { writeFileSync, mkdirSync } from "node:fs";

const slugs = [
  "elastic", "paloaltonetworks", "qualys", "terraform", "python", "docker", "github", "vercel",
  "claude", "anthropic", "nextdotjs", "react", "stripe", "supabase", "postgresql", "nestjs",
  "tailwindcss", "typescript", "sentry", "linux", "turborepo", "drizzle", "resend",
];
mkdirSync("public/logos", { recursive: true });
const all = Object.values(si).filter((i) => i && i.slug);
for (const slug of slugs) {
  const icon = all.find((i) => i.slug === slug);
  if (!icon) { console.log("missing", slug); continue; }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  writeFileSync(`public/logos/${slug}.svg`, svg);
}
console.log("done");
