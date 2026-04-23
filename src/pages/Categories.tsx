import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';

export default function Categories() {
  const { t } = useTranslation();

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://www.vethy.com.cn/categories' },
    ]},
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Auto Parts Categories', url: 'https://www.vethy.com.cn/categories',
      hasPart: categories.flatMap((c) => c.subcategories.map((s) => ({ '@type': 'ProductCollection', name: `${c.name} · ${s.name}`, url: `https://www.vethy.com.cn/categories/${c.slug}/${s.slug}` }))),
    },
  ];

  return (
    <>
      <SEO
        title="Auto Parts Categories | VETHY Wholesale Catalog — 10 Categories, 60 Subcategories"
        description="Browse the full VETHY auto parts catalog: engine, brake, cooling, suspension & steering, electrical & lighting, body parts, filters, transmission, truck & commercial, HVAC. Wholesale export from China."
        path="/categories"
        keywords={['auto parts catalog', 'wholesale auto parts categories', 'OEM aftermarket parts categories', 'auto parts taxonomy', 'auto parts tree']}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Categories</span></nav>
          <p className="eyebrow mt-6 mb-3">{t('nav.categories')}</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">Every part. One catalog.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">Ten categories, sixty subcategories, eight thousand SKUs. Built for distributors, fleets and workshops worldwide — with consolidated container shipping from Qingdao.</p>
        </div>
      </section>

      {/* Tree view — niparts-style comprehensive taxonomy */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page space-y-px bg-ink-200">
          {categories.map((c) => (
            <div key={c.slug} className="bg-white">
              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_2.5fr]">
                <div>
                  <Link to={`/categories/${c.slug}`} className="group inline-block">
                    <p className="eyebrow mb-2">{c.subcategories.length} subcategories</p>
                    <h2 className="font-display text-[22px] font-medium text-ink-900 group-hover:text-ink-600 sm:text-[26px]">{c.name}</h2>
                  </Link>
                  <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-600">{c.intro}</p>
                  <Link to={`/categories/${c.slug}`} className="btn-link mt-5">View category →</Link>
                </div>
                <div className="grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
                  {c.subcategories.map((s) => (
                    <Link key={s.slug} to={`/categories/${c.slug}/${s.slug}`} className="bg-white p-4 transition hover:bg-ink-050">
                      <p className="font-display text-[14px] font-medium text-ink-900">{s.name}</p>
                      <p className="mt-1 text-[12px] text-ink-500 line-clamp-2">{s.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-050 py-20 text-center">
        <div className="container-page">
          <h2 className="text-display-sm text-ink-900">Can't find what you need?</h2>
          <p className="mt-4 text-[14px] text-ink-600">Send us your OE reference list or vehicle fitment — we source beyond the catalog.</p>
          <Link to="/contact" className="btn-dark mt-6">Send RFQ</Link>
        </div>
      </section>
    </>
  );
}
