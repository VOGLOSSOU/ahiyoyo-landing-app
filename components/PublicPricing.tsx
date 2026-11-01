"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APPLICATION_URL, OFFER_ENDPOINTS, canUseOffer, currentPrice, detailUrl, formatOfferDate, readOffers, shareOffer, signupUrl, type OfferEntry, type OfferKind, type PublicOffer } from "@/lib/groupageOffers";

type FilterMode = "tous" | OfferKind;
type Result = { entries: OfferEntry[]; error: string | null };
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://orchid-jellyfish-551876.hostingersite.com").replace(/\/$/, "");
const FILTERS: Array<{ key: FilterMode; label: string; icon: string }> = [
  { key: "tous", label: "Toutes", icon: "fa-border-all" },
  { key: "maritime", label: "Maritime", icon: "fa-ship" },
  { key: "air", label: "Aérien", icon: "fa-plane" },
];

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  try {
    textarea.select();
    if (!document.execCommand("copy")) throw new Error("COPY_FAILED");
  } finally { textarea.remove(); }
}

export default function PublicPricing() {
  const [results, setResults] = useState<Record<OfferKind, Result>>({ maritime: { entries: [], error: null }, air: { entries: [], error: null } });
  const [filter, setFilter] = useState<FilterMode>("tous");
  const [loading, setLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load(kind: OfferKind): Promise<Result> {
      try {
        const response = await fetch(`${API_URL}${OFFER_ENDPOINTS[kind]}`, { headers: { Accept: "application/json" }, signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("REQUEST_FAILED");
        return { entries: readOffers(await response.json(), kind), error: null };
      } catch {
        return { entries: [], error: `Impossible de charger les offres ${kind === "maritime" ? "maritimes" : "aériennes"}.` };
      }
    }
    void Promise.all([load("maritime"), load("air")]).then(([maritime, air]) => {
      if (controller.signal.aborted) return;
      setResults({ maritime, air });
      setLoading(false);
    });
    return () => controller.abort();
  }, [retryKey]);

  const all: Result = { entries: [...results.maritime.entries, ...results.air.entries], error: [results.maritime.error, results.air.error].filter(Boolean).join(" ") || null };
  const selected = filter === "tous" ? all : results[filter];
  const retry = () => { setLoading(true); setRetryKey(key => key + 1); };

  return <div className="bg-paper min-h-screen">
    <section className="relative overflow-hidden border-b border-ink/5">
      <div className="grain" />
      <div className="relative max-w-3xl mx-auto px-5 py-10 md:py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-3">Nos adresses &amp; tarifs d’envoi</h1>
        <p className="text-slate leading-relaxed">Retrouvez les adresses de dépôt, les tarifs actuels et les dates des offres de groupage ouvertes.</p>
        <p className="mt-3 text-sm text-slate">Chaque adresse et ses instructions concernent uniquement l’offre indiquée. Vérifiez-les avant tout envoi.</p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-5 md:px-6 py-7 md:pb-14">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 mb-6" role="group" aria-label="Filtrer par mode de transport">
        {FILTERS.map(item => {
          const result = item.key === "tous" ? all : results[item.key];
          return <button key={item.key} type="button" onClick={() => setFilter(item.key)} aria-pressed={filter === item.key} className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${filter === item.key ? "bg-amber text-[#111827] border-amber shadow-sm" : "bg-paperAlt text-slate border-ink/10 hover:border-amber/50 hover:text-ink"}`}>
            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />{item.label}
            {!loading && !result.error && <span className="min-w-5 rounded-full bg-ink/5 px-1 text-xs">{result.entries.length}</span>}
          </button>;
        })}
      </div>
      {loading ? <p className="py-16 text-center text-slate" role="status">Chargement des adresses et tarifs...</p> : <>
        {selected.error && <div className="waybill p-6 mb-6 text-center" role="alert"><p className="text-postal">{selected.error}</p><button type="button" onClick={retry} className="mt-4 rounded-full bg-amber text-[#111827] px-5 py-2 font-semibold">Réessayer</button></div>}
        {selected.entries.length > 0 ? <div className={`grid gap-5 items-stretch ${selected.entries.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : "max-w-3xl mx-auto"}`}>{selected.entries.map(entry => <OfferCard key={`${entry.kind}-${entry.offer.id}`} entry={entry} />)}</div>
          : !selected.error && <div className="max-w-xl mx-auto waybill p-10 text-center"><h2 className="font-display font-bold text-xl mb-2">{filter === "tous" ? "Aucune offre ouverte pour le moment" : `Aucune offre ${filter === "maritime" ? "maritime" : "aérienne"} ouverte pour le moment`}</h2><p className="text-slate text-sm">Revenez prochainement pour découvrir nos prochaines offres de groupage.</p><a href={APPLICATION_URL} className="inline-block mt-5 text-amber font-semibold hover:underline">Accéder à mon espace client</a></div>}
      </>}
    </section>
  </div>;
}

function OfferCard({ entry }: { entry: OfferEntry }) {
  const { offer, kind } = entry;
  const maritime = kind === "maritime";
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");
  const [checking, setChecking] = useState(false);
  const [offerError, setOfferError] = useState("");
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const handleCopy = useCallback(async (key: string, text: string) => {
    try {
      await copyText(text); setCopied(key); setCopyError("");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2000);
    } catch { setCopyError("Copie impossible. Sélectionnez le texte manuellement."); }
  }, []);
  const useOffer = async () => {
    if (pending.current || !canUseOffer(entry)) return;
    pending.current = true; setChecking(true); setOfferError("");
    try {
      const response = await fetch(`${API_URL}${OFFER_ENDPOINTS[kind]}/${encodeURIComponent(offer.id)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      if (response.status === 404) { setOfferError("Cette offre n’est plus disponible. Consultez les autres offres."); return; }
      if (!response.ok) throw new Error("REQUEST_FAILED");
      const fresh: PublicOffer = await response.json();
      if (!fresh || fresh.id !== offer.id || !canUseOffer({ kind, offer: fresh })) { setOfferError("Cette offre n’est plus disponible. Consultez les autres offres."); return; }
      // L’application conserve le chemin et sa query string pendant l’authentification.
      window.location.assign(signupUrl(entry));
    } catch { setOfferError("Impossible de vérifier l’offre. Réessayez dans quelques instants."); }
    finally { pending.current = false; setChecking(false); }
  };
  const price = currentPrice(entry);
  const minimum = maritime ? Number(offer.volumeMinimumCbm) : null;
  const deadline = formatOfferDate(offer.dateClotureCible);
  const departure = formatOfferDate(offer.dateDepartEstimee);
  const corridor = offer.corridor;
  const address = offer.adresseDepot?.trim();
  const instructions = offer.instructionsDepot?.trim();
  const allInfo = [offer.titre, offer.reference, address ? `Adresse de dépôt :\n${address}` : null, instructions ? `Instructions :\n${instructions}` : null].filter(Boolean).join("\n\n");

  return <article className="waybill border border-ink/8 flex flex-col min-w-0 h-full">
    <div className="p-5 md:p-6 border-b border-ink/8 bg-paper/60">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3"><span className="text-amber text-xs font-bold uppercase"><i className={`fa-solid ${maritime ? "fa-ship" : "fa-plane"} mr-2`} aria-hidden="true" />{maritime ? "Maritime" : "Aérien"}</span><span className="text-xs text-slate break-all">{offer.reference}</span></div>
      <h2 className="font-display text-xl font-bold break-words mb-4">{offer.titre || "Offre de groupage"}</h2>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
        <div className="[overflow-wrap:anywhere]"><p className="text-xs text-slate mb-1">Départ</p><p className="font-bold">{corridor?.villeDepart || "-"}</p><p className="text-slate">{corridor?.paysDepart || "-"}</p></div>
        <i className="fa-solid fa-arrow-right text-amber" aria-hidden="true" />
        <div className="text-right [overflow-wrap:anywhere]"><p className="text-xs text-slate mb-1">Destination</p><p className="font-bold">{corridor?.villeDestination || "-"}</p><p className="text-slate">{corridor?.paysDestination || "-"}</p></div>
      </div>
    </div>
    <div className="p-5 md:p-6 flex-1 space-y-5">
      <div><p className="text-xs text-slate mb-1">Tarif actuel de l’offre</p><p className="text-2xl font-display font-bold">{price !== null ? <>{price.toLocaleString("fr-FR")} <span className="text-sm text-slate">FCFA / {maritime ? "CBM" : "KG"}</span></> : "Tarif indisponible"}</p><p className="text-xs text-slate mt-2">Le tarif peut évoluer selon le remplissage. Consultez les paliers dans les détails.</p>
        {minimum !== null && Number.isFinite(minimum) && minimum > 0 && <p className="text-sm mt-2">Minimum déclaré : {minimum.toLocaleString("fr-FR", { maximumFractionDigits: 3 })} CBM</p>}
      </div>
      <div className="text-sm space-y-2"><p className="text-orange-700 dark:text-orange-300"><i className="fa-solid fa-calendar-check mr-2" aria-hidden="true" />{deadline ? `Date limite de réception : ${deadline}` : "Date limite de réception à confirmer"}</p><p className="text-blue-700 dark:text-blue-300"><i className="fa-solid fa-calendar-days mr-2" aria-hidden="true" />{departure ? `Départ estimé : ${departure}` : "Départ à confirmer"}</p>{Number.isFinite(offer.delaiJours) && Number(offer.delaiJours) > 0 && <p className="text-slate text-xs">Délai de transport estimatif : {offer.delaiJours} jours</p>}</div>
      <div className="space-y-3">
        {(address || instructions) && <button type="button" onClick={() => void handleCopy("all", allInfo)} className="text-amber text-xs font-semibold hover:underline">{copied === "all" ? "Copié !" : "Copier toutes les informations de dépôt"}</button>}
        {address ? <CopyableSection label="Adresse de dépôt" copied={copied === "address"} onCopy={() => void handleCopy("address", address)} text={address} /> : <p className="text-sm text-slate">Adresse de dépôt non renseignée. Consultez l’équipe avant tout envoi.</p>}
        {instructions && <details><summary className="cursor-pointer py-2 text-sm text-amber font-semibold">Voir les instructions de dépôt</summary><CopyableSection label="Instructions de dépôt" copied={copied === "instructions"} onCopy={() => void handleCopy("instructions", instructions)} text={instructions} /></details>}
        {copyError && <p role="alert" className="text-xs text-postal">{copyError}</p>}
      </div>
    </div>
    <div className="p-5 md:p-6 pt-0 space-y-3">
      <button type="button" disabled={checking || !canUseOffer(entry)} onClick={() => void useOffer()} className="w-full rounded-full bg-amber text-[#111827] px-4 py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed">{checking ? "Vérification..." : canUseOffer(entry) ? "Profiter de l’offre" : "Offre indisponible"}</button>
      {offerError && <p role="alert" className="text-sm text-postal">{offerError}</p>}
      <a href={detailUrl(entry)} className="block text-center text-sm font-semibold hover:underline">Voir les détails et les paliers</a>
      <a href={`https://wa.me/?text=${encodeURIComponent(shareOffer(entry))}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 text-sm text-slate hover:text-ink"><i className="fa-brands fa-whatsapp text-emerald-600" aria-hidden="true" />Partager sur WhatsApp</a>
    </div>
  </article>;
}

function CopyableSection({ label, text, copied, onCopy }: { label: string; text: string; copied: boolean; onCopy: () => void }) {
  return <div className="relative rounded-xl border border-ink/10 bg-paper p-4 pr-14">
    <button type="button" onClick={onCopy} aria-label={copied ? "Copié !" : `Copier : ${label}`} className="absolute right-3 top-3 w-8 h-8 rounded-full border border-ink/10 bg-paperAlt hover:bg-amber/15"><i className={`fa-solid ${copied ? "fa-check text-emerald-600" : "fa-copy text-amber"}`} aria-hidden="true" /></button>
    <p className="text-xs text-slate mb-2">{label}</p><p className="text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere] select-text">{text}</p>
    {copied && <span role="status" className="text-xs text-emerald-600">Copié !</span>}
  </div>;
}
