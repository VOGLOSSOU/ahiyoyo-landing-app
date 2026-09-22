"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const screens = [
  {
    image: "/onboarding/au-port.png",
    title: "Achetez, vendez et expédiez à l’international depuis l’Afrique.",
    text: "Gardez un œil sur toutes vos activités commerciales avec le reste du monde : du paiement jusqu’à la livraison, sans les tracas habituels.",
  },
  {
    image: "/onboarding/groupage.png",
    title: "Des groupages maritimes et aériens que vous pouvez suivre en direct.",
    text: "Profitez de nos groupages collectifs (maritime et aérien) pour payer moins par CBM ou KG partagé.",
  },
  {
    image: "/onboarding/sourcing.png",
    title: "Trouvez des fournisseurs et clients à l’international.",
    text: "Ahiyoyo vous aide à trouver les meilleurs fournisseurs en Chine, à vous assurer du contrôle de la qualité de vos produits et de leur acheminement jusqu’en Afrique.",
  },
];

export default function OnboardingCarousel() {
  const [index, setIndex] = useState(0);
  const screen = screens[index];

  const go = (next: number) => setIndex((next + screens.length) % screens.length);

  return (
    <section className="py-16 md:py-24 bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 max-w-xl">
              <p className="font-mono-tag text-[10px] text-slate mb-5">{String(index + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</p>

              <div key={index} className="animate-result-in">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-4">{screen.title}</h2>
                <p className="text-slate text-sm sm:text-base leading-relaxed">{screen.text}</p>
              </div>

              <div className="flex items-center gap-4 mt-9">
                <button type="button" onClick={() => go(index - 1)} aria-label="Écran précédent" className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:border-amber/50 hover:text-amber transition flex-shrink-0">
                  <i className="fa-solid fa-arrow-left text-sm" />
                </button>

                <div className="flex items-center gap-2" role="tablist" aria-label="Écrans de présentation">
                  {screens.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Aller à l’écran ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-amber" : "w-2.5 bg-ink/15 hover:bg-ink/30"}`}
                    />
                  ))}
                </div>

                <button type="button" onClick={() => go(index + 1)} aria-label="Écran suivant" className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:border-amber/50 hover:text-amber transition flex-shrink-0">
                  <i className="fa-solid fa-arrow-right text-sm" />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 mx-auto w-full max-w-sm">
              <div key={index} className="waybill relative aspect-[2/3] border border-ink/8 animate-result-in">
                <Image src={screen.image} alt={screen.title} fill priority={index === 0} className="object-cover" sizes="(min-width: 1024px) 420px, 80vw" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
