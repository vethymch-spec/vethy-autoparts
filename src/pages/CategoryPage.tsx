import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findCategory, findSubcategory } from '../data/categories';
import { products } from '../data/products';

export default function CategoryPage() {
  const { category: categorySlug, subcategory: subSlug } = useParams();
  const cat = findCategory(categorySlug || '');
  if (!cat) return <div className="container-page py-24">Category not found.</div>;
  const sub = subSlug ? findSubcategory(cat.slug, subSlug) : undefined;
  if (subSlug && !sub) return <div className="container-page py-24">Subcategory not found.</div>;

  const related = sub
    ? products.filter((p) => p.category === cat.slug && p.subcategory === sub.slug)
    : products.filter((p) => p.category === cat.slug);

  const url = sub ? `https://www.vethy.com.cn/categories/${cat.slug}/${sub.slug}` : `https://www.vethy.com.cn/categories/${cat.slug}`;
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://www.vethy.com.cn/categories' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: `https://www.vethy.com.cn/categories/${cat.slug}` },
      ...(sub ? [{ '@type': 'ListItem', position: 4, name: sub.name, item: url }] : []),
    ],
  };
  const collectionLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: sub ? `${cat.name} — ${sub.name}` : cat.name, url, description: sub ? sub.intro : cat.intro };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: `What is the MOQ for ${sub ? sub.name : cat.name}?`, acceptedAnswer: { '@type': 'Answer', text: 'Standard MOQ is 500 pcs per SKU. On mixed-SKU container orders, single-SKU MOQ can drop to 20 pcs.' } },
      { '@type': 'Question', name: 'What certifications apply?', acceptedAnswer: { '@type': 'Answer', text: 'Parts are produced under IATF 16949. Category-specific certifications include ECE R90 for brake pads and E-mark for lighting.' } },
      { '@type': 'Question', name: 'What is the typical lead time?', acceptedAnswer: { '@type': 'Answer', text: 'Lead time is 25–35 days from PO. Stocked SKUs ship in 3–7 days from our Qingdao warehouse.' } },
      { '@type': 'Question', name: 'Do you support OEM packaging?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Custom packaging, barcoding and private-label branding are free on orders above one 40HQ container.' } },
    ],
  };

  const title = sub ? `${sub.name} — Wholesale ${cat.name} | VETHY` : `${cat.name} — Wholesale Auto Parts Manufacturer | VETHY`;
  const description = sub ? sub.intro : cat.intro;
  const keywords = sub ? sub.keywords : cat.keywords;

  return (
    <>
      <SEO title={title} description={description} path={sub ? `/categories/${cat.slug}/${sub.slug}` : `/categories/${cat.slug}`} keywords={keywords} jsonLd={[breadcrumb, collectionLd, faqLd]} />

      <section className="bg-brand text-white">
        <div className="container-page py-10">
          <nav className="text-[12px] text-white/75">
            <Link to="/" className="hover:text-white">Home</Link> /{' '}
            <Link to="/categories" className="hover:text-white">Categories</Link> /{' '}
            {sub ? (
              <>
                <Link to={`/categories/${cat.slug}`} className="hover:text-white">{cat.name}</Link> / <span className="text-white">{sub.name}</span>
              </>
            ) : (
              <span className="text-white">{cat.name}</span>
            )}
          </nav>
          <h1 className="mt-3 text-display-lg text-balance">{sub ? sub.name : cat.hero}</h1>
          <p className="mt-3 max-w-2xl text-[14px] text-white/85">{sub ? sub.intro : cat.intro}</p>
        </div>
      </section>

      {!sub && (
        <section className="bg-white py-10">
          <div className="container-page">
            <p className="eyebrow mb-2">Subcategories</p>
            <h2 className="text-display-sm text-ink-900 mb-6">{cat.subcategories.length} subcategories in {cat.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cat.subcategories.map((s) => (
                <Link key={s.slug} to={`/categories/${cat.slug}/${s.slug}`} className="rounded-md border border-ink-200 bg-white p-4 transition hover:border-brand hover:bg-brand-soft">
                  <h3 className="font-display text-[14px] font-bold text-ink-900 group-hover:text-brand">{s.name}</h3>
                  <p className="mt-1 text-[12px] text-ink-600 line-clamp-2">{s.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-ink-050 py-12">
          <div className="container-page">
            <p className="eyebrow mb-1.5">Featured</p>
            <h2 className="text-display-sm text-ink-900 mb-6">SKUs in {sub ? sub.name : cat.name}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
                  <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img" loading="lazy" />
                  <div className="card-body">
                    <p className="eyebrow-muted">MOQ {p.moq}</p>
                    <h3 className="font-display text-[14px] font-semibold text-ink-900 line-clamp-2 group-hover:text-brand">{p.name}</h3>
                    <p className="text-[12px] text-ink-600 line-clamp-2">{p.shortDescription}</p>
                    <span className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-3 py-2 text-[13px] font-semibold text-white group-hover:bg-accent-dark">Get quote</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-12">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Wholesale</p>
            <h2 className="text-display-sm text-ink-900">OE-quality {(sub ? sub.name : cat.name).toLowerCase()} from Qingdao</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">We manufacture under IATF 16949 standards and ship FCL, LCL and rail freight from Qingdao port to 60+ countries. Mixed-SKU containers, OEM packaging and barcoding are available.</p>
            <Link to="/wholesale" className="btn-link mt-4">Wholesale program →</Link>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-[13px]">
            {[
              ['MOQ', '500 pcs / SKU'],
              ['Lead time', '25–35 days'],
              ['Certification', 'IATF 16949'],
              ['Shipping', 'FCL · LCL · Rail'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-ink-200 bg-ink-050 p-4">
                <dt className="eyebrow-muted">{k}</dt>
                <dd className="mt-1 font-display text-[18px] font-bold text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
