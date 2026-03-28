import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ehautomation.co.il';
const SITE_NAME = 'EH Automation';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Reusable SEO head component with canonical URL, OG tags, and structured data.
 * All pages should use this instead of raw Helmet.
 */
export const SEOHead = ({ title, description, path, type = 'website', noindex }: SEOProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="he_IL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <html lang="he" dir="rtl" />
    </Helmet>
  );
};

/**
 * JSON-LD Organization schema for the homepage.
 */
export const OrganizationSchema = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'סטודיו לאוטומציה עסקית ובינה מלאכותית',
      founder: {
        '@type': 'Person',
        name: 'אלעד חנינה',
        jobTitle: 'מייסד',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'חיים לסקוב 22',
        addressLocality: 'נתניה',
        addressCountry: 'IL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+972-54-710-8219',
        contactType: 'sales',
        availableLanguage: ['Hebrew', 'English'],
      },
      sameAs: [
        'https://www.facebook.com/share/1BzC7fVZH5/?mibextid=wwXIfr',
        'https://www.linkedin.com/company/elad-automation',
        'https://www.instagram.com/elad.archive?igsh=czhjYWgzZDJpdXgx&utm_source=qr',
      ],
    })}</script>
  </Helmet>
);

/**
 * JSON-LD BreadcrumbList schema.
 */
export const BreadcrumbSchema = ({ items }: { items: { name: string; path: string }[] }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    })}</script>
  </Helmet>
);

/**
 * JSON-LD LocalBusiness schema for the contact page.
 */
export const LocalBusinessSchema = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+972-54-710-8219',
      email: 'eladauto66@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'חיים לסקוב 22',
        addressLocality: 'נתניה',
        addressCountry: 'IL',
      },
      priceRange: '$$',
    })}</script>
  </Helmet>
);

/**
 * JSON-LD FAQPage schema.
 */
export const FAQSchema = ({ items }: { items: { question: string; answer: string }[] }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })}</script>
  </Helmet>
);
