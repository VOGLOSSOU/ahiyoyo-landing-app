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

function minimumForMode(modeTransport: string) {
  const mode = modeTransport.toLowerCase();
  if (mode.startsWith("air") || mode.includes("avion") || mode.includes("aérien")) return "1 kg";
  if (mode.includes("maritime") || mode.includes("bateau") || mode.includes("navire")) return "0,1 CBM";
  return null;
}

function contactText(line: PricingLine) {
  return [line.contactNom, line.contactTelephone].filter(Boolean).join(" ");
}

function fullAddress(line: PricingLine) {
  return [line.adressePhysique, contactText(line)].filter(Boolean).join("，");
}

function allInfoText(line: PricingLine) {
  const parts: string[] = [];
  if (line.adressePhysique) parts.push("ADRESSE DE L’ENTREPÔT", line.adressePhysique, "");
  const contact = contactText(line);
  if (contact) parts.push("CONTACT SUR PLACE", contact, "");
  if (line.instructionsClient) parts.push("INSTRUCTIONS À METTRE SUR LE COLIS", line.instructionsClient);
  return parts.join("\n").trim();
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
        <div className="relative max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-12 text-center">
          <Stamp variant="amber" dot className="mb-4">Routes publiques Ahiyoyo</Stamp>
          <div className="flex flex-col items-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-3"><i className="fa-solid fa-truck-fast text-amber text-[.75em] mr-3" />Nos adresses &amp; tarifs d’envoi</h1>
              <p className="text-slate text-base md:text-lg leading-relaxed">Adresses de nos entrepôts, tarifs de transport et instructions d’envoi pour chaque route disponible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-6 pt-5 pb-10 md:pt-7 md:pb-14">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && lines.length === 0 && <EmptyState />}

        {!loading && !error && lines.length > 0 && (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 md:mb-5">
              <div className="font-mono-tag text-[10px] text-slate border border-ink/10 rounded-full px-4 py-2 w-fit mx-auto lg:mx-0">{lines.length} {lines.length > 1 ? "LIGNES DISPONIBLES" : "LIGNE DISPONIBLE"}</div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2.5" role="group" aria-label="Filtrer par mode de transport">
                {visibleFilters.map((item) => (
                  <button key={item.key} type="button" onClick={() => setFilter(item.key)} aria-pressed={filter === item.key} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${filter === item.key ? "bg-amber text-[#111827] border-amber shadow-sm" : "bg-paperAlt text-slate border-ink/10 hover:border-amber/50 hover:text-ink"}`}>
                    <i className={`fa-solid ${item.icon}`} /><span>{item.label}</span><span className={`min-w-5 h-5 px-1 rounded-full text-[10px] flex items-center justify-center ${filter === item.key ? "bg-[#111827]/10" : "bg-ink/5"}`}>{counts[item.key]}</span>
                  </button>
                ))}
              </div>
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

type CopyTarget = "address" | "contact" | "instructions" | "all";

function PricingCard({ line }: { line: PricingLine }) {
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const [copyError, setCopyError] = useState("");
  const timerRef = useRef<number | null>(null);
  const mode = MODES[line.modeTransport] || { label: line.modeTransport || "Mode non renseigné", icon: "fa-route", className: "bg-ink/5 text-slate border-ink/10" };
  const modeLabel = line.typeService || mode.label;
  const minimum = minimumForMode(line.modeTransport || "");
  const kgPrice = formatFCFA(line.tarifParKg);
  const cbmPrice = formatFCFA(line.tarifParCbm);
  const delay = line.delaiJours !== null && line.delaiJours !== undefined && Number.isFinite(Number(line.delaiJours)) ? `${line.delaiJours} jour${Number(line.delaiJours) > 1 ? "s" : ""}` : null;
  const contact = contactText(line);
  const whatsappUrl = `https://api.whatsapp.com/send/?text=${encodeURIComponent(whatsappMessage(line, modeLabel))}&type=custom_url&app_absent=0`;

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const handleCopy = useCallback(async (type: CopyTarget, value: string) => {
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
        <div className="mb-5">
          <div className="flex items-start gap-2 min-w-0">
            <span className={`min-w-0 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold leading-tight ${mode.className}`}><i className={`fa-solid ${mode.icon} flex-shrink-0`} /><span>{modeLabel}</span></span>
            {minimum && <span className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-amber/45 bg-amber/12 text-ink px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold whitespace-nowrap"><i className="fa-solid fa-weight-scale text-amber" />Minimum {minimum}</span>}
          </div>
          {line.categorie && <span className="inline-flex items-center rounded-full border border-slate/30 bg-slate/15 px-3 py-1.5 text-xs font-semibold text-ink mt-2">{line.categorie}</span>}
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div><p className="font-mono-tag text-[9px] text-slate mb-1">DÉPART</p><h2 className="font-display font-bold leading-tight">{line.paysDepart || "—"}</h2><p className="text-sm text-slate mt-1">{line.villeDepart || "—"}</p></div>
          <div className="w-9 h-9 rounded-full bg-amber/15 text-amber flex items-center justify-center"><i className="fa-solid fa-arrow-right" /></div>
          <div className="text-right"><p className="font-mono-tag text-[9px] text-slate mb-1">DESTINATION</p><h2 className="font-display font-bold leading-tight">{line.paysDestination || "—"}</h2><p className="text-sm text-slate mt-1">{line.villeDestination || "—"}</p></div>
        </div>
      </div>

      <div className="p-5 md:p-6 flex-1 space-y-5">
        {(kgPrice || cbmPrice || delay) && <div className="grid grid-cols-2 gap-2.5">{kgPrice && <PriceCell label="Tarif / kg" value={kgPrice} />}{cbmPrice && <PriceCell label="Tarif / CBM" value={cbmPrice} />}{delay && <PriceCell label="Délai estimé" value={delay} highlight />}</div>}

        {(line.adressePhysique || contact || line.instructionsClient) && (
          <div className="rounded-2xl border-2 border-amber/30 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-amber/10 border-b border-amber/25">
              <p className="font-mono-tag text-[9px] text-amber">Informations d’envoi</p>
              <button type="button" onClick={() => void handleCopy("all", allInfoText(line))} className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline">
                <i className={`fa-solid ${copied === "all" ? "fa-check text-emerald-500" : "fa-copy"}`} />
                {copied === "all" ? "Copié !" : "Tout copier"}
              </button>
            </div>

            <div className="p-4 space-y-3">
              {line.adressePhysique && (
                <CopyableSection icon="fa-location-dot" label="Adresse de l’entrepôt" copied={copied === "address"} onCopy={() => void handleCopy("address", line.adressePhysique || "")}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words select-text">{line.adressePhysique}</p>
                </CopyableSection>
              )}

              {contact && (
                <CopyableSection icon="fa-user" label="Contact sur place" copied={copied === "contact"} onCopy={() => void handleCopy("contact", contact)}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    {line.contactNom && <span className="font-semibold">{line.contactNom}</span>}
                    {line.contactTelephone && <a href={`tel:${line.contactTelephone}`} className="text-amber font-semibold hover:underline"><i className="fa-solid fa-phone mr-1.5" />{line.contactTelephone}</a>}
                  </div>
                </CopyableSection>
              )}

              {line.instructionsClient && (
                <CopyableSection icon="fa-circle-info" label="Instructions à mettre sur le colis" copied={copied === "instructions"} onCopy={() => void handleCopy("instructions", line.instructionsClient || "")}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap select-text">{line.instructionsClient}</p>
                </CopyableSection>
              )}
            </div>
          </div>
        )}
        {copyError && <p className="text-xs text-postal" role="alert">{copyError}</p>}
      </div>

      <div className="border-t border-ink/8 bg-paper/40">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="min-h-14 px-4 py-3 text-sm font-semibold hover:bg-emerald-500/10 transition flex items-center justify-center gap-2"><i className="fa-brands fa-whatsapp text-emerald-500" />Envoyer sur WhatsApp</a>
      </div>
    </article>
  );
}

function PriceCell({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className="rounded-xl bg-paper border border-ink/8 p-3"><p className="font-mono-tag text-[8px] text-slate uppercase mb-1.5">{label}</p><p className={`font-display font-bold text-sm ${highlight ? "text-amber" : ""}`}>{value}</p></div>;
}

function CopyableSection({ icon, label, copied, onCopy, children }: { icon: string; label: string; copied: boolean; onCopy: () => void; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-ink/10 bg-paper p-4 pr-14">
      <button type="button" onClick={onCopy} title={`Copier : ${label}`} aria-label={`Copier : ${label}`} className="absolute right-3 top-3 w-8 h-8 rounded-full border border-ink/10 bg-paperAlt flex items-center justify-center hover:bg-amber/15 hover:border-amber/40 transition">
        <i className={`fa-solid ${copied ? "fa-check text-emerald-500" : "fa-copy text-amber"} text-xs`} />
      </button>
      <p className="font-mono-tag text-[9px] text-slate mb-2"><i className={`fa-solid ${icon} text-amber mr-2`} />{label.toUpperCase()}</p>
      {children}
    </div>
  );
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
