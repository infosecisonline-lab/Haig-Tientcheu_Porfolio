import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n/locales";

// Social share card (LinkedIn, WhatsApp, X, iMessage…): 1200 × 627, LinkedIn's recommended size.
export const alt = "Haig Tientcheu — SOC Analyst & Threat Hunter · Cloud Security. Interactive Portfolio & US Resume";
export const size = { width: 1200, height: 627 };
export const contentType = "image/png";

const COPY = {
  en: {
    open: "Open to work · Remote or hybrid",
    title: "SOC Analyst & Threat Hunter",
    sub: "Cloud Security · Vulnerability Management · Incident Response",
    certs: "9 certifications · Microsoft · CompTIA · ISC2",
    founder: "Founder & builder",
    stok: "Till, stock & accounting",
    sfw: "Personalised songs",
    sites: "sites live",
    commits: "commits with Claude Code",
    banner: "Interactive Portfolio & US Resume",
  },
  fr: {
    open: "Disponible · Télétravail ou hybride",
    title: "Analyste SOC & Threat Hunter",
    sub: "Sécurité cloud · Vulnérabilités · Réponse aux incidents",
    certs: "9 certifications · Microsoft · CompTIA · ISC2",
    founder: "Fondateur & bâtisseur",
    stok: "Caisse, stock & comptabilité",
    sfw: "Chansons personnalisées",
    sites: "sites en ligne",
    commits: "commits avec Claude Code",
    banner: "Portfolio interactif & CV américain",
  },
} as const;

const BADGES = ["ms-expert", "ms-associate", "securityx", "cysa", "pentest", "sscp"] as const;

async function dataUri(file: string) {
  const buf = await readFile(path.join(process.cwd(), "assets/og", file));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = COPY[hasLocale(lang) ? lang : "en"];

  const [bold, medium, fraunces, kente, stok, sfw, ...badges] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/GeneralSans-Bold.ttf")),
    readFile(path.join(process.cwd(), "assets/GeneralSans-Medium.ttf")),
    readFile(path.join(process.cwd(), "assets/og/Fraunces-SemiBold.woff")),
    dataUri("kente.png"),
    dataUri("stoknextra.png"),
    dataUri("songfromwithin.png"),
    ...BADGES.map((b) => dataUri(`${b}.png`)),
  ]);

  const gold = "#e2be66";
  const ivory = "#f8f4ea";
  const muted = "#9fb0cc";

  const saas = [
    { name: "StokNextra", line: c.stok, logo: stok, tile: "#06142e" },
    { name: "SongFromWithin", line: c.sfw, logo: sfw, tile: "#ffffff" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0b1f3f",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(212,168,71,0.30), rgba(11,31,63,0) 42%), radial-gradient(circle at 0% 100%, rgba(59,130,246,0.22), rgba(11,31,63,0) 48%)",
          fontFamily: "General Sans",
          color: ivory,
        }}
      >
        {/* Body */}
        <div style={{ display: "flex", flex: 1, padding: "44px 60px 30px 60px", justifyContent: "space-between" }}>
          {/* Left: identity */}
          <div style={{ display: "flex", flexDirection: "column", width: 690 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  backgroundColor: "#d4a847",
                  color: "#071226",
                  fontFamily: "Fraunces",
                  fontSize: 22,
                }}
              >
                HT
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 16,
                  padding: "7px 16px",
                  borderRadius: 999,
                  backgroundColor: "rgba(16,185,129,0.16)",
                  border: "1.5px solid rgba(52,211,153,0.55)",
                  color: "#6ee7b7",
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#34d399", marginRight: 10 }} />
                {c.open}
              </div>
            </div>

            <div style={{ display: "flex", marginTop: 26, fontFamily: "Fraunces", fontSize: 82, lineHeight: 1, letterSpacing: -2 }}>
              Haig Tientcheu
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 36, fontWeight: 700, color: gold, letterSpacing: -0.5 }}>{c.title}</div>
            <div style={{ display: "flex", marginTop: 8, fontSize: 21, fontWeight: 500, color: "#c9d1e0" }}>{c.sub}</div>

            <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              {badges.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by next/og, not a page image
                <img key={BADGES[i]} src={src} width={84} height={84} style={{ marginRight: 14, objectFit: "contain" }} alt="" />
              ))}
            </div>
            <div style={{ display: "flex", marginTop: 12, fontSize: 18, fontWeight: 500, color: muted }}>{c.certs}</div>
          </div>

          {/* Right: SaaS brands */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 380,
              padding: "24px 24px 20px 24px",
              borderRadius: 28,
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div style={{ display: "flex", fontSize: 16, fontWeight: 700, color: gold, letterSpacing: 2.5, textTransform: "uppercase" }}>
              {c.founder}
            </div>
            {saas.map((s) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 104,
                    height: 104,
                    borderRadius: 22,
                    backgroundColor: s.tile,
                    border: "2px solid rgba(212,168,71,0.55)",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by next/og */}
                  <img src={s.logo} width={s.tile === "#ffffff" ? 88 : 104} height={s.tile === "#ffffff" ? 70 : 104} style={{ objectFit: "contain" }} alt="" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: 18, width: 210 }}>
                  <div style={{ display: "flex", fontSize: 27, fontWeight: 700, color: ivory }}>{s.name}</div>
                  <div style={{ display: "flex", marginTop: 4, fontSize: 16, fontWeight: 500, color: muted, lineHeight: 1.25 }}>{s.line}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", marginTop: "auto", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", width: 120 }}>
                <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 34, color: gold, lineHeight: 1 }}>3</div>
                <div style={{ display: "flex", marginTop: 4, fontSize: 15, fontWeight: 500, color: muted }}>{c.sites}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 34, color: gold, lineHeight: 1 }}>211</div>
                <div style={{ display: "flex", marginTop: 4, fontSize: 15, fontWeight: 500, color: "#e8a07f" }}>{c.commits}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by next/og */}
        <img src={kente} width={1200} height={14} alt="" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 86,
            padding: "0 60px",
            backgroundColor: "#071226",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700, color: ivory }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: "#d4a847", marginRight: 16 }} />
            {c.banner}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 500, color: muted }}>
            <div
              style={{
                display: "flex",
                padding: "5px 12px",
                borderRadius: 999,
                border: "1.5px solid rgba(212,168,71,0.6)",
                color: gold,
                marginRight: 16,
                fontWeight: 700,
              }}
            >
              EN · FR
            </div>
            haig-tientcheu.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "General Sans", data: bold, weight: 700, style: "normal" },
        { name: "General Sans", data: medium, weight: 500, style: "normal" },
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      ],
    },
  );
}
