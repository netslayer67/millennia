import SEO_CONFIG from './seoConfig';

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

export default getStructuredData;