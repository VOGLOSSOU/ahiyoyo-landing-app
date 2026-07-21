import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

const pdfUrl = "/documents/politique-confidentialite-ahiyoyo-19-juillet-2026.pdf";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ahiyoyo",
  description: "Consultez la Politique de confidentialité de la plateforme Ahiyoyo, version révisée du 19 juillet 2026.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      description="La manière dont Ahiyoyo collecte, utilise, conserve, partage et protège les données personnelles liées à ses services."
      version="VERSION RÉVISÉE DU 19 JUILLET 2026"
      pdfUrl={pdfUrl}
    />
  );
}
