import Stamp from "./Stamp";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="tarifs" className="py-12 md:py-20 bg-gradient-to-b from-paper to-paperAlt">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12 md:mb-14">
            <Stamp className="mb-6">Tarifs</Stamp>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">Tarifs simples et transparents</h2>
            <p className="text-slate text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Chaque devis est validé avant l&apos;expédition. Pas de frais cachés, juste des prix justes et clairs.
            </p>
          </div>
        </Reveal>

        {/* 3 points clés - Clean */}
        <Reveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-bolt text-amber text-lg" />
              </div>
              <h3 className="font-display font-semibold mb-2">Devis rapides</h3>
              <p className="text-slate text-sm leading-relaxed">Estimation en quelques heures, avant de valider votre commande.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-eye text-amber text-lg" />
              </div>
              <h3 className="font-display font-semibold mb-2">Transparence totale</h3>
              <p className="text-slate text-sm leading-relaxed">Chaque coût est détaillé et expliqué. Zéro surprise.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-handshake text-amber text-lg" />
              </div>
              <h3 className="font-display font-semibold mb-2">Support pro</h3>
              <p className="text-slate text-sm leading-relaxed">Équipe réactive de la demande à la livraison.</p>
            </div>
          </div>
        </Reveal>

        {/* Tarifs principaux - 2 colonnes épurées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-14 md:mb-16">
          {/* Fret Aérien */}
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <i className="fa-solid fa-plane text-amber" />
                </div>
                <h3 className="text-2xl font-display font-bold">Fret aérien</h3>
              </div>
              <p className="text-slate text-sm mb-6 leading-relaxed">Chine → Afrique. Parfait pour les colis urgents, produits légers et tests de marché.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-paperAlt rounded-xl border border-ink/5 hover:border-amber/30 transition-colors">
                  <div>
                    <p className="font-display font-semibold">Standard</p>
                    <p className="text-slate text-xs mt-1">10 à 20 jours</p>
                  </div>
                  <p className="font-mono-tag font-bold text-xl text-amber">15 000 F<span className="text-sm text-slate font-normal ml-1">/kg</span></p>
                </div>
                <div className="flex items-center justify-between p-4 bg-paperAlt rounded-xl border border-ink/5 hover:border-amber/30 transition-colors">
                  <div>
                    <p className="font-display font-semibold">Électroniques</p>
                    <p className="text-slate text-xs mt-1">≈ 3 semaines</p>
                  </div>
                  <p className="font-mono-tag font-bold text-xl text-amber">17 000 F<span className="text-sm text-slate font-normal ml-1">/kg</span></p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Fret Maritime */}
          <Reveal delay={100}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <i className="fa-solid fa-ship text-amber" />
                </div>
                <h3 className="text-2xl font-display font-bold">Fret maritime</h3>
              </div>
              <p className="text-slate text-sm mb-6 leading-relaxed">Chine → Afrique. Idéal pour les envois volumineux et marchandises lourdes.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-paperAlt rounded-xl border border-ink/5 hover:border-amber/30 transition-colors">
                  <div>
                    <p className="font-display font-semibold">1 à 9,99 CBM</p>
                    <p className="text-slate text-xs mt-1">≈ 90 jours</p>
                  </div>
                  <p className="font-mono-tag font-bold text-xl text-amber">250 000 F<span className="text-sm text-slate font-normal ml-1">/CBM</span></p>
                </div>
                <div className="flex items-center justify-between p-4 bg-paperAlt rounded-xl border border-ink/5 hover:border-amber/30 transition-colors">
                  <div>
                    <p className="font-display font-semibold">À partir de 10 CBM</p>
                    <p className="text-slate text-xs mt-1">≈ 90 jours</p>
                  </div>
                  <p className="font-mono-tag font-bold text-xl text-amber">230 000 F<span className="text-sm text-slate font-normal ml-1">/CBM</span></p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Corridors */}
        <Reveal>
          <div className="mb-8">
            <h3 className="font-display font-bold text-lg mb-6">Nos corridors actifs</h3>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-ink/8 bg-paperAlt hover:border-amber/40 transition-colors">
              <h4 className="font-display font-semibold mb-2">Bénin ↔ Togo ↔ Côte d&apos;Ivoire</h4>
              <p className="text-slate text-sm">Corridor Ouest Africain. Colis et marchandises.</p>
            </div>
            <div className="p-5 rounded-xl border border-ink/8 bg-paperAlt hover:border-amber/40 transition-colors">
              <h4 className="font-display font-semibold mb-2">Afrique → Chine</h4>
              <p className="text-slate text-sm">Envois aériens à partir de 10 000 F/kg.</p>
            </div>
            <div className="p-5 rounded-xl border border-ink/8 bg-paperAlt hover:border-amber/40 transition-colors">
              <h4 className="font-display font-semibold mb-2">Afrique → Paris</h4>
              <p className="text-slate text-sm">Envois aériens à partir de 10 000 F/kg.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
