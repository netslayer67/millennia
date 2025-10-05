import React, { memo, useState, useRef, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        style={{
                            transitionProperty: 'max-height, opacity',
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <div className="pl-0 md:pl-15 pt-2 border-t border-[hsl(var(--border))] mt-2">
                            <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                {item.full}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

AspectCard.displayName = "AspectCard";

export default AspectCard;