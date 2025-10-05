import {
    Music2,
    Globe,
    HeartHandshake,
    Activity,
    Sparkles,
    Users,
    Target,
    Lightbulb,
    Zap
} from "lucide-react";

// Subjects data
export const SUBJECTS = [
    { id: 1, label: "Art, Music & Choir", icon: Music2, accent: "primary" },
    { id: 2, label: "Mathematics", icon: Target, accent: "emerald" },
    { id: 3, label: "Science", icon: Activity, accent: "gold" },
    { id: 4, label: "Social Studies", icon: Users, accent: "primary" },
    { id: 5, label: "Character Building", icon: HeartHandshake, accent: "emerald" },
    { id: 6, label: "Foreign Language", icon: Globe, accent: "gold" }
];

// Niche programs data
export const PROGRAMS = [
    {
        id: 1,
        title: "Calligraphy & Shodo",
        desc: "Ancient art of beautiful writing",
        img: "https://images.unsplash.com/photo-1592944395639-37c81f6d3df4?w=600&q=80",
        icon: Sparkles,
        accent: "primary"
    },
    {
        id: 2,
        title: "Sustainable Life",
        desc: "Eco-conscious living",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
        icon: HeartHandshake,
        accent: "emerald"
    },
    {
        id: 3,
        title: "Cultural Arts",
        desc: "Traditional crafts",
        img: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80",
        icon: Music2,
        accent: "gold"
    },
    {
        id: 4,
        title: "Culinary Arts",
        desc: "Cooking fundamentals",
        img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
        icon: Activity,
        accent: "primary"
    },
    {
        id: 5,
        title: "Digital Literacy",
        desc: "Tech skills",
        img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80",
        icon: Zap,
        accent: "emerald"
    },
    {
        id: 6,
        title: "Mindfulness",
        desc: "Mental wellness",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        icon: Lightbulb,
        accent: "gold"
    }
];