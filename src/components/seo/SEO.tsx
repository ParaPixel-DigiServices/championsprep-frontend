import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string; 
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonicalUrl = "https://championsprep.netlify.app", 
  image = "/logo.png" 
}: SEOProps) {
  
  const siteTitle = "ChampionsPrep";
  const fullTitle = `${title} | ${siteTitle}`;

  // Structured Data (JSON-LD) for "Organization"
  // This helps Google understand this is a legitimate business/school
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ChampionsPrep",
    "url": canonicalUrl,
    "logo": "https://championsprep.netlify.app/logo.png",
    "sameAs": [
      "https://www.instagram.com/championsprep",
      "https://www.linkedin.com/company/championsprep"
    ],
    "description": description
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}