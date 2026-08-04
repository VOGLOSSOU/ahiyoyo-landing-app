import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { cguContent } from "@/content/legal/cgu";

const pdfUrl = "/documents/cgu-ahiyoyo-31-juillet-2026.pdf";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation et de services - Ahiyoyo",
  description: "Consultez les Conditions générales d’utilisation et de services de la plateforme Ahiyoyo, version révisée du 31 juillet 2026.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Document contractuel"
      title="Conditions générales d’utilisation et de services"
      description="Version explicite des règles applicables à la plateforme et aux services proposés par Ahiyoyo."
      version="VERSION RÉVISÉE DU 31 JUILLET 2026 — ÉTABLIE À PARTIR DE LA VERSION DU 19 JUILLET 2026"
      pdfUrl={pdfUrl}
      content={cguContent}
      documentType="cgu"
    />
  );
}
