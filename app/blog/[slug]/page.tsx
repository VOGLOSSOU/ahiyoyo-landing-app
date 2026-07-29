import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleContent from "@/components/blog/ArticleContent";
import { BlogApiError, getPublicBlogArticle } from "@/lib/blog";
import Reveal from "@/components/Reveal";
import Stamp from "@/components/Stamp";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getPublicBlogArticle(slug);

    const seoTitle = article.meta_title || article.title;
    const seoDescription = article.meta_description || article.excerpt || "";
    const seoImage = article.featured_image_url;

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: seoImage ? [seoImage] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: seoImage ? [seoImage] : [],
      },
    };
  } catch (error) {
    if (error instanceof BlogApiError && error.status !== 404) throw error;
    return {
      title: "Article introuvable",
      description: "Cet article n'existe pas ou n'est plus disponible.",
    };
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getPublicBlogArticle(slug);
  } catch (error) {
    if (error instanceof BlogApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="relative overflow-hidden border-b border-ink/5">
          <div className="grain" />
          <div className="relative max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20">
            <Reveal>
              <div className="text-center">
                <Stamp variant="amber" dot className="mb-6">
                  Blog
                </Stamp>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <ArticleContent article={article} />
        </section>
      </main>
      <Footer />
    </>
  );
}
