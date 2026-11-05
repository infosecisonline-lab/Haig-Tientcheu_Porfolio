import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile } from "@/content/profile";
import { hasLocale } from "@/i18n/locales";

export const alt = "Haig Tientcheu — Cloud Security Engineer & SaaS Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const p = getProfile(hasLocale(lang) ? lang : "en");
  const [bold, medium] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/GeneralSans-Bold.ttf")),
    readFile(path.join(process.cwd(), "assets/GeneralSans-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "64px 72px",
          fontFamily: "General Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, fontWeight: 700, letterSpacing: -7, lineHeight: 0.86 }}>
          <span>Haig</span>
          <span>Tientcheu</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 34, fontWeight: 500 }}>
          <span style={{ maxWidth: 760 }}>{p.shortTitle}</span>
          <span style={{ background: "#1a4be0", color: "#ffffff", padding: "14px 22px", fontSize: 28 }}>
            Azure · Zero Trust · KQL
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "General Sans", data: bold, weight: 700, style: "normal" },
        { name: "General Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
