"use client";

import { FabricRibbons, type Ribbon } from "./FabricRibbons";

// Preset ribbon layouts. Ndop and toghu are cloths of Cameroon, Haig's home country.
const PRESETS: Record<"impact", Ribbon[]> = {
  impact: [
    { cloth: "ndop", y: 0.22, amp: 0.1, freq: 0.7, speed: 0.7, phase: 1.8, flow: -0.25 },
    { cloth: "kente", y: 0.42, amp: 0.1, freq: 0.9, speed: 0.9, phase: 0, flow: 0.35 },
    { cloth: "toghu", y: 0.62, amp: 0.09, freq: 0.8, speed: 0.8, phase: 4.4, flow: -0.3 },
    { cloth: "wax", y: 0.82, amp: 0.08, freq: 1.1, speed: 1.1, phase: 3.1, flow: 0.3, mobile: false },
  ],
};

export function RibbonsBand({ preset, className = "" }: { preset: keyof typeof PRESETS; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <FabricRibbons ribbons={PRESETS[preset]} />
    </div>
  );
}
