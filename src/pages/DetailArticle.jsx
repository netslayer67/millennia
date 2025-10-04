import { memo, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, User, Clock, Eye, ArrowLeft, TrendingUp } from "lucide-react"

const ARTICLE = {
    id: "10-gifts-every-parent",
    title: "10 Gifts That Every Parent Should Give to Their Children",
    category: "Parenting & Education",
    date: "March 19, 2025",
    author: "Mahrukh Bashir",
    readTime: "8 min",
    views: "2.4K",
    hero: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=60&auto=format&fit=crop",
    excerpt: "Parenting advice bombards us from every corner—apps like TikTok, Reels, blogs, well-meaning friends. But the real treasures for your child aren't shiny toys or endless schedules.",
    content: [
        {
            type: "lead",
            text: "As educators, we see how simple, intentional gifts shape resilient kids. Below are ten that matter — practical, spiritual, and quietly powerful.",
        },
        { type: "h3", text: "1. The Gift of Spirituality: Building a Bridge to God" },
        {
            type: "p",
            text: "There's a holy call beyond the noise—a chance to help children create a connection with God that fills their soul. Bow in salah, whisper a du'a, sing His praise, or gaze at the stars in wonder—these acts draw them near to the Divine.",
        },
        { type: "h3", text: "2. The Gift of Boredom: Where Genius Whispers" },
        {
            type: "p",
            text: "We dread the I'm bored whine, but oh, what a gift it is. In those empty moments, kids turn sticks into wands or cardboard into castles. Their brains light up, weaving neural pathways that spark creativity.",
        },
        { type: "h3", text: "3. The Power of Limits: Love in a 'No'" },
        {
            type: "p",
            text: "That pout when you say no to more screen time? It stings, but it's gold. Kids bloom inside boundaries—they push, sure, but they secretly need that steady edge.",
        },
        {
            type: "conclusion",
            text: "These gifts are not flashy. They won't trend, but they last. Give space, give patience, give boundaries — and watch small humans grow.",
        },
    ],
    related: [
        {
            id: "compassion-2023",
            title: "Compassion In Action 2023",
            date: "March 19, 2025",
            image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=60",
        },
        {
            id: "raising-readers",
            title: "Raising Readers: Simple Rituals",
            date: "Feb 10, 2025",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=60",
        },
        {
            id: "outdoor-learning",
            title: "Outdoor Learning: Mud > Screen",
            date: "Jan 7, 2025",
            image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=60",
        },
    ],
}

const ArticleHero = memo(({ article }) => {
    const reduce = useReducedMotion()

    return (
        <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.1, 1] }}
            className="relative overflow-hidden rounded-xl lg:rounded-2xl glass"
        >
            <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <img
                    src={article.hero}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
                    <motion.div
                        initial={reduce ? undefined : { opacity: 0, y: 20 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-4xl space-y-4 md:space-y-5"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-semibold text-primary">
                            {article.category}
                        </span>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" /> {article.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {article.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {article.readTime}
                            </span>
                            <span className="hidden sm:flex items-center gap-2">
                                <Eye className="w-4 h-4" /> {article.views} views
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
})
ArticleHero.displayName = "ArticleHero"

const ArticleContent = memo(({ content }) => {
    const reduce = useReducedMotion()

    return (
        <div className="space-y-6 md:space-y-8">
            {content.map((block, idx) => {
                if (block.type === "lead") {
                    return (
                        <motion.p
                            key={idx}
                            initial={reduce ? undefined : { opacity: 0, y: 10 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed font-light"
                        >
                            {block.text}
                        </motion.p>
                    )
                }
                if (block.type === "h3") {
                    return (
                        <motion.h3
                            key={idx}
                            initial={reduce ? undefined : { opacity: 0 }}
                            animate={reduce ? undefined : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mt-10 mb-4"
                        >
                            {block.text}
                        </motion.h3>
                    )
                }
                if (block.type === "p") {
                    return (
                        <motion.p
                            key={idx}
                            initial={reduce ? undefined : { opacity: 0 }}
                            animate={reduce ? undefined : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
                        >
                            {block.text}
                        </motion.p>
                    )
                }
                if (block.type === "conclusion") {
                    return (
                        <motion.div
                            key={idx}
                            initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="glass p-6 md:p-8 lg:p-10 rounded-xl mt-10 border-l-4 border-primary"
                        >
                            <div className="flex items-start gap-4">
                                <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div className="space-y-3">
                                    <h4 className="text-lg md:text-xl font-bold text-foreground">Key Takeaway</h4>
                                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                                        {block.text}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
                return null
            })}
        </div>
    )
})
ArticleContent.displayName = "ArticleContent"

const RelatedCard = memo(({ item }) => {
    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-xl overflow-hidden cursor-pointer group"
        >
            <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/95 to-transparent" />
            </div>
            <div className="p-4 md:p-5">
                <h4 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
                    {item.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                </p>
            </div>
        </motion.article>
    )
})
RelatedCard.displayName = "RelatedCard"

const CTASidebar = memo(() => {
    return (
        <aside className="space-y-5">
            <div className="glass p-5 md:p-6 rounded-xl sticky top-6">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-4">Discover Millennia</h3>
                <div className="space-y-3">
                    <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-sm md:text-base">
                        Apply Now
                    </button>
                    <button className="w-full py-3 rounded-lg bg-emerald/10 text-emerald font-semibold hover:bg-emerald/20 border border-emerald/20 hover:border-emerald/30 transition-all duration-300 text-sm md:text-base">
                        Schedule Visit
                    </button>
                    <button className="w-full py-3 rounded-lg bg-gold/10 text-gold-foreground font-semibold hover:bg-gold/20 border border-gold/20 hover:border-gold/30 transition-all duration-300 text-sm md:text-base">
                        Download Brochure
                    </button>
                </div>
            </div>
        </aside>
    )
})
CTASidebar.displayName = "CTASidebar"

const DetailArticle = () => {
    const reduce = useReducedMotion()
    const article = useMemo(() => ARTICLE, [])

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-background via-surface to-background">
            {/* Decorative blobs */}
            <div
                className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-primary/5 rounded-full blur-3xl animate-blob-left pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute top-60 right-0 w-64 md:w-80 h-64 md:h-80 bg-emerald/5 rounded-full blur-3xl animate-blob-right pointer-events-none"
                aria-hidden
            />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02] pointer-events-none"
                aria-hidden
            />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
                {/* Back button */}
                <motion.button
                    initial={reduce ? undefined : { opacity: 0, x: -10 }}
                    animate={reduce ? undefined : { opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 mb-6 md:mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Articles
                </motion.button>

                {/* Hero */}
                <ArticleHero article={article} />

                {/* Main content grid */}
                <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
                    {/* Article content */}
                    <article className="space-y-10 md:space-y-14">
                        <ArticleContent content={article.content} />

                        {/* Related articles */}
                        <section className="pt-10 md:pt-14 border-t border-border/40">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8">
                                Continue Reading
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                {article.related.map((item) => (
                                    <RelatedCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    </article>

                    {/* Sidebar CTA */}
                    <div className="hidden lg:block">
                        <CTASidebar />
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="lg:hidden mt-10">
                    <CTASidebar />
                </div>
            </div>
        </main>
    )
}

export default memo(DetailArticle)