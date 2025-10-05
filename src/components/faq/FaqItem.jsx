import { memo, useRef, useEffect, useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";

const FaqItem = memo(({
    item,
    isOpen,
    onToggle,
    isMobile,
    reducedMotion,
    index
}) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    // Calculate content height for smooth animation
    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(isOpen ? height : 0);
        }
    }, [isOpen]);

    // Memoized styles for performance
    const containerStyles = useMemo(() => ({
        border: isOpen ? "1px solid hsl(var(--primary) / 0.28)" : "1px solid hsl(var(--border) / 0.40)",
        background: isOpen
            ? "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--gold) / 0.06))"
            : "hsl(var(--background))",
        transition: reducedMotion ? 'none' : (isMobile ? 'all 250ms ease' : 'all 350ms ease'),
    }), [isOpen, isMobile, reducedMotion]);

    const iconStyles = useMemo(() => ({
        background: isOpen ? "hsl(var(--primary) / 0.12)" : "hsl(var(--muted) / 0.4)",
        border: isOpen ? "1px solid hsl(var(--primary) / 0.2)" : "1px solid transparent",
        color: isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        transition: reducedMotion ? 'none' : (isMobile ? 'all 250ms ease' : 'all 350ms ease'),
    }), [isOpen, isMobile, reducedMotion]);

    const toggleStyles = useMemo(() => ({
        transform: isOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)',
        transition: reducedMotion ? 'none' : (isMobile ? 'transform 250ms ease' : 'transform 350ms cubic-bezier(0.2, 0.9, 0.1, 1)'),
    }), [isOpen, isMobile, reducedMotion]);

    const contentStyles = useMemo(() => ({
        height: `${contentHeight}px`,
        opacity: isOpen ? 1 : 0,
        transition: reducedMotion
            ? 'none'
            : (isMobile
                ? 'height 300ms cubic-bezier(0.2, 0.9, 0.1, 1), opacity 250ms ease'
                : 'height 400ms cubic-bezier(0.2, 0.9, 0.1, 1), opacity 350ms ease'),
    }), [contentHeight, isOpen, isMobile, reducedMotion]);

    // Format answer with bullet points and emphasis
    const formatAnswer = (answer) => {
        return answer.split('\n').map((line, i) => {
            if (line.trim().startsWith('•') || line.trim().startsWith('✨') || line.trim().startsWith('🌍') || line.trim().startsWith('🤝') || line.trim().startsWith('🎯') || line.trim().startsWith('🔄') || line.trim().startsWith('🚀')) {
                return (
                    <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm leading-relaxed">{line.replace(/^•\s*/, '')}</span>
                    </div>
                );
            }
            return line ? (
                <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0">{line}</p>
            ) : <br key={i} />;
        });
    };

    return (
        <article
            className="glass relative overflow-hidden rounded-xl sm:rounded-2xl group hover:shadow-lg transition-shadow duration-300"
            style={containerStyles}
        >
            {/* Glass noise effect */}
            {!isMobile && <div className="glass__noise absolute inset-0 pointer-events-none" />}

            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={onToggle}
                className="w-full flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl transition-all duration-200 hover:bg-muted/20"
            >
                {/* Icon badge with animation */}
                <div
                    className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={iconStyles}
                >
                    <span className="text-lg sm:text-xl">{item.icon === "HelpCircle" ? "❓" : item.icon === "Target" ? "🎯" : item.icon === "Lightbulb" ? "💡" : item.icon === "BookOpen" ? "📚" : item.icon === "MessageCircle" ? "💬" : item.icon === "DollarSign" ? "💰" : item.icon === "GraduationCap" ? "🎓" : item.icon === "Building" ? "🏫" : item.icon === "Users" ? "👥" : item.icon === "Award" ? "🏆" : "❤️"}</span>
                </div>

                {/* Question text */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="text-base sm:text-lg lg:text-xl font-bold leading-snug mb-1"
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        {item.question}
                    </h3>

                    {/* Category badge */}
                    <span
                        className="inline-block text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                            background: item.featured ? "hsl(var(--primary) / 0.1)" : "hsl(var(--muted) / 0.5)",
                            color: item.featured ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
                        }}
                    >
                        {item.category}
                        {item.featured && " ⭐"}
                    </span>
                </div>

                {/* Toggle indicator */}
                <div
                    className="flex-shrink-0 ml-2 transition-all duration-300"
                    style={toggleStyles}
                    aria-hidden="true"
                >
                    {isOpen ? (
                        <Minus className="h-5 w-5 text-primary" />
                    ) : (
                        <Plus className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
            </button>

            {/* Answer content with smooth animation */}
            <div
                ref={contentRef}
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                className="overflow-hidden"
                style={contentStyles}
            >
                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                    <div className="pt-2 border-t border-border/30">
                        {formatAnswer(item.answer)}
                    </div>
                </div>
            </div>
        </article>
    );
});

FaqItem.displayName = "FaqItem";

export default FaqItem;