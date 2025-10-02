import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ValueProps from '@/components/landing/ValueProps';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TutorsSection from '@/components/landing/TutorsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import CtaSection from '@/components/landing/CtaSection';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// Impor data yang diperlukan
import { tutors, testimonials, howItWorksSteps, valueProps, pricingPlans } from '@/data/landingData';

// Fungsi helper untuk scroll dan klik (bisa ditaruh di sini atau di App)
const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

const handleCTAClick = (action) => {
    console.log(`${action} button clicked!`);
    // Anda bisa menambahkan logika toast atau navigasi di sini
};


// Definisikan komponen LandingPage di sini
const LandingPage = () => {
    return (
        <div className="">
            <Navbar scrollToSection={scrollToSection} />
            <main>
                <HeroSection handleCTAClick={handleCTAClick} />
                <ValueProps items={valueProps} />
                <HowItWorksSection steps={howItWorksSteps} />
                {/* <TutorsSection tutors={tutors} /> */}
                <TestimonialsSection testimonials={testimonials} />
                <PricingSection plans={pricingPlans} handleCTAClick={handleCTAClick} />
                <CtaSection handleCTAClick={handleCTAClick} />
            </main>
            <Footer scrollToSection={scrollToSection} />
        </div>
    );
};

export default LandingPage;