"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Stamp from "./Stamp";

type SearchKind = "colis" | "commande";
type TrackingRecord = Record<string, unknown>;

type HistoryEntry = {
  statut?: string;
  commentaire?: string | null;
  fichierUrl?: string | null;
  fichierNom?: string | null;
  adminNom?: string;
  date?: string;
};

const PACKAGE_STEPS = [
  "En attente de confirmation",
  "Reçu au cargo",
  "Envoi en cours",
  "Arrivé à destination",
  "Dédouanement en cours",
  "En attente de retrait",
  "Livré",
];

const PACKAGE_STATUSES: Record<string, string> = {
  EN_ATTENTE_CONFIRMATION: "En attente de confirmation",
  RECU_AU_CARGO: "Reçu au cargo",
  ENVOI_EN_COURS: "Envoi en cours",
  EN_TRANSIT: "Envoi en cours",
  ARRIVE_A_DESTINATION: "Arrivé à destination",
  DEDOUANEMENT_EN_COURS: "Dédouanement en cours",
  EN_ATTENTE_RETRAIT: "En attente de retrait",
  RETRAIT_EFFECTUE: "Livré",
  LIVRE: "Livré",
  ANNULE: "Annulé",
};

const PACKAGE_DESCRIPTIONS: Record<string, string> = {
  "En attente de confirmation": "Colis en attente de validation dans le système.",
  "Reçu au cargo": "Colis réceptionné au point cargo ou à l’entrepôt d’origine.",
  "Envoi en cours": "Colis en cours de préparation et d’acheminement.",
  "Arrivé à destination": "Colis arrivé dans le pays de destination.",
  "Dédouanement en cours": "Procédures douanières en cours de traitement.",
  "En attente de retrait": "Colis disponible au point de retrait.",
  Livré: "Livraison finale confirmée.",
};

const ORDER_STEPS = [
  { code: "EN_ATTENTE_VALIDATION", label: "En attente de validation" },
  { code: "EN_ATTENTE_PAIEMENT", label: "En attente de paiement" },
  { code: "COMMANDE_EN_COURS", label: "Commande en cours de traitement" },
  { code: "ENVOYEE_AU_CARGO", label: "Envoyée au cargo" },
  { code: "RECUE_AU_CARGO", label: "Reçue au cargo" },
  { code: "ENVOI_EN_COURS", label: "Envoi en cours vers vous" },
  { code: "FORMALITES_EN_COURS", label: "Formalités douanières en cours" },
  { code: "DISPONIBLE_ENTREPOT", label: "Disponible en entrepôt — prête pour retrait !" },
];

const ORDER_STATUS_LABELS = Object.fromEntries(ORDER_STEPS.map((step) => [step.code, step.label]));
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://orchid-jellyfish-551876.hostingersite.com").replace(/\/$/, "");

function stringValue(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  return String(value);
}

function first(record: TrackingRecord | null | undefined, ...keys: string[]): string | null {
  if (!record) return null;
  for (const key of keys) {
    const value = stringValue(record[key]);
    if (value) return value;
  }
  return null;
}

function objectValue(record: TrackingRecord, key: string): TrackingRecord | null {
  const value = record[key];
  return value && typeof value === "object" && !Array.isArray(value) ? value as TrackingRecord : null;
}

function arrayValue<T>(record: TrackingRecord, ...keys: string[]): T[] {
  for (const key of keys) if (Array.isArray(record[key])) return record[key] as T[];
  return [];
}

function humanizeStatus(code: string | null, kind: SearchKind): string {
  if (!code) return "Statut indisponible";
  return (kind === "commande" ? ORDER_STATUS_LABELS[code] : PACKAGE_STATUSES[code])
    || code.toLowerCase().replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

function formatDate(value: string | null, includeTime = false): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" }).format(date);
}

function formatFCFA(value: string | null): string {
  if (!value) return "—";
  const amount = Number(value);
  if (!Number.isFinite(amount)) return value;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(amount);
}

function buildFileUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function isImage(filename: string, url: string) {
  return /\.(avif|webp|png|jpe?g|gif)(\?.*)?$/i.test(filename || url);
}

function modeIcon(mode: string | null) {
  const normalized = mode?.toLowerCase() || "";
  if (normalized.includes("mar") || normalized.includes("bateau") || normalized.includes("navire")) return "fa-ship";
  if (normalized.includes("express") || normalized.includes("terre") || normalized.includes("camion")) return "fa-truck-fast";
  return "fa-plane";
}

function InfoItem({ label, value, icon }: { label: string; value: string | null; icon?: string }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-ink/10 bg-paper p-4">
      <p className="font-mono-tag text-[10px] uppercase text-slate mb-1.5">{icon && <i className={`fa-solid ${icon} text-amber mr-2`} />}{label}</p>
      <p className="font-display font-semibold text-sm break-words">{value}</p>
    </div>
  );
}

function Timeline({ steps, currentIndex, dates, descriptions }: {
  steps: string[];
  currentIndex: number;
  dates?: Record<string, string>;
  descriptions?: Record<string, string>;
}) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const complete = currentIndex >= 0 && index < currentIndex;
        const current = index === currentIndex;
        return (
          <div key={step} className="grid grid-cols-[28px_1fr] gap-4 min-h-20">
            <div className="relative flex justify-center">
              {index < steps.length - 1 && <div className={`absolute top-6 bottom-0 w-0.5 ${complete ? "bg-emerald-500" : "bg-ink/10"}`} />}
              <span className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                complete ? "bg-emerald-500 border-emerald-500 text-white" : current ? "bg-amber border-amber text-[#111827]" : "bg-paperAlt border-ink/15 text-slate"
              }`}>
                {complete ? <i className="fa-solid fa-check text-[10px]" /> : current ? <span className="w-2 h-2 rounded-full bg-[#111827]" /> : null}
              </span>
            </div>
            <div className="pb-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <p className={`font-display font-semibold ${current ? "text-amber" : complete ? "text-ink" : "text-slate"}`}>{step}</p>
                {dates?.[step] && <time className="font-mono-tag text-[10px] text-slate">{formatDate(dates[step], true)}</time>}
              </div>
              {descriptions?.[step] && <p className="text-slate text-sm mt-1 leading-relaxed">{descriptions[step]}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Updates({ history, kind, onPreview }: { history: HistoryEntry[]; kind: SearchKind; onPreview: (url: string) => void }) {
  if (!history.length) return null;
  return (
    <section className="waybill p-5 md:p-7">
      <h2 className="font-display font-bold text-xl mb-6">Mises à jour</h2>
      <div className="space-y-6">
        {[...history].reverse().map((entry, index) => {
          const url = buildFileUrl(entry.fichierUrl);
          const filename = entry.fichierNom || entry.fichierUrl?.split("/").pop() || "Fichier joint";
          const image = url ? isImage(filename, url) : false;
          return (
            <article key={`${entry.date}-${index}`} className="border-l-2 border-amber pl-5">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <h3 className="font-display font-semibold">{humanizeStatus(entry.statut || null, kind)}</h3>
                <time className="font-mono-tag text-[10px] text-slate">{formatDate(entry.date || null, true)}</time>
              </div>
              {entry.adminNom && <p className="text-xs text-slate mt-1">par {entry.adminNom}</p>}
              {entry.commentaire && <p className="text-sm text-slate leading-relaxed mt-3">{entry.commentaire}</p>}
              {url && image && (
                <button type="button" onClick={() => onPreview(url)} className="mt-4 block w-full sm:w-52 h-32 rounded-xl bg-cover bg-center border border-ink/10" style={{ backgroundImage: `url(${JSON.stringify(url)})` }} aria-label={`Agrandir ${filename}`} />
              )}
              {url && !image && <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-amber hover:underline"><i className="fa-solid fa-paperclip" />{filename}</a>}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function PublicTracking() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initialReference = params.get("number") || params.get("q") || "";
  const [kind, setKind] = useState<SearchKind>(initialReference.toUpperCase().startsWith("CMD-") ? "commande" : "colis");
  const [reference, setReference] = useState(initialReference);
  const [result, setResult] = useState<TrackingRecord | null>(null);
  const [resultKind, setResultKind] = useState<SearchKind | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const autoSearched = useRef(false);

  const search = useCallback(async (rawReference: string) => {
    const query = rawReference.trim();
    if (!query) {
      setError("Veuillez saisir un numéro de suivi.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setResultKind(null);
    router.replace(`${pathname}?q=${encodeURIComponent(query)}`, { scroll: false });

    try {
      const response = await fetch(`${API_URL}/api/tracking?q=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const data = await response.json().catch(() => null) as TrackingRecord | null;

      if (!response.ok) {
        if (response.status === 404) throw new Error("NOT_FOUND");
        const message = data && stringValue(data.message);
        throw new Error(message ? `API:${message}` : "SERVER_ERROR");
      }
      if (!data || typeof data !== "object") throw new Error("SERVER_ERROR");

      setResult(data);
      setResultKind(data.type === "commande" ? "commande" : "colis");
    } catch (searchError) {
      if (searchError instanceof Error && searchError.message === "NOT_FOUND") {
        setError("Référence introuvable. Veuillez vérifier le numéro saisi.");
      } else if (searchError instanceof Error && searchError.message.startsWith("API:")) {
        setError(searchError.message.slice(4));
      } else {
        setError("Impossible de charger le suivi pour le moment. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    if (initialReference && !autoSearched.current) {
      autoSearched.current = true;
      void search(initialReference);
    }
  }, [initialReference, search]);

  useEffect(() => {
    if (!preview) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [preview]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void search(reference);
  };

  const reset = () => {
    setReference("");
    setResult(null);
    setResultKind(null);
    setError("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden border-b border-ink/5">
        <div className="grain" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-6 py-14 md:py-20 text-center">
          <Stamp variant="amber" dot className="mb-6">Suivi public et sécurisé</Stamp>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-5">Suivez votre colis ou votre commande</h1>
          <p className="text-slate max-w-2xl mx-auto leading-relaxed">Consultez son statut, son trajet et ses dernières mises à jour avec votre référence Ahiyoyo.</p>

          <div className="mt-9 max-w-2xl mx-auto waybill p-4 sm:p-6 text-left">
            <div className="flex w-fit mx-auto rounded-full bg-paper p-1 mb-4" role="group" aria-label="Type de référence">
              {(["colis", "commande"] as SearchKind[]).map((option) => (
                <button key={option} type="button" onClick={() => setKind(option)} className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition ${kind === option ? "bg-amber text-[#111827] shadow-sm" : "text-slate hover:text-ink"}`} aria-pressed={kind === option}>{option}</button>
              ))}
            </div>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="public-tracking-reference" className="sr-only">Référence du colis ou de la commande</label>
              <input id="public-tracking-reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder={kind === "colis" ? "Ex : AHY-2508-7K3Q" : "Ex : CMD-2606-0042"} autoComplete="off" className="min-w-0 flex-1 rounded-full border border-ink/15 px-5 py-3.5 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20" />
              <button type="submit" disabled={loading} className="btn-primary rounded-full bg-amber text-[#111827] font-semibold px-7 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                <i className={`fa-solid ${loading ? "fa-spinner fa-spin" : "fa-magnifying-glass"} mr-2`} />{loading ? "Recherche…" : "Rechercher"}
              </button>
            </form>
            {error && <div role="alert" className="mt-4 rounded-xl bg-postal/10 border border-postal/20 px-4 py-3 text-sm text-postal"><i className="fa-solid fa-circle-exclamation mr-2" />{error}</div>}
          </div>
          {!result && !loading && !error && <p className="font-mono-tag text-[10px] text-slate mt-5">AUCUNE CONNEXION N’EST NÉCESSAIRE</p>}
        </div>
      </section>

      {loading && <div className="max-w-5xl mx-auto px-5 py-16 text-center text-slate" role="status" aria-live="polite"><i className="fa-solid fa-spinner fa-spin text-amber text-2xl mb-4" /><p>Nous recherchons votre référence…</p></div>}
      {result && resultKind === "colis" && <PackageResult data={result} onReset={reset} onPreview={setPreview} />}
      {result && resultKind === "commande" && <OrderResult data={result} onReset={reset} onPreview={setPreview} />}

      {preview && (
        <div className="fixed inset-0 z-[100] bg-black/85 p-5 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Aperçu du fichier" onClick={() => setPreview(null)}>
          <button type="button" onClick={() => setPreview(null)} className="absolute top-5 right-5 w-11 h-11 bg-white text-[#111827] rounded-full" aria-label="Fermer l’aperçu"><i className="fa-solid fa-xmark" /></button>
          <div className="max-w-5xl max-h-[85vh] w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(preview)})` }} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function PackageResult({ data, onReset, onPreview }: { data: TrackingRecord; onReset: () => void; onPreview: (url: string) => void }) {
  const statusCode = first(data, "statut", "status");
  const status = humanizeStatus(statusCode, "colis");
  const currentIndex = statusCode === "ANNULE" ? -1 : PACKAGE_STEPS.indexOf(status);
  const mode = first(data, "modeExpedition", "modeTransport", "mode");
  const origin = first(data, "origine", "origin", "villeDepart", "paysDepart");
  const destination = first(data, "destination", "villeDestination", "paysDestination");
  const history = arrayValue<HistoryEntry>(data, "historique", "history");
  const items = arrayValue<TrackingRecord>(data, "articles", "items");
  const documentUrl = buildFileUrl(first(data, "documentUrl", "document", "fichierUrl"));
  const documentName = first(data, "documentNom", "fichierNom") || "Document joint";
  const dates = Object.fromEntries(history.map((entry) => [humanizeStatus(entry.statut || null, "colis"), entry.date || ""]));
  const details = [
    ["Livraison estimée", first(data, "dateLivraisonEstimee", "estimatedDeliveryDate"), "fa-calendar-check"],
    ["Transporteur", first(data, "transporteur", "carrier"), "fa-building"],
    ["Suivi transporteur", first(data, "numeroSuiviTransporteur", "carrierTrackingNumber"), "fa-barcode"],
    ["Type de colis", first(data, "typeColis", "packageType"), "fa-box"],
    ["Poids réel", first(data, "poidsReel", "poids", "weight"), "fa-weight-hanging"],
    ["Volume facturé", first(data, "volumeFacture", "volume"), "fa-cube"],
    ["Nombre de cartons", first(data, "nombreCartons", "cartons"), "fa-boxes-stacked"],
    ["Frais de magasinage", first(data, "fraisMagasinage"), "fa-warehouse"],
    ["Montant total", first(data, "montantTotal", "totalAmount"), "fa-wallet"],
    ["Destinataire", first(data, "proprietaire", "destinataire", "recipient"), "fa-user"],
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16 space-y-6 animate-result-in">
      <section className="waybill p-5 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div><p className="font-mono-tag text-[10px] text-slate mb-2">NUMÉRO DE SUIVI</p><h2 className="font-display text-2xl md:text-3xl font-bold break-all">{first(data, "trackingNumber", "numeroSuivi", "reference") || "—"}</h2><div className="flex flex-wrap gap-2 mt-4"><span className="stamp stamp-amber !rotate-0 !normal-case">{status}</span>{mode && <span className="stamp !rotate-0 !normal-case"><i className={`fa-solid ${modeIcon(mode)}`} />{mode}</span>}</div><p className="text-sm text-slate mt-4">Créé le {formatDate(first(data, "createdAt", "dateCreation"))}</p></div>
          <button type="button" onClick={onReset} className="btn-ghost border border-ink/20 rounded-full px-5 py-2.5 text-sm font-semibold self-start"><i className="fa-solid fa-arrow-rotate-left mr-2" />Nouvelle recherche</button>
        </div>
      </section>

      {(origin || destination) && <RouteCard origin={origin} destination={destination} mode={mode} />}
      {items.length > 0 && <Items items={items} onPreview={onPreview} />}
      <Updates history={history} kind="colis" onPreview={onPreview} />

      {documentUrl && <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-4">Document joint</h2><a href={documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm font-semibold hover:border-amber/50 transition"><i className="fa-solid fa-paperclip text-amber" />{documentName}<i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate" /></a></section>}

      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6 items-start">
        <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-7">Progression du colis</h2>{statusCode === "ANNULE" ? <p className="text-postal font-semibold">Ce colis a été annulé.</p> : <Timeline steps={PACKAGE_STEPS} currentIndex={currentIndex} dates={dates} descriptions={PACKAGE_DESCRIPTIONS} />}</section>
        <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-5">Informations complémentaires</h2><div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">{details.map(([label, value, icon]) => <InfoItem key={label} label={label} value={value} icon={icon} />)}</div>{details.every(([, value]) => !value) && <p className="text-sm text-slate">Aucune information complémentaire disponible.</p>}</section>
      </div>
    </div>
  );
}

function OrderResult({ data, onReset, onPreview }: { data: TrackingRecord; onReset: () => void; onPreview: (url: string) => void }) {
  const statusCode = first(data, "statut", "status");
  const status = humanizeStatus(statusCode, "commande");
  const currentIndex = ORDER_STEPS.findIndex((step) => step.code === statusCode);
  const invoice = objectValue(data, "facture");
  const line = invoice ? objectValue(invoice, "ligneTarifaire") : null;
  const origin = line ? [first(line, "paysDepart"), first(line, "villeDepart")].filter(Boolean).join(", ") : null;
  const destination = line ? [first(line, "paysDestination"), first(line, "villeDestination")].filter(Boolean).join(", ") : null;
  const mode = first(line, "modeTransport");
  const history = arrayValue<HistoryEntry>(data, "historique", "history");

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16 space-y-6 animate-result-in">
      <section className="waybill p-5 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div><p className="font-mono-tag text-[10px] text-slate mb-2">RÉFÉRENCE DE COMMANDE</p><h2 className="font-display text-2xl md:text-3xl font-bold break-all">{first(data, "reference") || "—"}</h2><span className="stamp stamp-amber !rotate-0 !normal-case mt-4">{status}</span><p className="text-sm text-slate mt-4">Créée le {formatDate(first(data, "createdAt", "dateCreation"))}</p></div>
          <button type="button" onClick={onReset} className="btn-ghost border border-ink/20 rounded-full px-5 py-2.5 text-sm font-semibold self-start"><i className="fa-solid fa-arrow-rotate-left mr-2" />Nouvelle recherche</button>
        </div>
      </section>

      {invoice && <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-5">Détails de la commande</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"><InfoItem label="Facture" value={first(invoice, "numero")} icon="fa-file-invoice" /><InfoItem label="Article" value={first(invoice, "nomArticle")} icon="fa-box-open" /><InfoItem label="Montant total" value={formatFCFA(first(invoice, "montantTotal"))} icon="fa-wallet" /><InfoItem label="Délai estimatif" value={first(invoice, "delaiEstimatif")} icon="fa-clock" /></div></section>}
      {(origin || destination) && <RouteCard origin={origin || null} destination={destination || null} mode={mode} />}
      <Updates history={history} kind="commande" onPreview={onPreview} />
      <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-7">Progression de la commande</h2><Timeline steps={ORDER_STEPS.map((step) => step.label)} currentIndex={currentIndex} /></section>
    </div>
  );
}

function RouteCard({ origin, destination, mode }: { origin: string | null; destination: string | null; mode: string | null }) {
  return <section className="waybill p-5 md:p-7"><p className="font-mono-tag text-[10px] text-slate mb-5">TRAJET</p><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div><p className="font-display font-bold text-lg">{origin || "—"}</p><p className="text-xs text-slate mt-1">Origine</p></div><div className="flex items-center gap-2 text-amber"><span className="hidden sm:block w-12 border-t border-dashed border-ink/20" /><i className={`fa-solid ${modeIcon(mode)} text-xl`} /><span className="hidden sm:block w-12 border-t border-dashed border-ink/20" /></div><div className="text-right"><p className="font-display font-bold text-lg">{destination || "—"}</p><p className="text-xs text-slate mt-1">Destination</p></div></div></section>;
}

function Items({ items, onPreview }: { items: TrackingRecord[]; onPreview: (url: string) => void }) {
  return <section className="waybill p-5 md:p-7"><h2 className="font-display font-bold text-xl mb-5">Articles</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{items.map((item, index) => { const imageUrl = buildFileUrl(first(item, "image", "imageUrl", "photo")); return <article key={first(item, "id") || index} className="rounded-xl border border-ink/10 bg-paper p-3 flex items-center gap-4">{imageUrl ? <button type="button" onClick={() => onPreview(imageUrl)} className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${JSON.stringify(imageUrl)})` }} aria-label="Agrandir l’image de l’article" /> : <div className="w-16 h-16 rounded-lg bg-amber/10 flex items-center justify-center text-amber"><i className="fa-solid fa-box" /></div>}<div className="min-w-0"><h3 className="font-display font-semibold text-sm break-words">{first(item, "nom", "name", "designation") || `Article ${index + 1}`}</h3>{first(item, "quantite", "quantity") && <p className="text-xs text-slate mt-1">Quantité : {first(item, "quantite", "quantity")}</p>}</div></article>; })}</div></section>;
}
