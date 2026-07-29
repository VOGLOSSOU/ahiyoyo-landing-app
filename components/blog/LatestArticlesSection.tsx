"use client";

import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import Reveal from "@/components/Reveal";
import Stamp from "@/components/Stamp";
import ArticleCard from "./ArticleCard";

type LatestArticlesSectionProps = {
  articles: BlogArticle[];
};

export default function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  if (!articles.length) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-6 text-center">
          <p className="text-slate text-sm">
            Nos prochains conseils arrivent bientôt.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-paperAlt">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <Stamp variant="amber" dot className="mb-4">
                Blog
              </Stamp>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Derniers articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="btn-primary inline-flex items-center justify-center bg-amber text-[#111827] font-semibold px-6 py-3 rounded-full text-sm self-start sm:self-auto"
            >
              Voir tous les articles
              <i className="fa-solid fa-arrow-right ml-2 text-xs" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
