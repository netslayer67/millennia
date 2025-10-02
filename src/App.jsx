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

import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ValuePropsSection from '@/components/landing/ValuePropsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TutorsSection from '@/components/landing/TutorsSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import PageLoader from '@/components/ui/PageLoader';
import TutorDetailPage from './pages/TutorDetailPage';
import SessionPage from '@/pages/SessionPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';

// --- TAMBAHAN: Impor Layout dan Halaman Guru ---
const TeacherLayout = lazy(() => import('./layouts/TeacherLayout').then(module => ({ default: module.TeacherLayout })));
const TeacherDashboardPage = lazy(() => import('./pages/teacher/DashboardPage'));
const TeacherSchedulePage = lazy(() => import('./pages/teacher/SchedulePage'));
const TeacherStudentsPage = lazy(() => import('./pages/teacher/StudentsPage'));
const TeacherStudentDetailPage = lazy(() => import('./pages/teacher/StudentDetailPage'));
const TeacherEarningsPage = lazy(() => import('./pages/teacher/EarningsPage'));
const TeacherProfilePage = lazy(() => import('./pages/teacher/ProfilePage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
// ---------------------------------------------

// --- Impor Halaman Admin yang Sebenarnya ---
const SuperAdminLayout = lazy(() => import('./layouts/SuperAdminLayout').then(module => ({ default: module.SuperAdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AdminManageTeachersPage = lazy(() => import('./pages/admin/ManageTeachersPage'));
const AdminManageStudentsPage = lazy(() => import('./pages/admin/ManageStudentsPage')); // ✅ Diperbarui
const AdminContentPage = lazy(() => import('./pages/admin/ContentManagementPage'));
const AdminCertificatesPage = lazy(() => import('./pages/admin/CertificatesPage'));
const AdminReportsPage = lazy(() => import('./pages/admin/ReportsPage')); // ✅ Diperbarui
// ----------------------------------------------------


function AppRoutes() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- TAMBAHAN: Menambahkan path guru ke array hiddenLayoutPaths ---
  const hiddenLayoutPaths = ['/session', '/auth', '/checkout', '/profile', '/tutor', '/teacher', '/admin'];
  const shouldHideLayout = hiddenLayoutPaths.some(path => location.pathname.startsWith(path));

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCTAClick = (action) => {
    toast({
      title: "🚧 Fitur Belum Siap",
      description: "Tapi kamu bisa minta bantuan lanjutan dari tim kami! 😊",
      duration: 3000,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    // Suspense ditambahkan di sini untuk menangani lazy loading halaman guru
    <Suspense fallback={<PageLoader />}>
      <div className="">
        {!shouldHideLayout && (
          <Navbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            scrollToSection={scrollToSection}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <HeroSection scrollToSection={scrollToSection} />
                  <ValuePropsSection valueProps={valueProps} />
                  <HowItWorksSection steps={howItWorksSteps} />
                  {/* <TutorsSection tutors={tutors} handleCTAClick={handleCTAClick} /> */}
                  <PricingSection plans={pricingPlans} handleCTAClick={handleCTAClick} />
                  <TestimonialsSection testimonials={testimonials} />
                  <CtaSection handleCTAClick={handleCTAClick} />
                </main>
                {!shouldHideLayout && <Footer scrollToSection={scrollToSection} />}
              </>
            }
          />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tutor/:id" element={<TutorDetailPage tutors={tutors} />} />

          {/* ✅ RUTE UNTUK GURU DITAMBAHKAN DI SINI */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboardPage />} />
            <Route path="schedule" element={<TeacherSchedulePage />} />
            <Route path="students" element={<TeacherStudentsPage />} />
            <Route path="student/:studentId" element={<TeacherStudentDetailPage />} />
            <Route path="earnings" element={<TeacherEarningsPage />} />
            <Route path="profile" element={<TeacherProfilePage />} />
          </Route>
          {/* -------------------------------------- */}

          {/* ✅ RUTE UNTUK SUPERADMIN DITAMBAHKAN DI SINI */}
          <Route path="/admin" element={<SuperAdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="teachers" element={<AdminManageTeachersPage />} />
            <Route path="students" element={<AdminManageStudentsPage />} /> {/* ✅ Menggunakan komponen asli */}
            <Route path="content" element={<AdminContentPage />} />
            <Route path="certificates" element={<AdminCertificatesPage />} />
            <Route path="reports" element={<AdminReportsPage />} /> {/* ✅ Menggunakan komponen asli */}
          </Route>
          {/* -------------------------------------- */}

        </Routes>

        <Toaster />
      </div>
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
    </BrowserRouter>
  );
}

export default App;