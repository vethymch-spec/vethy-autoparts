import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { findMarket, markets } from '../data/markets';
import { findCategory } from '../data/categories';
import { RFQForm } from '../components/RFQForm';

export function MarketsIndex() {
  return (
    <>
      <SEO
        title="Markets We Serve | VETHY Wholesale Auto Parts Export"
        description="VETHY exports wholesale auto parts to 60+ countries — USA, Germany, Russia, Brazil, Mexico, UAE, South Africa, Kazakhstan, Chile, France, Spain and more."
        path="/markets"
        keywords={['auto parts export markets', 'wholesale auto parts countries', 'Chinese auto parts exporter']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Global Markets</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Direct sailings from Qingdao to 30+ ports. Local-language landing pages and shipping notes for every key market.</p>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <Link key={m.slug} to={`/markets/${m.slug}`} className="card group">
              <div className="text-xs uppercase tracking-wider text-brand">{m.region}</div>
              <h2 className="mt-2 font-display text-xl font-bold text-ink-900 group-hover:text-brand">{m.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">{m.intro}</p>
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
  if (!m) return <div className="container-page py-20">Market not found.</div>;

  return (
    <>
      <SEO
        title={`Wholesale Auto Parts for ${m.name} | VETHY Exporter`}
        description={m.intro}
        path={`/markets/${m.slug}`}
        keywords={m.keywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Wholesale auto parts export',
          areaServed: { '@type': 'Country', name: m.name },
          provider: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', url: 'https://www.vethy.com.cn' },
          description: m.intro,
        }}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <nav className="text-sm text-gray-400"><Link to="/markets" className="hover:text-white">Markets</Link> / <span className="text-white">{m.name}</span></nav>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Wholesale Auto Parts for {m.name}</h1>
          <p className="mt-3 max-w-3xl text-gray-300">{m.intro}</p>
        </div>
      </section>
      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Shipping & logistics</h2>
            <p className="mt-2 text-ink-700">{m.shipping}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Top-selling categories in {m.name}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {m.popularCategories.map((slug) => {
                const c = findCategory(slug);
                if (!c) return null;
                return (
                  <Link key={slug} to={`/categories/${slug}`} className="card">
                    <h3 className="font-display text-lg font-bold text-ink-900">{c.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-500">{c.intro}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Local search keywords</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.keywords.map((k) => (<li key={k} className="rounded-full bg-brand/10 px-3 py-1 text-xs text-brand-dark">{k}</li>))}
            </ul>
          </div>
        </div>
        <aside>
          <RFQForm />
        </aside>
      </section>
    </>
  );
}
