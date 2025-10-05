import React, { memo, useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion, domAnimation } from "framer-motion";
import {
    Star, BookOpen, Palette, Users, ChevronDown
} from "lucide-react";
import {
    RHYTHM_INTRO,
    RHYTHM_ASPECTS,
    PROGRAM_TEXT,
    ACTIVITIES_IMAGES,
    NICHE_IMAGES
} from "../data/kinderData";
import Blob from "./kinder/Blob";
import AspectCard from "./kinder/AspectCard";
import GalleryCard from "./kinder/GalleryCard";

// Main Component
function KinderPage() {
    const reduceMotion = useReducedMotion();
    const [readMore, setReadMore] = useState(false);

    const toggleReadMore = useCallback(() => setReadMore(prev => !prev), []);

    const displayedIntro = useMemo(
        () => readMore ? RHYTHM_INTRO : RHYTHM_INTRO.slice(0, 2),
        [readMore]
    );

    return (
        <motion features={domAnimation} strict>
            <div className="relative w-full overflow-hidden bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--surface))]">

                {/* HERO SECTION */}
                <section className="relative py-12 md:py-20 lg:py-24">
                    <div className="hidden md:block">
                        <Blob className="-top-40 -right-40 animate-blob-right" size="lg" />
                        <Blob className="top-1/3 -left-48 animate-blob-left" size="md" />
                    </div>

                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.015] md:opacity-[0.02]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M20 18v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />

                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                            className="flex justify-center mb-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] text-xs md:text-sm font-medium">
                                <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>Kindergarten Program</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.9, 0.1, 1] }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[hsl(var(--foreground))] mb-5"
                        >
                            Rhythm, Play & <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent">Wonder</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0.9, 0.1, 1] }}
                            className="max-w-4xl mx-auto mb-12"
                        >
                            <div className="glass glass--frosted transition-all duration-300">
                                <div className="glass__noise" />

                                <div className="relative p-5 md:p-7 lg:p-8">
                                    <div className="space-y-4 text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                        {displayedIntro.map((p, i) => (
                                            <p key={i} className={i === 0 ? "text-sm md:text-base font-medium text-[hsl(var(--foreground))]" : ""}>
                                                {p}
                                            </p>
                                        ))}

                                        <button
                                            onClick={toggleReadMore}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300"
                                            style={{
                                                background: readMore ? 'hsl(var(--primary)/0.1)' : 'transparent',
                                                color: 'hsl(var(--primary))',
                                                border: `1px solid hsl(var(--primary)/${readMore ? '0.2' : '0.1'})`
                                            }}
                                            aria-expanded={readMore}
                                        >
                                            {readMore ? <><ChevronUp className="w-3.5 h-3.5" /> Show less</> : <><ChevronDown className="w-3.5 h-3.5" /> Read more</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-6">
                                Establishing <span className="text-[hsl(var(--primary))]">Rhythm</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                                {RHYTHM_ASPECTS.map((item, i) => (
                                    <AspectCard key={item.id} item={item} index={i} />
                                ))}
                            </div>
                        </div>

                        <div className="glass glass--frosted max-w-3xl mx-auto transition-all duration-300">
                            <div className="glass__noise" />

                            <div className="relative p-5 md:p-6">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--gold))] text-[hsl(var(--card))] shadow-lg shrink-0">
                                        <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>

                                    <div className="space-y-3 text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                        {PROGRAM_TEXT.map((p, i) => (
                                            <p key={i} className={i === 0 ? "font-medium text-[hsl(var(--foreground))]" : ""}>
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACTIVITIES SECTION */}
                <section className="relative py-12 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] text-[hsl(var(--gold))] text-xs md:text-sm font-medium mb-4">
                                <Palette className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>Daily Activities</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                                Kindergarten <span className="text-[hsl(var(--gold))]">Activities</span>
                            </h2>
                            <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                                From storytelling to creative arts, our daily activities nurture imagination and foundational skills.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {ACTIVITIES_IMAGES.map((img, i) => (
                                <GalleryCard key={img.id} item={img} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* NICHE PROGRAMS SECTION */}
                <section className="relative py-12 md:py-16 lg:py-20">
                    <div className="hidden md:block">
                        <Blob className="-bottom-48 -left-40 animate-blob-left" size="lg" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[hsl(var(--emerald)/0.1)] border border-[hsl(var(--emerald)/0.2)] text-[hsl(var(--emerald))] text-xs md:text-sm font-medium mb-4">
                                <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>Specialized Learning</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                                Niche <span className="text-[hsl(var(--emerald))]">Programs</span>
                            </h2>
                            <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                                Specialized programs that deepen cultural connection, environmental awareness, and creative expression.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {NICHE_IMAGES.map((img, i) => (
                                <GalleryCard key={img.id} item={img} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="relative py-8 md:py-12">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <div className="glass glass--deep transition-all duration-300">
                            <div className="glass__refract hidden md:block" />
                            <div className="glass__noise" />

                            <div className="relative p-5 md:p-6 lg:p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-[hsl(var(--foreground))] mb-1">
                                            Experience Our Kindergarten
                                        </h3>
                                        <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                                            Book a visit to see our classrooms in action and meet our educators.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button
                                            className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                                            aria-label="Contact us for more information"
                                        >
                                            Contact Us
                                        </button>
                                        <button
                                            className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
                                            style={{
                                                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))',
                                                color: 'hsl(var(--card))'
                                            }}
                                            aria-label="Schedule a visit to our kindergarten"
                                        >
                                            Schedule Visit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </motion>
    );
}

export default memo(KinderPage);

// CSS Animations
const styles = `
    @keyframes blobFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
        [style*="blobFadeIn"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}