import { SEO } from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About VETHY | Chinese Auto Parts Manufacturer & Exporter"
        description="VETHY (Qingdao VETHY Industrial Co., Ltd.) is a Chinese manufacturer and wholesale exporter of automotive parts and HVAC components, serving distributors, workshops and fleets in 60+ countries."
        path="/about"
        keywords={['about VETHY', 'Chinese auto parts manufacturer', 'auto parts exporter Qingdao']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">About VETHY</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Qingdao VETHY Industrial Co., Ltd. is a manufacturer and global exporter of automotive parts and HVAC components, headquartered in Qingdao, Shandong, China.</p>
        </div>
      </section>
      <section className="container-page py-16 max-w-3xl space-y-8 text-ink-700 leading-relaxed">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">What we do</h2>
          <p className="mt-3">VETHY supplies wholesale auto parts across 10 categories — engine, brake, cooling, suspension, electrical & lighting, body parts, filters & consumables, transmission, truck & commercial, and HVAC — to distributors, workshops and fleets in over 60 countries.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Quality</h2>
          <p className="mt-3">Our supplier base is anchored in IATF 16949 and ISO 9001 quality systems. Regulated categories carry ECE R90 (brake friction), ECE R112 / DOT (lighting) and E-mark approvals as relevant.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Logistics</h2>
          <p className="mt-3">All shipments leave from Qingdao Port with direct sailings to Los Angeles, Hamburg, Santos, Durban, Jebel Ali and 30+ other global ports. We consolidate mixed SKUs into 20'/40' containers and offer LCL groupage for new buyers.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Brands</h2>
          <p className="mt-3">VETHY operates the global parking AC brand <a href="https://www.cooldrivepro.com" target="_blank" rel="noopener">CoolDrivePro</a>, recognised among long-haul truck distributors in North America, Europe, Latin America and the Middle East.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Contact</h2>
          <p className="mt-3">sales@vethy.com.cn — replies in one business day in English, Spanish, Russian, Arabic, Portuguese, French and German.</p>
        </div>
      </section>
    </>
  );
}
