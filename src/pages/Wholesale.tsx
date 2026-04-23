import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const benefits = [
  { title: 'Container-load pricing', body: 'FCL discounts on 20ft and 40ft loads. Mixed pallets across categories on a single B/L.' },
  { title: 'Low MOQ on consolidated orders', body: 'From 20 pcs per SKU when consolidated within a container. Perfect for distributors testing new lines.' },
  { title: 'Custom OEM packaging', body: 'Your brand, your color, your barcode. Free design support on orders above 1×40HQ.' },
  { title: 'Door-to-door logistics', body: 'FCL, LCL, sea-rail to Central Asia, and air freight options. Full export documentation included.' },
  { title: 'Quality assurance', body: 'IATF 16949 facility, ECE R90 brake pads, ISO/CE certifications. Pre-shipment inspection on every container.' },
  { title: 'Long-term partnership', body: 'Dedicated account manager, quarterly market briefings, and exclusive territory protection on flagship lines.' },
];

export default function Wholesale() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'VETHY Wholesale Auto Parts Program', provider: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.' }, areaServed: 'Worldwide', serviceType: 'Wholesale auto parts export' };
  return (
    <>
      <SEO
        title="Wholesale Auto Parts Program | VETHY Container Export from China"
        description="VETHY wholesale program: container-load pricing, low MOQ on consolidated orders, custom OEM packaging, door-to-door logistics, IATF 16949 / ECE R90 certifications. Built for global distributors."
        path="/wholesale"
        keywords={['wholesale auto parts program', 'auto parts container export', 'OEM packaging auto parts', 'auto parts MOQ wholesale', 'China auto parts distributor']}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Wholesale</span></nav>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col justify-end">
              <p className="eyebrow mb-3">Wholesale</p>
              <h1 className="text-display-lg text-ink-900 text-balance">Container loads.<br/>Built for distributors.</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">A wholesale program engineered around the realities of the global aftermarket — from 20ft trial loads to multi-container monthly programs.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-dark">Request catalog</Link>
                <Link to="/products" className="btn-ghost">Browse products</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
              <img src="/images/banner-wholesale.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white p-8">
                <h3 className="font-display text-[18px] font-medium text-ink-900">{b.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-050 py-20 text-center">
        <div className="container-page">
          <h2 className="text-display-sm text-ink-900 text-balance">Send your wishlist. We'll send a quote.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="btn-dark">Request catalog</Link>
            <Link to="/categories" className="btn-ghost">Browse categories</Link>
          </div>
        </div>
      </section>
    </>
  );
}
