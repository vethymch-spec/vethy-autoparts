import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About VETHY | Qingdao Auto Parts Manufacturer & Wholesale Exporter"
        description="VETHY is a Qingdao-based auto parts manufacturer and wholesale exporter founded on engineering rigor, OE quality, and global service. Learn about our factory, certifications and team."
        path="/about"
        keywords={['about VETHY', 'Qingdao auto parts factory', 'Chinese auto parts manufacturer']}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/banner-about.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">About</p>
          <h1 className="text-display-lg text-balance">Engineered in Qingdao. Trusted worldwide.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">A decade of building reliable wholesale supply chains for distributors, fleets and workshops across 60+ countries.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-narrow space-y-16">
          <Block title="Who we are" body="Qingdao VETHY Industrial Co., Ltd. is an aftermarket auto parts manufacturer and exporter founded by a team of automotive engineers. We design, source and quality-control over 8,000 SKUs across ten core categories — engine, brake, cooling, electrical, suspension, body, filtration, transmission, truck and HVAC." />
          <Block title="What we believe" body="Three principles drive every shipment. OE-equivalent quality on every SKU we ship. Transparent specifications and clear lead times. Long-term supply partnerships, not one-off transactions." />
          <Block title="How we ship" body="From our consolidation warehouse in Qingdao, we serve global wholesalers with FCL and LCL container loads, mixed-SKU pallets, custom OEM packaging, barcoding, and full export documentation. Lead times typically run 15–35 days depending on category." />
        </div>
      </section>

      <section className="bg-[#0a0c10] py-24 text-white sm:py-32">
        <div className="container-page text-center">
          <p className="eyebrow-light mb-4">Partner with VETHY</p>
          <h2 className="text-display-md text-balance">Build your aftermarket business on a supplier you can count on.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="btn-pill-light">Talk to sales</Link>
            <Link to="/wholesale" className="btn-pill-ghost">Wholesale program</Link>
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
      <p className="text-[19px] leading-[1.7] text-ink-700">{body}</p>
    </div>
  );
}
