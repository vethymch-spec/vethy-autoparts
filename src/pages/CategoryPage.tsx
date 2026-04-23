import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findCategory, findSubcategory } from '../data/categories';
import { products } from '../data/products';

export default function CategoryPage() {
  const { category: categorySlug, subcategory: subSlug } = useParams();
  const cat = findCategory(categorySlug || '');
  if (!cat) return <div className="container-page pt-32 pb-24">Category not found.</div>;
  const sub = subSlug ? findSubcategory(cat.slug, subSlug) : undefined;
  if (subSlug && !sub) return <div className="container-page pt-32 pb-24">Subcategory not found.</div>;

  const related = sub
    ? products.filter((p) => p.category === cat.slug && p.subcategory === sub.slug)
    : products.filter((p) => p.category === cat.slug);

  const url = sub
    ? `https://www.vethy.com.cn/categories/${cat.slug}/${sub.slug}`
    : `https://www.vethy.com.cn/categories/${cat.slug}`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://www.vethy.com.cn/categories' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: `https://www.vethy.com.cn/categories/${cat.slug}` },
      ...(sub ? [{ '@type': 'ListItem', position: 4, name: sub.name, item: url }] : []),
    ],
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: sub ? `${cat.name} — ${sub.name}` : cat.name,
    url,
    description: sub ? sub.intro : cat.intro,
    isPartOf: { '@type': 'WebSite', name: 'VETHY Auto Parts', url: 'https://www.vethy.com.cn' },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What is the MOQ for ${sub ? sub.name : cat.name}?`, acceptedAnswer: { '@type': 'Answer', text: 'Standard MOQ is 500 pcs per SKU. On mixed-SKU container orders, single-SKU MOQ can drop to 20 pcs.' } },
      { '@type': 'Question', name: 'What certifications apply?', acceptedAnswer: { '@type': 'Answer', text: 'Parts are produced under IATF 16949 quality systems. Category-specific certifications include ECE R90 for brake pads, E-mark for lighting, and ISO 9001.' } },
      { '@type': 'Question', name: 'What is the typical lead time?', acceptedAnswer: { '@type': 'Answer', text: 'Lead time is 25–35 days from PO for factory production. Stock SKUs ship in 3–7 days from our Qingdao warehouse.' } },
      { '@type': 'Question', name: 'Do you support OEM packaging?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Custom packaging, barcoding and private-label branding are free on orders above one 40HQ container.' } },
    ],
  };

  const title = sub
    ? `${sub.name} — Wholesale ${cat.name} Manufacturer | VETHY`
    : `${cat.name} — Wholesale Auto Parts Manufacturer & Exporter | VETHY`;
  const description = sub ? sub.intro : cat.intro;
  const keywords = sub ? sub.keywords : cat.keywords;

  return (
    <>
      <SEO title={title} description={description} path={sub ? `/categories/${cat.slug}/${sub.slug}` : `/categories/${cat.slug}`} keywords={keywords} jsonLd={[breadcrumb, collectionLd, faqLd]} />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500">
            <Link to="/" className="hover:text-ink-900">Home</Link> /{' '}
            <Link to="/categories" className="hover:text-ink-900">Categories</Link> /{' '}
            {sub ? (
              <>
                <Link to={`/categories/${cat.slug}`} className="hover:text-ink-900">{cat.name}</Link> /{' '}
                <span className="text-ink-900">{sub.name}</span>
              </>
            ) : (
              <span className="text-ink-900">{cat.name}</span>
            )}
          </nav>
          <p className="eyebrow mt-6 mb-3">{sub ? cat.name : 'Category'}</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">{sub ? sub.name : cat.hero}</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">{sub ? sub.intro : cat.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-dark">Request quote</Link>
            {sub && <Link to={`/categories/${cat.slug}`} className="btn-ghost">All {cat.name}</Link>}
          </div>
        </div>
      </section>

      {!sub && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-page">
            <p className="eyebrow mb-3">Subcategories</p>
            <h2 className="text-display-sm text-ink-900 mb-10">{cat.subcategories.length} subcategories in {cat.name}.</h2>
            <div className="grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
              {cat.subcategories.map((s) => (
                <Link key={s.slug} to={`/categories/${cat.slug}/${s.slug}`} className="group bg-white p-6 transition hover:bg-ink-050">
                  <h3 className="font-display text-[17px] font-medium text-ink-900 group-hover:text-ink-600">{s.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-600 line-clamp-3">{s.intro}</p>
                  <span className="mt-4 inline-block text-[12px] font-medium text-ink-900">View →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-ink-050 py-20 sm:py-24">
          <div className="container-page">
            <p className="eyebrow mb-3">Featured</p>
            <h2 className="text-display-sm text-ink-900 mb-10">SKUs in {sub ? sub.name : cat.name}.</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group card">
                  <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img transition group-hover:opacity-90" loading="lazy" />
                  <div className="card-body">
                    <p className="eyebrow">MOQ {p.moq}</p>
                    <h3 className="font-display text-[16px] font-medium text-ink-900">{p.name}</h3>
                    <p className="text-[12px] text-ink-500 line-clamp-2">{p.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Wholesale</p>
              <h2 className="text-display-sm text-ink-900">OE-quality {sub ? sub.name.toLowerCase() : cat.name.toLowerCase()} from Qingdao.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-600">We manufacture to IATF 16949 standards and ship FCL, LCL and rail freight from Qingdao port to 60+ countries. Mixed-SKU containers, OEM packaging and barcoding available on request.</p>
              <Link to="/wholesale" className="btn-link mt-6">Wholesale program →</Link>
            </div>
            <dl className="grid grid-cols-2 gap-8 text-[14px]">
              <div><dt className="eyebrow mb-2">MOQ</dt><dd className="font-display text-[22px] font-medium text-ink-900">500 pcs / SKU</dd></div>
              <div><dt className="eyebrow mb-2">Lead time</dt><dd className="font-display text-[22px] font-medium text-ink-900">25–35 days</dd></div>
              <div><dt className="eyebrow mb-2">Certification</dt><dd className="font-display text-[22px] font-medium text-ink-900">IATF 16949</dd></div>
              <div><dt className="eyebrow mb-2">Shipping</dt><dd className="font-display text-[22px] font-medium text-ink-900">FCL · LCL · Rail</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
