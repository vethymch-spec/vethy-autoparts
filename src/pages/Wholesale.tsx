import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function Wholesale() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Wholesale Program', url: 'https://www.vethy.com.cn/wholesale' };
  return (
    <>
      <SEO title="Wholesale Program | VETHY Auto Parts MOQ, Packaging & Shipping" description="VETHY's wholesale program: MOQ from 20 pcs on mixed containers, free OEM packaging on 40HQ orders, FCL/LCL/rail freight worldwide." path="/wholesale" keywords={['auto parts wholesale program', 'OEM packaging auto parts', 'mixed container auto parts']} jsonLd={jsonLd} />

      <section className="bg-brand text-white">
        <div className="container-page py-12">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Wholesale</span></nav>
          <h1 className="mt-3 text-display-lg text-balance">A wholesale program built for distributors, not for retail.</h1>
          <p className="mt-4 max-w-2xl text-[15px] text-white/85">Mixed-pallet containers, OEM packaging from your first order, and an account manager in your time zone.</p>
          <Link to="/contact" className="btn-accent mt-6">Request a quote</Link>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['MOQ', 'From 20 pcs per SKU on mixed containers; 500 pcs single-SKU.'],
            ['Lead time', '25–35 days typical; 3–7 days for stocked SKUs.'],
            ['Packaging', 'Color box, brown carton, or your full OEM design — free on 40HQ+.'],
            ['Shipping', 'FCL · LCL · Rail · Air. FOB Qingdao or DAP your warehouse.'],
            ['Payment', '30% TT + 70% against B/L copy. L/C accepted on orders > USD 50k.'],
            ['Quality', 'IATF 16949, ECE R90, E-mark, DOT — third-party inspection welcome.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-ink-200 bg-white p-6">
              <p className="eyebrow mb-2">{t}</p>
              <p className="text-[14px] leading-relaxed text-ink-700">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-050 py-14">
        <div className="container-page">
          <p className="eyebrow mb-2">How it works</p>
          <h2 className="text-display-sm text-ink-900">From RFQ to container in five steps</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['1', 'Send wishlist', 'SKU list, OE references or photos.'],
              ['2', 'Get quote', '< 24 hour FOB/CIF pricing.'],
              ['3', 'Sample', 'Optional sample run, photo & video QC.'],
              ['4', 'Production', '25–35 days under IATF 16949.'],
              ['5', 'Shipping', 'FCL/LCL/rail with full export docs.'],
            ].map(([n, t, d]) => (
              <li key={t} className="rounded-lg border border-ink-200 bg-white p-5">
                <p className="font-display text-[28px] font-bold text-accent">{n}</p>
                <p className="mt-2 font-display text-[15px] font-bold text-ink-900">{t}</p>
                <p className="mt-1 text-[12px] text-ink-600">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="container-page py-14 text-center">
          <h2 className="text-display-sm">Let's spec your first container.</h2>
          <Link to="/contact" className="btn-accent mt-6">Send your wishlist</Link>
        </div>
      </section>
    </>
  );
}
