// src/App.jsx - ULTRA SEO OPTIMIZED FOR #1 RANKING
import { useEffect, useState, lazy, Suspense, memo, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import SEOHead from '@/components/SEOHead';
import SEO_CONFIG from '@/config/seoConfig';

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
// import ValuePropsSection from '@/components/landing/ValuePropsSection';
import PageLoader from '@/components/ui/PageLoader';

// Lazy-load components
const Navbar = lazy(() => import('@/components/landing/Navbar'));
const Footer = lazy(() => import('@/components/landing/Footer'));
const HowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));
const PricingSection = lazy(() => import('@/components/landing/PricingSection'));
const TestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection'));
const CtaSection = lazy(() => import('@/components/landing/CtaSection'));
const ValuePropsSection = lazy(() => import('@/components/landing/ValuePropsSection'));

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
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AddArticle = lazy(() => import('./pages/admin/AddArticle'));

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
                <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
                  <ValuePropsSection valueProps={valueProps} />
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

        {/* ==================== ADMIN BLOG PAGE ==================== */}
        <Route
          path="/admin/blog"
          element={
            <>
              <SEOHead
                title="Admin Blog Management - Millennia World School"
                description="Content management system for blog articles and educational content."
                canonical={`${SEO_CONFIG.siteUrl}/admin/blog`}
                keywords="admin blog, content management, article management"
                breadcrumb="Admin Blog"
              />
              <AdminBlog />
            </>
          }
        />

        {/* ==================== ADD ARTICLE PAGE ==================== */}
        <Route
          path="/admin/blog/add"
          element={
            <>
              <SEOHead
                title="Add New Article - Millennia World School"
                description="Create a new blog article for Millennia World School."
                canonical={`${SEO_CONFIG.siteUrl}/admin/blog/add`}
                keywords="add article, create article, new blog post"
                breadcrumb="Add Article"
              />
              <AddArticle />
            </>
          }
        />

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