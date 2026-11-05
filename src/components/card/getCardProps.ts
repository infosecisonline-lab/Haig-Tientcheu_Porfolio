import "server-only";
import { CARD_URL, SITE_URL, contact, googleWalletEnabled, vcardPath } from "@/config/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { cardPhotoSrc, cardQrSvg } from "@/lib/card-data";
import type { CardProps } from "./CardView";

export async function getCardProps(lang: Locale, asPage = false): Promise<CardProps> {
  const p = getProfile(lang);
  return {
    t: getDictionary(lang).card,
    name: p.name,
    title: p.shortTitle,
    email: contact.email,
    phone: contact.phone,
    linkedin: contact.linkedin,
    siteUrl: `${SITE_URL}/${lang}`,
    cardUrl: CARD_URL,
    vcardHref: `${vcardPath}?lang=${lang}`,
    qrSvg: await cardQrSvg(),
    photoSrc: cardPhotoSrc(),
    walletEnabled: googleWalletEnabled(),
    walletHref: `/api/wallet/google?lang=${lang}`,
    asPage,
  };
}
