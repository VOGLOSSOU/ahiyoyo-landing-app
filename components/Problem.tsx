import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

export default function Problem() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-5 md:px-6 relative">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <Stamp variant="ghost" className="mb-7">Une logistique plus lisible</Stamp>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-5">Ahiyoyo remplace plusieurs intermédiaires</h2>
            <p className="text-white/60 leading-relaxed mb-8">Plus besoin de chercher séparément un fournisseur, un intermédiaire d&apos;achat, un transporteur, un transitaire ou des clients à l&apos;international.<br /><br />Même à distance, vous gardez un œil sur toutes vos activités commerciales avec le reste du monde.</p>
            <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Comprendre notre fonctionnement <i className="fa-solid fa-arrow-right text-xs" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
