import Link from "next/link";
import Reveal from "./Reveal";

const intermediaries = [
  { icon: "fa-industry", label: "Fournisseur" },
  { icon: "fa-handshake", label: "Intermédiaire d’achat" },
  { icon: "fa-truck", label: "Transporteur" },
  { icon: "fa-file-signature", label: "Transitaire" },
  { icon: "fa-globe", label: "Clients à l’international" },
];

export default function Problem() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-5xl mx-auto px-5 md:px-6 relative">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-12 md:mb-16 text-center"><span className="text-amber">Ahiyoyo</span> remplace plusieurs intermédiaires</h2>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
            <div className="space-y-3">
              {intermediaries.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                  <i className={`fa-solid ${item.icon} text-white/30 w-4 text-center flex-shrink-0`} />
                  <span className="text-white/55 line-through decoration-white/70 decoration-2">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex md:flex-col items-center justify-center text-amber/50">
              <span className="md:hidden"><i className="fa-solid fa-arrow-down text-xl" aria-hidden="true" /></span>
              <span className="hidden md:block"><i className="fa-solid fa-arrow-right text-2xl" aria-hidden="true" /></span>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-flex items-center rounded-full bg-amber text-[#111827] px-7 py-3.5 font-display font-bold text-base md:text-lg shadow-lg shadow-amber/20 mb-7">
                Ahiyoyo s’occupe de tout
              </div>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-7">Même à distance, vous gardez un œil sur toutes vos activités commerciales avec le reste du monde.</p>
              <Link href="/comment-ca-marche" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Comprendre notre fonctionnement <i className="fa-solid fa-arrow-right text-xs" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
