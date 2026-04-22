import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findProduct } from '../data/products';
import { findCategory, findSubcategory } from '../data/categories';

export default function ProductPage() {
  const { slug } = useParams();
  const p = findProduct(slug || '');
  if (!p) return <div className="container-page py-32">Product not found.</div>;
  const cat = findCategory(p.category);
  const sub = findSubcategory(p.category, p.subcategory);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.intro,
    brand: { '@type': 'Brand', name: 'VETHY' },
    manufacturer: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', url: 'https://www.vethy.com.cn' },
    image: `https://www.vethy.com.cn/images/product-${p.slug}.svg`,
    offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'VETHY' } },
  };

  return (
    <>
      <SEO
        title={`${p.name} | VETHY Wholesale`}
        description={p.intro}
        path={`/products/${p.slug}`}
        keywords={[p.name, `${p.name} wholesale`, `${p.name} manufacturer China`, `OEM ${p.name}`]}
        jsonLd={jsonLd}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src={`/images/product-${p.slug}.svg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">{cat?.name}{sub ? ' · ' + sub.name : ''}</p>
          <h1 className="text-display-lg text-balance">{p.name}</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{p.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-pill-light">Request quote</Link>
            <Link to={`/categories/${p.category}`} className="btn-pill-ghost">More in {cat?.name}</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="eyebrow mb-3">Highlights</p>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Built for the global aftermarket.</h2>
              <ul className="mt-6 space-y-4 text-base text-ink-700">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Applications</p>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Vehicle fitment.</h2>
              <ul className="mt-6 space-y-2 text-base text-ink-700">
                {p.applications.map((a) => (<li key={a}>· {a}</li>))}
              </ul>
              {p.oeReferences.length > 0 && (
                <>
                  <p className="eyebrow mt-10 mb-3">OE references</p>
                  <p className="text-[13px] leading-relaxed text-ink-500 break-words">{p.oeReferences.join(' · ')}</p>
                </>
              )}
            </div>

            <div className="rounded-3xl bg-[#f5f5f7] p-8">
              <p className="eyebrow mb-3">Wholesale spec</p>
              <h2 className="font-display text-xl font-bold text-ink-900">Order details</h2>
              <dl className="mt-6 space-y-4 text-[14px]">
                <div className="border-b border-black/[0.08] pb-4"><dt className="text-ink-500">MOQ</dt><dd className="mt-1 font-semibold text-ink-900">{p.moq}</dd></div>
                <div className="border-b border-black/[0.08] pb-4"><dt className="text-ink-500">Packaging</dt><dd className="mt-1 font-semibold text-ink-900">{p.packaging}</dd></div>
                <div className="border-b border-black/[0.08] pb-4"><dt className="text-ink-500">Lead time</dt><dd className="mt-1 font-semibold text-ink-900">{p.leadTime}</dd></div>
                <div><dt className="text-ink-500">Certifications</dt><dd className="mt-1 font-semibold text-ink-900">{p.certifications.join(', ')}</dd></div>
              </dl>
              <Link to="/contact" className="btn-pill-dark mt-8 block text-center">Get container quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
