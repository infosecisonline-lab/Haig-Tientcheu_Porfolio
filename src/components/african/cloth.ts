// Ported from Haig's SongFromWithin Africa page (apps/web/src/components/marketing/afrique/cloth.ts).
// Patterns inspired by cloths of West and Central Africa, drawn in code
// (no photographs of fabric are used). Each painter fills a horizontal strip
// whose motifs repeat evenly within CLOTH_LENGTH pixels, so strips can be
// tiled along a ribbon or an edge without a visible seam.

export const CLOTH_LENGTH = 480;

export type Cloth = "kente" | "ndop" | "kuba" | "wax" | "bogolan" | "toghu";

type Painter = (g: CanvasRenderingContext2D, w: number, h: number) => void;

const rect = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
  g.fillStyle = color;
  g.fillRect(x, y, w, h);
};
const dot = (g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
  g.fillStyle = color;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
};

// Kente-style weave (Ghana, Togo, Côte d'Ivoire): gold, green, red and black
// blocks with small bars inside.
const kente: Painter = (g, w, h) => {
  const colors = ["#f2b705", "#0b7a3b", "#c8102e", "#111111"];
  for (let x = 0, k = 0; x < w; x += 40, k++) {
    rect(g, x, 0, 40, h, colors[k % 4]!);
    const inner = colors[(k + 2) % 4]!;
    for (let y = h * 0.18; y < h * 0.82; y += h * 0.16) rect(g, x + 8, y, 24, h * 0.07, inner);
    rect(g, x + 38, 0, 2, h, "#111111");
  }
  rect(g, 0, 0, w, h * 0.08, "#111111");
  rect(g, 0, h * 0.92, w, h * 0.08, "#111111");
};

// Ndop (Bamileke country, West Cameroon): indigo with white lines, zigzags
// and dots.
const ndop: Painter = (g, w, h) => {
  rect(g, 0, 0, w, h, "#1b2a6b");
  g.strokeStyle = "#f4f1ea";
  g.lineWidth = Math.max(1.5, h * 0.06);
  g.beginPath();
  for (let x = 0; x <= w; x += 24) g.lineTo(x, x % 48 === 0 ? h * 0.3 : h * 0.7);
  g.stroke();
  for (let x = 12; x < w; x += 24) dot(g, x, x % 48 === 12 ? h * 0.78 : h * 0.22, h * 0.07, "#f4f1ea");
  rect(g, 0, h * 0.06, w, h * 0.05, "#f4f1ea");
  rect(g, 0, h * 0.89, w, h * 0.05, "#f4f1ea");
};

// Kuba cloth (Congo): raffia beige with dark interlocking diamonds.
const kuba: Painter = (g, w, h) => {
  rect(g, 0, 0, w, h, "#d8b483");
  g.strokeStyle = "#3a2214";
  g.lineWidth = Math.max(1.5, h * 0.07);
  for (let x = 0; x < w; x += 32) {
    g.beginPath();
    g.moveTo(x, h / 2);
    g.lineTo(x + 16, h * 0.15);
    g.lineTo(x + 32, h / 2);
    g.lineTo(x + 16, h * 0.85);
    g.closePath();
    g.stroke();
    rect(g, x + 13, h / 2 - h * 0.08, 6, h * 0.16, "#3a2214");
  }
  rect(g, 0, 0, w, h * 0.07, "#3a2214");
  rect(g, 0, h * 0.93, w, h * 0.07, "#3a2214");
};

// Wax print (the pagne worn across the region): teal with orange rings and
// yellow dots.
const wax: Painter = (g, w, h) => {
  rect(g, 0, 0, w, h, "#0e8a8c");
  for (let x = 20; x < w; x += 40) {
    dot(g, x, h / 2, h * 0.36, "#ff7a1a");
    dot(g, x, h / 2, h * 0.24, "#0e8a8c");
    dot(g, x, h / 2, h * 0.12, "#ffd23f");
    dot(g, x + 20, h * 0.2, h * 0.07, "#d4237a");
    dot(g, x + 20, h * 0.8, h * 0.07, "#d4237a");
  }
};

// Bogolan mud cloth (Mali): dark brown with cream dots, crosses and lines.
const bogolan: Painter = (g, w, h) => {
  rect(g, 0, 0, w, h, "#4e3220");
  for (let x = 0; x < w; x += 30) {
    rect(g, x + 4, h * 0.12, 2, h * 0.76, "#efe2c6");
    rect(g, x + 14, h * 0.45, 10, h * 0.1, "#efe2c6");
    rect(g, x + 18, h * 0.3, 2, h * 0.4, "#efe2c6");
    dot(g, x + 19, h * 0.14, h * 0.05, "#efe2c6");
    dot(g, x + 19, h * 0.86, h * 0.05, "#efe2c6");
  }
};

// Toghu (North-West Cameroon): black velvet embroidered with red, orange,
// yellow and white zigzags, diamonds and border stripes.
const toghu: Painter = (g, w, h) => {
  rect(g, 0, 0, w, h, "#0d0b0a");
  for (const [color, y] of [["#e01e2b", 0.06], ["#f7b500", 0.14], ["#f7b500", 0.8], ["#e01e2b", 0.88]] as const) {
    rect(g, 0, h * y, w, h * 0.06, color);
  }
  g.lineWidth = Math.max(1.5, h * 0.07);
  g.strokeStyle = "#ff7a1a";
  g.beginPath();
  for (let x = 0; x <= w; x += 20) g.lineTo(x, x % 40 === 0 ? h * 0.3 : h * 0.7);
  g.stroke();
  for (let x = 20; x < w; x += 40) {
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.moveTo(x, h * 0.36);
    g.lineTo(x + 6, h * 0.5);
    g.lineTo(x, h * 0.64);
    g.lineTo(x - 6, h * 0.5);
    g.closePath();
    g.fill();
    dot(g, x, h * 0.5, h * 0.05, "#e01e2b");
  }
};

const PAINTERS: Record<Cloth, Painter> = { kente, ndop, kuba, wax, bogolan, toghu };

// A strip of cloth, CLOTH_LENGTH wide and `height` tall. Browser only.
export function clothStrip(cloth: Cloth, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CLOTH_LENGTH;
  canvas.height = Math.max(4, Math.round(height));
  const g = canvas.getContext("2d");
  if (g) PAINTERS[cloth](g, canvas.width, canvas.height);
  return canvas;
}
