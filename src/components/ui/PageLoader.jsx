import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO = "/MWS-Long.svg";

/**
 * Premium PageLoader Component
 * Lightweight, performant loading screen with liquid glass effect
 * @param {boolean} visible - Controls loader visibility
 */
const PageLoader = memo(({ visible = true }) => {
    // Optimized animation variants (GPU-accelerated properties only)
    const backdropVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.3, ease: [0.2, 0.9, 0.1, 1] } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
    };

    const contentVariants = {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.2, 0.9, 0.1, 1], delay: 0.1 }
        },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
    };

    const spinnerVariants = {
        animate: {
            rotate: 360,
            transition: { duration: 1, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    key="loader-backdrop"
                    variants={backdropVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--surface)) 100%)",
                    }}
                    role="status"
                    aria-live="polite"
                    aria-label="Loading content"
                >
                    {/* Dot pattern - lightweight */}
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.12) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                        }}
                        aria-hidden="true"
                    />

                    {/* Subtle grid lines */}
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(hsl(var(--primary)) 0.5px, transparent 0.5px),
                               linear-gradient(90deg, hsl(var(--primary)) 0.5px, transparent 0.5px)`,
                            backgroundSize: "60px 60px",
                        }}
                        aria-hidden="true"
                    />

                    {/* Animated decorative blobs - optimized */}
                    <motion.div
                        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-[0.14]"
                        style={{ background: "hsl(var(--primary))" }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 15, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden="true"
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-[0.1]"
                        style={{ background: "hsl(var(--gold))" }}
                        animate={{
                            y: [0, 25, 0],
                            x: [0, -18, 0],
                            scale: [1, 1.06, 1]
                        }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        aria-hidden="true"
                    />

                    {/* Main loader card - liquid glass effect */}
                    <motion.div
                        variants={contentVariants}
                        className="relative z-10 mx-4 w-full max-w-md"
                    >
                        <div
                            className="glass glass--frosted glass--deep p-6 md:p-8 rounded-2xl md:rounded-3xl"
                            style={{
                                border: "1px solid hsl(var(--border) / 0.4)",
                            }}
                        >
                            {/* Glass refraction layers */}
                            <div className="glass__refract" aria-hidden="true" />
                            <div className="glass__noise" aria-hidden="true" />

                            {/* Content wrapper */}
                            <div className="relative z-10">
                                {/* Logo + Spinner Row */}
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    {/* Logo */}
                                    <div className="flex-1 min-w-0">
                                        <img
                                            src={LOGO}
                                            alt="Millennia World School"
                                            className="h-10 md:h-12 w-auto object-contain select-none"
                                            draggable={false}
                                            loading="eager"
                                        />
                                    </div>

                                    {/* Spinner */}
                                    <motion.div
                                        variants={spinnerVariants}
                                        animate="animate"
                                        className="flex-shrink-0"
                                    >
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-label="Loading spinner"
                                            className="w-8 h-8 md:w-9 md:h-9"
                                        >
                                            {/* Background ring */}
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                stroke="hsl(var(--border))"
                                                strokeWidth="2"
                                                opacity="0.25"
                                            />
                                            {/* Animated arc */}
                                            <path
                                                d="M21 12a9 9 0 0 0-9-9"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Loading text - compact on mobile */}
                                <p
                                    className="text-xs md:text-sm font-medium mb-4 md:mb-5"
                                    style={{ color: "hsl(var(--muted-foreground))" }}
                                >
                                    Loading experience...
                                </p>

                                {/* Progress bar with shimmer effect */}
                                <div
                                    className="relative h-1 md:h-1.5 w-full rounded-full overflow-hidden"
                                    style={{ background: "hsl(var(--muted) / 0.4)" }}
                                >
                                    <motion.div
                                        className="absolute inset-y-0 w-1/3"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "400%" }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            background: `linear-gradient(90deg, 
                        transparent 0%, 
                        hsl(var(--primary) / 0.4) 25%,
                        hsl(var(--gold) / 0.5) 50%,
                        hsl(var(--primary) / 0.4) 75%,
                        transparent 100%)`,
                                        }}
                                    />
                                </div>

                                {/* Accent dots - visual polish */}
                                <div className="flex items-center justify-center gap-1.5 mt-6">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                                            style={{
                                                background: i === 0
                                                    ? "hsl(var(--primary))"
                                                    : i === 1
                                                        ? "hsl(var(--gold))"
                                                        : "hsl(var(--emerald))",
                                            }}
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.4, 1, 0.4],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

PageLoader.displayName = "PageLoader";

export default PageLoader;