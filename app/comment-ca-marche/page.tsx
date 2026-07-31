import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSpace from "@/components/ClientSpace";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import ContactCTA from "@/components/ContactCTA";

const assurances = [
  { icon: "fa-headset", title: "Support humain", text: "Une équipe intervient quand une décision ou une vérification est nécessaire." },
  { icon: "fa-receipt", title: "Coûts expliqués", text: "Vous validez les éléments importants avant l’engagement de l’opération." },
  { icon: "fa-location-crosshairs", title: "Suivi centralisé", text: "Statuts, documents et informations utiles restent accessibles au même endroit." },
];

export const metadata = {
  title: "Comment ça marche - Ahiyoyo",
  description: "Découvrez comment Ahiyoyo vous accompagne à chaque étape de vos opérations d'import, d'export et de logistique internationale.",
};

export default function CommentCaMarche() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <HowItWorks asPage />

        <Services />

        <ClientSpace dark />

        <section className="py-10 sm:py-14 md:py-18 bg-paperAlt border-y border-ink/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-5">
              {assurances.map((item) => (
                <article key={item.title} className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-ink/8 bg-paper">
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber/15 text-amber flex items-center justify-center flex-shrink-0"><i className={`fa-solid ${item.icon}`} /></span>
                  <div><h2 className="font-display font-semibold mb-1.5">{item.title}</h2><p className="text-sm text-slate leading-relaxed">{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
