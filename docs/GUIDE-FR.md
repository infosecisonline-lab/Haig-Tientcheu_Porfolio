# Haig Tientcheu — Portfolio, CV US et carte de visite numérique

Site bilingue (EN/FR) : portfolio sécurité cloud + SaaS, CV au format américain (page + PDF), carte de visite numérique (QR, NFC, .vcf, Google Wallet), formulaire de contact. Hébergement gratuit sur Vercel.

## Démarrer en local

```bash
npm install
npm run dev          # http://localhost:3000
```

Version de production en local : `npm run build` puis `npm start`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Textes du site et du CV (EN + FR) | `src/content/profile.ts` |
| E-mail, téléphone, ville, liens | `src/config/site.ts` (ou variables d'environnement, voir `.env.example`) |
| Textes de l'interface (boutons, menus) | `src/i18n/dictionary.ts` |
| Couleurs, typographie, mise en page | `src/app/globals.css` |
| Photo de la carte de visite | ajouter `public/card/photo.jpg` (carré, ≥ 600 px, < 100 Ko de préférence) |

Les éléments marqués `TO CONFIRM` / `À CONFIRMER` doivent être remplacés avant la mise en ligne.

## Régénérer les fichiers

| Commande | Effet |
|---|---|
| `npm run pdf` | CV PDF EN + FR dans `public/resume/` (le site doit tourner sur le port 3000) |
| `npm run docx` | CV Word modifiables (.docx) EN + FR dans `public/resume/`, même contenu que le PDF |
| `npm run federal` | CV fédéral USAJOBS **privé** dans `private/` (à partir de `private/federal.json`, voir `scripts/federal.template.json`) |
| `npm run capture` | Nouvelles captures d'écran + vidéo de SongFromWithin et StokNextra |
| `npm run icons` | Icônes « HT » |
| `npm run check` | Test navigateur : erreurs console / CSP + captures dans `.taste-skill/check/` |

Le dossier `private/` est exclu de Git : le CV fédéral (nationalité, adresse, téléphone) ne quitte jamais l'ordinateur.

## Mise en ligne sur Vercel (gratuit)

1. Créer un dépôt **privé** sur GitHub et y pousser ce dossier.
2. Sur [vercel.com](https://vercel.com) → *Add New Project* → importer le dépôt → nom du projet : `haig-tientcheu` (donne `haig-tientcheu.vercel.app`).
3. *Settings → Environment Variables* : ajouter les clés de `.env.example`.
4. Déployer. Chaque `git push` redéploie automatiquement.

### Formulaire de contact (Formspree, gratuit)

1. Créer un compte sur [formspree.io](https://formspree.io) → *New form*.
2. Copier l'identifiant du formulaire (ex. `xyzabcd`) dans `NEXT_PUBLIC_FORMSPREE_ID`.
3. Redéployer, puis envoyer un message test.

### Google Wallet (facultatif, gratuit)

1. [Google Pay & Wallet Console](https://pay.google.com/business/console) → créer un compte émetteur → noter l'**Issuer ID**.
2. [Google Cloud Console](https://console.cloud.google.com) → activer **Google Wallet API** → créer un **compte de service** → créer une clé JSON.
3. Dans la Wallet Console → *Users* → inviter l'e-mail du compte de service.
4. Dans Vercel : `GOOGLE_WALLET_ISSUER_ID`, `GOOGLE_WALLET_SA_EMAIL` (`client_email` du JSON), `GOOGLE_WALLET_SA_PRIVATE_KEY` (`private_key` du JSON).
5. Le bouton « Ajouter à Google Wallet » apparaît automatiquement. Tant que Google n'a pas accordé l'accès *Publishing*, seuls les comptes de test peuvent ajouter la carte.

### Puce NFC

Avec l'application gratuite **NFC Tools** : *Écrire* → *Ajouter un enregistrement* → *URL* → `https://haig-tientcheu.vercel.app/card` → approcher la puce. Le lien redirige vers la carte dans la langue du téléphone. Le bouton « Copier le lien NFC » de la carte copie cette même adresse.

## Sécurité

- CSP stricte avec nonce par requête (`src/proxy.ts`), sans `unsafe-inline` pour les scripts.
- En-têtes HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP, CORP (`next.config.ts`).
- `/.well-known/security.txt` (à renouveler avant le 5 novembre 2027).
- Aucun secret dans le code : tout passe par les variables d'environnement Vercel.
- Après la mise en ligne, vérifier sur [securityheaders.com](https://securityheaders.com) et [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory).
- Activer **Dependabot** sur le dépôt GitHub (*Settings → Code security*).

## Crédits visuels

- **Icônes 3D** (`public/icons/3d/`) : [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji), licence MIT (voir `LICENSE.txt` dans ce dossier).
- **Badges de certification** (`public/badges/`) : badges officiels Microsoft Learn et Credly (CompTIA, ISC2), affichés par le titulaire des certifications. Idéalement, relier chaque badge à sa page de vérification Credly.
- **Logos d'outils** (`public/logos/`) : [Simple Icons](https://simpleicons.org) (CC0) et Wikimedia Commons (ChatGPT, Microsoft, Azure, Entra ID, PowerShell, CrowdStrike, ServiceNow). Les marques appartiennent à leurs propriétaires ; elles servent uniquement à indiquer les outils utilisés.
- **Logos des ONG** (`public/orgs/`) : The Way of Hope (thewayofhopeglobal.org) et Shield of Faith Charities International (shieldcharities.org), repris de leurs sites officiels.
- **Pagnes africains animés** (`src/components/african/`) : repris du code de la page Afrique de SongFromWithin (motifs kente, ndop, wax, kuba, bogolan, toghu dessinés en code).
