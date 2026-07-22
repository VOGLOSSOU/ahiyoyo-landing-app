import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { cguContent } from "@/content/legal/cgu";

const pdfUrl = "/documents/cgu-ahiyoyo-19-juillet-2026.pdf";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation et de services - Ahiyoyo",
  description: "Consultez les Conditions générales d’utilisation et de services de la plateforme Ahiyoyo, version du 19 juillet 2026.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Document contractuel"
      title="Conditions générales d’utilisation et de services"
      subtitle="Achats — Expéditions terrestres, maritimes et aériennes — Voyages d’affaires"
      description="Les règles applicables à l’utilisation de la plateforme et aux services d’achat, d’expédition et de voyage d’affaires proposés par Ahiyoyo."
      version="VERSION DU 19 JUILLET 2026"
      pdfUrl={pdfUrl}
      content={cguContent}
      documentType="cgu"
    />
  );
}
