"use client"

import { memo, useState, useMemo, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
    Calendar,
    User,
    Tag,
    MessageSquare,
    Share2,
    ArrowLeft,
    ArrowRight,
    Heart,
    BookmarkPlus,
    Send,
    Clock,
    Eye,
    TrendingUp,
} from "lucide-react"

const ARTICLE = {
    id: "10-gifts-every-parent",
    title: "10 Gifts That Every Parent Should Give to Their Children",
    category: "Blog",
    date: "March 19, 2025",
    author: "Mahrukh Bashir",
    readTime: "8 min read",
    views: "2.4K",
    hero: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=60&auto=format&fit=crop",
    excerpt:
        "Parenting advice bombards us from every corner—apps like TikTok, Reels, blogs, well-meaning friends. But the real treasures for your child aren't shiny toys or endless schedules.",
    content: [
        {
            type: "lead",
            text: "As educators, we see how simple, intentional gifts shape resilient kids. Below are ten that matter — practical, spiritual, and quietly powerful.",
        },
        {
            type: "h3",
            text: "1. The Gift of Spirituality: Building a Bridge to God",
        },
        {
            type: "p",
            text: "There's a holy call beyond the noise—a chance to help children create a connection with God that fills their soul. Bow in salah, whisper a du'a, sing His praise, or gaze at the stars in wonder—these acts draw them near to the Divine.",
        },
        {
            type: "h3",
            text: "2. The Gift of Boredom: Where Genius Whispers",
        },
        {
            type: "p",
            text: "We dread the I'm bored whine, but oh, what a gift it is. In those empty moments, kids turn sticks into wands or cardboard into castles. Their brains light up, weaving neural pathways that spark creativity.",
        },
        {
            type: "h3",
            text: "3. The Power of Limits: Love in a 'No'",
        },
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

const sanitizeInput = (raw) => {
    if (!raw) return ""
    const blocked = /https?:\/\/|mailto:|<|>|javascript:|\b(onerror|onload)\b/i
    if (blocked.test(raw)) {
        return raw
            .replace(/https?:\/\/\S+/gi, "")
            .replace(/<[^>]*>/g, "")
            .replace(/\s{2,}/g, " ")
            .trim()
    }
    return raw.replace(/\s{2,}/g, " ").trim()
}

const FloatingActions = memo(() => {
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
        >
            <button
                onClick={() => setLiked(!liked)}
                className={`glass w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${liked
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "hover:bg-primary/10 hover:shadow-md"
                    }`}
                aria-label="like article"
            >
                <Heart className={`w-5 h-5 transition-transform duration-300 ${liked ? "fill-current scale-110" : ""}`} />
            </button>
            <button
                onClick={() => setSaved(!saved)}
                className={`glass w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${saved
                        ? "bg-emerald text-emerald-foreground shadow-lg shadow-emerald/30"
                        : "hover:bg-emerald/10 hover:shadow-md"
                    }`}
                aria-label="save article"
            >
                <BookmarkPlus
                    className={`w-5 h-5 transition-transform duration-300 ${saved ? "fill-current scale-110" : ""}`}
                />
            </button>
            <button
                className="glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-gold/10 hover:scale-110 transition-all duration-300 hover:shadow-md"
                aria-label="share article"
            >
                <Share2 className="w-5 h-5" />
            </button>
        </motion.div>
    )
})
FloatingActions.displayName = "FloatingActions"

const ArticleHero = memo(({ article }) => {
    const reduce = useReducedMotion()

    return (
        <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.1, 1] }}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
        >
            <div className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]">
                <img
                    src={article.hero || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-14">
                    <motion.div
                        initial={reduce ? undefined : { opacity: 0, y: 30 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass backdrop-blur-xl border border-primary/30 mb-3 sm:mb-4">
                            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary">{article.category}</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 sm:gap-2">
                                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {article.author}
                            </span>
                            <span className="hidden sm:flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {article.date}
                            </span>
                            <span className="flex items-center gap-1.5 sm:gap-2">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {article.readTime}
                            </span>
                            <span className="hidden md:flex items-center gap-2">
                                <Eye className="w-4 h-4" /> {article.views}
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
                            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
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
                            className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mt-8 mb-4"
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
                            className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
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
                            className="glass p-4 sm:p-6 md:p-8 rounded-xl mt-8 border-l-4 border-primary"
                        >
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Key Takeaway</h4>
                                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{block.text}</p>
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

const CommentForm = memo(() => {
    const [value, setValue] = useState("")
    const [status, setStatus] = useState(null)

    const handleChange = useCallback(
        (e) => {
            const raw = e.target.value
            const sanitized = raw.replace(/[<>]/g, "").replace(/\s{2,}/g, " ")
            setValue(sanitized.slice(0, 800))
            if (status) setStatus(null)
        },
        [status],
    )

    const handlePaste = useCallback((e) => {
        const text = (e.clipboardData || window.clipboardData).getData("text")
        if (/https?:\/\//i.test(text) || /<|>|javascript:/i.test(text)) {
            e.preventDefault()
            setStatus("Links and HTML are not allowed")
        }
    }, [])

    const submit = useCallback(
        (e) => {
            e.preventDefault()
            const cleaned = sanitizeInput(value)
            if (!cleaned) {
                setStatus("Please write something appropriate")
                return
            }
            setValue("")
            setStatus("Comment submitted for review")
            setTimeout(() => setStatus(null), 3000)
        },
        [value],
    )

    return (
        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Join the conversation</h3>
            </div>

            <textarea
                value={value}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Share your thoughtful response..."
                className="w-full min-h-[100px] sm:min-h-[120px] rounded-xl px-3 sm:px-4 py-2 sm:py-3 bg-card/60 border border-border/40 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                maxLength={800}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{value.length}/800</span>
                    {status && (
                        <span className={`text-xs ${status.includes("submitted") ? "text-emerald" : "text-primary"}`}>
                            {status}
                        </span>
                    )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => setValue("")}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300"
                    >
                        Clear
                    </button>
                    <button
                        onClick={submit}
                        className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Post</span>
                        <span className="sm:hidden">Send</span>
                    </button>
                </div>
            </div>
        </div>
    )
})
CommentForm.displayName = "CommentForm"

const RelatedCard = memo(({ item }) => {
    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-xl overflow-hidden cursor-pointer group"
        >
            <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
            </div>
            <div className="p-3 sm:p-4">
                <h4 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {item.date}
                </p>
            </div>
        </motion.article>
    )
})
RelatedCard.displayName = "RelatedCard"

const NewsletterSidebar = memo(() => {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 3000)
    }, [])

    return (
        <aside className="space-y-4 sm:space-y-6">
            <div className="glass p-4 sm:p-6 rounded-xl sticky top-6">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                    <button className="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-sm sm:text-base">
                        Apply Now
                    </button>
                    <button className="w-full py-2.5 sm:py-3 rounded-lg bg-emerald/10 text-emerald font-semibold hover:bg-emerald/20 hover:shadow-md transition-all duration-300 text-sm sm:text-base">
                        Schedule Visit
                    </button>
                    <button className="w-full py-2.5 sm:py-3 rounded-lg bg-gold/10 text-gold font-semibold hover:bg-gold/20 hover:shadow-md transition-all duration-300 text-sm sm:text-base">
                        Download Brochure
                    </button>
                </div>
            </div>

            <div className="glass p-4 sm:p-6 rounded-xl hidden lg:block">
                <h3 className="text-lg font-bold text-foreground mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">Weekly insights for parents & educators</p>
                <div className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onPaste={(e) => {
                            const text = (e.clipboardData || window.clipboardData).getData("text")
                            if (/https?:\/\//i.test(text) || /<|>/i.test(text)) e.preventDefault()
                        }}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-card/60 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-all duration-300"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={subscribed}
                        className="w-full py-2.5 rounded-lg bg-emerald text-emerald-foreground font-semibold hover:bg-emerald/90 hover:shadow-lg hover:shadow-emerald/20 transition-all duration-300 disabled:opacity-50"
                    >
                        {subscribed ? "Subscribed!" : "Subscribe"}
                    </button>
                </div>
            </div>
        </aside>
    )
})
NewsletterSidebar.displayName = "NewsletterSidebar"

const DetailArticle = () => {
    const reduce = useReducedMotion()
    const article = useMemo(() => ARTICLE, [])

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-background to-surface">
            <div
                className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-blob-left pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute top-40 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-emerald/5 rounded-full blur-3xl animate-blob-right pointer-events-none"
                aria-hidden
            />

            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none"
                aria-hidden
            />

            <FloatingActions />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
                <motion.button
                    initial={reduce ? undefined : { opacity: 0, x: -10 }}
                    animate={reduce ? undefined : { opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 mb-4 sm:mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to articles
                </motion.button>

                <ArticleHero article={article} />

                <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 lg:gap-12">
                    <div className="space-y-8 sm:space-y-12">
                        <ArticleContent content={article.content} />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border/40">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
                                <ArrowLeft className="w-4 h-4" /> Previous
                            </button>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300">
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <CommentForm />

                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Continue Reading</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {article.related.map((item) => (
                                    <RelatedCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <NewsletterSidebar />
                </div>
            </div>
        </main>
    )
}

export default memo(DetailArticle)
