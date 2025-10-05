import { memo, useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Blog components
import BlogHero from "@/components/blog/BlogHero";
import BlogSearchBar from "@/components/blog/BlogSearchBar";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogFeaturedArticle from "@/components/blog/BlogFeaturedArticle";
import BlogArticleCard from "@/components/blog/BlogArticleCard";
import BlogCTASection from "@/components/blog/BlogCTASection";

// Blog data
import { ARTICLES, CATEGORIES, sanitizeSearch } from "@/components/blog/blogData";

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
                <BlogHero />

                <div className="space-y-10 md:space-y-12 pb-16 md:pb-20">
                    {/* Search & Filter */}
                    <motion.div
                        initial={reduce ? undefined : { opacity: 0, y: 10 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-5"
                    >
                        <BlogSearchBar value={search} onChange={handleSearchChange} />
                        <BlogCategoryFilter categories={CATEGORIES} active={activeCategory} onSelect={setActiveCategory} />
                    </motion.div>

                    {/* Featured Article */}
                    {featuredArticle && (
                        <div className="mb-10 md:mb-14">
                            <BlogFeaturedArticle article={featuredArticle} />
                        </div>
                    )}

                    {/* Regular Articles */}
                    {regularArticles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {regularArticles.map((article, idx) => (
                                <BlogArticleCard key={article.id} article={article} index={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass rounded-xl p-12 md:p-16 text-center">
                            <p className="text-lg text-muted-foreground">No articles match your search. Try different keywords.</p>
                        </div>
                    )}

                    {/* CTA */}
                    <BlogCTASection />
                </div>
            </div>
        </main>
    )
}

export default memo(BlogPage)