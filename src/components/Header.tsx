import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supportedLngs } from '../i18n';

const langLabel: Record<string, string> = { en: 'EN', es: 'ES', ru: 'RU', ar: 'AR', pt: 'PT', fr: 'FR', de: 'DE' };

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'glass-light border-b border-ink-200' : 'bg-transparent'}`}>
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-[15px] font-medium tracking-wide text-ink-900" onClick={() => setOpen(false)}>
          <span className="inline-block h-[14px] w-[14px] bg-ink-900" aria-hidden />
          VETHY
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] md:flex">
          {[
            ['categories', t('nav.categories')],
            ['products', t('nav.products')],
            ['markets', t('nav.markets')],
            ['wholesale', t('nav.wholesale')],
            ['blog', t('nav.blog')],
            ['about', t('nav.about')],
          ].map(([k, label]) => (
            <NavLink key={k} to={`/${k}`} className={({ isActive }) => `text-ink-700 hover:text-ink-900 transition ${isActive ? '!text-ink-900 font-medium' : ''}`}>{label}</NavLink>
          ))}
          <Link to="/contact" className="bg-ink-900 text-white px-4 py-1.5 text-[12px] font-medium hover:bg-ink-800 transition">{t('nav.rfq')}</Link>
          <select aria-label="Language" className="bg-transparent text-[12px] text-ink-700 outline-none cursor-pointer" value={i18n.language?.split('-')[0] || 'en'} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {supportedLngs.map((l) => (<option key={l} value={l} className="text-ink-900">{langLabel[l]}</option>))}
          </select>
        </nav>

        <button className="md:hidden text-ink-900" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 7h18M3 17h18'} /></svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3 text-[15px]">
            {[['/', t('nav.home')], ['/categories', t('nav.categories')], ['/products', t('nav.products')], ['/markets', t('nav.markets')], ['/wholesale', t('nav.wholesale')], ['/blog', t('nav.blog')], ['/about', t('nav.about')], ['/contact', t('nav.rfq')]].map(([href, label]) => (
              <NavLink key={href} to={href} className="py-3 text-ink-800 hover:text-ink-900" onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
