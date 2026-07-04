import Stamp from "./Stamp";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-16 md:py-28 bg-navy text-white relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-4xl mx-auto px-5 md:px-6 text-center relative">
        <Stamp variant="ghost" className="mb-7">Contact</Stamp>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-5">Prêt à lancer votre prochaine commande ?</h2>
        <p className="text-white/60 text-base md:text-lg mb-11 max-w-xl mx-auto">
          Envoyez-nous vos besoins, notre équipe vous guide jusqu&apos;à la livraison finale.
          Créez votre compte gratuitement ou contactez-nous pour toute question.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#" className="btn-primary bg-amber text-ink font-semibold px-8 py-4 rounded-full text-sm md:text-base">
            Créer un compte
          </a>
          <a href="mailto:support@ahiyoyo.com" className="btn-ghost border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 text-sm md:text-base">
            Nous contacter
          </a>
        </div>

        <div className="mt-14 flex items-center justify-center gap-8 md:gap-12 text-sm text-white/60 flex-wrap font-mono-tag text-xs">
          <div><i className="fa-solid fa-phone text-amber mr-2" />+229 01 91 08 41 41</div>
          <div><i className="fa-solid fa-envelope text-amber mr-2" />support@ahiyoyo.com</div>
        </div>
      </div>
    </section>
  );
}