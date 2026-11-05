"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Globe, Mail, Phone, Share2, UserPlus, Wallet } from "lucide-react";
import { LinkedInIcon } from "@/components/layout/LinkedInIcon";
import type { Dictionary } from "@/i18n/dictionary";

export type CardProps = {
  t: Dictionary["card"];
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  siteUrl: string;
  cardUrl: string;
  vcardHref: string;
  qrSvg: string;
  photoSrc: string | null;
  walletEnabled: boolean;
  walletHref: string;
  asPage?: boolean;
};

const subscribe = () => () => {};

export function CardView(props: CardProps) {
  const { t, name, title, email, phone, linkedin, siteUrl, cardUrl, vcardHref, qrSvg, photoSrc, walletEnabled, walletHref, asPage } = props;
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(
    subscribe,
    () => typeof navigator !== "undefined" && "share" in navigator,
    () => false,
  );
  const Heading = asPage ? "h1" : "h2";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(cardUrl);
    } catch {
      window.prompt(t.copy, cardUrl);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  async function share() {
    try {
      await navigator.share({ title: name, text: title, url: cardUrl });
    } catch {
      /* the visitor closed the share sheet */
    }
  }

  return (
    <div className="bcard">
      <div className="bcard-head on-navy navy-glow">
        <div className="bcard-photo">
          {photoSrc ? <Image src={photoSrc} alt={name} fill sizes="72px" /> : <span aria-hidden>HT</span>}
        </div>
        <div>
          <Heading id="card-title" className="bcard-name">{name}</Heading>
          <p className="bcard-role">{title}</p>
        </div>
      </div>

      <div className="bcard-qr" role="img" aria-label={t.scan}>
        {/* SVG generated on the server by the qrcode library from a constant URL */}
        <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
      </div>
      <p className="bcard-caption">{t.scan}</p>

      <div className="bcard-actions">
        <a className="btn btn-gold" href={vcardHref} download="Haig-Tientcheu.vcf">
          <UserPlus size={19} aria-hidden /> {t.save}
        </a>
        <button type="button" className="btn btn-outline" onClick={copyLink} aria-live="polite">
          {copied ? <Check size={19} aria-hidden /> : <Copy size={19} aria-hidden />} {copied ? t.copied : t.copy}
        </button>
        {canShare && (
          <button type="button" className="btn btn-outline" onClick={share}>
            <Share2 size={19} aria-hidden /> {t.share}
          </button>
        )}
        {walletEnabled && (
          <a className="btn btn-navy" href={walletHref} rel="nofollow">
            <Wallet size={19} aria-hidden /> {t.wallet}
          </a>
        )}
      </div>

      <ul className="bcard-contact">
        <li><a href={`mailto:${email}`}><Mail size={17} aria-hidden className="text-gold-ink" />{email}</a></li>
        {phone && (
          <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`}><Phone size={17} aria-hidden className="text-gold-ink" />{phone}</a></li>
        )}
        <li><a href={linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={16} className="text-gold-ink" />LinkedIn</a></li>
        <li><a href={siteUrl}><Globe size={17} aria-hidden className="text-gold-ink" />{t.site}</a></li>
      </ul>
    </div>
  );
}
