import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { products } from '../data/products';

export default function ProductsIndex() {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.vethy.com.cn/products' },
    ]},
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.vethy.com.cn/products/${p.slug}`, name: p.name })) },
  ];

  return (
    <>
      <SEO
        title="Featured Auto Parts | VETHY Wholesale Best-Selling SKUs"
        description="Featured wholesale auto parts from VETHY: ceramic brake pads, aluminum radiators, LED headlights, oil filters, shock absorbers, AC compressors, control arms and parking ACs. OE quality, container-load shipping."
        path="/products"
        keywords={['featured auto parts', 'wholesale auto parts products', 'best-selling OEM aftermarket parts']}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Products</span></nav>
          <p className="eyebrow mt-6 mb-3">Products</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">Best-selling SKUs.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">A curated selection of the parts that ship most often from our Qingdao consolidation warehouse. Full 8,000-SKU catalog available on request.</p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="group card">
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img transition group-hover:opacity-90" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow">{p.category.replace(/-/g, ' ')}</p>
                  <h2 className="font-display text-[17px] font-medium text-ink-900">{p.name}</h2>
                  <p className="text-[12px] text-ink-500">MOQ {p.moq} · Lead time {p.leadTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
