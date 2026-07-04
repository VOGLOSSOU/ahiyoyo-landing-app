import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

const clientTools = [
  { icon: "fa-magnifying-glass", title: "Suivi en temps réel", desc: "Suivez votre colis à chaque étape depuis votre tableau de bord." },
  { icon: "fa-calculator", title: "Calculateur de tarifs", desc: "Estimez le coût de votre envoi selon le poids, le volume et la destination." },
  { icon: "fa-file-invoice", title: "Facturation proforma", desc: "Générez vos devis et factures en ligne avec validation par lien sécurisé." },
  { icon: "fa-credit-card", title: "Paiement en ligne", desc: "Payez vos commandes via KkiaPay, Mobile Money ou carte bancaire." },
  { icon: "fa-bell", title: "Notifications", desc: "Recevez des alertes par email et SMS à chaque changement de statut." },
  { icon: "fa-file-export", title: "Export Excel / PDF", desc: "Exportez vos bordereaux, factures et historiques en un clic." },
];

export default function ClientSpace() {
  return (
    <section id="espace-client" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <Stamp variant="amber" className="mb-6">Votre espace client</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Tout piloter en ligne, en toute simplicité</h2>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Un espace client pensé pour suivre, payer et gérer vos commandes sans effort.
          </p>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {clientTools.map((t) => (
              <Waybill key={t.title} className="rounded-2xl p-6 lift">
                <div className="w-11 h-11 bg-amber/15 border border-amber/40 rounded-xl flex items-center justify-center mb-4">
                  <i className={`fa-solid ${t.icon} text-amber`} />
                </div>
                <h3 className="font-display font-semibold mb-2">{t.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{t.desc}</p>
              </Waybill>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}