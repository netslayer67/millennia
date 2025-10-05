import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const BlogHero = memo(() => {
    const reduce = useReducedMotion();

    return (
        <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16">
            <div className="max-w-5xl mx-auto text-center space-y-5 md:space-y-7">
                <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: 10 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Insights & Perspectives</span>
                </motion.div>

                <motion.h1
                    initial={reduce ? undefined : { opacity: 0, y: 15 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-4"
                >
                    Stories That Matter
                </motion.h1>

                <motion.p
                    initial={reduce ? undefined : { opacity: 0, y: 15 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
                >
                    Expert perspectives on education, parenting, and child development.
                </motion.p>
            </div>
        </section>
    );
});

BlogHero.displayName = "BlogHero";

export default BlogHero;