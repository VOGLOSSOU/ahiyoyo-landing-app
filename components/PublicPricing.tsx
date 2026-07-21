"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Stamp from "./Stamp";

type FilterMode = "tous" | "air" | "maritime" | "routier";

type PricingLine = {
  id: number | string;
  villeDepart: string;
  paysDepart: string;
  villeDestination: string;
  paysDestination: string;
  modeTransport: string;
  typeService?: string | null;
  categorie?: string | null;
  tarifParKg: string | number | null;
  tarifParCbm: string | number | null;
  delaiJours?: number | null;
  adressePhysique?: string | null;
  contactNom?: string | null;
  contactTelephone?: string | null;
  instructionsClient?: string | null;
  actif?: boolean;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://orchid-jellyfish-551876.hostingersite.com").replace(/\/$/, "");

const FILTERS: Array<{ key: FilterMode; label: string; icon: string }> = [
  { key: "tous", label: "Tous", icon: "fa-border-all" },
  { key: "air", label: "Aérien", icon: "fa-plane" },
  { key: "maritime", label: "Maritime", icon: "fa-ship" },
  { key: "routier", label: "Routier", icon: "fa-truck" },
];

const MODES: Record<string, { label: string; icon: string; className: string }> = {
  air_standard: { label: "Aérien standard", icon: "fa-plane", className: "bg-blue-500/20 text-blue-800 border-blue-500/35 dark:bg-blue-400/20 dark:text-blue-200 dark:border-blue-400/35" },
  air_economie: { label: "Aérien économie", icon: "fa-plane", className: "bg-sky-500/20 text-sky-800 border-sky-500/35 dark:bg-sky-400/20 dark:text-sky-200 dark:border-sky-400/35" },
  air_express: { label: "Aérien express", icon: "fa-plane", className: "bg-violet-500/20 text-violet-800 border-violet-500/35 dark:bg-violet-400/20 dark:text-violet-200 dark:border-violet-400/35" },
  maritime: { label: "Maritime groupage", icon: "fa-ship", className: "bg-teal-500/20 text-teal-800 border-teal-500/35 dark:bg-teal-400/20 dark:text-teal-200 dark:border-teal-400/35" },
  routier: { label: "Transport routier", icon: "fa-truck", className: "bg-orange-500/20 text-orange-800 border-orange-500/35 dark:bg-orange-400/20 dark:text-orange-200 dark:border-orange-400/35" },
};

function matchesFilter(line: PricingLine, filter: FilterMode) {
  if (filter === "tous") return true;
  if (filter === "air") return line.modeTransport?.startsWith("air");
  return line.modeTransport === filter;
}

function formatFCFA(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

function fullAddress(line: PricingLine) {
  const contact = [line.contactNom, line.contactTelephone].filter(Boolean).join(" ");
  return [line.adressePhysique, contact].filter(Boolean).join("，");
}

function whatsappMessage(line: PricingLine, modeLabel: string) {
  const parts: string[] = ["AHIYOYO"];
  const address = fullAddress(line);

  if (line.adressePhysique) parts.push("", "Adresse de dépôt :", address);
  if (line.instructionsClient) parts.push("", "À écrire sur le colis :", line.instructionsClient);
  parts.push("", `Trajet : ${line.paysDepart} (${line.villeDepart}) → ${line.paysDestination} (${line.villeDestination})`);
  parts.push(`Mode : ${modeLabel}`);
  if (line.categorie) parts.push(`Service : ${line.categorie}`);
  return parts.join("\n");
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) throw new Error("COPY_FAILED");
}

export default function PublicPricing() {
  const [lines, setLines] = useState<PricingLine[]>([]);
  const [filter, setFilter] = useState<FilterMode>("tous");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPricing() {
      try {
        const response = await fetch(`${API_URL}/api/tarifs/public`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
          cache: "no-store",
        });
        const payload = await response.json().catch(() => null) as unknown;
        if (!response.ok) throw new Error("REQUEST_FAILED");

        const normalized = Array.isArray(payload)
          ? payload
          : payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)
            ? (payload as { data: unknown[] }).data
            : [];

        setLines((normalized as PricingLine[]).filter((line) => line && line.actif !== false));
        setError("");
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === "AbortError") return;
        setError("Impossible de charger les adresses et les tarifs.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadPricing();
    return () => controller.abort();
  }, [retryKey]);

  const counts = useMemo(() => Object.fromEntries(FILTERS.map((item) => [item.key, lines.filter((line) => matchesFilter(line, item.key)).length])) as Record<FilterMode, number>, [lines]);
  const visibleFilters = FILTERS.filter((item) => item.key === "tous" || counts[item.key] > 0);
  const visibleLines = lines.filter((line) => matchesFilter(line, filter));

  const retry = () => {
    setLoading(true);
    setError("");
    setRetryKey((key) => key + 1);
  };

  return (
    <div className="bg-paper min-h-screen">
      <section className="relative overflow-hidden border-b border-ink/5">
        <div className="grain" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20 text-center">
          <Stamp variant="amber" dot className="mb-6">Routes publiques Ahiyoyo</Stamp>
          <div className="flex flex-col items-center gap-7">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-5"><i className="fa-solid fa-truck-fast text-amber text-[.75em] mr-3" />Nos adresses &amp; tarifs d’envoi</h1>
              <p className="text-slate text-base md:text-lg leading-relaxed">Adresses de nos entrepôts, tarifs de transport et instructions d’envoi pour chaque route disponible.</p>
            </div>
            {!loading && !error && lines.length > 0 && <div className="font-mono-tag text-[10px] text-slate border border-ink/10 rounded-full px-4 py-2 w-fit mx-auto">{lines.length} {lines.length > 1 ? "LIGNES DISPONIBLES" : "LIGNE DISPONIBLE"}</div>}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-14">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && lines.length === 0 && <EmptyState />}

        {!loading && !error && lines.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-2.5 pb-3 mb-7 md:mb-9" role="group" aria-label="Filtrer par mode de transport">
              {visibleFilters.map((item) => (
                <button key={item.key} type="button" onClick={() => setFilter(item.key)} aria-pressed={filter === item.key} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${filter === item.key ? "bg-amber text-[#111827] border-amber shadow-sm" : "bg-paperAlt text-slate border-ink/10 hover:border-amber/50 hover:text-ink"}`}>
                  <i className={`fa-solid ${item.icon}`} /><span>{item.label}</span><span className={`min-w-5 h-5 px-1 rounded-full text-[10px] flex items-center justify-center ${filter === item.key ? "bg-[#111827]/10" : "bg-ink/5"}`}>{counts[item.key]}</span>
                </button>
              ))}
            </div>

            {visibleLines.length > 0
              ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">{visibleLines.map((line) => <PricingCard key={line.id} line={line} />)}</div>
              : <div className="waybill p-10 text-center"><i className="fa-solid fa-route text-amber text-2xl mb-4" /><p className="font-display font-semibold">Aucune ligne pour ce mode de transport.</p></div>}
          </>
        )}
      </section>
    </div>
  );
}

function PricingCard({ line }: { line: PricingLine }) {
  const [copied, setCopied] = useState<"address" | "instructions" | null>(null);
  const [copyError, setCopyError] = useState("");
  const timerRef = useRef<number | null>(null);
  const mode = MODES[line.modeTransport] || { label: line.modeTransport || "Mode non renseigné", icon: "fa-route", className: "bg-ink/5 text-slate border-ink/10" };
  const modeLabel = line.typeService || mode.label;
  const kgPrice = formatFCFA(line.tarifParKg);
  const cbmPrice = formatFCFA(line.tarifParCbm);
  const delay = line.delaiJours !== null && line.delaiJours !== undefined && Number.isFinite(Number(line.delaiJours)) ? `${line.delaiJours} jour${Number(line.delaiJours) > 1 ? "s" : ""}` : null;
  const address = fullAddress(line);
  const whatsappUrl = `https://api.whatsapp.com/send/?text=${encodeURIComponent(whatsappMessage(line, modeLabel))}&type=custom_url&app_absent=0`;

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const handleCopy = useCallback(async (type: "address" | "instructions", value: string) => {
    try {
      await copyText(value);
      setCopied(type);
      setCopyError("");
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopyError("Copie impossible. Sélectionnez le texte manuellement.");
    }
  }, []);

  return (
    <article className="waybill border border-ink/8 !shadow-[0_16px_45px_-32px_rgba(0,0,0,.45)] flex flex-col h-full">
      <div className="p-5 md:p-6 border-b border-ink/8 bg-paper/60">
        <div className="flex flex-wrap gap-2 mb-5">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${mode.className}`}><i className={`fa-solid ${mode.icon}`} />{modeLabel}</span>
          {line.categorie && <span className="inline-flex items-center rounded-full border border-slate/30 bg-slate/15 px-3 py-1.5 text-xs font-semibold text-ink">{line.categorie}</span>}
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div><p className="font-mono-tag text-[9px] text-slate mb-1">DÉPART</p><h2 className="font-display font-bold leading-tight">{line.paysDepart || "—"}</h2><p className="text-sm text-slate mt-1">{line.villeDepart || "—"}</p></div>
          <div className="w-9 h-9 rounded-full bg-amber/15 text-amber flex items-center justify-center"><i className="fa-solid fa-arrow-right" /></div>
          <div className="text-right"><p className="font-mono-tag text-[9px] text-slate mb-1">DESTINATION</p><h2 className="font-display font-bold leading-tight">{line.paysDestination || "—"}</h2><p className="text-sm text-slate mt-1">{line.villeDestination || "—"}</p></div>
        </div>
      </div>

      <div className="p-5 md:p-6 flex-1 space-y-5">
        {(kgPrice || cbmPrice || delay) && <div className="grid grid-cols-2 gap-2.5">{kgPrice && <PriceCell label="Tarif / kg" value={kgPrice} />}{cbmPrice && <PriceCell label="Tarif / CBM" value={cbmPrice} />}{delay && <PriceCell label="Délai estimé" value={delay} highlight />}</div>}

        {line.adressePhysique && <InfoBlock icon="fa-location-dot" label="Adresse de l’entrepôt"><p className="text-sm leading-relaxed whitespace-pre-wrap break-words select-text">{line.adressePhysique}</p></InfoBlock>}

        {(line.contactNom || line.contactTelephone) && <InfoBlock icon="fa-user" label="Contact sur place"><div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">{line.contactNom && <span className="font-semibold">{line.contactNom}</span>}{line.contactTelephone && <a href={`tel:${line.contactTelephone}`} className="text-amber font-semibold hover:underline"><i className="fa-solid fa-phone mr-1.5" />{line.contactTelephone}</a>}</div></InfoBlock>}

        {line.instructionsClient && <div className="rounded-xl border border-amber/35 bg-amber/10 p-4"><p className="font-mono-tag text-[9px] text-amber mb-2"><i className="fa-solid fa-circle-info mr-2" />INSTRUCTIONS À METTRE SUR LE COLIS</p><p className="text-sm leading-relaxed whitespace-pre-wrap select-text">{line.instructionsClient}</p></div>}
        {copyError && <p className="text-xs text-postal" role="alert">{copyError}</p>}
      </div>

      <div className="grid grid-cols-3 border-t border-ink/8 bg-paper/40">
        <button type="button" onClick={() => void handleCopy("address", address)} disabled={!line.adressePhysique} title={line.adressePhysique ? "Copier l’adresse et le contact" : "Adresse non renseignée"} className="min-h-16 px-2 py-3 text-[10px] sm:text-xs font-semibold border-r border-ink/8 hover:bg-amber/10 disabled:opacity-35 disabled:cursor-not-allowed transition flex flex-col items-center justify-center gap-2"><i className={`fa-solid ${copied === "address" ? "fa-check text-emerald-500" : "fa-copy text-amber"}`} />{copied === "address" ? "Copié !" : "Copier l’adresse"}</button>
        <button type="button" onClick={() => void handleCopy("instructions", line.instructionsClient || "")} disabled={!line.instructionsClient} title={line.instructionsClient ? "Copier les instructions" : "Instructions non renseignées"} className="min-h-16 px-2 py-3 text-[10px] sm:text-xs font-semibold border-r border-ink/8 hover:bg-amber/10 disabled:opacity-35 disabled:cursor-not-allowed transition flex flex-col items-center justify-center gap-2"><i className={`fa-solid ${copied === "instructions" ? "fa-check text-emerald-500" : "fa-copy text-amber"}`} />{copied === "instructions" ? "Copié !" : "Instructions"}</button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="min-h-16 px-2 py-3 text-[10px] sm:text-xs font-semibold text-center hover:bg-emerald-500/10 transition flex flex-col items-center justify-center gap-2"><i className="fa-brands fa-whatsapp text-emerald-500" />WhatsApp</a>
      </div>
    </article>
  );
}

function PriceCell({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className="rounded-xl bg-paper border border-ink/8 p-3"><p className="font-mono-tag text-[8px] text-slate uppercase mb-1.5">{label}</p><p className={`font-display font-bold text-sm ${highlight ? "text-amber" : ""}`}>{value}</p></div>;
}

function InfoBlock({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return <div><p className="font-mono-tag text-[9px] text-slate mb-2"><i className={`fa-solid ${icon} text-amber mr-2`} />{label.toUpperCase()}</p>{children}</div>;
}

function LoadingState() {
  return <div className="py-20 text-center text-slate" role="status"><i className="fa-solid fa-spinner fa-spin text-amber text-3xl mb-4" /><p>Chargement des tarifs…</p></div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="max-w-xl mx-auto waybill border border-postal/20 p-8 text-center"><div className="w-12 h-12 rounded-full bg-postal/10 text-postal flex items-center justify-center mx-auto mb-4"><i className="fa-solid fa-triangle-exclamation" /></div><h2 className="font-display font-bold text-xl mb-2">Chargement impossible</h2><p className="text-slate text-sm mb-6">{message}<br />Veuillez réessayer dans quelques instants.</p><button type="button" onClick={onRetry} className="btn-primary bg-amber text-[#111827] rounded-full px-6 py-3 text-sm font-semibold"><i className="fa-solid fa-arrow-rotate-right mr-2" />Réessayer</button></div>;
}

function EmptyState() {
  return <div className="max-w-xl mx-auto waybill p-10 text-center"><i className="fa-solid fa-truck text-amber text-3xl mb-5" /><h2 className="font-display font-bold text-xl mb-2">Aucune ligne disponible</h2><p className="text-slate text-sm">Les tarifs seront affichés ici dès leur mise en place.</p></div>;
}
