import React, { memo, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

const COLOR_MAP = {
    primary: 'hsl(var(--primary))',
    gold: 'hsl(var(--gold))',
    emerald: 'hsl(var(--emerald))'
};

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

export default GalleryCard;