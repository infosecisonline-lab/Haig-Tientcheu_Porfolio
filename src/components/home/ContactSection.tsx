import { Contact, Mail, UserPlus } from "lucide-react";
import { FORMSPREE_ID, contact } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import type { CardProps } from "@/components/card/CardView";
import { CardTrigger } from "@/components/card/CardTrigger";
import { LinkedInIcon } from "@/components/layout/LinkedInIcon";
import { SectionHead } from "./SectionHead";
import { ContactForm } from "./ContactForm";

export function ContactSection({ t, card, cardHref }: { t: Dictionary; card: CardProps; cardHref: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-surface-2/60 dark:bg-navy-950/40">
      <div className="container-x">
        <SectionHead id="contact-title" center {...t.sections.contact} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div data-reveal>
            <ContactForm t={t.contact} formspreeId={FORMSPREE_ID} />
          </div>

          <aside className="grid gap-6" data-reveal style={{ ["--d" as string]: "120ms" }}>
            {/* Business card teaser */}
            <div className="on-navy navy-glow overflow-hidden rounded-[20px] p-6 sm:p-7">
              <p className="kicker">{t.contact.cardTitle}</p>
              <div className="mt-5 flex items-center gap-5">
                {/* SVG generated on the server by the qrcode library from a constant URL */}
                <div className="w-28 shrink-0 rounded-xl bg-white p-2.5" role="img" aria-label={t.card.scan} dangerouslySetInnerHTML={{ __html: card.qrSvg }} />
                <p className="m-0 text-[0.98rem] text-[#d0d7e4]">{t.contact.cardText}</p>
              </div>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href={card.vcardHref} download="Haig-Tientcheu.vcf" className="btn btn-gold !px-4">
                  <UserPlus size={18} aria-hidden /> {t.card.save}
                </a>
                <CardTrigger href={cardHref} className="btn btn-ghost-light !px-4">
                  <Contact size={18} aria-hidden /> {t.card.open}
                </CardTrigger>
              </div>
            </div>

            {/* Direct links */}
            <div className="card p-6">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.08em] text-gold-ink">{t.contact.direct}</p>
              <ul className="mt-4 grid list-none gap-3 p-0">
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 font-medium text-ink no-underline hover:text-gold-ink">
                    <span className="icon-tile !h-10 !w-10"><Mail size={19} aria-hidden /></span>
                    <span className="min-w-0 break-all">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium text-ink no-underline hover:text-gold-ink">
                    <span className="icon-tile !h-10 !w-10"><LinkedInIcon size={18} /></span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
