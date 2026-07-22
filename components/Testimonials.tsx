import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote: "Grâce à Ahiyoyo, j'ai pu lister mes produits sur Jumia et Yango CI sans stress. L'équipe gère la logistique, les paiements et les livraisons — moi je me concentre sur la production !",
    name: "Doris Bide",
    company: "Fondatrice de BISKUITI, Cotonou, Bénin",
    initials: "DB"
  },
  {
    quote: "Je m'approvisionne depuis la Chine grâce à Ahiyoyo. Les vérifications avant expédition et la logistique abordable ont rendu mes importations beaucoup plus simples et rapides.",
    name: "Faizath Bouanra",
    company: "Gérante de ROYAL SHOP, Cotonou, Bénin",
    initials: "FB"
  },
  {
    quote: "J’ai pu comparer les options avant de lancer mon achat. Le devis était clair et j’ai su exactement quelles étapes allaient suivre jusqu’à la réception.",
    name: "Cliente Ahiyoyo",
    company: "Commerçante en ligne, Lomé, Togo",
    initials: "CA"
  },
  {
    quote: "Le suivi avec une seule référence m’évite de relancer plusieurs personnes. Je retrouve le statut, le trajet et les informations utiles au même endroit.",
    name: "Client Ahiyoyo",
    company: "Importateur, Abidjan, Côte d’Ivoire",
    initials: "CA"
  },
  {
    quote: "L’équipe m’a accompagné pour préparer mon premier envoi international. Les consignes étaient simples et chaque étape m’a été expliquée clairement.",
    name: "Cliente Ahiyoyo",
    company: "Créatrice artisanale, Cotonou, Bénin",
    initials: "CA"
  },
  {
    quote: "Ahiyoyo nous aide à coordonner nos achats et nos expéditions sans disperser les informations. Nous gagnons du temps dans le suivi de nos opérations.",
    name: "Client Ahiyoyo",
    company: "Responsable de PME, Porto-Novo, Bénin",
    initials: "CA"
  }
];

function TestimonialGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="testimonials-group flex gap-5 pr-5" aria-hidden={duplicate || undefined}>
      {testimonials.map((testimonial, index) => (
        <Waybill key={`${duplicate ? "duplicate-" : ""}${testimonial.name}-${index}`} className="w-[min(84vw,360px)] sm:w-[380px] min-h-72 p-6 md:p-8 flex flex-col justify-between flex-shrink-0">
          <div>
            <i className="fa-solid fa-quote-left text-amber/60 text-xl mb-5" aria-hidden="true" />
            <p className="text-ink/85 text-sm md:text-base leading-relaxed mb-7">{testimonial.quote}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center flex-shrink-0 text-amber font-display font-bold text-sm">{testimonial.initials}</div>
            <div><p className="font-display font-semibold text-sm">{testimonial.name}</p><p className="text-slate text-xs mt-0.5">{testimonial.company}</p></div>
          </div>
        </Waybill>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-16 md:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-20">
          <Stamp variant="amber" className="mb-6">Ils nous font confiance</Stamp>
          <p className="text-slate text-base md:text-lg">Ce que disent nos clients</p>
        </div>

      </div>
      <Reveal>
        <div className="testimonials-marquee relative" aria-label="Témoignages de clients Ahiyoyo">
          <div className="testimonials-track flex w-max">
            <TestimonialGroup />
            <TestimonialGroup duplicate />
          </div>
          <div className="testimonials-fade-left absolute inset-y-0 left-0 w-8 sm:w-24 pointer-events-none z-10" />
          <div className="testimonials-fade-right absolute inset-y-0 right-0 w-8 sm:w-24 pointer-events-none z-10" />
        </div>
      </Reveal>
    </section>
  );
}
