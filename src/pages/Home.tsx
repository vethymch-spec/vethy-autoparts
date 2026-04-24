import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { markets } from '../data/markets';
import { blogPosts } from '../data/blog';

const POPULAR_PARTS = [
  { slug: 'body-parts', label: 'Bumper Cover', icon: '🛡️' },
  { slug: 'electrical-lighting', label: 'Headlights', icon: '💡' },
  { slug: 'body-parts', label: 'Mirrors', icon: '🪞' },
  { slug: 'body-parts', label: 'Fenders', icon: '🚙' },
  { slug: 'electrical-lighting', label: 'Tail Lights', icon: '🔴' },
  { slug: 'body-parts', label: 'Grille', icon: '🔲' },
  { slug: 'suspension-steering', label: 'Shocks & Struts', icon: '🪛' },
  { slug: 'brake-system', label: 'Brake Discs & Pads', icon: '🛞' },
  { slug: 'cooling-system', label: 'Radiators', icon: '🧊' },
  { slug: 'engine-parts', label: 'Engine Parts', icon: '⚙️' },
  { slug: 'hvac-climate', label: 'A/C Compressors', icon: '❄️' },
  { slug: 'filters-consumables', label: 'Oil Filters', icon: '🛢️' },
];

const MAKES = ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'Hyundai', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Mazda', 'Kia', 'Subaru', 'Jeep', 'Dodge', 'Ram', 'GMC'];
const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i);

const SAMPLE_PRICES: Record<string, { price: number; old?: number; rating: number; reviews: number; badge?: 'sale' | 'new' | 'free' }> = {
  'ceramic-brake-pads-set': { price: 32.99, old: 78.5, rating: 4.7, reviews: 2104, badge: 'sale' },
  'aluminum-radiator-truck': { price: 134.99, old: 423.64, rating: 4.6, reviews: 1083, badge: 'sale' },
  'led-headlight-h4-h7': { price: 38.99, rating: 4.8, reviews: 873, badge: 'new' },
  'oil-filter-spin-on': { price: 6.99, rating: 4.9, reviews: 5760, badge: 'free' },
  'shock-absorber-twin-tube': { price: 49.99, old: 119.0, rating: 4.5, reviews: 647, badge: 'sale' },
  'ac-compressor-12v-24v': { price: 189.99, rating: 4.6, reviews: 261, badge: 'new' },
  'control-arm-assembly': { price: 79.99, old: 277.52, rating: 4.7, reviews: 5760, badge: 'sale' },
  'parking-ac-12v-24v': { price: 749.0, rating: 4.8, reviews: 134, badge: 'new' },
};

function priceFor(slug: string) {
  return SAMPLE_PRICES[slug] || { price: 49.99, rating: 4.6, reviews: 100 };
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'text-amber-500' : 'text-ink-300'}>★</span>
      ))}
    </span>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', alternateName: 'VETHY Auto Parts', url: 'https://www.vethy.com.cn', logo: 'https://www.vethy.com.cn/logo.png', sameAs: ['https://www.cooldrivepro.com'], address: { '@type': 'PostalAddress', addressLocality: 'Qingdao', addressRegion: 'Shandong', addressCountry: 'CN' }, contactPoint: [{ '@type': 'ContactPoint', email: 'sales@vethy.com.cn', contactType: 'sales', areaServed: 'Worldwide', availableLanguage: ['English','Spanish','Russian','Arabic','Portuguese','French','German','Chinese'] }] },
    { '@context': 'https://schema.org', '@type': 'WebSite', url: 'https://www.vethy.com.cn', name: 'VETHY Auto Parts', potentialAction: { '@type': 'SearchAction', target: 'https://www.vethy.com.cn/products?q={query}', 'query-input': 'required name=query' } },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Auto parts categories', itemListElement: categories.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.vethy.com.cn/categories/${c.slug}`, name: c.name })) },
  ];

  return (
    <>
      <SEO
        title="VETHY Auto Parts | Wholesale Auto Spare Parts Manufacturer & Exporter from China"
        description="Shop 8,000+ wholesale auto parts: brake pads, headlights, radiators, mirrors, suspension, A/C compressors, fenders and more. OE-quality, container shipping from Qingdao to 60+ countries."
        path="/"
        keywords={['auto parts wholesale China', 'replacement auto parts', 'OEM aftermarket parts supplier', 'wholesale brake pads', 'wholesale headlights', 'truck parts wholesale']}
        jsonLd={jsonLd}
      />

      {/* HERO with vehicle selector */}
      <section className="relative bg-gradient-to-br from-brand via-brand-mid to-brand-dark text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden />
        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="animate-fade-up">
            <span className="pill-new bg-white/15 text-white">Trusted by 60+ countries</span>
            <h1 className="mt-5 text-display-xl text-balance text-white">
              The right part. <span className="text-accent-light">Guaranteed to fit.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
              8,000+ OE-quality auto parts for cars, trucks and commercial vehicles — direct from a Qingdao factory, container-shipped worldwide.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/categories" className="btn-accent">Shop catalog</Link>
              <Link to="/contact" className="btn bg-white text-brand hover:bg-ink-100">Get a quote</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-white/75">
              <span>✓ ECE R90 brake pads</span>
              <span>✓ IATF 16949 certified</span>
              <span>✓ FCL · LCL · rail freight</span>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="rounded-xl bg-white p-6 text-ink-900 shadow-card-hover sm:p-7">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent text-lg">🚗</span>
                <h2 className="font-display text-[18px] font-bold">Find parts for your vehicle</h2>
              </div>
              <p className="mt-2 text-[12px] text-ink-500">Add your Year / Make / Model — we'll match the right OE references.</p>
              <div className="mt-5 grid gap-3">
                <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-md border border-ink-300 px-3 py-2.5 text-[14px] outline-none focus:border-brand">
                  <option value="">Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={make} onChange={(e) => setMake(e.target.value)} className="rounded-md border border-ink-300 px-3 py-2.5 text-[14px] outline-none focus:border-brand">
                  <option value="">Make</option>
                  {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model (e.g. Corolla, F-150)" className="rounded-md border border-ink-300 px-3 py-2.5 text-[14px] outline-none focus:border-brand" />
                <Link to="/contact" className="btn-accent w-full">Find my parts</Link>
              </div>
              <p className="mt-3 text-center text-[11px] text-ink-500">Or <Link to="/categories" className="text-brand font-semibold hover:underline">browse by category →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Parts strip */}
      <section className="bg-white py-12 sm:py-14">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-6">
            <div>
              <p className="eyebrow mb-1.5">Popular Parts</p>
              <h2 className="text-display-md text-ink-900">Shop by part type</h2>
            </div>
            <Link to="/categories" className="btn-link">View all →</Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:gap-4">
            {POPULAR_PARTS.map((p) => (
              <Link key={p.label} to={`/categories/${p.slug}`} className="group flex w-[140px] flex-none flex-col items-center rounded-lg border border-ink-200 bg-white p-4 text-center transition hover:border-brand hover:shadow-card sm:w-[160px]">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-3xl transition group-hover:bg-brand group-hover:text-white">{p.icon}</span>
                <span className="mt-3 text-[13px] font-semibold text-ink-900 group-hover:text-brand">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-ink-050 py-14 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="eyebrow mb-1.5">Featured Deals</p>
              <h2 className="text-display-md text-ink-900">Best-selling SKUs this week</h2>
            </div>
            <Link to="/products" className="btn-link">View all products →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => {
              const meta = priceFor(p.slug);
              return (
                <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
                  <div className="relative">
                    <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img" loading="lazy" />
                    {meta.badge === 'sale' && <span className="absolute left-3 top-3 pill-sale">Sale</span>}
                    {meta.badge === 'new' && <span className="absolute left-3 top-3 pill-new">New</span>}
                    {meta.badge === 'free' && <span className="absolute left-3 top-3 pill-free">Free Ship</span>}
                  </div>
                  <div className="card-body">
                    <p className="eyebrow-muted">{p.category.replace(/-/g, ' ')}</p>
                    <h3 className="font-display text-[14px] font-semibold text-ink-900 line-clamp-2 group-hover:text-brand">{p.name}</h3>
                    <div className="flex items-center gap-1.5 pt-1">
                      <Stars value={meta.rating} />
                      <span className="text-[11px] text-ink-500">({meta.reviews.toLocaleString()})</span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="price">${meta.price.toFixed(2)}</span>
                      {meta.old && <span className="price-strike">${meta.old.toFixed(2)}</span>}
                    </div>
                    <span className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-2 text-[13px] font-semibold text-white transition group-hover:bg-accent-dark">Get quote</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="bg-brand text-white">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3 sm:py-12">
          {[
            ['🚚', 'Free quote within 24h', 'Container or LCL — we respond fast.'],
            ['🛡️', 'Guaranteed to fit', 'OE references verified for every SKU.'],
            ['💼', 'Mixed-pallet wholesale', 'MOQ from 20 pcs on consolidated orders.'],
          ].map(([ic, t, s]) => (
            <div key={t} className="flex items-start gap-4">
              <span className="text-3xl">{ic}</span>
              <div>
                <p className="font-display text-[15px] font-bold">{t}</p>
                <p className="mt-1 text-[13px] text-white/80">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="eyebrow mb-1.5">Shop by Category</p>
              <h2 className="text-display-md text-ink-900">10 categories · 60+ subcategories</h2>
            </div>
            <Link to="/categories" className="btn-link">All categories →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.slug} to={`/categories/${c.slug}`} className="card p-0">
                <img src={`/images/category-${c.slug}.svg`} alt={c.name} className="aspect-[4/3] w-full object-cover bg-ink-050" loading="lazy" />
                <div className="px-4 py-4">
                  <h3 className="font-display text-[14px] font-bold text-ink-900 group-hover:text-brand">{c.name}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-500">{c.subcategories.length} subcategories →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-ink-050 py-14 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-2">Global Reach</p>
            <h2 className="text-display-md text-ink-900">Shipping to 60+ countries</h2>
            <p className="mt-3 text-[14px] text-ink-600">From Qingdao port to Los Angeles, Hamburg, Santos, Durban, Jebel Ali and beyond.</p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="rounded-md border border-ink-200 bg-white p-4 transition hover:border-brand hover:shadow-card">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{m.region}</p>
                <p className="mt-1 font-display text-[14px] font-bold text-ink-900">{m.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="eyebrow mb-1.5">Garage Blog</p>
              <h2 className="text-display-md text-ink-900">Sourcing guides & industry insights</h2>
            </div>
            <Link to="/blog" className="btn-link">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card group">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="card-img" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow-muted">{p.category} · {p.date}</p>
                  <h3 className="font-display text-[16px] font-bold leading-snug text-ink-900 group-hover:text-brand">{p.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-600 line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-900 text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-display-md text-balance">Need a custom container quote?</h2>
          <p className="mt-3 text-[15px] text-white/75">Send your wishlist — we respond with consolidated pricing within one working day.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-accent">Request a quote</Link>
            <Link to="/wholesale" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15">Wholesale program</Link>
          </div>
        </div>
      </section>
    </>
  );
}
