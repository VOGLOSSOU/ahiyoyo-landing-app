import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const promises = [
  { icon: "fa-magnifying-glass", title: "Le bon fournisseur", text: "Recherche, négociation et vérification avant engagement." },
  { icon: "fa-receipt", title: "Le vrai coût", text: "Des tarifs consultables et un devis validé avant l’opération." },
  { icon: "fa-location-dot", title: "La bonne information", text: "Un suivi public et des mises à jour utiles, au même endroit." },
];

export default function Problem() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-5 md:px-6 relative">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <Stamp variant="ghost" className="mb-7">Une logistique plus lisible</Stamp>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-5">Moins d’intermédiaires.<br /><span className="text-amber">Plus de maîtrise.</span></h2>
            <p className="text-white/60 leading-relaxed mb-8">À distance, le plus difficile n’est pas seulement de transporter un colis. C’est de savoir à qui faire confiance, combien payer et ce qui se passe ensuite.</p>
            <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Comprendre notre fonctionnement <i className="fa-solid fa-arrow-right text-xs" /></Link>
          </Reveal>
          <Reveal stagger>
            <div className="space-y-3">
              {promises.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 md:p-6 flex items-start gap-5">
                  <span className="font-mono-tag text-[10px] text-white/35 mt-1">0{index + 1}</span>
                  <span className="w-11 h-11 rounded-xl bg-amber/15 text-amber flex items-center justify-center flex-shrink-0"><i className={`fa-solid ${item.icon}`} /></span>
                  <div><h3 className="font-display font-semibold mb-1.5">{item.title}</h3><p className="text-sm text-white/55 leading-relaxed">{item.text}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
