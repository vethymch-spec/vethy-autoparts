import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';

export function RFQForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  return (
    <form
      className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget as HTMLFormElement);
        const subject = encodeURIComponent(`Wholesale RFQ: ${data.get('category') || 'General'}`);
        const body = encodeURIComponent(
          `Name: ${data.get('name')}\nCompany: ${data.get('company')}\nCountry: ${data.get('country')}\nCategory: ${data.get('category')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
        );
        window.location.href = `mailto:sales@vethy.com.cn?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <div className="md:col-span-2">
        <h3 className="font-display text-2xl font-bold text-ink-900">{t('rfq.title')}</h3>
        <p className="mt-1 text-sm text-ink-500">{t('rfq.subtitle')}</p>
      </div>
      <input name="name" required placeholder={t('rfq.name') as string} className="rounded border border-gray-300 px-3 py-2" />
      <input name="email" type="email" required placeholder={t('rfq.email') as string} className="rounded border border-gray-300 px-3 py-2" />
      <input name="company" placeholder={t('rfq.company') as string} className="rounded border border-gray-300 px-3 py-2" />
      <input name="country" placeholder={t('rfq.country') as string} className="rounded border border-gray-300 px-3 py-2" />
      <select name="category" className="rounded border border-gray-300 px-3 py-2 md:col-span-2">
        <option value="">{t('rfq.category')}</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.name}>{c.name}</option>
        ))}
      </select>
      <textarea name="message" required rows={5} placeholder={t('rfq.message') as string} className="rounded border border-gray-300 px-3 py-2 md:col-span-2" />
      <button type="submit" className="btn-primary md:col-span-2">{t('rfq.submit')}</button>
      {sent && <p className="text-sm text-green-700 md:col-span-2">{t('rfq.thanks')}</p>}
    </form>
  );
}
