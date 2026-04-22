import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findCategory, findSubcategory } from '../data/categories';
import { products } from '../data/products';
import { RFQForm } from '../components/RFQForm';

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const cat = findCategory(category || '');
  if (!cat) return <div className="container-page py-20">Category not found.</div>;

  if (subcategory) {
    const sub = findSubcategory(cat.slug, subcategory);
    if (!sub) return <div className="container-page py-20">Subcategory not found.</div>;
    const subProducts = products.filter((p) => p.category === cat.slug && p.subcategory === sub.slug);
    return (
      <>
        <SEO
          title={`${sub.name} — Wholesale ${cat.name} Supplier | VETHY Auto Parts`}
          description={`${sub.intro} Wholesale ${sub.name.toLowerCase()} from VETHY, a Chinese ${cat.name.toLowerCase()} manufacturer and exporter. Bulk MOQs, OE references and global FCL/LCL shipping.`}
          path={`/categories/${cat.slug}/${sub.slug}`}
          keywords={[...sub.keywords, ...cat.keywords]}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${sub.name} — Wholesale ${cat.name}`,
            description: sub.intro,
            url: `https://www.vethy.com.cn/categories/${cat.slug}/${sub.slug}`,
            isPartOf: { '@type': 'WebSite', name: 'VETHY Auto Parts', url: 'https://www.vethy.com.cn' },
          }}
        />
        <section className="bg-gray-50">
          <div className="container-page py-12">
            <nav className="text-sm text-ink-500"><Link to="/categories">Categories</Link> / <Link to={`/categories/${cat.slug}`}>{cat.name}</Link> / <span className="text-ink-900">{sub.name}</span></nav>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink-900">{sub.name} — Wholesale Supplier</h1>
            <p className="mt-3 max-w-3xl text-ink-700">{sub.intro}</p>
          </div>
        </section>
        <section className="container-page py-16">
          <h2 className="font-display text-2xl font-bold text-ink-900">Featured wholesale items</h2>
          {subProducts.length === 0 && <p className="mt-4 text-ink-500">Full catalog available on request — contact our export team for the latest SKU list and pricing for {sub.name.toLowerCase()}.</p>}
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {subProducts.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
                <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand">{p.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.shortDescription}</p>
                <div className="mt-3 text-xs text-ink-700">MOQ: {p.moq}</div>
              </Link>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-ink-900">Long-tail keywords we serve</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {sub.keywords.map((k) => (
              <li key={k} className="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-ink-700">{k}</li>
            ))}
          </ul>

          <div className="mt-16">
            <RFQForm />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${cat.name} — Wholesale ${cat.name} Manufacturer & Exporter | VETHY`}
        description={`${cat.intro} VETHY is your one-stop wholesale source for ${cat.name.toLowerCase()}, with ${cat.subcategories.length} subcategories and 8000+ OE references.`}
        path={`/categories/${cat.slug}`}
        keywords={cat.keywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${cat.name} — Wholesale Catalog`,
          description: cat.intro,
          url: `https://www.vethy.com.cn/categories/${cat.slug}`,
        }}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-16">
          <nav className="text-sm text-gray-400"><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link> / <span className="text-white">{cat.name}</span></nav>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{cat.hero}</h1>
          <p className="mt-4 max-w-3xl text-gray-300">{cat.intro}</p>
        </div>
      </section>
      <section className="container-page py-16">
        <h2 className="font-display text-2xl font-bold text-ink-900">Subcategories</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cat.subcategories.map((s) => (
            <Link key={s.slug} to={`/categories/${cat.slug}/${s.slug}`} className="card group">
              <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand">{s.name}</h3>
              <p className="mt-2 text-sm text-ink-500">{s.intro}</p>
            </Link>
          ))}
        </div>
        <div className="mt-16">
          <RFQForm />
        </div>
      </section>
    </>
  );
}
