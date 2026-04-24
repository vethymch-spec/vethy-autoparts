import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supportedLngs } from '../i18n';
import { categories } from '../data/categories';

const langLabel: Record<string, string> = { en: 'EN', es: 'ES', ru: 'RU', ar: 'AR', pt: 'PT', fr: 'FR', de: 'DE' };

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setShopOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-ink-900 text-white">
        <div className="container-page flex h-8 items-center justify-between text-[12px]">
          <div className="hidden gap-5 sm:flex">
            <a href="tel:+8653289876543" className="util-link">📞 +86 532 8987 6543</a>
            <a href="mailto:sales@vethy.com.cn" className="util-link">✉ sales@vethy.com.cn</a>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/wholesale" className="util-link">Wholesale</Link>
            <Link to="/about" className="util-link">About</Link>
            <select aria-label="Language" className="bg-transparent text-[12px] text-white/85 outline-none cursor-pointer hover:text-white" value={i18n.language?.split('-')[0] || 'en'} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              {supportedLngs.map((l) => (<option key={l} value={l} className="text-ink-900">{langLabel[l]}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary brand bar */}
      <div className="bg-brand text-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display text-[20px] font-bold tracking-tight" onClick={() => setOpen(false)}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-accent text-[14px] font-bold">V</span>
            VETHY
          </Link>

          {/* Search */}
          <form className="hidden flex-1 items-center md:flex" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full max-w-2xl overflow-hidden rounded-md bg-white">
              <input type="search" placeholder="Search 8,000+ parts by name, OE# or fitment…" className="flex-1 px-4 py-2.5 text-[14px] text-ink-900 outline-none placeholder:text-ink-500" />
              <button type="submit" className="bg-accent px-5 text-[14px] font-semibold text-white hover:bg-accent-dark">Search</button>
            </div>
          </form>

          <div className="hidden items-center gap-5 md:flex">
            <Link to="/contact" className="flex items-center gap-1.5 text-[13px] font-medium text-white/95 hover:text-white">
              <span className="inline-block">📋</span> RFQ
            </Link>
            <Link to="/categories" className="rounded-md bg-white/10 px-3 py-1.5 text-[12px] font-semibold ring-1 ring-white/20 hover:bg-white/15">Catalog</Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 7h18M3 12h18M3 17h18'} /></svg>
          </button>
        </div>

        {/* Secondary nav (categories) */}
        <nav className="hidden border-t border-white/10 md:block">
          <div className="container-page flex h-11 items-center gap-1 text-[13px]">
            <button
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              className="relative flex h-full items-center gap-1.5 px-3 font-semibold text-white hover:bg-brand-dark"
            >
              <span>☰</span> Shop by Category
              {shopOpen && (
                <div className="absolute left-0 top-full z-50 grid w-[760px] grid-cols-2 gap-x-6 gap-y-1 rounded-b-md bg-white p-5 text-left shadow-card-hover">
                  {categories.map((c) => (
                    <Link key={c.slug} to={`/categories/${c.slug}`} className="rounded px-3 py-2 text-[13px] font-medium text-ink-800 hover:bg-brand-soft hover:text-brand">
                      {c.name}
                      <span className="ml-2 text-[11px] font-normal text-ink-500">{c.subcategories.length}</span>
                    </Link>
                  ))}
                </div>
              )}
            </button>
            {[
              ['products', t('nav.products', 'Products')],
              ['categories', t('nav.categories', 'Categories')],
              ['markets', t('nav.markets', 'Markets')],
              ['wholesale', t('nav.wholesale', 'Wholesale')],
              ['blog', 'Garage Blog'],
              ['about', t('nav.about', 'About')],
              ['contact', 'Contact'],
            ].map(([k, label]) => (
              <NavLink key={k} to={`/${k}`} className={({ isActive }) => `flex h-full items-center px-3 nav-link ${isActive ? '!text-white border-b-2 border-accent -mb-[1px]' : ''}`}>{label}</NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-ink-200 bg-white md:hidden">
          <div className="container-page py-3">
            <form className="flex overflow-hidden rounded-md border border-ink-300" onSubmit={(e) => e.preventDefault()}>
              <input type="search" placeholder="Search parts…" className="flex-1 px-3 py-2 text-[14px] outline-none" />
              <button className="bg-accent px-4 text-white">Go</button>
            </form>
            <nav className="mt-3 flex flex-col text-[15px]">
              {[['/', 'Home'], ['/categories', 'Categories'], ['/products', 'Products'], ['/markets', 'Markets'], ['/wholesale', 'Wholesale'], ['/blog', 'Garage Blog'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <NavLink key={href} to={href} className="border-b border-ink-100 py-3 text-ink-800" onClick={() => setOpen(false)}>{label}</NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
