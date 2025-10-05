import {
    Sun,
    Globe,
    Heart,
    Palette,
    Users,
    Sparkles
} from "lucide-react";

// Static data moved outside component to prevent recreation
export const RHYTHM_INTRO = [
    "In Kindergarten, we believe children are carried along by the rhythms of the world—from breathing to daily cycles of sleeping and waking. Children flourish when daily activities reflect natural order with rhythmic arrangement.",
    "Rhythm provides fixed anchors: mealtimes, bedtime, playtime, work time. Once established, rhythm is deeply soothing—children know what's next without verbal instructions, creating safe boundaries and a predictable, secure world.",
    "Rhythm develops around daily, weekly, and seasonal patterns. Children anticipate activities and \"breathe\" in and out (balancing individual/group, restful/active) from quiet story circles to rigorous work and play.",
    "Transitions (coming indoors, moving between activities) are made with songs and short games, reducing stress."
];

export const RHYTHM_ASPECTS = [
    {
        id: "seasonal",
        icon: Sun,
        title: "Seasonal Rhythms",
        desc: "Activities aligned with nature's cycles",
        full: "Activities and celebrations matched to seasons help children understand cycles in nature and their community, grounding learning in observable patterns.",
        color: "primary"
    },
    {
        id: "culture",
        icon: Globe,
        title: "Indonesian Culture",
        desc: "Local traditions woven into daily life",
        full: "We emphasize the culture of the place where we live—local songs, stories, and traditions are integrated into daily routines, celebrating our community's heritage.",
        color: "gold"
    },
    {
        id: "celebrations",
        icon: Heart,
        title: "Religious Celebrations",
        desc: "Eid, Christmas, and major festivals",
        full: "Major celebrations like Eid and Christmas are respectfully observed as part of our community rhythm, fostering understanding and appreciation.",
        color: "emerald"
    }
];

export const PROGRAM_TEXT = [
    "Our kindergarten program develops children's imagination, inspires wonder, and instills appreciation for life.",
    "Activities foster practical experience of concepts and skills foundational to later literacy, numeracy, and life skills.",
    "Our curriculum utilizes a full range of creative activities appropriate for young minds."
];

export const ACTIVITIES_IMAGES = [
    { id: 1, title: "Story Circle", desc: "Quiet reflection time", color: "primary" },
    { id: 2, title: "Creative Arts", desc: "Hands-on expression", color: "gold" },
    { id: 3, title: "Music & Movement", desc: "Rhythmic transitions", color: "emerald" },
    { id: 4, title: "Outdoor Play", desc: "Active exploration", color: "primary" }
];

export const NICHE_IMAGES = [
    { id: 1, title: "Nature Studies", desc: "Environmental learning", color: "emerald" },
    { id: 2, title: "Cultural Arts", desc: "Traditional crafts", color: "gold" },
    { id: 3, title: "Mindful Movement", desc: "Body awareness", color: "primary" },
    { id: 4, title: "Storytelling", desc: "Narrative imagination", color: "gold" }
];

// Memoized color map to prevent object recreation
export const COLOR_MAP = {
    primary: 'hsl(var(--primary))',
    gold: 'hsl(var(--gold))',
    emerald: 'hsl(var(--emerald))'
};