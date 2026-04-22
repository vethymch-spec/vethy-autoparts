import { SEO } from '../components/SEO';
import { RFQForm } from '../components/RFQForm';

export default function Wholesale() {
  return (
    <>
      <SEO
        title="Wholesale Program | VETHY Auto Parts Distributor Partnership"
        description="Become a VETHY wholesale partner. OEM/ODM, custom packaging, distributor pricing, container consolidation and exclusive territory programs available."
        path="/wholesale"
        keywords={['wholesale auto parts program', 'auto parts distributor partnership', 'OEM ODM auto parts']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Wholesale Program</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Built for distributors, importers, e-commerce sellers and fleet workshops who want to source directly from a Chinese manufacturer with stable quality and predictable lead times.</p>
        </div>
      </section>
      <section className="container-page py-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8 text-ink-700 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Distributor pricing</h2>
            <p className="mt-2">Tiered distributor pricing based on annual volume commitment. Mix-container friendly — combine SKUs across all 10 categories.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">OEM & ODM service</h2>
            <p className="mt-2">Custom packaging, brand printing, color box design and bespoke product engineering. Minimum OEM run from 500 sets per SKU.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Exclusive territory</h2>
            <p className="mt-2">Eligible distributors can apply for exclusive territory rights for selected product lines (parking AC, truck radiators, brake friction).</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Drop-ship & 3PL warehousing</h2>
            <p className="mt-2">Bonded warehouse in Qingdao plus partner 3PL nodes in Los Angeles, Hamburg and Dubai for high-velocity SKUs.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">Documentation</h2>
            <p className="mt-2">Full export documentation: commercial invoice, packing list, B/L, COO, Form A / Form E / Form F where applicable, MSDS and CE / DOT / ECE certificates.</p>
          </div>
        </div>
        <RFQForm />
      </section>
    </>
  );
}
