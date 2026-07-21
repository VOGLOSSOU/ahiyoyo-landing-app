import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="pt-16 overflow-hidden relative">
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-24 relative">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-14">

          <div className="flex-1">
            <Reveal>
              <Stamp variant="amber" dot className="mb-6">Achat, sourcing & expédition</Stamp>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] mb-6">
                Achetez, vendez<br />
                <span className="text-amber">et expédiez<br />depuis l&apos;Afrique.</span>
              </h1>
              <p className="text-slate text-base md:text-lg leading-relaxed mb-9 max-w-md">
                Sourcing en Chine, vérification produit, paiement fournisseur et transport groupé :
                Ahiyoyo s&apos;occupe de tout, du premier devis jusqu&apos;à la livraison, avec des tarifs clairs dès le départ.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#suivi" className="btn-primary bg-amber text-ink font-semibold px-7 py-3.5 rounded-full text-sm">
                  Suivre un colis
                </a>
                <a href="#fonctionnalites" className="btn-ghost border border-ink/70 text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-ink/5 text-sm">
                  Découvrir nos services
                </a>
              </div>

              <div className="flex items-center gap-3 mt-9 text-sm text-slate">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-paperAlt border-2 border-paper flex items-center justify-center text-xs shadow-sm">🇧🇯</div>
                  <div className="w-8 h-8 rounded-full bg-paperAlt border-2 border-paper flex items-center justify-center text-xs shadow-sm">🇹🇬</div>
                  <div className="w-8 h-8 rounded-full bg-paperAlt border-2 border-paper flex items-center justify-center text-xs shadow-sm">🇨🇮</div>
                  <div className="w-8 h-8 rounded-full bg-paperAlt border-2 border-paper flex items-center justify-center text-xs shadow-sm">🇨🇳</div>
                </div>
                <span>Agences au Bénin, Togo, Côte d&apos;Ivoire — sourcing en Chine</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="flex-1">
              <Waybill className="max-w-md mx-auto md:ml-auto md:mr-0 p-6 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono-tag text-[11px] font-semibold text-slate">BORDEREAU D&apos;EXPÉDITION</span>
                  <Stamp variant="postal" className="!py-1.5 !px-3 !text-[10px]">En transit</Stamp>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-mono-tag text-[10px] text-slate mb-0.5">DÉPART</p>
                    <p className="font-display font-bold text-lg">Cotonou</p>
                  </div>
                  <i className="fa-solid fa-plane text-amber" />
                  <div className="text-right">
                    <p className="font-mono-tag text-[10px] text-slate mb-0.5">ARRIVÉE</p>
                    <p className="font-display font-bold text-lg">Paris</p>
                  </div>
                </div>

                <svg viewBox="0 0 400 70" className="w-full h-14 -mt-1">
                  <path d="M15,35 Q200,-5 385,35" fill="none" stroke="#C7CAD6" strokeWidth="2" className="route-dash" strokeLinecap="round" />
                  <circle cx="15" cy="35" r="4.5" fill="currentColor" className="text-ink" />
                  <circle cx="385" cy="35" r="4.5" fill="#fdc354" />
                  <g>
                    <path d="M-6,-4 L6,0 L-6,4 L-2,0 Z" fill="currentColor" className="text-ink" />
                    <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" path="M15,35 Q200,-5 385,35" />
                  </g>
                </svg>

                <div className="waybill-divider my-5" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono-tag text-[10px] text-slate mb-0.5">N° DE SUIVI</p>
                    <p className="font-mono-tag text-sm font-semibold">AHI-2026-0001</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-tag text-[10px] text-slate mb-0.5">POIDS</p>
                    <p className="font-mono-tag text-sm font-semibold">4.2 KG</p>
                  </div>
                </div>

                <div className="barcode rounded mt-5" />
              </Waybill>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
