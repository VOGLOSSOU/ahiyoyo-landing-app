import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Corridors from "@/components/Corridors";
import Partners from "@/components/Partners";
import Problem from "@/components/Problem";
import Audiences from "@/components/Audiences";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQPreview from "@/components/FAQPreview";
import ContactCTA from "@/components/ContactCTA";
import LatestArticlesSection from "@/components/blog/LatestArticlesSection";
import { getLatestBlogArticles } from "@/lib/blog";

export default async function Home() {
  const latestArticles = await getLatestBlogArticles(3).catch(() => []);

  return (
    <>
      <Navbar />
      <Hero />
      <Corridors />
      <Partners />
      <Problem />
      <Audiences />
      <Services />
      <Pricing />
      <Testimonials />
      <LatestArticlesSection articles={latestArticles} />
      <FAQPreview />
      <ContactCTA />
      <Footer />
    </>
  );
}
