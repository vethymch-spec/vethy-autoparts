// SEO blog seed posts — long-form content for GEO + AI Overviews citations.
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  keywords: string[];
  content: { heading: string; body: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-import-auto-parts-from-china',
    title: 'How to Import Auto Parts from China: 2026 Wholesale Buyer Guide',
    excerpt: 'A practical, fully sourced guide for international distributors on sourcing OE-quality auto parts from China — covering supplier vetting, MOQ negotiation, payment terms, certification, shipping and customs.',
    date: '2026-04-10',
    category: 'sourcing',
    keywords: ['import auto parts from China', 'China auto parts wholesale guide', 'OEM auto parts supplier China'],
    content: [
      { heading: 'Why China dominates global auto parts manufacturing', body: 'China produces an estimated 70%+ of the worldвЂ™s aftermarket auto parts by volume, anchored by mature industrial clusters in Shandong (radiators, condensers, parking AC), Zhejiang (filters, brake parts), Guangdong (electronics, lighting) and Hebei (fasteners, suspension). For wholesale buyers, this concentration means you can source virtually every line item from one country, but it also means supplier quality varies dramatically. The right vetting process is what separates a profitable container from an expensive lesson.' },
      { heading: 'Step 1: Define your SKU list and target OE references', body: 'Start from your top 20 fastest-moving SKUs and pull the OE numbers from your existing catalog or VIN-decoder lookup. Suppliers who specialise in your platform mix (e.g. European, Japanese, Korean, American) will quote faster and ship more accurate fitment than generalists.' },
      { heading: 'Step 2: Vet the supplier', body: 'Look for IATF 16949 (automotive quality), ISO 9001 (general quality), and product-specific marks: ECE R90 for brake pads, ECE R112 / DOT for headlights, E-mark for trailers. Always request a recent business license, an export licence and at least three reference customers in your region. Video-tour the factory if possible.' },
      { heading: 'Step 3: Negotiate MOQ, packaging and lead time', body: 'Typical wholesale MOQs in 2026: 50 sets for compressors and radiators, 200-500 pcs for shock absorbers and brake pads, 1000+ pcs for filters and bulbs. Always specify packaging (color box vs. brown master carton), pallet/crate fumigation, and SKU-level barcoding в€’ this is what makes goods retail-ready on arrival.' },
      { heading: 'Step 4: Payment terms and risk control', body: 'A common structure is 30% TT deposit + 70% against B/L copy. Letters of credit are routine for first orders above USD 50k. Always run a one-time supplier audit through Sinosure or a third-party agency before signing.' },
      { heading: 'Step 5: Shipping & customs', body: 'Most VETHY containers leave from Qingdao Port. Transit times: ~25 days to LA, ~32 days to Hamburg, ~38 days to Santos, ~45 days to Durban. Consolidate small orders via LCL groupage; build to FCL once you exceed 8-10 CBM per supplier per month.' },
    ],
  },
  {
    slug: 'oem-vs-aftermarket-vs-genuine-parts',
    title: 'OEM vs Aftermarket vs Genuine Parts: What Wholesale Buyers Need to Know',
    excerpt: 'A clear breakdown of OEM, OES, aftermarket and genuine parts, with practical guidance on which tier to stock for which channel.',
    date: '2026-04-12',
    category: 'sourcing',
    keywords: ['OEM vs aftermarket parts', 'genuine vs OEM parts', 'aftermarket auto parts quality'],
    content: [
      { heading: 'Definitions that actually hold up in the supply chain', body: 'Genuine parts are produced for and sold by the vehicle manufacturer in OE-branded packaging. OEM parts are the same physical parts produced by the same Tier-1 supplier but sold without the OE brand. OES (original equipment service) is the OEвЂ™s spare parts division. Aftermarket parts are produced independently for the replacement market, with a quality range from premium-equivalent down to bargain-bin.' },
      { heading: 'Where each tier fits in your channel mix', body: 'Genuine: dealer networks and high-end fleets that need warranty alignment. OEM: specialist independent workshops, premium e-commerce. OES: mid-market workshops. Aftermarket premium (IATF 16949, ECE R90, etc.): mainstream independent workshops, big-box retail, fleets focused on TCO. Aftermarket value: high-volume retail and emerging-market export.' },
      { heading: 'The certifications that prove the quality claim', body: 'Donвђ™t take supplier claims at face value. Insist on certificate copies that you can independently verify: IATF 16949 (Bureau Veritas, TÜV, etc. for the cert body), ECE R90 (issued by an EU type-approval authority), ECE R112 / R113 for lighting, E-mark numbering, and material test reports for cast iron and aluminum components.' },
    ],
  },
  {
    slug: 'how-to-choose-truck-radiator-supplier',
    title: 'How to Choose a Heavy Duty Truck Radiator Supplier (2026)',
    excerpt: 'Selection criteria for truck radiator OEM and aftermarket sourcing — including core construction, OE references and pressure-test standards.',
    date: '2026-04-14',
    category: 'truck-parts',
    keywords: ['truck radiator supplier', 'heavy duty radiator manufacturer', 'aluminum truck radiator wholesale'],
    content: [
      { heading: 'Construction matters more than the bill of materials line', body: 'CAB (controlled-atmosphere brazing) aluminum cores deliver higher heat rejection per gram and lower failure rates than mechanically-assembled copper-brass on most modern HD platforms. For Sinotruk HOWO, Shacman X3000 and Volvo FH/FM, CAB-brazed aluminum is now the de facto standard.' },
      { heading: 'Pressure & leak test standards', body: 'A serious supplier will pressure-test every unit to at least 1.5 bar with a < 0.5 cc/min leak rate, and will share the test log on request. Walk away from any supplier that cannot.' },
      { heading: 'OE-reference depth signals real expertise', body: 'Ask for the full OE cross-reference for your platforms (e.g. WG9112530233 for HOWO). A supplier with thousands of cross-references and active production for OE customers is dramatically less risky than a generalist.' },
    ],
  },
  {
    slug: 'parking-air-conditioner-truck-buyers-guide',
    title: 'Parking Air Conditioner for Trucks: 2026 Wholesale Buyer Guide',
    excerpt: 'A complete guide to specifying, sourcing and reselling battery-powered sleeper-truck parking AC — covering cooling capacity, runtime, install and homologation.',
    date: '2026-04-16',
    category: 'truck-parts',
    keywords: ['parking air conditioner wholesale', 'truck sleeper AC supplier', 'battery parking AC exporter'],
    content: [
      { heading: 'What problem the parking AC actually solves', body: 'Long-haul drivers must rest in compliance with HOS / EU drive-time regulations, often in summer temperatures of 35-45 °C. Idling the main engine for HVAC burns 3-4 L/h of diesel, accelerates engine wear and is increasingly restricted by anti-idle regulations across the U.S., EU and China.' },
      { heading: 'Sizing: cooling capacity vs. cabin volume', body: 'For typical Class-8 sleeper cabins of 6-9 m³: 2200W is entry-level, 2700W is the global mainstream, and 3500W suits hot-climate fleets in the Middle East, Brazil and Australia. Match cooling capacity to the worst-case ambient temperature in your market.' },
      { heading: 'Runtime: itвЂ™s really a battery question', body: 'A 2700W parking AC running on a 4Г—12V/200Ah AGM bank delivers about 8-10 hours of cooling в€’ enough for a regulated rest. Lithium banks extend this by 30-50% with significantly less weight and longer cycle life.' },
      { heading: 'VETHY parking AC product line', body: 'VETHY markets parking AC globally under the CoolDrivePro brand, with split, rooftop and battery-bank-integrated options across 12V and 24V. See our truck-commercial / parking-ac category for full specs.' },
    ],
  },
  {
    slug: 'auto-parts-export-trends-2026',
    title: 'Global Auto Parts Export Trends 2026: What Wholesale Importers Should Watch',
    excerpt: 'Top demand-side trends for the global auto parts aftermarket in 2026 — EV thermal management, parking AC growth, vehicle parc aging and channel shifts toward digital procurement.',
    date: '2026-04-18',
    category: 'market-insights',
    keywords: ['auto parts export trends 2026', 'aftermarket auto parts market', 'EV thermal management parts'],
    content: [
      { heading: 'EV thermal management is the fastest-growing line item', body: 'EV-specific thermal management components в€’ chillers, electric water pumps, refrigerant valves and battery cold-plates в€’ are growing 25-30% YoY in the aftermarket as the global EV parc passes 75 million vehicles. Distributors who add these SKUs early will capture disproportionate share.' },
      { heading: 'The aging parc keeps brakes, filters and suspension growing', body: 'Average vehicle age in the U.S. is now 12.7 years and rising in Europe and Latin America. This drives sustained double-digit growth in brake friction, filtration, suspension and lighting в€’ all VETHY core categories.' },
      { heading: 'Anti-idle and HOS regulation drive parking AC adoption', body: 'New anti-idle ordinances across the U.S., EU and Latin American capitals are accelerating parking AC retrofits in Class-7/8 trucks and sleeper coaches, growing the global parking AC market at a 14-18% CAGR.' },
      { heading: 'Procurement is going digital в€’ and going English', body: 'Buyers increasingly start with English-language Google search before contacting a supplier. Wholesalers who invest in deep, sourced, multilingual product content (not just thin catalog pages) are winning the 2026 procurement funnel в€’ which is exactly why this site exists.' },
    ],
  },
];

export const findPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
