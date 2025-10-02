// src/pages/TeacherEarningsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { earningsData } from '@/data/teacherData'; // Ensure data path is correct
import { DollarSign, BarChart, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Ensure component path is correct

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- REFINED COMPONENTS ---
const EarningStatCard = ({ title, value, Icon }) => (
    <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl group transition-all duration-300 hover:border-white/20">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-sky-500/20 transition-colors duration-300">
                <Icon className="w-6 h-6 text-sky-400" />
            </div>
            <div>
                <p className="text-sm text-white/60">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    </motion.div>
);

const TeacherEarningsPage = () => {
    return (
        <div className="relative min-h-screen bg-gray-900 text-white font-sans overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
                />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
            </div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 space-y-8"
            >
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Riwayat & Pendapatan</h1>
                        <p className="text-white/60 mt-2 text-base">Lacak semua pendapatan dari aktivitas mengajarmu.</p>
                    </div>
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 shadow-lg shadow-emerald-500/20 w-full md:w-auto transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-105">
                        <Download className="w-5 h-5" /> Tarik Dana
                    </Button>
                </div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <EarningStatCard title="Total Pendapatan" value={earningsData.summary.total} Icon={BarChart} />
                    <EarningStatCard title="Pendapatan Bulan Ini" value={earningsData.summary.thisMonth} Icon={DollarSign} />
                    <EarningStatCard title="Menunggu Pembayaran" value={earningsData.summary.pending} Icon={Clock} />
                </div>

                {/* Transaction History Table */}
                <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="p-5 text-sm font-medium text-white/60">Tanggal</th>
                                    <th className="p-5 text-sm font-medium text-white/60">Murid</th>
                                    <th className="p-5 text-sm font-medium text-white/60">Durasi</th>
                                    <th className="p-5 text-sm font-medium text-white/60">Jumlah</th>
                                    <th className="p-5 text-sm font-medium text-white/60 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningsData.history.map((item) => (
                                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-5 whitespace-nowrap">{item.date}</td>
                                        <td className="p-5 font-medium whitespace-nowrap">{item.student}</td>
                                        <td className="p-5 text-white/80">{item.duration}</td>
                                        <td className="p-5 font-semibold text-sky-400">{item.amount}</td>
                                        <td className="p-5 text-right">
                                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${item.status === 'Lunas' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default TeacherEarningsPage;