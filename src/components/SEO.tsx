import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  locale?: 'nl_NL' | 'en_US';
}

const SEO: React.FC<SEOProps> = ({
  title = 'Eazyy - Premium Wasserette & Stomerij Services',
  description = 'Ervaar zorgeloze wasservice met Eazyy. Professioneel wassen, stomen en reparaties met gratis ophaal- en bezorgservice. ✓ Duurzaam ✓ Snel ✓ Betrouwbaar',
  image = 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&h=630&q=80',
  url = 'https://eazyy.app',
  keywords = 'wasserette, stomerij, was- en strijkservice, ophaal- en bezorgservice, kledingreiniging, professionele wasserette, wasserette aan huis, laundry service, dry cleaning, wash & fold service, pickup and delivery laundry',
  locale = 'nl_NL'
}) => {
  const fullTitle = title.includes('Eazyy') ? title : `${title} | Eazyy`;

  const alternateLanguages = {
    'nl_NL': 'https://eazyy.app',
    'en_US': 'https://eazyy.app/en'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={locale.split('_')[0]} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Alternate Languages */}
      {Object.entries(alternateLanguages).map(([lang, href]) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang.toLowerCase()} 
          href={href}
        />
      ))}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Eazyy Wasserette & Stomerij",
          "image": image,
          "description": description,
          "@id": url,
          "url": url,
          "telephone": "+31626076881",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Argonweg 34",
            "addressLocality": "Almere",
            "postalCode": "1362AB",
            "addressCountry": "NL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 52.3676,
            "longitude": 4.8945
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "08:00",
            "closes": "20:00"
          },
          "sameAs": [
            "https://www.facebook.com/eazyyapp",
            "https://www.instagram.com/eazyyapp",
            "https://twitter.com/eazyyapp"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;