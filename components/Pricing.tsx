import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="tarifs" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <Stamp className="mb-6">Tarifs</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Des tarifs clairs, sans surprise</h2>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Les kilos et volumes facturés sont confirmés après pesée. Les restrictions produit peuvent varier selon la catégorie.
          </p>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 reveal-stagger mb-8">
            {/* Fret Aérien */}
            <Waybill className="p-7 md:p-8">
              <Stamp variant="amber" className="!py-1.5 !px-3 !text-[10px] mb-6 inline-block">
                <i className="fa-solid fa-plane text-xs mr-1" />Fret aérien — Chine → Afrique
              </Stamp>
              <div className="price-row">
                <div>
                  <p className="font-display font-semibold">Standard</p>
                  <p className="text-slate text-xs mt-0.5">10 à 20 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">15 000 F<span className="text-xs text-slate font-normal">/kg</span></p>
              </div>
              <div className="price-row">
                <div>
                  <p className="font-display font-semibold">Électroniques</p>
                  <p className="text-slate text-xs mt-0.5">environ 3 semaines</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">17 000 F<span className="text-xs text-slate font-normal">/kg</span></p>
              </div>
              <p className="text-slate text-xs mt-6 leading-relaxed">Recommandé pour les colis urgents, les produits légers et les commandes de test.</p>
            </Waybill>

            {/* Fret Maritime */}
            <Waybill className="p-7 md:p-8">
              <Stamp variant="amber" className="!py-1.5 !px-3 !text-[10px] mb-6 inline-block">
                <i className="fa-solid fa-ship text-xs mr-1" />Fret maritime — Chine → Afrique
              </Stamp>
              <div className="price-row">
                <div>
                  <p className="font-display font-semibold">1 à 9,99 CBM</p>
                  <p className="text-slate text-xs mt-0.5">≈ 90 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">250 000 F<span className="text-xs text-slate font-normal">/CBM</span></p>
              </div>
              <div className="price-row">
                <div>
                  <p className="font-display font-semibold">À partir de 10 CBM</p>
                  <p className="text-slate text-xs mt-0.5">≈ 90 jours</p>
                </div>
                <p className="font-mono-tag font-bold text-lg">230 000 F<span className="text-xs text-slate font-normal">/CBM</span></p>
              </div>
              <p className="text-slate text-xs mt-6 leading-relaxed">Adapté aux produits volumineux. Minimum conseillé : 1 CBM selon le type de marchandise.</p>
            </Waybill>
          </div>
        </Reveal>

        <div className="text-center mb-8">
          <span className="font-mono-tag text-[11px] font-semibold text-slate uppercase tracking-wider">Export depuis l&apos;Afrique</span>
        </div>

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8">
              <h3 className="font-display font-semibold mb-1.5">Bénin ↔ Togo ↔ Côte d&apos;Ivoire</h3>
              <p className="text-slate text-sm leading-relaxed">Colis et marchandises sur le corridor Ouest Africain.</p>
            </div>
            <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8">
              <h3 className="font-display font-semibold mb-1.5">Afrique → Chine</h3>
              <p className="text-slate text-sm leading-relaxed">Envois aériens indicatifs à partir de 10 000 F/kg.</p>
            </div>
            <div className="bg-paperAlt rounded-2xl p-6 border border-ink/8">
              <h3 className="font-display font-semibold mb-1.5">Afrique → Paris</h3>
              <p className="text-slate text-sm leading-relaxed">Envois aériens à partir de 10 000 F/kg.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}