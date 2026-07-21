"use client";

import Stamp from "./Stamp";
import Waybill from "./Waybill";

export default function Tracking() {
  return (
    <section id="suivi" className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <Stamp variant="amber" className="mb-6">Suivi de commande</Stamp>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Suivez votre envoi en direct</h2>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Entrez votre numéro de suivi pour consulter le statut et l&apos;historique de votre commande,
            de la validation du devis jusqu&apos;à la livraison.
          </p>
        </div>

        <Waybill className="p-6 md:p-8">
          <form onSubmit={(e) => { e.preventDefault(); alert("Intégration avec le backend de suivi Ahiyoyo"); }} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="tracking-number" className="sr-only">Numéro de suivi</label>
            <input
              id="tracking-number"
              name="trackingNumber"
              type="text"
              required
              autoComplete="off"
              placeholder="Ex: AHI-2026-0001"
              className="font-mono-tag min-w-0 flex-1 rounded-full border border-ink/15 px-5 py-3 text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
            />
            <button type="submit" className="btn-primary bg-amber text-ink font-semibold px-6 md:px-8 py-3 rounded-full text-sm whitespace-nowrap">
              <i className="fa-solid fa-magnifying-glass mr-2" />Rechercher
            </button>
          </form>
        </Waybill>
      </div>
    </section>
  );
}
