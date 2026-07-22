import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const questions = [
  { q: "Comment commencer avec Ahiyoyo ?", a: "Créez votre compte, décrivez votre besoin ou enregistrez votre colis. L’équipe vous indique ensuite les informations, documents et paiements nécessaires." },
  { q: "Puis-je expédier une petite quantité ?", a: "Oui. Le groupage permet de consolider les marchandises de plusieurs clients et d’expédier de petites quantités selon les routes disponibles." },
  { q: "Comment les tarifs sont-ils calculés ?", a: "Selon la route et le service, le calcul peut se faire au kilogramme, au CBM, au carton ou au forfait. Les mesures confirmées à l’entrepôt servent de base finale." },
  { q: "Comment suivre mon colis ou ma commande ?", a: "Saisissez simplement votre numéro Ahiyoyo, votre numéro transporteur ou votre référence commande sur la page publique de suivi." },
  { q: "Quels produits nécessitent une autorisation ?", a: "Les batteries, liquides, produits alimentaires, médicaments, cosmétiques, produits chimiques et autres marchandises réglementées doivent être déclarés avant l’envoi." },
];

export default function FAQPreview() {
  return (
    <section className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center mb-11 md:mb-14"><Stamp variant="amber" className="mb-6">Questions fréquentes</Stamp><h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Les réponses utiles avant de commencer.</h2><p className="text-slate">L’essentiel en quelques minutes, sans jargon logistique.</p></div>
        <Reveal>
          <div className="waybill divide-y divide-ink/8 border border-ink/8 mb-7">
            {questions.map((item) => <details key={item.q} className="faq-item group"><summary className="flex items-center justify-between gap-4 p-5 md:p-6"><span className="font-display font-semibold text-sm md:text-base">{item.q}</span><i className="fa-solid fa-chevron-down chevron text-amber text-sm flex-shrink-0" /></summary><div className="faq-answer"><div className="faq-answer-inner px-5 md:px-6"><p className="text-slate text-sm leading-relaxed pb-5 md:pb-6">{item.a}</p></div></div></details>)}
          </div>
          <div className="text-center"><Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Consulter toute la FAQ <i className="fa-solid fa-arrow-right text-xs" /></Link></div>
        </Reveal>
      </div>
    </section>
  );
}
