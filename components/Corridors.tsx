import Reveal from "./Reveal";

const places = [
  { flagCode: "cn", name: "Chine", role: "Sourcing & départ" },
  { flagCode: "fr", name: "France", role: "Corridor international" },
  { flagCode: "bj", name: "Bénin", role: "Agence & distribution" },
  { flagCode: "tg", name: "Togo", role: "Agence & distribution" },
  { flagCode: "ci", name: "Côte d’Ivoire", role: "Agence & distribution" },
];

export default function Corridors() {
  return (
    <section className="py-9 md:py-11 bg-paperAlt border-y border-ink/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="lg:w-44 flex-shrink-0 text-center lg:text-left">
              <p className="font-mono-tag text-[10px] font-semibold text-slate">NOTRE RÉSEAU</p>
              <p className="text-xs text-slate mt-1">Des relais là où ça compte.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
              {places.map((place) => (
                <div key={place.name} className="rounded-xl border border-ink/8 bg-paper px-3 py-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative flag icon, no need for next/image optimization */}
                  <img src={`https://flagcdn.com/${place.flagCode}.svg`} alt="" className="w-7 h-5 rounded-[3px] object-cover flex-shrink-0 border border-ink/10" />
                  <div className="min-w-0"><p className="font-display font-semibold text-sm truncate">{place.name}</p><p className="text-[9px] text-slate mt-0.5 truncate">{place.role}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
