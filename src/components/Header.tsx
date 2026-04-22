import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supportedLngs } from '../i18n';

const langLabel: Record<string, string> = { en: 'EN', es: 'ES', ru: 'RU', ar: 'AR', pt: 'PT', fr: 'FR', de: 'DE' };

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dark = !onHome || scrolled || open;
  const headerBg = dark ? 'glass border-b border-black/5 text-ink-900' : 'bg-transparent text-white';
  const linkColor = dark ? 'text-ink-900/80 hover:text-ink-900' : 'text-white/85 hover:text-white';
  const ctaClass = dark ? 'bg-black text-white hover:bg-black/85' : 'bg-white text-black hover:bg-white/90';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${headerBg}`}>
      <div className="container-page flex h-12 items-center justify-between sm:h-14">
        <Link to="/" className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-wide" onClick={() => setOpen(false)}>
          <span className="inline-block h-5 w-5 rounded-sm bg-brand" aria-hidden />
          VETHY
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] md:flex">
          {[
            ['categories', t('nav.categories')],
            ['products', t('nav.products')],
            ['markets', t('nav.markets')],
            ['wholesale', t('nav.wholesale')],
            ['blog', t('nav.blog')],
            ['about', t('nav.about')],
          ].map(([k, label]) => (
            <NavLink key={k} to={`/${k}`} className={({ isActive }) => `${linkColor} transition ${isActive ? '!text-brand' : ''}`}>{label}</NavLink>
          ))}
          <Link to="/contact" className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${ctaClass}`}>{t('nav.rfq')}</Link>
          <select aria-label="Language" className={`bg-transparent text-[12px] font-medium ${linkColor} outline-none`} value={i18n.language?.split('-')[0] || 'en'} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {supportedLngs.map((l) => (<option key={l} value={l} className="text-black">{langLabel[l]}</option>))}
          </select>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 7h18M3 17h18'} /></svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white text-ink-900 md:hidden">
          <div className="container-page flex flex-col gap-1 py-3 text-[15px] font-medium">
            {[['/', t('nav.home')], ['/categories', t('nav.categories')], ['/products', t('nav.products')], ['/markets', t('nav.markets')], ['/wholesale', t('nav.wholesale')], ['/blog', t('nav.blog')], ['/about', t('nav.about')], ['/contact', t('nav.rfq')]].map(([href, label]) => (
              <NavLink key={href} to={href} className="rounded px-2 py-3 hover:bg-ink-100" onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
