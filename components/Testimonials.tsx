import Waybill from "./Waybill";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote: "Grâce à Ahiyoyo, j'ai pu lister mes produits sur Jumia et Yango CI sans stress. L'équipe gère la logistique, les paiements et les livraisons — moi je me concentre sur la production !",
    name: "Doris Bide",
    company: "Fondatrice de BISKUITI, Cotonou, Bénin",
  },
  {
    quote: "Je m'approvisionne depuis la Chine grâce à Ahiyoyo. Les vérifications avant expédition et la logistique abordable ont rendu mes importations beaucoup plus simples et rapides.",
    name: "Faizath Bouanra",
    company: "Gérante de ROYAL SHOP, Cotonou, Bénin",
  },
  {
    quote: "J’ai pu comparer les options avant de lancer mon achat. Le devis était clair et j’ai su exactement quelles étapes allaient suivre jusqu’à la réception.",
    name: "Cliente Ahiyoyo",
    company: "Commerçante en ligne, Lomé, Togo",
  },
  {
    quote: "Le suivi avec une seule référence m’évite de relancer plusieurs personnes. Je retrouve le statut, le trajet et les informations utiles au même endroit.",
    name: "Client Ahiyoyo",
    company: "Importateur, Abidjan, Côte d’Ivoire",
  },
  {
    quote: "L’équipe m’a accompagné pour préparer mon premier envoi international. Les consignes étaient simples et chaque étape m’a été expliquée clairement.",
    name: "Cliente Ahiyoyo",
    company: "Créatrice artisanale, Cotonou, Bénin",
  },
  {
    quote: "Ahiyoyo nous aide à coordonner nos achats et nos expéditions sans disperser les informations. Nous gagnons du temps dans le suivi de nos opérations.",
    name: "Client Ahiyoyo",
    company: "Responsable de PME, Porto-Novo, Bénin",
  }
];

function TestimonialGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="testimonials-group flex gap-5 pr-5" aria-hidden={duplicate || undefined}>
      {testimonials.map((testimonial, index) => (
        <Waybill key={`${duplicate ? "duplicate-" : ""}${testimonial.name}-${index}`} className="w-[min(86vw,380px)] sm:w-[400px] min-h-[19rem] p-7 md:p-9 flex flex-col flex-shrink-0 border border-ink/8">
          <i className="fa-solid fa-quote-left text-amber text-2xl mb-6" aria-hidden="true" />
          <p className="text-ink/90 text-sm md:text-base leading-relaxed flex-1">{testimonial.quote}</p>
          <div className="mt-7 pt-5 border-t border-dashed border-ink/15">
            <p className="font-display font-semibold text-sm">{testimonial.name}</p>
            <p className="font-mono-tag text-[10px] text-slate mt-1.5 uppercase">{testimonial.company}</p>
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
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Ce que disent nos clients</h2>
          <p className="text-slate text-base md:text-lg leading-relaxed">Des commerçants, importateurs et exportateurs qui utilisent déjà Ahiyoyo pour simplifier leurs échanges avec le reste du monde.</p>
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
