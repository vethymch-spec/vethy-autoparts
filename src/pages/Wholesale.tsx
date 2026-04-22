import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const benefits = [
  { title: 'Container-load pricing', body: 'FCL discounts on 20ft and 40ft loads. Mixed pallets across categories on a single B/L.' },
  { title: 'Low MOQ on consolidated orders', body: 'From 20pcs per SKU when consolidated within a container. Perfect for distributors testing new lines.' },
  { title: 'Custom OEM packaging', body: 'Your brand, your color, your barcode. Free design support on orders above 1×40HQ.' },
  { title: 'Door-to-door logistics', body: 'FCL, LCL, sea–rail to Central Asia, and air freight options. Full export documentation included.' },
  { title: 'Quality assurance', body: 'IATF 16949 facility, ECE R90 brake pads, ISO/CE certifications. Pre-shipment inspection on every container.' },
  { title: 'Long-term partnership', body: 'Dedicated account manager, quarterly market briefings, and exclusive territory protection on flagship lines.' },
];

export default function Wholesale() {
  return (
    <>
      <SEO
        title="Wholesale Auto Parts Program | VETHY Container Export"
        description="VETHY wholesale program: container-load pricing, low MOQ on consolidated orders, custom OEM packaging, door-to-door logistics, IATF/ECE certifications. Built for global distributors."
        path="/wholesale"
        keywords={['wholesale auto parts program', 'auto parts container export', 'OEM packaging auto parts', 'auto parts MOQ wholesale']}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/banner-wholesale.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">Wholesale</p>
          <h1 className="text-display-lg text-balance">Container loads. Built for distributors.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">A wholesale program engineered around the realities of the global aftermarket — from 20ft trial loads to multi-container monthly programs.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl bg-[#f5f5f7] p-8">
                <h3 className="font-display text-xl font-bold text-ink-900">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page text-center">
          <p className="eyebrow-light mb-4">Get started</p>
          <h2 className="text-display-md text-balance">Send your wishlist. We'll send a quote.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="btn-pill-light">Request catalog</Link>
            <Link to="/products" className="btn-pill-ghost">Browse products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
