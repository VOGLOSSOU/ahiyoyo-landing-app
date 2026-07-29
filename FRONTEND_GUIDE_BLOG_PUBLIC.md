# Guide Frontend — Blog public Ahiyoyo

> Application concernée : site vitrine public Ahiyoyo  
> Public concerné : développeur frontend du site vitrine  
> Date : 29 juillet 2026

---

## 1. Objectif

Le site vitrine doit proposer :

1. une section sur la page d'accueil affichant les trois derniers articles publiés ;
2. une page Blog affichant tous les articles publiés ;
3. une pagination sur la page Blog ;
4. un champ de recherche ;
5. une page de détail pour chaque article ;
6. des métadonnées SEO adaptées à l'article consulté.

La base URL du backend est déjà configurée dans l'environnement du frontend. Ce guide utilise uniquement les chemins `/api/...`.

Toutes les routes de ce document sont publiques :

- aucun token JWT n'est nécessaire ;
- aucun header `Authorization` n'est nécessaire ;
- seuls les articles dont le statut est `published` sont retournés ;
- les brouillons et les archives ne sont jamais exposés.

Préfixe public :

```text
/api/blog
```

---

## 2. Endpoints disponibles

| Méthode | Endpoint | Fonction |
|---|---|---|
| `GET` | `/api/blog/articles` | Lister, rechercher et paginer les articles publiés |
| `GET` | `/api/blog/articles/:slugOrId` | Obtenir le détail d'un article publié |

Il n'existe aucune route de création, modification ou suppression dans l'application vitrine.

---

## 3. Structure des données

### Article public

| Champ | Type | Description |
|---|---|---|
| `id` | UUID | Identifiant technique |
| `title` | string | Titre de l'article |
| `slug` | string | Identifiant destiné à l'URL publique |
| `excerpt` | string ou `null` | Résumé de l'article |
| `content` | string ou `null` | Introduction ou contenu général |
| `featured_image_url` | URL ou `null` | Image principale |
| `status` | string | Toujours `published` sur les routes publiques |
| `published_at` | date ISO | Première date de publication |
| `views_count` | number | Nombre de consultations du détail |
| `meta_title` | string ou `null` | Titre SEO personnalisé |
| `meta_description` | string ou `null` | Description SEO personnalisée |
| `created_at` | date ISO | Date de création technique |
| `updated_at` | date ISO | Dernière modification |
| `blocks` | array | Paragraphes ordonnés |
| `author` | object | Auteur, présent dans la réponse de détail |

### Paragraphe

| Champ | Type | Description |
|---|---|---|
| `id` | UUID | Identifiant |
| `article_id` | UUID | Article parent |
| `title` | string ou `null` | Sous-titre |
| `content` | string | Texte du paragraphe |
| `position` | number | Ordre d'affichage |
| `media_url` | URL ou `null` | Image associée |
| `createdAt` | date ISO | Date de création technique |
| `updatedAt` | date ISO | Dernière modification technique |

Les blocs sont retournés dans l'ordre croissant de `position`.

---

## 4. Section « Derniers articles » de l'accueil

### Requête

```http
GET /api/blog/articles?page=1&limit=3
```

Le backend trie les résultats par :

1. `published_at` décroissant ;
2. `created_at` décroissant en cas d'égalité.

Les trois éléments retournés sont donc les trois derniers articles publiés.

### Exemple de réponse

```json
{
  "data": [
    {
      "id": "8f791461-bad3-4655-b8d8-5c9da48b6d50",
      "title": "Comment importer depuis la Chine",
      "slug": "comment-importer-depuis-la-chine-a1b2c3d4",
      "excerpt": "Les étapes essentielles pour réussir son importation.",
      "content": "Introduction facultative.",
      "featured_image_url": "https://res.cloudinary.com/.../article.jpg",
      "status": "published",
      "published_at": "2026-07-29T12:00:00.000Z",
      "views_count": 12,
      "meta_title": "Importer depuis la Chine | Ahiyoyo",
      "meta_description": "Guide pratique pour importer depuis la Chine.",
      "created_at": "2026-07-28T10:00:00.000Z",
      "updated_at": "2026-07-29T12:00:00.000Z",
      "blocks": []
    }
  ],
  "page": 1,
  "limit": 3,
  "total": 1
}
```

`total` représente le nombre total d'articles publiés, pas seulement les trois éléments retournés.

### Service frontend

```js
// Utiliser l'instance HTTP publique déjà configurée dans le projet.
import { api } from '@/api/api';

export async function getLatestBlogArticles() {
  const { data } = await api.get('/api/blog/articles', {
    params: { page: 1, limit: 3 }
  });
  return data.data;
}
```

Adapter uniquement le chemin d'import à l'architecture réelle du frontend. Ne pas créer une nouvelle base URL si le projet en possède déjà une.

### Carte d'article recommandée

Chaque carte doit afficher :

- `featured_image_url`, ou une image locale de remplacement ;
- `title` ;
- `excerpt`, avec limitation visuelle à quelques lignes ;
- `published_at` formatée ;
- un lien « Lire l'article ».

Le résumé `excerpt` peut contenir du Markdown. Sur une carte, limiter son rendu aux éléments textuels simples et appliquer une limite visuelle de lignes. Ne pas afficher les images, titres ou blocs de code Markdown dans une carte.

Lien :

```jsx
<Link to={`/blog/${article.slug}`}>
  Lire l'article
</Link>
```

Ne pas utiliser l'UUID dans l'URL visible lorsque le slug est disponible.

### Bouton vers la page Blog

La section doit contenir un bouton :

```text
Voir tous les articles
```

qui dirige vers :

```text
/blog
```

### État vide

Si `data` est vide, masquer entièrement la section ou afficher un message discret :

```text
Nos prochains conseils arrivent bientôt.
```

Ne pas afficher trois cartes vides.

---

## 5. Page de tous les articles

Route d'interface suggérée :

```text
/blog
```

### Requête API

```http
GET /api/blog/articles?page=1&limit=12
```

### Paramètres

| Paramètre | Type | Défaut backend | Limite | Description |
|---|---|---|---|---|
| `page` | integer | `1` | minimum 1 | Page demandée |
| `limit` | integer | `12` | maximum 50 | Nombre d'articles par page |
| `q` | string | vide | — | Recherche |

Exemple :

```http
GET /api/blog/articles?page=2&limit=12&q=transport
```

La recherche porte actuellement sur :

- le titre ;
- le résumé ;
- le contenu général de l'article.

Elle ne porte pas sur le contenu des paragraphes `blocks`.

### Service frontend

```js
export async function listPublicBlogArticles({
  page = 1,
  limit = 12,
  q = ''
} = {}) {
  const { data } = await api.get('/api/blog/articles', {
    params: {
      page,
      limit,
      ...(q.trim() ? { q: q.trim() } : {})
    }
  });

  return data;
}
```

### Format de réponse

```json
{
  "data": [],
  "page": 1,
  "limit": 12,
  "total": 0
}
```

Calcul du nombre de pages :

```js
const totalPages = Math.ceil(total / limit);
```

### Synchronisation avec l'URL

Il est recommandé de conserver la page et la recherche dans la query string du navigateur :

```text
/blog?page=2&q=transport
```

Avantages :

- rafraîchissement sans perdre la recherche ;
- bouton précédent/suivant du navigateur fonctionnel ;
- URL partageable.

### Champ de recherche

Comportement recommandé :

- délai de 300 à 500 ms avant l'appel API ;
- remise à `page=1` lorsque la recherche change ;
- suppression des espaces au début et à la fin ;
- bouton permettant d'effacer la recherche.

Exemple React simplifié :

```js
const [search, setSearch] = useState(searchParams.get('q') || '');

useEffect(() => {
  const timeout = setTimeout(() => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (search.trim()) next.set('q', search.trim());
      else next.delete('q');
      next.set('page', '1');
      return next;
    });
  }, 400);

  return () => clearTimeout(timeout);
}, [search]);
```

### Pagination

Afficher :

- bouton Précédent ;
- numéros de pages si le composant le permet ;
- bouton Suivant ;
- état désactivé aux limites.

```jsx
<button disabled={page <= 1} onClick={() => goToPage(page - 1)}>
  Précédent
</button>

<span>Page {page} sur {totalPages}</span>

<button
  disabled={page >= totalPages}
  onClick={() => goToPage(page + 1)}
>
  Suivant
</button>
```

Si `total === 0`, ne pas afficher « Page 1 sur 0 ». Masquer la pagination.

### États de la page

Prévoir distinctement :

- chargement initial : skeletons de cartes ;
- changement de page : conserver la mise en page et afficher un indicateur ;
- aucun article publié ;
- aucun résultat pour la recherche ;
- erreur réseau avec bouton Réessayer.

Messages suggérés :

```text
Aucun article n'est disponible pour le moment.
```

```text
Aucun article ne correspond à votre recherche « transport ».
```

---

## 6. Page de détail

Route d'interface suggérée :

```text
/blog/:slug
```

### Requête

```http
GET /api/blog/articles/:slugOrId
```

Exemple :

```http
GET /api/blog/articles/comment-importer-depuis-la-chine-a1b2c3d4
```

Le backend accepte un slug ou un UUID. Le frontend doit utiliser le slug.

### Service frontend

```js
export async function getPublicBlogArticle(slug) {
  const { data } = await api.get(
    `/api/blog/articles/${encodeURIComponent(slug)}`
  );
  return data;
}
```

### Exemple de réponse

```json
{
  "id": "8f791461-bad3-4655-b8d8-5c9da48b6d50",
  "title": "Comment importer depuis la Chine",
  "slug": "comment-importer-depuis-la-chine-a1b2c3d4",
  "excerpt": "Les étapes essentielles pour réussir son importation.",
  "content": "Importer devient plus simple avec une bonne préparation.",
  "featured_image_url": "https://res.cloudinary.com/.../article.jpg",
  "status": "published",
  "published_at": "2026-07-29T12:00:00.000Z",
  "views_count": 13,
  "meta_title": "Importer depuis la Chine | Ahiyoyo",
  "meta_description": "Guide pratique pour importer depuis la Chine.",
  "created_at": "2026-07-28T10:00:00.000Z",
  "updated_at": "2026-07-29T12:00:00.000Z",
  "blocks": [
    {
      "id": "uuid-bloc-1",
      "article_id": "8f791461-bad3-4655-b8d8-5c9da48b6d50",
      "title": "Choisir son fournisseur",
      "content": "Commencez par vérifier l'identité et les références.",
      "position": 0,
      "media_url": "https://res.cloudinary.com/.../fournisseur.jpg",
      "createdAt": "2026-07-28T10:00:00.000Z",
      "updatedAt": "2026-07-28T10:00:00.000Z"
    }
  ],
  "author": {
    "id": 1,
    "nom": "Admin",
    "prenom": "Root"
  }
}
```

Chaque appel réussi à cette route augmente `views_count`. Éviter donc les appels dupliqués inutiles en développement et en production.

### Ordre d'affichage conseillé

1. fil d'Ariane Accueil / Blog / Article ;
2. titre ;
3. date de publication et auteur ;
4. image principale ;
5. résumé ;
6. introduction `content`, si présente ;
7. paragraphes dans l'ordre reçu ;
8. retour vers tous les articles.

### Affichage des paragraphes

Les champs suivants peuvent contenir du Markdown :

- `excerpt` ;
- `content` de l'article ;
- `blocks[].content`.

Exemple de contenu reçu :

```md
La [Foire de Canton](https://www.cantonfair.org.cn/en-US) est le plus grand salon commercial de Chine.

Chaque année, des milliers d'importateurs s'y rendent pour :

- Trouver des fournisseurs fiables
- Négocier directement avec les usines
- Découvrir les nouvelles tendances produits
- Obtenir les meilleurs prix d'achat

**Ahiyoyo** vous accompagne pendant toute la durée du séjour.
```

Ce contenu doit produire :

- un lien cliquable sur « Foire de Canton » ;
- deux paragraphes distincts ;
- une vraie liste à puces ;
- le mot « Ahiyoyo » en gras.

Ne pas afficher le Markdown avec un simple `<p>{content}</p>` : la syntaxe des liens et des listes apparaîtrait comme du texte brut.

### Bibliothèques recommandées

Pour une application React :

```bash
npm install react-markdown remark-gfm remark-breaks
```

- `react-markdown` transforme le Markdown en composants React ;
- `remark-gfm` active notamment les tableaux, textes barrés et listes enrichies ;
- `remark-breaks` transforme les simples retours à la ligne en `<br>`, ce qui respecte mieux la saisie faite par l'administrateur.

Si ces dépendances existent déjà, réutiliser les versions et le composant Markdown du projet.

### Composant de rendu conseillé

```jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export function BlogMarkdown({ children }) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        a({ node: _node, href, children, ...props }) {
          const external = /^https?:\/\//i.test(href || '');

          return (
            <a
              href={href}
              {...(external
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  }
                : {})}
              {...props}
            >
              {children}
            </a>
          );
        },
        img({ node: _node, src, alt, ...props }) {
          if (!src) return null;

          return (
            <img
              src={src}
              alt={alt || ''}
              loading="lazy"
              decoding="async"
              {...props}
            />
          );
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
```

Consignes de sécurité :

- ne pas ajouter `rehype-raw` ;
- ne pas activer l'interprétation du HTML brut provenant du contenu ;
- ne jamais utiliser `dangerouslySetInnerHTML` avec ces champs ;
- conserver `rel="noopener noreferrer"` sur les liens externes ;
- n'accepter que des URL `http`, `https`, relatives ou `mailto` si un traitement personnalisé des URL est ajouté.

`react-markdown` n'interprète pas le HTML brut par défaut. Il faut conserver ce comportement.

### Affichage complet de l'article

```jsx
<article>
  <h1>{article.title}</h1>

  {article.excerpt && (
    <div className="blog-excerpt">
      <BlogMarkdown>{article.excerpt}</BlogMarkdown>
    </div>
  )}

  {article.featured_image_url && (
    <img
      src={article.featured_image_url}
      alt={article.title}
      className="blog-featured-image"
    />
  )}

  {article.content && (
    <div className="blog-introduction">
      <BlogMarkdown>{article.content}</BlogMarkdown>
    </div>
  )}

  {article.blocks?.map((block) => (
    <section key={block.id} className="blog-block">
      {block.title && <h2>{block.title}</h2>}

      <BlogMarkdown>{block.content}</BlogMarkdown>

      {block.media_url && (
      <img
        src={block.media_url}
        alt={block.title || article.title}
        loading="lazy"
        decoding="async"
      />
      )}
    </section>
  ))}
</article>
```

`blocks` est normalement présent, mais utiliser `article.blocks ?? []` ou `article.blocks?.map(...)` évite un crash pendant le chargement.

### Titres et hiérarchie

- Le titre principal de l'article est l'unique `<h1>`.
- Le titre d'un bloc est généralement un `<h2>`.
- Les sous-titres écrits en Markdown dans le contenu devraient commencer à `###` pour produire des `<h3>`.
- Éviter plusieurs `<h1>` dans le contenu Markdown.

Si nécessaire, le composant peut remapper les titres Markdown :

```jsx
<ReactMarkdown
  components={{
    h1: ({ children }) => <h3>{children}</h3>,
    h2: ({ children }) => <h3>{children}</h3>
  }}
>
  {content}
</ReactMarkdown>
```

Fusionner ce remapping avec les composants `a` et `img` du composant principal, plutôt que de créer plusieurs rendus différents.

### Retours à la ligne, espaces et puces

Avec `remark-breaks` :

```md
Première ligne
Deuxième ligne
```

affiche bien deux lignes.

Pour une vraie liste, recommander aux administrateurs la syntaxe :

```md
- Premier élément
- Deuxième élément
- Troisième élément
```

Le caractère `•` saisi directement est conservé, mais il ne crée pas une vraie structure HTML de liste. La syntaxe `- élément` est donc préférable pour l'accessibilité et le style.

Markdown ne conserve pas plusieurs espaces consécutifs comme dans un traitement de texte. Pour un blog, utiliser les paragraphes, listes et titres plutôt que des espaces manuels pour construire la mise en page.

### Liens internes et externes

- Les liens `https://...` peuvent s'ouvrir dans un nouvel onglet.
- Les liens relatifs comme `/services/import` doivent rester dans le même onglet.
- Ne pas transformer automatiquement chaque URL écrite en texte si elle n'utilise pas la syntaxe Markdown.

Syntaxe attendue :

```md
[Découvrir nos services](/services)
[Visiter la Foire de Canton](https://www.cantonfair.org.cn/en-US)
```

Si le routeur du frontend doit intercepter les liens internes sans rechargement complet, adapter le composant `a` pour utiliser son composant `Link` lorsque `href` commence par `/`.

### Images dans le contenu

Deux mécanismes sont possibles :

1. `featured_image_url` pour l'image principale ;
2. `blocks[].media_url` pour l'image structurée d'un paragraphe.

Markdown accepte aussi :

```md
![Description accessible de l'image](https://exemple.com/image.jpg)
```

Toutefois, privilégier les champs d'image structurés du backend. Ils permettent de contrôler plus facilement l'ordre, le texte alternatif, le chargement différé et la mise en page.

### Citations, tableaux et code

`remark-gfm` permet notamment :

```md
> Une citation importante.

| Service | Délai |
|---|---|
| Air express | 7 jours |
| Maritime | 90 jours |

`code en ligne`
```

Les tableaux doivent être placés dans un conteneur avec défilement horizontal sur mobile :

```css
.blog-markdown table {
  min-width: 36rem;
}

.blog-markdown {
  overflow-wrap: anywhere;
}

.blog-markdown .table-wrapper {
  overflow-x: auto;
}
```

Selon le composant utilisé, envelopper les tableaux dans un conteneur responsive ou appliquer `overflow-x: auto` à leur parent.

### Styles typographiques minimaux

Le contenu Markdown doit recevoir une classe dédiée :

```jsx
<div className="blog-markdown">
  <BlogMarkdown>{block.content}</BlogMarkdown>
</div>
```

Prévoir des styles pour :

- espacements entre paragraphes ;
- marges avant les titres ;
- indentation des listes ;
- couleur et soulignement des liens ;
- citations ;
- blocs de code ;
- tableaux ;
- images responsives.

Exemple CSS minimal :

```css
.blog-markdown {
  color: #252525;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.blog-markdown p,
.blog-markdown ul,
.blog-markdown ol,
.blog-markdown blockquote {
  margin: 0 0 1rem;
}

.blog-markdown ul,
.blog-markdown ol {
  padding-left: 1.5rem;
}

.blog-markdown a {
  color: #0b6bcb;
  text-decoration: underline;
}

.blog-markdown img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1.5rem auto;
  border-radius: 0.75rem;
}

.blog-markdown pre {
  max-width: 100%;
  overflow-x: auto;
  padding: 1rem;
}
```

Si Tailwind Typography est déjà installé, une classe `prose` peut remplacer une grande partie de ces styles :

```jsx
<div className="prose prose-lg max-w-none">
  <BlogMarkdown>{article.content}</BlogMarkdown>
</div>
```

Ne pas installer Tailwind Typography uniquement pour ce module si le frontend possède déjà son propre design system.

### Résumé dans les cartes

Pour les cartes, le résumé doit rester compact. Deux options :

1. afficher `excerpt` comme texte simple si les résumés ne contiennent pas de formatage ;
2. utiliser un rendu Markdown limité.

Exemple limité :

```jsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  allowedElements={['p', 'strong', 'em', 'a']}
  unwrapDisallowed
>
  {article.excerpt || ''}
</ReactMarkdown>
```

Appliquer ensuite une limite visuelle :

```css
.article-card-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Contenu vide ou facultatif

- `excerpt` peut être `null` ;
- `content` peut être `null` ;
- `block.title` peut être `null` ;
- `block.media_url` peut être `null` ;
- `featured_image_url` peut être `null`.

Tester la présence d'une valeur avant de rendre le composant. En revanche, `block.content` est toujours obligatoire lorsqu'un bloc existe.

### Article introuvable

La route retourne :

```http
404 Not Found
```

```json
{
  "message": "Article introuvable"
}
```

Le frontend doit afficher sa page 404 publique ou un écran :

```text
Cet article n'existe pas ou n'est plus disponible.
```

Un brouillon et un article archivé retournent également `404`. Il ne faut pas révéler leur existence au visiteur.

---

## 7. Formatage de la date

Utiliser `published_at`, et non `created_at`, comme date visible au lecteur.

```js
export function formatPublicationDate(value) {
  if (!value) return '';

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));
}
```

Exemple :

```text
Publié le 29 juillet 2026
```

---

## 8. SEO

### Page détail

Utiliser les priorités suivantes :

```js
const seoTitle = article.meta_title || article.title;
const seoDescription = article.meta_description || article.excerpt || '';
const seoImage = article.featured_image_url || DEFAULT_SOCIAL_IMAGE;
```

Mettre à jour :

- `<title>` ;
- `<meta name="description">` ;
- Open Graph `og:title`, `og:description`, `og:image`, `og:type=article` ;
- Twitter Card ;
- URL canonique construite depuis l'URL actuelle du site vitrine.

Exemple avec un composant SEO existant :

```jsx
<Seo
  title={article.meta_title || article.title}
  description={article.meta_description || article.excerpt || ''}
  image={article.featured_image_url}
  type="article"
/>
```

### Page Blog

Utiliser un titre et une description fixes, par exemple :

```text
Blog Ahiyoyo — Conseils import, export et logistique
```

La manière exacte de rendre les métadonnées dépend du framework déjà utilisé par le frontend. Réutiliser son mécanisme SEO existant.

---

## 9. Images et performances

Bonnes pratiques :

- prévoir une image locale de remplacement ;
- définir `loading="lazy"` sur les images hors écran ;
- conserver un ratio stable sur les cartes pour éviter les décalages ;
- renseigner `width` et `height` lorsque le composant d'image le permet ;
- utiliser un `alt` basé sur le titre ;
- ne jamais afficher une balise avec `src=""`.

Exemple :

```jsx
<img
  src={article.featured_image_url || DEFAULT_BLOG_IMAGE}
  alt={article.title}
  loading="lazy"
/>
```

---

## 10. Gestion des erreurs

| HTTP | Signification | Comportement recommandé |
|---|---|---|
| `200` | Succès | Afficher les données |
| `404` | Article absent, archivé ou brouillon | Page 404 publique |
| `500` | Erreur serveur | Message générique et bouton Réessayer |
| erreur réseau | API inaccessible | Conserver la page et proposer de réessayer |

Fonction indicative :

```js
export function getPublicBlogError(error) {
  if (error.response?.status === 404) {
    return 'Cet article n’existe pas ou n’est plus disponible.';
  }

  return 'Impossible de charger le blog pour le moment.';
}
```

---

## 11. Architecture frontend suggérée

```text
src/
├── api/
│   └── blogPublic.api.js
├── pages/
│   ├── BlogPage.jsx
│   └── BlogArticlePage.jsx
├── components/blog/
│   ├── LatestArticlesSection.jsx
│   ├── ArticleCard.jsx
│   ├── ArticleGrid.jsx
│   ├── BlogSearch.jsx
│   ├── BlogPagination.jsx
│   └── ArticleContent.jsx
└── utils/
    └── blog.utils.js
```

Routes suggérées :

```text
/
/blog
/blog/:slug
```

Réutiliser les conventions, le routeur, le client HTTP, le cache de requêtes et le système SEO déjà présents dans l'application.

---

## 12. Plan de recette

### Accueil

- [ ] La section charge exactement trois articles au maximum.
- [ ] Les articles sont les plus récemment publiés.
- [ ] Chaque carte affiche image, titre, résumé et date.
- [ ] Chaque carte ouvre le bon détail par slug.
- [ ] Le bouton « Voir tous les articles » ouvre `/blog`.
- [ ] La section gère correctement une liste vide.

### Page Blog

- [ ] La première page utilise `page=1&limit=12`.
- [ ] La pagination change correctement les résultats.
- [ ] La page et la recherche sont conservées dans l'URL.
- [ ] Une nouvelle recherche revient à la page 1.
- [ ] Le bouton d'effacement réinitialise la recherche.
- [ ] Une recherche sans résultat affiche un état dédié.
- [ ] Aucun brouillon ou article archivé n'apparaît.
- [ ] Le rafraîchissement conserve la page courante.

### Détail

- [ ] Le détail est demandé avec le slug.
- [ ] Le titre, résumé, image principale et date sont affichés.
- [ ] L'auteur est affiché sans email.
- [ ] L'introduction facultative est gérée.
- [ ] Tous les paragraphes sont affichés dans le bon ordre.
- [ ] Les titres et images facultatifs ne laissent pas d'espace vide.
- [ ] Les paragraphes et retours à la ligne Markdown sont respectés.
- [ ] Les listes `- élément` produisent de vraies listes à puces.
- [ ] Les liens Markdown sont cliquables.
- [ ] Les liens externes utilisent `noopener noreferrer`.
- [ ] Le gras, l'italique, les citations et les tableaux sont correctement stylés.
- [ ] Les tableaux et blocs de code ne débordent pas sur mobile.
- [ ] Un mauvais slug affiche la page 404.
- [ ] Un article archivé n'est plus accessible.
- [ ] Les métadonnées SEO correspondent à l'article.
- [ ] Aucun contenu n'est injecté comme HTML non nettoyé.

### Responsive et qualité

- [ ] Les cartes s'adaptent aux écrans mobile, tablette et desktop.
- [ ] Les images possèdent un texte alternatif.
- [ ] Les états de chargement évitent les décalages visuels.
- [ ] Les erreurs réseau proposent de réessayer.
- [ ] La navigation clavier reste utilisable.

---

## 13. Résumé rapide

### Trois derniers articles

```http
GET /api/blog/articles?page=1&limit=3
```

### Tous les articles avec pagination et recherche

```http
GET /api/blog/articles?page=1&limit=12&q=transport
```

### Détail par slug

```http
GET /api/blog/articles/:slug
```

Ces trois usages suffisent pour intégrer l'intégralité du blog public dans le site vitrine.
