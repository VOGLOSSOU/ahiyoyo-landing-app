import Stamp from "./Stamp";
import Reveal from "./Reveal";

const steps = [
  { num: "01", title: "Vous partagez votre besoin", desc: "Un lien, une photo, une quantité ou les détails de votre expédition suffisent pour commencer.", icon: "fa-paper-plane" },
  { num: "02", title: "Nous cadrons l’opération", desc: "Produit, fournisseur, route, coûts et délai : tout est clarifié avant votre validation.", icon: "fa-file-signature" },
  { num: "03", title: "Nous coordonnons sur place", desc: "Paiement, réception au cargo, contrôle, consolidation et préparation documentaire.", icon: "fa-people-arrows" },
  { num: "04", title: "Vous suivez jusqu’à la remise", desc: "Les étapes importantes restent accessibles avec votre référence Ahiyoyo.", icon: "fa-location-dot" },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <Stamp variant="amber" className="mb-6">Comment ça marche</Stamp>
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Un parcours clair, sans vous laisser seul entre deux étapes.</h2>
          <p className="text-slate leading-relaxed">Derrière la plateforme, une équipe suit l’opération et intervient là où l’automatisation ne suffit pas.</p>
        </div>

        <Reveal stagger>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {steps.map((step) => (
              <article key={step.num} className="group grid grid-cols-[52px_1fr] gap-5 py-6 border-t border-ink/10">
                <div className="w-12 h-12 rounded-xl bg-paperAlt border border-ink/8 text-amber flex items-center justify-center group-hover:border-amber/40 transition"><i className={`fa-solid ${step.icon}`} /></div>
                <div><p className="font-mono-tag text-[9px] text-amber mb-2">ÉTAPE {step.num}</p><h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3><p className="text-slate text-sm leading-relaxed">{step.desc}</p></div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
