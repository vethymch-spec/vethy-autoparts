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
        description="Featured wholesale auto parts: ceramic brake pads, aluminum radiators, LED headlights, oil filters, shock absorbers, A/C compressors, control arms and parking ACs."
        path="/products"
        keywords={['featured auto parts', 'wholesale auto parts products', 'best-selling OEM aftermarket parts']}
        jsonLd={jsonLd}
      />

      <section className="bg-brand text-white">
        <div className="container-page py-10">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Products</span></nav>
          <h1 className="mt-3 text-display-lg text-balance">Featured products</h1>
          <p className="mt-3 max-w-2xl text-[14px] text-white/85">A curated selection of the parts that ship most often from our Qingdao consolidation warehouse. Full 8,000-SKU catalog available on request.</p>
        </div>
      </section>

      <section className="bg-ink-050 py-12">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow-muted">{p.category.replace(/-/g, ' ')}</p>
                  <h2 className="font-display text-[14px] font-semibold text-ink-900 line-clamp-2 group-hover:text-brand">{p.name}</h2>
                  <p className="text-[12px] text-ink-600">MOQ {p.moq} · Lead {p.leadTime}</p>
                  <span className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-3 py-2 text-[13px] font-semibold text-white group-hover:bg-accent-dark">Get quote</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
