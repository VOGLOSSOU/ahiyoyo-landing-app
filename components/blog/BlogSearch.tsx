"use client";

import { useEffect, useRef, useState } from "react";

type BlogSearchProps = {
  initialQuery: string;
  onSearchChange: (query: string) => void;
};

export default function BlogSearch({ initialQuery, onSearchChange }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const timeoutRef = useRef<number | null>(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      onSearchChange(query);
    }, 400);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [query, onSearchChange]);

  const reset = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="blog-search" className="sr-only">
        Rechercher un article
      </label>
      <div className="relative flex-1">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate text-sm" />
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un article…"
          autoComplete="off"
          className="w-full rounded-full border border-ink/15 bg-paper pl-10 pr-10 py-3.5 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center text-slate hover:text-ink transition"
            aria-label="Effacer la recherche"
          >
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        )}
      </div>
      {query && (
        <button
          type="button"
          onClick={reset}
          className="btn-ghost border border-ink/20 rounded-full px-5 py-3.5 text-sm font-semibold"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}
