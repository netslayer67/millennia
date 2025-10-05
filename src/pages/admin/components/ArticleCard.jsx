import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Edit3, Trash2, Eye, Sparkles, Calendar, Clock, CheckSquare, Square } from 'lucide-react';

const ArticleCard = memo(({ article, onEdit, onDelete, onView, onSelect, isSelected, isMobile }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass glass--deep hover-lift group cursor-pointer transition-all duration-300"
        >
            <div className="glass__noise" />
            <div className="glass__refract" />

            <div className="relative p-4 md:p-6">
                {/* Selection checkbox */}
                <div className="absolute top-3 left-3 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(article.id, !isSelected);
                        }}
                        className={`p-2 rounded-lg glass border transition-all duration-300 ${isSelected
                                ? 'border-primary bg-primary/20 text-primary'
                                : 'border-border/40 hover:border-primary bg-background/80'
                            }`}
                        aria-label={isSelected ? 'Deselect article' : 'Select article'}
                    >
                        {isSelected ? (
                            <CheckSquare className="w-4 h-4" />
                        ) : (
                            <Square className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* Featured badge */}
                {article.featured && (
                    <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gold/90 backdrop-blur-sm text-xs font-semibold text-gold-foreground border border-gold/30">
                            <Sparkles className="w-3 h-3" />
                            Featured
                        </span>
                    </div>
                )}

                {/* Image */}
                <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
                            {article.title}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${article.status === 'published' ? 'bg-emerald/10 text-emerald border border-emerald/20' :
                            article.status === 'draft' ? 'bg-gold/10 text-gold border border-gold/20' :
                                'bg-muted text-muted-foreground border border-border'
                            }`}>
                            {article.status}
                        </span>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                            </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                            {article.category}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                        <button
                            onClick={() => onView(article)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                        >
                            <Eye className="w-3 h-3" />
                            {isMobile ? '' : 'View'}
                        </button>
                        <button
                            onClick={() => onEdit(article)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-all duration-300"
                        >
                            <Edit3 className="w-3 h-3" />
                            {isMobile ? '' : 'Edit'}
                        </button>
                        <button
                            onClick={() => onDelete(article.id)}
                            className="px-3 py-2 rounded-lg text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all duration-300"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;