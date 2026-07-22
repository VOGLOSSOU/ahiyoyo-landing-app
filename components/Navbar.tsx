"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"start" | "activities" | "legal" | null>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: "start" | "activities" | "legal") => {
    setOpenDropdown((current) => current === dropdown ? null : dropdown);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm" style={{ boxShadow: "0 1px 0 rgba(20,22,31,.08)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image src="/ahiyoyo.png" alt="Ahiyoyo" width={512} height={167} priority className="h-8 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate">
          <Link href="/suivi" className="hover:text-ink transition-colors">Suivi</Link>
          <Link href="/tarifs" className="hover:text-ink transition-colors">Adresses et tarifs</Link>
          <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
          <div className="relative" onMouseEnter={() => setOpenDropdown("start")} onMouseLeave={() => setOpenDropdown(null)}>
            <button type="button" onClick={() => toggleDropdown("start")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "start"} aria-haspopup="menu">
              Démarrer <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "start" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "start" && (
              <div className="absolute top-full left-0 mt-4 w-64 waybill border border-ink/10 !rounded-xl !shadow-lg p-2 before:absolute before:-top-4 before:inset-x-0 before:h-4" role="menu">
                <a href="https://app.ahiyoyo.com/expedier-colis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-box text-amber w-4" />Enregistrer un colis</a>
                <a href="https://app.ahiyoyo.com/nouvelle-demande" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-file-circle-plus text-amber w-4" />Demander un devis</a>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setOpenDropdown("activities")} onMouseLeave={() => setOpenDropdown(null)}>
            <button type="button" onClick={() => toggleDropdown("activities")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "activities"} aria-haspopup="menu">
              Mes activités <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "activities" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "activities" && (
              <div className="absolute top-full right-0 mt-4 w-56 waybill border border-ink/10 !rounded-xl !shadow-lg p-2 before:absolute before:-top-4 before:inset-x-0 before:h-4" role="menu">
                <a href="https://app.ahiyoyo.com/mes-devis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-file-invoice text-amber w-4" />Mes devis</a>
                <a href="https://app.ahiyoyo.com/mes-commandes" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-cart-shopping text-amber w-4" />Mes commandes</a>
                <a href="https://app.ahiyoyo.com/mes-colis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-box-open text-amber w-4" />Mes colis</a>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setOpenDropdown("legal")} onMouseLeave={() => setOpenDropdown(null)}>
            <button type="button" onClick={() => toggleDropdown("legal")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "legal"} aria-haspopup="menu">
              Légal <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "legal" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "legal" && (
              <div className="absolute top-full right-0 mt-4 w-64 waybill border border-ink/10 !rounded-xl !shadow-lg p-2 before:absolute before:-top-4 before:inset-x-0 before:h-4" role="menu">
                <Link href="/cgu" onClick={closeMenu} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition" role="menuitem"><i className="fa-solid fa-file-contract text-amber mt-0.5" /><span><span className="block text-sm font-semibold text-ink">Conditions générales</span><span className="block text-[11px] text-slate mt-0.5">Utilisation et services</span></span></Link>
                <Link href="/confidentialite" onClick={closeMenu} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition" role="menuitem"><i className="fa-solid fa-shield-halved text-amber mt-0.5" /><span><span className="block text-sm font-semibold text-ink">Confidentialité</span><span className="block text-[11px] text-slate mt-0.5">Protection des données</span></span></Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="https://app.ahiyoyo.com" aria-label="Mon compte Ahiyoyo" className="btn-primary bg-navy text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-5 py-2.5 rounded-full whitespace-nowrap">
            <i className="fa-solid fa-user sm:mr-2" /><span className="hidden sm:inline">Mon compte</span>
          </a>
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center"
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
        <div id="mobile-menu" className="lg:hidden border-t border-ink/10 bg-paper px-5 py-4 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col text-sm font-medium text-slate">
            <Link href="/suivi" className="py-3 hover:text-ink" onClick={closeMenu}>Suivi</Link>
            <Link href="/tarifs" className="py-3 hover:text-ink" onClick={closeMenu}>Adresses et tarifs</Link>
            <Link href="/faq" className="py-3 hover:text-ink" onClick={closeMenu}>FAQ</Link>
            <div className="border-t border-ink/8 mt-2 pt-2">
              <p className="font-mono-tag text-[9px] text-slate px-1 py-2">DÉMARRER</p>
              <a href="https://app.ahiyoyo.com/expedier-colis" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-box text-amber w-4" />Enregistrer un colis</a>
              <a href="https://app.ahiyoyo.com/nouvelle-demande" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-file-circle-plus text-amber w-4" />Demander un devis</a>
            </div>
            <div className="border-t border-ink/8 mt-2 pt-2">
              <p className="font-mono-tag text-[9px] text-slate px-1 py-2">MES ACTIVITÉS</p>
              <a href="https://app.ahiyoyo.com/mes-devis" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-file-invoice text-amber w-4" />Mes devis</a>
              <a href="https://app.ahiyoyo.com/mes-commandes" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-cart-shopping text-amber w-4" />Mes commandes</a>
              <a href="https://app.ahiyoyo.com/mes-colis" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-box-open text-amber w-4" />Mes colis</a>
            </div>
            <div className="border-t border-ink/8 mt-2 pt-2">
              <p className="font-mono-tag text-[9px] text-slate px-1 py-2">LÉGAL</p>
              <Link href="/cgu" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-file-contract text-amber w-4" />Conditions générales</Link>
              <Link href="/confidentialite" className="flex items-center gap-3 py-3 hover:text-ink" onClick={closeMenu}><i className="fa-solid fa-shield-halved text-amber w-4" />Politique de confidentialité</Link>
            </div>
            <a href="https://app.ahiyoyo.com" className="flex items-center justify-center gap-2 mt-4 bg-navy text-white rounded-full px-5 py-3 font-semibold" onClick={closeMenu}><i className="fa-solid fa-user" />Mon compte</a>
          </div>
        </div>
      )}
    </nav>
  );
}
