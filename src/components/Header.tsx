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
      {/* Top promo bar */}
      <div className="bg-accent text-white">
        <div className="container-page flex h-9 items-center justify-center text-center text-[12px] font-semibold tracking-wide">
          🚚 FREE SHIPPING ON ORDERS $50+ · 60-DAY HASSLE-FREE RETURNS · GUARANTEED TO FIT
        </div>
      </div>

      {/* Utility bar */}
      <div className="bg-ink-900 text-white">
        <div className="container-page flex h-9 items-center justify-between text-[12px]">
          <div className="hidden gap-5 sm:flex">
            <Link to="/wholesale" className="util-link">Shop Performance</Link>
            <Link to="/wholesale" className="util-link">Shop Euro</Link>
            <Link to="/wholesale" className="util-link">Guaranteed to Fit</Link>
            <Link to="/wholesale" className="util-link">Fast Shipping</Link>
            <Link to="/wholesale" className="util-link">Hassle-Free Returns</Link>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+8653289876543" className="util-link hidden sm:inline">📞 +86 532 8987 6543</a>
            <Link to="/contact" className="util-link">Help</Link>
            <Link to="/contact" className="util-link">Track Order</Link>
            <select aria-label="Language" className="bg-transparent text-[12px] text-white/85 outline-none cursor-pointer hover:text-white" value={i18n.language?.split('-')[0] || 'en'} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              {supportedLngs.map((l) => (<option key={l} value={l} className="text-ink-900">{langLabel[l]}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary brand bar */}
      <div className="bg-brand text-white">
        <div className="container-page flex h-[68px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display text-[22px] font-bold tracking-tight" onClick={() => setOpen(false)}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-accent text-[15px] font-bold">V</span>
            VETHY
          </Link>

          {/* Search */}
          <form className="hidden flex-1 items-center md:flex" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-card">
              <select className="hidden bg-ink-050 px-3 text-[12px] font-semibold text-ink-700 outline-none lg:block">
                <option>All Departments</option>
                {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
              </select>
              <input type="search" placeholder="Search by part name, brand or part number…" className="flex-1 px-4 py-2.5 text-[14px] text-ink-900 outline-none placeholder:text-ink-500" />
              <button type="submit" className="bg-accent px-6 text-[14px] font-bold text-white hover:bg-accent-dark">SEARCH</button>
            </div>
          </form>

          <div className="hidden items-center gap-5 text-[12px] md:flex">
            <Link to="/contact" className="flex flex-col items-center text-white/95 hover:text-white">
              <span className="text-[18px]">👤</span>
              <span>Sign In</span>
            </Link>
            <Link to="/contact" className="relative flex flex-col items-center text-white/95 hover:text-white">
              <span className="text-[18px]">🛒</span>
              <span>Cart</span>
              <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold">0</span>
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 7h18M3 12h18M3 17h18'} /></svg>
          </button>
        </div>

        {/* Add Vehicle banner */}
        <div className="bg-brand-dark">
          <div className="container-page flex h-10 items-center gap-3 text-[12px] text-white/95">
            <span className="text-base">🚗</span>
            <span className="font-semibold">Add Vehicle to Guarantee Fit!</span>
            <Link to="/" className="ml-auto rounded bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide hover:bg-accent-dark">+ Add Vehicle</Link>
          </div>
        </div>

        {/* Secondary nav (categories) */}
        <nav className="hidden border-t border-white/10 md:block">
          <div className="container-page flex h-11 items-center gap-1 text-[13px]">
            <button
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              className="relative flex h-full items-center gap-1.5 px-4 font-semibold text-white hover:bg-brand-dark"
            >
              <span>☰</span> SHOP BY CATEGORY
              {shopOpen && (
                <div className="absolute left-0 top-full z-50 grid w-[820px] grid-cols-2 gap-x-6 gap-y-1 rounded-b-md bg-white p-5 text-left shadow-card-hover">
                  {categories.map((c) => (
                    <Link key={c.slug} to={`/categories/${c.slug}`} className="rounded px-3 py-2 text-[13px] font-semibold text-ink-800 hover:bg-brand-soft hover:text-brand">
                      {c.name}
                      <span className="ml-2 text-[11px] font-normal text-ink-500">({c.subcategories.length})</span>
                    </Link>
                  ))}
                </div>
              )}
            </button>
            {[
              ['products', 'Featured Deals'],
              ['categories', 'All Parts'],
              ['markets', 'Brands'],
              ['wholesale', 'Wholesale'],
              ['blog', 'In the Garage Blog'],
              ['about', 'About'],
              ['contact', 'Help Center'],
            ].map(([k, label]) => (
              <NavLink key={k} to={`/${k}`} className={({ isActive }) => `flex h-full items-center px-3 text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-dark transition ${isActive ? '!text-white border-b-2 border-accent -mb-[1px]' : ''}`}>{label}</NavLink>
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
              <button className="bg-accent px-4 text-white font-bold">GO</button>
            </form>
            <nav className="mt-3 flex flex-col text-[15px]">
              {[['/', 'Home'], ['/categories', 'Shop by Category'], ['/products', 'Featured Deals'], ['/markets', 'Brands'], ['/wholesale', 'Wholesale'], ['/blog', 'In the Garage Blog'], ['/about', 'About'], ['/contact', 'Help Center']].map(([href, label]) => (
                <NavLink key={href} to={href} className="border-b border-ink-100 py-3 text-ink-800" onClick={() => setOpen(false)}>{label}</NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
