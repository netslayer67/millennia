import React from 'react';
import { motion } from 'framer-motion';
import { allStudents } from '@/data/superAdminData';
import { Button } from '@/components/ui/button';
import { MoreVertical, Search, UserPlus } from 'lucide-react';

const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const ManageStudentsPage = () => {
    return (
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Manajemen Murid</h1>
                    <p className="text-white/60 mt-1">Lihat dan kelola data semua murid yang terdaftar di platform.</p>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white gap-2 w-full md:w-auto">
                    <UserPlus className="w-5 h-5" /> Tambah Murid Baru
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="p-6 border-b border-white/10">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="text" placeholder="Cari nama atau email murid..." className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-4 text-sm font-medium text-white/60">Nama</th>
                                <th className="p-4 text-sm font-medium text-white/60">Status</th>
                                <th className="p-4 text-sm font-medium text-white/60">Tutor Saat Ini</th>
                                <th className="p-4 text-sm font-medium text-white/60">Tanggal Bergabung</th>
                                <th className="p-4 text-sm font-medium text-white/60">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allStudents.map((student) => (
                                <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={student.avatar} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold">{student.name}</p>
                                            <p className="text-xs text-white/60">{student.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${student.status === 'Aktif' ? 'bg-green-500/20 text-green-400' :
                                                student.status === 'Suspended' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{student.currentTutor}</td>
                                    <td className="p-4">{student.joinDate}</td>
                                    <td className="p-4">
                                        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                                            <MoreVertical className="w-5 h-5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageStudentsPage;