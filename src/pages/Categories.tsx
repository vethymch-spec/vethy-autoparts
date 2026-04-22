import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';

export default function Categories() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Auto Parts Categories | VETHY Wholesale Catalog"
        description="Browse the complete VETHY auto parts catalog: engine, brake, cooling, suspension, electrical, body parts, filters, transmission, truck and HVAC components for global wholesale."
        path="/categories"
        keywords={['auto parts catalog', 'wholesale auto parts categories', 'OEM parts categories']}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">{t('nav.categories')}</p>
          <h1 className="text-display-lg text-balance">Every part. One catalog.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">Ten categories, sixty subcategories, eight thousand SKUs. Built for distributors, fleets and workshops worldwide.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.slug} to={`/categories/${c.slug}`} className="group tile">
                <img src={`/images/category-${c.slug}.svg`} alt={c.name} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{c.subcategories.length} subcategories</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-white">{c.name}</h2>
                </div>
                <div className="tile-foot">
                  <span className="text-[13px] font-medium text-white/80">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
