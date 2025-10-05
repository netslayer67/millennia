import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const BlogArticleCard = memo(({ article, index }) => {
    const reduce = useReducedMotion();

    return (
        <motion.article
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="glass rounded-xl overflow-hidden cursor-pointer group hover-lift h-full flex flex-col"
        >
            <div className="relative h-52 md:h-56 overflow-hidden flex-shrink-0">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />

                <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/90 backdrop-blur-sm border border-gold/30 text-xs font-semibold text-gold-foreground">
                        {article.category}
                    </span>
                </div>
            </div>

            <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {article.date}
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {article.readTime}
                        </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
            </div>
        </motion.article>
    );
});

BlogArticleCard.displayName = "BlogArticleCard";

export default BlogArticleCard;