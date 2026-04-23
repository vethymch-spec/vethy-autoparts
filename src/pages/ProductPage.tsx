import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findProduct, products } from '../data/products';
import { findCategory, findSubcategory } from '../data/categories';

export default function ProductPage() {
  const { slug } = useParams();
  const p = findProduct(slug || '');
  if (!p) return <div className="container-page pt-32 pb-24">Product not found.</div>;
  const cat = findCategory(p.category);
  const sub = findSubcategory(p.category, p.subcategory);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.shortDescription,
      brand: { '@type': 'Brand', name: 'VETHY' },
      manufacturer: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', url: 'https://www.vethy.com.cn' },
      image: `https://www.vethy.com.cn/images/product-${p.slug}.svg`,
      category: cat?.name,
      sku: p.slug.toUpperCase(),
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
      { '@type': 'Question', name: `Is OEM packaging available?`, acceptedAnswer: { '@type': 'Answer', text: `Yes. Custom OEM packaging with your logo, color and barcode is free on orders above one 40HQ container.` } },
      { '@type': 'Question', name: `What certifications does ${p.name} carry?`, acceptedAnswer: { '@type': 'Answer', text: `${p.name} is produced to ${p.certifications.join(', ')} standards.` } },
    ]},
  ];

  return (
    <>
      <SEO
        title={`${p.name} — Wholesale Manufacturer & Exporter | VETHY`}
        description={`${p.shortDescription} MOQ ${p.moq}. Lead time ${p.leadTime}. ${p.certifications.join(', ')} certified. Container export from Qingdao.`}
        path={`/products/${p.slug}`}
        keywords={[p.name, `${p.name} wholesale`, `${p.name} manufacturer China`, `OEM ${p.name}`, `${p.name} supplier`]}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500">
            <Link to="/" className="hover:text-ink-900">Home</Link> / <Link to="/products" className="hover:text-ink-900">Products</Link> / <Link to={`/categories/${p.category}`} className="hover:text-ink-900">{cat?.name}</Link> / <span className="text-ink-900">{p.name}</span>
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
              <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-3">{cat?.name}{sub ? ' · ' + sub.name : ''}</p>
              <h1 className="text-display-lg text-ink-900 text-balance">{p.name}</h1>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-600 sm:text-base">{p.shortDescription}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
                <div><dt className="text-ink-500">MOQ</dt><dd className="mt-1 font-medium text-ink-900">{p.moq}</dd></div>
                <div><dt className="text-ink-500">Lead time</dt><dd className="mt-1 font-medium text-ink-900">{p.leadTime}</dd></div>
                <div><dt className="text-ink-500">Packaging</dt><dd className="mt-1 font-medium text-ink-900">{p.packaging}</dd></div>
                <div><dt className="text-ink-500">Certifications</dt><dd className="mt-1 font-medium text-ink-900">{p.certifications.join(', ')}</dd></div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-dark">Request quote</Link>
                <Link to={`/categories/${p.category}`} className="btn-ghost">More in {cat?.name}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-3">
            <div>
              <p className="eyebrow mb-3">Highlights</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">Built for the global aftermarket.</h2>
              <ul className="mt-6 space-y-4 text-[15px] text-ink-700">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3"><span className="mt-[9px] h-1 w-3 flex-none bg-ink-900" />{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Applications</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">Vehicle fitment.</h2>
              <ul className="mt-6 space-y-2 text-[15px] text-ink-700">
                {p.applications.map((a) => (<li key={a}>· {a}</li>))}
              </ul>
                {p.oeReferences && p.oeReferences.length > 0 && (
                <>
                  <p className="eyebrow mt-10 mb-3">OE references</p>
                  <p className="text-[12px] leading-relaxed text-ink-500 break-words font-mono">{p.oeReferences.join(' · ')}</p>
                </>
              )}
            </div>

            <div className="bg-ink-050 p-8">
              <p className="eyebrow mb-3">Wholesale</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900">Order details</h2>
              <dl className="mt-6 space-y-4 text-[13px]">
                <div className="hairline-b pb-4"><dt className="text-ink-500">MOQ</dt><dd className="mt-1 font-medium text-ink-900">{p.moq}</dd></div>
                <div className="hairline-b pb-4"><dt className="text-ink-500">Packaging</dt><dd className="mt-1 font-medium text-ink-900">{p.packaging}</dd></div>
                <div className="hairline-b pb-4"><dt className="text-ink-500">Lead time</dt><dd className="mt-1 font-medium text-ink-900">{p.leadTime}</dd></div>
                <div><dt className="text-ink-500">Certifications</dt><dd className="mt-1 font-medium text-ink-900">{p.certifications.join(', ')}</dd></div>
              </dl>
              <Link to="/contact" className="btn-dark mt-8 w-full">Get container quote</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink-050 py-20">
          <div className="container-page">
            <p className="eyebrow mb-3">Related</p>
            <h2 className="text-display-sm text-ink-900 mb-10">More in {cat?.name}.</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/products/${r.slug}`} className="group card">
                  <img src={`/images/product-${r.slug}.svg`} alt={r.name} className="card-img transition group-hover:opacity-90" loading="lazy" />
                  <div className="card-body">
                    <p className="eyebrow">MOQ {r.moq}</p>
                    <h3 className="font-display text-[16px] font-medium text-ink-900">{r.name}</h3>
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
