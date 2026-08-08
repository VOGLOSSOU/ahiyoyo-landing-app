"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const corridors = [
  { origin: "Chine", originCity: "Guangzhou", destination: "Bénin", destinationCity: "Cotonou", ref: "TRACK-2607-23B8" },
  { origin: "Chine", originCity: "Guangzhou", destination: "Togo", destinationCity: "Lomé", ref: "TRACK-2607-19A4" },
  { origin: "Chine", originCity: "Guangzhou", destination: "Côte d’Ivoire", destinationCity: "Abidjan", ref: "TRACK-2607-31C2" },
  { origin: "France", originCity: "Paris", destination: "Bénin", destinationCity: "Cotonou", ref: "TRACK-2607-08F5" },
];

const shipmentSteps = [
  { label: "Commande validée", done: true },
  { label: "Reçu au cargo", done: true },
  { label: "Envoi en cours", current: true },
  { label: "Arrivée à destination" },
];

const ROTATION_INTERVAL_MS = 4500;
const FADE_DURATION_MS = 300;

export default function ShipmentPreviewCard() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % corridors.length);
        setVisible(true);
      }, FADE_DURATION_MS);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const corridor = corridors[index];

  return (
    <div className="waybill relative p-6 md:p-8 border border-ink/8">
      <div
        className={`transition-opacity motion-reduce:transition-none duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <p className="font-mono-tag text-[9px] text-slate mb-2">EXPÉDITION EN COURS</p>
            <p className="font-display font-bold text-xl">{corridor.origin} → {corridor.destination}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 text-amber border border-amber/30 px-3 py-1.5 text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-amber" />En transit</span>
        </div>

        <div className="rounded-2xl bg-paper p-4 mb-7">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs text-slate">Départ</p><p className="font-display font-semibold mt-1">{corridor.originCity}</p></div>
            <div className="flex-1 flex items-center gap-2 text-amber"><span className="flex-1 border-t border-dashed border-ink/20" /><i className="fa-solid fa-plane" /><span className="flex-1 border-t border-dashed border-ink/20" /></div>
            <div className="text-right"><p className="text-xs text-slate">Destination</p><p className="font-display font-semibold mt-1">{corridor.destinationCity}</p></div>
          </div>
        </div>

        <div className="space-y-0">
          {shipmentSteps.map((step, stepIndex) => (
            <div key={step.label} className="grid grid-cols-[24px_1fr] gap-3 min-h-12">
              <div className="relative flex justify-center">
                {stepIndex < shipmentSteps.length - 1 && <span className={`absolute top-5 bottom-0 w-px ${step.done ? "bg-emerald-500" : "bg-ink/10"}`} />}
                <span className={`relative z-10 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-500 text-white" : step.current ? "bg-amber text-[#111827]" : "border border-ink/15 bg-paperAlt"}`}>{step.done && <i className="fa-solid fa-check text-[8px]" />}{step.current && <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />}</span>
              </div>
              <p className={`text-sm pb-5 ${step.current ? "font-semibold text-ink" : "text-slate"}`}>{step.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-ink/8">
          <div><p className="font-mono-tag text-[8px] text-slate">RÉFÉRENCE</p><p className="font-mono-tag text-xs font-semibold mt-1">{corridor.ref}</p></div>
          <Link href="/suivi" className="text-xs font-semibold text-amber hover:underline">Voir le suivi <i className="fa-solid fa-arrow-right ml-1" /></Link>
        </div>
      </div>
    </div>
  );
}
