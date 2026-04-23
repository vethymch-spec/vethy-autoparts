import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About VETHY | Qingdao Auto Parts Manufacturer & Wholesale Exporter"
        description="VETHY is a Qingdao-based auto parts manufacturer and wholesale exporter founded on engineering rigor, OE quality, and global service. Learn about our consolidation warehouse, certifications and team."
        path="/about"
        keywords={['about VETHY', 'Qingdao auto parts factory', 'Chinese auto parts manufacturer', 'China auto parts exporter']}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">About</span></nav>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col justify-end">
              <p className="eyebrow mb-3">About</p>
              <h1 className="text-display-lg text-ink-900 text-balance">Engineered in Qingdao.<br/>Trusted worldwide.</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">A decade of building reliable wholesale supply chains for distributors, fleets and workshops across sixty-plus countries.</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
              <img src="/images/banner-about.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-narrow space-y-16">
          <Block title="Who we are" body="Qingdao VETHY Industrial Co., Ltd. is an aftermarket auto parts manufacturer and exporter founded by a team of automotive engineers. We design, source and quality-control over 8,000 SKUs across ten core categories — engine, brake, cooling, electrical, suspension, body, filtration, transmission, truck and HVAC." />
          <Block title="What we believe" body="Three principles drive every shipment. OE-equivalent quality on every SKU we ship. Transparent specifications and clear lead times. Long-term supply partnerships, not one-off transactions." />
          <Block title="How we ship" body="From our consolidation warehouse in Qingdao, we serve global wholesalers with FCL and LCL container loads, mixed-SKU pallets, custom OEM packaging, barcoding, and full export documentation. Lead times typically run 15–35 days depending on category." />
        </div>
      </section>

      <section className="bg-ink-050 py-20 text-center">
        <div className="container-page">
          <h2 className="text-display-sm text-ink-900 text-balance">Build your aftermarket business on a supplier you can count on.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="btn-dark">Talk to sales</Link>
            <Link to="/wholesale" className="btn-ghost">Wholesale program</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <p className="text-[18px] leading-[1.75] text-ink-800">{body}</p>
    </div>
  );
}
