import React, { memo, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
    Heart, Palette, Wrench, Flame, Brain, Leaf, Award,
    Sparkles, Target, Eye, Compass, BookOpen, Users, Lightbulb
} from "lucide-react";

// Sanitization utility for inputs (prevents XSS, malicious scripts)
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>\"']/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim()
        .slice(0, 500);
};

// H.A.P.P.I.N.E.S.S Framework Data
const happinessData = [
    { letter: "H", title: "Health", desc: "Physical wellness & vitality", icon: Heart, color: "primary" },
    { letter: "A", title: "Artistic Ability", desc: "Creative expression through arts", icon: Palette, color: "gold" },
    { letter: "P", title: "Practical Skills", desc: "Real-world competencies", icon: Wrench, color: "emerald" },
    { letter: "P", title: "Passion", desc: "Deep interests & personal drive", icon: Flame, color: "primary" },
    { letter: "I", title: "Intellect", desc: "Critical thinking & curiosity", icon: Brain, color: "gold" },
    { letter: "N", title: "Naturalistic", desc: "Environmental awareness", icon: Leaf, color: "emerald" },
    { letter: "E", title: "Excellence", desc: "Pursuit of mastery", icon: Award, color: "primary" },
    { letter: "S", title: "Social", desc: "Collaboration & empathy", icon: Users, color: "gold" },
    { letter: "S", title: "Spiritual", desc: "Purpose & self-awareness", icon: Lightbulb, color: "emerald" }
];

// Optimized Blob - minimal re-renders
const Blob = memo(({ className, delay = 0, size = "lg" }) => {
    const sizeMap = { sm: "w-64 h-64", md: "w-80 h-80", lg: "w-96 h-96" };
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay, ease: [0.2, 0.9, 0.1, 1] }}
            className={`absolute pointer-events-none rounded-full blur-3xl ${sizeMap[size]} ${className}`}
            style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)'
            }}
        />
    );
});

// Animated Letter - optimized with CSS
const Letter = memo(({ char, index, inView }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (inView) {
            const t = setTimeout(() => setShow(true), index * 100);
            return () => clearTimeout(t);
        }
    }, [inView, index]);

    return (
        <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.2, 0.9, 0.1, 1] }}
            className="inline-block bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent"
        >
            {char}
        </motion.span>
    );
});

// Compact Card for Mobile
const HappinessCard = memo(({ item, idx }) => {
    const Icon = item.icon;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const reduceMotion = useReducedMotion();

    const colorVars = {
        primary: { bg: 'hsl(var(--primary))', text: 'hsl(var(--primary))' },
        gold: { bg: 'hsl(var(--gold))', text: 'hsl(var(--gold))' },
        emerald: { bg: 'hsl(var(--emerald))', text: 'hsl(var(--emerald))' }
    };

    const colors = colorVars[item.color];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : idx * 0.05, ease: [0.2, 0.9, 0.1, 1] }}
            className="group h-full"
        >
            <div className="glass hover-lift h-full transition-all duration-300">
                <div className="glass__noise" />

                <div className="relative p-4 md:p-5">
                    {/* Mobile: Horizontal, Desktop: Vertical */}
                    <div className="flex md:flex-col items-center md:items-start gap-3 mb-3">
                        {/* Letter Badge - smaller on mobile */}
                        <div
                            className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.bg}, ${colors.bg}dd)`,
                                color: 'hsl(var(--primary))'
                            }}
                        >
                            {item.letter}
                        </div>

                        {/* Icon - only on desktop */}
                        <div
                            className="hidden md:flex p-2 rounded-lg transition-all duration-300 group-hover:bg-opacity-20"
                            style={{
                                background: `${colors.bg}15`,
                                color: colors.text
                            }}
                        >
                            <Icon className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-base md:text-lg font-bold text-[hsl(var(--foreground))] mb-1.5 transition-colors duration-300 group-hover:text-[hsl(var(--primary))]">
                        {item.title}
                    </h4>

                    {/* Description - shorter on mobile */}
                    <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});

// Vision/Mission - Compact Mobile Version
const VMCard = memo(({ title, content, icon: Icon, color = "primary" }) => (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
    >
        <div className="glass glass--frosted hover-lift h-full transition-all duration-300">
            <div className="glass__noise" />

            <div className="relative p-5 md:p-6">
                {/* Badge - icon only on mobile */}
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 text-xs md:text-sm font-medium transition-all duration-300"
                    style={{
                        background: `hsl(var(--${color}) / 0.1)`,
                        border: `1px solid hsl(var(--${color}) / 0.2)`,
                        color: `hsl(var(--${color}))`
                    }}
                >
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden md:inline">{title}</span>
                    <span className="md:hidden">{title.split(' ')[1]}</span>
                </div>

                <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    </motion.div>
));

// Main Component
function AboutPage() {
    const reduceMotion = useReducedMotion();
    const happinessRef = useRef(null);
    const happinessInView = useInView(happinessRef, { once: true, amount: 0.15 });

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--surface))]">

            {/* === HERO SECTION === */}
            <section className="relative py-12 md:py-20 lg:py-28">
                {/* Blobs - hidden on mobile for performance */}
                <div className="hidden md:block">
                    <Blob className="-top-40 -right-40 animate-blob-right" delay={0} size="lg" />
                    <Blob className="top-1/4 -left-48 animate-blob-left" delay={0.3} size="md" />
                </div>

                {/* Grid - reduced opacity on mobile */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.015] md:opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M20 18v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />

                <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] text-xs md:text-sm font-medium">
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>About MWS</span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.9, 0.1, 1] }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[hsl(var(--foreground))] mb-5"
                    >
                        MWS <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent">Background</span>
                    </motion.h1>

                    {/* Description - compact version */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0.9, 0.1, 1] }}
                        className="max-w-4xl mx-auto mb-8"
                    >
                        <div className="glass glass--frosted transition-all duration-300">
                            <div className="glass__noise" />

                            <div className="relative p-5 md:p-7 lg:p-8">
                                <div className="space-y-4 text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                    {/* Opening Hook */}
                                    <p className="text-sm md:text-base font-medium text-[hsl(var(--foreground))]">
                                        The 21st century presents a unique challenge: preparing young minds for a future that is complex, constantly evolving, and largely unpredictable.
                                    </p>

                                    {/* Core Skills */}
                                    <p>
                                        Success in today's ever-changing world demands <strong className="text-[hsl(var(--foreground))]">intellectual flexibility, creative thinking, independent judgment, moral discernment,</strong> and refined communication skills—both written and oral. The ability to <strong className="text-[hsl(var(--foreground))]">collaborate effectively</strong> is no longer optional; it's essential.
                                    </p>

                                    {/* MWS Approach */}
                                    <div className="pl-3 border-l-2 border-[hsl(var(--primary)/0.3)]">
                                        <p className="font-medium text-[hsl(var(--foreground))]">
                                            Millennia World School (MWS) offers a developmentally appropriate, experiential approach to education.
                                        </p>
                                    </div>

                                    {/* Integration Philosophy */}
                                    <p>
                                        We use <span className="text-[hsl(var(--gold))] font-medium">Science to inspire artistic thinking</span> and <span className="text-[hsl(var(--emerald))] font-medium">Art to inspire scientific thinking.</span> Each subject interlaces with every other, providing nuance, context, and deeper meaning. Music, art, and movement hold equal importance to Math, Science, and Languages.
                                    </p>

                                    {/* Learning Environment */}
                                    <p>
                                        Through playful and engaging learning strategies, we develop compassionate and critical thinkers. Our safe, caring, and nurturing environment allows children to blossom naturally.
                                    </p>

                                    {/* Vision Statement */}
                                    <p className="text-sm md:text-base font-semibold text-[hsl(var(--foreground))]">
                                        We aim to inspire lifelong learners who fully develop their talents, dispositions, and capabilities.
                                    </p>

                                    {/* Educational Principle */}
                                    <p>
                                        MWS education operates on a fundamental principle: <strong className="text-[hsl(var(--primary))]">subjects are meant to be experienced, not just read and tested.</strong> Through these deep, meaningful experiences, children cultivate intellectual, emotional, and physical capabilities to become trailblazers and future leaders.
                                    </p>

                                    {/* Closing */}
                                    <div className="pt-2 mt-2 border-t border-[hsl(var(--border))]">
                                        <p className="text-sm font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent">
                                            To fulfill this dream, Millennia World School was established in 2017.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vision & Mission - 1 col on mobile, 2 on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        <VMCard
                            title="Our Vision"
                            icon={Eye}
                            color="primary"
                            content="A globalized society based on compassion where every individual connects to others using their maximum potential through Truth, Beauty, and Goodness to achieve happiness."
                        />
                        <VMCard
                            title="Our Mission"
                            icon={Target}
                            color="gold"
                            content="Discover and foster individual and group potential to achieve fulfilling lives."
                        />
                    </div>
                </div>
            </section>

            {/* === PHILOSOPHY SECTION === */}
            <section className="relative py-12 md:py-16 lg:py-20" ref={happinessRef}>
                {/* Blob - hidden on mobile */}
                <div className="hidden md:block">
                    <Blob className="-bottom-56 -right-40 animate-blob-right" delay={0.2} size="lg" />
                </div>

                <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[hsl(var(--emerald)/0.1)] border border-[hsl(var(--emerald)/0.2)] text-[hsl(var(--emerald))] text-xs md:text-sm font-medium mb-5">
                            <Compass className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>Our Philosophy</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                            The{" "}
                            <span className="text-3xl md:text-5xl lg:text-6xl tracking-wider">
                                {"HAPPINESS".split("").map((char, i) => (
                                    <Letter key={i} char={char} index={i} inView={happinessInView} />
                                ))}
                            </span>
                            {" "}Framework
                        </h2>

                        <div className="max-w-3xl mx-auto px-4">
                            <div className="glass glass--frosted p-4 md:p-5 mb-6">
                                <div className="glass__noise" />
                                <div className="relative space-y-3 text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                    <p className="font-medium text-[hsl(var(--foreground))]">
                                        Our Philosophy is based on profound understanding of human development that addresses the needs of growing children and aims at developing their love of learning, sense of meaning, and purpose.
                                    </p>
                                    <p>
                                        At MWS, we emphasize the role of <span className="text-[hsl(var(--gold))] font-medium">imagination in learning</span>, striving to integrate holistically the intellectual, practical, and artistic development of students.
                                    </p>
                                    <div className="pl-3 border-l-2 border-[hsl(var(--emerald)/0.4)] bg-[hsl(var(--emerald)/0.05)] py-2 rounded-r">
                                        <p className="text-[hsl(var(--foreground))] font-semibold">
                                            At the heart of our philosophy lies the concept of <span className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--gold))] to-[hsl(var(--emerald))] bg-clip-text text-transparent">H.A.P.P.I.N.E.S.S</span> that covers the development of the following aspects:
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid - 2 cols mobile, 3 desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
                        {happinessData.map((item, i) => (
                            <HappinessCard key={`${item.letter}-${i}`} item={item} idx={i} />
                        ))}
                    </div>

                    {/* Bottom Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                    >
                        <div className="glass glass--frosted glass--deep max-w-4xl mx-auto transition-all duration-300">
                            <div className="glass__refract hidden md:block" />
                            <div className="glass__noise" />

                            <div className="relative p-5 md:p-7">
                                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                                    {/* Icon */}
                                    <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--gold))] text-[hsl(var(--card))] shadow-lg shrink-0">
                                        <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-[hsl(var(--foreground))] mb-3">
                                            Education Through Experience
                                        </h3>

                                        <div className="space-y-3 text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                            {/* Opening Statement */}
                                            <p className="font-medium text-[hsl(var(--foreground))]">
                                                We aim to develop and inspire lifelong learners and enable them to fully develop their talents, dispositions, and capabilities.
                                            </p>

                                            {/* Educational Principle - Highlighted */}
                                            <div className="bg-[hsl(var(--primary)/0.05)] border-l-2 border-[hsl(var(--primary)/0.4)] pl-3 py-2 rounded-r">
                                                <p>
                                                    Millennia World School's Education is based on the principle that <strong className="text-[hsl(var(--primary))]">subjects are not meant just to be read and tested on, but rather to be experienced.</strong>
                                                </p>
                                            </div>

                                            {/* Deep Learning Experiences */}
                                            <p>
                                                Through these deep, meaningful learning experiences, children develop and cultivate <span className="text-[hsl(var(--gold))] font-medium">intellectual</span>, <span className="text-[hsl(var(--emerald))] font-medium">emotional</span>, and <span className="text-[hsl(var(--primary))] font-medium">physical capabilities</span> to become individuals who are trailblazers and future leaders.
                                            </p>

                                            {/* Closing Statement */}
                                            <div className="pt-2 mt-2 border-t border-[hsl(var(--border))]">
                                                <p className="text-sm font-bold bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--gold))] to-[hsl(var(--emerald))] bg-clip-text text-transparent">
                                                    To fulfill this dream, Millennia World School was established in 2017.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default memo(AboutPage);