import { SITE_URL, contact, links } from "@/config/site";
import type { Profile } from "@/content/profile";

// vCard 3.0: the version iPhone and Android contacts both import reliably.

function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

// Lines longer than 75 octets are folded with CRLF + space (RFC 2425).
function fold(line: string) {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += 74) parts.push(line.slice(i, i + 74));
  return parts.join("\r\n ");
}

export function buildVCard(p: Profile, photoBase64?: string | null) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(p.lastName)};${esc(p.firstName)};;;`,
    `FN:${esc(p.name)}`,
    `TITLE:${esc(p.shortTitle)}`,
    `EMAIL;TYPE=INTERNET,PREF:${contact.email}`,
    `item1.URL:${SITE_URL}`,
    "item1.X-ABLabel:Portfolio",
    `item2.URL:${contact.linkedin}`,
    "item2.X-ABLabel:LinkedIn",
    `item3.URL:${links.songfromwithin}`,
    "item3.X-ABLabel:SongFromWithin",
    `item4.URL:${links.stoknextra}`,
    "item4.X-ABLabel:StokNextra",
    `item5.URL:${links.wayofhope}`,
    "item5.X-ABLabel:The Way of Hope",
    `X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}`,
    `NOTE:${esc(p.vcardNote)}`,
  ];
  if (contact.phone) lines.splice(5, 0, `TEL;TYPE=CELL,VOICE:${contact.phone.replace(/[^\d+]/g, "")}`);
  if (photoBase64) lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`);
  lines.push(`REV:${new Date().toISOString().slice(0, 10)}`, "END:VCARD");
  return lines.map(fold).join("\r\n") + "\r\n";
}
