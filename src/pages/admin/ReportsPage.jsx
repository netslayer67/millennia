import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { reportsData } from '@/data/superAdminData';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

const ReportStatCard = ({ item }) => (
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

const ReportsPage = () => {
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } }, y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } } } };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Laporan & Keuangan</h1>
                    <p className="text-white/60 mt-1">Analisis performa keuangan platform secara keseluruhan.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-white/80 border-white/20 hover:bg-white/10 gap-2">
                        <Calendar className="w-4 h-4" /> Periode: Bulan Ini
                    </Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                        <Download className="w-4 h-4" /> Ekspor Laporan
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportsData.financialSummary.map(item => <ReportStatCard key={item.title} item={item} />)}
            </div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl h-[450px]">
                <h3 className="font-semibold text-lg mb-4">Tren Pendapatan (Gross)</h3>
                <Line options={chartOptions} data={reportsData.revenueTrend} />
            </motion.div>
        </motion.div>
    );
};

export default ReportsPage;