import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { teacherProfile } from '@/data/teacherData';
import { Button } from '@/components/ui/button';
import { Save, User, Mail, Award, BookOpen, Calendar, Users, Edit2 } from 'lucide-react';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const StatItem = ({ Icon, label, value }) => (
    <div className="flex items-center gap-3 text-sm">
        <Icon className="w-4 h-4 text-sky-400 flex-shrink-0" />
        <span className="text-white/70">{label}:</span>
        <span className="font-semibold text-white">{value}</span>
    </div>
);

const TeacherProfilePage = () => {
    const [profile, setProfile] = useState(teacherProfile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold">Profil Saya</h1>
                <p className="text-white/60 mt-1">Kelola informasi publik dan detail akun Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kiri: Foto & Info Utama */}
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl text-center">
                        <div className="relative w-32 h-32 mx-auto">
                            <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full mb-4 border-2 border-white/20 object-cover" />
                            <Button size="icon" variant="outline" className="absolute bottom-1 right-1 h-9 w-9 bg-sky-500 hover:bg-sky-600 border-sky-400 rounded-full">
                                <Edit2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
                        <p className="text-sm text-sky-400">{profile.tagline}</p>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">
                        <h3 className="font-semibold text-lg border-b border-white/10 pb-3 mb-4">Statistik</h3>
                        <StatItem Icon={Calendar} label="Bergabung Sejak" value={profile.memberSince} />
                        <StatItem Icon={Users} label="Total Murid" value={profile.totalStudents} />
                    </div>
                </motion.div>

                {/* Kolom Kanan: Form Edit */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-gray-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm text-white/80 mb-2 block">Nama Lengkap</label>
                        <input id="name" name="name" type="text" value={profile.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm text-white/80 mb-2 block">Email</label>
                        <input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label htmlFor="tagline" className="text-sm text-white/80 mb-2 block">Tagline Singkat</label>
                        <input id="tagline" name="tagline" type="text" value={profile.tagline} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label htmlFor="about" className="text-sm text-white/80 mb-2 block">Tentang Saya</label>
                        <textarea id="about" name="about" rows="5" value={profile.about} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                        <label className="text-sm text-white/80 mb-2 block">Spesialisasi</label>
                        <div className="flex flex-wrap gap-2">
                            {profile.specializations.map(spec => (
                                <span key={spec} className="px-3 py-1 bg-sky-500/20 text-sky-300 text-sm rounded-full">{spec}</span>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button size="lg" className="w-full bg-sky-500 hover:bg-sky-600 text-white gap-2">
                            <Save className="w-4 h-4" /> Simpan Perubahan
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TeacherProfilePage;