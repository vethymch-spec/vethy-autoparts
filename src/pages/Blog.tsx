import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogPosts, findPost } from '../data/blog';

export function BlogIndex() {
  return (
    <>
      <SEO
        title="Auto Parts Industry Blog | VETHY"
        description="In-depth guides on sourcing, importing and wholesaling auto parts from China — covering OEM vs aftermarket, market trends, supplier vetting and product selection."
        path="/blog"
        keywords={['auto parts blog', 'auto parts sourcing guide', 'auto parts industry insights']}
      />
      <section className="bg-ink-900 text-white">
        <div className="container-page py-14">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Industry Blog</h1>
          <p className="mt-3 max-w-3xl text-gray-300">Long-form, sourced guides for global wholesale auto parts buyers.</p>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="card group">
              <div className="text-xs uppercase tracking-wider text-brand">{p.category}</div>
              <h2 className="mt-2 font-display text-lg font-bold text-ink-900 group-hover:text-brand">{p.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.excerpt}</p>
              <p className="mt-3 text-xs text-ink-500">{p.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const p = findPost(slug || '');
  if (!p) return <div className="container-page py-20">Post not found.</div>;
  return (
    <>
      <SEO
        title={`${p.title} | VETHY Blog`}
        description={p.excerpt}
        path={`/blog/${p.slug}`}
        keywords={p.keywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          author: { '@type': 'Organization', name: 'VETHY Auto Parts' },
          publisher: { '@type': 'Organization', name: 'Qingdao VETHY Industrial Co., Ltd.', logo: { '@type': 'ImageObject', url: 'https://www.vethy.com.cn/logo.png' } },
          mainEntityOfPage: `https://www.vethy.com.cn/blog/${p.slug}`,
        }}
      />
      <article className="container-page py-16 max-w-3xl">
        <nav className="text-sm text-ink-500"><Link to="/blog">Blog</Link> / <span className="text-ink-900">{p.title}</span></nav>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-ink-900">{p.title}</h1>
        <p className="mt-2 text-sm text-ink-500">{p.date} · {p.category}</p>
        <p className="mt-6 text-lg text-ink-700">{p.excerpt}</p>
        <div className="mt-10 space-y-8">
          {p.content.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-ink-900">{s.heading}</h2>
              <p className="mt-3 text-ink-700 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
