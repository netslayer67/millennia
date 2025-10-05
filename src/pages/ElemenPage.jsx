import React, { memo } from "react";
import {
    BookOpen,
    Users,
    Target,
    Sparkles,
    GraduationCap,
    Lightbulb
} from "lucide-react";
import { SUBJECTS, PROGRAMS } from "../data/elemenData";
import SubjectCard from "./elemen/SubjectCard";
import FeatureCard from "./elemen/FeatureCard";
import ProgramCard from "./elemen/ProgramCard";

// Main Component - NO Framer Motion, NO animated blobs
const ElemenPage = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">

            {/* REMOVED: Heavy grid and dot patterns - major paint cost */}
            {/* REMOVED: Animated blobs - major GPU cost */}

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-14 lg:py-16">

                {/* Hero - Simple fade in with CSS */}
                <div className="text-center mb-10 md:mb-14 opacity-0 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 mb-4">
                        <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 md:mb-4">
                        Elementary Program
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Where curiosity meets excellence through hands-on learning
                    </p>
                </div>

                {/* Philosophy */}
                <div className="glass glass--frosted p-5 md:p-7 lg:p-8 mb-12 md:mb-16">
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
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
                    <FeatureCard
                        icon={Users}
                        title="Child-Centered"
                        desc="Personalized learning honoring each student's unique pace"
                    />
                    <FeatureCard
                        icon={Target}
                        title="Inquiry-Based"
                        desc="Students drive learning through exploration and discovery"
                    />
                    <FeatureCard
                        icon={Sparkles}
                        title="Holistic Growth"
                        desc="Balanced development across all domains"
                    />
                </div>

                {/* Subjects */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-emerald/10 mb-3">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                        Subjects Taught
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                        Comprehensive curriculum for well-rounded development
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-20">
                    {SUBJECTS.map((subject) => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </div>

                {/* Programs */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/10 mb-3">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                        Niche Programs
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                        Specialized enrichment cultivating unique talents
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {PROGRAMS.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>

            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default memo(ElemenPage);