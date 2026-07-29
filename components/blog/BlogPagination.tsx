"use client";

import { useRouter, useSearchParams } from "next/navigation";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
};

export default function BlogPagination({ page, totalPages }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.replace(`/blog?${params.toString()}`, { scroll: false });
  };

  return (
    <nav aria-label="Pagination du blog" className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="btn-ghost border border-ink/20 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-35 disabled:cursor-not-allowed"
      >
        <i className="fa-solid fa-arrow-left text-xs mr-2" />
        Précédent
      </button>

      <span className="font-mono-tag text-xs text-slate">
        Page {page} sur {totalPages}
      </span>

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="btn-ghost border border-ink/20 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-35 disabled:cursor-not-allowed"
      >
        Suivant
        <i className="fa-solid fa-arrow-right text-xs ml-2" />
      </button>
    </nav>
  );
}
