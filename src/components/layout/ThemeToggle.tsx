"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

export function ThemeToggle({ labels }: { labels: { label: string; light: string; dark: string } }) {
  const { resolvedTheme, setTheme } = useTheme();
  // true only in the browser, so the icon never mismatches the server render
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? labels.light : labels.dark;

  return (
    <button
      type="button"
      className="toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`${labels.label}: ${next}`}
      title={next}
    >
      {isDark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
    </button>
  );
}
