// FaqPage.jsx - ULTRA MOBILE OPTIMIZED
// Removed framer-motion dependency, using pure CSS animations
// Optimized for mobile performance with lazy rendering and debouncing

import { useState, useCallback, memo, useMemo, useEffect, useRef } from "react";
import {
    HelpCircle,
    Target,
    Lightbulb,
    BookOpen,
    MessageCircle,
    DollarSign,
    Plus,
    Minus,
} from "lucide-react";

// ==================== STATIC DATA ====================
const FAQ_ITEMS = [
    {
        id: "about",
        icon: HelpCircle,
        question: "What is Millennia World School?",
        answer: "Millennia World School offers an integrated, modern approach to education — blending international curriculum, character development, and real-world skills.",
        category: "About",
    },
    {
        id: "mission",
        icon: Target,
        question: "What is MWS Mission?",
        answer: "To empower learners through personalized, high-quality education that prepares them for global opportunities and leadership.",
        category: "Mission",
    },
    {
        id: "philosophy",
        icon: Lightbulb,
        question: "MWS Philosophy",
        answer: "We foster curiosity, creativity, and resilience — focusing on holistic development rather than rote instruction.",
        category: "Philosophy",
    },
    {
        id: "principles",
        icon: BookOpen,
        question: "Principles and Paradigms",
        answer: "Collaboration, inquiry-based learning, and project-driven experiences are core to how students engage with knowledge.",
        category: "Principles",
    },
    {
        id: "method",
        icon: MessageCircle,
        question: "What Method of Learning does MWS use?",
        answer: "A hybrid of guided discovery, practical projects, and scaffolded instruction tailored to each learner's pace.",
        category: "Learning",
    },
    {
        id: "tuition",
        icon: DollarSign,
        question: "What is the annual tuition?",
        answer: "Tuition reflects our premium facilities and faculty. For a tailored quote, contact admissions for up-to-date fees and scholarships.",
        category: "Admissions",
    },
];

// ==================== PRE-COMPUTED STYLES ====================
const STYLE_CONSTANTS = {
    borderOpen: "1px solid hsl(var(--primary) / 0.28)",
    borderClosed: "1px solid hsl(var(--border) / 0.40)",
    bgOpen: "linear-gradient(135deg, hsl(var(--primary) / 0.14), hsl(var(--gold) / 0.12))",
    bgClosed: "hsl(var(--muted) / 0.28)",
    iconBorderOpen: "1px solid hsl(var(--primary) / 0.18)",
    colorPrimary: "hsl(var(--primary))",
    colorForeground: "hsl(var(--foreground))",
    colorMuted: "hsl(var(--muted-foreground))",
    colorPrimaryFg: "hsl(var(--primary-foreground))",
    categoryBg: "hsl(var(--muted) / 0.36)",
};

// ==================== ACCORDION ITEM (OPTIMIZED) ====================
const AccordionItem = memo(({ item, isOpen, onToggle, isMobile, reducedMotion }) => {
    const Icon = item.icon;
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    // Calculate content height for smooth animation
    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(isOpen ? height : 0);
        }
    }, [isOpen]);

    // Memoized inline styles to prevent recalculation
    const articleStyles = useMemo(() => ({
        border: isOpen ? STYLE_CONSTANTS.borderOpen : STYLE_CONSTANTS.borderClosed,
        transition: reducedMotion ? 'none' : (isMobile ? 'border 200ms ease' : 'border 300ms ease'),
    }), [isOpen, isMobile, reducedMotion]);

    const badgeStyles = useMemo(() => ({
        background: isOpen ? STYLE_CONSTANTS.bgOpen : STYLE_CONSTANTS.bgClosed,
        border: isOpen ? STYLE_CONSTANTS.iconBorderOpen : '1px solid transparent',
        transition: reducedMotion ? 'none' : (isMobile ? 'all 200ms ease' : 'all 300ms ease'),
    }), [isOpen, isMobile, reducedMotion]);

    const iconColor = useMemo(() =>
        isOpen ? STYLE_CONSTANTS.colorPrimary : STYLE_CONSTANTS.colorMuted,
        [isOpen]
    );

    const iconStyles = useMemo(() => ({
        color: iconColor,
        transition: reducedMotion ? 'none' : (isMobile ? 'color 200ms ease' : 'color 300ms ease'),
    }), [iconColor, isMobile, reducedMotion]);

    const toggleStyles = useMemo(() => ({
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: reducedMotion ? 'none' : (isMobile ? 'transform 200ms ease' : 'transform 300ms ease-in-out'),
    }), [isOpen, isMobile, reducedMotion]);

    const contentStyles = useMemo(() => ({
        height: `${contentHeight}px`,
        opacity: isOpen ? 1 : 0,
        transition: reducedMotion
            ? 'none'
            : (isMobile
                ? 'height 200ms cubic-bezier(0.2, 0.9, 0.1, 1), opacity 200ms ease'
                : 'height 280ms cubic-bezier(0.2, 0.9, 0.1, 1), opacity 280ms ease'),
    }), [contentHeight, isOpen, isMobile, reducedMotion]);

    return (
        <article
            className="glass relative overflow-hidden rounded-xl sm:rounded-2xl"
            style={articleStyles}
        >
            {/* Glass noise effect - hidden on mobile */}
            {!isMobile && <div className="glass__noise" style={{ pointerEvents: 'none' }} />}

            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={onToggle}
                className="w-full flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl transition-shadow"
            >
                {/* Icon badge */}
                <div
                    className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                    style={badgeStyles}
                >
                    <Icon
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={iconStyles}
                        aria-hidden="true"
                    />
                </div>

                {/* Question text */}
                <div className="flex-1 min-w-0">
                    <p
                        className="text-sm sm:text-base lg:text-lg font-semibold leading-snug"
                        style={{ color: STYLE_CONSTANTS.colorForeground }}
                    >
                        {item.question}
                    </p>

                    {/* Category badge - mobile only, for context */}
                    <span
                        className="inline-block sm:hidden text-[10px] font-medium mt-1 px-2 py-0.5 rounded-full"
                        style={{
                            background: STYLE_CONSTANTS.categoryBg,
                            color: STYLE_CONSTANTS.colorMuted
                        }}
                        aria-hidden="true"
                    >
                        {item.category}
                    </span>
                </div>

                {/* Toggle indicator */}
                <div
                    className="flex-shrink-0 ml-2 text-muted-foreground"
                    style={toggleStyles}
                    aria-hidden="true"
                >
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </div>
            </button>

            {/* Answer content - smooth height animation */}
            <div
                ref={contentRef}
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                className="overflow-hidden"
                style={contentStyles}
            >
                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                    <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: STYLE_CONSTANTS.colorMuted }}
                    >
                        {item.answer}
                    </p>
                </div>
            </div>
        </article>
    );
});

AccordionItem.displayName = "AccordionItem";

// ==================== DECORATIVE BACKGROUND ====================
const DecorativeBackground = memo(() => (
    <>
        {/* Primary blob */}
        <div
            aria-hidden="true"
            className="absolute -top-20 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{
                background: "hsl(var(--primary) / 0.20)",
                willChange: 'transform',
            }}
        />
        {/* Secondary blob */}
        <div
            aria-hidden="true"
            className="absolute top-36 -right-12 w-64 h-64 rounded-full blur-3xl opacity-16 pointer-events-none"
            style={{
                background: "hsl(var(--emerald) / 0.16)",
                willChange: 'transform',
            }}
        />
        {/* Tertiary blob */}
        <div
            aria-hidden="true"
            className="absolute -bottom-10 left-1/4 w-56 h-56 rounded-full blur-2xl opacity-12 pointer-events-none"
            style={{
                background: "hsl(var(--gold) / 0.14)",
                willChange: 'transform',
            }}
        />
        {/* Grid overlay */}
        <div
            className="absolute inset-0 opacity-6 pointer-events-none"
            style={{ mixBlendMode: "overlay" }}
            aria-hidden="true"
        />
    </>
));

DecorativeBackground.displayName = "DecorativeBackground";

// ==================== PAGE HEADER ====================
const PageHeader = memo(() => (
    <header className="text-center mb-8 sm:mb-12 lg:mb-16">
        {/* Badge */}
        <div
            className="inline-flex items-center gap-2 mb-4 sm:mb-5 glass p-2 rounded-full"
            style={{ border: "1px solid hsl(var(--border) / 0.24)" }}
        >
            <HelpCircle
                className="h-4 w-4"
                style={{ color: STYLE_CONSTANTS.colorPrimary }}
                aria-hidden="true"
            />
            <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: STYLE_CONSTANTS.colorForeground }}
            >
                Got Questions?
            </span>
        </div>

        {/* Main heading */}
        <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
            style={{ color: STYLE_CONSTANTS.colorForeground }}
        >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                Questions
            </span>
        </h1>

        {/* Description */}
        <p
            className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
            style={{ color: STYLE_CONSTANTS.colorMuted }}
        >
            Quick answers about Millennia World School — programs, admissions, and learning approach.
        </p>
    </header>
));

PageHeader.displayName = "PageHeader";

// ==================== CTA SECTION ====================
const CTASection = memo(() => (
    <div className="mt-8 sm:mt-12 text-center">
        <div
            className="glass inline-block px-5 py-5 sm:px-8 sm:py-6 rounded-2xl border shadow-glass-md"
            style={{ border: "1px solid hsl(var(--border) / 0.28)" }}
        >
            <p
                className="text-sm sm:text-base font-semibold"
                style={{ color: STYLE_CONSTANTS.colorForeground }}
            >
                Still have questions?
            </p>
            <p
                className="text-xs sm:text-sm mb-3"
                style={{ color: STYLE_CONSTANTS.colorMuted }}
            >
                Our admissions team is happy to help.
            </p>
            <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{
                    background: STYLE_CONSTANTS.colorPrimary,
                    color: STYLE_CONSTANTS.colorPrimaryFg,
                    boxShadow: "0 8px 28px hsl(var(--primary) / 0.18)",
                }}
            >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Contact Us
            </a>
        </div>
    </div>
));

CTASection.displayName = "CTASection";

// ==================== MAIN FAQ PAGE ====================
const FaqPage = () => {
    const [openId, setOpenId] = useState(null);
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

    // Memoized FAQ list for optimal re-rendering
    const faqList = useMemo(() =>
        FAQ_ITEMS.map((item) => (
            <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
            />
        )),
        [openId, toggle, isMobile, reducedMotion]
    );

    return (
        <main className="relative isolate min-h-screen w-full overflow-hidden py-10 sm:py-14 lg:py-20 bg-background">
            {/* Decorative elements - hidden on mobile for performance */}
            {!isMobile && <DecorativeBackground />}

            {/* Main content container */}
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Page header */}
                <PageHeader />

                {/* FAQ accordion list */}
                <section
                    aria-labelledby="faq-heading"
                    className="grid grid-cols-1 gap-3 sm:gap-4"
                >
                    <h2 id="faq-heading" className="sr-only">
                        Frequently Asked Questions List
                    </h2>
                    {faqList}
                </section>

                {/* Call-to-action */}
                <CTASection />
            </div>
        </main>
    );
};

export default memo(FaqPage);