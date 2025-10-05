import { memo } from "react";
import { HelpCircle, Sparkles, BookOpen } from "lucide-react";

const FaqHeader = memo(() => {
    return (
        <header className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 bg-primary/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} aria-hidden="true" />
            <div className="absolute top-8 right-1/3 w-6 h-6 bg-gold/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} aria-hidden="true" />
            <div className="absolute -bottom-2 left-1/3 w-4 h-4 bg-emerald/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} aria-hidden="true" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 glass p-3 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <div className="relative">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-gold animate-pulse" />
                </div>
                <span className="text-sm sm:text-base font-bold text-primary">
                    Answers all of your questions
                </span>
            </div>

            {/* Main heading with gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                Frequently Asked{" "}
                <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                        Questions
                    </span>
                    <BookOpen className="absolute -top-2 -right-2 h-6 w-6 text-gold animate-pulse" />
                </span>
            </h1>

            {/* Subtitle with engaging copy */}
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                Discover everything about Millennia World School — from our innovative curriculum and world-class facilities to our commitment to nurturing tomorrow's leaders.
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <div className="glass px-4 py-2 rounded-full border border-primary/20">
                    <span className="text-sm font-semibold text-primary">11 Comprehensive Answers</span>
                </div>
                <div className="glass px-4 py-2 rounded-full border border-gold/20">
                    <span className="text-sm font-semibold text-gold">Holistic Education</span>
                </div>
                <div className="glass px-4 py-2 rounded-full border border-emerald/20">
                    <span className="text-sm font-semibold text-emerald">Future-Ready Learning</span>
                </div>
            </div>
        </header>
    );
});

FaqHeader.displayName = "FaqHeader";

export default FaqHeader;