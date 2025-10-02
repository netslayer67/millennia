import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { superAdminData } from '@/data/superAdminData';
import { Star, Clock } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

const StatCard = ({ item }) => (
    <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-white/70 mb-1">{item.title}</p>
                <h3 className="text-3xl font-bold">{item.value}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg"><item.Icon className={`w-6 h-6 ${item.color}`} /></div>
        </div>
    </motion.div>
);

const DashboardPage = () => {
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } }, y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } } } };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold">Dasbor Super Administrator</h1>
                <p className="text-white/60 mt-1">Ringkasan menyeluruh aktivitas platform Correct.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {superAdminData.stats.map(item => <StatCard key={item.title} item={item} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl h-[400px]">
                    <h3 className="font-semibold text-lg mb-4">Grafik Pertumbuhan Platform</h3>
                    <Line options={chartOptions} data={superAdminData.growthData} />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h3 className="font-semibold text-lg mb-4">Aktivitas Terbaru</h3>
                        <div className="space-y-4">
                            {superAdminData.activityFeed.map((act, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-full"><act.Icon className="w-4 h-4 text-sky-400" /></div>
                                    <div>
                                        <p className="text-sm">{act.text}</p>
                                        <p className="text-xs text-white/50">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="p-6"><h3 className="text-lg font-semibold">Guru Performa Terbaik</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="p-4 text-sm font-medium text-white/60">Guru</th>
                                <th className="p-4 text-sm font-medium text-white/60">Rating</th>
                                <th className="p-4 text-sm font-medium text-white/60">Jam Mengajar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {superAdminData.topTeachers.map((teacher) => (
                                <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3"><img src={teacher.avatar} className="w-10 h-10 rounded-full" />{teacher.name}</td>
                                    <td className="p-4"><span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> {teacher.rating}</span></td>
                                    <td className="p-4"><span className="flex items-center gap-1"><Clock className="w-4 h-4 text-white/60" /> {teacher.hours} jam</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DashboardPage;