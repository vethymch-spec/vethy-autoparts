import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogPosts, findPost } from '../data/blog';

export function BlogIndex() {
  return (
    <>
      <SEO
        title="Auto Parts Wholesale Blog | VETHY Insights"
        description="Industry insights for wholesale auto parts buyers: sourcing guides, market analysis, certification standards, container shipping tips and more from VETHY."
        path="/blog"
        keywords={['auto parts blog', 'wholesale sourcing guide', 'auto parts industry insights']}
      />

      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src="/images/hero.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">Insights</p>
          <h1 className="text-display-lg text-balance">From the VETHY desk.</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">Sourcing guides, market analysis and certification briefs for global auto parts wholesalers.</p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group tile">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="tile-img" loading="lazy" />
                <div className="tile-body">
                  <p className="eyebrow-light">{p.category}</p>
                </div>
                <div className="tile-foot">
                  <h2 className="font-display text-lg font-bold leading-tight text-white">{p.title}</h2>
                  <p className="mt-2 text-[12px] text-white/70">{p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = findPost(slug || '');
  if (!post) return <div className="container-page py-32">Post not found.</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'VETHY' },
    publisher: { '@type': 'Organization', name: 'VETHY', logo: { '@type': 'ImageObject', url: 'https://www.vethy.com.cn/logo.png' } },
    mainEntityOfPage: `https://www.vethy.com.cn/blog/${post.slug}`,
    image: `https://www.vethy.com.cn/images/blog-${post.slug}.svg`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | VETHY Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={[post.category, 'auto parts wholesale', 'sourcing guide']}
        jsonLd={jsonLd}
      />

      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[#0a0c10] pt-32 pb-20 text-white">
        <img src={`/images/blog-${post.slug}.svg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))' }} />
        <div className="container-page relative">
          <p className="eyebrow-light mb-4">{post.category} · {post.readTime}</p>
          <h1 className="text-display-lg text-balance">{post.title}</h1>
        </div>
      </section>

      <article className="bg-white py-24 sm:py-32">
        <div className="container-narrow">
          <p className="text-xl leading-relaxed text-ink-700">{post.excerpt}</p>
          {post.sections.map((s, i) => (
            <section key={i} className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{s.heading}</h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">{s.body}</p>
            </section>
          ))}
          <div className="mt-16 border-t border-black/[0.08] pt-10">
            <Link to="/contact" className="btn-pill-dark">Get a wholesale quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
