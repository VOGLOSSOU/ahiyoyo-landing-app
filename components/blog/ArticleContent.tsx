import Image from "next/image";
import Link from "next/link";
import BlogMarkdown from "./BlogMarkdown";
import type { BlogArticle } from "@/lib/blog";

type ArticleContentProps = {
  article: BlogArticle;
};

export default function ArticleContent({ article }: ArticleContentProps) {
  const date = formatDate(article.published_at);
  const authorName = article.author
    ? `${article.author.prenom} ${article.author.nom}`
    : "Ahiyoyo";

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-slate mb-6">
          <Link href="/" className="hover:text-amber transition">Accueil</Link>
          <span className="text-ink/20">/</span>
          <Link href="/blog" className="hover:text-amber transition">Blog</Link>
          <span className="text-ink/20">/</span>
          <span className="text-ink font-semibold truncate">{article.title}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate">
          <time dateTime={article.published_at}>{date}</time>
          <span className="text-ink/15">•</span>
          <span>{authorName}</span>
          <span className="text-ink/15">•</span>
          <span>{article.views_count} vue{article.views_count !== 1 ? "s" : ""}</span>
        </div>
      </header>

      {article.featured_image_url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
          <Image
            src={article.featured_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 66vw, 100vw"
          />
        </div>
      )}

      {article.excerpt && (
        <div className="blog-markdown blog-introduction text-base md:text-lg !text-slate leading-relaxed mb-8">
          <BlogMarkdown>{article.excerpt}</BlogMarkdown>
        </div>
      )}

      {article.content && (
        <div className="blog-markdown blog-introduction text-base md:text-lg text-ink leading-relaxed mb-10">
          <BlogMarkdown>{article.content}</BlogMarkdown>
        </div>
      )}

      <div className="space-y-10">
        {article.blocks?.map((block) => (
          <section key={block.id} className="blog-block">
            {block.title && (
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-5">
                {block.title}
              </h2>
            )}
            <div className="blog-markdown text-sm md:text-base text-ink leading-relaxed">
              <BlogMarkdown>{block.content}</BlogMarkdown>
            </div>
            {block.media_url && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mt-6">
                <Image
                  src={block.media_url}
                  alt={block.title || article.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 66vw, 100vw"
                />
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-ink/10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">
          <i className="fa-solid fa-arrow-left text-xs" />
          Retour vers tous les articles
        </Link>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
