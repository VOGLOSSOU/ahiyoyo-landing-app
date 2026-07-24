"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const availableCountries = [
  { flag: "🇨🇳", name: "Chine" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇧🇯", name: "Bénin" },
  { flag: "🇹🇬", name: "Togo" },
  { flag: "🇨🇮", name: "Côte d’Ivoire" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"start" | "activities" | "legal" | null>(null);
  const [availabilityVisible, setAvailabilityVisible] = useState(true);

  useEffect(() => {
    setAvailabilityVisible(localStorage.getItem("ahiyoyo-availability-dismissed") !== "true");

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

  const dismissAvailability = () => {
    setAvailabilityVisible(false);
    localStorage.setItem("ahiyoyo-availability-dismissed", "true");
  };

  return (
    <>
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      {availabilityVisible && (
        <aside className="h-20 sm:h-16 bg-[#090b10] text-white border-b border-white/10" aria-label="Pays dans lesquels Ahiyoyo est disponible">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 pr-12 sm:pr-14 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 lg:gap-10 relative">
            <p className="text-center sm:text-left text-[11px] sm:text-xs font-semibold leading-snug">
              Nous sommes dans ces pays
            </p>
            <div className="flex items-start justify-center gap-4 sm:gap-7 lg:gap-10">
              {availableCountries.map((country) => (
                <span key={country.name} className="text-xl sm:text-2xl leading-none" role="img" aria-label={country.name}>{country.flag}</span>
              ))}
            </div>
            <button type="button" onClick={dismissAvailability} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 text-white/75 hover:text-white hover:border-white/50 hover:bg-white/10 transition" aria-label="Masquer la liste des pays disponibles">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}
      <nav className="bg-paper/90 backdrop-blur-sm" style={{ boxShadow: "0 1px 0 rgba(20,22,31,.08)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image src="/ahiyoyo.png" alt="Ahiyoyo" width={512} height={167} priority className="h-8 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate">
          <Link href="/suivi" className="hover:text-ink transition-colors">Suivi</Link>
          <Link href="/tarifs" className="hover:text-ink transition-colors">Adresses et tarifs</Link>
          <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
          <div className="relative group/dropdown">
            <button type="button" onClick={() => toggleDropdown("start")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "start"} aria-haspopup="menu">
              Démarrer <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "start" ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute top-full left-0 pt-4 w-64 transition-[opacity,visibility] duration-150 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto ${openDropdown === "start" ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"}`} role="menu">
              <div className="waybill border border-ink/10 !rounded-xl !shadow-lg p-2">
                <a href="https://app.ahiyoyo.com/expedier-colis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-box text-amber w-4" />Enregistrer un colis</a>
                <a href="https://app.ahiyoyo.com/nouvelle-demande" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-file-circle-plus text-amber w-4" />Demander un devis</a>
              </div>
            </div>
          </div>
          <div className="relative group/dropdown">
            <button type="button" onClick={() => toggleDropdown("activities")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "activities"} aria-haspopup="menu">
              Mes activités <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "activities" ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute top-full right-0 pt-4 w-56 transition-[opacity,visibility] duration-150 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto ${openDropdown === "activities" ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"}`} role="menu">
              <div className="waybill border border-ink/10 !rounded-xl !shadow-lg p-2">
                <a href="https://app.ahiyoyo.com/mes-devis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-file-invoice text-amber w-4" />Mes devis</a>
                <a href="https://app.ahiyoyo.com/mes-commandes" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-cart-shopping text-amber w-4" />Mes commandes</a>
                <a href="https://app.ahiyoyo.com/mes-colis" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition text-ink" role="menuitem"><i className="fa-solid fa-box-open text-amber w-4" />Mes colis</a>
              </div>
            </div>
          </div>
          <div className="relative group/dropdown">
            <button type="button" onClick={() => toggleDropdown("legal")} className="flex items-center gap-2 hover:text-ink transition-colors" aria-expanded={openDropdown === "legal"} aria-haspopup="menu">
              Légal <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === "legal" ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute top-full right-0 pt-4 w-64 transition-[opacity,visibility] duration-150 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto ${openDropdown === "legal" ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"}`} role="menu">
              <div className="waybill border border-ink/10 !rounded-xl !shadow-lg p-2">
                <Link href="/cgu" onClick={closeMenu} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition" role="menuitem"><i className="fa-solid fa-file-contract text-amber mt-0.5" /><span><span className="block text-sm font-semibold text-ink">Conditions générales</span><span className="block text-[11px] text-slate mt-0.5">Utilisation et services</span></span></Link>
                <Link href="/confidentialite" onClick={closeMenu} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-amber/10 transition" role="menuitem"><i className="fa-solid fa-shield-halved text-amber mt-0.5" /><span><span className="block text-sm font-semibold text-ink">Confidentialité</span><span className="block text-[11px] text-slate mt-0.5">Protection des données</span></span></Link>
              </div>
            </div>
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
    </header>
    {availabilityVisible && <div className="h-20 sm:h-16" aria-hidden="true" />}
    </>
  );
}
