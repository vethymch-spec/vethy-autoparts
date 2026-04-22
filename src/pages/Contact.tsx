import { useState } from 'react';
import { SEO } from '../components/SEO';

export default function Contact() {
  const [done, setDone] = useState(false);

  return (
    <>
      <SEO
        title="Contact VETHY | Wholesale Auto Parts Quote Request"
        description="Contact VETHY for wholesale auto parts quotes. Email sales@vethy.com.cn or submit your inquiry online. We respond within 24 hours, Monday to Saturday."
        path="/contact"
        keywords={['contact VETHY', 'wholesale auto parts quote', 'auto parts inquiry']}
      />

      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/banner-contact.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">Contact</p>
          <h1 className="text-display-lg text-balance">Talk to sales.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">Tell us your target categories, target markets and container plans. We'll respond within one working day.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Direct</p>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">We're here.</h2>
              <dl className="mt-8 space-y-6 text-[15px]">
                <div><dt className="text-ink-500">Email</dt><dd className="mt-1 font-display text-lg font-semibold text-ink-900">sales@vethy.com.cn</dd></div>
                <div><dt className="text-ink-500">WhatsApp</dt><dd className="mt-1 font-display text-lg font-semibold text-ink-900">Available on request</dd></div>
                <div><dt className="text-ink-500">Office</dt><dd className="mt-1 font-display text-lg font-semibold text-ink-900">Qingdao, Shandong, China</dd></div>
                <div><dt className="text-ink-500">Hours</dt><dd className="mt-1 font-display text-lg font-semibold text-ink-900">Mon–Sat · 9:00–18:00 CST (UTC+8)</dd></div>
              </dl>
            </div>

            <div className="rounded-3xl bg-[#f5f5f7] p-10">
              {done ? (
                <div className="text-center py-12">
                  <p className="eyebrow mb-3">Received</p>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Thank you.</h2>
                  <p className="mt-3 text-ink-700">We'll respond within one working day.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="grid gap-5">
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Company</label>
                    <input name="company" className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] outline-none focus:border-black" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Name</label>
                      <input name="name" className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] outline-none focus:border-black" required />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Email</label>
                      <input type="email" name="email" className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] outline-none focus:border-black" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Country</label>
                    <input name="country" className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">Inquiry</label>
                    <textarea name="message" rows={5} className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] outline-none focus:border-black" required />
                  </div>
                  <button type="submit" className="btn-pill-dark mt-2">Send inquiry</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
