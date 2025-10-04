import React, { memo } from "react";
import {
    BookOpen,
    Target,
    Lightbulb,
    Users,
    Award,
    Leaf,
    Globe,
    Sparkles,
    CheckCircle2,
    TrendingUp,
    Zap,
    Heart
} from "lucide-react";

// Framework Integration highlights
const FRAMEWORKS = [
    { id: 1, label: "Finnish Waldorf", icon: Sparkles, accent: "primary", desc: "Creative pedagogy" },
    { id: 2, label: "National Curriculum", icon: BookOpen, accent: "emerald", desc: "Indonesian standards" },
    { id: 3, label: "Multiple Intelligences", icon: Lightbulb, accent: "gold", desc: "Personalized approach" }
];

// Assessment Principles
const ASSESSMENT_KEYS = [
    { id: 1, title: "Formative Focus", desc: "Learning process over test scores", icon: TrendingUp, accent: "primary" },
    { id: 2, title: "Self-Awareness", desc: "Students recognize strengths & growth areas", icon: Target, accent: "emerald" },
    { id: 3, title: "Love of Learning", desc: "Assessment drives curiosity, not fear", icon: Heart, accent: "gold" }
];

// PBL Core Elements (BIE Gold Standard)
const PBL_ELEMENTS = [
    { id: 1, label: "Critical Thinking", icon: Lightbulb, accent: "primary" },
    { id: 2, label: "Communication", icon: Users, accent: "gold" },
    { id: 3, label: "Collaboration", icon: Users, accent: "emerald" },
    { id: 4, label: "Creativity", icon: Sparkles, accent: "primary" },
    { id: 5, label: "Authenticity", icon: CheckCircle2, accent: "gold" },
    { id: 6, label: "Student Voice", icon: Zap, accent: "emerald" }
];

// Sustainable Living Pillars
const SUSTAINABILITY = [
    {
        id: 1,
        title: "Environmental Awareness",
        desc: "Understanding our footprint & global impact",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
        icon: Globe,
        accent: "emerald"
    },
    {
        id: 2,
        title: "SDG Integration",
        desc: "Contributing to global sustainable goals",
        img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
        icon: Target,
        accent: "primary"
    },
    {
        id: 3,
        title: "Practical Skills",
        desc: "Farming, cooking & hands-on learning",
        img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
        icon: Leaf,
        accent: "gold"
    }
];

// Optimized FrameworkBadge
const FrameworkBadge = memo(({ framework }) => {
    const accentClasses = {
        primary: "border-primary/30 bg-primary/5 group-hover:bg-primary/10",
        gold: "border-gold/30 bg-gold/5 group-hover:bg-gold/10",
        emerald: "border-emerald/30 bg-emerald/5 group-hover:bg-emerald/10"
    };

    const iconClasses = {
        primary: "text-primary",
        gold: "text-gold",
        emerald: "text-emerald"
    };

    return (
        <div className={`group glass p-3 md:p-4 border ${accentClasses[framework.accent]} transition-all duration-300`}>
            <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-2 md:p-2.5 rounded-lg bg-muted/30 ${iconClasses[framework.accent]}`}>
                    <framework.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                </div>
                <div>
                    <h3 className="font-bold text-xs md:text-sm text-foreground mb-0.5">
                        {framework.label}
                    </h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                        {framework.desc}
                    </p>
                </div>
            </div>
            <div className="glass__noise" />
        </div>
    );
});

FrameworkBadge.displayName = "FrameworkBadge";

// Optimized PillarCard
const PillarCard = memo(({ icon: Icon, title, desc, accent = "primary" }) => {
    const borderClasses = {
        primary: "border-primary/20 group-hover:border-primary/40",
        gold: "border-gold/20 group-hover:border-gold/40",
        emerald: "border-emerald/20 group-hover:border-emerald/40"
    };

    const iconBgClasses = {
        primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
        gold: "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-gold-foreground",
        emerald: "bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-emerald-foreground"
    };

    return (
        <div className={`glass glass--frosted p-4 md:p-5 lg:p-6 group border ${borderClasses[accent]} transition-all duration-300 hover:shadow-glass-md`}>
            <div className="flex items-start gap-3 md:gap-3.5">
                <div className={`flex-shrink-0 p-2.5 md:p-3 rounded-lg transition-all duration-300 border border-border/20 ${iconBgClasses[accent]}`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base lg:text-lg text-foreground mb-1.5 md:mb-2">
                        {title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
            <div className="glass__noise" />
        </div>
    );
});

PillarCard.displayName = "PillarCard";

// Optimized ElementBadge (for PBL elements)
const ElementBadge = memo(({ element }) => {
    const accentClasses = {
        primary: "bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground",
        gold: "bg-gold/10 text-gold border-gold/30 hover:bg-gold hover:text-gold-foreground",
        emerald: "bg-emerald/10 text-emerald border-emerald/30 hover:bg-emerald hover:text-emerald-foreground"
    };

    return (
        <div className={`glass p-2.5 md:p-3 border transition-all duration-300 cursor-pointer ${accentClasses[element.accent]}`}>
            <div className="flex items-center gap-2 md:gap-2.5">
                <element.icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-xs md:text-sm">
                    {element.label}
                </span>
            </div>
        </div>
    );
});

ElementBadge.displayName = "ElementBadge";

// Optimized SustainabilityCard
const SustainabilityCard = memo(({ item }) => {
    const overlayClasses = {
        primary: "from-primary/35 via-primary/15 to-background/70",
        gold: "from-gold/35 via-gold/15 to-background/70",
        emerald: "from-emerald/35 via-emerald/15 to-background/70"
    };

    const iconClasses = {
        primary: "bg-primary text-primary-foreground border-primary/30",
        gold: "bg-gold text-gold-foreground border-gold/30",
        emerald: "bg-emerald text-emerald-foreground border-emerald/30"
    };

    return (
        <div className="glass glass--deep group overflow-hidden transition-all duration-300 hover:shadow-glass-lg">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${overlayClasses[item.accent]} opacity-85`} />

                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                    <div className={`inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border mb-2 transition-all duration-300 ${iconClasses[item.accent]}`}>
                        <item.icon className="w-4 h-4 md:w-4.5 md:h-4.5" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-card mb-1">
                        {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-card/90">
                        {item.desc}
                    </p>
                </div>
                <div className="glass__noise opacity-15" />
            </div>
        </div>
    );
});

SustainabilityCard.displayName = "SustainabilityCard";

// Main Component
const CurriculumPage = memo(() => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-surface to-background">

            {/* Decorative Blobs */}
            <div
                className="absolute -top-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/7 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatLeft 15s ease-in-out infinite' }}
                aria-hidden="true"
            />
            <div
                className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-gold/6 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatRight 13s ease-in-out infinite' }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-emerald/6 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatLeft 17s ease-in-out infinite' }}
                aria-hidden="true"
            />

            <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">

                {/* Hero */}
                <div className="text-center mb-8 md:mb-12 lg:mb-14">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary/10 border border-primary/20 mb-3 md:mb-4">
                        <Award className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-2 md:mb-3">
                        Curriculum & Framework
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                        Where world-class pedagogy meets Indonesian excellence
                    </p>
                </div>

                {/* Framework Overview */}
                <div className="glass glass--frosted glass--deep p-4 md:p-6 lg:p-8 mb-10 md:mb-14 transition-all duration-300 hover:shadow-glass-lg">
                    <div className="max-w-4xl mx-auto space-y-4 md:space-y-5">
                        <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                            <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground">
                                Integrated Learning Framework
                            </h2>
                        </div>

                        <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                            Our curriculum enriches creative minds through <span className="text-primary font-semibold">Finnish Waldorf Framework</span> seamlessly integrated with <span className="text-emerald font-semibold">Indonesian National Standards</span>.
                            Subjects interconnect to provide nuance, context, and deeper understanding.
                        </p>

                        <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                            We honor <span className="text-gold font-semibold">multiple intelligences</span> and diverse talents—from alphabets to Algebra, everything is taught with depth and real-world relevancy.
                            Learning becomes an <span className="text-foreground font-semibold">adventure, not a chore</span>.
                        </p>
                    </div>
                    <div className="glass__refract" />
                    <div className="glass__refract--soft" />
                    <div className="glass__noise" />
                </div>

                {/* Framework Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 lg:gap-4 mb-12 md:mb-16">
                    {FRAMEWORKS.map((framework) => (
                        <FrameworkBadge key={framework.id} framework={framework} />
                    ))}
                </div>

                {/* Three Pillars */}
                <div className="text-center mb-6 md:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gold/10 border border-gold/20 mb-2 md:mb-3">
                        <Target className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1.5 md:mb-2">
                        Our Educational Pillars
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                        Three interconnected approaches driving 21st century excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4 mb-10 md:mb-14">
                    <PillarCard
                        icon={TrendingUp}
                        title="Assessment"
                        desc="Formative learning that builds curiosity and self-awareness"
                        accent="primary"
                    />
                    <PillarCard
                        icon={Lightbulb}
                        title="Project-Based Learning"
                        desc="Real-world challenges developing the 4Cs of success"
                        accent="gold"
                    />
                    <PillarCard
                        icon={Leaf}
                        title="Sustainable Living"
                        desc="Environmental stewardship through hands-on practice"
                        accent="emerald"
                    />
                </div>

                {/* Assessment Deep Dive */}
                <div className="glass glass--frosted p-4 md:p-6 lg:p-7 mb-10 md:mb-14 border border-primary/10 transition-all duration-300 hover:shadow-glass-md">
                    <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                        <div className="p-2 md:p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                            Assessment Philosophy
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed mb-4 md:mb-5 italic border-l-2 border-primary/30 pl-3 md:pl-4">
                        "Assessment should deliberately improve and educate performance, not merely audit."
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3">
                        {ASSESSMENT_KEYS.map((key) => (
                            <PillarCard
                                key={key.id}
                                icon={key.icon}
                                title={key.title}
                                desc={key.desc}
                                accent={key.accent}
                            />
                        ))}
                    </div>
                    <div className="glass__noise" />
                </div>

                {/* PBL Section */}
                <div className="glass glass--frosted p-4 md:p-6 lg:p-7 mb-10 md:mb-14 border border-gold/10 transition-all duration-300 hover:shadow-glass-md">
                    <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                        <div className="p-2 md:p-2.5 rounded-lg bg-gold/10 border border-gold/20">
                            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-gold" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                            Project-Based Learning
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed mb-4 md:mb-5">
                        <span className="text-foreground font-semibold">BIE Gold Standard PBL</span> enables students to master academic content while developing <span className="text-gold font-semibold">critical thinking, communication, collaboration & creativity</span> — the 4Cs of 21st century learning.
                    </p>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-5">
                        Students engage with <span className="text-foreground font-semibold">complex real-world problems</span>, following a rigorous process from inquiry to performance.
                        Projects blend <span className="text-emerald font-semibold">responsibility with choice</span>, cognitive concepts with practical aspects in a protected yet authentic environment.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-2.5">
                        {PBL_ELEMENTS.map((element) => (
                            <ElementBadge key={element.id} element={element} />
                        ))}
                    </div>
                    <div className="glass__noise" />
                </div>

                {/* Sustainable Living */}
                <div className="text-center mb-6 md:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-emerald/10 border border-emerald/20 mb-2 md:mb-3">
                        <Leaf className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1.5 md:mb-2">
                        Sustainable Life Skills
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                        Understanding our environmental footprint and global responsibility
                    </p>
                </div>

                <div className="glass glass--frosted p-4 md:p-5 lg:p-6 mb-6 md:mb-8 border border-emerald/10">
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                        Students learn about <span className="text-emerald font-semibold">Sustainable Development Goals (SDGs)</span>, comparing their environmental impact globally.
                        They grow food, understand farming science, and develop <span className="text-gold font-semibold">culinary skills</span>—making world-changing contributions,
                        no matter how small.
                    </p>
                    <div className="glass__noise" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4">
                    {SUSTAINABILITY.map((item) => (
                        <SustainabilityCard key={item.id} item={item} />
                    ))}
                </div>

            </div>
        </section>
    );
});

CurriculumPage.displayName = "CurriculumPage";

export default CurriculumPage;