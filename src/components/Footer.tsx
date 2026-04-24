import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { markets } from '../data/markets';

const SOCIALS = [
  ['IG', 'Instagram'],
  ['FB', 'Facebook'],
  ['TT', 'TikTok'],
  ['IN', 'LinkedIn'],
  ['YT', 'YouTube'],
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Trust strip */}
      <div className="border-b border-white/10 bg-ink-800">
        <div className="container-page grid grid-cols-2 gap-6 py-7 sm:grid-cols-4">
          {[
            ['🚚', 'Fast Shipping', 'Same-day dispatch on stock'],
            ['🛡️', 'Guaranteed to Fit', 'OE references verified'],
            ['↩️', 'Hassle-Free Returns', '60-day return window'],
            ['💬', '24/7 Support', '8 languages, your time zone'],
          ].map(([ic, t, s]) => (
            <div key={t} className="flex items-start gap-3">
              <span className="text-2xl">{ic}</span>
              <div>
                <p className="font-display text-[14px] font-bold">{t}</p>
                <p className="mt-0.5 text-[12px] text-white/70">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-col link grid */}
      <div className="container-page grid gap-10 py-12 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-display text-[20px] font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-accent text-[14px] font-bold">V</span>
            VETHY
          </Link>
          <p className="mt-3 text-[13px] leading-relaxed text-white/70">Wholesale auto parts manufacturer & exporter from Qingdao, China — shipping to 60+ countries.</p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(([s, n]) => (
              <a key={s} href="#" aria-label={n} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold hover:bg-accent">{s}</a>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <a href="#" className="inline-flex h-10 items-center gap-2 rounded border border-white/20 bg-black px-3 text-[10px] font-semibold">🍎 App Store</a>
            <a href="#" className="inline-flex h-10 items-center gap-2 rounded border border-white/20 bg-black px-3 text-[10px] font-semibold">▶ Google Play</a>
          </div>
        </div>

        {/* SHOP */}
        <FCol title="SHOP">
          {categories.slice(0, 8).map((c) => (
            <FLink key={c.slug} to={`/categories/${c.slug}`}>{c.name}</FLink>
          ))}
          <FLink to="/categories">View all categories →</FLink>
        </FCol>

        {/* LIFE AT VETHY */}
        <FCol title="LIFE AT VETHY">
          <FLink to="/about">About Us</FLink>
          <FLink to="/about">Careers</FLink>
          <FLink to="/about">Press Room</FLink>
          <FLink to="/about">Sustainability</FLink>
          <FLink to="/about">Investor Relations</FLink>
          <FLink to="/wholesale">Wholesale Program</FLink>
        </FCol>

        {/* HELP */}
        <FCol title="HELP">
          <FLink to="/contact">Help Center</FLink>
          <FLink to="/contact">Shipping Policy</FLink>
          <FLink to="/contact">Returns Policy</FLink>
          <FLink to="/contact">Warranty Policy</FLink>
          <FLink to="/contact">Track Order</FLink>
          <FLink to="/contact">Start a Return</FLink>
          <FLink to="/contact">Contact Us</FLink>
        </FCol>

        {/* BLOG + CONTACT */}
        <FCol title="IN THE GARAGE">
          <FLink to="/blog">Garage Blog</FLink>
          <FLink to="/blog">Auto Repair 101</FLink>
          <FLink to="/blog">DIY Guides</FLink>
          <FLink to="/blog">Sourcing Guides</FLink>
          <li className="pt-3 mt-3 border-t border-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Top Markets</p>
            <ul className="mt-2 space-y-1.5">
              {markets.slice(0, 4).map((m) => (
                <FLink key={m.slug} to={`/markets/${m.slug}`}>{m.name}</FLink>
              ))}
            </ul>
          </li>
        </FCol>
      </div>

      {/* Legal strip */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-[11px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} VETHY Auto Parts, Inc. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/contact" className="hover:text-white">Accessibility</Link>
            <Link to="/contact" className="hover:text-white">Cookie Preferences</Link>
            <Link to="/contact" className="hover:text-white">Do Not Sell My Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


function FCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-white">{title}</p>
      <ul className="mt-4 space-y-2 text-[13px] text-white/75">{children}</ul>
    </div>
  );
}

function FLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-white">{children}</Link>
    </li>
  );
}
