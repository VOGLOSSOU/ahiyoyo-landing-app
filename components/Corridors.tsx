import Reveal from "./Reveal";

export default function Corridors() {
  return (
    <section className="py-10 md:py-14 bg-paperAlt" style={{ boxShadow: "0 -1px 0 rgba(20,22,31,.07), 0 1px 0 rgba(20,22,31,.07)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 text-center">
        <Reveal>
          <p className="font-mono-tag text-[11px] font-semibold text-slate mb-7">NOS CORRIDORS ACTIFS</p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            <span className="text-ink font-semibold text-lg font-display"><i className="fa-solid fa-location-dot text-amber mr-2 text-base" />Chine</span>
            <span className="text-ink font-semibold text-lg font-display"><i className="fa-solid fa-location-dot text-amber mr-2 text-base" />France</span>
            <span className="text-ink font-semibold text-lg font-display"><i className="fa-solid fa-location-dot text-amber mr-2 text-base" />Bénin</span>
            <span className="text-ink font-semibold text-lg font-display hidden sm:inline"><i className="fa-solid fa-location-dot text-amber mr-2 text-base" />Togo</span>
            <span className="text-ink font-semibold text-lg font-display hidden md:inline"><i className="fa-solid fa-location-dot text-amber mr-2 text-base" />Côte d&apos;Ivoire</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}