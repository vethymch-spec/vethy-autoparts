import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { rtlLngs } from '../i18n';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  jsonLd?: object | object[];
  image?: string;
}

const SITE = 'https://www.vethy.com.cn';

export function SEO({ title, description, path, keywords, jsonLd, image }: SEOProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const dir = rtlLngs.has(lang) ? 'rtl' : 'ltr';
  const url = `${SITE}${path}`;
  const ogImage = image || `${SITE}/og-image.jpg`;

  return (
    <Helmet>
      <html lang={lang} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="VETHY Auto Parts" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
