import Stamp from "./Stamp";

export default function Transition() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, rgba(20,22,31,.3) 0 6px, transparent 6px 12px)" }} />
          <Stamp variant="amber" className="whitespace-nowrap">Ahiyoyo change ça</Stamp>
          <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, rgba(20,22,31,.3) 0 6px, transparent 6px 12px)" }} />
        </div>
      </div>
    </section>
  );
}