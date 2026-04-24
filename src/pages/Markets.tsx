import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { markets, findMarket } from '../data/markets';

export function MarketsIndex() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Global Markets', url: 'https://www.vethy.com.cn/markets' };
  return (
    <>
      <SEO title="Global Markets | VETHY Auto Parts Export to 60+ Countries" description="VETHY ships wholesale auto parts to 60+ countries. Browse market guides for the US, EU, Russia, Middle East, Africa, Latin America and Southeast Asia." path="/markets" keywords={['auto parts export', 'global auto parts wholesale', 'auto parts to USA', 'auto parts Europe wholesale']} jsonLd={jsonLd} />
      <section className="bg-brand text-white">
        <div className="container-page py-10">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Markets</span></nav>
          <h1 className="mt-3 text-display-lg">Global markets</h1>
          <p className="mt-2 max-w-2xl text-[14px] text-white/85">Container shipping from Qingdao to ports worldwide. FCL, LCL and rail freight.</p>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <Link key={m.slug} to={`/markets/${m.slug}`} className="card group">
              <img src={`/images/market-${m.slug}.svg`} alt={m.name} className="card-img" loading="lazy" />
              <div className="card-body">
                <p className="eyebrow-muted">{m.region}</p>
                <h2 className="font-display text-[16px] font-bold text-ink-900 group-hover:text-brand">{m.name}</h2>
                <p className="text-[12px] text-ink-600 line-clamp-2">{m.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function MarketPage() {
  const { slug } = useParams();
  const m = findMarket(slug || '');
  if (!m) return <div className="container-page py-24">Market not found.</div>;

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Markets', item: 'https://www.vethy.com.cn/markets' },
      { '@type': 'ListItem', position: 3, name: m.name, item: `https://www.vethy.com.cn/markets/${m.slug}` },
    ]},
  ];

  return (
    <>
      <SEO title={`Auto Parts Wholesale to ${m.name} | VETHY Export from China`} description={m.intro} path={`/markets/${m.slug}`} keywords={m.keywords} jsonLd={jsonLd} />
      <section className="bg-brand text-white">
        <div className="container-page py-10">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <Link to="/markets" className="hover:text-white">Markets</Link> / <span className="text-white">{m.name}</span></nav>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-wider text-white/80">{m.region}</p>
          <h1 className="mt-1 text-display-lg">Wholesale auto parts to {m.name}</h1>
          <p className="mt-3 max-w-2xl text-[14px] text-white/85">{m.intro}</p>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-2">Logistics</p>
            <h2 className="text-display-sm text-ink-900">Shipping & lead time</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{m.shipping}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
              <div className="rounded-md border border-ink-200 bg-ink-050 p-4"><p className="eyebrow-muted">Language</p><p className="mt-1 font-display text-[16px] font-bold text-ink-900 uppercase">{m.language}</p></div>
              <div className="rounded-md border border-ink-200 bg-ink-050 p-4"><p className="eyebrow-muted">Incoterms</p><p className="mt-1 font-display text-[16px] font-bold text-ink-900">FOB · CIF · DAP</p></div>
            </div>
            {m.popularCategories.length > 0 && (
              <>
                <p className="eyebrow mt-8 mb-2">Top categories</p>
                <div className="flex flex-wrap gap-2">
                  {m.popularCategories.map((c) => (
                    <Link key={c} to={`/categories/${c}`} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink-700 hover:border-brand hover:text-brand">{c.replace(/-/g, ' ')}</Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="rounded-lg border border-ink-200 bg-ink-050 p-6">
            <p className="font-display text-[18px] font-bold text-ink-900">Get a {m.name} quote</p>
            <p className="mt-2 text-[14px] text-ink-600">Send your SKU list or wishlist for a container-ready quote within 24 hours.</p>
            <Link to="/contact" className="btn-accent mt-5 w-full">Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
