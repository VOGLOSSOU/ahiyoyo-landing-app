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
      <div className="max-w-3xl mx-auto px-5 md:px-6 relative">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-10"><span className="text-amber">Ahiyoyo</span> remplace plusieurs intermédiaires</h2>

            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto">
              {intermediaries.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm text-white/45">
                  <i className={`fa-solid ${item.icon} text-white/30`} />
                  <span className="line-through decoration-white/30">{item.label}</span>
                </span>
              ))}
            </div>

            <div className="my-6"><i className="fa-solid fa-arrow-down text-amber/50 text-lg" aria-hidden="true" /></div>

            <div className="inline-flex items-center gap-2.5 rounded-full bg-amber text-[#111827] px-7 py-3.5 font-display font-bold text-base md:text-lg shadow-lg shadow-amber/20">
              <i className="fa-solid fa-bolt" />
              Ahiyoyo s’occupe de tout
            </div>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mt-10 mb-10 max-w-2xl mx-auto">Même à distance, vous gardez un œil sur toutes vos activités commerciales avec le reste du monde.</p>

            <Link href="/comment-ca-marche" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Comprendre notre fonctionnement <i className="fa-solid fa-arrow-right text-xs" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
