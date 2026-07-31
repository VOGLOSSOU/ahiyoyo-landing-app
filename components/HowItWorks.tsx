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
    <section className="py-12 sm:py-16 md:py-24 bg-paperAlt relative overflow-hidden">
      <div className="grain" />
      <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 relative">
        <div className={`mb-10 sm:mb-14 md:mb-20 ${asPage ? "grid lg:grid-cols-[1fr_auto] lg:items-end gap-7 md:gap-8" : "max-w-2xl"}`}>
          <div className="max-w-3xl">
            <Stamp variant="amber" dot className="mb-5 sm:mb-6">Comment ça marche</Stamp>
            <Heading className="text-[2rem] sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-4 sm:mb-5">Un parcours clair, de votre besoin jusqu’à la remise.</Heading>
            <p className="text-slate text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">Vous gardez un interlocuteur et une vision claire pendant qu’Ahiyoyo coordonne les fournisseurs, les paiements et la logistique.</p>
          </div>
          {asPage && (
            <div className="grid sm:flex sm:flex-wrap lg:grid lg:grid-cols-1 xl:flex gap-3 w-full lg:w-auto">
              <a href="https://app.ahiyoyo.com/nouvelle-demande" className="btn-primary min-h-12 inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-5 sm:px-6 py-3 rounded-full text-sm text-center">Demander un devis <i className="fa-solid fa-arrow-right ml-2 text-xs" /></a>
              <a href="https://app.ahiyoyo.com/expedier-colis" className="btn-ghost min-h-12 inline-flex items-center justify-center border border-ink/20 text-ink font-semibold px-5 sm:px-6 py-3 rounded-full text-sm text-center">Enregistrer un colis</a>
            </div>
          )}
        </div>

        <Reveal stagger>
          <div className="relative grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 before:absolute before:left-6 before:top-10 before:bottom-10 before:border-l-2 before:border-dashed before:border-amber/35 lg:before:hidden">
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-6 border-t-2 border-dashed border-amber/35" aria-hidden="true" />
            {steps.map((step) => (
              <article key={step.num} className="group relative grid grid-cols-[48px_minmax(0,1fr)] lg:block gap-3 sm:gap-4 lg:pt-16">
                <div className="lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 relative z-10 w-12 h-12 rounded-full bg-navy border-4 border-paperAlt text-amber flex items-center justify-center shadow-lg group-hover:scale-105 transition"><i className={`fa-solid ${step.icon}`} /></div>
                <div className="waybill border border-ink/8 h-full p-4 sm:p-5 md:p-6 !rounded-2xl lg:!rounded-[22px] !shadow-[0_16px_40px_-32px_rgba(0,0,0,.5)]">
                  <p className="font-mono-tag text-[9px] text-amber mb-3">ÉTAPE {step.num}</p>
                  <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {asPage && (
          <div className="mt-8 sm:mt-10 text-center">
            <Link href="/suivi" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-amber hover:underline leading-relaxed">Vous avez déjà une référence ? Suivre une opération <i className="fa-solid fa-arrow-right text-xs flex-shrink-0" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
