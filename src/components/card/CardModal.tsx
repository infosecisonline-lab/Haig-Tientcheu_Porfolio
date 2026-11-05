"use client";

import { useEffect, useRef, useState } from "react";
import { X, Contact } from "lucide-react";
import { CardView, type CardProps } from "./CardView";

export const OPEN_CARD_EVENT = "open-business-card";

// Native <dialog>: focus is trapped and Escape closes it without extra code.
export function CardModal({ card, fabLabel }: { card: CardProps; fabLabel: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  // The quick-share button waits until the visitor has scrolled past the first screen.
  const [fabHidden, setFabHidden] = useState(true);

  useEffect(() => {
    const onScroll = () => setFabHidden(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const open = () => {
      if (!dialog.open) dialog.showModal();
    };
    const onHash = () => {
      if (window.location.hash === "#vcard") open();
    };
    window.addEventListener(OPEN_CARD_EVENT, open);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener(OPEN_CARD_EVENT, open);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  function close() {
    ref.current?.close();
    if (window.location.hash === "#vcard") history.replaceState(null, "", window.location.pathname);
  }

  return (
    <>
      <dialog
        ref={ref}
        id="vcard"
        className="card-dialog"
        aria-labelledby="card-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onClose={close}
      >
        <button type="button" className="bcard-close" onClick={close} aria-label={card.t.close}>
          <X size={22} aria-hidden />
        </button>
        <CardView {...card} />
      </dialog>
      <button
        type="button"
        className="share-fab"
        onClick={() => window.dispatchEvent(new Event(OPEN_CARD_EVENT))}
        aria-haspopup="dialog"
        aria-controls="vcard"
        data-hidden={fabHidden}
        tabIndex={fabHidden ? -1 : 0}
        aria-hidden={fabHidden}
      >
        <Contact size={22} aria-hidden />
        <span className="label">{fabLabel}</span>
      </button>
    </>
  );
}
