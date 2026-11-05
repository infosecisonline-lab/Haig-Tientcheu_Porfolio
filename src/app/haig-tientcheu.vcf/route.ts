import { getProfile } from "@/content/profile";
import { hasLocale } from "@/i18n/locales";
import { buildVCard } from "@/lib/vcard";
import { cardPhotoBase64 } from "@/lib/card-data";

// GET /haig-tientcheu.vcf?lang=fr → contact file for iPhone / Android "Add to contacts".
export function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang") ?? "en";
  const profile = getProfile(hasLocale(lang) ? lang : "en");
  const body = buildVCard(profile, cardPhotoBase64());
  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Haig-Tientcheu.vcf"',
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
