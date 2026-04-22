import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { markets, findMarket } from '../data/markets';
import { categories } from '../data/categories';

export function MarketsIndex() {
  return (
    <>
      <SEO
        title="Global Auto Parts Export Markets | VETHY Wholesale"
        description="VETHY ships wholesale auto parts to 60+ countries: USA, Russia, UAE, Brazil, Mexico, South Africa, Germany, Saudi Arabia, Australia and more. FCL/LCL container shipping from Qingdao."
        path="/markets"
        keywords={['auto parts export markets', 'wholesale auto parts global', 'auto parts shipping worldwide']}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/market-united-states.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">Markets</p>
          <h1 className="text-display-lg text-balance">Sixty countries. One supplier.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">From Qingdao to Los Angeles, Hamburg, Santos, Durban and Jebel Ali. FCL, LCL and rail freight to Central Asia.</p>
        </div>
      </section>

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="group tile">
                <img src={`/images/market-${m.slug}.svg`} alt={m.name} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{m.region}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-white">{m.name}</h2>
                </div>
                <div className="tile-foot">
                  <span className="text-[13px] font-medium text-white/80">View market →</span>
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
  if (!m) return <div className="container-page py-32">Market not found.</div>;
  return (
    <>
      <SEO
        title={`Wholesale Auto Parts ${m.name} | VETHY Export`}
        description={`${m.intro} Container-load wholesale shipping from China to ${m.name}.`}
        path={`/markets/${m.slug}`}
        keywords={[`auto parts ${m.name}`, `wholesale auto parts ${m.name}`, `import auto parts ${m.name}`]}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src={`/images/market-${m.slug}.svg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">{m.region}</p>
          <h1 className="text-display-lg text-balance">Wholesale auto parts in {m.name}.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{m.intro}</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Logistics</p>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Shipping & service</h2>
              <ul className="mt-6 space-y-4 text-base text-ink-700">
                {m.logistics.map((l) => (<li key={l} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />{l}</li>))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">In demand</p>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Popular categories</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {categories.filter((c) => m.popularCategories.includes(c.slug)).map((c) => (
                  <Link key={c.slug} to={`/categories/${c.slug}`} className="rounded-2xl border border-black/[0.08] p-5 transition hover:border-black/30">
                    <p className="font-display font-semibold text-ink-900">{c.name}</p>
                    <p className="mt-1 text-[12px] text-ink-500 line-clamp-2">{c.intro}</p>
                  </Link>
                ))}
              </div>
              <Link to="/contact" className="btn-pill-dark mt-10 inline-flex">Quote for {m.name}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
