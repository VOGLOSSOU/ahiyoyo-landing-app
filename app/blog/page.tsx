import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { listPublicBlogArticles, type BlogListResponse } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Ahiyoyo — Conseils import, export et logistique",
  description:
    "Guides pratiques, astuces et actualités sur l'import, l'export et la logistique entre l'Afrique et l'international.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const query = (params.q || "").trim();

  let response: BlogListResponse = { data: [], page, limit: 12, total: 0 };
  let initialError = "";

  try {
    response = await listPublicBlogArticles({ page, limit: 12, q: query });
  } catch {
    initialError = "Impossible de charger les articles pour le moment.";
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <BlogPageClient
          initialArticles={response.data}
          initialPage={response.page}
          initialQuery={query}
          initialTotal={response.total}
          limit={response.limit}
          initialError={initialError}
        />
      </main>
      <Footer />
    </>
  );
}
