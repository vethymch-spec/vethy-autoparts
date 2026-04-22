import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { products } from '../data/products';

export default function ProductsIndex() {
  return (
    <>
      <SEO
        title="Featured Auto Parts Products | VETHY Wholesale"
        description="Discover featured wholesale auto parts from VETHY: ceramic brake pads, aluminum radiators, heavy-duty starters, parking ACs, oil filters and more. OE quality, container-load shipping."
        path="/products"
        keywords={['featured auto parts', 'wholesale auto parts products', 'OEM aftermarket parts']}
      />

      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">Products</p>
          <h1 className="text-display-lg text-balance">Best-selling SKUs.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">A curated selection of our most-requested parts across global wholesale markets.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="group tile">
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{p.category.replace(/-/g, ' ')}</p>
                  <h2 className="mt-2 font-display text-xl font-bold leading-tight text-white">{p.name}</h2>
                </div>
                <div className="tile-foot">
                  <p className="text-[12px] text-white/70">MOQ {p.moq} · Lead time {p.leadTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
