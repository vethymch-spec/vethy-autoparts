import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';

export default function Categories() {
  return (
    <>
      <SEO
        title="Auto Parts Categories | VETHY Wholesale Catalog"
        description="Browse the full VETHY wholesale auto parts catalog: engine parts, brake systems, cooling, suspension, electrical, body parts, filters and more. OEM-grade quality, container-friendly MOQs."
        path="/categories"
        keywords={['auto parts catalog', 'wholesale auto parts categories', 'aftermarket parts catalog']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-16">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Auto Parts Categories</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Full-line wholesale catalog across 10 product groups and 60+ subcategories. Mix-container friendly. OE references, certifications and MOQ on every page.</p>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <article key={c.slug} className="card">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                <Link to={`/categories/${c.slug}`} className="hover:text-brand">{c.name}</Link>
              </h2>
              <p className="mt-2 text-sm text-ink-500">{c.intro}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {c.subcategories.map((s) => (
                  <Link key={s.slug} to={`/categories/${c.slug}/${s.slug}`} className="text-sm text-ink-700 hover:text-brand">› {s.name}</Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
