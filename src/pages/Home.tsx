import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { markets } from '../data/markets';
import { blogPosts } from '../data/blog';

interface PanelProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bg: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
}

function Panel({ eyebrow, title, subtitle, bg, primary, secondary }: PanelProps) {
  return (
    <section className="panel">
      <img src={bg} alt="" className="panel-bg" loading="lazy" />
      <div className="relative z-10 mt-auto mb-[10vh] w-full">
        <div className="container-page">
          <p className="eyebrow-dark mb-3">{eyebrow}</p>
          <h2 className="text-display-lg text-balance max-w-3xl text-ink-900">{title}</h2>
          {subtitle && <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-700 sm:text-base">{subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={primary.to} className="btn-dark">{primary.label}</Link>
            {secondary && <Link to={secondary.to} className="btn-ghost">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', alternateName: 'VETHY Auto Parts', url: 'https://www.vethy.com.cn', logo: 'https://www.vethy.com.cn/logo.png', sameAs: ['https://www.cooldrivepro.com'], address: { '@type': 'PostalAddress', addressLocality: 'Qingdao', addressRegion: 'Shandong', addressCountry: 'CN' }, contactPoint: [{ '@type': 'ContactPoint', email: 'sales@vethy.com.cn', contactType: 'sales', areaServed: 'Worldwide', availableLanguage: ['English','Spanish','Russian','Arabic','Portuguese','French','German','Chinese'] }] },
    { '@context': 'https://schema.org', '@type': 'WebSite', url: 'https://www.vethy.com.cn', name: 'VETHY Auto Parts', inLanguage: ['en','es','ru','ar','pt','fr','de'], potentialAction: { '@type': 'SearchAction', target: 'https://www.vethy.com.cn/products?q={query}', 'query-input': 'required name=query' } },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Auto parts categories', itemListElement: categories.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.vethy.com.cn/categories/${c.slug}`, name: c.name })) },
  ];

  return (
    <>
      <SEO
        title="VETHY Auto Parts | Wholesale Auto Spare Parts Manufacturer & Exporter from China"
        description="VETHY is a Chinese auto parts manufacturer and wholesale exporter. Engine, brake, cooling, suspension, electrical, body, filter, transmission, truck and HVAC parts for the global aftermarket. FCL/LCL shipping from Qingdao to 60+ countries."
        path="/"
        keywords={['auto parts wholesale China', 'auto spare parts manufacturer', 'aftermarket auto parts exporter', 'OEM auto parts supplier', 'truck parts wholesale', 'wholesale auto parts catalog']}
        jsonLd={jsonLd}
      />

      <Panel
        eyebrow="VETHY · Wholesale Export"
        title={t('hero.title', 'Auto parts. Built for the world.')}
        subtitle={t('hero.subtitle', 'Eight thousand OE-quality SKUs across cars, trucks and commercial vehicles. Direct from Qingdao to sixty-plus countries.')}
        bg="/images/hero.svg"
        primary={{ to: '/contact', label: t('hero.cta_quote', 'Request a quote') }}
        secondary={{ to: '/categories', label: t('hero.cta_catalog', 'Browse catalog') }}
      />

      {[
        { slug: 'engine-parts', eyebrow: 'Engine parts', title: 'The heart of every vehicle.', sub: 'Pistons, gaskets, pumps, turbochargers and timing components built to OE specification.' },
        { slug: 'brake-system', eyebrow: 'Brake system', title: 'Stop with confidence.', sub: 'ECE R90 ceramic pads, ventilated discs and calipers for the global aftermarket.' },
        { slug: 'cooling-system', eyebrow: 'Cooling system', title: 'Run cool. Run further.', sub: 'CAB-brazed aluminum radiators, parallel-flow condensers and charge-air intercoolers.' },
        { slug: 'hvac-climate', eyebrow: 'HVAC & climate', title: 'Comfort, no idle.', sub: 'AC compressors, evaporators, blower motors and twelve- and twenty-four-volt parking air conditioners.' },
      ].map((c) => (
        <Panel
          key={c.slug}
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.sub}
          bg={`/images/category-${c.slug}.svg`}
          primary={{ to: `/categories/${c.slug}`, label: 'Explore' }}
          secondary={{ to: '/contact', label: 'Get a quote' }}
        />
      ))}

      {/* Full catalog tree — niparts-style comprehensive taxonomy */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow mb-3">Catalog</p>
              <h2 className="text-display-md text-ink-900">Ten categories.<br/>Sixty subcategories.<br/>Eight thousand SKUs.</h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-600">A complete aftermarket range built around the parts that global distributors, fleets and workshops actually consume. Filter by category or talk to sales for a consolidated container.</p>
              <Link to="/categories" className="btn-link mt-8">Browse full catalog →</Link>
            </div>
            <div className="grid gap-px bg-ink-200 sm:grid-cols-2">
              {categories.map((c) => (
                <Link key={c.slug} to={`/categories/${c.slug}`} className="group bg-white p-6 transition hover:bg-ink-050">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-[17px] font-medium text-ink-900">{c.name}</h3>
                    <span className="text-[11px] text-ink-500">{c.subcategories.length}</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-600">
                    {c.subcategories.slice(0, 4).map((s) => (
                      <li key={s.slug}>{s.name}</li>
                    ))}
                    {c.subcategories.length > 4 && <li className="text-ink-400">+{c.subcategories.length - 4}</li>}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-ink-050 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
            <div>
              <p className="eyebrow mb-3">Featured</p>
              <h2 className="text-display-md text-ink-900">Best-selling SKUs.</h2>
            </div>
            <Link to="/products" className="btn-link">View all products →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="group card">
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="card-img transition group-hover:opacity-90" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow">{p.category.replace(/-/g, ' ')}</p>
                  <h3 className="font-display text-[16px] font-medium text-ink-900">{p.name}</h3>
                  <p className="text-[12px] text-ink-500">MOQ {p.moq} · Lead time {p.leadTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global markets */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Global reach</p>
            <h2 className="text-display-md text-ink-900">Sixty countries. One supplier.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-600">From Qingdao to Los Angeles, Hamburg, Santos, Durban and Jebel Ali. FCL, LCL and rail freight to Central Asia.</p>
          </div>
          <div className="mt-16 grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="bg-white p-5 transition hover:bg-ink-050">
                <p className="eyebrow">{m.region}</p>
                <p className="mt-2 font-display text-[15px] font-medium text-ink-900">{m.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-ink-050 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
            <div>
              <p className="eyebrow mb-3">Insights</p>
              <h2 className="text-display-md text-ink-900">From the VETHY desk.</h2>
            </div>
            <Link to="/blog" className="btn-link">All articles →</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group card">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="card-img transition group-hover:opacity-90" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow">{p.category} · {p.date}</p>
                  <h3 className="font-display text-[17px] font-medium leading-snug text-ink-900">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page text-center">
          <h2 className="text-display-md text-ink-900 text-balance">Ready to source with VETHY?</h2>
          <p className="mt-5 max-w-xl mx-auto text-[15px] text-ink-600">Send your wishlist — we respond with a container-ready quote within one working day.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="btn-dark">Request a quote</Link>
            <Link to="/wholesale" className="btn-ghost">Wholesale program</Link>
          </div>
        </div>
      </section>
    </>
  );
}
