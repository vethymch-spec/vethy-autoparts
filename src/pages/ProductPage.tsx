import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findProduct } from '../data/products';
import { findCategory, findSubcategory } from '../data/categories';
import { RFQForm } from '../components/RFQForm';

export default function ProductPage() {
  const { slug } = useParams();
  const p = findProduct(slug || '');
  if (!p) return <div className="container-page py-20">Product not found.</div>;
  const cat = findCategory(p.category);
  const sub = findSubcategory(p.category, p.subcategory);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.shortDescription,
    brand: { '@type': 'Brand', name: 'VETHY' },
    manufacturer: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.' },
    category: cat?.name,
    sku: p.slug,
    offers: { '@type': 'Offer', priceCurrency: 'USD', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'VETHY' } },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'MOQ', value: p.moq },
      { '@type': 'PropertyValue', name: 'Lead time', value: p.leadTime },
      { '@type': 'PropertyValue', name: 'Packaging', value: p.packaging },
      ...(p.certifications.map((c) => ({ '@type': 'PropertyValue', name: 'Certification', value: c }))),
    ],
  };

  return (
    <>
      <SEO
        title={`${p.name} | Wholesale Supplier — VETHY`}
        description={p.shortDescription}
        path={`/products/${p.slug}`}
        keywords={p.keywords}
        jsonLd={jsonLd}
      />
      <section className="bg-gray-50">
        <div className="container-page py-12">
          <nav className="text-sm text-ink-500">
            <Link to="/categories">Categories</Link>
            {cat && <> / <Link to={`/categories/${cat.slug}`}>{cat.name}</Link></>}
            {cat && sub && <> / <Link to={`/categories/${cat.slug}/${sub.slug}`}>{sub.name}</Link></>}
            {' '}/ <span className="text-ink-900">{p.name}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-ink-900">{p.name}</h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-700">{p.shortDescription}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <article className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Highlights</h2>
            <ul className="mt-3 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-ink-700"><span className="text-brand">✓</span> {h}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Vehicle applications</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {p.applications.map((a) => (<li key={a} className="rounded bg-gray-100 px-3 py-2 text-sm text-ink-700">{a}</li>))}
            </ul>
          </div>
          {p.oeReferences && (
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900">OE cross-references</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.oeReferences.map((r) => (<code key={r} className="rounded bg-ink-900 px-2 py-1 text-xs text-white">{r}</code>))}
              </div>
            </div>
          )}
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Wholesale keywords this product serves</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.keywords.map((k) => (<li key={k} className="rounded-full bg-brand/10 px-3 py-1 text-xs text-brand-dark">{k}</li>))}
            </ul>
          </div>
        </article>

        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-ink-900">Wholesale terms</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <Term k="MOQ" v={p.moq} />
            <Term k="Lead time" v={p.leadTime} />
            <Term k="Packaging" v={p.packaging} />
            <Term k="Certifications" v={p.certifications.join(', ')} />
            <Term k="Origin" v="Qingdao, China" />
            <Term k="Payment" v="T/T 30/70, L/C at sight" />
            <Term k="Shipping" v="FCL / LCL via Qingdao Port" />
          </dl>
          <Link to="/contact" className="btn-primary mt-6 w-full">Request quote</Link>
        </aside>
      </section>

      <section className="container-page pb-20">
        <RFQForm />
      </section>
    </>
  );
}

function Term({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wider text-ink-500">{k}</dt>
      <dd className="font-medium text-ink-900">{v}</dd>
    </div>
  );
}
