import Stamp from "./Stamp";
import Reveal from "./Reveal";

const audiences = [
  { icon: "fa-store", title: "Commerçants", desc: "Approvisionnez votre boutique sans multiplier les intermédiaires." },
  { icon: "fa-cart-shopping", title: "E-commerçants", desc: "Testez des produits et alimentez vos canaux de vente." },
  { icon: "fa-building", title: "PME & industries", desc: "Faites venir équipements, intrants et marchandises." },
  { icon: "fa-palette", title: "Artisans & producteurs", desc: "Envoyez vos créations vers de nouveaux marchés." },
  { icon: "fa-arrow-right-to-city", title: "Importateurs", desc: "Structurez vos achats et vos flux internationaux." },
  { icon: "fa-arrow-up-right-dots", title: "Exportateurs", desc: "Préparez et acheminez vos produits hors d’Afrique." },
];

export default function Audiences() {
  return (
    <section className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <Stamp variant="amber" className="mb-6">Pour qui ?</Stamp>
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Une plateforme pensée pour ceux qui font circuler des produits.</h2>
          <p className="text-slate leading-relaxed">Que vous commenciez avec un carton ou pilotiez des flux réguliers, Ahiyoyo adapte son accompagnement à votre activité.</p>
        </div>
        <Reveal stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audiences.map((audience) => (
              <article key={audience.title} className="group rounded-2xl border border-ink/8 bg-paper p-5 flex items-start gap-4 hover:border-amber/35 transition-colors">
                <span className="w-11 h-11 rounded-xl bg-amber/12 text-amber flex items-center justify-center flex-shrink-0 group-hover:bg-amber group-hover:text-[#111827] transition-colors"><i className={`fa-solid ${audience.icon}`} /></span>
                <div><h3 className="font-display font-semibold mb-1.5">{audience.title}</h3><p className="text-slate text-xs leading-relaxed">{audience.desc}</p></div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
