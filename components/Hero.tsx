import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const shipmentSteps = [
  { label: "Commande validée", done: true },
  { label: "Reçu au cargo", done: true },
  { label: "Envoi en cours", current: true },
  { label: "Arrivée à destination" },
];

export default function Hero() {
  return (
    <section className="pt-16 relative overflow-hidden">
      <div className="grain" />
      <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24 lg:py-28 relative">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-14 lg:gap-20 items-center">
          <Reveal>
            <div className="max-w-3xl">
              <Stamp variant="amber" dot className="mb-7">Commerce &amp; logistique internationale</Stamp>
              <h1 className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.35rem] font-display font-bold leading-[1.03] tracking-[-.035em] mb-7">
                Achetez, vendez et expédiez <span className="text-amber">à l’international depuis l’Afrique.</span>
              </h1>
              <p className="text-slate text-base md:text-lg leading-relaxed max-w-2xl mb-9">
                Achetez, sourcez et expédiez entre l’Afrique, la Chine et l’Europe avec une équipe qui coordonne chaque étape — du devis à la livraison.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link href="/suivi" className="btn-primary inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-7 py-4 rounded-full text-sm">
                  <i className="fa-solid fa-location-crosshairs mr-2" />Suivre un envoi
                </Link>
                <Link href="/tarifs" className="btn-ghost inline-flex items-center justify-center border border-ink/20 text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink/5 text-sm">
                  Voir les adresses et tarifs <i className="fa-solid fa-arrow-right ml-2 text-xs" />
                </Link>
              </div>

              <div className="mt-10 pt-7 border-t border-ink/10 flex flex-wrap gap-x-7 gap-y-3 text-xs md:text-sm text-slate">
                <span><i className="fa-solid fa-circle-check text-amber mr-2" />Tarifs publics</span>
                <span><i className="fa-solid fa-circle-check text-amber mr-2" />Suivi sans connexion</span>
                <span><i className="fa-solid fa-circle-check text-amber mr-2" />Support humain</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative max-w-lg mx-auto lg:mr-0">
              <div className="absolute -inset-4 bg-amber/8 rounded-[2rem] rotate-2" />
              <div className="waybill relative p-6 md:p-8 border border-ink/8">
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <p className="font-mono-tag text-[9px] text-slate mb-2">EXPÉDITION EN COURS</p>
                    <p className="font-display font-bold text-xl">Chine → Bénin</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 text-amber border border-amber/30 px-3 py-1.5 text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-amber" />En transit</span>
                </div>

                <div className="rounded-2xl bg-paper p-4 mb-7">
                  <div className="flex items-center justify-between gap-4">
                    <div><p className="text-xs text-slate">Départ</p><p className="font-display font-semibold mt-1">Guangzhou</p></div>
                    <div className="flex-1 flex items-center gap-2 text-amber"><span className="flex-1 border-t border-dashed border-ink/20" /><i className="fa-solid fa-plane" /><span className="flex-1 border-t border-dashed border-ink/20" /></div>
                    <div className="text-right"><p className="text-xs text-slate">Destination</p><p className="font-display font-semibold mt-1">Cotonou</p></div>
                  </div>
                </div>

                <div className="space-y-0">
                  {shipmentSteps.map((step, index) => (
                    <div key={step.label} className="grid grid-cols-[24px_1fr] gap-3 min-h-12">
                      <div className="relative flex justify-center">
                        {index < shipmentSteps.length - 1 && <span className={`absolute top-5 bottom-0 w-px ${step.done ? "bg-emerald-500" : "bg-ink/10"}`} />}
                        <span className={`relative z-10 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-500 text-white" : step.current ? "bg-amber text-[#111827]" : "border border-ink/15 bg-paperAlt"}`}>{step.done && <i className="fa-solid fa-check text-[8px]" />}{step.current && <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />}</span>
                      </div>
                      <p className={`text-sm pb-5 ${step.current ? "font-semibold text-ink" : "text-slate"}`}>{step.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-ink/8">
                  <div><p className="font-mono-tag text-[8px] text-slate">RÉFÉRENCE</p><p className="font-mono-tag text-xs font-semibold mt-1">TRACK-2607-23B8</p></div>
                  <Link href="/suivi" className="text-xs font-semibold text-amber hover:underline">Voir le suivi <i className="fa-solid fa-arrow-right ml-1" /></Link>
                </div>
              </div>

              <div className="absolute -left-5 md:-left-10 bottom-12 hidden sm:flex items-center gap-3 waybill !rounded-xl border border-ink/8 px-4 py-3">
                <span className="w-9 h-9 rounded-full bg-amber/15 text-amber flex items-center justify-center"><i className="fa-solid fa-headset" /></span>
                <div><p className="font-display font-semibold text-xs">Une équipe vous accompagne</p><p className="text-[10px] text-slate mt-0.5">À chaque étape</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
