import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

const BlogFeaturedArticle = memo(({ article }) => {
    const reduce = useReducedMotion();

    return (
        <motion.article
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl overflow-hidden cursor-pointer group hover-lift"
        >
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
                <div className="relative h-72 md:h-96 lg:h-full overflow-hidden order-2 lg:order-1">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card/95 via-card/60 to-transparent" />

                    <div className="absolute bottom-4 left-4 lg:hidden">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
                            Featured Story
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center space-y-5 order-1 lg:order-2">
                    <div className="hidden lg:inline-flex items-center gap-2 text-sm text-primary font-semibold w-fit">
                        <BookOpen className="w-4 h-4" />
                        Featured Story
                    </div>

                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-xs font-semibold text-emerald mb-4">
                            {article.category}
                        </span>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
                            {article.title}
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {article.excerpt}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border/40">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {article.readTime}
                        </span>
                    </div>

                    <button className="inline-flex items-center gap-2 text-base font-semibold text-primary group-hover:gap-3 transition-all duration-300 w-fit">
                        Read Full Article <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
});

BlogFeaturedArticle.displayName = "BlogFeaturedArticle";

export default BlogFeaturedArticle;