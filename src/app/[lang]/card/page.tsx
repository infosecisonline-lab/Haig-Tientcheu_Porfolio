import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardView } from "@/components/card/CardView";
import { getCardProps } from "@/components/card/getCardProps";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { resumePdf } from "@/config/site";
import { getDictionary } from "@/i18n/dictionary";
import { hasLocale } from "@/i18n/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/card">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDictionary(lang).card.title,
    alternates: { canonical: `/${lang}/card`, languages: { en: "/en/card", fr: "/fr/card" } },
  };
}

// Target of the NFC tag and the QR code: https://haig-tientcheu.vercel.app/card
export default async function CardPage({ params }: PageProps<"/[lang]/card">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const card = await getCardProps(lang, true);
  return (
    <>
      <SiteHeader lang={lang} t={getDictionary(lang)} resumeHref={resumePdf[lang]} solid />
      <main id="main" className="card-page navy-grid relative">
        <div className="card-shell">
          <CardView {...card} />
        </div>
      </main>
    </>
  );
}
