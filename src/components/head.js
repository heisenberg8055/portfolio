import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({
  title,
  description,
  image,
  isArticle = false,
  datePublished = null,
  dateModified = null,
}) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  // JSON-LD structured data
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    image: seo.image,
    sameAs: [
      `https://twitter.com/${twitterUsername.replace('@', '')}`,
      'https://github.com/heisenberg8055',
      'https://linkedin.com/in/yeswanthsi',
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    image: seo.image,
    sameAs: [
      `https://twitter.com/${twitterUsername.replace('@', '')}`,
      'https://github.com/heisenberg8055',
      'https://linkedin.com/in/yeswanthsi',
    ],
  };

  const articleSchema = isArticle
    ? {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: seo.title,
      description: seo.description,
      image: seo.image,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: defaultTitle,
      },
      publisher: {
        '@type': 'Organization',
        name: defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/og@3x.png`,
        },
      },
    }
    : null;

  const breadcrumbSchema =
    pathname !== '/'
      ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: seo.title,
            item: seo.url,
          },
        ],
      }
      : null;

  return (
    <Helmet
      title={title}
      defaultTitle={seo.title}
      titleTemplate={`%s | ${defaultTitle}`}
      htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Canonical */}
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      {isArticle && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {isArticle && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Additional SEO */}
      <meta name="author" content={defaultTitle} />
      <meta name="theme-color" content="#0a192f" />

      {/* Google Site Verification */}
      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(baseSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isArticle: PropTypes.bool,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  isArticle: false,
  datePublished: null,
  dateModified: null,
};
