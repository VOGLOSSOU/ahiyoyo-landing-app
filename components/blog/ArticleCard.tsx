import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArticleCardProps = {
  article: BlogArticle;
  index?: number;
};

function ExcerptMarkdown({ children }: { children: string }) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} allowedElements={["p", "strong", "em", "a"]} unwrapDisallowed>
      {children}
    </ReactMarkdown>
  );
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const date = formatDate(article.published_at);

  return (
    <Reveal delay={index * 80}>
      <article className="waybill border border-ink/8 lift flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.featured_image_url ? (
            <Image
              src={article.featured_image_url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-amber/10 text-amber">
              <i className="fa-solid fa-newspaper text-3xl" />
            </div>
          )}
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <time className="font-mono-tag text-[10px] text-slate">{date}</time>
            <span className="text-[10px] text-slate">•</span>
            <span className="font-mono-tag text-[10px] text-slate">
              {article.views_count} vue{article.views_count !== 1 ? "s" : ""}
            </span>
          </div>

          <h3 className="font-display font-bold text-lg leading-snug mb-3">
            {article.title}
          </h3>

          {article.excerpt && (
            <div className="article-card-excerpt text-sm text-slate leading-relaxed mb-5">
              <ExcerptMarkdown>{article.excerpt}</ExcerptMarkdown>
            </div>
          )}

          <div className="mt-auto">
            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline"
            >
              Lire l&apos;article
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
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
