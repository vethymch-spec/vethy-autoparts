import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { markets } from '../data/markets';
import { blogPosts } from '../data/blog';

export default function Home() {
  const { t } = useTranslation();
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Qingdao VETHY Industrial Co., Ltd.',
      alternateName: 'VETHY Auto Parts',
      url: 'https://www.vethy.com.cn',
      logo: 'https://www.vethy.com.cn/logo.png',
      sameAs: ['https://www.cooldrivepro.com'],
      address: { '@type': 'PostalAddress', addressLocality: 'Qingdao', addressRegion: 'Shandong', addressCountry: 'CN' },
      contactPoint: [{ '@type': 'ContactPoint', email: 'sales@vethy.com.cn', contactType: 'sales', areaServed: 'Worldwide', availableLanguage: ['English','Spanish','Russian','Arabic','Portuguese','French','German','Chinese'] }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://www.vethy.com.cn',
      name: 'VETHY Auto Parts',
      inLanguage: ['en','es','ru','ar','pt','fr','de'],
    },
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(800px 400px at 80% 20%, #C8102E, transparent)' }} />
        <div className="container-page relative grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="mb-3 inline-block rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-light">Wholesale · Export · OEM</p>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-5 text-lg text-gray-300">{t('hero.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t('hero.cta_quote')}</Link>
              <Link to="/categories" className="btn-outline border-white text-white hover:bg-white hover:text-ink-900">{t('hero.cta_catalog')}</Link>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-6">
              <Stat n="8000+" l={t('stats.skus')} />
              <Stat n="60+" l={t('stats.countries')} />
              <Stat n="15+" l={t('stats.years')} />
              <Stat n="20pcs" l={t('stats.moq')} />
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((c) => (
                <Link key={c.slug} to={`/categories/${c.slug}`} className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="text-xs uppercase tracking-wider text-brand-light">{c.subcategories.length} subcategories</div>
                  <div className="mt-1 font-display font-bold text-white group-hover:text-brand-light">{c.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-20">
        <SectionHeader title={t('sections.categories')} subtitle={t('sections.categories_sub')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} to={`/categories/${c.slug}`} className="card group">
              <h3 className="font-display text-xl font-bold text-ink-900 group-hover:text-brand">{c.name}</h3>
              <p className="mt-2 text-sm text-ink-500">{c.intro}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.subcategories.slice(0, 3).map((s) => (
                  <span key={s.slug} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-ink-700">{s.name}</span>
                ))}
                {c.subcategories.length > 3 && <span className="text-xs text-ink-500">+{c.subcategories.length - 3} more</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-gray-50">
        <div className="container-page py-20">
          <SectionHeader title={t('sections.featured')} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card group">
                <div className="text-xs uppercase tracking-wider text-brand">{p.category.replace('-', ' ')}</div>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900 group-hover:text-brand">{p.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.shortDescription}</p>
                <div className="mt-3 text-xs text-ink-700">MOQ: {p.moq}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why VETHY */}
      <section className="container-page py-20">
        <SectionHeader title={t('sections.why')} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Why icon="✓" title={t('why.quality')} desc={t('why.quality_desc')} />
          <Why icon="📦" title={t('why.moq_title')} desc={t('why.moq_desc')} />
          <Why icon="🚢" title={t('why.logistics')} desc={t('why.logistics_desc')} />
          <Why icon="⚙" title={t('why.oem')} desc={t('why.oem_desc')} />
        </div>
      </section>

      {/* Markets */}
      <section className="bg-gray-50">
        <div className="container-page py-20">
          <SectionHeader title={t('sections.markets')} />
          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-brand hover:shadow-sm">
                <div className="text-xs uppercase tracking-wider text-ink-500">{m.region}</div>
                <div className="font-semibold text-ink-900">{m.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="container-page py-20">
        <SectionHeader title={t('sections.blog')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="card group">
              <div className="text-xs uppercase tracking-wider text-brand">{p.category}</div>
              <h3 className="mt-2 font-display text-lg font-bold text-ink-900 group-hover:text-brand">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-extrabold text-white">{n}</div>
      <div className="text-xs text-gray-400">{l}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-ink-500">{subtitle}</p>}
    </div>
  );
}

function Why({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 font-display text-lg font-bold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-500">{desc}</p>
    </div>
  );
}
