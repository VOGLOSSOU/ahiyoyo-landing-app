import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Corridors from "@/components/Corridors";
import KeyStats from "@/components/KeyStats";
import Partners from "@/components/Partners";
import Problem from "@/components/Problem";
import Audiences from "@/components/Audiences";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import ClientSpace from "@/components/ClientSpace";
import Tracking from "@/components/Tracking";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQPreview from "@/components/FAQPreview";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Corridors />
      <KeyStats />
      <Partners />
      <Problem />
      <Audiences />
      <Services />
      <HowItWorks />
      <ClientSpace />
      <Tracking />
      <Pricing />
      <Testimonials />
      <FAQPreview />
      <ContactCTA />
      <Footer />
    </>
  );
}
