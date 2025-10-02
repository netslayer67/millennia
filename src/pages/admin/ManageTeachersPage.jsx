import React from 'react';
import { motion } from 'framer-motion';
import { allTeachers } from '@/data/superAdminData';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreVertical, Search, Eye, Edit, Trash2 } from 'lucide-react';

const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const ManageTeachersPage = () => {
    return (
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Manajemen Guru</h1>
                    <p className="text-white/60 mt-1">Kelola data, status, dan profil semua guru terdaftar.</p>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white gap-2 w-full md:w-auto">
                    <PlusCircle className="w-5 h-5" /> Tambah Guru Baru
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="p-6 border-b border-white/10">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="text" placeholder="Cari nama atau email guru..." className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-4 text-sm font-medium text-white/60">Nama</th>
                                <th className="p-4 text-sm font-medium text-white/60">Status</th>
                                <th className="p-4 text-sm font-medium text-white/60">Jumlah Murid</th>
                                <th className="p-4 text-sm font-medium text-white/60">Tanggal Bergabung</th>
                                <th className="p-4 text-sm font-medium text-white/60">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTeachers.map((teacher) => (
                                <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={teacher.avatar} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold">{teacher.name}</p>
                                            <p className="text-xs text-white/60">{teacher.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${teacher.status === 'Aktif' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{teacher.students}</td>
                                    <td className="p-4">{teacher.joinDate}</td>
                                    <td className="p-4">
                                        {/* Dropdown/Menu bisa ditambahkan di sini untuk aksi */}
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

export default ManageTeachersPage;