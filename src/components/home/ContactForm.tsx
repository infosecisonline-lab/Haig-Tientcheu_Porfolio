"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";

type Status = "idle" | "sending" | "sent" | "error" | "off";

export function ContactForm({ t, formspreeId }: { t: Dictionary["contact"]; formspreeId: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot filled: a bot
    if (!formspreeId) return setStatus("off");
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const message = status === "sent" ? t.sent : status === "error" ? t.error : status === "off" ? t.notConfigured : "";

  return (
    <form
      onSubmit={onSubmit}
      action={formspreeId ? `https://formspree.io/f/${formspreeId}` : undefined}
      method="POST"
      className="card relative grid gap-4 p-6 sm:p-8"
      aria-describedby="contact-status"
    >
      <h3 className="m-0 font-display text-2xl font-semibold">{t.heading}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          {t.name}
          <input className="field" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-ink">
          {t.email}
          <input className="field" name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        {t.subject}
        <input className="field" name="subject" required maxLength={160} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        {t.message}
        <textarea className="field" name="message" required minLength={10} maxLength={5000} />
      </label>
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-gotcha">Leave empty</label>
        <input id="cf-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-gold w-full sm:w-auto sm:justify-self-start" disabled={status === "sending"}>
        <Send size={18} aria-hidden /> {status === "sending" ? t.sending : t.send}
      </button>
      <p id="contact-status" role="status" aria-live="polite" className={`m-0 min-h-6 text-sm font-medium ${status === "sent" ? "text-emerald-700 dark:text-emerald-400" : "text-ink"}`}>
        {message}
      </p>
    </form>
  );
}
