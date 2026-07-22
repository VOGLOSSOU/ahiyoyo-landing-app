"use client";

import { useState } from "react";
import Link from "next/link";
import Stamp from "./Stamp";
import Reveal from "./Reveal";

const journeys = [
  {
    id: "acheter", label: "Acheter", icon: "fa-cart-shopping", title: "Acheter auprès des bons fournisseurs",
    description: "Confiez-nous la recherche, la négociation et la coordination de votre achat, même si vous n’avez pas encore identifié le fournisseur.",
    steps: ["Recherche et comparaison des fournisseurs", "Devis et validation avant engagement", "Paiement et suivi de la commande", "Réception et contrôle avant expédition"],
    cta: "Accéder à mon compte", href: "https://app.ahiyoyo.com",
  },
  {
    id: "importer", label: "Importer", icon: "fa-plane-arrival", title: "Faire venir vos marchandises en Afrique",
    description: "Choisissez la route adaptée à votre urgence et à votre volume. Ahiyoyo coordonne la réception, le groupage et l’acheminement.",
    steps: ["Adresse d’entrepôt et instructions claires", "Réception et mesure au cargo", "Fret aérien, maritime ou routier", "Suivi jusqu’au retrait ou à la livraison"],
    cta: "Voir les adresses et tarifs", href: "/tarifs",
  },
  {
    id: "exporter", label: "Exporter", icon: "fa-box-open", title: "Vendre et expédier depuis l’Afrique",
    description: "Préparez vos produits pour des clients, partenaires ou marketplaces hors de votre marché local.",
    steps: ["Analyse du besoin et de la destination", "Préparation des produits et documents", "Organisation du transport international", "Coordination avec les acteurs de destination"],
    cta: "Parler à notre équipe", href: "mailto:support@ahiyoyo.com",
  },
  {
    id: "suivre", label: "Suivre", icon: "fa-location-crosshairs", title: "Savoir où en est votre opération",
    description: "Une seule référence permet de consulter publiquement les informations importantes d’un colis ou d’une commande.",
    steps: ["Statut actuel traduit clairement", "Trajet, montant et délai estimé", "Historique et commentaires utiles", "Documents et détails de l’opération"],
    cta: "Suivre une référence", href: "/suivi",
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState("acheter");
  const active = journeys.find((journey) => journey.id === activeId) || journeys[0];

  return (
    <section id="fonctionnalites" className="py-16 md:py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <Stamp className="mb-6">Votre objectif</Stamp>
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">Que voulez-vous faire aujourd’hui ?</h2>
          <p className="text-slate leading-relaxed">Choisissez votre besoin pour découvrir le parcours Ahiyoyo correspondant.</p>
        </div>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-7" role="tablist" aria-label="Choisir un objectif">
            {journeys.map((journey) => <button key={journey.id} type="button" role="tab" aria-selected={activeId === journey.id} aria-controls="journey-panel" onClick={() => setActiveId(journey.id)} className={`rounded-full border px-4 sm:px-5 py-3 text-sm font-semibold transition ${activeId === journey.id ? "bg-amber border-amber text-[#111827] shadow-sm" : "bg-paperAlt border-ink/10 text-slate hover:text-ink hover:border-amber/40"}`}><i className={`fa-solid ${journey.icon} mr-2`} />{journey.label}</button>)}
          </div>

          <div id="journey-panel" role="tabpanel" className="waybill border border-ink/8 p-6 sm:p-8 md:p-10">
            <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-9 lg:gap-14 items-center">
              <div><span className="w-12 h-12 rounded-xl bg-navy text-amber flex items-center justify-center mb-6"><i className={`fa-solid ${active.icon}`} /></span><h3 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-4">{active.title}</h3><p className="text-slate text-sm md:text-base leading-relaxed mb-7">{active.description}</p><Link href={active.href} className="btn-primary inline-flex items-center bg-amber text-[#111827] rounded-full px-6 py-3.5 text-sm font-semibold">{active.cta}<i className="fa-solid fa-arrow-right ml-2 text-xs" /></Link></div>
              <ol className="space-y-3">{active.steps.map((step, index) => <li key={step} className="rounded-xl border border-ink/8 bg-paper p-4 flex items-center gap-4"><span className="font-mono-tag text-[9px] text-amber w-6">0{index + 1}</span><span className="text-sm font-medium">{step}</span></li>)}</ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
