// Tesla / Apple aesthetic image generator.
// Pure dark gradient backgrounds + minimal silhouettes + red light bloom. No labels.

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories } from '../src/data/categories';
import { products } from '../src/data/products';
import { blogPosts } from '../src/data/blog';
import { markets } from '../src/data/markets';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/images');
await mkdir(out, { recursive: true });

const W = 2400;
const H = 1350;

function frame(silhouette: string, hue = 8, glowSide: 'left' | 'right' | 'center' = 'right') {
  const cx = glowSide === 'left' ? W * 0.25 : glowSide === 'center' ? W * 0.5 : W * 0.75;
  const cy = H * 0.55;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="bgrad" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#15181d"/>
      <stop offset="55%" stop-color="#0a0c10"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="glow" cx="${cx}" cy="${cy}" r="${W * 0.45}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="hsla(${hue}, 95%, 55%, 0.55)"/>
      <stop offset="35%" stop-color="hsla(${hue}, 90%, 45%, 0.18)"/>
      <stop offset="100%" stop-color="hsla(${hue}, 90%, 45%, 0)"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.04)"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bgrad)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect y="${H * 0.7}" width="${W}" height="${H * 0.3}" fill="url(#floor)"/>
  ${silhouette}
  <line x1="0" y1="${H * 0.72}" x2="${W}" y2="${H * 0.72}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
</svg>`;
}

const truck = `<g transform="translate(${W * 0.5 - 700}, ${H * 0.4})" opacity="0.85">
  <path d="M0,260 L120,260 L160,140 L380,140 L400,260 L520,260 L520,360 L0,360 Z" fill="#0d1014" stroke="rgba(255,80,100,0.35)" stroke-width="1.2"/>
  <path d="M170,150 L370,150 L380,250 L160,250 Z" fill="rgba(200,16,46,0.12)"/>
  <rect x="540" y="120" width="860" height="240" fill="#0d1014" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>
  <rect x="700" y="80" width="200" height="40" rx="4" fill="#1a1d24" stroke="rgba(255,80,100,0.4)" stroke-width="1.2"/>
  ${[100, 440, 780, 1100, 1300].map(x => `<circle cx="${x}" cy="380" r="48" fill="#000" stroke="rgba(255,255,255,0.18)" stroke-width="2"/><circle cx="${x}" cy="380" r="22" fill="#1a1d24"/>`).join('')}
</g>`;

const disc = (cx: number, cy: number, r: number) => `<g transform="translate(${cx},${cy})" opacity="0.92">
  <circle r="${r}" fill="#0d1014" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <circle r="${r * 0.7}" fill="#16191f"/>
  <circle r="${r * 0.3}" fill="#1a1d24" stroke="rgba(255,80,100,0.5)" stroke-width="1.5"/>
  ${Array.from({ length: 24 }, (_, i) => { const a = (i * Math.PI) / 12; return `<line x1="${Math.cos(a) * r * 0.42}" y1="${Math.sin(a) * r * 0.42}" x2="${Math.cos(a) * r * 0.66}" y2="${Math.sin(a) * r * 0.66}" stroke="rgba(255,255,255,0.07)"/>`; }).join('')}
  <path d="M${-r * 0.3},${-r * 0.85} L${r * 0.3},${-r * 0.85} L${r * 0.4},${-r * 0.55} L${-r * 0.4},${-r * 0.55} Z" fill="#16191f" stroke="rgba(200,16,46,0.5)" stroke-width="1.2"/>
</g>`;

const radiator = (x: number, y: number, w: number, h: number) => `<g transform="translate(${x},${y})" opacity="0.9">
  <rect width="${w}" height="${h}" fill="#0d1014" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect width="${w}" height="20" fill="#16191f"/>
  <rect y="${h - 20}" width="${w}" height="20" fill="#16191f"/>
  ${Array.from({ length: Math.floor(w / 20) }, (_, i) => `<line x1="${20 + i * 18}" y1="30" x2="${20 + i * 18}" y2="${h - 30}" stroke="rgba(255,255,255,0.08)"/>`).join('')}
</g>`;

const engine = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <rect width="600" height="320" rx="8" fill="#0d1014" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  <rect x="40" y="-50" width="520" height="80" rx="6" fill="#16191f"/>
  ${[0,1,2,3].map(i => `<rect x="${80 + i * 120}" y="-30" width="80" height="40" rx="3" fill="#0a0c10" stroke="rgba(200,16,46,0.4)"/>`).join('')}
  ${Array.from({ length: 8 }, (_, i) => `<circle cx="${30 + i * 75}" cy="20" r="4" fill="rgba(255,255,255,0.2)"/>`).join('')}
  <path d="M0,80 Q-40,80 -40,140 L-40,260 Q-40,300 0,300" fill="none" stroke="rgba(200,16,46,0.4)" stroke-width="6"/>
</g>`;

const shock = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <rect x="-30" y="-200" width="60" height="180" rx="8" fill="#16191f" stroke="rgba(255,255,255,0.15)"/>
  <rect x="-22" y="0" width="44" height="240" fill="#0d1014" stroke="rgba(255,255,255,0.12)"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="-50" y="${20 + i * 32}" width="100" height="14" rx="6" fill="rgba(200,16,46,0.18)"/>`).join('')}
  <circle cy="260" r="22" fill="#0a0c10" stroke="rgba(255,255,255,0.18)"/>
</g>`;

const headlight = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.95">
  <path d="M-200,-100 Q-220,-130 -180,-150 L180,-150 Q220,-130 200,-100 L220,100 Q210,140 160,140 L-160,140 Q-210,140 -220,100 Z" fill="#0d1014" stroke="rgba(255,255,255,0.18)"/>
  <ellipse rx="160" ry="100" fill="#16191f"/>
  <ellipse rx="100" ry="60" fill="rgba(255,240,220,0.85)" filter="url(#soft)"/>
  <circle r="40" fill="rgba(255,255,255,0.95)"/>
</g>`;

const filterArt = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <rect x="-100" y="-200" width="200" height="400" rx="10" fill="#0d1014" stroke="rgba(255,255,255,0.15)"/>
  <rect x="-100" y="-220" width="200" height="40" rx="6" fill="#16191f"/>
  <rect x="-100" y="180" width="200" height="40" rx="6" fill="#16191f"/>
  ${Array.from({ length: 16 }, (_, i) => `<line x1="-90" y1="${-160 + i * 22}" x2="90" y2="${-160 + i * 22}" stroke="rgba(200,16,46,0.18)"/>`).join('')}
</g>`;

const gear = (x: number, y: number, r: number) => {
  const teeth = 16;
  const path = Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (i * Math.PI) / teeth;
    const rr = i % 2 === 0 ? r : r * 0.9;
    return `${i === 0 ? 'M' : 'L'}${Math.cos(a) * rr},${Math.sin(a) * rr}`;
  }).join(' ') + ' Z';
  return `<g transform="translate(${x},${y})" opacity="0.92">
    <path d="${path}" fill="#0d1014" stroke="rgba(255,255,255,0.15)"/>
    <circle r="${r * 0.55}" fill="#16191f"/>
    <circle r="${r * 0.18}" fill="#0a0c10" stroke="rgba(200,16,46,0.5)"/>
  </g>`;
};

const compressor = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <circle r="180" fill="#0d1014" stroke="rgba(255,255,255,0.15)"/>
  <circle r="120" fill="#16191f"/>
  <circle r="60" fill="#0a0c10" stroke="rgba(200,16,46,0.5)" stroke-width="2"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="-12" y="-110" width="24" height="50" rx="4" fill="#1a1d24" transform="rotate(${i * 60})"/>`).join('')}
</g>`;

const controlArm = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <path d="M-300,0 Q-200,-100 0,-80 Q200,-100 300,0 Q200,80 0,60 Q-200,80 -300,0 Z" fill="#0d1014" stroke="rgba(255,255,255,0.15)"/>
  <circle cx="-280" r="40" fill="#16191f" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="280" r="40" fill="#16191f" stroke="rgba(255,255,255,0.2)"/>
  <circle cy="-70" r="30" fill="#16191f" stroke="rgba(200,16,46,0.5)"/>
</g>`;

const parkingAc = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.94">
  <rect x="-300" y="-80" width="600" height="160" rx="20" fill="#0d1014" stroke="rgba(255,255,255,0.18)"/>
  <rect x="-280" y="-60" width="560" height="40" rx="6" fill="#16191f"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${-260 + i * 60}" y="-10" width="40" height="80" rx="4" fill="#0a0c10" stroke="rgba(200,16,46,0.35)"/>`).join('')}
  <circle cx="-200" cy="-40" r="6" fill="rgba(200,16,46,0.9)"/>
</g>`;

const bodyPanel = (x: number, y: number) => `<g transform="translate(${x},${y})" opacity="0.92">
  <path d="M-400,80 Q-400,-60 -200,-100 L200,-100 Q400,-60 400,80 L400,160 Q380,200 350,200 L80,200 Q60,160 0,160 Q-60,160 -80,200 L-350,200 Q-380,200 -400,160 Z" fill="#0d1014" stroke="rgba(255,255,255,0.15)"/>
  <circle cx="-280" cy="200" r="40" fill="#0a0c10" stroke="rgba(255,255,255,0.2)"/>
  <circle cx="280" cy="200" r="40" fill="#0a0c10" stroke="rgba(255,255,255,0.2)"/>
</g>`;

const globeArt = `<g transform="translate(${W * 0.5}, ${H * 0.5})" opacity="0.45">
  <circle r="320" fill="none" stroke="rgba(255,255,255,0.1)"/>
  <circle r="240" fill="none" stroke="rgba(255,255,255,0.08)"/>
  <ellipse rx="320" ry="100" fill="none" stroke="rgba(255,255,255,0.08)"/>
  <ellipse rx="200" ry="320" fill="none" stroke="rgba(200,16,46,0.25)"/>
  <circle r="8" fill="rgba(200,16,46,0.9)"/>
</g>`;

const categoryArt: Record<string, string> = {
  'engine-parts': engine(W * 0.35, H * 0.42),
  'brake-system': disc(W * 0.62, H * 0.5, 280),
  'cooling-system': radiator(W * 0.32, H * 0.28, 800, 540),
  'suspension-steering': shock(W * 0.5, H * 0.32),
  'electrical-lighting': headlight(W * 0.55, H * 0.5),
  'body-parts': bodyPanel(W * 0.5, H * 0.4),
  'filters-consumables': filterArt(W * 0.55, H * 0.45),
  'transmission-drivetrain': gear(W * 0.55, H * 0.5, 280) + gear(W * 0.32, H * 0.62, 180),
  'truck-commercial': truck,
  'hvac-climate': parkingAc(W * 0.5, H * 0.45),
};

const productArt: Record<string, string> = {
  'ceramic-brake-pads-set': disc(W * 0.55, H * 0.5, 320),
  'aluminum-radiator-truck': radiator(W * 0.32, H * 0.25, 900, 600),
  'led-headlight-h4-h7': headlight(W * 0.5, H * 0.5),
  'oil-filter-spin-on': filterArt(W * 0.5, H * 0.45),
  'shock-absorber-twin-tube': shock(W * 0.5, H * 0.32),
  'ac-compressor-12v-24v': compressor(W * 0.55, H * 0.5),
  'control-arm-assembly': controlArm(W * 0.5, H * 0.5),
  'parking-ac-12v-24v': truck,
};

await writeFile(resolve(out, 'hero.svg'), frame(truck, 8, 'right'), 'utf-8');
await writeFile(resolve(out, 'og-default.svg'), frame(truck, 8, 'right'), 'utf-8');

for (let i = 0; i < categories.length; i++) {
  const c = categories[i];
  const art = categoryArt[c.slug] ?? engine(W * 0.4, H * 0.5);
  await writeFile(resolve(out, `category-${c.slug}.svg`), frame(art, 8 + (i % 4) * 4, i % 2 === 0 ? 'right' : 'left'), 'utf-8');
}
for (const p of products) {
  await writeFile(resolve(out, `product-${p.slug}.svg`), frame(productArt[p.slug] ?? engine(W * 0.4, H * 0.5), 12, 'center'), 'utf-8');
}
for (const post of blogPosts) {
  await writeFile(resolve(out, `blog-${post.slug}.svg`), frame(`<g opacity="0.5">${truck}</g>`, 16, 'right'), 'utf-8');
}
for (const m of markets) {
  await writeFile(resolve(out, `market-${m.slug}.svg`), frame(globeArt, 8, 'center'), 'utf-8');
}
await writeFile(resolve(out, 'banner-about.svg'), frame(engine(W * 0.4, H * 0.5), 8, 'right'), 'utf-8');
await writeFile(resolve(out, 'banner-wholesale.svg'), frame(truck, 12, 'right'), 'utf-8');
await writeFile(resolve(out, 'banner-contact.svg'), frame(parkingAc(W * 0.5, H * 0.5), 8, 'center'), 'utf-8');

console.log('Tesla/Apple-style images generated.');
