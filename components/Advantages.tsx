import Stamp from "./Stamp";
import Reveal from "./Reveal";

const advantages = [
  { icon: "fa-globe", title: "Corridors actifs", desc: "Sourcing en Chine, livraison vers la France, et distribution entre le Bénin, le Togo et la Côte d'Ivoire." },
  { icon: "fa-tags", title: "Tarifs transparents", desc: "Pas de frais cachés. Nos tarifs sont publiés et confirmés après pesée ou mesure du volume." },
  { icon: "fa-clipboard-check", title: "Contrôle qualité systématique", desc: "Chaque commande est vérifiée avant expédition : photos, quantités et conformité." },
  { icon: "fa-route", title: "Multi-modes d'expédition", desc: "Aérien ou maritime selon la destination, le volume et vos urgences." },
  { icon: "fa-headset", title: "Support client dédié", desc: "Une équipe disponible pour répondre à vos questions et résoudre vos problèmes." },
  { icon: "fa-receipt", title: "Gestion administrative", desc: "Devis, commandes et factures automatiques. Exportez vos documents en un clic." },
];

export default function Advantages() {
  return (
    <section id="avantages" className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <Stamp className="mb-6">Avantages</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold">Pourquoi choisir Ahiyoyo ?</h2>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
            {advantages.map((a) => (
              <div key={a.title} className="flex items-start gap-5">
                <div className="w-[52px] h-[52px] bg-amber/15 border border-amber/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${a.icon} text-amber text-lg`} />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1.5">{a.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}