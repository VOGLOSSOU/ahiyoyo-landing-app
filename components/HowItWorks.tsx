import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

const steps = [
  { num: "01", title: "Demande", desc: "Vous envoyez le lien, la photo, la quantité ou les détails du produit." },
  { num: "02", title: "Devis", desc: "Ahiyoyo estime les coûts d'achat, le transport, les délais et les conditions." },
  { num: "03", title: "Paiement", desc: "Vous validez, puis la commande est lancée auprès des fournisseurs." },
  { num: "04", title: "Préparation", desc: "Réception, consolidation, emballage, documentation et expédition." },
  { num: "05", title: "Livraison", desc: "Suivi jusqu'au retrait ou à la livraison finale." },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <Stamp variant="amber" className="mb-6">Comment ça marche</Stamp>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Envoyez-nous vos besoins, notre équipe vous guide jusqu&apos;à la livraison finale.
          </p>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-4">
            {steps.map((step) => (
              <Waybill key={step.num} className="p-6 md:p-6 lift">
                <span className="font-mono-tag text-amber text-xs font-semibold mb-4 block">N° {step.num}</span>
                <h3 className="font-display font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
              </Waybill>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}