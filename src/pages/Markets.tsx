import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { markets, findMarket } from '../data/markets';
import { categories } from '../data/categories';

export function MarketsIndex() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Export markets', itemListElement: markets.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://www.vethy.com.cn/markets/${m.slug}`, name: m.name })) };
  return (
    <>
      <SEO
        title="Global Auto Parts Export Markets | VETHY Wholesale Shipping to 60+ Countries"
        description="VETHY ships wholesale auto parts to USA, Russia, UAE, Brazil, Mexico, South Africa, Germany, Saudi Arabia, Australia, Kazakhstan and more. FCL, LCL, sea–rail. Full export documentation."
        path="/markets"
        keywords={['auto parts export markets', 'wholesale auto parts global', 'auto parts shipping worldwide', 'China auto parts export']}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Markets</span></nav>
          <p className="eyebrow mt-6 mb-3">Global reach</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">Sixty countries. One supplier.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">From Qingdao to Los Angeles, Hamburg, Santos, Durban and Jebel Ali. FCL, LCL and rail freight to Central Asia, with full export documentation included.</p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="group card">
                <img src={`/images/market-${m.slug}.svg`} alt={m.name} className="card-img transition group-hover:opacity-90" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow">{m.region}</p>
                  <h2 className="font-display text-[18px] font-medium text-ink-900">{m.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function MarketPage() {
  const { slug } = useParams();
  const m = findMarket(slug || '');
  if (!m) return <div className="container-page pt-32 pb-24">Market not found.</div>;

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Markets', item: 'https://www.vethy.com.cn/markets' },
      { '@type': 'ListItem', position: 3, name: m.name, item: `https://www.vethy.com.cn/markets/${m.slug}` },
    ]},
  ];

  return (
    <>
      <SEO
        title={`Wholesale Auto Parts ${m.name} | VETHY Export from China`}
        description={`${m.intro} Container-load wholesale shipping from China to ${m.name}, with local-market popular categories.`}
        path={`/markets/${m.slug}`}
        keywords={[`auto parts ${m.name}`, `wholesale auto parts ${m.name}`, `import auto parts ${m.name}`, `China auto parts ${m.name}`]}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500">
            <Link to="/" className="hover:text-ink-900">Home</Link> / <Link to="/markets" className="hover:text-ink-900">Markets</Link> / <span className="text-ink-900">{m.name}</span>
          </nav>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col justify-end">
              <p className="eyebrow mb-3">{m.region}</p>
              <h1 className="text-display-lg text-ink-900 text-balance">Wholesale auto parts in {m.name}.</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">{m.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-dark">Quote for {m.name}</Link>
                <Link to="/wholesale" className="btn-ghost">Wholesale program</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
              <img src={`/images/market-${m.slug}.svg`} alt={m.name} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Logistics</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">Shipping & service</h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-ink-700">{m.shipping}</p>
              <p className="mt-4 text-[14px] leading-[1.8] text-ink-600">Full export documentation (commercial invoice, packing list, B/L, CO) included. Custom OEM packaging with your brand and barcode available on container orders.</p>
            </div>
            <div>
              <p className="eyebrow mb-3">In demand</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">Popular categories</h2>
              <div className="mt-6 grid gap-px bg-ink-200 sm:grid-cols-2">
                {categories.filter((c) => m.popularCategories.includes(c.slug)).map((c) => (
                  <Link key={c.slug} to={`/categories/${c.slug}`} className="bg-white p-5 transition hover:bg-ink-050">
                    <p className="font-display font-medium text-ink-900">{c.name}</p>
                    <p className="mt-1 text-[12px] text-ink-500 line-clamp-2">{c.intro}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
