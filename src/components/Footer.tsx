import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { markets } from '../data/markets';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white text-ink-700">
      <div className="container-page hairline py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-wide text-ink-900">
              <span className="inline-block h-5 w-5 rounded-sm bg-brand" /> VETHY
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-500">Qingdao VETHY Industrial Co., Ltd. — wholesale auto parts manufacturer & exporter. Sister site: <a href="https://www.cooldrivepro.com" className="text-ink-900 underline-offset-4 hover:underline">CoolDrivePro</a>.</p>
          </div>
          <FooterCol title={t('footer.categories', 'Categories')}>
            {categories.slice(0, 6).map((c) => <FooterLink key={c.slug} to={`/categories/${c.slug}`}>{c.name}</FooterLink>)}
          </FooterCol>
          <FooterCol title={t('footer.markets', 'Markets')}>
            {markets.slice(0, 6).map((m) => <FooterLink key={m.slug} to={`/markets/${m.slug}`}>{m.name}</FooterLink>)}
          </FooterCol>
          <FooterCol title={t('footer.company', 'Company')}>
            <FooterLink to="/about">{t('nav.about')}</FooterLink>
            <FooterLink to="/wholesale">{t('nav.wholesale')}</FooterLink>
            <FooterLink to="/blog">{t('nav.blog')}</FooterLink>
            <FooterLink to="/contact">{t('nav.rfq')}</FooterLink>
          </FooterCol>
        </div>
      </div>
      <div className="hairline">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-[12px] text-ink-500 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Qingdao VETHY Industrial Co., Ltd.</span>
          <span>Designed & built in Qingdao, China.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-900">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[13px]">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <li><Link to={to} className="text-ink-500 hover:text-ink-900">{children}</Link></li>;
}
