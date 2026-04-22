import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { supportedLngs } from '../i18n';

const langLabel: Record<string, string> = {
  en: 'EN', es: 'ES', ru: 'RU', ar: 'AR', pt: 'PT', fr: 'FR', de: 'DE',
};

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const navLink = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold ${isActive ? 'text-brand' : 'text-ink-700 hover:text-brand'} transition-colors`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-md bg-brand" aria-hidden />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-extrabold tracking-wider text-ink-900">VETHY</span>
            <span className="text-[10px] uppercase tracking-widest text-ink-500">Auto Parts</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLink}>{t('nav.home')}</NavLink>
          <NavLink to="/categories" className={navLink}>{t('nav.categories')}</NavLink>
          <NavLink to="/products" className={navLink}>{t('nav.products')}</NavLink>
          <NavLink to="/markets" className={navLink}>{t('nav.markets')}</NavLink>
          <NavLink to="/wholesale" className={navLink}>{t('nav.wholesale')}</NavLink>
          <NavLink to="/blog" className={navLink}>{t('nav.blog')}</NavLink>
          <NavLink to="/about" className={navLink}>{t('nav.about')}</NavLink>
          <Link to="/contact" className="btn-primary !py-2 !px-4 text-sm">{t('nav.rfq')}</Link>
          <select
            aria-label="Language"
            className="ml-2 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-ink-700"
            value={i18n.language?.split('-')[0] || 'en'}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {supportedLngs.map((l) => (
              <option key={l} value={l}>{langLabel[l]}</option>
            ))}
          </select>
        </nav>

        <button
          className="md:hidden text-ink-700"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-page flex flex-col gap-3 py-4">
            {['home','categories','products','markets','wholesale','blog','about','contact'].map((k) => (
              <NavLink key={k} to={k === 'home' ? '/' : `/${k}`} className={navLink} onClick={() => setOpen(false)}>
                {t(`nav.${k}`)}
              </NavLink>
            ))}
            <select
              aria-label="Language"
              className="rounded border border-gray-300 bg-white px-2 py-2 text-sm font-semibold text-ink-700"
              value={i18n.language?.split('-')[0] || 'en'}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              {supportedLngs.map((l) => (
                <option key={l} value={l}>{langLabel[l]}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
