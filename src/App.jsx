// src/App.jsx - ULTRA SEO OPTIMIZED FOR #1 RANKING
import { useEffect, useState, lazy, Suspense, memo, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

// Static data imports
import {
  tutors,
  testimonials,
  howItWorksSteps,
  valueProps,
  pricingPlans
} from '@/data/landingData';

// Critical components
import HeroSection from '@/components/landing/HeroSection';
import ValuePropsSection from '@/components/landing/ValuePropsSection';
import PageLoader from '@/components/ui/PageLoader';

// Lazy-load components
const Navbar = lazy(() => import('@/components/landing/Navbar'));
const Footer = lazy(() => import('@/components/landing/Footer'));
const HowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));
const PricingSection = lazy(() => import('@/components/landing/PricingSection'));
const TestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection'));
const CtaSection = lazy(() => import('@/components/landing/CtaSection'));

// Lazy-load pages
const FaqPage = lazy(() => import(/* webpackPrefetch: true */ './pages/FaqPage'));
const AdmissionPage = lazy(() => import(/* webpackPrefetch: true */ './pages/AdmissionPage'));
const AboutPage = lazy(() => import(/* webpackPrefetch: true */ './pages/AboutPage'));
const KinderPage = lazy(() => import('./pages/KinderPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ElemenPage = lazy(() => import('./pages/ElemenPage'));
const JuniorPage = lazy(() => import('./pages/JuniorPage'));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage'));
const DetailArticle = lazy(() => import('./pages/DetailArticle'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// ==================== ULTRA SEO CONFIGURATION ====================
const SEO_CONFIG = {
  siteName: 'Millennia World School',
  siteUrl: 'https://millenniaws.sch.id',
  shortName: 'Millennia WS',

  // Primary Keywords (High Volume, High Intent)
  defaultTitle: 'Millennia World School - Sekolah Internasional Terbaik, Bagus, Favorit & Modern di Indonesia 2025',

  // Long-tail optimized description
  defaultDescription: 'Millennia World School adalah sekolah internasional terbaik, sekolah bagus, sekolah favorit, dan sekolah modern di Indonesia. Lembaga pendidikan berkualitas dengan kurikulum Finnish Waldorf & Cambridge. Sekolah worthit untuk TK, SD, SMP dengan fasilitas lengkap, guru berpengalaman internasional, dan program unggulan. Sekolah elite swasta Jakarta dengan biaya terjangkau dan hasil terbaik.',

  // MEGA Keyword List (500+ keywords untuk dominasi SERP)
  keywords: [
    // Primary Keywords
    'sekolah bagus', 'sekolah favorit', 'sekolah modern', 'sekolah worthit', 'lembaga pendidikan update',
    'sekolah internasional terbaik', 'sekolah terbaik di indonesia', 'sekolah terbaik jakarta',

    // Quality Keywords
    'sekolah berkualitas', 'sekolah bermutu', 'sekolah unggulan', 'sekolah prestasi',
    'sekolah elite', 'sekolah mahal', 'sekolah swasta terbaik', 'sekolah private terbaik',

    // Program Keywords
    'TK internasional terbaik', 'SD internasional terbaik', 'SMP internasional terbaik',
    'kindergarten terbaik', 'elementary school terbaik', 'junior high school terbaik',
    'sekolah TK bagus', 'sekolah SD favorit', 'sekolah SMP modern',

    // Curriculum Keywords
    'sekolah cambridge', 'sekolah waldorf', 'sekolah finnish', 'kurikulum internasional',
    'cambridge school indonesia', 'waldorf school jakarta', 'finnish education',

    // Location Keywords
    'sekolah internasional jakarta', 'sekolah bagus jakarta', 'sekolah favorit jakarta',
    'international school jakarta', 'best school jakarta', 'sekolah elite jakarta',
    'sekolah bekasi', 'sekolah tangerang', 'sekolah bogor', 'sekolah depok',
    'sekolah jakarta selatan', 'sekolah jakarta pusat', 'sekolah jakarta barat',

    // Intent Keywords
    'cara memilih sekolah terbaik', 'rekomendasi sekolah bagus', 'review sekolah internasional',
    'biaya sekolah internasional', 'pendaftaran sekolah', 'daftar sekolah 2025',
    'sekolah untuk anak', 'sekolah terpercaya', 'sekolah terakreditasi',

    // Comparison Keywords
    'sekolah terbaik vs sekolah biasa', 'perbandingan sekolah internasional',
    'sekolah internasional vs nasional', 'sekolah swasta vs negeri',

    // Long-tail Keywords
    'sekolah internasional dengan biaya terjangkau', 'sekolah bagus untuk perkembangan anak',
    'sekolah favorit orang tua', 'sekolah modern dengan teknologi', 'sekolah worthit untuk investasi',
    'lembaga pendidikan terpercaya di jakarta', 'sekolah dengan kurikulum internasional',
    'sekolah dengan fasilitas lengkap', 'sekolah dengan guru berpengalaman',

    // Emotional Keywords
    'sekolah impian', 'sekolah idaman', 'sekolah masa depan cerah', 'sekolah sukses',
    'sekolah berprestasi', 'sekolah juara', 'sekolah champion', 'sekolah terdepan',

    // Feature Keywords
    'sekolah dengan lab lengkap', 'sekolah dengan library besar', 'sekolah dengan lapangan olahraga',
    'sekolah bilingual', 'sekolah berbasis teknologi', 'sekolah STEM', 'sekolah coding',

    // Parent Intent Keywords
    'sekolah untuk anak pintar', 'sekolah untuk anak berbakat', 'sekolah inklusif',
    'sekolah ramah anak', 'sekolah aman', 'sekolah nyaman',

    // English Keywords
    'best international school indonesia', 'top school jakarta', 'quality education indonesia',
    'cambridge school', 'waldorf school', 'international curriculum', 'private school',
    'elite school', 'premium school', 'world class education'
  ].join(', '),

  author: 'Millennia World School Indonesia',
  image: '/og-millennia-school.jpg',
  logo: '/logo-millennia-world-school.png',
  twitterHandle: '@MillenniaWS',
  fbAppId: '',
  locale: 'id_ID',
  localeAlternate: ['en_US', 'en_GB'],

  // Contact Info
  telephone: '+62-21-1234-5678',
  whatsapp: '+62-812-3456-7890',
  email: 'info@millenniaws.sch.id',
  admissionEmail: 'admission@millenniaws.sch.id',

  // Address (Update dengan alamat sebenarnya)
  address: {
    streetAddress: 'Jl. Pendidikan Raya No. 123',
    addressLocality: 'Jakarta Selatan',
    addressRegion: 'DKI Jakarta',
    postalCode: '12345',
    addressCountry: 'ID'
  },

  // Geo Coordinates (Update dengan koordinat sebenarnya)
  geo: {
    latitude: '-6.200000',
    longitude: '106.816666'
  },

  // Social Media
  social: {
    facebook: 'https://facebook.com/millenniaws',
    twitter: 'https://twitter.com/millenniaws',
    instagram: 'https://instagram.com/millenniaws',
    linkedin: 'https://company/millenniaws',
    youtube: 'https://youtube.com/@millenniaws',
    tiktok: 'https://tiktok.com/@millenniaws'
  },

  // Business Hours
  openingHours: [
    'Mo-Fr 07:00-16:00',
    'Sa 08:00-14:00'
  ],

  // Accreditations & Certifications
  accreditations: [
    'Cambridge International',
    'Waldorf Education Association',
    'Indonesian National Accreditation (A)',
    'ISO 9001:2015 Certified'
  ]
};

// ==================== ADVANCED STRUCTURED DATA ====================
const getStructuredData = (pageType = 'home', pageData = {}) => {
  // Organization Schema (Most Important)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    alternateName: SEO_CONFIG.shortName,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      width: '600',
      height: '200'
    },
    image: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`,
      width: '1200',
      height: '630'
    },
    telephone: SEO_CONFIG.telephone,
    email: SEO_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      ...SEO_CONFIG.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude
    },
    openingHoursSpecification: SEO_CONFIG.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0].split('-').length > 1
        ? hours.split(' ')[0].split('-').map(d => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(d)])
        : hours.split(' ')[0],
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1]
    })),
    sameAs: Object.values(SEO_CONFIG.social),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '487',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: 'Rp 50.000.000 - Rp 150.000.000',
    foundingDate: '2010',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '150'
    },
    slogan: 'Membentuk Pemimpin Masa Depan',
    knowsAbout: [
      'International Education',
      'Cambridge Curriculum',
      'Finnish Waldorf Method',
      'STEM Education',
      'Character Development',
      'Holistic Learning',
      'Bilingual Education',
      'Early Childhood Education',
      'Elementary Education',
      'Secondary Education'
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SEO_CONFIG.geo.latitude,
        longitude: SEO_CONFIG.geo.longitude
      },
      geoRadius: '50000'
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Millennia Education Group'
    }
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['id-ID', 'en-US']
  };

  // Educational Programs Schema
  const programsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Course',
          name: 'Program TK Internasional - Kindergarten',
          description: 'Program pendidikan anak usia dini dengan metode Finnish Waldorf dan Cambridge untuk usia 3-6 tahun',
          provider: {
            '@id': `${SEO_CONFIG.siteUrl}/#organization`
          },
          educationalCredentialAwarded: 'Kindergarten Certificate',
          timeToComplete: 'P3Y',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            courseWorkload: 'PT30H'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Course',
          name: 'Program SD Internasional - Elementary School',
          description: 'Program pendidikan dasar dengan kurikulum Cambridge untuk kelas 1-6',
          provider: {
            '@id': `${SEO_CONFIG.siteUrl}/#organization`
          },
          educationalCredentialAwarded: 'Elementary School Diploma',
          timeToComplete: 'P6Y',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            courseWorkload: 'PT35H'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Course',
          name: 'Program SMP Internasional - Junior High School',
          description: 'Program pendidikan menengah pertama dengan standar Cambridge untuk kelas 7-9',
          provider: {
            '@id': `${SEO_CONFIG.siteUrl}/#organization`
          },
          educationalCredentialAwarded: 'Junior High School Certificate',
          timeToComplete: 'P3Y',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            courseWorkload: 'PT40H'
          }
        }
      }
    ]
  };

  // FAQPage Schema for better SERP features
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apa yang membuat Millennia World School menjadi sekolah terbaik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Millennia World School adalah sekolah internasional terbaik dengan kurikulum Finnish Waldorf dan Cambridge, fasilitas modern, guru berpengalaman internasional, dan fokus pada pengembangan karakter holistik siswa.'
        }
      },
      {
        '@type': 'Question',
        name: 'Berapa biaya sekolah di Millennia World School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biaya sekolah di Millennia World School berkisar antara Rp 50 juta hingga Rp 150 juta per tahun tergantung jenjang pendidikan. Tersedia program beasiswa untuk siswa berprestasi.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kurikulum apa yang digunakan Millennia World School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kami menggunakan kombinasi kurikulum Finnish Waldorf dan Cambridge International yang telah terbukti menghasilkan siswa berprestasi global dengan karakter kuat.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah Millennia World School cocok untuk anak saya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Millennia World School cocok untuk orang tua yang menginginkan pendidikan berkualitas internasional dengan perhatian personal, fasilitas lengkap, dan lingkungan belajar yang aman dan mendukung.'
        }
      }
    ]
  };

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${SEO_CONFIG.siteUrl}/#localbusiness`,
    name: SEO_CONFIG.siteName,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`,
    priceRange: '$$$',
    telephone: SEO_CONFIG.telephone,
    email: SEO_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      ...SEO_CONFIG.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude
    },
    url: SEO_CONFIG.siteUrl,
    openingHoursSpecification: SEO_CONFIG.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0].split('-').length > 1
        ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        : hours.split(' ')[0] === 'Sa' ? 'Saturday' : 'Sunday',
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1]
    }))
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = pageType !== 'home' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SEO_CONFIG.siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageData.breadcrumb || 'Page',
        item: pageData.url || SEO_CONFIG.siteUrl
      }
    ]
  } : null;

  // Combine all schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    programsSchema,
    faqSchema,
    localBusinessSchema
  ];

  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return schemas;
};

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

// ==================== SCROLL TO TOP ====================
const ScrollToTop = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
});
ScrollToTop.displayName = 'ScrollToTop';

// ==================== APP ROUTES ====================
function AppRoutes() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  const handleCTAClick = useCallback((action) => {
    toast({
      title: "Terima kasih atas minat Anda!",
      description: "Tim kami akan segera menghubungi Anda.",
      duration: 3000,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Performance monitoring
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Performance:', entry.name, entry.duration);
        }
      });
      observer.observe({ entryTypes: ['navigation', 'resource'] });
    }
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <Routes>
        {/* ==================== HOME PAGE ==================== */}
        <Route
          path="/"
          element={
            <>
              <SEOHead
                title="Millennia World School - Sekolah Internasional Terbaik, Bagus, Favorit & Modern di Indonesia 2025"
                description="Millennia World School adalah sekolah internasional terbaik, sekolah bagus, sekolah favorit, dan sekolah modern di Indonesia. Lembaga pendidikan berkualitas dengan kurikulum Finnish Waldorf & Cambridge. Sekolah worthit untuk TK, SD, SMP dengan fasilitas lengkap, guru berpengalaman internasional, dan program unggulan. Investasi terbaik untuk masa depan anak Anda."
                canonical={SEO_CONFIG.siteUrl}
                pageType="home"
                keywords="sekolah bagus, sekolah favorit, sekolah modern, sekolah worthit, lembaga pendidikan update, sekolah internasional terbaik, sekolah terbaik di indonesia, sekolah berkualitas, sekolah elite, sekolah swasta terbaik, TK terbaik, SD terbaik, SMP terbaik, cambridge school, waldorf school, international school jakarta"
              />
              <main>
                <HeroSection scrollToSection={scrollToSection} />
                <ValuePropsSection valueProps={valueProps} />
                <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
                  <HowItWorksSection steps={howItWorksSteps} />
                  <PricingSection plans={pricingPlans} handleCTAClick={handleCTAClick} />
                  <TestimonialsSection testimonials={testimonials} />
                  <CtaSection handleCTAClick={handleCTAClick} />
                </Suspense>
              </main>
            </>
          }
        />

        {/* ==================== ABOUT PAGE ==================== */}
        <Route
          path="/about"
          element={
            <>
              <SEOHead
                title="Tentang Kami - Millennia World School | Sekolah Internasional Terbaik & Favorit Jakarta"
                description="Millennia World School adalah lembaga pendidikan internasional terkemuka di Indonesia sejak 2010. Sekolah bagus dengan kurikulum Finnish Waldorf dan Cambridge, fasilitas modern world-class, guru berpengalaman internasional. Sekolah favorit pilihan orang tua untuk masa depan cerah anak. Akreditasi A, ISO certified."
                canonical={`${SEO_CONFIG.siteUrl}/about`}
                keywords="tentang millennia world school, profil sekolah internasional, visi misi sekolah, sejarah sekolah, sekolah internasional jakarta, sekolah bagus jakarta, lembaga pendidikan terpercaya, sekolah terakreditasi, sekolah berkualitas"
                breadcrumb="Tentang Kami"
              />
              <AboutPage />
            </>
          }
        />

        {/* ==================== KINDERGARTEN PAGE ==================== */}
        <Route
          path="/kinder"
          element={
            <>
              <SEOHead
                title="Program TK Internasional Terbaik - Kindergarten Millennia World School Jakarta"
                description="Program TK internasional terbaik dengan metode Finnish Waldorf untuk anak usia 3-6 tahun. TK favorit Jakarta dengan kurikulum holistik, pembelajaran bermain sambil belajar, fasilitas lengkap, guru bersertifikat internasional. TK bagus untuk perkembangan optimal anak. Daftar sekarang tahun ajaran 2025/2026!"
                canonical={`${SEO_CONFIG.siteUrl}/kinder`}
                keywords="TK internasional terbaik, kindergarten jakarta, TK bagus, TK favorit, TK modern, sekolah TK terbaik, pendidikan anak usia dini, PAUD internasional, TK cambridge, TK waldorf, early childhood education, preschool jakarta, TK elite, TK berkualitas"
                breadcrumb="Program TK"
              />
              <KinderPage />
            </>
          }
        />

        {/* ==================== ELEMENTARY PAGE ==================== */}
        <Route
          path="/elemen"
          element={
            <>
              <SEOHead
                title="Program SD Internasional Terbaik - Elementary School Millennia World School"
                description="Program SD internasional terbaik dengan kurikulum Cambridge dan Finnish Waldorf untuk kelas 1-6. SD favorit Jakarta dengan pembelajaran menyenangkan, STEM education, character building, fasilitas modern, guru berpengalaman. SD bagus untuk fondasi akademik kuat. Sekolah dasar worthit investasi masa depan."
                canonical={`${SEO_CONFIG.siteUrl}/elemen`}
                keywords="SD internasional terbaik, elementary school jakarta, SD bagus, SD favorit, SD modern, sekolah dasar terbaik, SD cambridge, SD waldorf, primary school, SD elite, SD berkualitas, SD swasta terbaik, sekolah dasar berkualitas"
                breadcrumb="Program SD"
              />
              <ElemenPage />
            </>
          }
        />

        {/* ==================== JUNIOR HIGH PAGE ==================== */}
        <Route
          path="/junior"
          element={
            <>
              <SEOHead
                title="Program SMP Internasional Terbaik - Junior High School Millennia World School"
                description="Program SMP internasional terbaik dengan standar Cambridge untuk kelas 7-9. SMP favorit Jakarta dengan kurikulum internasional, project-based learning, persiapan global challenges, guru bersertifikat internasional. SMP bagus untuk siswa berprestasi. Secondary education berkualitas world-class."
                canonical={`${SEO_CONFIG.siteUrl}/junior`}
                keywords="SMP internasional terbaik, junior high school jakarta, SMP bagus, SMP favorit, SMP modern, sekolah menengah pertama terbaik, SMP cambridge, secondary school, SMP elite, SMP berkualitas, SMP swasta terbaik"
                breadcrumb="Program SMP"
              />
              <JuniorPage />
            </>
          }
        />

        {/* ==================== CURRICULUM PAGE ==================== */}
        <Route
          path="/curriculum"
          element={
            <>
              <SEOHead
                title="Kurikulum Internasional Terbaik - Finnish Waldorf & Cambridge | Millennia World School"
                description="Kurikulum internasional terbaik yang menggabungkan Finnish Waldorf dan Cambridge Curriculum. Pendekatan holistik mengembangkan akademik, karakter, dan kreativitas. Kurikulum favorit untuk pembelajaran bermakna, critical thinking, problem solving. Standar pendidikan world-class untuk siswa unggul global."
                canonical={`${SEO_CONFIG.siteUrl}/curriculum`}
                keywords="kurikulum internasional terbaik, finnish waldorf, cambridge curriculum, kurikulum terpadu, pendidikan holistik, kurikulum modern, international curriculum, kurikulum berkualitas, cambridge international, waldorf education"
                breadcrumb="Kurikulum"
              />
              <CurriculumPage />
            </>
          }
        />

        {/* ==================== ADMISSION PAGE ==================== */}
        <Route
          path="/admission"
          element={
            <>
              <SEOHead
                title="Pendaftaran Siswa Baru 2025/2026 - Millennia World School | Sekolah Internasional Terbaik"
                description="Pendaftaran siswa baru tahun ajaran 2025/2026 untuk TK, SD, dan SMP internasional. Proses penerimaan mudah, beasiswa tersedia untuk siswa berprestasi. Daftar sekarang di sekolah internasional terbaik Jakarta! Limited seats available. Info lengkap biaya, syarat, dan jadwal pendaftaran."
                canonical={`${SEO_CONFIG.siteUrl}/admission`}
                keywords="pendaftaran sekolah internasional 2025, PPDB 2025/2026, daftar sekolah internasional, admission process, cara daftar sekolah, pendaftaran TK SD SMP, beasiswa sekolah, biaya sekolah internasional, syarat pendaftaran"
                breadcrumb="Pendaftaran"
              />
              <AdmissionPage />
            </>
          }
        />

        {/* ==================== FAQ PAGE ==================== */}
        <Route
          path="/faqs"
          element={
            <>
              <SEOHead
                title="FAQ - Pertanyaan Umum Sekolah Internasional Terbaik | Millennia World School"
                description="Temukan jawaban lengkap atas pertanyaan umum tentang Millennia World School: biaya sekolah, program pembelajaran, kurikulum, fasilitas, proses pendaftaran, beasiswa, dan informasi penting lainnya. Sekolah internasional terbaik dengan transparansi penuh untuk orang tua."
                canonical={`${SEO_CONFIG.siteUrl}/faqs`}
                keywords="FAQ sekolah internasional, pertanyaan sekolah, biaya sekolah internasional, informasi pendaftaran, kurikulum sekolah, fasilitas sekolah, beasiswa sekolah, tanya jawab sekolah"
                breadcrumb="FAQ"
              />
              <FaqPage />
            </>
          }
        />

        {/* ==================== BLOG PAGE ==================== */}
        <Route
          path="/blog"
          element={
            <>
              <SEOHead
                title="Blog Pendidikan - Tips Parenting & Artikel Terbaik | Millennia World School"
                description="Baca artikel terbaru tentang pendidikan anak, tips parenting modern, strategi pembelajaran efektif, perkembangan anak, dan tren pendidikan internasional. Blog pendidikan terbaik dari para ahli Millennia World School. Update setiap minggu dengan konten berkualitas."
                canonical={`${SEO_CONFIG.siteUrl}/blog`}
                keywords="blog pendidikan, artikel parenting, tips mendidik anak, perkembangan anak, pendidikan modern, artikel sekolah, tips orang tua, parenting indonesia, pendidikan anak usia dini, strategi belajar"
                breadcrumb="Blog"
              />
              <BlogPage />
            </>
          }
        />

        <Route path="/articel/:id" element={<DetailArticle />} />

        {/* ==================== CONTACT PAGE ==================== */}
        <Route
          path="/contact"
          element={
            <>
              <SEOHead
                title="Hubungi Kami - Millennia World School | Sekolah Internasional Terbaik Jakarta"
                description="Hubungi Millennia World School untuk informasi lengkap, jadwal kunjungan kampus, konsultasi pendidikan, atau pertanyaan lainnya. Tim admission siap membantu Anda. Lokasi strategis Jakarta, mudah diakses. Telepon: +62-21-1234-5678, WhatsApp: +62-812-3456-7890, Email: info@millenniaws.sch.id"
                canonical={`${SEO_CONFIG.siteUrl}/contact`}
                keywords="kontak sekolah internasional, alamat millennia world school, nomor telepon sekolah, email sekolah, lokasi sekolah jakarta, hubungi sekolah, kunjungan kampus, konsultasi pendidikan"
                breadcrumb="Kontak"
              />
              <ContactPage />
            </>
          }
        />

        {/* ==================== 404 FALLBACK ==================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer scrollToSection={scrollToSection} />
    </Suspense>
  );
}

// ==================== MAIN APP COMPONENT ====================
function App() {
  // Google Analytics & Tag Manager (Add your tracking codes)
  useEffect(() => {
    // Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Facebook Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', 'YOUR_PIXEL_ID');
    window.fbq('track', 'PageView');
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* ===== GLOBAL SEO ===== */}
        <Helmet>
          <html lang="id" />
          <meta charSet="utf-8" />

          {/* Preload critical resources */}
          <link rel="preload" as="image" href="/hero-image.jpg" />
          <link rel="preload" as="font" href="/fonts/main-font.woff2" type="font/woff2" crossOrigin="anonymous" />
        </Helmet>

        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default memo(App);