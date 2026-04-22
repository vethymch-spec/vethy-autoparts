import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { products } from '../data/products';

export default function ProductsIndex() {
  return (
    <>
      <SEO
        title="Featured Wholesale Auto Parts Products | VETHY"
        description="Featured wholesale auto parts from VETHY: ceramic brake pads, aluminum truck radiators, LED headlight bulbs, oil filters, shock absorbers, AC compressors, control arms and parking AC."
        path="/products"
        keywords={['wholesale auto parts products', 'featured auto spare parts', 'aftermarket parts catalog']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Featured Wholesale Products</h1>
          <p className="mt-3 max-w-3xl text-gray-300">High-volume export SKUs with MOQ, packaging and certifications on each product page.</p>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
              <div className="text-xs uppercase tracking-wider text-brand">{p.category}</div>
              <h2 className="mt-2 font-display text-lg font-bold text-ink-900 group-hover:text-brand">{p.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.shortDescription}</p>
              <div className="mt-3 text-xs text-ink-700">MOQ: {p.moq} · Lead time: {p.leadTime}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
