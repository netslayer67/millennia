'use client';
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { teacherData } from '@/data/teacherData'; // Make sure your data path is correct
import { Edit, PlusCircle, Calendar, CheckSquare, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Make sure your Button component path is correct

// -- CHART.JS REGISTRATION --
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


// -- ANIMATION VARIANTS --
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    },
    exit: {
        y: -10,
        opacity: 0,
    }
};


// -- SKELETON COMPONENTS FOR LAZY LOADING --
// DESIGN UPGRADE: Skeletons are more detailed to better match the component's final shape.
const CardSkeleton = ({ className = "h-48" }) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${className} animate-pulse`}>
        <div className="h-5 bg-white/10 rounded-md w-3/4 mb-4"></div>
        <div className="h-3 bg-white/10 rounded-md w-1/2 mb-2"></div>
        <div className="h-3 bg-white/10 rounded-md w-1/3"></div>
    </div>
);

const ScheduleSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
                <div className="w-11 h-11 rounded-full bg-white/10 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded-md w-1/2 animate-pulse"></div>
                </div>
                <div className="w-20 h-8 bg-white/10 rounded-md animate-pulse"></div>
            </div>
        ))}
    </div>
);


// -- REFACTORED & RESTYLED CORE COMPONENTS --

// NEW: Header component for better structure
const DashboardHeader = ({ user }) => (
    <motion.header variants={itemVariants} className="flex flex-wrap justify-between items-center gap-y-4 gap-x-6 mb-10">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Selamat Datang, {user.name} 👋
            </h1>
            <p className="text-white/60 mt-2 text-base">Ringkasan aktivitas dan performa mengajarmu hari ini.</p>
        </div>
        <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white gap-2 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 hover:scale-105">
            <PlusCircle className="w-5 h-5" /> Jadwalkan Sesi Baru
        </Button>
    </motion.header>
);

// DESIGN UPGRADE: StatCards are more visually distinct with icons and colored backgrounds.
const StatCard = ({ item }) => (
    <motion.div
        variants={itemVariants}
        className="relative p-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group"
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.Icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
                <p className="text-sm text-white/60 tracking-wide">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
        </div>
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
);

// DESIGN UPGRADE: ScheduleItem has a cleaner layout, better spacing, and improved button styles.
const ScheduleItem = ({ item, isAssessment }) => (
    <motion.div
        variants={itemVariants}
        layout
        className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    >
        <img
            src={item.student.avatar}
            alt={item.student.name}
            className="w-11 h-11 rounded-full border-2 border-white/20 object-cover"
        />
        <div className="flex-1">
            <p className="font-semibold text-white/90">{item.student.name}</p>
            <p className="text-sm text-white/50">
                {isAssessment ? `${item.course} • ${item.lastSession}` : item.time}
            </p>
        </div>
        {isAssessment ? (
            <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 gap-2">
                <Edit className="w-4 h-4" /> Nilai
            </Button>
        ) : (
            <div className='flex items-center gap-2'>
                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${item.type === 'Online'
                        ? 'bg-sky-900/50 text-sky-300 border border-sky-500/30'
                        : 'bg-amber-900/50 text-amber-300 border border-amber-500/30'
                        }`}
                >
                    {item.type}
                </span>
                {item.isLive && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white gap-1.5 shadow-lg shadow-green-500/20 animate-pulse">
                        <Video className="w-4 h-4" /> Mulai
                    </Button>
                )}
            </div>
        )}
    </motion.div>
);

// UX FEATURE: Added "Load More" functionality to simulate infinite scroll for long lists.
const ScheduleTabs = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [visibleCounts, setVisibleCounts] = useState({ upcoming: 3, assessment: 3 });

    const tabs = [
        { id: 'upcoming', label: 'Jadwal Mendatang', icon: Calendar, data: teacherData.upcomingSchedule },
        { id: 'assessment', label: 'Butuh Penilaian', icon: CheckSquare, data: teacherData.needsAssessment }
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);
    const visibleData = activeTabData.data.slice(0, visibleCounts[activeTab]);

    const handleLoadMore = () => {
        setVisibleCounts(prev => ({ ...prev, [activeTab]: prev[activeTab] + 3 }));
    };

    const hasMore = visibleCounts[activeTab] < activeTabData.data.length;

    return (
        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl flex flex-col h-full">
            <div className="flex border-b border-white/10 mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-300 text-white/60 hover:text-white"
                        style={{ color: activeTab === tab.id ? 'white' : '' }}
                    >
                        <tab.icon className="w-4 h-4" /> {tab.label}
                        {activeTab === tab.id && (
                            <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-sky-400" layoutId="underline" />
                        )}
                    </button>
                ))}
            </div>
            <div className="flex-1 min-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        className="space-y-2"
                    >
                        {visibleData.map(item => (
                            <ScheduleItem key={`${activeTab}-${item.id}`} item={item} isAssessment={activeTab === 'assessment'} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            {hasMore && (
                <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button variant="outline" className="w-full border-white/20 text-white/70 hover:bg-white/10 hover:text-white" onClick={handleLoadMore}>
                        Muat Lebih Banyak
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};

// DESIGN UPGRADE: Chart component has a cleaner header and refined chart options for a premium look.
const PerformanceChart = () => {
    const chartData = useMemo(() => teacherData.performanceData, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: 'rgba(56, 189, 248, 0.5)',
                borderWidth: 1,
                titleFont: { size: 14, weight: 'bold', family: 'Inter, sans-serif' },
                bodyFont: { size: 12, family: 'Inter, sans-serif' },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y} jam`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } },
                beginAtZero: true
            }
        },
        elements: {
            line: { tension: 0.4 },
            point: {
                radius: 0,
                hoverRadius: 6,
                backgroundColor: 'rgba(56, 189, 248, 1)',
                hoverBorderColor: 'white',
                hoverBorderWidth: 2,
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    return (
        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl h-[400px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-white/90">Performa Mengajar</h3>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                    Lihat Laporan <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
            <div className="h-[calc(100%-3.5rem)] w-full">
                <Line options={options} data={chartData} />
            </div>
        </motion.div>
    );
};

// -- LAZY LOADING SETUP --
const LazyScheduleTabs = lazy(() => Promise.resolve({ default: ScheduleTabs }));
const LazyPerformanceChart = lazy(() => Promise.resolve({ default: PerformanceChart }));
const LazyStatCard = lazy(() => Promise.resolve({ default: StatCard }));


// -- MAIN DASHBOARD COMPONENT --
const TeacherDashboardPage = () => {
    return (
        // Using 'Inter' font for a modern SaaS look
        <div className="relative min-h-screen bg-gray-900 text-white font-inter overflow-hidden">
            {/* Background Effects: Grid pattern and radial glows */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
                />
                <div className="absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[150px]" />
            </div>

            {/* Main Content Area */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto"
            >
                <DashboardHeader user={teacherData.user} />

                {/* Statistics Section */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    <Suspense fallback={<><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}>
                        {teacherData.stats.map(item => (
                            <LazyStatCard key={item.title} item={item} />
                        ))}
                    </Suspense>
                </motion.div>

                {/* Main Layout Grid: Chart and Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-3">
                        <Suspense fallback={<CardSkeleton className="h-[400px]" />}>
                            <LazyPerformanceChart />
                        </Suspense>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-2 h-full">
                        <Suspense fallback={<CardSkeleton className="h-[460px]" />}>
                            <LazyScheduleTabs />
                        </Suspense>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeacherDashboardPage;