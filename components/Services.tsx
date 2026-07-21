import Stamp from "./Stamp";
import Reveal from "./Reveal";

const services = [
  { icon: "fa-magnifying-glass", title: "Achat & sourcing", desc: "Recherche de fournisseurs, demande de prix, négociation et assistance à l’achat.", tag: "Trouver" },
  { icon: "fa-clipboard-check", title: "Contrôle avant départ", desc: "Réception, vérification visuelle, photos, quantités et préparation de la marchandise.", tag: "Vérifier" },
  { icon: "fa-money-check-dollar", title: "Paiement fournisseur", desc: "Un circuit encadré pour faciliter le règlement et conserver une trace de l’opération.", tag: "Sécuriser" },
  { icon: "fa-plane-departure", title: "Fret multimodal", desc: "Aérien, maritime ou routier selon la destination, le volume et votre niveau d’urgence.", tag: "Acheminer" },
  { icon: "fa-box-open", title: "Export depuis l’Afrique", desc: "Des solutions pour envoyer produits et marchandises vers l’Europe, la Chine ou la sous-région.", tag: "Développer" },
  { icon: "fa-briefcase", title: "Voyages d’affaires", desc: "Préparation et accompagnement de vos déplacements professionnels en Chine.", tag: "Rencontrer" },
];

export default function Services() {
  return (
    <section id="fonctionnalites" className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl"><Stamp className="mb-6">Nos services</Stamp><h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">Une seule équipe pour faire avancer toute l’opération.</h2></div>
          <p className="text-slate text-sm leading-relaxed max-w-sm">Choisissez un service ponctuel ou confiez-nous un parcours complet, du sourcing jusqu’à la livraison.</p>
        </div>

        <Reveal stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <article key={service.title} className="group rounded-2xl border border-ink/8 bg-paper p-6 md:p-7 min-h-56 flex flex-col lift">
                <div className="flex items-center justify-between mb-9"><span className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center text-amber"><i className={`fa-solid ${service.icon}`} /></span><span className="font-mono-tag text-[8px] text-slate">{service.tag.toUpperCase()}</span></div>
                <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-slate text-sm leading-relaxed mt-auto">{service.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
