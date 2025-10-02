// FaqPage.jsx
import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    HelpCircle,
    Target,
    Lightbulb,
    BookOpen,
    MessageCircle,
    DollarSign,
    ChevronDown,
    Plus,
    Minus,
} from "lucide-react";

/**
 * Data: keep simple and static here (move to CMS/API later if needed)
 * Note: don't use hooks outside component; keep constants cheap
 */
const FAQ_ITEMS = [
    {
        id: "about",
        icon: HelpCircle,
        question: "What is Millennia World School?",
        answer:
            "Millennia World School offers an integrated, modern approach to education — blending international curriculum, character development, and real-world skills.",
        category: "About",
    },
    {
        id: "mission",
        icon: Target,
        question: "What is MWS Mission?",
        answer:
            "To empower learners through personalized, high-quality education that prepares them for global opportunities and leadership.",
        category: "Mission",
    },
    {
        id: "philosophy",
        icon: Lightbulb,
        question: "MWS Philosophy",
        answer:
            "We foster curiosity, creativity, and resilience — focusing on holistic development rather than rote instruction.",
        category: "Philosophy",
    },
    {
        id: "principles",
        icon: BookOpen,
        question: "Principles and Paradigms",
        answer:
            "Collaboration, inquiry-based learning, and project-driven experiences are core to how students engage with knowledge.",
        category: "Principles",
    },
    {
        id: "method",
        icon: MessageCircle,
        question: "What Method of Learning does MWS use?",
        answer:
            "A hybrid of guided discovery, practical projects, and scaffolded instruction tailored to each learner’s pace.",
        category: "Learning",
    },
    {
        id: "tuition",
        icon: DollarSign,
        question: "What is the annual tuition?",
        answer:
            "Tuition reflects our premium facilities and faculty. For a tailored quote, contact admissions for up-to-date fees and scholarships.",
        category: "Admissions",
    },
];

/* -------------------------
   Accordion Item (memoized)
   ------------------------- */
const AccordionItem = memo(function AccordionItem({ item, isOpen, onToggle, reduced }) {
    const Icon = item.icon;

    // small animation config, respects reduced motion
    const contentTransition = reduced
        ? { duration: 0 }
        : { duration: 0.28, ease: [0.2, 0.9, 0.1, 1] };

    return (
        <motion.article
            layout
            className="glass relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300"
            style={{
                border: `1px solid ${isOpen ? "hsl(var(--primary) / 0.28)" : "hsl(var(--border) / 0.40)"}`,
            }}
        >
            <div className="glass__noise" />

            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                onClick={onToggle}
                onKeyDown={(e) => {
                    // allow Enter / Space toggle
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggle();
                    }
                }}
                className="w-full flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 text-left focus:outline-none"
            >
                {/* icon badge */}
                <div
                    className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                        background: isOpen
                            ? "linear-gradient(135deg, hsl(var(--primary) / 0.14), hsl(var(--gold) / 0.12))"
                            : "hsl(var(--muted) / 0.28)",
                        border: isOpen ? "1px solid hsl(var(--primary) / 0.18)" : "1px solid transparent",
                    }}
                >
                    <Icon
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                        aria-hidden
                    />
                </div>

                {/* Question */}
                <div className="flex-1 min-w-0">
                    <p
                        className="text-sm sm:text-base lg:text-lg font-semibold leading-snug truncate"
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        {item.question}
                    </p>

                    {/* small category for mobile to add context without heavy UI */}
                    <span
                        className="inline-block sm:hidden text-[10px] font-medium mt-1 px-2 py-0.5 rounded-full"
                        style={{ background: "hsl(var(--muted) / 0.36)", color: "hsl(var(--muted-foreground))" }}
                        aria-hidden
                    >
                        {item.category}
                    </span>
                </div>

                {/* toggle icon */}
                <div className="flex-shrink-0 ml-2">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: reduced ? 0 : 0.28, ease: "easeInOut" }}
                        className="text-muted-foreground"
                        aria-hidden
                    >
                        {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </motion.div>
                </div>
            </button>

            {/* Answer content: AnimatePresence + height animation (smooth, performant) */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`faq-content-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-title-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={contentTransition}
                        className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-0"
                        style={{ overflow: "hidden" }}
                    >
                        <p
                            className="text-sm sm:text-base leading-relaxed"
                            style={{ color: "hsl(var(--muted-foreground))" }}
                        >
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
});

AccordionItem.displayName = "AccordionItem";

/* -------------------------
   Main FAQ Page
   ------------------------- */
const FaqPage = () => {
    const [openId, setOpenId] = useState(null);
    const reduced = useReducedMotion(); // respects user pref

    const toggle = useCallback(
        (id) => {
            setOpenId((prev) => (prev === id ? null : id));
        },
        [setOpenId]
    );

    return (
        <main className="relative isolate min-h-screen w-full overflow-hidden py-10 sm:py-14 lg:py-20 bg-background">
            {/* decorative blobs (token-based colors) */}
            <div
                aria-hidden
                className="absolute -top-20 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20"
                style={{ background: "hsl(var(--primary) / 0.20)" }}
            />
            <div
                aria-hidden
                className="absolute top-36 -right-12 w-64 h-64 rounded-full blur-3xl opacity-16"
                style={{ background: "hsl(var(--emerald) / 0.16)" }}
            />
            <div
                aria-hidden
                className="absolute -bottom-10 left-1/4 w-56 h-56 rounded-full blur-2xl opacity-12"
                style={{ background: "hsl(var(--gold) / 0.14)" }}
            />

            {/* subtle grid - low opacity */}
            <div className="absolute inset-0 opacity-6 pointer-events-none" style={{ mixBlendMode: "overlay" }} />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div
                        className="inline-flex items-center gap-2 mb-4 sm:mb-5 glass p-2 rounded-full"
                        style={{ border: "1px solid hsl(var(--border) / 0.24)" }}
                    >
                        <HelpCircle className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} />
                        <span className="text-xs sm:text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                            Got Questions?
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3" style={{ color: "hsl(var(--foreground))" }}>
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Quick answers about Millennia World School — programs, admissions, and learning approach.
                    </p>
                </header>

                {/* FAQ list (single column; mobile-friendly) */}
                <section aria-labelledby="faq-list" className="grid grid-cols-1 gap-3 sm:gap-4">
                    {FAQ_ITEMS.map((item) => (
                        <AccordionItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} reduced={reduced} />
                    ))}
                </section>

                {/* bottom CTA */}
                <div className="mt-8 sm:mt-12 text-center">
                    <div
                        className="glass inline-block px-5 py-5 sm:px-8 sm:py-6 rounded-2xl border shadow-glass-md"
                        style={{ border: "1px solid hsl(var(--border) / 0.28)" }}
                    >
                        <p className="text-sm sm:text-base font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                            Still have questions?
                        </p>
                        <p className="text-xs sm:text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                            Our admissions team is happy to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                            style={{
                                background: "hsl(var(--primary))",
                                color: "hsl(var(--primary-foreground))",
                                boxShadow: "0 8px 28px hsl(var(--primary) / 0.18)",
                            }}
                        >
                            <MessageCircle className="h-4 w-4" />
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default memo(FaqPage);
