import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO_CONFIG from '../config/seoConfig';
import getStructuredData from '../config/structuredData';

// ==================== SEO HEAD COMPONENT ====================
const SEOHead = memo(({
    title,
    description,
    canonical,
    keywords,
    pageType = 'home',
    image,
    breadcrumb,
    article = false,
    noindex = false
}) => {
    const fullTitle = title || SEO_CONFIG.defaultTitle;
    const fullDescription = description || SEO_CONFIG.defaultDescription;
    const fullCanonical = canonical || SEO_CONFIG.siteUrl;
    const fullImage = image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`;
    const fullKeywords = keywords || SEO_CONFIG.keywords;

    const schemas = getStructuredData(pageType, {
        breadcrumb,
        url: fullCanonical
    });

    return (
        <Helmet>
            {/* ===== PRIMARY META TAGS ===== */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={fullDescription} />
            <meta name="keywords" content={fullKeywords} />
            <meta name="author" content={SEO_CONFIG.author} />
            <link rel="canonical" href={fullCanonical} />

            {/* Alternative Language Pages */}
            <link rel="alternate" hrefLang="id" href={fullCanonical} />
            <link rel="alternate" hrefLang="en" href={`${fullCanonical}?lang=en`} />
            <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

            {/* ===== OPEN GRAPH / FACEBOOK ===== */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:secure_url" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={fullTitle} />
            <meta property="og:site_name" content={SEO_CONFIG.siteName} />
            <meta property="og:locale" content={SEO_CONFIG.locale} />
            {SEO_CONFIG.localeAlternate.map(locale => (
                <meta key={locale} property="og:locale:alternate" content={locale} />
            ))}
            {SEO_CONFIG.fbAppId && <meta property="fb:app_id" content={SEO_CONFIG.fbAppId} />}

            {/* ===== TWITTER CARD ===== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonical} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:image:alt" content={fullTitle} />
            <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
            <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />

            {/* ===== ROBOTS & CRAWLERS ===== */}
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
            <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
            <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            <meta name="googlebot-news" content="index, follow" />

            {/* Google Site Verification */}
            <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />
            <meta name="msvalidate.01" content="REPLACE_WITH_BING_VERIFICATION" />
            <meta name="yandex-verification" content="REPLACE_WITH_YANDEX_VERIFICATION" />

            {/* ===== MOBILE & APP ===== */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
            <meta name="format-detection" content="telephone=yes" />
            <meta name="theme-color" content="#8B1538" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={SEO_CONFIG.shortName} />

            {/* ===== GEO & LOCATION ===== */}
            <meta name="geo.region" content="ID-JK" />
            <meta name="geo.placename" content="Jakarta" />
            <meta name="geo.position" content={`${SEO_CONFIG.geo.latitude};${SEO_CONFIG.geo.longitude}`} />
            <meta name="ICBM" content={`${SEO_CONFIG.geo.latitude}, ${SEO_CONFIG.geo.longitude}`} />

            {/* ===== ADDITIONAL SEO ===== */}
            <meta name="rating" content="general" />
            <meta name="referrer" content="origin-when-cross-origin" />
            <meta name="coverage" content="Worldwide" />
            <meta name="distribution" content="Global" />
            <meta name="target" content="all" />
            <meta name="audience" content="all" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="MobileOptimized" content="320" />

            {/* Revisit */}
            <meta name="revisit-after" content="1 days" />

            {/* Copyright */}
            <meta name="copyright" content={`© ${new Date().getFullYear()} ${SEO_CONFIG.siteName}`} />

            {/* Classification */}
            <meta name="classification" content="Education" />
            <meta name="category" content="Education, International School, Kindergarten, Elementary School, Junior High School" />

            {/* Page Topic */}
            <meta name="page-topic" content="International School Education" />
            <meta name="page-type" content="Educational Institution" />

            {/* Language */}
            <meta httpEquiv="content-language" content="id" />
            <meta name="language" content="Indonesian" />

            {/* ===== STRUCTURED DATA (JSON-LD) ===== */}
            {schemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}

            {/* ===== PRECONNECT & DNS-PREFETCH ===== */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
            <link rel="dns-prefetch" href="https://www.google.com" />

            {/* ===== FAVICON & ICONS ===== */}
            <link rel="icon" type="image/svg+xml" href="/Millennia.svg" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8B1538" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#8B1538" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
        </Helmet>
    );
});
SEOHead.displayName = 'SEOHead';

export default SEOHead;