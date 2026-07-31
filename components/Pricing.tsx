import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const benefits = [
  "Consultez les tarifs et adresses utiles avant toute opération",
  "Les frais et montants sont directement affichés pour chaque opération et sans frais cachés",
  "Nos délais estimatifs pour chaque ligne vous aident à mieux anticiper les livraisons",
  "Nous proposons des tarifs au kilogramme ou au CBM",
  "Les adresses d'entrepôts s'affichent avec des instructions d'envoi pour éviter les erreurs",
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="rounded-[1.75rem] bg-navy text-white relative overflow-hidden p-7 sm:p-10 md:p-14 text-center">
            <div className="grain" />
            <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-amber/15 blur-3xl" />
            <div className="relative">
              <Stamp variant="ghost" className="mb-6">TRANSPARENCE DES PRIX</Stamp>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-10">Les tarifs et adresses utiles, accessibles avant d&apos;envoyer.</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 justify-items-center">
                {benefits.map((item, index) => (
                  <div key={index} className="w-full max-w-lg rounded-xl border border-white/10 bg-white/[.04] p-5 md:p-6 flex items-start gap-3 text-left">
                    <span className="w-6 h-6 rounded-full bg-amber/15 text-amber flex items-center justify-center flex-shrink-0 mt-0.5"><i className="fa-solid fa-check text-[9px]" /></span>
                    <p className="text-sm md:text-base text-white/75 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/tarifs" className="btn-primary inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-7 py-4 rounded-full text-sm">Consulter les lignes tarifaires <i className="fa-solid fa-arrow-right ml-2" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}