import Image from "next/image";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const partners = [
  { name: "China Merchants Fund", logo: "/partners/China_Merchants_Fund_8K.webp" },
  { name: "Digital Valley", logo: "/partners/Digital_Valley_8K.webp" },
  { name: "MTN Innovation Lab", logo: "/partners/MTN_Innovation_Lab_8K.webp", dark: true },
  { name: "Talents Africains à l’International", logo: "/partners/Talents_Africains_International_8K.webp" },
  { name: "Westerwelle Foundation", logo: "/partners/Westerwelle_Foundation_8K.webp" },
];

function PartnerGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="partners-group flex gap-4 pr-4" aria-hidden={duplicate || undefined}>
      {partners.map((partner) => (
        <div key={`${duplicate ? "duplicate-" : ""}${partner.name}`} className={`w-64 sm:w-72 h-32 sm:h-36 rounded-2xl border flex items-center justify-center px-7 sm:px-9 flex-shrink-0 ${partner.dark ? "bg-navy border-white/10" : "bg-white border-black/8"}`}>
          <Image src={partner.logo} alt={duplicate ? "" : partner.name} width={1200} height={360} className="w-full h-20 object-contain" sizes="(max-width: 640px) 200px, 230px" />
        </div>
      ))}
    </div>
  );
}

export default function Partners() {
  return (
    <section className="py-16 md:py-20 bg-paperAlt border-y border-ink/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-6 text-center mb-10 md:mb-12">
        <Reveal>
          <Stamp variant="amber" className="mb-5">Écosystème</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Ils nous accompagnent</h2>
          <p className="text-slate text-sm md:text-base max-w-xl mx-auto leading-relaxed">Des organisations qui soutiennent l’innovation, l’entrepreneuriat et le développement d’Ahiyoyo.</p>
        </Reveal>
      </div>

      <Reveal>
        <div className="partners-marquee relative" aria-label="Organisations qui accompagnent Ahiyoyo">
          <div className="partners-track flex w-max">
            <PartnerGroup />
            <PartnerGroup duplicate />
          </div>
          <div className="partners-fade-left absolute inset-y-0 left-0 w-12 sm:w-28 pointer-events-none z-10" />
          <div className="partners-fade-right absolute inset-y-0 right-0 w-12 sm:w-28 pointer-events-none z-10" />
        </div>
      </Reveal>
    </section>
  );
}
