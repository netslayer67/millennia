import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Music2,
    Globe,
    HeartHandshake,
    Activity,
    Sparkles,
    Users,
    Target,
    Lightbulb,
    GraduationCap,
    Zap
} from "lucide-react";

// Performance-optimized animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.2, 0.9, 0.1, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
};

const itemFade = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.2, 0.9, 0.1, 1] }
    }
};

// Subjects data
const SUBJECTS = [
    { id: 1, label: "Art, Music & Choir", icon: Music2, accent: "primary" },
    { id: 2, label: "Mathematics", icon: Target, accent: "emerald" },
    { id: 3, label: "Science", icon: Activity, accent: "gold" },
    { id: 4, label: "Social Studies", icon: Users, accent: "primary" },
    { id: 5, label: "Character Building", icon: HeartHandshake, accent: "emerald" },
    { id: 6, label: "Foreign Language", icon: Globe, accent: "gold" }
];

// Niche programs data
const PROGRAMS = [
    {
        id: 1,
        title: "Calligraphy & Shodo",
        desc: "Ancient art of beautiful writing",
        img: "https://images.unsplash.com/photo-1592944395639-37c81f6d3df4?w=600&q=80",
        icon: Sparkles,
        accent: "primary"
    },
    {
        id: 2,
        title: "Sustainable Life",
        desc: "Eco-conscious living",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
        icon: HeartHandshake,
        accent: "emerald"
    },
    {
        id: 3,
        title: "Cultural Arts",
        desc: "Traditional crafts",
        img: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80",
        icon: Music2,
        accent: "gold"
    },
    {
        id: 4,
        title: "Culinary Arts",
        desc: "Cooking fundamentals",
        img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
        icon: Activity,
        accent: "primary"
    },
    {
        id: 5,
        title: "Digital Literacy",
        desc: "Tech skills",
        img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80",
        icon: Zap,
        accent: "emerald"
    },
    {
        id: 6,
        title: "Mindfulness",
        desc: "Mental wellness",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        icon: Lightbulb,
        accent: "gold"
    }
];

// Optimized SubjectCard
const SubjectCard = memo(({ subject }) => {
    const accentStyles = useMemo(() => ({
        primary: "group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)]",
        emerald: "group-hover:bg-emerald group-hover:text-emerald-foreground group-hover:shadow-[0_0_20px_hsl(var(--emerald)/0.25)]",
        gold: "group-hover:bg-gold group-hover:text-gold-foreground group-hover:shadow-[0_0_20px_hsl(var(--gold)/0.25)]"
    }), []);

    return (
        <motion.div
            variants={itemFade}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.1, 1] }}
            className="glass group cursor-pointer"
        >
            <div className="relative p-4 md:p-5">
                <div className="flex items-center gap-3">
                    <div className={`
            flex-shrink-0 p-2.5 rounded-lg
            bg-muted/30 text-muted-foreground
            transition-all duration-300
            ${accentStyles[subject.accent]}
          `}>
                        <subject.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground transition-colors duration-300">
                        {subject.label}
                    </h3>
                </div>
                <div className="glass__refract" />
                <div className="glass__noise" />
            </div>
        </motion.div>
    );
});

SubjectCard.displayName = "SubjectCard";

// Optimized FeatureCard
const FeatureCard = memo(({ icon: Icon, title, desc, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay, ease: [0.2, 0.9, 0.1, 1] }}
        className="glass p-4 md:p-5 group hover-lift"
    >
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
                <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1.5">
                    {title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
        <div className="glass__noise" />
    </motion.div>
));

FeatureCard.displayName = "FeatureCard";

// Optimized ProgramCard
const ProgramCard = memo(({ program }) => {
    const gradients = useMemo(() => ({
        primary: "from-primary/25 via-primary/12 to-transparent",
        emerald: "from-emerald/25 via-emerald/12 to-transparent",
        gold: "from-gold/25 via-gold/12 to-transparent"
    }), []);

    const iconStyles = useMemo(() => ({
        primary: "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.4)]",
        emerald: "bg-emerald text-emerald-foreground shadow-[0_0_16px_hsl(var(--emerald)/0.4)]",
        gold: "bg-gold text-gold-foreground shadow-[0_0_16px_hsl(var(--gold)/0.4)]"
    }), []);

    return (
        <motion.div
            variants={itemFade}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.1, 1] }}
            className="glass glass--deep group cursor-pointer overflow-hidden"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={program.img}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradients[program.accent]} opacity-75 group-hover:opacity-90 transition-opacity duration-300`} />

                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                    <div className={`inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg backdrop-blur-sm mb-2 transition-all duration-300 ${iconStyles[program.accent]}`}>
                        <program.icon className="w-4 h-4 md:w-4.5 md:h-4.5" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-card drop-shadow-lg mb-0.5">
                        {program.title}
                    </h3>
                    <p className="text-xs text-card/85 drop-shadow-md">
                        {program.desc}
                    </p>
                </div>
                <div className="glass__noise opacity-15" />
            </div>
        </motion.div>
    );
});

ProgramCard.displayName = "ProgramCard";

// Main Component
const ElemenPage = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">

            {/* Enhanced Grid Pattern - More Visible */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
                    backgroundSize: '32px 32px'
                }}
                aria-hidden="true"
            />

            {/* Enhanced Dot Pattern Overlay - More Visible */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
                aria-hidden="true"
            />

            {/* Decorative blobs - Enhanced */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-blob-left will-change-transform pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1/4 -right-48 w-[30rem] h-[30rem] rounded-full bg-emerald/12 blur-3xl animate-blob-right will-change-transform pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-gold/10 blur-3xl animate-blob-left will-change-transform pointer-events-none" aria-hidden="true" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-14 lg:py-16">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                    className="text-center mb-10 md:mb-14"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 mb-4">
                        <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 md:mb-4">
                        Elementary Program
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Where curiosity meets excellence through hands-on learning
                    </p>
                </motion.div>

                {/* Philosophy */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="glass glass--frosted p-5 md:p-7 lg:p-8 mb-12 md:mb-16"
                >
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Lightbulb className="w-5 h-5 text-primary" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-foreground">
                                Our Educational Approach
                            </h2>
                        </div>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            We provide an engaging environment where every child thrives through hands-on, experiential learning tailored to their unique style.
                        </p>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Through <span className="font-semibold text-foreground">Thematic Project-Based Learning</span>, students apply knowledge in real-world contexts—beginning with inquiry-driven exploration rather than rote memorization.
                        </p>

                        <div className="pt-3 border-t border-border/50">
                            <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                                Thematic Block Structure
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                Main lessons are taught in immersive 2-6 week blocks during morning hours, enabling deep exploration through intellectual, artistic, and practical activities that engage head, heart, and hands.
                            </p>
                        </div>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">Core subjects</span>—English, Bahasa Indonesia, Mathematics, Science, and Social Studies—are interconnected within each theme for comprehensive understanding.
                        </p>
                    </div>
                    <div className="glass__refract" />
                    <div className="glass__refract--soft" />
                    <div className="glass__noise" />
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
                    <FeatureCard
                        icon={Users}
                        title="Child-Centered"
                        desc="Personalized learning honoring each student's unique pace"
                        delay={0}
                    />
                    <FeatureCard
                        icon={Target}
                        title="Inquiry-Based"
                        desc="Students drive learning through exploration and discovery"
                        delay={0.08}
                    />
                    <FeatureCard
                        icon={Sparkles}
                        title="Holistic Growth"
                        desc="Balanced development across all domains"
                        delay={0.16}
                    />
                </div>

                {/* Subjects */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-8 md:mb-10"
                >
                    <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-emerald/10 mb-3">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                        Subjects Taught
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                        Comprehensive curriculum for well-rounded development
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-20"
                >
                    {SUBJECTS.map((subject) => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </motion.div>

                {/* Programs */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-8 md:mb-10"
                >
                    <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/10 mb-3">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                        Niche Programs
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                        Specialized enrichment cultivating unique talents
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
                >
                    {PROGRAMS.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default memo(ElemenPage);