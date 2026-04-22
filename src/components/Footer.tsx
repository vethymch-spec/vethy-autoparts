import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { markets } from '../data/markets';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-gray-200 bg-ink-900 text-gray-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-md bg-brand" aria-hidden />
            <span className="font-display text-xl font-extrabold tracking-wider text-white">VETHY</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">{t('footer.tagline')}</p>
          <p className="mt-4 text-xs text-gray-500">{t('footer.company')}</p>
          <p className="mt-1 text-xs text-gray-500">Qingdao, Shandong, China</p>
          <p className="mt-1 text-xs text-gray-500">sales@vethy.com.cn</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link to={`/categories/${c.slug}`} className="text-gray-400 hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Markets</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {markets.slice(0, 8).map((m) => (
              <li key={m.slug}>
                <Link to={`/markets/${m.slug}`} className="text-gray-400 hover:text-white">{m.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
            <li><Link to="/wholesale" className="text-gray-400 hover:text-white">Wholesale Program</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white">Industry Blog</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact / RFQ</Link></li>
            <li><a href="https://www.cooldrivepro.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white">CoolDrivePro (Parking AC)</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-gray-500 md:flex-row">
          <span>© {year} {t('footer.company')}. {t('footer.rights')}</span>
          <span>vethy.com.cn</span>
        </div>
      </div>
    </footer>
  );
}
