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
  }
];

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-20">
          <Stamp variant="amber" className="mb-6">Ils nous font confiance</Stamp>
          <p className="text-slate text-base md:text-lg">Ce que disent nos clients</p>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {testimonials.map((t) => (
              <Waybill key={t.name} className="p-6 md:p-8 flex flex-col justify-between lift">
                <p className="text-ink/85 text-sm md:text-base leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center flex-shrink-0 text-amber font-display font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">{t.name}</p>
                    <p className="text-slate text-xs">{t.company}</p>
                  </div>
                </div>
              </Waybill>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
