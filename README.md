# Haig Tientcheu — Portfolio, US Resume & Digital Business Card

Bilingual (English / French) portfolio of **Haig Tientcheu**, SOC Analyst & Threat Hunter (Cloud Security), with an ATS-friendly US resume and a digital business card (QR code, NFC link, one-tap vCard, Google Wallet).

**Live site:** https://haig-tientcheu.vercel.app

Built with [Claude Code](https://claude.com/claude-code) in November 2026.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS 4 · Fraunces + General Sans
- Hosted on Vercel · contact form via Formspree

## Security choices

- **Strict Content Security Policy** with a fresh nonce on every request (`src/proxy.ts`), no `unsafe-inline` for scripts.
- Security headers: HSTS (preload), `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP (`next.config.ts`).
- [`/.well-known/security.txt`](public/.well-known/security.txt) for vulnerability disclosure.
- No secrets in the repository: contact phone and Google Wallet keys come from environment variables; private documents are git-ignored.
- Self-hosted fonts, images and icons only (`img-src 'self'`), no third-party scripts or trackers.
- Contact form: client-side validation and a honeypot field against bots.

## Features

- English and French, light and dark themes, WCAG-minded markup (semantic HTML, skip link, focus states, reduced-motion support).
- Interactive "query my skills" console written as a KQL-style query.
- Digital business card: vector QR code, `/card` page for NFC tags, downloadable `.vcf`, optional Google Wallet pass.
- Resume pages rendered to PDF (US Letter) with Playwright, ligatures disabled for ATS parsing.
- Animated African cloth patterns (kente, ndop, toghu, wax, bogolan) drawn in code.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run build && npm start` | Production build |
| `npm run pdf` | Resume PDFs (site running on port 3000) |
| `npm run docx` | Editable Word resumes (.docx), EN + FR, from the same content |
| `npm run check` | Browser smoke test: console errors and CSP violations |

## Credits

- 3D icons: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT, see `public/icons/3d/LICENSE.txt`).
- Certification badges: official Microsoft Learn and Credly (CompTIA, ISC2) badges, displayed by the credential holder.
- Brand logos: [Simple Icons](https://simpleicons.org) (CC0) and Wikimedia Commons. Trademarks belong to their owners and are used only to name the tools.

## Rights

© 2026 Haig Tientcheu. All rights reserved. The code is public to read; the content (text, photo, resume) may not be reused without permission.
