import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { CARD_URL } from "@/config/site";

const PHOTO_FILE = path.join(process.cwd(), "public", "card", "photo.jpg");

// Business-card photo (never used on the resume). Returns null until Haig adds public/card/photo.jpg.
export function cardPhotoSrc(): string | null {
  return existsSync(PHOTO_FILE) ? "/card/photo.jpg" : null;
}

export function cardPhotoBase64(): string | null {
  return existsSync(PHOTO_FILE) ? readFileSync(PHOTO_FILE).toString("base64") : null;
}

// Vector QR code pointing at the card page; dark on white so every phone camera reads it.
export async function cardQrSvg(): Promise<string> {
  return QRCode.toString(CARD_URL, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#111111", light: "#ffffff" },
  });
}
