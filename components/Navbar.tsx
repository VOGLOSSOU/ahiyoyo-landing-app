"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm" style={{ boxShadow: "0 1px 0 rgba(20,22,31,.08)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image src="/ahiyoyo.png" alt="Ahiyoyo" width={512} height={167} priority className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
          <Link href="/#fonctionnalites" className="hover:text-ink transition-colors">Services</Link>
          <Link href="/#suivi" className="hover:text-ink transition-colors">Suivi</Link>
          <Link href="/#tarifs" className="hover:text-ink transition-colors">Tarifs</Link>
          <Link href="/#temoignages" className="hover:text-ink transition-colors">Témoignages</Link>
          <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#suivi" className="btn-primary bg-navy text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap" onClick={closeMenu}>
            Suivre un colis
          </Link>
          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-ink/10 bg-paper px-5 py-4 shadow-lg">
          <div className="flex flex-col text-sm font-medium text-slate">
            <Link href="/#fonctionnalites" className="py-3 hover:text-ink" onClick={closeMenu}>Services</Link>
            <Link href="/#suivi" className="py-3 hover:text-ink" onClick={closeMenu}>Suivi</Link>
            <Link href="/#tarifs" className="py-3 hover:text-ink" onClick={closeMenu}>Tarifs</Link>
            <Link href="/#temoignages" className="py-3 hover:text-ink" onClick={closeMenu}>Témoignages</Link>
            <Link href="/faq" className="py-3 hover:text-ink" onClick={closeMenu}>FAQ</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
