// FaqPage.jsx - ULTRA OPTIMIZED FOR ENGAGING USER EXPERIENCE
// Comprehensive FAQ with visual appeal, smooth animations, and mobile-first design

import { useState, useCallback, useMemo, useEffect } from "react";

// FAQ Components
import FaqHeader from "@/components/faq/FaqHeader";
import FaqFilter from "@/components/faq/FaqFilter";
import FaqItem from "@/components/faq/FaqItem";
import FaqCTA from "@/components/faq/FaqCTA";
import FaqBackground from "@/components/faq/FaqBackground";

// FAQ Data
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/data/faqData";

// ==================== MAIN FAQ PAGE ====================
const FaqPage = () => {
    const [openId, setOpenId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isMobile, setIsMobile] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Detect device characteristics on mount and resize
    useEffect(() => {
        const updateDeviceInfo = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const checkReducedMotion = () => {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReducedMotion(mediaQuery.matches);
        };

        // Initial check
        updateDeviceInfo();
        checkReducedMotion();

        // Debounced resize handler for performance
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDeviceInfo, 150);
        };

        // Event listeners
        window.addEventListener('resize', handleResize, { passive: true });

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionChange = (e) => setReducedMotion(e.matches);
        motionQuery.addEventListener('change', handleMotionChange);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            motionQuery.removeEventListener('change', handleMotionChange);
            clearTimeout(resizeTimer);
        };
    }, []);

    // Toggle accordion item
    const toggle = useCallback((id) => {
        setOpenId(prev => prev === id ? null : id);
    }, []);

    // Handle category filtering
    const handleCategoryChange = useCallback((categoryId) => {
        setActiveCategory(categoryId);
        setOpenId(null); // Close any open items when filtering
    }, []);

    // Filter FAQ items based on active category
    const filteredFaqItems = useMemo(() => {
        if (activeCategory === "all") return FAQ_ITEMS;
        return FAQ_ITEMS.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    }, [activeCategory]);

    // Memoized FAQ list for optimal re-rendering
    const faqList = useMemo(() =>
        filteredFaqItems.map((item, index) => (
            <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
                index={index}
            />
        )),
        [filteredFaqItems, openId, toggle, isMobile, reducedMotion]
    );

    return (
        <main className="relative isolate min-h-screen w-full overflow-hidden py-10 sm:py-14 lg:py-20 bg-background">
            {/* Decorative background elements */}
            {/* <FaqBackground isMobile={isMobile} /> */}

            {/* Main content container */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Page header */}
                <FaqHeader />

                {/* Category filter */}
                <FaqFilter
                    categories={FAQ_CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* FAQ accordion list */}
                <section
                    aria-labelledby="faq-heading"
                    className="grid grid-cols-1 gap-3 sm:gap-4"
                >
                    <h2 id="faq-heading" className="sr-only">
                        Frequently Asked Questions List
                    </h2>
                    {faqList.length > 0 ? (
                        faqList
                    ) : (
                        <div className="text-center py-12">
                            <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                                <div className="text-4xl mb-4">🤔</div>
                                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                                <p className="text-muted-foreground">
                                    Try selecting a different category or view all questions.
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Call-to-action */}
                <FaqCTA />
            </div>
        </main>
    );
};

export default FaqPage;