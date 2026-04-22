// Featured products with rich SEO copy. Each maps to a category/subcategory.
export interface Product {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  highlights: string[];
  applications: string[];
  oeReferences?: string[];
  moq: string;
  packaging: string;
  leadTime: string;
  certifications: string[];
  keywords: string[];
}

export const products: Product[] = [
  {
    slug: 'ceramic-brake-pads-set',
    name: 'VETHY Ceramic Brake Pads Set (ECE R90)',
    category: 'brake-system',
    subcategory: 'brake-pads',
    shortDescription:
      'Low-noise, low-dust ceramic friction brake pad sets for global passenger car platforms — ECE R90 homologated for European aftermarket.',
    highlights: [
      'Ceramic friction formulation, < 70 dB noise',
      'ECE R90 homologation for EU aftermarket',
      'Stainless shim and chamfer/slot finishing',
      'Low rotor wear, < 1.5% dust generation',
    ],
    applications: ['Toyota Corolla / Camry', 'VW Golf / Jetta', 'Hyundai Elantra', 'Honda Civic / Accord', 'Ford Focus / Fiesta'],
    oeReferences: ['04465-02220', '04465-33450', '8W0698451', '58101-2HA00'],
    moq: '500 sets',
    packaging: 'Color box + master carton, customizable OEM packaging',
    leadTime: '25-35 days from PO',
    certifications: ['ECE R90', 'ISO 9001', 'IATF 16949'],
    keywords: ['ceramic brake pads wholesale', 'ECE R90 brake pads supplier', 'OEM brake pad manufacturer'],
  },
  {
    slug: 'aluminum-radiator-truck',
    name: 'VETHY Brazed Aluminum Truck Radiator',
    category: 'cooling-system',
    subcategory: 'radiators',
    shortDescription:
      'Heavy duty CAB-brazed aluminum radiators for HOWO, Sinotruk, Shacman, FAW, Volvo, MAN and Scania trucks.',
    highlights: [
      'CAB-brazed aluminum core for high heat rejection',
      'Plastic & all-aluminum tank options',
      'Pressure tested to 1.5 bar, leak rate < 0.5 cc/min',
      'Custom OE-matched configurations available',
    ],
    applications: ['HOWO A7 / T7H', 'Sinotruk Hohan', 'Shacman X3000', 'FAW J6', 'Volvo FH/FM', 'Scania R-series'],
    oeReferences: ['WG9112530233', 'WG9725530004', 'DZ95259533033'],
    moq: '50 units',
    packaging: 'Wooden crate / pallet, fumigation-ready',
    leadTime: '30-45 days from PO',
    certifications: ['IATF 16949', 'ISO 14001'],
    keywords: ['truck radiator wholesale', 'aluminum radiator manufacturer', 'HOWO Sinotruk radiator supplier'],
  },
  {
    slug: 'led-headlight-h4-h7',
    name: 'VETHY LED Headlight Bulbs H4 H7 H11',
    category: 'electrical-lighting',
    subcategory: 'headlights-tail-lights',
    shortDescription:
      'High-output CSP LED headlight bulbs, plug-and-play for global H4 / H7 / H11 / 9005 / 9006 sockets. ECE & DOT compliant.',
    highlights: [
      '12000 lumens per pair, 6500K cool white',
      '50,000-hour life, IP68 waterproof',
      'CANbus-ready, no error codes',
      'ECE R112 + DOT FMVSS 108 approval',
    ],
    applications: ['Universal fitment for H4 H7 H11 9005 9006'],
    moq: '300 pairs',
    packaging: 'Retail color box with bilingual manual',
    leadTime: '20-30 days from PO',
    certifications: ['ECE R112', 'DOT', 'CE', 'RoHS'],
    keywords: ['LED headlight bulb wholesale', 'H4 H7 LED supplier', 'CANbus LED bulb manufacturer'],
  },
  {
    slug: 'oil-filter-spin-on',
    name: 'VETHY Spin-On Oil Filter',
    category: 'filters-consumables',
    subcategory: 'oil-filters',
    shortDescription:
      'Spin-on engine oil filters with 99.5% beta efficiency. 8000+ OE references for global passenger car and light commercial vehicle parc.',
    highlights: [
      '99.5% multi-pass efficiency at 25 microns',
      'Anti-drainback valve and bypass valve',
      'Steel housing with corrosion-resistant coating',
      'Cross-references to MANN, Mahle, Bosch, Hengst',
    ],
    applications: ['Toyota / Honda / Hyundai / VW / Ford / Chevrolet / Nissan'],
    oeReferences: ['90915-YZZD3', '15400-PLM-A02', '90915-10009', '03L115561B'],
    moq: '1000 pcs',
    packaging: 'Individual color box + master carton',
    leadTime: '20-30 days from PO',
    certifications: ['ISO 9001', 'IATF 16949'],
    keywords: ['oil filter wholesale', 'spin-on oil filter supplier', 'aftermarket oil filter manufacturer'],
  },
  {
    slug: 'shock-absorber-twin-tube',
    name: 'VETHY Twin-Tube Gas Shock Absorber',
    category: 'suspension-steering',
    subcategory: 'shock-absorbers',
    shortDescription:
      'OE-quality twin-tube and gas-charged shock absorbers for sedans, SUVs and pickups — covering top global platforms.',
    highlights: [
      'Multi-stage damping valve for ride comfort',
      'Salt-spray tested 480h, no rust',
      'Velocity & temperature SOP testing',
      'Front & rear coverage 90%+ of global parc',
    ],
    applications: ['Toyota Hilux / Land Cruiser', 'Ford Ranger / F-150', 'Mitsubishi L200', 'Nissan Navara'],
    moq: '200 pcs',
    packaging: 'Individual color box + master carton',
    leadTime: '30-40 days from PO',
    certifications: ['IATF 16949'],
    keywords: ['shock absorber wholesale', 'twin tube shock supplier', 'pickup shock absorber manufacturer'],
  },
  {
    slug: 'ac-compressor-12v-24v',
    name: 'VETHY Auto AC Compressor (12V/24V)',
    category: 'hvac-climate',
    subcategory: 'ac-compressors',
    shortDescription:
      'Swash-plate and scroll automotive AC compressors with electromagnetic clutch — 12V passenger car and 24V truck/bus versions.',
    highlights: [
      'Low-noise swash-plate / scroll design',
      'R134a and R1234yf refrigerant compatible',
      'Bench-tested for displacement & leakage',
      'Direct OE replacement for Denso / Sanden / Valeo references',
    ],
    applications: ['Toyota / Honda / Hyundai / VW / HOWO / Volvo / MAN / Scania bus & truck'],
    moq: '50 pcs',
    packaging: 'Individual carton + pallet',
    leadTime: '30-45 days from PO',
    certifications: ['IATF 16949', 'ISO 14001'],
    keywords: ['auto AC compressor wholesale', '24V AC compressor supplier', 'truck AC compressor manufacturer'],
  },
  {
    slug: 'control-arm-assembly',
    name: 'VETHY Control Arm Assembly',
    category: 'suspension-steering',
    subcategory: 'control-arms',
    shortDescription:
      'Stamped steel and forged aluminum lower & upper control arms with bushings and ball joints pre-installed.',
    highlights: [
      'Forged aluminum or stamped steel options',
      'Pre-pressed bushings & integrated ball joint',
      'Salt-spray 720h corrosion resistance',
      'OE fitment to SAE / DIN tolerances',
    ],
    applications: ['VW Golf / Passat / Tiguan', 'Audi A4 / A6', 'BMW 3 / 5 series', 'Ford Focus / Fiesta'],
    moq: '100 pcs',
    packaging: 'Individual carton + pallet',
    leadTime: '30-40 days from PO',
    certifications: ['IATF 16949'],
    keywords: ['control arm wholesale', 'lower control arm supplier', 'forged control arm manufacturer'],
  },
  {
    slug: 'parking-ac-12v-24v',
    name: 'VETHY 12V/24V Sleeper Truck Parking Air Conditioner',
    category: 'truck-commercial',
    subcategory: 'parking-ac',
    shortDescription:
      'Battery-powered split and rooftop parking AC for sleeper trucks — 2200-3500W cooling capacity. Marketed globally under our CoolDrivePro brand.',
    highlights: [
      '2200W / 2700W / 3500W cooling capacity',
      'Brushless DC inverter compressor',
      '8-12 hours runtime on standard battery bank',
      'Roof-mounted and split installation kits',
    ],
    applications: ['HOWO / Sinotruk / Volvo / Scania / Mercedes-Benz Actros / MAN TGX sleeper trucks'],
    moq: '20 sets',
    packaging: 'Wooden crate + pallet',
    leadTime: '30-45 days from PO',
    certifications: ['CE', 'E-mark', 'ISO 9001'],
    keywords: ['parking air conditioner wholesale', 'truck parking AC supplier', 'battery parking AC exporter', '24V parking AC manufacturer'],
  },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
