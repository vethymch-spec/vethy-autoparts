import { SEO } from '../components/SEO';
import { RFQForm } from '../components/RFQForm';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact VETHY | Wholesale Auto Parts Inquiry"
        description="Send your wholesale auto parts inquiry, RFQ or SKU list to VETHY. Replies within one business day. sales@vethy.com.cn."
        path="/contact"
        keywords={['contact VETHY', 'wholesale auto parts RFQ', 'auto parts inquiry']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Contact / RFQ</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Send your SKU list, target volume and shipping destination — we'll come back with a quote within one business day.</p>
        </div>
      </section>
      <section className="container-page grid gap-10 py-16 md:grid-cols-2">
        <div className="space-y-6 text-ink-700">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Email</h2>
            <p>sales@vethy.com.cn</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Headquarters</h2>
            <p>Qingdao, Shandong, China</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Languages</h2>
            <p>English · Español · Русский · العربية · Português · Français · Deutsch · 中文</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Working hours</h2>
            <p>Mon-Sat 09:00-18:00 (UTC+8)</p>
          </div>
        </div>
        <RFQForm />
      </section>
    </>
  );
}
