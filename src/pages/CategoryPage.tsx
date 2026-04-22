import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findCategory, findSubcategory } from '../data/categories';
import { products } from '../data/products';

export default function CategoryPage() {
  const { cat, sub } = useParams();
  const category = findCategory(cat || '');
  if (!category) return <div className="container-page py-32">Category not found.</div>;
  const subcategory = sub ? findSubcategory(cat || '', sub) : null;
  const matched = products.filter((p) => p.category === cat && (!sub || p.subcategory === sub));
  const title = subcategory ? subcategory.name : category.name;
  const desc = subcategory ? subcategory.intro : category.intro;

  return (
    <>
      <SEO
        title={`${title} | VETHY Wholesale ${title} Manufacturer & Exporter`}
        description={`${desc} Wholesale export from China. OE quality, certified, container-load shipping to 60+ countries.`}
        path={subcategory ? `/categories/${cat}/${sub}` : `/categories/${cat}`}
        keywords={[`${title} wholesale`, `${title} manufacturer China`, `${title} exporter`, `OEM ${title}`]}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src={`/images/category-${cat}.svg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">{category.name}{subcategory ? ' · ' + subcategory.name : ''}</p>
          <h1 className="text-display-lg text-balance">{title}</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{desc}</p>
        </div>
      </section>

      {!subcategory && (
        <section className="bg-[#f5f5f7] py-24 sm:py-32">
          <div className="container-page">
            <p className="eyebrow mb-3">Subcategories</p>
            <h2 className="text-display-md text-ink-900">{category.subcategories.length} families.</h2>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.subcategories.map((s) => (
                <Link key={s.slug} to={`/categories/${cat}/${s.slug}`} className="group rounded-2xl bg-white p-7 transition hover:shadow-lg">
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand">{s.name}</h3>
                  <p className="mt-2 text-[13px] text-ink-500 line-clamp-2">{s.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page">
          <p className="eyebrow mb-3">Featured products</p>
          <h2 className="text-display-md">{matched.length} SKUs in stock.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matched.length === 0 && <p className="text-white/60">Specific SKUs available on request. Please contact sales for a full catalog.</p>}
            {matched.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="group tile">
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">MOQ {p.moq}</p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-pill-light">Request quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
