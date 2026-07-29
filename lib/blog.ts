import { cache } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://orchid-jellyfish-551876.hostingersite.com").replace(/\/$/, "");

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  status: string;
  published_at: string;
  views_count: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  blocks: Array<{
    id: string;
    article_id: string;
    title: string | null;
    content: string;
    position: number;
    media_url: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  author?: {
    id: number;
    nom: string;
    prenom: string;
  };
}

export interface BlogListResponse {
  data: BlogArticle[];
  page: number;
  limit: number;
  total: number;
}

export class BlogApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BlogApiError";
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new BlogApiError(payload?.message || "REQUEST_FAILED", response.status);
  }

  return response.json() as Promise<T>;
}

export async function getLatestBlogArticles(limit = 3): Promise<BlogArticle[]> {
  const safeLimit = Math.min(50, Math.max(1, Math.trunc(limit) || 3));
  const { data } = await request<BlogListResponse>(`/api/blog/articles?page=1&limit=${safeLimit}`);
  return data;
}

export async function listPublicBlogArticles({
  page = 1,
  limit = 12,
  q = "",
}: {
  page?: number;
  limit?: number;
  q?: string;
}): Promise<BlogListResponse> {
  const safePage = Math.max(1, Math.trunc(page) || 1);
  const safeLimit = Math.min(50, Math.max(1, Math.trunc(limit) || 12));
  const params = new URLSearchParams({
    page: String(safePage),
    limit: String(safeLimit),
    ...(q.trim() ? { q: q.trim() } : {}),
  });

  return request<BlogListResponse>(`/api/blog/articles?${params.toString()}`);
}

type BlogDetailPayload = BlogArticle | { data: BlogArticle };

export const getPublicBlogArticle = cache(async (slug: string): Promise<BlogArticle> => {
  const payload = await request<BlogDetailPayload>(`/api/blog/articles/${encodeURIComponent(slug)}`);

  // The public API returns the article directly. Accepting the wrapped form as
  // well keeps the frontend compatible with older deployments of the backend.
  return "data" in payload ? payload.data : payload;
});
