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
  align?: 'top' | 'bottom';
}

function Panel({ eyebrow, title, subtitle, bg, primary, secondary, align = 'top' }: PanelProps) {
  return (
    <section className="panel">
      <img src={bg} alt="" className="panel-bg" loading="lazy" />
      <div className="absolute inset-x-0 top-0 z-[1] h-1/2" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))' }} />
      {align === 'top' ? (
        <>
          <div className="panel-content animate-fade-up">
            <p className="eyebrow-light mb-4">{eyebrow}</p>
            <h2 className="text-display-lg text-balance">{title}</h2>
            {subtitle && <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{subtitle}</p>}
          </div>
          <div className="panel-actions">
            <Link to={primary.to} className="btn-pill-light">{primary.label}</Link>
            {secondary && <Link to={secondary.to} className="btn-pill-ghost">{secondary.label}</Link>}
          </div>
        </>
      ) : (
        <>
          <div className="panel-content pt-[24vh] sm:pt-[20vh]">
            <p className="eyebrow-light mb-4">{eyebrow}</p>
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-5 pb-[14vh] text-center">
            <h2 className="text-display-lg text-balance">{title}</h2>
            {subtitle && <p className="mt-5 text-base text-white/80 sm:text-lg">{subtitle}</p>}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to={primary.to} className="btn-pill-light">{primary.label}</Link>
              {secondary && <Link to={secondary.to} className="btn-pill-ghost">{secondary.label}</Link>}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', alternateName: 'VETHY Auto Parts', url: 'https://www.vethy.com.cn', logo: 'https://www.vethy.com.cn/logo.png', sameAs: ['https://www.cooldrivepro.com'], address: { '@type': 'PostalAddress', addressLocality: 'Qingdao', addressRegion: 'Shandong', addressCountry: 'CN' }, contactPoint: [{ '@type': 'ContactPoint', email: 'sales@vethy.com.cn', contactType: 'sales', areaServed: 'Worldwide', availableLanguage: ['English','Spanish','Russian','Arabic','Portuguese','French','German','Chinese'] }] },
    { '@context': 'https://schema.org', '@type': 'WebSite', url: 'https://www.vethy.com.cn', name: 'VETHY Auto Parts', inLanguage: ['en','es','ru','ar','pt','fr','de'] },
  ];

  return (
    <>
      <SEO
        title="VETHY Auto Parts | Wholesale Auto Spare Parts Manufacturer & Exporter from China"
        description="VETHY is a leading Chinese auto parts manufacturer and wholesale exporter. Engine, brake, cooling, suspension, electrical, body parts and consumables for cars, trucks and commercial vehicles. Global FCL/LCL shipping from Qingdao."
        path="/"
        keywords={['auto parts wholesale China', 'auto spare parts manufacturer', 'aftermarket auto parts exporter', 'OEM auto parts supplier', 'truck parts wholesale']}
        jsonLd={jsonLd}
      />

      <Panel
        eyebrow="VETHY · Wholesale Export"
        title={t('hero.title', 'Auto parts. Built for the world.')}
        subtitle={t('hero.subtitle', '8000+ OE-quality SKUs across cars, trucks and commercial vehicles. Direct from Qingdao to 60+ countries.')}
        bg="/images/hero.svg"
        primary={{ to: '/contact', label: t('hero.cta_quote', 'Request a quote') }}
        secondary={{ to: '/categories', label: t('hero.cta_catalog', 'Browse catalog') }}
        align="bottom"
      />

      {[
        { slug: 'engine-parts', eyebrow: 'Engine', title: 'The heart of every vehicle.', sub: 'Pistons, gaskets, pumps, turbos — built to OE specification.' },
        { slug: 'brake-system', eyebrow: 'Brake System', title: 'Stop with confidence.', sub: 'ECE R90 ceramic pads, rotors and calipers for global aftermarket.' },
        { slug: 'cooling-system', eyebrow: 'Cooling', title: 'Run cool. Run further.', sub: 'CAB-brazed aluminum radiators, condensers and intercoolers.' },
        { slug: 'hvac-climate', eyebrow: 'Parking AC & HVAC', title: 'Comfort, no idle.', sub: '12V/24V parking air conditioners for trucks, RVs and vans.' },
      ].map((c, i) => (
        <Panel
          key={c.slug}
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.sub}
          bg={`/images/category-${c.slug}.svg`}
          primary={{ to: `/categories/${c.slug}`, label: 'Learn more' }}
          secondary={{ to: '/contact', label: 'Get a quote' }}
          align={i % 2 === 0 ? 'bottom' : 'top'}
        />
      ))}

      <Panel
        eyebrow="Wholesale"
        title="Container loads. Mixed pallets. OEM packaging."
        subtitle="MOQ from 20pcs per SKU on consolidated orders. Custom packaging, barcoding and door-to-door shipping."
        bg="/images/banner-wholesale.svg"
        primary={{ to: '/wholesale', label: 'Wholesale program' }}
        secondary={{ to: '/contact', label: 'Talk to sales' }}
        align="top"
      />

      <Panel
        eyebrow="Global"
        title="Shipping to 60+ countries."
        subtitle="From Qingdao to Los Angeles, Hamburg, Santos, Durban, Jebel Ali and beyond. FCL, LCL and rail to Central Asia."
        bg="/images/market-united-states.svg"
        primary={{ to: '/markets', label: 'See markets' }}
        align="bottom"
      />

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Featured</p>
            <h2 className="text-display-md">Best-selling SKUs.</h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">Eight of our most-requested parts across global markets.</p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p, i) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className={i < 2 ? 'group tile sm:col-span-2' : 'group tile'}>
                <img src={`/images/product-${p.slug}.svg`} alt={p.name} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{p.category.replace(/-/g, ' ')}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">{p.name}</h3>
                </div>
                <div className="tile-foot">
                  <span className="text-[13px] font-medium text-white/80">MOQ {p.moq} →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-pill-light">View all products</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Catalog</p>
            <h2 className="text-display-md text-ink-900">Ten categories. Sixty subcategories.</h2>
          </div>
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.slug} to={`/categories/${c.slug}`} className="group rounded-2xl bg-white p-7 transition hover:shadow-lg">
                <h3 className="font-display text-xl font-bold text-ink-900 group-hover:text-brand">{c.name}</h3>
                <p className="mt-2 text-[13px] text-ink-500 line-clamp-2">{c.intro}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-700">{c.subcategories.length} subcategories →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Reach</p>
            <h2 className="text-display-md text-ink-900">Where we ship.</h2>
          </div>
          <div className="mt-16 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="group rounded-2xl border border-black/[0.08] p-5 transition hover:border-black/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{m.region}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-900 group-hover:text-brand">{m.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3">Insights</p>
            <h2 className="text-display-md">From the VETHY desk.</h2>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group tile">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{p.category}</p>
                </div>
                <div className="tile-foot">
                  <h3 className="font-display text-lg font-bold leading-tight text-white">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
