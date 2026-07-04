import Link from "next/link";
import Stamp from "./Stamp";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm" style={{ boxShadow: "0 1px 0 rgba(20,22,31,.08)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/ahiyoyo.png" alt="Ahiyoyo" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
          <Link href="/#fonctionnalites" className="hover:text-ink transition-colors">Services</Link>
          <Link href="/#suivi" className="hover:text-ink transition-colors">Suivi</Link>
          <Link href="/#tarifs" className="hover:text-ink transition-colors">Tarifs</Link>
          <Link href="/#temoignages" className="hover:text-ink transition-colors">Témoignages</Link>
          <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
        </div>

        <Link href="/#suivi" className="btn-primary bg-ink text-white text-sm font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap">
          Suivre un colis
        </Link>
      </div>
    </nav>
  );
}