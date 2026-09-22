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

export default function OnboardingShowcase() {
  return (
    <section className="py-16 md:py-24 bg-paperAlt overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Ce qu’Ahiyoyo fait concrètement pour vous.</h2>
          <p className="text-slate leading-relaxed">Du paiement fournisseur jusqu’à la livraison finale, en passant par le groupage et le suivi de vos envois.</p>
        </div>
        <Reveal stagger>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible">
            {screens.map((screen, index) => (
              <article key={screen.title} className="waybill snap-center flex-shrink-0 w-[80vw] sm:w-[360px] md:w-auto border border-ink/8">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={screen.image}
                    alt={screen.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 80vw"
                    priority={index === 0}
                  />
                  <span className="absolute top-4 left-4 font-mono-tag text-xs font-bold text-[#111827] bg-amber rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-black/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-display font-bold text-lg md:text-xl leading-snug mb-3">{screen.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{screen.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
