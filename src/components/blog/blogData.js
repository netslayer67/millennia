// Blog data and constants - optimized for performance
export const ARTICLES = [
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
];

export const CATEGORIES = ["All", "Parenting", "Education", "Literacy", "Wellness", "Development"];

export const sanitizeSearch = (input) => {
    if (!input) return "";
    return input
        .replace(/[<>]/g, "")
        .replace(/https?:\/\/\S+/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 100);
};