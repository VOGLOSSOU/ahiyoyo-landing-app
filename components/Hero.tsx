import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";
import ShipmentPreviewCard from "./ShipmentPreviewCard";

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
                Gardez un œil sur toutes vos activités commerciales avec le reste du monde : du paiement jusqu’à la livraison, sans les tracas habituels.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link href="/suivi" className="btn-primary inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-7 py-4 rounded-full text-sm">
                  <i className="fa-solid fa-location-crosshairs mr-2" />Suivre un envoi
                </Link>
                <Link href="/comment-ca-marche" className="btn-ghost inline-flex items-center justify-center border border-ink/20 text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink/5 text-sm">
                  Comment ça marche <i className="fa-solid fa-arrow-right ml-2 text-xs" />
                </Link>
              </div>

            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative max-w-lg mx-auto lg:mr-0">
              <div className="absolute -inset-4 bg-amber/8 rounded-[2rem] rotate-2" />
              <ShipmentPreviewCard />

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
