import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicPricing from "@/components/PublicPricing";

export const metadata: Metadata = {
  title: "Adresses et tarifs d’envoi - Ahiyoyo",
  description: "Découvrez les offres de groupage maritime et aérien ouvertes : adresses de dépôt, tarifs actuels, dates et instructions d’envoi Ahiyoyo.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <PublicPricing />
      </main>
      <Footer />
    </>
  );
}
