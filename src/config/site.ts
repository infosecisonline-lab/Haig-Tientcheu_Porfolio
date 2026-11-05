// One place for everything that changes between environments or must be confirmed by Haig.
// Values marked TO CONFIRM must be replaced before launch.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://haig-tientcheu.vercel.app").replace(/\/$/, "");

export const CARD_URL = `${SITE_URL}/card`;

export const contact = {
  // From Haig's resume (August 2026).
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "tchative@gmail.com",
  // Phone: set CONTACT_PHONE in Vercel (and .env.local); kept out of the public repository.
  // Used on the business card, the .vcf and the resume only, never on the main page.
  phone: process.env.CONTACT_PHONE ?? "",
  location: "Riverdale, GA",
  linkedin: "https://www.linkedin.com/in/haig-tientcheu-05377b106/",
};

export const links = {
  songfromwithin: "https://songfromwithin.com",
  stoknextra: "https://www.stoknextra.com",
  wayofhope: "https://www.thewayofhopeglobal.org",
  shieldcharities: "https://www.shieldcharities.org",
};

// Formspree form id (free plan). Create a form at https://formspree.io and paste its id here.
// Not a secret: the form endpoint is visible in every visitor's browser.
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xqppjgvr";

export const resumePdf = {
  en: "/resume/Haig-Tientcheu-Resume-EN.pdf",
  fr: "/resume/Haig-Tientcheu-CV-FR.pdf",
} as const;

export const vcardPath = "/haig-tientcheu.vcf";

export function googleWalletEnabled() {
  return Boolean(
    process.env.GOOGLE_WALLET_ISSUER_ID &&
      process.env.GOOGLE_WALLET_SA_EMAIL &&
      process.env.GOOGLE_WALLET_SA_PRIVATE_KEY,
  );
}
