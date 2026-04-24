import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blog';

export function BlogIndex() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Blog', name: 'VETHY Garage Blog', url: 'https://www.vethy.com.cn/blog', blogPost: blogPosts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `https://www.vethy.com.cn/blog/${p.slug}`, datePublished: p.date })) };
  return (
    <>
      <SEO
        title="Garage Blog | VETHY Wholesale Auto Parts Insights"
        description="Industry insights for wholesale auto parts buyers: sourcing guides, market analysis, certification standards (ECE R90, IATF 16949), container shipping tips and more."
        path="/blog"
        keywords={['auto parts blog', 'wholesale sourcing guide', 'auto parts industry insights', 'ECE R90 guide']}
        jsonLd={jsonLd}
      />

      <section className="bg-brand text-white">
        <div className="container-page py-10">
          <nav className="text-[12px] text-white/75"><Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Garage Blog</span></nav>
          <h1 className="mt-3 text-display-lg">Garage Blog</h1>
          <p className="mt-2 max-w-2xl text-[14px] text-white/85">Sourcing guides, market briefings and certification notes for global auto parts wholesalers.</p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card group">
                <img src={`/images/blog-${p.slug}.svg`} alt={p.title} className="card-img" loading="lazy" />
                <div className="card-body">
                  <p className="eyebrow-muted">{p.category} · {p.date}</p>
                  <h2 className="font-display text-[16px] font-bold leading-snug text-ink-900 group-hover:text-brand">{p.title}</h2>
                  <p className="mt-1 text-[13px] text-ink-600 line-clamp-3">{p.excerpt}</p>
                  <span className="btn-link mt-2">Read article →</span>
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
  if (!post) return <div className="container-page py-24">Post not found.</div>;

  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: post.excerpt, datePublished: post.date,
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
      <SEO title={`${post.title} | VETHY Garage Blog`} description={post.excerpt} path={`/blog/${post.slug}`} keywords={post.keywords} jsonLd={jsonLd} />

      <section className="bg-ink-050">
        <div className="container-page py-6">
          <nav className="text-[12px] text-ink-500"><Link to="/" className="hover:text-brand">Home</Link> / <Link to="/blog" className="hover:text-brand">Garage Blog</Link> / <span className="text-ink-900">{post.title}</span></nav>
        </div>
      </section>

      <article className="bg-white pb-16">
        <div className="container-narrow pt-10">
          <p className="eyebrow mb-2">{post.category} · {post.date}</p>
          <h1 className="text-display-lg text-ink-900 text-balance">{post.title}</h1>
          <div className="mt-8 overflow-hidden rounded-lg border border-ink-200">
            <img src={`/images/blog-${post.slug}.svg`} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
          <p className="mt-8 text-[18px] leading-[1.7] text-ink-800">{post.excerpt}</p>
          {post.content.map((s, i) => (
            <section key={i} className="mt-10">
              <h2 className="font-display text-[22px] font-bold text-ink-900 sm:text-[26px]">{s.heading}</h2>
              <p className="mt-3 text-[16px] leading-[1.75] text-ink-700">{s.body}</p>
            </section>
          ))}
          <div className="mt-12 rounded-lg border border-ink-200 bg-ink-050 p-6">
            <p className="font-display text-[18px] font-bold text-ink-900">Need a wholesale quote?</p>
            <p className="mt-2 text-[14px] text-ink-600">Send your wishlist or OE references — we respond within 24 hours.</p>
            <Link to="/contact" className="btn-accent mt-4">Request a quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
