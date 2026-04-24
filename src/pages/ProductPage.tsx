import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findProduct, products } from '../data/products';
import { findCategory, findSubcategory } from '../data/categories';

export default function ProductPage() {
  const { slug } = useParams();
  const p = findProduct(slug || '');
  if (!p) return <div className="container-page py-24">Product not found.</div>;
  const cat = findCategory(p.category);
  const sub = findSubcategory(p.category, p.subcategory);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Product',
      name: p.name, description: p.shortDescription,
      brand: { '@type': 'Brand', name: 'VETHY' },
      manufacturer: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', url: 'https://www.vethy.com.cn' },
      image: `https://www.vethy.com.cn/images/product-${p.slug}.svg`,
      category: cat?.name, sku: p.slug.toUpperCase(),
      offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'VETHY' } },
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.vethy.com.cn/products' },
      { '@type': 'ListItem', position: 3, name: cat?.name, item: `https://www.vethy.com.cn/categories/${p.category}` },
      { '@type': 'ListItem', position: 4, name: p.name, item: `https://www.vethy.com.cn/products/${p.slug}` },
    ]},
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: `What is the MOQ for ${p.name}?`, acceptedAnswer: { '@type': 'Answer', text: `MOQ for ${p.name} is ${p.moq}. Lower MOQs are possible on consolidated container orders.` } },
      { '@type': 'Question', name: `What is the lead time for ${p.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Standard lead time is ${p.leadTime}. Stocked SKUs ship within 3–7 days.` } },
      { '@type': 'Question', name: 'Is OEM packaging available?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Custom OEM packaging with your logo, color and barcode is free on orders above one 40HQ container.' } },
      { '@type': 'Question', name: `What certifications does ${p.name} carry?`, acceptedAnswer: { '@type': 'Answer', text: `${p.name} is produced to ${p.certifications.join(', ')} standards.` } },
    ]},
  ];

  return (
    <>
      <SEO
        title={`${p.name} — Wholesale Manufacturer & Exporter | VETHY`}
        description={`${p.shortDescription} MOQ ${p.moq}. Lead time ${p.leadTime}. ${p.certifications.join(', ')} certified.`}
        path={`/products/${p.slug}`}
        keywords={[p.name, `${p.name} wholesale`, `${p.name} manufacturer China`, `OEM ${p.name}`, `${p.name} supplier`]}
        jsonLd={jsonLd}
      />

      <section className="bg-ink-050">
        <div className="container-page py-6">
          <nav className="text-[12px] text-ink-500">
            <Link to="/" className="hover:text-brand">Home</Link> /{' '}
            <Link to="/products" className="hover:text-brand">Products</Link> /{' '}
            <Link to={`/categories/${p.category}`} className="hover:text-brand">{cat?.name}</Link> /{' '}
            <span className="text-ink-900">{p.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-ink-200 bg-white p-4">
            <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="aspect-[4/3] w-full rounded-md bg-ink-050 object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="eyebrow mb-2">{cat?.name}{sub ? ' · ' + sub.name : ''}</p>
            <h1 className="text-display-md text-ink-900">{p.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-[12px] text-ink-600">
              <span className="stars">★★★★★</span>
              <span>(reviews available on request)</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">{p.shortDescription}</p>

            <div className="mt-6 rounded-lg border border-ink-200 bg-ink-050 p-5">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Wholesale Quote</p>
              <p className="mt-2 font-display text-[28px] font-bold text-brand">Request pricing →</p>
              <p className="mt-1 text-[12px] text-ink-600">FOB Qingdao · pricing depends on quantity, packaging and incoterm.</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-[13px]">
                <div><p className="text-ink-500">MOQ</p><p className="font-semibold text-ink-900">{p.moq}</p></div>
                <div><p className="text-ink-500">Lead time</p><p className="font-semibold text-ink-900">{p.leadTime}</p></div>
                <div className="col-span-2"><p className="text-ink-500">Packaging</p><p className="font-semibold text-ink-900">{p.packaging}</p></div>
                <div className="col-span-2"><p className="text-ink-500">Certifications</p><p className="font-semibold text-ink-900">{p.certifications.join(', ')}</p></div>
              </div>
              <Link to="/contact" className="btn-accent mt-5 w-full">Request a quote</Link>
              <Link to={`/categories/${p.category}`} className="btn-outline mt-2 w-full">More in {cat?.name}</Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px]">
              {['🚚 Container', '🛡️ OE quality', '✅ Guaranteed fit'].map((b) => (
                <div key={b} className="rounded-md border border-ink-200 bg-white p-3 font-semibold text-ink-700">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="eyebrow mb-2">Highlights</p>
              <h2 className="font-display text-[20px] font-bold text-ink-900">Built for the global aftermarket</h2>
              <ul className="mt-5 space-y-3 text-[14px] text-ink-700">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2">Vehicle fitment</p>
              <h2 className="font-display text-[20px] font-bold text-ink-900">Applications</h2>
              <ul className="mt-5 space-y-2 text-[14px] text-ink-700">
                {p.applications.map((a) => (<li key={a}>· {a}</li>))}
              </ul>
              {p.oeReferences && p.oeReferences.length > 0 && (
                <>
                  <p className="eyebrow mt-6 mb-2">OE references</p>
                  <p className="rounded-md bg-ink-050 p-3 font-mono text-[12px] leading-relaxed text-ink-600 break-words">{p.oeReferences.join(' · ')}</p>
                </>
              )}
            </div>
            <div>
              <p className="eyebrow mb-2">FAQ</p>
              <h2 className="font-display text-[20px] font-bold text-ink-900">Buyer questions</h2>
              <dl className="mt-5 space-y-4 text-[13px]">
                {[
                  ['Minimum order?', `${p.moq} (lower on mixed containers)`],
                  ['Lead time?', p.leadTime],
                  ['OEM packaging?', 'Yes — free on 40HQ+ orders'],
                  ['Certifications?', p.certifications.join(', ')],
                ].map(([q, a]) => (
                  <div key={q} className="rounded-md border border-ink-200 p-3">
                    <dt className="font-semibold text-ink-900">{q}</dt>
                    <dd className="mt-1 text-ink-600">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink-050 py-12">
          <div className="container-page">
            <p className="eyebrow mb-2">Related</p>
            <h2 className="text-display-sm text-ink-900 mb-6">More in {cat?.name}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/products/${r.slug}`} className="card group">
                  <img src={`/images/product-${r.slug}.svg`} alt={r.name} className="card-img" loading="lazy" />
                  <div className="card-body">
                    <p className="eyebrow-muted">MOQ {r.moq}</p>
                    <h3 className="font-display text-[14px] font-semibold text-ink-900 line-clamp-2 group-hover:text-brand">{r.name}</h3>
                    <span className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-3 py-2 text-[13px] font-semibold text-white group-hover:bg-accent-dark">Get quote</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
