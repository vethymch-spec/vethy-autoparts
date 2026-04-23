import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blog';

export function BlogIndex() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Blog', name: 'VETHY Insights', url: 'https://www.vethy.com.cn/blog', blogPost: blogPosts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `https://www.vethy.com.cn/blog/${p.slug}`, datePublished: p.date })) };
  return (
    <>
      <SEO
        title="Auto Parts Wholesale Blog | VETHY Insights for Global Buyers"
        description="Industry insights for wholesale auto parts buyers: sourcing guides, market analysis, certification standards (ECE R90, IATF 16949), container shipping tips and more from VETHY."
        path="/blog"
        keywords={['auto parts blog', 'wholesale sourcing guide', 'auto parts industry insights', 'ECE R90 guide', 'container shipping auto parts']}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-16 bg-ink-050">
        <div className="container-page">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <span className="text-ink-900">Blog</span></nav>
          <p className="eyebrow mt-6 mb-3">Insights</p>
          <h1 className="text-display-lg text-ink-900 text-balance max-w-3xl">From the VETHY desk.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base">Sourcing guides, market briefings and certification notes for global auto parts wholesalers.</p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group card">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="card-img transition group-hover:opacity-90" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow">{p.category} · {p.date}</p>
                  <h2 className="font-display text-[17px] font-medium leading-snug text-ink-900">{p.title}</h2>
                  <p className="mt-2 text-[13px] text-ink-600 line-clamp-3">{p.excerpt}</p>
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
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <div className="container-page pt-32 pb-24">Post not found.</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Organization', name: 'VETHY' },
      publisher: { '@type': 'Organization', name: 'VETHY', logo: { '@type': 'ImageObject', url: 'https://www.vethy.com.cn/logo.png' } },
      mainEntityOfPage: `https://www.vethy.com.cn/blog/${post.slug}`,
      image: `https://www.vethy.com.cn/images/blog-${post.slug}.svg`,
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vethy.com.cn/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.vethy.com.cn/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.vethy.com.cn/blog/${post.slug}` },
    ]},
  ];

  return (
    <>
      <SEO
        title={`${post.title} | VETHY Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.keywords}
        jsonLd={jsonLd}
      />

      <section className="pt-28 pb-12 bg-ink-050">
        <div className="container-narrow">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-ink-900">Home</Link> / <Link to="/blog" className="hover:text-ink-900">Blog</Link></nav>
          <p className="eyebrow mt-6 mb-3">{post.category} · {post.date}</p>
          <h1 className="text-display-lg text-ink-900 text-balance">{post.title}</h1>
        </div>
      </section>

      <section className="bg-ink-050 pb-16">
        <div className="container-narrow">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-100">
            <img src={`/images/blog-${post.slug}.svg`} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <article className="bg-white py-20">
        <div className="container-narrow">
          <p className="text-[19px] leading-[1.75] text-ink-800">{post.excerpt}</p>
          {post.content.map((s, i) => (
            <section key={i} className="mt-12">
              <h2 className="font-display text-[22px] font-medium text-ink-900 sm:text-[26px]">{s.heading}</h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-ink-700">{s.body}</p>
            </section>
          ))}
          <div className="mt-16 hairline pt-10">
            <Link to="/contact" className="btn-dark">Get a wholesale quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
