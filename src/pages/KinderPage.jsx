import React, { memo, useState, useRef, useCallback, useMemo } from "react";
import { motion, useReducedMotion, useInView, domAnimation } from "framer-motion";
import {
    CheckCircle, ChevronDown, ChevronUp, Star, BookOpen, Palette, Heart,
    Globe, Sun, Users, Sparkles
} from "lucide-react";

// Static data moved outside component to prevent recreation
const RHYTHM_INTRO = [
    "In Kindergarten, we believe children are carried along by the rhythms of the world—from breathing to daily cycles of sleeping and waking. Children flourish when daily activities reflect natural order with rhythmic arrangement.",
    "Rhythm provides fixed anchors: mealtimes, bedtime, playtime, work time. Once established, rhythm is deeply soothing—children know what's next without verbal instructions, creating safe boundaries and a predictable, secure world.",
    "Rhythm develops around daily, weekly, and seasonal patterns. Children anticipate activities and \"breathe\" in and out (balancing individual/group, restful/active) from quiet story circles to rigorous work and play.",
    "Teachers carefully balance activities so children don't become overwhelmed. This rhythm isn't imposed—it arises from physical needs of children and teachers, assisting development, providing security, and preventing overstimulation.",
    "Transitions (coming indoors, moving between activities) are made with songs and short games, reducing stress."
];

const RHYTHM_ASPECTS = [
    {
        id: "seasonal",
        icon: Sun,
        title: "Seasonal Rhythms",
        desc: "Activities aligned with nature's cycles",
        full: "Activities and celebrations matched to seasons help children understand cycles in nature and their community, grounding learning in observable patterns.",
        color: "primary"
    },
    {
        id: "culture",
        icon: Globe,
        title: "Indonesian Culture",
        desc: "Local traditions woven into daily life",
        full: "We emphasize the culture of the place where we live—local songs, stories, and traditions are integrated into daily routines, celebrating our community's heritage.",
        color: "gold"
    },
    {
        id: "celebrations",
        icon: Heart,
        title: "Religious Celebrations",
        desc: "Eid, Christmas, and major festivals",
        full: "Major celebrations like Eid and Christmas are respectfully observed as part of our community rhythm, fostering understanding and appreciation.",
        color: "emerald"
    }
];

const PROGRAM_TEXT = [
    "Our kindergarten program develops children's imagination, inspires wonder, and instills appreciation for life.",
    "Activities foster practical experience of concepts and skills foundational to later literacy, numeracy, and life skills.",
    "Our curriculum utilizes a full range of creative activities appropriate for young minds."
];

const ACTIVITIES_IMAGES = [
    { id: 1, title: "Story Circle", desc: "Quiet reflection time", color: "primary" },
    { id: 2, title: "Creative Arts", desc: "Hands-on expression", color: "gold" },
    { id: 3, title: "Music & Movement", desc: "Rhythmic transitions", color: "emerald" },
    { id: 4, title: "Outdoor Play", desc: "Active exploration", color: "primary" }
];

const NICHE_IMAGES = [
    { id: 1, title: "Nature Studies", desc: "Environmental learning", color: "emerald" },
    { id: 2, title: "Cultural Arts", desc: "Traditional crafts", color: "gold" },
    { id: 3, title: "Mindful Movement", desc: "Body awareness", color: "primary" },
    { id: 4, title: "Storytelling", desc: "Narrative imagination", color: "gold" }
];

// Memoized color map to prevent object recreation
const COLOR_MAP = {
    primary: 'hsl(var(--primary))',
    gold: 'hsl(var(--gold))',
    emerald: 'hsl(var(--emerald))'
};

// Optimized Blob with minimal props
const Blob = memo(({ className, size = "md" }) => {
    const sizeClass = size === "sm" ? "w-64 h-64" : size === "lg" ? "w-96 h-96" : "w-80 h-80";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.9, 0.1, 1] }}
            className={`absolute pointer-events-none rounded-full blur-3xl ${sizeClass} ${className}`}
            style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)' }}
        />
    );
});
Blob.displayName = "Blob";

// Optimized AspectCard with useCallback
const AspectCard = memo(({ item, index }) => {
    const [open, setOpen] = useState(false);
    const Icon = item.icon;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    const toggleOpen = useCallback(() => setOpen(prev => !prev), []);

    const colorVar = useMemo(() => `hsl(var(--${item.color}))`, [item.color]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.2, 0.9, 0.1, 1] }}
            className="group"
        >
            <div className="glass hover-lift h-full transition-all duration-300">
                <div className="glass__noise" />

                <div className="relative p-4 md:p-5">
                    <button
                        onClick={toggleOpen}
                        className="w-full text-left"
                        aria-expanded={open}
                        aria-label={`Toggle ${item.title} details`}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
                                style={{ background: colorVar, color: 'hsl(var(--card))' }}
                            >
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-base md:text-lg font-bold text-[hsl(var(--foreground))] mb-1 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                                    {item.title}
                                </h4>
                                <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="shrink-0">
                                {open ? <ChevronUp className="w-4 h-4 text-[hsl(var(--primary))]" /> : <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />}
                            </div>
                        </div>
                    </button>

                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-0 md:pl-15 pt-2 border-t border-[hsl(var(--border))] mt-2"
                        >
                            <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                {item.full}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
});
AspectCard.displayName = "AspectCard";

// Optimized GalleryCard
const GalleryCard = memo(({ item, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    const bgGradient = useMemo(() => {
        const color = COLOR_MAP[item.color];
        return `linear-gradient(135deg, ${color}, ${color}dd)`;
    }, [item.color]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.9, 0.1, 1] }}
            className="group"
        >
            <div className="glass hover-lift h-full transition-all duration-300 overflow-hidden">
                <div className="glass__noise" />

                <div className="relative h-40 md:h-48 w-full overflow-hidden" style={{ background: bgGradient }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--card)/0.2)] backdrop-blur-sm flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-[hsl(var(--card))]" />
                        </div>
                    </div>
                </div>

                <div className="relative p-3 md:p-4">
                    <h4 className="text-sm md:text-base font-bold text-[hsl(var(--foreground))] mb-1 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                        {item.title}
                    </h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        {item.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});
GalleryCard.displayName = "GalleryCard";

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