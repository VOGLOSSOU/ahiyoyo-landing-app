"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Stamp from "@/components/Stamp";
import Reveal from "@/components/Reveal";
import BlogSearch from "./BlogSearch";
import BlogPagination from "./BlogPagination";
import ArticleCard from "./ArticleCard";
import { listPublicBlogArticles, type BlogArticle } from "@/lib/blog";

type BlogPageClientProps = {
  initialArticles: BlogArticle[];
  initialPage: number;
  initialQuery: string;
  initialTotal: number;
  limit: number;
  initialError?: string;
};

export default function BlogPageClient({
  initialArticles,
  initialPage,
  initialQuery,
  initialTotal,
  limit,
  initialError = "",
}: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const requestIdRef = useRef(0);

  const requestedPage = Number.parseInt(searchParams.get("page") || String(initialPage), 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const query = searchParams.get("q") || initialQuery;
  const totalPages = Math.ceil(total / limit);

  const load = useCallback(
    async (nextPage: number, nextQuery: string) => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      setError("");

      try {
        const response = await listPublicBlogArticles({
          page: nextPage,
          limit,
          q: nextQuery,
        });
        if (requestId !== requestIdRef.current) return;
        setArticles(response.data);
        setTotal(response.total);
      } catch {
        if (requestId !== requestIdRef.current) return;
        setError("Impossible de charger les articles pour le moment.");
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    if (page !== initialPage || query !== initialQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void load(page, query);
    }
  }, [page, query, initialPage, initialQuery, load]);

  const handleSearchChange = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newQuery.trim()) params.set("q", newQuery.trim());
      else params.delete("q");
      params.set("page", "1");
      router.replace(`/blog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/5">
        <div className="grain" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <Stamp variant="amber" dot className="mb-6">
                Blog
              </Stamp>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-5">
                Conseils import, export et logistique
              </h1>
              <p className="text-slate text-base md:text-lg leading-relaxed mb-8">
                Guides pratiques, astuces et actualités pour réussir vos échanges
                entre l&apos;Afrique et l&apos;international.
              </p>
              <BlogSearch key={query} initialQuery={query} onSearchChange={handleSearchChange} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-14">
        {error && (
          <div className="max-w-xl mx-auto waybill border border-postal/20 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-postal/10 text-postal flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation" />
            </div>
            <h2 className="font-display font-bold text-xl mb-2">Chargement impossible</h2>
            <p className="text-slate text-sm mb-6">{error}</p>
            <button
              type="button"
              onClick={() => load(page, query)}
              className="btn-primary bg-amber text-[#111827] rounded-full px-6 py-3 text-sm font-semibold"
            >
              <i className="fa-solid fa-arrow-rotate-right mr-2" />
              Réessayer
            </button>
          </div>
        )}

        {!error && loading && (
          <div className="flex items-center justify-center gap-3 py-5 text-sm text-slate" role="status" aria-live="polite">
            <i className="fa-solid fa-spinner fa-spin text-amber" />
            <p>Mise à jour des articles…</p>
          </div>
        )}

        {!error && !loading && articles.length === 0 && (
          <div className="text-center py-20">
            <i className="fa-solid fa-newspaper text-amber text-3xl mb-4" />
            <h2 className="font-display font-bold text-xl mb-2">
              {query
                ? `Aucun article ne correspond à votre recherche « ${query} ».`
                : "Aucun article n'est disponible pour le moment."}
            </h2>
            {query && (
              <p className="text-slate text-sm">
                Essayez avec d&apos;autres mots-clés ou consultez tous nos articles.
              </p>
            )}
          </div>
        )}

        {!error && articles.length > 0 && (
          <>
            <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 transition-opacity ${loading ? "opacity-55" : ""}`} aria-busy={loading}>
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>

            <div className="mt-10">
              <BlogPagination page={page} totalPages={totalPages} />
            </div>
          </>
        )}
      </section>
    </>
  );
}
