import React, { memo } from "react";
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
    Code,
    Leaf,
    Trophy
} from "lucide-react";

// Subjects data with accent colors
const SUBJECTS = [
    { id: 1, label: "English & Bahasa Indonesia", icon: BookOpen, accent: "primary" },
    { id: 2, label: "Mathematics", icon: Target, accent: "gold" },
    { id: 3, label: "Science", icon: Activity, accent: "emerald" },
    { id: 4, label: "Social Studies", icon: Globe, accent: "primary" },
    { id: 5, label: "Religion & Character", icon: HeartHandshake, accent: "gold" },
    { id: 6, label: "Physical Education", icon: Trophy, accent: "emerald" },
    { id: 7, label: "Art & Music", icon: Music2, accent: "primary" },
    { id: 8, label: "Foreign Language", icon: Globe, accent: "gold" },
    { id: 9, label: "Coding & MakerSpace", icon: Code, accent: "emerald" }
];

// Niche programs
const PROGRAMS = [
    {
        id: 1,
        title: "Project-Based Learning",
        desc: "Real-world applications",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
        icon: Lightbulb,
        accent: "primary"
    },
    {
        id: 2,
        title: "Sustainable Living",
        desc: "Environmental awareness",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
        icon: Leaf,
        accent: "emerald"
    },
    {
        id: 3,
        title: "Creative Arts",
        desc: "Artistic expression",
        img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
        icon: Music2,
        accent: "gold"
    },
    {
        id: 4,
        title: "Technology & Coding",
        desc: "Digital innovation",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
        icon: Code,
        accent: "primary"
    },
    {
        id: 5,
        title: "Leadership Development",
        desc: "Character building",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        icon: Users,
        accent: "emerald"
    },
    {
        id: 6,
        title: "Specialized Clubs",
        desc: "Talent cultivation",
        img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80",
        icon: Trophy,
        accent: "gold"
    }
];

// Optimized SubjectCard with token colors
const SubjectCard = memo(({ subject }) => {
    const accentClasses = {
        primary: "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
        gold: "group-hover:bg-gold group-hover:text-gold-foreground group-hover:border-gold",
        emerald: "group-hover:bg-emerald group-hover:text-emerald-foreground group-hover:border-emerald"
    };

    return (
        <div className="glass group cursor-pointer transition-all duration-300">
            <div className="relative p-3 md:p-4 lg:p-5">
                <div className="flex items-center gap-2.5 md:gap-3">
                    <div className={`
                        flex-shrink-0 p-2 md:p-2.5 rounded-lg
                        bg-muted/40 text-muted-foreground border border-border/30
                        transition-all duration-300
                        ${accentClasses[subject.accent]}
                    `}>
                        <subject.icon className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-semibold text-xs md:text-sm lg:text-base text-foreground transition-colors duration-300">
                        {subject.label}
                    </h3>
                </div>
                <div className="glass__noise" />
            </div>
        </div>
    );
});

SubjectCard.displayName = "SubjectCard";

// Optimized FeatureCard with better contrast
const FeatureCard = memo(({ icon: Icon, title, desc, accent = "primary" }) => {
    const iconBgClasses = {
        primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
        gold: "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-gold-foreground",
        emerald: "bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-emerald-foreground"
    };

    return (
        <div className="glass p-3 md:p-4 lg:p-5 group transition-all duration-300 hover:shadow-glass-md">
            <div className="flex items-start gap-2.5 md:gap-3">
                <div className={`
                    flex-shrink-0 p-2 md:p-2.5 rounded-lg 
                    transition-all duration-300 border border-border/20
                    ${iconBgClasses[accent]}
                `}>
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs md:text-sm lg:text-base text-foreground mb-1 md:mb-1.5">
                        {title}
                    </h3>
                    <p className="text-[10px] md:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
            <div className="glass__noise" />
        </div>
    );
});

FeatureCard.displayName = "FeatureCard";

// Premium ProgramCard with sophisticated gradients
const ProgramCard = memo(({ program }) => {
    const overlayClasses = {
        primary: "from-primary/40 via-primary/20 to-background/60",
        gold: "from-gold/40 via-gold/20 to-background/60",
        emerald: "from-emerald/40 via-emerald/20 to-background/60"
    };

    const iconClasses = {
        primary: "bg-primary text-primary-foreground border-primary/30",
        gold: "bg-gold text-gold-foreground border-gold/30",
        emerald: "bg-emerald text-emerald-foreground border-emerald/30"
    };

    return (
        <div className="glass glass--deep group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-glass-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={program.img}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />
                <div className={`
                    absolute inset-0 bg-gradient-to-t 
                    ${overlayClasses[program.accent]} 
                    opacity-80 group-hover:opacity-90 transition-opacity duration-300
                `} />

                <div className="absolute inset-0 p-2.5 md:p-3 lg:p-4 flex flex-col justify-end">
                    <div className={`
                        inline-flex items-center justify-center 
                        w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 
                        rounded-lg border mb-1.5 md:mb-2
                        transition-all duration-300
                        ${iconClasses[program.accent]}
                    `}>
                        <program.icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-xs md:text-sm lg:text-base text-card mb-0.5">
                        {program.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-card/85">
                        {program.desc}
                    </p>
                </div>
                <div className="glass__noise opacity-20" />
            </div>
        </div>
    );
});

ProgramCard.displayName = "ProgramCard";

// Main Component
const JuniorPage = memo(() => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-surface to-background">

            {/* Decorative Blobs - Token Colors */}
            <div
                className="absolute -top-40 -left-40 w-80 h-80 md:w-96 md:h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatLeft 14s ease-in-out infinite' }}
                aria-hidden="true"
            />
            <div
                className="absolute top-1/4 -right-48 w-[28rem] h-[28rem] rounded-full bg-emerald/6 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatRight 12s ease-in-out infinite' }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gold/7 blur-3xl pointer-events-none"
                style={{ animation: 'blobFloatLeft 16s ease-in-out infinite' }}
                aria-hidden="true"
            />

            <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-16">

                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12 lg:mb-14">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary/10 border border-primary/20 mb-3 md:mb-4">
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-2 md:mb-3">
                        Junior High Program
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                        Excellence through inquiry-driven, project-based learning
                    </p>
                </div>

                {/* Philosophy Glass Card */}
                <div className="glass glass--frosted glass--deep p-4 md:p-6 lg:p-8 mb-10 md:mb-14 lg:mb-16 transition-all duration-300 hover:shadow-glass-lg">
                    <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 lg:space-y-5">

                        {/* Header */}
                        <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                            <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-primary" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground">
                                Project-Based Learning Excellence
                            </h2>
                        </div>

                        {/* Core Philosophy */}
                        <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                            Students apply knowledge through tangible projects and performances—not just recall.
                            <span className="text-foreground font-semibold"> PBL is comprehensive</span>, assessing how students use academic content in new contexts.
                        </p>

                        {/* Process Flow */}
                        <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/40">
                            <h3 className="text-xs md:text-sm lg:text-base font-semibold text-foreground mb-2">
                                Thematic Block Structure
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                <span className="text-gold font-semibold">2-6 week immersive blocks</span> enable deep exploration during morning hours.
                                Each theme integrates <span className="text-emerald font-semibold">English, Bahasa, Math, Science & Social Studies</span>,
                                engaging <span className="text-primary font-semibold">head, heart & hands</span>.
                            </p>
                        </div>

                        {/* Additional Programs */}
                        <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                            Beyond core subjects, students develop through <span className="text-foreground font-semibold">Religion, PPKN, Foreign Language, Coding, MakerSpace, Sustainable Living, Arts & PE</span>.
                            Specialized clubs encourage mastery in areas of strength.
                        </p>
                    </div>
                    <div className="glass__refract" />
                    <div className="glass__refract--soft" />
                    <div className="glass__noise" />
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3 lg:gap-4 mb-10 md:mb-14 lg:mb-16">
                    <FeatureCard
                        icon={Target}
                        title="Inquiry-Driven"
                        desc="Learning begins with questions, ends with expert presentations"
                        accent="primary"
                    />
                    <FeatureCard
                        icon={Sparkles}
                        title="Holistic Integration"
                        desc="Intellectual, artistic & practical activities in harmony"
                        accent="gold"
                    />
                    <FeatureCard
                        icon={Users}
                        title="Real-World Application"
                        desc="Rigorous process from inquiry to performance"
                        accent="emerald"
                    />
                </div>

                {/* Subjects Section */}
                <div className="text-center mb-6 md:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-emerald/10 border border-emerald/20 mb-2 md:mb-3">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1.5 md:mb-2">
                        Comprehensive Curriculum
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-xl mx-auto px-4">
                        Grade-level competencies across diverse disciplines
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 lg:gap-3 mb-12 md:mb-16 lg:mb-20">
                    {SUBJECTS.map((subject) => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </div>

                {/* Niche Programs */}
                <div className="text-center mb-6 md:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gold/10 border border-gold/20 mb-2 md:mb-3">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1.5 md:mb-2">
                        Specialized Programs
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-xl mx-auto px-4">
                        Cultivating excellence through targeted enrichment
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2.5 lg:gap-3">
                    {PROGRAMS.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>

            </div>
        </section>
    );
});

JuniorPage.displayName = "JuniorPage";

export default JuniorPage;