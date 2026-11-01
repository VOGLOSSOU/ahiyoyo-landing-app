export type OfferKind = "maritime" | "air";
export type PublicOffer = {
  id: string;
  titre?: string;
  reference?: string;
  statut: string;
  visiblePubliquement?: boolean;
  corridor?: { paysDepart?: string; villeDepart?: string; paysDestination?: string; villeDestination?: string };
  adresseDepot?: string | null;
  instructionsDepot?: string | null;
  dateClotureCible?: string | null;
  dateDepartEstimee?: string | null;
  delaiJours?: number | null;
  tarifActuelParCbm?: number | string | null;
  tarifActuelParKg?: number | string | null;
  volumeMinimumCbm?: number | string | null;
  volumeDisponibleCbm?: number | string | null;
  poidsDisponibleKg?: number | string | null;
};
export type OfferEntry = { kind: OfferKind; offer: PublicOffer };
export const OFFER_ENDPOINTS: Record<OfferKind, string> = {
  maritime: "/api/maritime/containers",
  air: "/api/air-groupage/offers",
};
export const APPLICATION_URL = "https://app.ahiyoyo.com";

export function readOffers(payload: unknown, kind: OfferKind): OfferEntry[] {
  const rows = Array.isArray(payload) ? payload : (payload as { data?: unknown } | null)?.data;
  if (!Array.isArray(rows)) throw new Error("INVALID_OFFERS_RESPONSE");
  return rows.filter((row): row is PublicOffer => !!row && typeof row.id === "string" && row.id.length > 0 && row.statut === "OUVERT" && row.visiblePubliquement !== false)
    .map(offer => ({ kind, offer }));
}

export function currentPrice({ kind, offer }: OfferEntry) {
  const value = Number(kind === "maritime" ? offer.tarifActuelParCbm : offer.tarifActuelParKg);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function canUseOffer(entry: OfferEntry) {
  const { offer, kind } = entry;
  const corridor = offer.corridor;
  const remaining = Number(kind === "maritime" ? offer.volumeDisponibleCbm : offer.poidsDisponibleKg);
  return !!offer.id && offer.statut === "OUVERT" && offer.visiblePubliquement !== false && !!corridor?.paysDepart && !!corridor.villeDepart && !!corridor.paysDestination && !!corridor.villeDestination && currentPrice(entry) !== null && Number.isFinite(remaining) && remaining > 0;
}

export function signupUrl({ kind, offer }: OfferEntry) {
  return `${APPLICATION_URL}/expedier-colis?${kind === "maritime" ? "offre" : "offreAerienne"}=${encodeURIComponent(offer.id)}`;
}

export function detailUrl({ kind, offer }: OfferEntry) {
  return `${APPLICATION_URL}/${kind === "maritime" ? "groupage-maritime" : "groupage-aerien"}/${encodeURIComponent(offer.id)}`;
}

export function formatOfferDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Porto-Novo" }) : null;
}

export function shareOffer(entry: OfferEntry) {
  const { offer, kind } = entry;
  const c = offer.corridor;
  return ["AHIYOYO", offer.titre, offer.reference ? `Offre : ${offer.reference}` : null,
    `Transport : ${kind === "maritime" ? "Maritime" : "Aérien"}`,
    `Départ : ${c?.villeDepart || "-"}, ${c?.paysDepart || "-"}`,
    `Destination : ${c?.villeDestination || "-"}, ${c?.paysDestination || "-"}`,
    offer.adresseDepot?.trim() ? `Adresse de dépôt :\n${offer.adresseDepot}` : null,
    offer.instructionsDepot?.trim() ? `Instructions :\n${offer.instructionsDepot}` : null,
    formatOfferDate(offer.dateClotureCible) ? `Date limite de réception : ${formatOfferDate(offer.dateClotureCible)}` : null,
    formatOfferDate(offer.dateDepartEstimee) ? `Départ estimé : ${formatOfferDate(offer.dateDepartEstimee)}` : null,
    `Consultez l’offre pour son tarif actuel : ${detailUrl(entry)}`,
  ].filter(Boolean).join("\n\n");
}
