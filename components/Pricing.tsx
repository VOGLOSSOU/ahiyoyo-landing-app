import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="tarifs" className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <div className="text-center mb-7 md:mb-8">
          <Stamp className="mb-6">Tarifs</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Des tarifs clairs, sans surprise</h2>
          <p className="text-slate text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Vous obtenez un accompagnement transparent, avec des estimations de coûts claires avant toute expédition.
            Les tarifs peuvent varier selon le poids, le volume, le mode de transport et la nature du produit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-7">
          <div className="bg-paperAlt rounded-2xl p-5 border border-ink/8">
            <p className="font-display font-semibold mb-1">Devis rapides</p>
            <p className="text-slate text-sm">Obtenez une estimation avant de valider votre commande.</p>
          </div>
          <div className="bg-paperAlt rounded-2xl p-5 border border-ink/8">
            <p className="font-display font-semibold mb-1">Prix transparents</p>
            <p className="text-slate text-sm">Aucune surprise : chaque coût est expliqué avant expédition.</p>
          </div>
          <div className="bg-paperAlt rounded-2xl p-5 border border-ink/8">
            <p className="font-display font-semibold mb-1">Support humain</p>
            <p className="text-slate text-sm">Notre équipe vous guide jusqu’à la livraison finale.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 mb-4 md:mb-5">
          {/* Fret Aérien */}
          <Waybill className="p-7 md:p-8 bg-white">
            <Stamp variant="amber" className="!py-1.5 !px-3 !text-[10px] mb-6 inline-block">
              <i className="fa-solid fa-plane text-xs mr-1" />Fret aérien — Chine → Afrique
            </Stamp>
            <div className="rounded-2xl border border-ink/10 bg-paper p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">Standard</p>
                  <p className="text-slate text-xs mt-0.5">10 à 20 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">15 000 F<span className="text-xs text-slate font-normal">/kg</span></p>
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-paper p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">Électroniques</p>
                  <p className="text-slate text-xs mt-0.5">environ 3 semaines</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">17 000 F<span className="text-xs text-slate font-normal">/kg</span></p>
              </div>
            </div>
            <p className="text-slate text-sm mt-5 leading-relaxed">Recommandé pour les colis urgents, les produits légers et les commandes de test.</p>
          </Waybill>

          {/* Fret Maritime */}
          <Waybill className="p-7 md:p-8 bg-white">
            <Stamp variant="amber" className="!py-1.5 !px-3 !text-[10px] mb-6 inline-block">
              <i className="fa-solid fa-ship text-xs mr-1" />Fret maritime — Chine → Afrique
            </Stamp>
            <div className="rounded-2xl border border-ink/10 bg-paper p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">1 à 9,99 CBM</p>
                  <p className="text-slate text-xs mt-0.5">≈ 90 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">250 000 F<span className="text-xs text-slate font-normal">/CBM</span></p>
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-paper p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">À partir de 10 CBM</p>
                  <p className="text-slate text-xs mt-0.5">≈ 90 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">230 000 F<span className="text-xs text-slate font-normal">/CBM</span></p>
              </div>
            </div>
            <p className="text-slate text-sm mt-5 leading-relaxed">Adapté aux produits volumineux. Minimum conseillé : 1 CBM selon le type de marchandise.</p>
          </Waybill>
        </div>

        <div className="text-center mb-4 md:mb-5 pt-1">
          <span className="inline-flex items-center rounded-full border border-ink/10 bg-paperAlt px-3 py-1.5 font-mono-tag text-[11px] font-semibold text-slate uppercase tracking-wider">
            Export depuis l&apos;Afrique
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8 shadow-sm">
            <h3 className="font-display font-semibold mb-1.5">Bénin ↔ Togo ↔ Côte d&apos;Ivoire</h3>
            <p className="text-slate text-sm leading-relaxed">Colis et marchandises sur le corridor Ouest Africain.</p>
          </div>
          <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8 shadow-sm">
            <h3 className="font-display font-semibold mb-1.5">Afrique → Chine</h3>
            <p className="text-slate text-sm leading-relaxed">Envois aériens indicatifs à partir de 10 000 F/kg.</p>
          </div>
          <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8 shadow-sm">
            <h3 className="font-display font-semibold mb-1.5">Afrique → Paris</h3>
            <p className="text-slate text-sm leading-relaxed">Envois aériens à partir de 10 000 F/kg.</p>
          </div>
        </div>
      </div>
    </section>
  );
}