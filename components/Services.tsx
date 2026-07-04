import Stamp from "./Stamp";
import Reveal from "./Reveal";

const services = [
  { icon: "fa-magnifying-glass", title: "Achat & sourcing", desc: "Recherche de fournisseurs, devis, négociation et assistance achat." },
  { icon: "fa-clipboard-check", title: "Vérification produit", desc: "Contrôle qualité, prise et transmission des photos, préparation à l'expédition." },
  { icon: "fa-money-check-dollar", title: "Paiement fournisseur", desc: "Facilitation du paiement et suivi jusqu'à réception de la marchandise." },
  { icon: "fa-plane-departure", title: "Fret aérien & maritime", desc: "Groupage, transport international, suivi et livraison selon vos délais." },
  { icon: "fa-box-open", title: "Export & livraison", desc: "Envois depuis l'Afrique vers l'Europe et la Chine selon les corridors actifs." },
  { icon: "fa-briefcase", title: "Voyage d'affaires", desc: "Accompagnement pour vos voyages professionnels en Chine." },
];

export default function Services() {
  return (
    <section id="fonctionnalites" className="py-16 md:py-28 bg-paperAlt">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <Stamp className="mb-6">Nos services</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Ce que vous pouvez faire avec Ahiyoyo</h2>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Un accompagnement complet, du sourcing jusqu'à la livraison finale.
          </p>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-paper rounded-2xl p-6 lift">
                <div className="w-11 h-11 bg-ink rounded-xl flex items-center justify-center mb-4">
                  <i className={`fa-solid ${s.icon} text-amber`} />
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}