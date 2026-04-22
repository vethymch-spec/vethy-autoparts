// Generates static prerendered HTML for every SEO-critical route.
// The HTML carries full <title>, meta, H1, body copy and JSON-LD inside #root.
// React then mounts on top, replacing the static content with the SPA on the client.

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, allSubcategorySlugs } from '../src/data/categories';
import { products } from '../src/data/products';
import { markets } from '../src/data/markets';
import { blogPosts } from '../src/data/blog';
import { supportedLngs } from '../src/i18n';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distRoot = resolve(__dirname, '../dist');
const SITE = 'https://www.vethy.com.cn';

interface PageInput {
  path: string; // e.g. /categories/brake-system
  title: string;
  description: string;
  keywords?: string[];
  h1: string;
  body: string; // raw HTML (escaped where needed)
  jsonLd?: object | object[];
}

const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const baseTemplate = await readFile(resolve(distRoot, 'index.html'), 'utf-8');

async function emitPage(p: PageInput) {
  const altLinks = supportedLngs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="${SITE}${p.path === '/' ? '/' : p.path}" />`
    )
    .join('\n    ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${SITE}${p.path}" />`;
  const keywordsTag = p.keywords && p.keywords.length
    ? `<meta name="keywords" content="${escape(p.keywords.join(', '))}" />`
    : '';
  const jsonLdTag = p.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(Array.isArray(p.jsonLd) ? p.jsonLd : [p.jsonLd])}</script>`
    : '';

  // Replace head and body content
  let html = baseTemplate;
  // Title & description
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(p.title)}</title>`);
  html = html.replace(
    /<meta name="description"[^>]*\/>/,
    `<meta name="description" content="${escape(p.description)}" />`
  );
  html = html.replace(
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${SITE}${p.path}" />`
  );

  // Inject extra head tags
  const extra = `
    ${keywordsTag}
    <meta property="og:title" content="${escape(p.title)}" />
    <meta property="og:description" content="${escape(p.description)}" />
    <meta property="og:url" content="${SITE}${p.path}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="VETHY Auto Parts" />
    <meta name="twitter:card" content="summary_large_image" />
    ${altLinks}
    ${xDefault}
    ${jsonLdTag}
  `;
  html = html.replace('</head>', `${extra}\n  </head>`);

  // Inject visible SEO body (replaced by React after hydration)
  const seoBody = `
    <div style="max-width:1100px;margin:0 auto;padding:48px 24px;font-family:system-ui,-apple-system,sans-serif;color:#111827;line-height:1.6;">
      <header style="margin-bottom:32px;">
        <a href="/" style="font-weight:800;letter-spacing:0.1em;color:#C8102E;text-decoration:none;">VETHY</a>
        <span style="color:#6B7280;margin-left:8px;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">Auto Parts</span>
      </header>
      <h1 style="font-size:36px;font-weight:800;color:#0B1220;margin:0 0 16px;">${escape(p.h1)}</h1>
      ${p.body}
      <nav style="margin-top:48px;font-size:14px;color:#6B7280;">
        <a href="/" style="color:#C8102E;">Home</a> ·
        <a href="/categories" style="color:#C8102E;">Categories</a> ·
        <a href="/products" style="color:#C8102E;">Products</a> ·
        <a href="/markets" style="color:#C8102E;">Markets</a> ·
        <a href="/wholesale" style="color:#C8102E;">Wholesale</a> ·
        <a href="/blog" style="color:#C8102E;">Blog</a> ·
        <a href="/about" style="color:#C8102E;">About</a> ·
        <a href="/contact" style="color:#C8102E;">Contact</a>
      </nav>
    </div>
  `;
  html = html.replace('<div id="root"></div>', `<div id="root">${seoBody}</div>`);

  const filePath = p.path === '/' ? resolve(distRoot, 'index.html') : resolve(distRoot, p.path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html, 'utf-8');
  console.log('  wrote', p.path);
}

const pages: PageInput[] = [];

// Home
pages.push({
  path: '/',
  title: 'VETHY Auto Parts | Wholesale Auto Spare Parts Manufacturer & Exporter from China',
  description:
    'VETHY is a leading Chinese auto parts manufacturer and wholesale exporter. Engine, brake, cooling, suspension, electrical, body parts and consumables for cars, trucks and commercial vehicles. Global FCL/LCL shipping from Qingdao.',
  keywords: ['auto parts wholesale China', 'auto spare parts manufacturer', 'aftermarket auto parts exporter', 'OEM auto parts supplier', 'truck parts wholesale'],
  h1: 'Wholesale Auto Parts. Built for Global Distributors.',
  body: `
    <p style="font-size:18px;color:#1F2937;">VETHY is a Chinese auto parts manufacturer and exporter serving distributors, workshops and fleets in 60+ countries. OE-quality engine, brake, cooling, suspension, electrical and HVAC components — shipped FCL/LCL from Qingdao.</p>
    <h2 style="margin-top:32px;font-size:24px;font-weight:700;">Auto Parts Categories</h2>
    <ul style="margin-top:12px;columns:2;list-style:none;padding:0;">
      ${categories.map((c) => `<li style="margin:6px 0;"><a href="/categories/${c.slug}" style="color:#C8102E;">${escape(c.name)}</a> — ${escape(c.intro.slice(0, 110))}…</li>`).join('')}
    </ul>
    <h2 style="margin-top:32px;font-size:24px;font-weight:700;">Markets We Serve</h2>
    <p>${markets.map((m) => `<a href="/markets/${m.slug}" style="color:#C8102E;margin-right:12px;">${escape(m.name)}</a>`).join(' · ')}</p>
  `,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Qingdao VETHY Industrial Co., Ltd.',
      alternateName: 'VETHY Auto Parts',
      url: SITE,
      logo: `${SITE}/logo.png`,
      sameAs: ['https://www.cooldrivepro.com'],
      address: { '@type': 'PostalAddress', addressLocality: 'Qingdao', addressRegion: 'Shandong', addressCountry: 'CN' },
      contactPoint: [{ '@type': 'ContactPoint', email: 'sales@vethy.com.cn', contactType: 'sales', areaServed: 'Worldwide' }],
    },
    { '@context': 'https://schema.org', '@type': 'WebSite', url: SITE, name: 'VETHY Auto Parts', inLanguage: ['en','es','ru','ar','pt','fr','de'] },
  ],
});

// Categories index
pages.push({
  path: '/categories',
  title: 'Auto Parts Categories | VETHY Wholesale Catalog',
  description: 'Browse the full VETHY wholesale auto parts catalog: engine, brake, cooling, suspension, electrical, body parts, filters and more.',
  keywords: ['auto parts catalog', 'wholesale auto parts categories', 'aftermarket parts catalog'],
  h1: 'Auto Parts Categories',
  body: `<p>Full-line wholesale catalog across 10 product groups and 60+ subcategories.</p>
    <ul style="list-style:none;padding:0;margin-top:16px;">
      ${categories.map((c) => `<li style="margin:12px 0;"><a href="/categories/${c.slug}" style="color:#C8102E;font-weight:600;">${escape(c.name)}</a><br/><small style="color:#6B7280;">${escape(c.intro)}</small></li>`).join('')}
    </ul>`,
});

// Each category
for (const c of categories) {
  pages.push({
    path: `/categories/${c.slug}`,
    title: `${c.name} — Wholesale ${c.name} Manufacturer & Exporter | VETHY`,
    description: `${c.intro} VETHY is your one-stop wholesale source for ${c.name.toLowerCase()}, with ${c.subcategories.length} subcategories and 8000+ OE references.`,
    keywords: c.keywords,
    h1: c.hero,
    body: `<p style="font-size:18px;">${escape(c.intro)}</p>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Subcategories</h2>
      <ul>
        ${c.subcategories.map((s) => `<li style="margin:8px 0;"><a href="/categories/${c.slug}/${s.slug}" style="color:#C8102E;">${escape(s.name)}</a> — ${escape(s.intro)}</li>`).join('')}
      </ul>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Wholesale keywords we serve</h2>
      <p>${c.keywords.map((k) => `<span style="display:inline-block;background:#F3F4F6;padding:4px 10px;border-radius:99px;margin:3px;font-size:13px;">${escape(k)}</span>`).join('')}</p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${c.name} — Wholesale Catalog`, description: c.intro, url: `${SITE}/categories/${c.slug}` },
  });
}

// Each subcategory
for (const { category, subcategory } of allSubcategorySlugs) {
  const c = categories.find((x) => x.slug === category)!;
  const s = c.subcategories.find((x) => x.slug === subcategory)!;
  pages.push({
    path: `/categories/${c.slug}/${s.slug}`,
    title: `${s.name} — Wholesale ${c.name} Supplier | VETHY Auto Parts`,
    description: `${s.intro} Wholesale ${s.name.toLowerCase()} from VETHY, a Chinese ${c.name.toLowerCase()} manufacturer and exporter.`,
    keywords: [...s.keywords, ...c.keywords],
    h1: `${s.name} — Wholesale Supplier`,
    body: `<p style="font-size:18px;">${escape(s.intro)}</p>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Long-tail keywords this page targets</h2>
      <p>${s.keywords.map((k) => `<span style="display:inline-block;background:#F3F4F6;padding:4px 10px;border-radius:99px;margin:3px;font-size:13px;">${escape(k)}</span>`).join('')}</p>
      <p style="margin-top:16px;"><a href="/contact" style="color:#C8102E;font-weight:600;">Request a wholesale quote →</a></p>`,
  });
}

// Products index
pages.push({
  path: '/products',
  title: 'Featured Wholesale Auto Parts Products | VETHY',
  description: 'Featured wholesale auto parts: ceramic brake pads, aluminum truck radiators, LED headlight bulbs, oil filters, shock absorbers, AC compressors, control arms and parking AC.',
  keywords: ['wholesale auto parts products', 'featured auto spare parts', 'aftermarket parts catalog'],
  h1: 'Featured Wholesale Products',
  body: `<ul style="list-style:none;padding:0;">
    ${products.map((p) => `<li style="margin:12px 0;"><a href="/products/${p.slug}" style="color:#C8102E;font-weight:600;">${escape(p.name)}</a><br/><small style="color:#6B7280;">${escape(p.shortDescription)}</small></li>`).join('')}
  </ul>`,
});

// Each product
for (const p of products) {
  pages.push({
    path: `/products/${p.slug}`,
    title: `${p.name} | Wholesale Supplier — VETHY`,
    description: p.shortDescription,
    keywords: p.keywords,
    h1: p.name,
    body: `<p style="font-size:18px;">${escape(p.shortDescription)}</p>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Highlights</h2>
      <ul>${p.highlights.map((h) => `<li>${escape(h)}</li>`).join('')}</ul>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Vehicle applications</h2>
      <p>${p.applications.map(escape).join(', ')}</p>
      ${p.oeReferences ? `<h2 style="margin-top:24px;font-size:22px;font-weight:700;">OE cross-references</h2><p>${p.oeReferences.map((r) => `<code style="background:#0B1220;color:white;padding:2px 6px;border-radius:3px;margin-right:6px;font-size:12px;">${escape(r)}</code>`).join('')}</p>` : ''}
      <table style="margin-top:24px;border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;color:#6B7280;">MOQ</td><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;">${escape(p.moq)}</td></tr>
        <tr><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;color:#6B7280;">Lead time</td><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;">${escape(p.leadTime)}</td></tr>
        <tr><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;color:#6B7280;">Packaging</td><td style="padding:6px 12px;border-bottom:1px solid #E5E7EB;">${escape(p.packaging)}</td></tr>
        <tr><td style="padding:6px 12px;color:#6B7280;">Certifications</td><td style="padding:6px 12px;">${escape(p.certifications.join(', '))}</td></tr>
      </table>
      <p style="margin-top:24px;"><a href="/contact" style="color:#C8102E;font-weight:600;">Request a quote →</a></p>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.shortDescription,
      brand: { '@type': 'Brand', name: 'VETHY' },
      manufacturer: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.' },
      sku: p.slug,
      offers: { '@type': 'Offer', priceCurrency: 'USD', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'VETHY' } },
    },
  });
}

// Markets index + each
pages.push({
  path: '/markets',
  title: 'Markets We Serve | VETHY Wholesale Auto Parts Export',
  description: 'VETHY exports wholesale auto parts to 60+ countries — USA, Germany, Russia, Brazil, Mexico, UAE, South Africa, Kazakhstan, Chile, France, Spain and more.',
  keywords: ['auto parts export markets', 'wholesale auto parts countries', 'Chinese auto parts exporter'],
  h1: 'Global Markets',
  body: `<ul style="list-style:none;padding:0;">${markets.map((m) => `<li style="margin:10px 0;"><a href="/markets/${m.slug}" style="color:#C8102E;font-weight:600;">${escape(m.name)}</a> <small style="color:#6B7280;">(${escape(m.region)})</small><br/><small>${escape(m.intro.slice(0, 200))}…</small></li>`).join('')}</ul>`,
});

for (const m of markets) {
  pages.push({
    path: `/markets/${m.slug}`,
    title: `Wholesale Auto Parts for ${m.name} | VETHY Exporter`,
    description: m.intro,
    keywords: m.keywords,
    h1: `Wholesale Auto Parts for ${m.name}`,
    body: `<p style="font-size:18px;">${escape(m.intro)}</p>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Shipping & logistics</h2>
      <p>${escape(m.shipping)}</p>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Top-selling categories in ${escape(m.name)}</h2>
      <ul>${m.popularCategories.map((slug) => { const c = categories.find((x) => x.slug === slug); return c ? `<li><a href="/categories/${slug}" style="color:#C8102E;">${escape(c.name)}</a></li>` : ''; }).join('')}</ul>
      <h2 style="margin-top:24px;font-size:22px;font-weight:700;">Local search keywords</h2>
      <p>${m.keywords.map((k) => `<span style="display:inline-block;background:#F3F4F6;padding:4px 10px;border-radius:99px;margin:3px;font-size:13px;">${escape(k)}</span>`).join('')}</p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Wholesale auto parts export', areaServed: { '@type': 'Country', name: m.name }, provider: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', url: SITE }, description: m.intro },
  });
}

// Blog index + each post
pages.push({
  path: '/blog',
  title: 'Auto Parts Industry Blog | VETHY',
  description: 'In-depth guides on sourcing, importing and wholesaling auto parts from China.',
  keywords: ['auto parts blog', 'auto parts sourcing guide', 'auto parts industry insights'],
  h1: 'Industry Blog',
  body: `<ul style="list-style:none;padding:0;">${blogPosts.map((p) => `<li style="margin:12px 0;"><a href="/blog/${p.slug}" style="color:#C8102E;font-weight:600;">${escape(p.title)}</a><br/><small style="color:#6B7280;">${escape(p.excerpt)}</small></li>`).join('')}</ul>`,
});

for (const post of blogPosts) {
  pages.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} | VETHY Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    h1: post.title,
    body: `<p style="color:#6B7280;font-size:14px;">${escape(post.date)} · ${escape(post.category)}</p>
      <p style="font-size:18px;">${escape(post.excerpt)}</p>
      ${post.content.map((s) => `<h2 style="margin-top:32px;font-size:22px;font-weight:700;">${escape(s.heading)}</h2><p>${escape(s.body)}</p>`).join('')}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Organization', name: 'VETHY Auto Parts' },
      publisher: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.' },
      mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    },
  });
}

// Static pages
pages.push({
  path: '/about',
  title: 'About VETHY | Chinese Auto Parts Manufacturer & Exporter',
  description: 'VETHY (Qingdao VETHY Industrial Co., Ltd.) is a Chinese manufacturer and wholesale exporter of automotive parts and HVAC components.',
  keywords: ['about VETHY', 'Chinese auto parts manufacturer', 'auto parts exporter Qingdao'],
  h1: 'About VETHY',
  body: `<p>Qingdao VETHY Industrial Co., Ltd. is a manufacturer and global exporter of automotive parts and HVAC components, headquartered in Qingdao, Shandong, China. Sister brand: <a href="https://www.cooldrivepro.com" style="color:#C8102E;">CoolDrivePro</a>.</p>`,
});
pages.push({
  path: '/wholesale',
  title: 'Wholesale Program | VETHY Auto Parts Distributor Partnership',
  description: 'Become a VETHY wholesale partner. OEM/ODM, custom packaging, distributor pricing and exclusive territory programs available.',
  keywords: ['wholesale auto parts program', 'auto parts distributor partnership', 'OEM ODM auto parts'],
  h1: 'Wholesale Program',
  body: `<p>Tiered distributor pricing, OEM/ODM service, exclusive territory rights and bonded warehouse + 3PL nodes in LA, Hamburg and Dubai.</p>`,
});
pages.push({
  path: '/contact',
  title: 'Contact VETHY | Wholesale Auto Parts Inquiry',
  description: 'Send your wholesale auto parts inquiry, RFQ or SKU list to VETHY. sales@vethy.com.cn.',
  keywords: ['contact VETHY', 'wholesale auto parts RFQ', 'auto parts inquiry'],
  h1: 'Contact / RFQ',
  body: `<p>Email: <a href="mailto:sales@vethy.com.cn" style="color:#C8102E;">sales@vethy.com.cn</a><br/>Replies in one business day.<br/>Languages: English · Español · Русский · العربية · Português · Français · Deutsch · 中文</p>`,
});

console.log(`Generating ${pages.length} static SEO pages...`);
for (const p of pages) await emitPage(p);
console.log('Done.');
