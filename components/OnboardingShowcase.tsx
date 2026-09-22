"use client";

import { useEffect, useState } from "react";
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

const ROTATION_INTERVAL_MS = 5000;

export default function OnboardingShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % screens.length);
    }, ROTATION_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [paused]);

  const screen = screens[index];

  return (
    <section className="py-16 md:py-24 bg-paperAlt overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Ce qu’Ahiyoyo fait concrètement pour vous.</h2>
          <p className="text-slate leading-relaxed">Du paiement fournisseur jusqu’à la livraison finale, en passant par le groupage et le suivi de vos envois.</p>
        </div>

        <Reveal>
          <div
            className="flex flex-col items-center text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div key={index} className="animate-result-in flex flex-col items-center">
              <div className="waybill relative aspect-[4/5] w-full max-w-md border border-ink/8 mb-8">
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 448px, 85vw"
                  priority={index === 0}
                />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl leading-snug mb-3 max-w-md">{screen.title}</h3>
              <p className="text-slate text-sm md:text-base leading-relaxed max-w-md">{screen.text}</p>
            </div>

            <div className="flex items-center gap-2 mt-9" role="tablist" aria-label="Écrans de présentation">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
