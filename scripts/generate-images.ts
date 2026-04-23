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
const CYAN = '#7be9ff';
const RED = '#ff3050';

function gridPattern() {
  return `<pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(123,233,255,0.05)" stroke-width="1"/>
  </pattern>
  <pattern id="gridMajor" width="300" height="300" patternUnits="userSpaceOnUse">
    <path d="M 300 0 L 0 0 0 300" fill="none" stroke="rgba(123,233,255,0.08)" stroke-width="1"/>
  </pattern>`;
}

function hudOverlay() {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const x = 140 + i * 88;
    const top = i % 4 === 0 ? H - 60 : H - 50;
    return `<line x1="${x}" y1="${H - 40}" x2="${x}" y2="${top}"/>`;
  }).join('');
  return `<g opacity="0.55" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16" fill="${CYAN}">
    <g stroke="${CYAN}" stroke-width="1.4" fill="none">
      <path d="M40,40 L40,110 M40,40 L110,40"/>
      <path d="M${W - 40},40 L${W - 40},110 M${W - 40},40 L${W - 110},40"/>
      <path d="M40,${H - 40} L40,${H - 110} M40,${H - 40} L110,${H - 40}"/>
      <path d="M${W - 40},${H - 40} L${W - 40},${H - 110} M${W - 40},${H - 40} L${W - 110},${H - 40}"/>
    </g>
    <text x="60" y="90">VTH-001 / 24V</text>
    <text x="${W - 260}" y="90">SCALE 1:4</text>
    <text x="60" y="${H - 60}">REV.04 · 2026</text>
    <text x="${W - 260}" y="${H - 60}">QC IATF 16949</text>
    <g stroke="${CYAN}" stroke-width="1" opacity="0.7">${ticks}</g>
  </g>`;
}

function scanlines() {
  return `<g opacity="0.04">${Array.from({ length: 200 }, (_, i) => `<line x1="0" y1="${i * 7}" x2="${W}" y2="${i * 7}" stroke="#fff" stroke-width="0.5"/>`).join('')}</g>`;
}

function frame(silhouette: string, hue = 350, glowSide: 'left' | 'right' | 'center' = 'right') {
  const cx = glowSide === 'left' ? W * 0.22 : glowSide === 'center' ? W * 0.5 : W * 0.78;
  const cy = H * 0.55;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" preserveAspectRatio="xMidYMid slice">
  <defs>
    ${gridPattern()}
    <radialGradient id="bgrad" cx="50%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="55%" stop-color="#06080c"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="glow" cx="${cx}" cy="${cy}" r="${W * 0.5}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="hsla(${hue}, 100%, 55%, 0.5)"/>
      <stop offset="35%" stop-color="hsla(${hue}, 95%, 45%, 0.15)"/>
      <stop offset="100%" stop-color="hsla(${hue}, 90%, 45%, 0)"/>
    </radialGradient>
    <radialGradient id="cyanGlow" cx="20%" cy="80%" r="60%">
      <stop offset="0%" stop-color="rgba(123,233,255,0.18)"/>
      <stop offset="100%" stop-color="rgba(123,233,255,0)"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(123,233,255,0.05)"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="bloom"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bgrad)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#gridMajor)"/>
  <rect width="${W}" height="${H}" fill="url(#cyanGlow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <line x1="0" y1="${H * 0.72}" x2="${W}" y2="${H * 0.72}" stroke="rgba(123,233,255,0.18)" stroke-width="1" stroke-dasharray="6 6"/>
  <rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="url(#floor)"/>
  ${silhouette}
  ${scanlines()}
  ${hudOverlay()}
</svg>`;
}

// ============= Helpers =============

function dimLine(x1: number, y1: number, x2: number, y2: number, label = '') {
  const labelEl = label
    ? `<text x="${(x1 + x2) / 2}" y="${y1 - 12}" font-family="ui-monospace,monospace" font-size="14" fill="${CYAN}" opacity="0.85" text-anchor="middle">${label}</text>`
    : '';
  return `<g stroke="${CYAN}" stroke-width="1" opacity="0.7" fill="none">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
    <line x1="${x1}" y1="${y1 - 8}" x2="${x1}" y2="${y1 + 8}"/>
    <line x1="${x2}" y1="${y2 - 8}" x2="${x2}" y2="${y2 + 8}"/>
  </g>${labelEl}`;
}

function callout(x: number, y: number, label: string) {
  return `<g opacity="0.85">
    <circle cx="${x}" cy="${y}" r="6" fill="none" stroke="${CYAN}" stroke-width="1.4"/>
    <circle cx="${x}" cy="${y}" r="2" fill="${CYAN}"/>
    <line x1="${x}" y1="${y}" x2="${x + 80}" y2="${y - 60}" stroke="${CYAN}" stroke-width="1"/>
    <line x1="${x + 80}" y1="${y - 60}" x2="${x + 220}" y2="${y - 60}" stroke="${CYAN}" stroke-width="1"/>
    <text x="${x + 90}" y="${y - 68}" font-family="ui-monospace,monospace" font-size="14" fill="${CYAN}">${label}</text>
  </g>`;
}

// ============= Mechanical silhouettes =============

const truck = `<g transform="translate(${W * 0.5 - 720}, ${H * 0.34})">
  <g stroke="rgba(255,255,255,0.22)" stroke-width="1.6" fill="#0a0e14">
    <path d="M0,300 L130,300 L175,150 L400,150 L420,300 L540,300 L540,420 L0,420 Z"/>
    <rect x="560" y="100" width="900" height="320" rx="6"/>
    <rect x="710" y="50" width="240" height="50" rx="6"/>
  </g>
  <path d="M180,160 L390,160 L405,290 L165,290 Z" fill="rgba(255,48,80,0.18)" stroke="${RED}" stroke-width="1.2" opacity="0.85"/>
  <g stroke="rgba(123,233,255,0.35)" stroke-width="1" fill="none">
    <line x1="560" y1="160" x2="1460" y2="160"/>
    <line x1="560" y1="240" x2="1460" y2="240"/>
    <line x1="560" y1="320" x2="1460" y2="320"/>
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${600 + i * 48}" y1="100" x2="${600 + i * 48}" y2="420"/>`).join('')}
  </g>
  <circle cx="780" cy="75" r="5" fill="${RED}"/>
  ${[110, 470, 820, 1140, 1360]
    .map(
      (x) => `<g transform="translate(${x},440)">
      <circle r="56" fill="#000" stroke="rgba(255,255,255,0.28)" stroke-width="2.5"/>
      <circle r="40" fill="none" stroke="rgba(123,233,255,0.4)" stroke-dasharray="4 4"/>
      <circle r="24" fill="#0a0e14" stroke="rgba(255,255,255,0.2)"/>
      <circle r="6" fill="${RED}"/>
    </g>`,
    )
    .join('')}
  ${dimLine(0, 510, 1460, 510, '12.0 m')}
  ${callout(640, 60, 'PARKING AC 24V')}
  ${callout(420, 230, 'CAB CHASSIS')}
</g>`;

const disc = (cx: number, cy: number, r: number) => `<g transform="translate(${cx},${cy})">
  <circle r="${r}" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
  <circle r="${r * 0.95}" fill="none" stroke="rgba(123,233,255,0.25)" stroke-dasharray="3 5"/>
  <circle r="${r * 0.7}" fill="#10141b"/>
  <circle r="${r * 0.32}" fill="#06080c" stroke="${RED}" stroke-width="1.6"/>
  <circle r="${r * 0.12}" fill="#000" stroke="rgba(255,255,255,0.3)"/>
  ${Array.from({ length: 60 }, (_, i) => {
    const a = (i * Math.PI) / 30;
    return `<line x1="${Math.cos(a) * r * 0.42}" y1="${Math.sin(a) * r * 0.42}" x2="${Math.cos(a) * r * 0.66}" y2="${Math.sin(a) * r * 0.66}" stroke="rgba(255,255,255,0.12)"/>`;
  }).join('')}
  ${Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    return `<circle cx="${Math.cos(a) * r * 0.22}" cy="${Math.sin(a) * r * 0.22}" r="6" fill="#000" stroke="rgba(255,255,255,0.4)"/>`;
  }).join('')}
  <path d="M${-r * 0.3},${-r * 0.92} L${r * 0.3},${-r * 0.92} L${r * 0.42},${-r * 0.55} L${-r * 0.42},${-r * 0.55} Z" fill="#10141b" stroke="${RED}" stroke-width="1.4" opacity="0.9"/>
  <g stroke="${CYAN}" opacity="0.8" stroke-width="1" fill="none">
    <line x1="${-r - 40}" y1="${-r}" x2="${-r - 40}" y2="${r}"/>
    <line x1="${-r - 50}" y1="${-r}" x2="${-r - 30}" y2="${-r}"/>
    <line x1="${-r - 50}" y1="${r}" x2="${-r - 30}" y2="${r}"/>
  </g>
  <text x="${-r - 50}" y="6" font-family="ui-monospace,monospace" font-size="14" fill="${CYAN}" opacity="0.85" text-anchor="end">Ø${Math.round(r * 2)}</text>
  ${callout(r * 0.7, -r * 0.3, 'ECE R90')}
</g>`;

const radiator = (x: number, y: number, w: number, h: number) => `<g transform="translate(${x},${y})">
  <rect width="${w}" height="${h}" fill="#0a0e14" stroke="rgba(255,255,255,0.2)" stroke-width="1.6"/>
  <rect width="${w}" height="26" fill="#10141b"/>
  <rect y="${h - 26}" width="${w}" height="26" fill="#10141b"/>
  ${Array.from({ length: Math.floor(w / 14) }, (_, i) => `<line x1="${10 + i * 14}" y1="34" x2="${10 + i * 14}" y2="${h - 34}" stroke="rgba(255,255,255,0.1)"/>`).join('')}
  ${Array.from({ length: 22 }, (_, i) => `<line x1="0" y1="${50 + (i * (h - 100)) / 22}" x2="${w}" y2="${50 + (i * (h - 100)) / 22}" stroke="rgba(123,233,255,0.08)"/>`).join('')}
  <circle cx="50" cy="13" r="6" fill="${RED}"/>
  <circle cx="${w - 50}" cy="13" r="6" fill="${CYAN}"/>
  <rect x="-30" y="${h * 0.3}" width="20" height="60" fill="#10141b" stroke="rgba(255,255,255,0.2)"/>
  <rect x="${w + 10}" y="${h * 0.3}" width="20" height="60" fill="#10141b" stroke="rgba(255,255,255,0.2)"/>
  ${callout(w * 0.5, h * 0.5, 'CAB-BRAZED AL')}
</g>`;

const engine = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <rect width="640" height="340" rx="10" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <rect x="40" y="-60" width="560" height="100" rx="8" fill="#10141b" stroke="rgba(255,255,255,0.15)"/>
  ${[0, 1, 2, 3]
    .map(
      (i) => `<g transform="translate(${90 + i * 130}, -50)">
      <rect width="90" height="80" rx="4" fill="#06080c" stroke="${RED}" stroke-width="1.4" opacity="0.85"/>
      <circle cx="45" cy="40" r="22" fill="none" stroke="rgba(255,48,80,0.5)" stroke-width="1.2"/>
      <circle cx="45" cy="40" r="6" fill="${RED}"/>
    </g>`,
    )
    .join('')}
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${20 + i * 40}" cy="20" r="5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.4)"/>`).join('')}
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${20 + i * 40}" cy="320" r="5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.4)"/>`).join('')}
  <path d="M0,90 Q-50,90 -50,160 L-50,260 Q-50,310 0,310" fill="none" stroke="${RED}" stroke-width="6" opacity="0.7"/>
  <path d="M640,90 Q690,90 690,160 L690,260 Q690,310 640,310" fill="none" stroke="${CYAN}" stroke-width="6" opacity="0.7"/>
  <g stroke="rgba(123,233,255,0.3)" stroke-width="1" fill="none">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="40" y1="${80 + i * 30}" x2="600" y2="${80 + i * 30}"/>`).join('')}
  </g>
  ${callout(320, 60, 'I4 · 2.0L')}
  ${callout(45, 200, 'INTAKE')}
</g>`;

const shock = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <rect x="-32" y="-220" width="64" height="200" rx="10" fill="#10141b" stroke="rgba(255,255,255,0.2)" stroke-width="1.6"/>
  <circle cy="-235" r="22" fill="#0a0e14" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <circle cy="-235" r="8" fill="${CYAN}"/>
  <rect x="-24" y="0" width="48" height="280" fill="#0a0e14" stroke="rgba(255,255,255,0.18)"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="-56" y="${10 + i * 30}" width="112" height="18" rx="9" fill="rgba(255,48,80,0.16)" stroke="${RED}" stroke-width="1" opacity="0.7"/>`).join('')}
  <circle cy="295" r="24" fill="#0a0e14" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <circle cy="295" r="8" fill="${CYAN}"/>
  ${dimLine(80, -240, 80, 320, 'L=560')}
  ${callout(60, 80, 'TWIN-TUBE')}
</g>`;

const headlight = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <path d="M-260,-140 Q-280,-180 -230,-200 L230,-200 Q280,-180 260,-140 L290,140 Q280,180 220,180 L-220,180 Q-280,180 -290,140 Z" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <ellipse rx="200" ry="130" fill="#10141b" stroke="rgba(123,233,255,0.3)"/>
  <ellipse rx="140" ry="90" fill="rgba(123,233,255,0.25)" filter="url(#bloom)"/>
  <ellipse rx="100" ry="65" fill="rgba(255,255,255,0.85)" filter="url(#soft)"/>
  <circle r="32" fill="#fff"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12;
    return `<line x1="${Math.cos(a) * 120}" y1="${Math.sin(a) * 80}" x2="${Math.cos(a) * 180}" y2="${Math.sin(a) * 120}" stroke="rgba(123,233,255,0.4)" stroke-width="1"/>`;
  }).join('')}
  <circle cx="-220" cy="160" r="6" fill="${RED}"/>
  <circle cx="220" cy="160" r="6" fill="${RED}"/>
  ${callout(180, -100, 'LED 6500K')}
</g>`;

const filterArt = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <rect x="-110" y="-220" width="220" height="440" rx="14" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <rect x="-110" y="-240" width="220" height="46" rx="8" fill="#10141b"/>
  <rect x="-110" y="194" width="220" height="46" rx="8" fill="#10141b"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M-100,${-180 + i * 18} L-60,${-186 + i * 18} L-20,${-180 + i * 18} L20,${-186 + i * 18} L60,${-180 + i * 18} L100,${-186 + i * 18}" fill="none" stroke="rgba(255,48,80,0.3)" stroke-width="1.2"/>`).join('')}
  <circle cy="-218" r="8" fill="${CYAN}"/>
  <circle cy="218" r="8" fill="${CYAN}"/>
  ${dimLine(-150, -230, -150, 230, 'H=460')}
  ${callout(80, 0, 'MICRO 5μm')}
</g>`;

const gear = (x: number, y: number, r: number) => {
  const teeth = 18;
  const path =
    Array.from({ length: teeth * 2 }, (_, i) => {
      const a = (i * Math.PI) / teeth;
      const rr = i % 2 === 0 ? r : r * 0.88;
      return `${i === 0 ? 'M' : 'L'}${Math.cos(a) * rr},${Math.sin(a) * rr}`;
    }).join(' ') + ' Z';
  return `<g transform="translate(${x},${y})">
    <path d="${path}" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
    <circle r="${r * 0.55}" fill="#10141b"/>
    <circle r="${r * 0.55}" fill="none" stroke="rgba(123,233,255,0.3)" stroke-dasharray="4 4"/>
    <circle r="${r * 0.18}" fill="#06080c" stroke="${RED}" stroke-width="1.4"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const a = (i * 2 * Math.PI) / 6;
      return `<circle cx="${Math.cos(a) * r * 0.38}" cy="${Math.sin(a) * r * 0.38}" r="6" fill="#000" stroke="rgba(255,255,255,0.3)"/>`;
    }).join('')}
  </g>`;
};

const compressor = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <circle r="200" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.8"/>
  <circle r="200" fill="none" stroke="rgba(123,233,255,0.25)" stroke-dasharray="3 5"/>
  <circle r="140" fill="#10141b"/>
  <circle r="70" fill="#06080c" stroke="${RED}" stroke-width="1.8"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="-14" y="-128" width="28" height="60" rx="4" fill="#10141b" stroke="rgba(255,255,255,0.18)" transform="rotate(${i * 60})"/>`).join('')}
  <circle r="14" fill="${RED}"/>
  <rect x="-180" y="-30" width="40" height="60" fill="#10141b" stroke="rgba(255,255,255,0.2)"/>
  <rect x="140" y="-30" width="40" height="60" fill="#10141b" stroke="rgba(255,255,255,0.2)"/>
  ${callout(140, -120, 'R134a · 12V')}
</g>`;

const controlArm = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <path d="M-340,0 Q-220,-110 0,-90 Q220,-110 340,0 Q220,90 0,70 Q-220,90 -340,0 Z" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <circle cx="-310" r="46" fill="#10141b" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <circle cx="-310" r="20" fill="#06080c" stroke="${CYAN}" stroke-width="1.4"/>
  <circle cx="310" r="46" fill="#10141b" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <circle cx="310" r="20" fill="#06080c" stroke="${CYAN}" stroke-width="1.4"/>
  <circle cy="-78" r="34" fill="#10141b" stroke="${RED}" stroke-width="1.6"/>
  <circle cy="-78" r="14" fill="${RED}"/>
  ${dimLine(-310, 70, 310, 70, '620')}
  ${callout(0, -78, 'BALL JOINT')}
</g>`;

const parkingAc = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <rect x="-340" y="-100" width="680" height="200" rx="22" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <rect x="-320" y="-80" width="640" height="50" rx="8" fill="#10141b"/>
  ${Array.from({ length: 11 }, (_, i) => `<rect x="${-300 + i * 56}" y="-20" width="40" height="100" rx="4" fill="#06080c" stroke="rgba(123,233,255,0.35)" stroke-width="1"/>`).join('')}
  <circle cx="-280" cy="-55" r="6" fill="${RED}"/>
  <circle cx="-250" cy="-55" r="6" fill="${CYAN}"/>
  <rect x="200" y="-65" width="100" height="20" rx="4" fill="#000" stroke="rgba(123,233,255,0.4)"/>
  <text x="250" y="-50" font-family="ui-monospace,monospace" font-size="14" fill="${CYAN}" text-anchor="middle">24V · 1200W</text>
  ${dimLine(-340, 130, 340, 130, '680 mm')}
</g>`;

const bodyPanel = (x: number, y: number) => `<g transform="translate(${x},${y})">
  <path d="M-440,90 Q-440,-80 -220,-120 L220,-120 Q440,-80 440,90 L440,180 Q420,220 380,220 L100,220 Q80,180 0,180 Q-80,180 -100,220 L-380,220 Q-420,220 -440,180 Z" fill="#0a0e14" stroke="rgba(255,255,255,0.22)" stroke-width="1.6"/>
  <path d="M-340,-60 L340,-60 L380,80 L-380,80 Z" fill="rgba(123,233,255,0.06)" stroke="rgba(123,233,255,0.3)" stroke-width="1"/>
  <circle cx="-310" cy="220" r="46" fill="#06080c" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <circle cx="-310" cy="220" r="22" fill="#10141b" stroke="${RED}"/>
  <circle cx="310" cy="220" r="46" fill="#06080c" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <circle cx="310" cy="220" r="22" fill="#10141b" stroke="${RED}"/>
  ${callout(0, -40, 'STEEL · E-COAT')}
</g>`;

const globeArt = `<g transform="translate(${W * 0.5}, ${H * 0.5})">
  <circle r="380" fill="none" stroke="rgba(123,233,255,0.18)" stroke-width="1"/>
  <circle r="320" fill="none" stroke="rgba(123,233,255,0.22)" stroke-width="1"/>
  <circle r="240" fill="none" stroke="rgba(123,233,255,0.18)" stroke-width="1"/>
  <ellipse rx="380" ry="120" fill="none" stroke="rgba(123,233,255,0.18)"/>
  <ellipse rx="380" ry="240" fill="none" stroke="rgba(123,233,255,0.14)"/>
  <ellipse rx="240" ry="380" fill="none" stroke="rgba(255,48,80,0.3)"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12;
    return `<line x1="0" y1="0" x2="${Math.cos(a) * 380}" y2="${Math.sin(a) * 380}" stroke="rgba(123,233,255,0.08)"/>`;
  }).join('')}
  ${[[120, -80], [-180, 40], [60, 180], [-40, -220], [260, 120], [-280, -60]]
    .map(([dx, dy]) => `<g transform="translate(${dx},${dy})"><circle r="10" fill="none" stroke="${RED}" stroke-width="1.5"/><circle r="4" fill="${RED}"/></g>`)
    .join('')}
  <circle r="6" fill="${CYAN}"/>
</g>`;

// ============= Maps =============

const categoryArt: Record<string, string> = {
  'engine-parts': engine(W * 0.32, H * 0.42),
  'brake-system': disc(W * 0.62, H * 0.5, 300),
  'cooling-system': radiator(W * 0.28, H * 0.22, 900, 600),
  'suspension-steering': shock(W * 0.5, H * 0.32),
  'electrical-lighting': headlight(W * 0.55, H * 0.5),
  'body-parts': bodyPanel(W * 0.5, H * 0.4),
  'filters-consumables': filterArt(W * 0.55, H * 0.45),
  'transmission-drivetrain': gear(W * 0.6, H * 0.5, 280) + gear(W * 0.32, H * 0.62, 180),
  'truck-commercial': truck,
  'hvac-climate': parkingAc(W * 0.5, H * 0.45),
};

const productArt: Record<string, string> = {
  'ceramic-brake-pads-set': disc(W * 0.55, H * 0.5, 340),
  'aluminum-radiator-truck': radiator(W * 0.28, H * 0.2, 950, 640),
  'led-headlight-h4-h7': headlight(W * 0.5, H * 0.5),
  'oil-filter-spin-on': filterArt(W * 0.5, H * 0.45),
  'shock-absorber-twin-tube': shock(W * 0.5, H * 0.32),
  'ac-compressor-12v-24v': compressor(W * 0.55, H * 0.5),
  'control-arm-assembly': controlArm(W * 0.5, H * 0.5),
  'parking-ac-12v-24v': truck,
};

await writeFile(resolve(out, 'hero.svg'), frame(truck, 350, 'right'), 'utf-8');
await writeFile(resolve(out, 'og-default.svg'), frame(truck, 350, 'right'), 'utf-8');

for (let i = 0; i < categories.length; i++) {
  const c = categories[i];
  const art = categoryArt[c.slug] ?? engine(W * 0.4, H * 0.5);
  await writeFile(resolve(out, `category-${c.slug}.svg`), frame(art, 350, i % 2 === 0 ? 'right' : 'left'), 'utf-8');
}
for (const p of products) {
  await writeFile(resolve(out, `product-${p.slug}.svg`), frame(productArt[p.slug] ?? engine(W * 0.4, H * 0.5), 350, 'center'), 'utf-8');
}
const blogVariants = [truck, compressor(W * 0.5, H * 0.5), gear(W * 0.5, H * 0.5, 320), engine(W * 0.32, H * 0.42), disc(W * 0.55, H * 0.5, 320)];
for (let i = 0; i < blogPosts.length; i++) {
  const post = blogPosts[i];
  await writeFile(resolve(out, `blog-${post.slug}.svg`), frame(`<g opacity="0.55">${blogVariants[i % blogVariants.length]}</g>`, 350, i % 2 === 0 ? 'right' : 'left'), 'utf-8');
}
for (const m of markets) {
  await writeFile(resolve(out, `market-${m.slug}.svg`), frame(globeArt, 350, 'center'), 'utf-8');
}
await writeFile(resolve(out, 'banner-about.svg'), frame(engine(W * 0.32, H * 0.42), 350, 'right'), 'utf-8');
await writeFile(resolve(out, 'banner-wholesale.svg'), frame(truck, 350, 'right'), 'utf-8');
await writeFile(resolve(out, 'banner-contact.svg'), frame(parkingAc(W * 0.5, H * 0.5), 350, 'center'), 'utf-8');

console.log('Automotive/tech-style images generated.');
