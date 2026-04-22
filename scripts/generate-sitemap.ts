import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, allSubcategorySlugs } from '../src/data/categories';
import { products } from '../src/data/products';
import { markets } from '../src/data/markets';
import { blogPosts } from '../src/data/blog';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.vethy.com.cn';
const today = new Date().toISOString().slice(0, 10);

interface Url { loc: string; priority: number; changefreq: string; lastmod?: string }
const urls: Url[] = [
  { loc: '/', priority: 1.0, changefreq: 'weekly', lastmod: today },
  { loc: '/categories', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { loc: '/products', priority: 0.9, changefreq: 'weekly', lastmod: today },
  { loc: '/markets', priority: 0.9, changefreq: 'monthly', lastmod: today },
  { loc: '/wholesale', priority: 0.8, changefreq: 'monthly', lastmod: today },
  { loc: '/blog', priority: 0.8, changefreq: 'weekly', lastmod: today },
  { loc: '/about', priority: 0.6, changefreq: 'yearly', lastmod: today },
  { loc: '/contact', priority: 0.6, changefreq: 'yearly', lastmod: today },
];

for (const c of categories) urls.push({ loc: `/categories/${c.slug}`, priority: 0.85, changefreq: 'weekly', lastmod: today });
for (const { category, subcategory } of allSubcategorySlugs) urls.push({ loc: `/categories/${category}/${subcategory}`, priority: 0.8, changefreq: 'weekly', lastmod: today });
for (const p of products) urls.push({ loc: `/products/${p.slug}`, priority: 0.8, changefreq: 'monthly', lastmod: today });
for (const m of markets) urls.push({ loc: `/markets/${m.slug}`, priority: 0.75, changefreq: 'monthly', lastmod: today });
for (const post of blogPosts) urls.push({ loc: `/blog/${post.slug}`, priority: 0.7, changefreq: 'monthly', lastmod: post.date });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const dist = resolve(__dirname, '../dist');
await writeFile(resolve(dist, 'sitemap.xml'), xml, 'utf-8');
console.log(`Sitemap generated with ${urls.length} URLs.`);
