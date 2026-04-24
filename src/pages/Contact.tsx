import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { RFQForm } from '../components/RFQForm';

export default function Contact() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact VETHY', url: 'https://www.vethy.com.cn/contact' };
  return (
    <>
      <SEO title="Contact VETHY | Wholesale Auto Parts Quote, RFQ & Sales" description="Send your wholesale auto parts wishlist or OE references to VETHY. We respond with consolidated container pricing within 24 hours." path="/contact" keywords={['contact VETHY', 'auto parts RFQ', 'wholesale auto parts quote']} jsonLd={jsonLd} />

      <section className="bg-brand text-white">
        <div className="container-page py-12">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Contact</span></nav>
          <h1 className="mt-3 text-display-lg text-balance">Send your wishlist. Get a quote in 24 hours.</h1>
          <p className="mt-3 max-w-2xl text-[14px] text-white/85">Tell us what you need — SKU list, OE references, target market — and we'll respond with consolidated container pricing.</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <RFQForm />
          <aside className="space-y-6">
            <div className="rounded-lg border border-ink-200 bg-ink-050 p-6">
              <p className="eyebrow mb-2">Direct contact</p>
              <h2 className="font-display text-[18px] font-bold text-ink-900">Sales</h2>
              <p className="mt-3 text-[14px] text-ink-700">Email · <a href="mailto:sales@vethy.com.cn" className="font-semibold text-brand hover:underline">sales@vethy.com.cn</a></p>
              <p className="mt-1 text-[14px] text-ink-700">WhatsApp · <span className="font-semibold text-ink-900">+86 138 0000 0000</span></p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-6">
              <p className="eyebrow mb-2">Address</p>
              <h2 className="font-display text-[18px] font-bold text-ink-900">Qingdao VETHY Industrial Co., Ltd.</h2>
              <p className="mt-2 text-[14px] text-ink-700">Qingdao, Shandong, China</p>
              <p className="mt-1 text-[14px] text-ink-700">Working hours: Mon–Sat, 09:00–18:00 (UTC+8)</p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-6">
              <p className="eyebrow mb-2">Languages</p>
              <p className="text-[13px] text-ink-700">English · Español · Русский · العربية · Português · Français · Deutsch · 中文</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
