import { createSign } from "node:crypto";
import { CARD_URL, SITE_URL, contact, googleWalletEnabled } from "@/config/site";
import { getProfile } from "@/content/profile";

// GET /api/wallet/google?lang=fr → redirects to "Save to Google Wallet" with a signed Generic pass.
// Needs three Vercel environment variables (never committed):
//   GOOGLE_WALLET_ISSUER_ID, GOOGLE_WALLET_SA_EMAIL, GOOGLE_WALLET_SA_PRIVATE_KEY

const b64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

function signJwt(payload: object, privateKey: string) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${body}`);
  return `${header}.${body}.${signer.sign(privateKey).toString("base64url")}`;
}

const text = (language: string, value: string) => ({ defaultValue: { language, value } });

export function GET(request: Request) {
  if (!googleWalletEnabled()) {
    return Response.json({ error: "Google Wallet is not configured." }, { status: 404 });
  }

  const lang = new URL(request.url).searchParams.get("lang") === "fr" ? "fr" : "en";
  const language = lang === "fr" ? "fr-FR" : "en-US";
  const p = getProfile(lang);
  const issuer = process.env.GOOGLE_WALLET_ISSUER_ID!;
  const classId = `${issuer}.haig_tientcheu_card`;

  const genericObject = {
    id: `${issuer}.haig_tientcheu_card_${lang}_v1`,
    classId,
    state: "ACTIVE",
    cardTitle: text(language, "Haig Tientcheu"),
    header: text(language, p.name),
    subheader: text(language, p.shortTitle),
    hexBackgroundColor: "#111111",
    logo: {
      sourceUri: { uri: `${SITE_URL}/icon-512.png` },
      contentDescription: text(language, "HT"),
    },
    barcode: { type: "QR_CODE", value: CARD_URL, alternateText: CARD_URL.replace(/^https:\/\//, "") },
    textModulesData: [
      { id: "email", header: "Email", body: contact.email },
      ...(contact.phone ? [{ id: "phone", header: lang === "fr" ? "Téléphone" : "Phone", body: contact.phone }] : []),
    ],
    linksModuleData: {
      uris: [
        { id: "site", uri: `${SITE_URL}/${lang}`, description: "Portfolio" },
        { id: "linkedin", uri: contact.linkedin, description: "LinkedIn" },
        { id: "mail", uri: `mailto:${contact.email}`, description: "Email" },
      ],
    },
  };

  const jwt = signJwt(
    {
      iss: process.env.GOOGLE_WALLET_SA_EMAIL,
      aud: "google",
      typ: "savetowallet",
      iat: Math.floor(Date.now() / 1000),
      origins: [SITE_URL],
      payload: { genericClasses: [{ id: classId }], genericObjects: [genericObject] },
    },
    process.env.GOOGLE_WALLET_SA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  );

  return Response.redirect(`https://pay.google.com/gp/v/save/${jwt}`, 302);
}
