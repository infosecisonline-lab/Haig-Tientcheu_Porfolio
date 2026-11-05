import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { SITE_URL, contact, links } from "@/config/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { hasLocale, locales } from "@/i18n/locales";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

const generalSans = localFont({
  src: [
    { path: "../../fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = getProfile(lang);
  const title = `${p.name} — ${p.shortTitle}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${p.name}` },
    description: p.seoDescription,
    applicationName: p.name,
    authors: [{ name: p.name, url: SITE_URL }],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      firstName: p.firstName,
      lastName: p.lastName,
      title,
      description: p.seoDescription,
      url: `/${lang}`,
      siteName: p.name,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
    twitter: { card: "summary_large_image", title, description: p.seoDescription },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b1f3f" },
    { media: "(prefers-color-scheme: dark)", color: "#071226" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const p = getProfile(lang);
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.shortTitle,
    url: SITE_URL,
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin, links.songfromwithin, links.stoknextra, links.wayofhope],
    knowsAbout: p.toolbox.flatMap((g) => g.items),
    address: { "@type": "PostalAddress", addressLocality: "Riverdale", addressRegion: "GA", addressCountry: "US" },
    hasCredential: p.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Western Governors University" },
      { "@type": "CollegeOrUniversity", name: "Atlanta Technical College" },
    ],
    founder: [
      { "@type": "Organization", name: "SongFromWithin", url: links.songfromwithin },
      { "@type": "Organization", name: "StokNextra", url: links.stoknextra },
      { "@type": "NGO", name: "The Way of Hope", url: links.wayofhope, foundingDate: "2017" },
    ],
  };

  return (
    <html lang={lang} className={`${generalSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          // JSON-LD only contains our own static data; "<" is escaped so it cannot close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange nonce={nonce}>
          {children}
        </ThemeProvider>
        <RevealOnScroll />
      </body>
    </html>
  );
}
