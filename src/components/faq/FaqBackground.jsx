import { memo } from "react";

const FaqBackground = memo(({ isMobile }) => {
    if (isMobile) {
        return null; // Skip decorative elements on mobile for performance
    }

    return (
        <>
            {/* Primary floating blob */}
            <div
                className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none animate-blob-left"
                style={{
                    background: "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--gold)) 50%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Secondary floating blob */}
            <div
                className="absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl opacity-12 pointer-events-none animate-blob-right"
                style={{
                    background: "radial-gradient(circle, hsl(var(--emerald)) 0%, hsl(var(--primary)) 50%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Tertiary floating blob */}
            <div
                className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full blur-2xl opacity-10 pointer-events-none animate-blob-left"
                style={{
                    background: "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--emerald)) 50%, transparent 70%)",
                    animationDelay: '2s',
                }}
                aria-hidden="true"
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
            />

            {/* Subtle gradient overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--gold) / 0.08) 0%, transparent 50%)",
                }}
                aria-hidden="true"
            />
        </>
    );
});

FaqBackground.displayName = "FaqBackground";

export default FaqBackground;