import Stamp from "./Stamp";
import Reveal from "./Reveal";

const stats = [
  { value: "3", label: "Agences", sub: "Côte d&apos;Ivoire, Bénin, Togo" },
  { value: "2", label: "Corridors internationaux", sub: "Chine et France" },
  { value: "100%", label: "Suivi en ligne", sub: "Depuis votre espace client", highlight: true },
  { value: "24/7", label: "Support client", sub: "Une équipe à votre écoute" },
];

export default function KeyStats() {
  return (
    <section className="py-14 md:py-20 bg-paper">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <Reveal stagger>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`font-display font-bold text-3xl md:text-4xl mb-1 ${stat.highlight ? "text-amber" : "text-ink"}`}>{stat.value}</p>
                <p className="font-mono-tag text-[11px] font-semibold text-slate uppercase tracking-wider">{stat.label}</p>
                <p className="text-slate text-xs mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}