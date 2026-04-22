# VETHY Auto Parts

Wholesale auto parts website for VETHY (Qingdao VETHY Industrial Co., Ltd.) — built for SEO + GEO organic acquisition.

- Live: https://www.vethy.com.cn
- Stack: React 18 + TypeScript + Vite + Tailwind + i18next (7 languages: EN/ES/RU/AR/PT/FR/DE)
- Hosting: Cloudflare Pages
- Sister brand: [CoolDrivePro](https://www.cooldrivepro.com) (parking air conditioner)

## Local development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build           # vite build + static SEO pages + sitemap
npm run deploy          # build + wrangler pages deploy
```

## SEO architecture

- 10 product categories × 6 subcategories = 60+ category landing pages
- 8+ featured product pages with `Product` JSON-LD
- 12 country-specific market pages with shipping notes & local-language keywords
- 5+ long-form blog posts with `BlogPosting` JSON-LD
- 7 UI languages with hreflang
- `robots.txt` allows GPTBot / ChatGPT-User / Google-Extended / ClaudeBot / PerplexityBot / CCBot
- `llms.txt` for AI Overviews / Perplexity citation readiness
- Static prerendered HTML per route (full meta + H1 + body content) generated at build
- `sitemap.xml` auto-generated for all routes

## Editing keywords / categories

- Categories & subcategories: `src/data/categories.ts`
- Featured products: `src/data/products.ts`
- Markets: `src/data/markets.ts`
- Blog posts: `src/data/blog.ts`

Each entry carries a `keywords` array. Adding new entries automatically picks up sitemap, static SEO pages and JSON-LD.
