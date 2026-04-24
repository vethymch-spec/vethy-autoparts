import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { markets } from '../data/markets';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="container-page grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          {[
            ['🚚', 'Container shipping', '60+ countries'],
            ['✅', 'OE-quality', 'IATF 16949'],
            ['📦', 'Mixed pallets', 'MOQ from 20 pcs'],
            ['💬', 'Sales support', '7 languages'],
          ].map(([ic, t, s]) => (
            <div key={t} className="flex items-start gap-3">
              <span className="text-2xl">{ic}</span>
              <div>
                <p className="text-[13px] font-semibold text-white">{t}</p>
                <p className="text-[12px] text-white/60">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Columns */}
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-[18px] font-bold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-accent text-white">V</span> VETHY
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70">Qingdao VETHY Industrial Co., Ltd. — wholesale auto parts manufacturer & exporter. Sister brand for parking AC: <a href="https://www.cooldrivepro.com" className="text-white underline hover:text-accent">CoolDrivePro</a>.</p>
          </div>
          <FooterCol title="Shop">
            {categories.slice(0, 6).map((c) => <FooterLink key={c.slug} to={`/categories/${c.slug}`}>{c.name}</FooterLink>)}
            <FooterLink to="/categories">View all categories →</FooterLink>
          </FooterCol>
          <FooterCol title="Markets">
            {markets.slice(0, 6).map((m) => <FooterLink key={m.slug} to={`/markets/${m.slug}`}>{m.name}</FooterLink>)}
          </FooterCol>
          <FooterCol title="Help">
            <FooterLink to="/wholesale">Wholesale program</FooterLink>
            <FooterLink to="/contact">Request a quote</FooterLink>
            <FooterLink to="/blog">Garage Blog</FooterLink>
            <FooterLink to="/about">About VETHY</FooterLink>
          </FooterCol>
          <FooterCol title="Contact">
            <li className="text-[13px] text-white/70">Qingdao · Shandong · China</li>
            <li className="text-[13px] text-white/70"><a href="mailto:sales@vethy.com.cn" className="hover:text-white">sales@vethy.com.cn</a></li>
            <li className="text-[13px] text-white/70"><a href="tel:+8653289876543" className="hover:text-white">+86 532 8987 6543</a></li>
          </FooterCol>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-[12px] text-white/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Qingdao VETHY Industrial Co., Ltd. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/wholesale" className="hover:text-white">Shipping</Link>
            <Link to="/wholesale" className="hover:text-white">Returns</Link>
            <Link to="/about" className="hover:text-white">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-wider text-white">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[13px]">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <li><Link to={to} className="text-white/70 hover:text-white transition">{children}</Link></li>;
}
