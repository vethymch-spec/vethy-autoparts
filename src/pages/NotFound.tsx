import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | VETHY" description="The page you requested could not be found." path="/404" />
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-5xl font-extrabold text-ink-900">404</h1>
        <p className="mt-3 text-ink-500">We couldn't find the page you were looking for.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Back to home</Link>
      </section>
    </>
  );
}
