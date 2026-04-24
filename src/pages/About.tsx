import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function About() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About VETHY', url: 'https://www.vethy.com.cn/about' };
  return (
    <>
      <SEO title="About VETHY | Wholesale Auto Parts Manufacturer in Qingdao, China" description="VETHY is a Qingdao-based auto parts manufacturer and exporter shipping wholesale OE-quality parts to 60+ countries. Sister brand of CoolDrivePro parking AC." path="/about" keywords={['about VETHY', 'Qingdao auto parts manufacturer', 'China auto parts exporter']} jsonLd={jsonLd} />

      <section className="bg-brand text-white">
        <div className="container-page py-12">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">About</span></nav>
          <h1 className="mt-3 text-display-lg text-balance">A Qingdao factory, built around the wholesale buyer.</h1>
          <p className="mt-4 max-w-2xl text-[15px] text-white/85">VETHY supplies OE-quality auto parts and parking AC systems to distributors, fleets and workshops in 60+ countries — fast quotes, mixed-pallet containers and OEM packaging from day one.</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Company</p>
            <h2 className="text-display-sm text-ink-900">From a single product line to 8,000 SKUs.</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>VETHY started as the export arm of CoolDrivePro — a parking AC manufacturer trusted by fleets across North America, Europe and the Middle East. As our customers asked for more SKUs to fill their containers, we extended into brakes, cooling, lighting, suspension, body parts and HVAC.</p>
              <p>Today, the same Qingdao factory and consolidation warehouse ships ten categories and over eight thousand SKUs, bundled into mixed-pallet containers that match each distributor's regional demand.</p>
              <p>We work under IATF 16949, with category-specific certifications (ECE R90 brake pads, E-mark lighting). Every order is supported by a dedicated account manager in your time zone.</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-start text-center">
            {[
              ['8,000+', 'Active SKUs'],
              ['60+', 'Countries served'],
              ['25–35', 'Days lead time'],
              ['IATF 16949', 'Quality system'],
            ].map(([k, v]) => (
              <div key={v} className="rounded-lg border border-ink-200 bg-ink-050 p-6">
                <dt className="font-display text-[28px] font-bold text-brand">{k}</dt>
                <dd className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-ink-500">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink-050 py-14">
        <div className="container-page">
          <p className="eyebrow mb-2 text-center">What makes us different</p>
          <h2 className="text-display-sm text-ink-900 text-center">Wholesale operations, not just a catalog.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              ['Mixed-pallet container', 'One container, multiple categories — combine fast-moving SKUs across brakes, lighting, cooling and HVAC into a single shipment.'],
              ['OEM packaging from MOQ 1', 'Color box, barcode, manual translation and master-carton printing — free on 40HQ+ orders.'],
              ['Account manager in your time zone', 'English, Spanish, Russian, Arabic, Portuguese, French and German support during your business hours.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-lg border border-ink-200 bg-white p-6">
                <h3 className="font-display text-[16px] font-bold text-ink-900">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="container-page py-14 text-center">
          <h2 className="text-display-sm">Ready to start a container?</h2>
          <Link to="/contact" className="btn-accent mt-6">Request a quote</Link>
        </div>
      </section>
    </>
  );
}
