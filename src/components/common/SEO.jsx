import React, { useEffect } from 'react';

/**
 * Reusable dynamic SEO component for managing title, meta tags, OpenGraph,
 * Twitter cards, and structured JSON-LD schemas per route.
 */
export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.svg',
  noIndex = false,
  structuredData = null,
}) => {
  const defaultTitle = 'AI Storybook Generator — Magical Personalized Tales & Bedtime Stories for Children';
  const fullTitle = title ? `${title} | AI Storybook Generator` : defaultTitle;
  const defaultDesc =
    "Create personalized, beautifully illustrated children's storybooks starring your child. Read online with 3D page-turns, listen to read-aloud narration, and download printable PDFs.";
  const metaDesc = description || defaultDesc;
  const defaultKeywords =
    'AI storybook generator, personalized children books, custom bedtime stories, illustrated kids books, AI picture book creator, avatar storybook, printable storybook PDF';
  const metaKeywords = keywords || defaultKeywords;
  const siteUrl = 'https://childrenstorybooksgenerator.vercel.app';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (selector, attribute, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', metaDesc);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metaKeywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 3. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDesc);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullOgImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'AI Storybook Generator');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDesc);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullOgImage);

    // 6. JSON-LD Dynamic Structured Data
    const scriptId = 'page-structured-data';
    let scriptElement = document.getElementById(scriptId);

    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Clean up dynamic script when unmounting if needed
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [fullTitle, metaDesc, metaKeywords, canonicalUrl, fullOgImage, ogType, noIndex, structuredData]);

  return null;
};
