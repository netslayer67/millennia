import { memo, useState, useMemo, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Search, Sparkles, BookOpen } from "lucide-react"

const ARTICLES = [
    {
        id: "10-gifts-every-parent",
        title: "10 Gifts That Every Parent Should Give to Their Children",
        category: "Parenting",
        date: "Mar 19, 2025",
        readTime: "8 min",
        excerpt: "Simple, intentional gifts that shape resilient, spiritually grounded children.",
        image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&q=60&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "compassion-2023",
        title: "Compassion In Action: How We Teach Empathy",
        category: "Education",
        date: "Mar 15, 2025",
        readTime: "6 min",
        excerpt: "Empathy practiced daily in our classrooms, not taught through lectures.",
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=60",
    },
    {
        id: "raising-readers",
        title: "Raising Lifelong Readers: Simple Rituals",
        category: "Literacy",
        date: "Mar 10, 2025",
        readTime: "5 min",
        excerpt: "Small daily habits that create passionate, curious readers.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=60",
    },
    {
        id: "outdoor-learning",
        title: "Outdoor Learning: Why Nature Wins",
        category: "Wellness",
        date: "Mar 5, 2025",
        readTime: "7 min",
        excerpt: "Nature as the most powerful classroom for young minds.",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=60",
    },
    {
        id: "critical-thinking",
        title: "Teaching Critical Thinking Today",
        category: "Education",
        date: "Feb 28, 2025",
        readTime: "9 min",
        excerpt: "Preparing children to think clearly in the age of information.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=60",
    },
    {
        id: "emotional-intelligence",
        title: "Emotional Intelligence: The Key Skill",
        category: "Development",
        date: "Feb 20, 2025",
        readTime: "6 min",
        excerpt: "Why EQ determines success more than IQ ever will.",
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=60",
    },
]

const CATEGORIES = ["All", "Parenting", "Education", "Literacy", "Wellness", "Development"]

const sanitizeSearch = (input) => {
    if (!input) return ""
    return input
        .replace(/[<>]/g, "")
        .replace(/https?:\/\/\S+/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 100)
}

const Hero = memo(() => {
    const reduce = useReducedMotion()

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
    )
})
Hero.displayName = "Hero"

const SearchBar = memo(({ value, onChange }) => {
    const handlePaste = useCallback((e) => {
        const text = (e.clipboardData || window.clipboardData).getData("text")
        if (/https?:\/\//i.test(text) || /<|>|javascript:/i.test(text)) {
            e.preventDefault()
        }
    }, [])

    return (
        <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                onPaste={handlePaste}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl glass border border-border/40 text-sm md:text-base text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
                maxLength={100}
            />
        </div>
    )
})
SearchBar.displayName = "SearchBar"

const CategoryFilter = memo(({ categories, active, onSelect }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${active === cat
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "glass text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:border-border/60"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
})
CategoryFilter.displayName = "CategoryFilter"

const FeaturedArticle = memo(({ article }) => {
    const reduce = useReducedMotion()

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
    )
})
FeaturedArticle.displayName = "FeaturedArticle"

const ArticleCard = memo(({ article, index }) => {
    const reduce = useReducedMotion()

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
    )
})
ArticleCard.displayName = "ArticleCard"

const CTASection = memo(() => {
    return (
        <section className="py-12 md:py-16">
            <div className="glass rounded-2xl p-8 md:p-12 text-center space-y-5 border border-primary/10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    Join Our Community
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Where every child is valued, nurtured, and prepared for excellence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm md:text-base">
                        Apply Now
                    </button>
                    <button className="w-full sm:w-auto px-7 py-3.5 rounded-lg glass text-foreground font-semibold hover:bg-muted/20 border border-border/60 hover:border-primary/30 transition-all duration-300 text-sm md:text-base">
                        Schedule Visit
                    </button>
                </div>
            </div>
        </section>
    )
})
CTASection.displayName = "CTASection"

const BlogPage = () => {
    const reduce = useReducedMotion()
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")

    const handleSearchChange = useCallback((e) => {
        const sanitized = sanitizeSearch(e.target.value)
        setSearch(sanitized)
    }, [])

    const filteredArticles = useMemo(() => {
        let filtered = ARTICLES

        if (activeCategory !== "All") {
            filtered = filtered.filter((a) => a.category === activeCategory)
        }

        if (search) {
            const query = search.toLowerCase()
            filtered = filtered.filter(
                (a) =>
                    a.title.toLowerCase().includes(query) ||
                    a.excerpt.toLowerCase().includes(query) ||
                    a.category.toLowerCase().includes(query)
            )
        }

        return filtered
    }, [search, activeCategory])

    const featuredArticle = useMemo(() => filteredArticles.find((a) => a.featured), [filteredArticles])
    const regularArticles = useMemo(() => filteredArticles.filter((a) => !a.featured), [filteredArticles])

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-background via-surface to-background">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-80 md:w-96 h-80 md:h-96 bg-primary/4 rounded-full blur-3xl animate-blob-left pointer-events-none" aria-hidden />
            <div className="absolute top-1/2 right-0 w-72 md:w-80 h-72 md:h-80 bg-emerald/4 rounded-full blur-3xl animate-blob-right pointer-events-none" aria-hidden />
            <div className="absolute bottom-1/4 left-1/3 w-64 md:w-72 h-64 md:h-72 bg-gold/4 rounded-full blur-3xl animate-blob-left pointer-events-none" aria-hidden />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none" aria-hidden />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <Hero />

                <div className="space-y-10 md:space-y-12 pb-16 md:pb-20">
                    {/* Search & Filter */}
                    <motion.div
                        initial={reduce ? undefined : { opacity: 0, y: 10 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-5"
                    >
                        <SearchBar value={search} onChange={handleSearchChange} />
                        <CategoryFilter categories={CATEGORIES} active={activeCategory} onSelect={setActiveCategory} />
                    </motion.div>

                    {/* Featured Article */}
                    {featuredArticle && (
                        <div className="mb-10 md:mb-14">
                            <FeaturedArticle article={featuredArticle} />
                        </div>
                    )}

                    {/* Regular Articles */}
                    {regularArticles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {regularArticles.map((article, idx) => (
                                <ArticleCard key={article.id} article={article} index={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass rounded-xl p-12 md:p-16 text-center">
                            <p className="text-lg text-muted-foreground">No articles match your search. Try different keywords.</p>
                        </div>
                    )}

                    {/* CTA */}
                    <CTASection />
                </div>
            </div>
        </main>
    )
}

export default memo(BlogPage)