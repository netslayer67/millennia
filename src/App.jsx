// src/App.jsx
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

import {
  tutors,
  testimonials,
  howItWorksSteps,
  valueProps,
  pricingPlans
} from '@/data/landingData';

import HeroSection from '@/components/landing/HeroSection';
import ValuePropsSection from '@/components/landing/ValuePropsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import PageLoader from '@/components/ui/PageLoader';
import TutorDetailPage from './pages/TutorDetailPage';
import SessionPage from '@/pages/SessionPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';

// Lazy-load heavier pages (code-splitting)
const Navbar = lazy(() => import('@/components/landing/Navbar'));
const Footer = lazy(() => import('@/components/landing/Footer'));

const FaqPage = lazy(() => import('./pages/FaqPage'));
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const KinderPage = lazy(() => import('./pages/KinderPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ElemenPage = lazy(() => import('./pages/ElemenPage'));
const JuniorPage = lazy(() => import('./pages/JuniorPage'));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage'));
const DetailArticle = lazy(() => import('./pages/DetailArticle'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Small helper: central toast for CTA placeholders
const handleCTAClick = (action) => {
  toast({
    title: "🚧 Fitur Belum Siap",
    description: "Tapi kamu bisa minta bantuan lanjutan dari tim kami! 😊",
    duration: 3000,
  });
};

function AppRoutes() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll helper (keperluan Navbar/Footer)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // short loading screen for perceived performance
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    // wrap in Suspense so lazy Navbar/Footer and pages can load with fallback
    <Suspense fallback={<PageLoader />}>
      {/* Navbar is now always present */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <HeroSection scrollToSection={scrollToSection} />
                <ValuePropsSection valueProps={valueProps} />
                <HowItWorksSection steps={howItWorksSteps} />
                <PricingSection plans={pricingPlans} handleCTAClick={handleCTAClick} />
                <TestimonialsSection testimonials={testimonials} />
                <CtaSection handleCTAClick={handleCTAClick} />
              </main>
            </>
          }
        />

        {/* Lazy pages */}
        <Route path="/articel/:id" element={<DetailArticle />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/junior" element={<JuniorPage />} />
        <Route path="/kinder" element={<KinderPage />} />
        <Route path="/elemen" element={<ElemenPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admission" element={<AdmissionPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tutor/:id" element={<TutorDetailPage tutors={tutors} />} />



        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer always present */}
      <Footer scrollToSection={scrollToSection} />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>MILLENNIA WORLD SCHOOL</title>
        <meta name="description" content="Belajar bahasa Inggris dengan tutor profesional, online & offline. Terstruktur dan fleksibel." />
        <html lang="id" />
        <link rel="icon" type="image/svg+xml" href="/Millennia.svg" />
      </Helmet>

      <AppRoutes />

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
