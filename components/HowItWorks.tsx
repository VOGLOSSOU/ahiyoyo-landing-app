import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const steps = [
  { num: "01", title: "Vous partagez votre besoin", desc: "Un lien, une photo, une quantité ou les détails de votre expédition suffisent pour commencer.", icon: "fa-paper-plane" },
  { num: "02", title: "Nous cadrons l’opération", desc: "Produit, fournisseur, route, coûts et délai : tout est clarifié avant votre validation.", icon: "fa-file-signature" },
  { num: "03", title: "Nous coordonnons sur place", desc: "Paiement, réception au cargo, contrôle, consolidation et préparation documentaire.", icon: "fa-people-arrows" },
  { num: "04", title: "Vous suivez jusqu’à la remise", desc: "Les étapes importantes restent accessibles avec votre référence Ahiyoyo.", icon: "fa-location-dot" },
];

export default function HowItWorks({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";

  return (
    <section className="py-16 md:py-24 bg-paperAlt relative overflow-hidden">
      <div className="grain" />
      <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 md:px-6 relative">
        <div className={`mb-14 md:mb-20 ${asPage ? "grid lg:grid-cols-[1fr_auto] lg:items-end gap-8" : "max-w-2xl"}`}>
          <div className="max-w-3xl">
            <Stamp variant="amber" dot className="mb-6">Comment ça marche</Stamp>
            <Heading className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.08] mb-5">Un parcours clair, de votre besoin jusqu’à la remise.</Heading>
            <p className="text-slate text-base md:text-lg leading-relaxed max-w-2xl">Vous gardez un interlocuteur et une vision claire pendant qu’Ahiyoyo coordonne les fournisseurs, les paiements et la logistique.</p>
          </div>
          {asPage && (
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-stretch">
              <a href="https://app.ahiyoyo.com/nouvelle-demande" className="btn-primary inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-6 py-3.5 rounded-full text-sm whitespace-nowrap">Demander un devis <i className="fa-solid fa-arrow-right ml-2 text-xs" /></a>
              <a href="https://app.ahiyoyo.com/expedier-colis" className="btn-ghost inline-flex items-center justify-center border border-ink/20 text-ink font-semibold px-6 py-3.5 rounded-full text-sm whitespace-nowrap">Enregistrer un colis</a>
            </div>
          )}
        </div>

        <Reveal stagger>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-6 border-t-2 border-dashed border-amber/35" aria-hidden="true" />
            {steps.map((step) => (
              <article key={step.num} className="group relative pt-0 lg:pt-16">
                <div className="lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 relative z-10 w-12 h-12 rounded-full bg-navy border-4 border-paperAlt text-amber flex items-center justify-center shadow-lg mb-5 lg:mb-0 group-hover:scale-105 transition"><i className={`fa-solid ${step.icon}`} /></div>
                <div className="waybill border border-ink/8 h-full p-5 md:p-6 !shadow-[0_16px_40px_-32px_rgba(0,0,0,.5)]">
                  <p className="font-mono-tag text-[9px] text-amber mb-3">ÉTAPE {step.num}</p>
                  <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {asPage && (
          <div className="mt-10 text-center">
            <Link href="/suivi" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Vous avez déjà une référence ? Suivre une opération <i className="fa-solid fa-arrow-right text-xs" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
