// SEO-driven category & subcategory taxonomy for global auto parts wholesale.
// Each leaf node maps to long-tail keyword clusters (KW matrix).

export interface Subcategory {
  slug: string;
  name: string;
  keywords: string[]; // primary head + supporting LSI terms
  intro: string;
}

export interface Category {
  slug: string;
  name: string;
  hero: string;
  intro: string;
  keywords: string[];
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    slug: 'engine-parts',
    name: 'Engine Parts',
    hero: 'Wholesale Engine Components for Cars, Trucks & Commercial Vehicles',
    intro:
      'VETHY supplies a full range of OEM-quality engine parts for global aftermarket distributors and fleet workshops, with bulk MOQs and consolidated container shipping from Qingdao.',
    keywords: [
      'wholesale engine parts',
      'auto engine spare parts manufacturer',
      'OEM engine components China',
      'diesel engine parts exporter',
      'aftermarket engine parts supplier',
    ],
    subcategories: [
      { slug: 'pistons-rings', name: 'Pistons, Rings & Liners', intro: 'Forged & cast pistons, chrome piston rings, cylinder liners for gasoline and diesel engines.', keywords: ['piston ring set wholesale', 'cylinder liner kit exporter', 'engine piston manufacturer China'] },
      { slug: 'gaskets-seals', name: 'Gaskets & Seals', intro: 'Cylinder head gaskets, full gasket sets, valve cover gaskets and oil seals.', keywords: ['cylinder head gasket bulk', 'full gasket set supplier', 'engine oil seal exporter'] },
      { slug: 'oil-pumps', name: 'Oil Pumps & Water Pumps', intro: 'High-flow oil pumps and water pumps for passenger cars, SUVs and heavy trucks.', keywords: ['water pump wholesale', 'engine oil pump manufacturer', 'truck water pump supplier'] },
      { slug: 'timing-belts-chains', name: 'Timing Belts & Chains', intro: 'Timing belt kits, timing chains, tensioners and idlers across major OE references.', keywords: ['timing belt kit wholesale', 'timing chain kit supplier', 'tensioner pulley manufacturer'] },
      { slug: 'turbochargers', name: 'Turbochargers & Components', intro: 'Replacement turbochargers, CHRA cartridges and turbo repair kits.', keywords: ['turbocharger wholesale', 'CHRA cartridge supplier', 'turbo repair kit exporter'] },
      { slug: 'engine-mounts', name: 'Engine Mounts & Bushings', intro: 'Rubber & hydraulic engine mounts, transmission mounts and bushings.', keywords: ['engine mount manufacturer', 'transmission mount wholesale', 'rubber bushing supplier'] },
    ],
  },
  {
    slug: 'brake-system',
    name: 'Brake System',
    hero: 'Wholesale Brake Pads, Discs, Calipers & Brake Components',
    intro:
      'Ceramic, semi-metallic and low-metallic brake pads plus ventilated brake discs, calipers and master cylinders — ECE R90 compliant and fleet-tested.',
    keywords: [
      'brake pads wholesale supplier',
      'brake disc rotor manufacturer China',
      'ceramic brake pads OEM',
      'ECE R90 brake pads exporter',
      'truck brake parts supplier',
    ],
    subcategories: [
      { slug: 'brake-pads', name: 'Brake Pads', intro: 'Ceramic, semi-metallic and low-metallic brake pads for passenger cars and light trucks.', keywords: ['ceramic brake pads wholesale', 'semi-metallic brake pads', 'brake pad set supplier'] },
      { slug: 'brake-discs', name: 'Brake Discs & Rotors', intro: 'Solid and ventilated brake discs in G3000 cast iron, drilled and slotted options.', keywords: ['brake disc rotor wholesale', 'ventilated brake disc manufacturer', 'drilled slotted rotor supplier'] },
      { slug: 'brake-calipers', name: 'Brake Calipers', intro: 'Single and dual piston calipers, remanufactured and new units.', keywords: ['brake caliper wholesale', 'remanufactured brake caliper', 'caliper assembly supplier'] },
      { slug: 'brake-shoes-drums', name: 'Brake Shoes & Drums', intro: 'Heavy duty brake shoes and brake drums for trucks, trailers and commercial vehicles.', keywords: ['brake shoe wholesale', 'brake drum manufacturer', 'truck brake shoe supplier'] },
      { slug: 'master-cylinders', name: 'Master & Wheel Cylinders', intro: 'Brake master cylinders, wheel cylinders and clutch master cylinders.', keywords: ['brake master cylinder supplier', 'wheel cylinder manufacturer', 'clutch master cylinder wholesale'] },
      { slug: 'abs-sensors', name: 'ABS Sensors & Wear Sensors', intro: 'ABS wheel speed sensors and brake pad wear sensors.', keywords: ['ABS sensor wholesale', 'wheel speed sensor supplier', 'brake wear sensor manufacturer'] },
    ],
  },
  {
    slug: 'cooling-system',
    name: 'Cooling System',
    hero: 'Radiators, Condensers, Intercoolers & Cooling Fans',
    intro:
      'Brazed aluminum radiators, parallel-flow condensers, charge-air intercoolers and electric cooling fans for passenger cars, trucks, buses and construction equipment.',
    keywords: [
      'radiator manufacturer China',
      'auto radiator wholesale exporter',
      'AC condenser supplier',
      'intercooler manufacturer',
      'truck radiator OEM',
    ],
    subcategories: [
      { slug: 'radiators', name: 'Radiators', intro: 'Brazed aluminum and copper-brass radiators for cars, trucks and heavy equipment.', keywords: ['aluminum radiator wholesale', 'truck radiator manufacturer', 'copper brass radiator supplier'] },
      { slug: 'condensers', name: 'AC Condensers', intro: 'Parallel-flow and serpentine AC condensers for automotive HVAC.', keywords: ['AC condenser wholesale', 'parallel flow condenser supplier', 'auto condenser manufacturer'] },
      { slug: 'intercoolers', name: 'Intercoolers & Charge Air Coolers', intro: 'Bar-and-plate and tube-and-fin intercoolers for turbocharged engines.', keywords: ['intercooler wholesale', 'charge air cooler manufacturer', 'turbo intercooler supplier'] },
      { slug: 'cooling-fans', name: 'Electric Cooling Fans & Shrouds', intro: 'Brushless and brushed electric cooling fans with shroud assemblies.', keywords: ['radiator fan wholesale', 'electric cooling fan supplier', 'fan shroud assembly'] },
      { slug: 'water-pumps', name: 'Water Pumps & Thermostats', intro: 'Mechanical & electric water pumps and thermostat housings.', keywords: ['water pump wholesale', 'electric water pump supplier', 'thermostat housing manufacturer'] },
      { slug: 'hoses-clamps', name: 'Hoses, Clamps & Coolant', intro: 'Silicone & EPDM coolant hoses, T-bolt clamps and OAT/HOAT coolant.', keywords: ['silicone coolant hose wholesale', 'radiator hose supplier', 'T-bolt clamp manufacturer'] },
    ],
  },
  {
    slug: 'suspension-steering',
    name: 'Suspension & Steering',
    hero: 'Shock Absorbers, Control Arms, Tie Rods & Suspension Bushings',
    intro:
      'Twin-tube and gas-charged shock absorbers, lower & upper control arms, ball joints, tie rod ends and stabilizer links — covering 90%+ of global passenger car parc.',
    keywords: [
      'shock absorber wholesale supplier',
      'control arm manufacturer China',
      'tie rod end exporter',
      'ball joint OEM supplier',
      'suspension parts manufacturer',
    ],
    subcategories: [
      { slug: 'shock-absorbers', name: 'Shock Absorbers & Struts', intro: 'Twin-tube, mono-tube and gas-charged shock absorbers and complete strut assemblies.', keywords: ['shock absorber wholesale', 'gas strut supplier', 'complete strut assembly manufacturer'] },
      { slug: 'control-arms', name: 'Control Arms & Wishbones', intro: 'Stamped steel and forged aluminum control arms with bushings and ball joints.', keywords: ['control arm wholesale', 'wishbone supplier', 'lower control arm manufacturer'] },
      { slug: 'ball-joints', name: 'Ball Joints & Tie Rod Ends', intro: 'Greaseable and sealed ball joints, inner & outer tie rod ends.', keywords: ['ball joint wholesale', 'tie rod end supplier', 'steering ball joint manufacturer'] },
      { slug: 'stabilizer-links', name: 'Stabilizer Links & Sway Bars', intro: 'Sway bar links, stabilizer end links and bushings.', keywords: ['stabilizer link wholesale', 'sway bar end link supplier', 'anti-roll bar bushing manufacturer'] },
      { slug: 'wheel-hubs', name: 'Wheel Hub & Bearings', intro: 'Wheel hub assemblies and tapered roller bearings.', keywords: ['wheel hub assembly wholesale', 'wheel bearing supplier', 'hub bearing manufacturer'] },
      { slug: 'steering-racks', name: 'Steering Racks & Pumps', intro: 'Manual and power steering racks, pumps and hoses.', keywords: ['power steering rack wholesale', 'steering pump supplier', 'rack and pinion manufacturer'] },
    ],
  },
  {
    slug: 'electrical-lighting',
    name: 'Electrical & Lighting',
    hero: 'Auto Lighting, Sensors, Starters, Alternators & Electronics',
    intro:
      'LED & halogen headlights, tail lights, work lamps, alternators, starters, ignition coils and a deep range of automotive sensors. ECE & SAE compliant.',
    keywords: [
      'auto LED headlight wholesale',
      'alternator manufacturer China',
      'starter motor supplier',
      'ignition coil exporter',
      'automotive sensor manufacturer',
    ],
    subcategories: [
      { slug: 'headlights-tail-lights', name: 'Headlights & Tail Lights', intro: 'OEM-style and aftermarket LED/halogen headlamps and LED tail lights with ECE/DOT approval.', keywords: ['LED headlight wholesale', 'tail light supplier', 'aftermarket headlamp manufacturer'] },
      { slug: 'work-lights', name: 'LED Work Lights & Light Bars', intro: 'Heavy-duty LED work lights, light bars and beacons for trucks, off-road and construction.', keywords: ['LED light bar wholesale', 'work light supplier', 'truck LED beacon manufacturer'] },
      { slug: 'alternators-starters', name: 'Alternators & Starters', intro: 'Remanufactured and new alternators and starter motors for 12V/24V systems.', keywords: ['alternator wholesale', 'starter motor supplier', 'auto generator manufacturer'] },
      { slug: 'ignition-coils-spark-plugs', name: 'Ignition Coils & Spark Plugs', intro: 'Pencil ignition coils, distributor coils and iridium/platinum spark plugs.', keywords: ['ignition coil wholesale', 'spark plug supplier', 'iridium spark plug manufacturer'] },
      { slug: 'sensors', name: 'Automotive Sensors', intro: 'O2/lambda sensors, MAF, MAP, crankshaft, camshaft, ABS, parking sensors.', keywords: ['oxygen sensor wholesale', 'MAF sensor supplier', 'crankshaft position sensor manufacturer'] },
      { slug: 'wiring-fuses', name: 'Wiring Harness, Relays & Fuses', intro: 'Engine and lighting harnesses, relays and blade fuses.', keywords: ['wiring harness wholesale', 'auto relay supplier', 'blade fuse manufacturer'] },
    ],
  },
  {
    slug: 'body-parts',
    name: 'Body Parts',
    hero: 'Bumpers, Fenders, Mirrors, Grilles & Body Panels',
    intro:
      'Crash & collision body parts: bumpers, fenders, hoods, doors, grilles, side mirrors and tailgates for global popular models. CAPA-style fitment.',
    keywords: [
      'auto body parts wholesale',
      'aftermarket bumper supplier',
      'car fender manufacturer China',
      'side mirror OEM exporter',
      'grille manufacturer',
    ],
    subcategories: [
      { slug: 'bumpers', name: 'Bumpers & Bumper Covers', intro: 'Front & rear bumpers, primed or painted, with and without parking sensor holes.', keywords: ['bumper cover wholesale', 'aftermarket bumper supplier', 'front bumper manufacturer'] },
      { slug: 'fenders-hoods', name: 'Fenders, Hoods & Doors', intro: 'Steel and aluminum fenders, hoods, doors and tailgates.', keywords: ['car fender wholesale', 'hood panel supplier', 'door shell manufacturer'] },
      { slug: 'grilles', name: 'Grilles & Mesh Inserts', intro: 'Front grilles, lower grilles and mesh inserts in chrome, gloss black and OE finish.', keywords: ['front grille wholesale', 'mesh grille supplier', 'chrome grille manufacturer'] },
      { slug: 'mirrors', name: 'Side Mirrors & Mirror Glass', intro: 'Power-folding heated side mirrors and replacement mirror glass.', keywords: ['side mirror wholesale', 'power folding mirror supplier', 'mirror glass manufacturer'] },
      { slug: 'window-regulators', name: 'Window Regulators & Motors', intro: 'Manual and electric window regulators with motors.', keywords: ['window regulator wholesale', 'window motor supplier', 'power window regulator manufacturer'] },
      { slug: 'door-handles-locks', name: 'Door Handles & Locks', intro: 'Inner & outer door handles, central locking actuators and lock cylinders.', keywords: ['door handle wholesale', 'central locking actuator supplier', 'door lock manufacturer'] },
    ],
  },
  {
    slug: 'filters-consumables',
    name: 'Filters & Consumables',
    hero: 'Oil Filters, Air Filters, Fuel Filters, Cabin Filters',
    intro:
      'High-volume aftermarket consumables: oil filters, air filters, fuel filters, cabin & AC filters, hydraulic filters and engine oil — covering 8000+ OE references.',
    keywords: [
      'oil filter wholesale supplier',
      'air filter manufacturer China',
      'fuel filter exporter',
      'cabin filter OEM',
      'aftermarket filter wholesale',
    ],
    subcategories: [
      { slug: 'oil-filters', name: 'Oil Filters', intro: 'Spin-on and cartridge oil filters, full-flow and bypass.', keywords: ['oil filter wholesale', 'spin on oil filter supplier', 'cartridge oil filter manufacturer'] },
      { slug: 'air-filters', name: 'Air Filters', intro: 'Panel and cylindrical engine air filters with pleated cellulose or synthetic media.', keywords: ['engine air filter wholesale', 'panel air filter supplier', 'cylindrical air filter manufacturer'] },
      { slug: 'fuel-filters', name: 'Fuel Filters', intro: 'In-line and cartridge fuel filters and water-separating diesel filters.', keywords: ['fuel filter wholesale', 'diesel water separator supplier', 'fuel water separator manufacturer'] },
      { slug: 'cabin-filters', name: 'Cabin & AC Filters', intro: 'Particulate and activated carbon cabin air filters.', keywords: ['cabin air filter wholesale', 'activated carbon filter supplier', 'AC filter manufacturer'] },
      { slug: 'spark-plugs', name: 'Spark Plugs & Glow Plugs', intro: 'Copper, platinum, iridium spark plugs and diesel glow plugs.', keywords: ['spark plug wholesale', 'iridium spark plug supplier', 'glow plug manufacturer'] },
      { slug: 'wipers', name: 'Wiper Blades & Arms', intro: 'Conventional, hybrid and beam-style wiper blades.', keywords: ['wiper blade wholesale', 'beam wiper supplier', 'hybrid wiper blade manufacturer'] },
    ],
  },
  {
    slug: 'transmission-drivetrain',
    name: 'Transmission & Drivetrain',
    hero: 'Clutches, CV Joints, Drive Shafts & Transmission Parts',
    intro:
      'Clutch kits, dual-mass flywheels, CV joints, drive shafts, U-joints and gearbox repair components.',
    keywords: [
      'clutch kit wholesale',
      'CV joint manufacturer China',
      'drive shaft supplier',
      'flywheel exporter',
      'transmission parts wholesale',
    ],
    subcategories: [
      { slug: 'clutch-kits', name: 'Clutch Kits & Pressure Plates', intro: 'Complete clutch kits with cover, disc and release bearing.', keywords: ['clutch kit wholesale', 'clutch cover supplier', 'pressure plate manufacturer'] },
      { slug: 'flywheels', name: 'Flywheels & Dual-Mass Flywheels', intro: 'Single-mass and dual-mass flywheels for gasoline and diesel engines.', keywords: ['flywheel wholesale', 'dual mass flywheel supplier', 'DMF manufacturer'] },
      { slug: 'cv-joints', name: 'CV Joints & Boots', intro: 'Inner & outer CV joints, CV boots and grease kits.', keywords: ['CV joint wholesale', 'CV boot kit supplier', 'constant velocity joint manufacturer'] },
      { slug: 'drive-shafts', name: 'Drive Shafts & U-Joints', intro: 'Front, rear and complete drive shaft assemblies and universal joints.', keywords: ['drive shaft wholesale', 'universal joint supplier', 'propeller shaft manufacturer'] },
      { slug: 'transmission-mounts', name: 'Transmission Mounts', intro: 'Rubber and hydraulic transmission and gearbox mounts.', keywords: ['transmission mount wholesale', 'gearbox mount supplier', 'rubber mount manufacturer'] },
      { slug: 'gearbox-parts', name: 'Gearbox Repair Parts', intro: 'Synchronizer rings, bearings, seals and gearbox repair kits.', keywords: ['gearbox repair kit wholesale', 'synchronizer ring supplier', 'transmission bearing manufacturer'] },
    ],
  },
  {
    slug: 'truck-commercial',
    name: 'Truck & Commercial Vehicle Parts',
    hero: 'Heavy Duty Truck Parts, Trailer Parts & Bus Components',
    intro:
      'Truck radiators, brake shoes, leaf springs, air dryers, parking AC and HVAC parts for HOWO, Sinotruk, Volvo, MAN, Mercedes-Benz, Scania, Iveco, Kenworth and Freightliner.',
    keywords: [
      'heavy duty truck parts wholesale',
      'truck radiator manufacturer',
      'trailer brake parts supplier',
      'commercial vehicle spare parts exporter',
      'parking AC for truck',
    ],
    subcategories: [
      { slug: 'truck-cooling', name: 'Truck Cooling: Radiators & Charge Air', intro: 'Heavy-duty truck radiators, intercoolers and condensers for HOWO, Volvo, MAN, Scania.', keywords: ['truck radiator wholesale', 'truck intercooler supplier', 'heavy duty condenser manufacturer'] },
      { slug: 'truck-brakes', name: 'Truck & Trailer Brake Parts', intro: 'Truck brake shoes, brake drums, slack adjusters and S-cam shafts.', keywords: ['truck brake shoe wholesale', 'trailer brake supplier', 'slack adjuster manufacturer'] },
      { slug: 'parking-ac', name: 'Parking Air Conditioner & APU', intro: 'Battery-powered, split and rooftop parking AC for sleeper trucks. See also our parking AC brand CoolDrivePro.', keywords: ['parking air conditioner wholesale', 'sleeper truck AC supplier', 'battery parking AC exporter'] },
      { slug: 'truck-suspension', name: 'Truck Suspension: Leaf Springs & Air Bags', intro: 'Multi-leaf and parabolic leaf springs, air suspension bags.', keywords: ['truck leaf spring wholesale', 'air suspension bag supplier', 'parabolic leaf spring manufacturer'] },
      { slug: 'air-system', name: 'Air System: Dryers, Compressors, Valves', intro: 'Air dryers, air compressors, brake valves and air tanks.', keywords: ['air dryer wholesale', 'truck air compressor supplier', 'brake valve manufacturer'] },
      { slug: 'truck-electrical', name: 'Truck Electrical & Lighting', intro: 'Truck headlights, work lamps, alternators 24V and starters.', keywords: ['truck headlight wholesale', '24V alternator supplier', 'truck starter motor manufacturer'] },
    ],
  },
  {
    slug: 'hvac-climate',
    name: 'HVAC & Climate Control',
    hero: 'AC Compressors, Evaporators, Blower Motors & Climate Parts',
    intro:
      'Automotive AC compressors (rotary, swash plate, scroll), evaporator cores, expansion valves, blower motors and full HVAC assemblies.',
    keywords: [
      'auto AC compressor wholesale',
      'evaporator core supplier',
      'blower motor manufacturer China',
      'HVAC parts exporter',
      'expansion valve supplier',
    ],
    subcategories: [
      { slug: 'ac-compressors', name: 'AC Compressors', intro: 'Swash-plate, scroll and rotary AC compressors with electromagnetic clutch.', keywords: ['AC compressor wholesale', 'swash plate compressor supplier', 'auto AC clutch manufacturer'] },
      { slug: 'evaporators', name: 'Evaporator Cores', intro: 'Plate-fin and tube-fin evaporator cores for cars and trucks.', keywords: ['evaporator core wholesale', 'AC evaporator supplier', 'HVAC evaporator manufacturer'] },
      { slug: 'blower-motors', name: 'Blower Motors & Resistors', intro: 'HVAC blower motors and blower motor resistors.', keywords: ['blower motor wholesale', 'HVAC blower supplier', 'blower resistor manufacturer'] },
      { slug: 'expansion-valves', name: 'Expansion Valves & Receiver Driers', intro: 'Block and H-type TXV expansion valves and receiver driers.', keywords: ['expansion valve wholesale', 'TXV supplier', 'receiver drier manufacturer'] },
      { slug: 'heater-cores', name: 'Heater Cores', intro: 'Aluminum and copper-brass heater cores for cabin heating.', keywords: ['heater core wholesale', 'cabin heater supplier', 'aluminum heater core manufacturer'] },
      { slug: 'refrigerant-hoses', name: 'Refrigerant Hoses & Fittings', intro: 'R134a / R1234yf refrigerant hoses, O-rings and quick couplers.', keywords: ['AC hose wholesale', 'R134a hose supplier', 'refrigerant fitting manufacturer'] },
    ],
  },
];

export const allSubcategorySlugs = categories.flatMap((c) =>
  c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug }))
);

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const findSubcategory = (categorySlug: string, subSlug: string) =>
  findCategory(categorySlug)?.subcategories.find((s) => s.slug === subSlug);
