import Reveal from "./Reveal";

const stats = [
  { value: "3", label: "Agences en Afrique de l’Ouest", icon: "fa-location-dot" },
  { value: "5", label: "Pays reliés par nos corridors", icon: "fa-earth-africa" },
  { value: "Air · Mer · Route", label: "Des solutions adaptées à chaque envoi", icon: "fa-route" },
  { value: "De A à Z", label: "Un interlocuteur du devis à la remise", icon: "fa-arrows-turn-to-dots" },
];

export default function KeyStats() {
  return (
    <section className="py-14 md:py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ink/8 bg-paperAlt p-5 md:p-6">
                <i className={`fa-solid ${stat.icon} text-amber mb-5`} />
                <p className="font-display font-bold text-xl md:text-2xl mb-2">{stat.value}</p>
                <p className="text-slate text-xs leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
