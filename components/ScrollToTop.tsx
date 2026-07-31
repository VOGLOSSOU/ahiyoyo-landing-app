"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Remonter en haut de la page"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-amber text-[#111827] flex items-center justify-center shadow-lg shadow-black/15 hover:bg-amber/90 transition"
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}