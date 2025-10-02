import { DollarSign, User, Calendar, BookOpen, Clock, Users } from 'lucide-react';

export const teacherData = {
    user: {
        name: 'Jane Doe',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=111827&color=fff',
    },
    stats: [
        {
            title: "Jadwal Hari Ini",
            value: "3 Sesi",
            Icon: Calendar,
            color: "text-sky-400",
            bgColor: "bg-sky-400/10",
        },
        {
            title: "Murid Aktif",
            value: "12 Murid",
            Icon: Users,
            color: "text-emerald-400",
            bgColor: "bg-emerald-400/10",
        },
        {
            title: "Pendapatan Bulan Ini",
            value: "Rp 4.2Jt",
            Icon: DollarSign,
            color: "text-amber-400",
            bgColor: "bg-amber-400/10",
        }
    ],
    upcomingSchedule: [
        {
            id: 1,
            student: {
                name: "Rizky Aditya",
                avatar: "https://ui-avatars.com/api/?name=Rizky+Aditya&background=0D8ABC&color=fff",
            },
            time: "10:00 - 11:00",
            type: "Online",
            isLive: true,
        },
        {
            id: 2,
            student: {
                name: "Budi Santoso",
                avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=34D399&color=fff",
            },
            time: "13:00 - 14:00",
            type: "Offline",
        },
        {
            id: 3,
            student: {
                name: "Citra Lestari",
                avatar: "https://ui-avatars.com/api/?name=Citra+Lestari&background=FBBF24&color=fff",
            },
            time: "15:00 - 16:00",
            type: "Online",
        },
    ],
    needsAssessment: [
        {
            id: 1,
            student: {
                name: "Michael Lee",
                avatar: "https://ui-avatars.com/api/?name=Michael+Lee&background=A855F7&color=fff",
            },
            course: "TOEFL Offline Reguler",
            lastSession: "Kemarin, 14:00"
        },
        {
            id: 2,
            student: {
                name: "David Chen",
                avatar: "https://ui-avatars.com/api/?name=David+Chen&background=F472B6&color=fff",
            },
            course: "General Conversation",
            lastSession: "2 hari lalu, 11:00"
        }
    ],
    performanceData: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        datasets: [{
            label: 'Jam Mengajar',
            data: [2, 3, 1, 4, 3, 5, 2],
            borderColor: 'rgba(56, 189, 248, 0.8)',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            fill: true,
            tension: 0.4,
        },],
    },
};

// Tambahkan data ini ke dalam file `teacherData.js` yang sudah ada

export const studentList = [
    {
        id: 'std-001',
        name: 'Rizky Aditya',
        avatar: 'https://ui-avatars.com/api/?name=Rizky+Aditya&background=0D8ABC&color=fff',
        level: 'Intermediate',
        lastSession: '2025-07-12',
        progress: 75,
    },
    {
        id: 'std-002',
        name: 'Michael Lee',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Lee&background=A855F7&color=fff',
        level: 'Beginner',
        lastSession: '2025-07-11',
        progress: 90,
    },
    {
        id: 'std-003',
        name: 'Citra Lestari',
        avatar: 'https://ui-avatars.com/api/?name=Citra+Lestari&background=FBBF24&color=fff',
        level: 'Advanced',
        lastSession: '2025-07-10',
        progress: 60,
    },
    {
        id: 'std-004',
        name: 'Budi Santoso',
        avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=34D399&color=fff',
        level: 'Intermediate',
        lastSession: '2025-07-09',
        progress: 82,
    },
];

export const studentDetail = {
    id: 'std-001',
    name: 'Rizky Aditya',
    email: 'rizky.aditya@email.com',
    avatar: 'https://ui-avatars.com/api/?name=Rizky+Aditya&background=0D8ABC&color=fff',
    level: 'Intermediate',
    joinDate: '2025-05-10',
    totalHours: 26,
    performance: {
        kehadiran: 95,
        dayaTangkap: 88,
        kelancaran: 81,
        tugasRumah: 92,
    },
};

export const earningsData = {
    summary: {
        total: 'Rp 15.750.000',
        thisMonth: 'Rp 4.200.000',
        pending: 'Rp 1.250.000',
    },
    history: [
        { id: 'TRX-001', date: '12 Jul 2025', student: 'Rizky Aditya', duration: '1 jam', amount: 'Rp 150.000', status: 'Lunas' },
        { id: 'TRX-002', date: '11 Jul 2025', student: 'Michael Lee', duration: '1 jam', amount: 'Rp 125.000', status: 'Lunas' },
        { id: 'TRX-003', date: '10 Jul 2025', student: 'Citra Lestari', duration: '1.5 jam', amount: 'Rp 225.000', status: 'Lunas' },
        { id: 'TRX-004', date: '09 Jul 2025', student: 'Budi Santoso', duration: '1 jam', amount: 'Rp 150.000', status: 'Tertunda' },
        { id: 'TRX-005', date: '08 Jul 2025', student: 'Rizky Aditya', duration: '1 jam', amount: 'Rp 150.000', status: 'Lunas' },
    ]
};

export const calendarEvents = [
    { id: 1, title: 'Rizky A. (Online)', start: '2025-07-14T10:00:00', end: '2025-07-14T11:00:00', type: 'booked' },
    { id: 2, title: 'Budi S. (Offline)', start: '2025-07-14T13:00:00', end: '2025-07-14T14:00:00', type: 'booked' },
    { id: 3, title: 'Available', start: '2025-07-15T09:00:00', end: '2025-07-15T12:00:00', type: 'available' },
    { id: 4, title: 'Libur', start: '2025-07-16', allDay: true, type: 'unavailable' },
    { id: 5, title: 'Michael L. (Online)', start: '2025-07-17T14:00:00', end: '2025-07-17T15:00:00', type: 'booked' },
];

export const teacherProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@correct.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=111827&color=fff',
    tagline: 'IELTS & TOEFL Specialist with 5+ Years of Experience',
    about: 'I am a passionate and certified English tutor dedicated to helping students achieve their language goals. My interactive and personalized approach ensures that you will not only learn but also enjoy the process. I specialize in preparing students for standardized tests like IELTS and TOEFL, focusing on practical strategies and confidence-building.',
    specializations: ['IELTS Prep', 'TOEFL Prep', 'Business English', 'Conversation'],
    memberSince: '2024-01-15',
    totalStudents: 28,
};