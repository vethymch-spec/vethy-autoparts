import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function Contact() {
  const [done, setDone] = useState(false);

  return (
    <>
      <SEO
        title="Contact VETHY | Wholesale Auto Parts Quote Request"
        description="Contact VETHY for wholesale auto parts quotes. Email sales@vethy.com.cn or submit your inquiry online. We respond within one working day, Monday to Saturday."
        path="/contact"
        keywords={['contact VETHY', 'wholesale auto parts quote', 'auto parts inquiry', 'China auto parts supplier contact']}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Contact</span></nav>
          <p className="eyebrow mt-6 mb-3">Contact</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">Talk to sales.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">Tell us your target categories, target markets and container plans. We respond within one working day.</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Direct</p>
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">We're here.</h2>
              <dl className="mt-8 space-y-6 text-[15px]">
                <div><dt className="text-ink-500">Email</dt><dd className="mt-1 font-display text-[17px] font-medium text-ink-900">sales@vethy.com.cn</dd></div>
                <div><dt className="text-ink-500">WhatsApp</dt><dd className="mt-1 font-display text-[17px] font-medium text-ink-900">Available on request</dd></div>
                <div><dt className="text-ink-500">Office</dt><dd className="mt-1 font-display text-[17px] font-medium text-ink-900">Qingdao, Shandong, China</dd></div>
                <div><dt className="text-ink-500">Hours</dt><dd className="mt-1 font-display text-[17px] font-medium text-ink-900">Mon–Sat · 9:00–18:00 CST (UTC+8)</dd></div>
              </dl>
            </div>

            <div className="bg-ink-050 p-10">
              {done ? (
                <div className="py-12 text-center">
                  <p className="eyebrow mb-3">Received</p>
                  <h2 className="font-display text-[22px] font-medium text-ink-900">Thank you.</h2>
                  <p className="mt-3 text-[15px] text-ink-600">We'll respond within one working day.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="grid gap-5">
                  <Field label="Company" name="company" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" />
                    <Field label="Email" name="email" type="email" />
                  </div>
                  <Field label="Country" name="country" />
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">Inquiry</label>
                    <textarea name="message" rows={5} className="mt-2 w-full border border-ink-200 bg-white px-4 py-3 text-[15px] outline-none focus:border-ink-900" required />
                  </div>
                  <button type="submit" className="btn-dark mt-2">Send inquiry</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = 'text' }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">{label}</label>
      <input name={name} type={type} className="mt-2 w-full border border-ink-200 bg-white px-4 py-3 text-[15px] outline-none focus:border-ink-900" required />
    </div>
  );
}
