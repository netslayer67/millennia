import { Users, UserCheck, BarChart2, Zap, UserPlus, BookOpen, Star, FileCheck, DollarSign } from 'lucide-react';

export const superAdminData = {
    user: {
        name: 'Super Admin',
        avatar: 'https://ui-avatars.com/api/?name=SA&background=9333ea&color=fff',
    },
    stats: [
        { title: "Total Guru Aktif", value: "78", Icon: UserCheck, color: "text-sky-400" },
        { title: "Total Murid Terdaftar", value: "1,245", Icon: Users, color: "text-emerald-400" },
        { title: "Pendapatan (Bulan Ini)", value: "Rp 87,5 Jt", Icon: BarChart2, color: "text-amber-400" },
        { title: "Sesi Online Saat Ini", value: "12", Icon: Zap, color: "text-rose-400" },
    ],
    growthData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Murid Baru',
                data: [65, 59, 80, 81, 56, 55, 90],
                borderColor: 'rgba(56, 189, 248, 1)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Pendapatan (Jt)',
                data: [28, 48, 40, 69, 86, 77, 100],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    },
    activityFeed: [
        { Icon: UserPlus, text: "Rizky Aditya baru saja mendaftar.", time: "5 menit lalu" },
        { Icon: BookOpen, text: "Sarah Johnson menyelesaikan sesi dengan Michael Lee.", time: "1 jam lalu" },
        { Icon: Star, text: "Jane Doe menerima rating 5 bintang.", time: "3 jam lalu" },
        { Icon: FileCheck, text: "Sertifikat diterbitkan untuk Citra Lestari.", time: "Kemarin" },
    ],
    topTeachers: [
        { id: 1, name: 'Jane Doe', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=111827&color=fff', rating: 4.9, hours: 120 },
        { id: 2, name: 'John Smith', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff', rating: 4.8, hours: 110 },
        { id: 3, name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff', rating: 4.8, hours: 105 },
    ],
};

export const allTeachers = [
    { id: 'T001', name: 'Jane Doe', email: 'jane.doe@example.com', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=111827&color=fff', students: 28, joinDate: '2024-01-15', status: 'Aktif' },
    { id: 'T002', name: 'John Smith', email: 'john.smith@example.com', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff', students: 22, joinDate: '2024-02-11', status: 'Aktif' },
    { id: 'T003', name: 'Sarah Johnson', email: 'sarah.j@example.com', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff', students: 19, joinDate: '2024-03-01', status: 'Aktif' },
    { id: 'T004', name: 'David Brown', email: 'david.brown@example.com', avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=f97316&color=fff', students: 15, joinDate: '2024-03-20', status: 'Nonaktif' },
    { id: 'T005', name: 'Emily White', email: 'emily.white@example.com', avatar: 'https://ui-avatars.com/api/?name=Emily+White&background=ec4899&color=fff', students: 35, joinDate: '2023-12-05', status: 'Aktif' },
];

export const allStudents = [
    { id: 'S001', name: 'Rizky Aditya', email: 'rizky.aditya@example.com', avatar: 'https://ui-avatars.com/api/?name=Rizky+Aditya&background=0D8ABC&color=fff', currentTutor: 'Jane Doe', joinDate: '2024-05-10', status: 'Aktif' },
    { id: 'S002', name: 'Michael Lee', email: 'michael.lee@example.com', avatar: 'https://ui-avatars.com/api/?name=Michael+Lee&background=A855F7&color=fff', currentTutor: 'John Smith', joinDate: '2024-06-21', status: 'Aktif' },
    { id: 'S003', name: 'Citra Lestari', email: 'citra.lestari@example.com', avatar: 'https://ui-avatars.com/api/?name=Citra+Lestari&background=FBBF24&color=fff', currentTutor: 'Jane Doe', joinDate: '2024-04-15', status: 'Suspended' },
    { id: 'S004', name: 'Dewi Anggraini', email: 'dewi.a@example.com', avatar: 'https://ui-avatars.com/api/?name=Dewi+Anggraini&background=f43f5e&color=fff', currentTutor: 'Sarah Johnson', joinDate: '2024-07-01', status: 'Aktif' },
    { id: 'S005', name: 'Eko Prasetyo', email: 'eko.p@example.com', avatar: 'https://ui-avatars.com/api/?name=Eko+Prasetyo&background=84cc16&color=fff', currentTutor: 'David Brown', joinDate: '2023-11-30', status: 'Nonaktif' },
];

export const certificatesToIssue = [
    { id: 'S001', name: 'Rizky Aditya', avatar: 'https://ui-avatars.com/api/?name=Rizky+Aditya&background=0D8ABC&color=fff', program: 'IELTS Intensive', score: 85, completionDate: '2025-07-12' },
    { id: 'S004', name: 'Budi Santoso', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=34D399&color=fff', program: 'TOEFL Regular', score: 78, completionDate: '2025-07-10' },
];

// Data baru untuk Halaman Laporan
export const reportsData = {
    financialSummary: [
        { title: "Total Pendapatan (Gross)", value: "Rp 125.500.000", Icon: DollarSign, color: "text-emerald-400" },
        { title: "Komisi Guru", value: "Rp 87.850.000", Icon: Users, color: "text-sky-400" },
        { title: "Laba Bersih (Net)", value: "Rp 37.650.000", Icon: BarChart2, color: "text-amber-400" },
    ],
    revenueTrend: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Pendapatan (Jt)',
                data: [45, 52, 68, 81, 75, 88, 125],
                borderColor: 'rgba(139, 92, 246, 1)', // purple-500
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ],
    }
};