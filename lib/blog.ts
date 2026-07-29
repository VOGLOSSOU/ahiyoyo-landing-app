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

export interface BlogDetailResponse {
  data: BlogArticle;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "REQUEST_FAILED");
  }

  return response.json() as Promise<T>;
}

export async function getLatestBlogArticles(limit = 3): Promise<BlogArticle[]> {
  const { data } = await request<BlogListResponse>(`/api/blog/articles?page=1&limit=${limit}`);
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
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(q.trim() ? { q: q.trim() } : {}),
  });

  return request<BlogListResponse>(`/api/blog/articles?${params.toString()}`);
}

export async function getPublicBlogArticle(slug: string): Promise<BlogArticle> {
  const { data } = await request<BlogDetailResponse>(`/api/blog/articles/${encodeURIComponent(slug)}`);
  return data;
}
