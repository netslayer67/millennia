import React from 'react';
import { Sparkles, ShieldCheck, CalendarHeart, UserCheck, CalendarDays, MessageSquare, Award, Check } from 'lucide-react';

export const tutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    experience: "5 years",
    specialization: "TOEFL & Speaking Expert",
    location: "Online",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
  },
  {
    id: 2,
    name: "David Smith",
    rating: 4.8,
    experience: "7 years",
    specialization: "Business English Pro",
    location: "Offline",
    level: "Business",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    id: 3,
    name: "Jessica Williams",
    rating: 5.0,
    experience: "6 years",
    specialization: "IELTS & Academic Prep",
    location: "Online",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: 4,
    name: "Chris Martinez",
    rating: 4.7,
    experience: "4 years",
    specialization: "Conversational English",
    location: "Online",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19"
  }
];

export const testimonials = [
  {
    name: "Andi Pratama",
    role: "University Student",
    content: "Dulu takut ngomong Bahasa Inggris, sekarang percaya diri setelah belajar bareng Kak Sarah! Metode pembelajaran yang fun dan mudah dipahami.",
  },
  {
    name: "Siti Nurhaliza",
    role: "Product Manager",
    content: "Berkat Correctly, saya berhasil dapat skor TOEFL 550! Tutor sangat sabar dan materinya terstruktur dengan baik.",
  },
  {
    name: "Budi Santoso",
    role: "Entrepreneur",
    content: "Business English course di Correctly sangat membantu karir saya. Sekarang lebih confident saat meeting dengan client internasional.",
  },
  {
    name: "Rina Wijaya",
    role: "Graphic Designer",
    content: "IELTS prep di sini the best! Tutornya ngasih banyak tips & trik yang nggak ada di buku.",
  },
  {
    name: "Eko Prasetyo",
    role: "Software Engineer",
    content: "Sesi percakapan sangat membantu menghilangkan logat medok saya. Highly recommended!",
  }
];

export const howItWorksSteps = [
  {
    icon: React.createElement(UserCheck, { className: "size-7" }),
    title: "Pilih Guru Ideal",
    description: "Temukan guru yang cocok dengan filter spesialisasi, rating, dan lokasi."
  },
  {
    icon: React.createElement(CalendarDays, { className: "size-7" }),
    title: "Jadwalkan Sesi",
    description: "Pilih waktu belajar fleksibel, baik online maupun tatap muka."
  },
  {
    icon: React.createElement(MessageSquare, { className: "size-7" }),
    title: "Mulai Belajar",
    description: "Nikmati sesi personal yang efektif dengan materi yang disesuaikan."
  },
  {
    icon: React.createElement(Award, { className: "size-7" }),
    title: "Dapat Feedback & Laporan",
    description: "Terima laporan perkembangan untuk meningkatkan kemampuan Anda."
  }
];

export const valueProps = [
  {
    icon: React.createElement(Sparkles, { className: 'size-6' }),
    title: "MWS BACKGROUND",
    description: "In the 21st century, every educational system faces the challenge of preparing young generations for a future life that is not only complex but constantly changing as well, and hence, mostly unknown and unpredictable.  However, it is clear that intellectual flexibility, creative thinking, independent judgment, moral discernment, refined written and oral communication skills, and the ability to collaborate effectively are essential to success in today’s ever-changing .world Millennia World School(MWS) offers a…"
  },
  {
    icon: React.createElement(CalendarHeart, { className: 'size-6' }),
    title: "Latest Articles",
    description: "Atur sesi belajar kapanpun dan dimanapun, baik online maupun tatap muka."
  },
];


export const pricingPlans = [
  {
    name: "Conversation",
    price: "150K",
    priceUnit: "sesi",
    description: "Untuk melatih kelancaran berbicara sehari-hari.",
    features: ["Sesi 1-on-1 60 menit", "Topik percakapan bebas", "Feedback & koreksi instan", "Jadwal fleksibel"],
    popular: false,
  },
  {
    name: "Pro Package",
    price: "1.8JT",
    priceUnit: "bulan",
    description: "Paket lengkap untuk kemajuan terstruktur.",
    features: ["12 Sesi/bulan (60 menit)", "Kurikulum personal", "Progress report bulanan", "Akses materi premium", "Prioritas penjadwalan"],
    popular: true,
  },
  {
    name: "Test Prep",
    price: "2.5JT",
    priceUnit: "paket",
    description: "Fokus intensif untuk persiapan TOEFL/IELTS.",
    features: ["20 Sesi intensif", "Simulasi & bedah soal", "Strategi & tips skor tinggi", "Analisis kelemahan", "Jaminan peningkatan skor"],
    popular: false,
  },
];