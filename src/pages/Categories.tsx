import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';

export default function Categories() {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://www.vethy.com.cn/categories' },
    ]},
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Auto Parts Categories', url: 'https://www.vethy.com.cn/categories' },
  ];

  return (
    <>
      <SEO
        title="Auto Parts Categories | VETHY Wholesale Catalog — 10 Categories, 60+ Subcategories"
        description="Browse the full VETHY auto parts catalog: engine, brake, cooling, suspension & steering, electrical & lighting, body parts, filters, transmission, truck & commercial, HVAC. Wholesale export from China."
        path="/categories"
        keywords={['auto parts catalog', 'wholesale auto parts categories', 'OEM aftermarket parts categories']}
        jsonLd={jsonLd}
      />

      <section className="bg-brand text-white">
        <div className="container-page py-10 sm:py-12">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Categories</span></nav>
          <h1 className="mt-3 text-display-lg text-balance">Shop by Category</h1>
          <p className="mt-2 max-w-2xl text-[14px] text-white/85">Ten categories, sixty subcategories, eight thousand SKUs — built for distributors, fleets and workshops worldwide.</p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-page space-y-10">
          {categories.map((c) => (
            <div key={c.slug} className="rounded-lg border border-ink-200 bg-white">
              <div className="grid gap-8 p-6 lg:grid-cols-[300px_1fr] lg:p-8">
                <div>
                  <Link to={`/categories/${c.slug}`} className="group inline-block">
                    <img src={`/images/category-${c.slug}.svg`} alt={c.name} className="mb-4 aspect-[4/3] w-full rounded-md bg-ink-050 object-cover" loading="lazy" />
                    <p className="eyebrow mb-1.5">{c.subcategories.length} subcategories</p>
                    <h2 className="font-display text-[20px] font-bold text-ink-900 group-hover:text-brand">{c.name}</h2>
                  </Link>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-600 line-clamp-4">{c.intro}</p>
                  <Link to={`/categories/${c.slug}`} className="btn-link mt-3">View all {c.name} →</Link>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {c.subcategories.map((s) => (
                    <Link key={s.slug} to={`/categories/${c.slug}/${s.slug}`} className="group rounded-md border border-ink-200 bg-white p-3 transition hover:border-brand hover:bg-brand-soft">
                      <p className="font-display text-[13px] font-semibold text-ink-900 group-hover:text-brand">{s.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-500 line-clamp-2">{s.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-050 py-12 text-center">
        <div className="container-page">
          <h2 className="text-display-sm text-ink-900">Can't find what you need?</h2>
          <p className="mt-3 text-[14px] text-ink-600">Send your OE reference list or vehicle fitment — we source beyond the catalog.</p>
          <Link to="/contact" className="btn-accent mt-5">Send RFQ</Link>
        </div>
      </section>
    </>
  );
}
