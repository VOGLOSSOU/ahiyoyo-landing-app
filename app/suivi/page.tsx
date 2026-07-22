import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicTracking from "@/components/PublicTracking";

export const metadata: Metadata = {
  title: "Suivi de colis et commande - Ahiyoyo",
  description: "Suivez publiquement votre colis ou votre commande Ahiyoyo grâce à votre référence.",
};

export default function TrackingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Suspense fallback={<div className="min-h-[70vh] bg-paper" />}>
          <PublicTracking />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
