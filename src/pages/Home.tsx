import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { blogPosts } from '../data/blog';

const POPULAR_PARTS = [
  { slug: 'body-parts', label: 'Bumper Cover', icon: '🛡️' },
  { slug: 'electrical-lighting', label: 'Headlights', icon: '💡' },
  { slug: 'body-parts', label: 'Mirrors', icon: '🪞' },
  { slug: 'body-parts', label: 'Fenders', icon: '🚙' },
  { slug: 'electrical-lighting', label: 'Tail Lights', icon: '🔴' },
  { slug: 'body-parts', label: 'Grille Assemblies', icon: '🔲' },
  { slug: 'suspension-steering', label: 'Shock & Strut', icon: '🪛' },
  { slug: 'brake-system', label: 'Brake Disc & Pad Kits', icon: '🛞' },
  { slug: 'cooling-system', label: 'Radiators', icon: '🧊' },
  { slug: 'engine-parts', label: 'Mass Air Flow Sensor', icon: '⚙️' },
  { slug: 'hvac-climate', label: 'A/C Condenser', icon: '❄️' },
  { slug: 'filters-consumables', label: 'Oil Filters', icon: '🛢️' },
];

const SECONDARY_CHIPS = ['Control Arms', 'Catalytic Converter', 'Wheel Hubs', 'Window Regulator', 'Tailgate Handle', 'OBD II Scanner', 'Maintenance'];

const MAKES = ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'Hyundai', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Mazda', 'Kia', 'Subaru', 'Jeep', 'Dodge', 'Ram', 'GMC'];
const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i);

const BRAND_TAGS = ['REPLACEMENT', 'A-PREMIUM', 'KOOL VUE', 'TRUEDRIVE', 'SURESTOP', 'DRIVEMOTIVE', 'AC DELCO', 'EVAN FISCHER'];

const SAMPLE: Record<string, { brand: string; price: number; old?: number; rating: number; reviews: number; badge?: 'sale' | 'new' | 'free' }> = {
  'ceramic-brake-pads-set':   { brand: 'SURESTOP',     price: 32.99, old: 78.5,   rating: 4.7, reviews: 2104, badge: 'sale' },
  'aluminum-radiator-truck':  { brand: 'REPLACEMENT',  price: 134.99, old: 423.64, rating: 4.6, reviews: 108, badge: 'sale' },
  'led-headlight-h4-h7':      { brand: 'DRIVEMOTIVE',  price: 38.99,                rating: 4.8, reviews: 873, badge: 'free' },
  'oil-filter-spin-on':       { brand: 'A-PREMIUM',    price: 6.99,                 rating: 4.9, reviews: 5760, badge: 'free' },
  'shock-absorber-twin-tube': { brand: 'TRUEDRIVE',    price: 49.99, old: 119.0,    rating: 4.5, reviews: 647, badge: 'sale' },
  'ac-compressor-12v-24v':    { brand: 'KOOL VUE',     price: 71.99, old: 199.93,   rating: 4.6, reviews: 148, badge: 'sale' },
  'control-arm-assembly':     { brand: 'REPLACEMENT',  price: 79.99, old: 277.52,   rating: 4.7, reviews: 5760, badge: 'sale' },
  'parking-ac-12v-24v':       { brand: 'AC DELCO',     price: 749.0,                rating: 4.8, reviews: 134, badge: 'new' },
};

function priceFor(slug: string) { return SAMPLE[slug] || { brand: BRAND_TAGS[0], price: 49.99, rating: 4.6, reviews: 100 }; }

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

function ProductCard({ slug, name }: { slug: string; name: string }) {
  const m = priceFor(slug);
  return (
    <Link to={`/products/${slug}`} className="card group">
      <div className="relative">
        <img src={`/images/product-${slug}.svg`} alt={name} className="card-img" loading="lazy" />
        {m.badge === 'sale' && <span className="absolute left-3 top-3 pill-sale">Sale</span>}
        {m.badge === 'new' && <span className="absolute left-3 top-3 pill-new">New</span>}
        {m.badge === 'free' && <span className="absolute left-3 top-3 pill-free">Free Shipping</span>}
      </div>
      <div className="card-body">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">{m.brand}®</p>
        <h3 className="font-display text-[13px] font-semibold text-ink-900 line-clamp-2 group-hover:text-brand">{name}</h3>
        <div className="flex items-center gap-1.5">
          <Stars value={m.rating} />
          <span className="text-[11px] text-ink-500">({m.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="price">${m.price.toFixed(2)}</span>
          {m.old && <span className="price-strike">${m.old.toFixed(2)}</span>}
        </div>
        <button className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white transition group-hover:bg-accent-dark">Add to Cart</button>
      </div>
    </Link>
  );
}

export default function Home() {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'VETHY Auto Parts', alternateName: 'Qingdao VETHY Industrial Co., Ltd.', url: 'https://www.vethy.com.cn', logo: 'https://www.vethy.com.cn/logo.png', sameAs: ['https://www.cooldrivepro.com'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', url: 'https://www.vethy.com.cn', name: 'VETHY Auto Parts', potentialAction: { '@type': 'SearchAction', target: 'https://www.vethy.com.cn/products?q={query}', 'query-input': 'required name=query' } },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Auto parts categories', itemListElement: categories.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.vethy.com.cn/categories/${c.slug}`, name: c.name })) },
  ];

  return (
    <>
      <SEO title="Auto Parts Online — Aftermarket Car & Truck Parts | VETHY" description="Shop millions of high-quality auto parts at huge discounts. Free shipping over $50, guaranteed to fit, hassle-free 60-day returns. Brake pads, headlights, mirrors, fenders, radiators and more." path="/" keywords={['auto parts', 'aftermarket car parts', 'wholesale auto parts', 'OEM replacement parts', 'truck parts', 'brake pads online']} jsonLd={jsonLd} />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-brand via-brand-mid to-brand-dark text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden />
        <div className="container-page relative grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="animate-fade-up">
            <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-light ring-1 ring-accent/40">Spring Sale · Up to 70% Off</span>
            <h1 className="mt-5 text-display-xl text-balance text-white">
              The Right Part. <span className="text-accent-light">Guaranteed to Fit.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
              Millions of OE-quality auto parts for every make and model — backed by a 60-day return policy and free shipping over $50.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/categories" className="btn-accent">Shop catalog</Link>
              <Link to="/contact" className="btn bg-white text-brand hover:bg-ink-100">Wholesale quote</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-white/80">
              <span>✓ ECE R90 brake pads</span>
              <span>✓ IATF 16949 certified</span>
              <span>✓ Ships from CA, TX, NY warehouses</span>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="rounded-xl bg-white p-6 text-ink-900 shadow-card-hover sm:p-7">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent text-lg">🚗</span>
                <h2 className="font-display text-[18px] font-bold">Find parts for your vehicle</h2>
              </div>
              <p className="mt-2 text-[12px] text-ink-500">Year · Make · Model — we'll match the right OE references.</p>
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

      {/* Promo banners (3-up) */}
      <section className="bg-white py-8">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            ['🚀 PERFORMANCE', 'Shop JC Whitney Performance', 'High-performance parts & accessories', 'bg-ink-900'],
            ['🇪🇺 EURO', 'Shop CarParts Euro', 'OE-grade for European platforms', 'bg-brand'],
            ['🛠️ DIY', 'Auto Repair 101', 'Free guides & how-to videos', 'bg-accent'],
          ].map(([eb, t, s, bg]) => (
            <Link key={t} to="/categories" className={`relative flex h-32 flex-col justify-center overflow-hidden rounded-lg ${bg} p-6 text-white transition hover:opacity-95`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">{eb}</p>
              <p className="mt-1 font-display text-[18px] font-bold">{t}</p>
              <p className="text-[12px] text-white/85">{s}</p>
              <span className="mt-2 inline-flex items-center text-[12px] font-bold underline">Shop now →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Parts */}
      <section className="bg-white pb-10">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-5">
            <h2 className="font-display text-[20px] font-bold uppercase tracking-wide text-ink-900">Popular Parts</h2>
            <Link to="/categories" className="btn-link">View all →</Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:gap-4">
            {POPULAR_PARTS.map((p) => (
              <Link key={p.label} to={`/categories/${p.slug}`} className="group flex w-[140px] flex-none flex-col items-center rounded-lg border border-ink-200 bg-white p-4 text-center transition hover:border-brand hover:shadow-card sm:w-[160px]">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-3xl transition group-hover:bg-brand group-hover:text-white">{p.icon}</span>
                <span className="mt-3 text-[12px] font-bold uppercase tracking-tight text-ink-900 group-hover:text-brand">{p.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {SECONDARY_CHIPS.map((c) => (
              <Link key={c} to="/categories" className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700 hover:border-brand hover:text-brand">{c}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products row 1 */}
      <section className="bg-ink-050 py-12">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-6">
            <div>
              <p className="eyebrow mb-1.5">Featured Deals</p>
              <h2 className="font-display text-[22px] font-bold text-ink-900">Top picks for your garage</h2>
            </div>
            <Link to="/products" className="btn-link">View all products →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.slug} slug={p.slug} name={p.name} />)}
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="bg-white py-10">
        <div className="container-page">
          <p className="eyebrow text-center">Top Brands We Carry</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {BRAND_TAGS.map((b) => (
              <div key={b} className="flex h-14 items-center justify-center rounded-md border border-ink-200 bg-white px-3 text-center text-[12px] font-bold uppercase tracking-wide text-ink-700 hover:border-brand hover:text-brand">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products row 2 */}
      <section className="bg-ink-050 py-12">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-6">
            <div>
              <p className="eyebrow mb-1.5">More Best Sellers</p>
              <h2 className="font-display text-[22px] font-bold text-ink-900">Customers also bought</h2>
            </div>
            <Link to="/products" className="btn-link">Shop all →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(4, 8).map((p) => <ProductCard key={p.slug} slug={p.slug} name={p.name} />)}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-white py-14">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="eyebrow mb-1.5">Shop by Category</p>
              <h2 className="font-display text-[22px] font-bold text-ink-900">10 categories · 60+ subcategories</h2>
            </div>
            <Link to="/categories" className="btn-link">All categories →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.slug} to={`/categories/${c.slug}`} className="card group p-0">
                <img src={`/images/category-${c.slug}.svg`} alt={c.name} className="aspect-[4/3] w-full bg-ink-050 object-cover" loading="lazy" />
                <div className="px-4 py-4">
                  <h3 className="font-display text-[14px] font-bold text-ink-900 group-hover:text-brand">{c.name}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-500">{c.subcategories.length} subcategories →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust banners */}
      <section className="bg-brand text-white">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3 sm:py-12">
          {[
            ['🚚', 'Free shipping over $50', 'Same-day dispatch on stocked SKUs.'],
            ['🛡️', 'Guaranteed to fit', 'OE references verified for every part.'],
            ['↩️', '60-day hassle-free returns', 'Changed your mind? Send it back.'],
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

      {/* Garage Blog */}
      <section className="bg-white py-14">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="eyebrow mb-1.5">In the Garage Blog</p>
              <h2 className="font-display text-[22px] font-bold text-ink-900">DIY guides & sourcing insights</h2>
            </div>
            <Link to="/blog" className="btn-link">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card group">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="card-img" loading="lazy" />
                <div className="card-body">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">{p.category} · {p.date}</p>
                  <h3 className="font-display text-[16px] font-bold leading-snug text-ink-900 group-hover:text-brand">{p.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-600 line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* App download CTA */}
      <section className="bg-ink-900 text-white">
        <div className="container-page grid gap-6 py-12 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="eyebrow text-accent-light">Mobile App</p>
            <h2 className="mt-2 font-display text-[24px] font-bold sm:text-[28px]">Get the VETHY app — order parts on the go.</h2>
            <p className="mt-2 text-[14px] text-white/75">Track shipments, scan VINs, and access wholesale pricing from your phone.</p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black px-4 py-3 text-[12px] font-semibold">🍎 App Store</a>
            <a href="#" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black px-4 py-3 text-[12px] font-semibold">▶ Google Play</a>
          </div>
        </div>
      </section>
    </>
  );
}
