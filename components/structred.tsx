export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ThesisPoint Research",
    alternateName: "ThesisPoint",
    url: "https://www.thesispointresearch.com/",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ThesisPoint Research",
    url: "https://www.thesispointresearch.com/",
    logo: "https://www.thesispointresearch.com/favicon.ico",
    sameAs: [
      "https://www.linkedin.com/company/thesispoint-research",
      "https://www.instagram.com/thesispointresearch",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}