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
  if (!articles.length) return null;

  const latestArticles = articles.slice(0, 3);

  const cardLayout = (index: number) => {
    if (latestArticles.length === 1) return "md:col-span-2 lg:col-span-12";
    if (latestArticles.length === 2) return index === 0 ? "md:col-span-2 lg:col-span-8" : "md:col-span-2 lg:col-span-4";
    return index === 0 ? "md:col-span-2 lg:col-span-6" : "lg:col-span-3";
  };

  return (
    <section className="py-16 md:py-24 bg-paperAlt border-y border-ink/5 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <Stamp variant="amber" dot className="mb-4">
                Blog
              </Stamp>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Nos derniers conseils pour aller plus loin.
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                Guides pratiques, méthodes et actualités pour mieux acheter, vendre et expédier à l’international.
              </p>
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

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 items-stretch">
          {latestArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              featured={index === 0}
              className={cardLayout(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
