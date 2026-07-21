import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const benefits = [
  "Tarifs au kilogramme ou au CBM",
  "Adresses d’entrepôts copiables",
  "Contacts et instructions d’envoi",
  "Délais estimatifs par route",
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="rounded-[1.75rem] bg-navy text-white relative overflow-hidden p-7 sm:p-10 md:p-14">
            <div className="grain" />
            <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-amber/15 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_.8fr] gap-10 lg:gap-16 items-center">
              <div><Stamp variant="ghost" className="mb-6">Transparence</Stamp><h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-5">Les tarifs et adresses utiles, accessibles avant d’envoyer.</h2><p className="text-white/60 leading-relaxed max-w-xl">Consultez les lignes actives publiées par Ahiyoyo. Les montants viennent directement de notre plateforme et évoluent sans rendre cette page obsolète.</p></div>
              <div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 mb-7">{benefits.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-white/75"><span className="w-6 h-6 rounded-full bg-amber/15 text-amber flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-check text-[9px]" /></span>{item}</li>)}</ul>
                <Link href="/tarifs" className="btn-primary inline-flex items-center justify-center w-full sm:w-auto bg-amber text-[#111827] font-semibold px-7 py-4 rounded-full text-sm">Consulter les lignes tarifaires <i className="fa-solid fa-arrow-right ml-2" /></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
