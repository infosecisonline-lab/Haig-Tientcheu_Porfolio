import { notFound } from "next/navigation";
import { resumeFiles } from "@/config/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { hasLocale } from "@/i18n/locales";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { OpenTo } from "@/components/home/OpenTo";
import { Expertise } from "@/components/home/Expertise";
import { Projects } from "@/components/home/Projects";
import { Experience } from "@/components/home/Experience";
import { Credentials } from "@/components/home/Credentials";
import { Toolbox } from "@/components/home/Toolbox";
import { Impact } from "@/components/home/Impact";
import { ContactSection } from "@/components/home/ContactSection";
import { CardModal } from "@/components/card/CardModal";
import { getCardProps } from "@/components/card/getCardProps";

// Order follows how a recruiter reads: who → security expertise → track record → tools → credentials → builds → person → contact.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const p = getProfile(lang);
  const t = getDictionary(lang);
  const card = await getCardProps(lang);
  const resume = resumeFiles[lang];
  const cardHref = `/${lang}/card`;

  return (
    <>
      <SiteHeader lang={lang} t={t} resume={resume} />
      <main id="main">
        <Hero p={p} t={t} resume={resume} cardHref={cardHref} />
        <OpenTo p={p} t={t} />
        <About p={p} t={t} resume={resume} cardHref={cardHref} />
        <Expertise p={p} t={t} />
        <Experience p={p} t={t} resume={resume} />
        <Toolbox p={p} t={t} />
        <Credentials p={p} t={t} />
        <Projects p={p} t={t} />
        <Impact p={p} t={t} />
        <ContactSection t={t} card={card} cardHref={cardHref} />
      </main>
      <Footer lang={lang} />
      <CardModal card={card} fabLabel={t.card.open} />
    </>
  );
}
