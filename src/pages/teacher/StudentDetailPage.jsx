// src/pages/TeacherStudentDetailPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { studentDetail } from '@/data/teacherData'; // Ensure data path is correct
import { Calendar, Clock, ArrowLeft, Save, User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Ensure component path is correct
import { useNavigate } from 'react-router-dom';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

// --- REFINED COMPONENTS ---
// DESIGN UPGRADE: Slider has improved aesthetics and user feedback.
const SliderInput = ({ label, value, onChange, accentColor = 'sky' }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-white/80">{label}</label>
                <span className={`text-sm font-semibold text-${accentColor}-400`}>{value}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={onChange}
                className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-${accentColor}-500`}
            />
        </div>
    );
};

const InfoPill = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 text-sm">
        <Icon className="w-4 h-4 text-sky-400 flex-shrink-0" />
        <span className="text-white/60">{label}:</span>
        <span className="font-medium text-white/90">{value}</span>
    </div>
);

const TeacherStudentDetailPage = () => {
    const navigate = useNavigate();
    // No need for state if we are not submitting the form in this example
    const performance = studentDetail.performance;

    return (
        <div className="relative min-h-screen bg-gray-900 text-white font-sans overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
                />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 space-y-8"
            >
                {/* Page Header */}
                <motion.div variants={itemVariants}>
                    <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4 text-white/70 hover:text-white hover:bg-white/5 transition-colors px-2 py-1">
                        <ArrowLeft className="mr-2 size-4" /> Kembali
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Detail & Penilaian Murid</h1>
                    <p className="text-white/60 mt-2 text-base">Lihat profil dan berikan penilaian untuk sesi terakhir.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Student Profile Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center text-center h-fit">
                        <img src={studentDetail.avatar} alt={studentDetail.name} className="w-28 h-28 rounded-full mb-4 border-4 border-white/10 shadow-lg" />
                        <h2 className="text-2xl font-bold">{studentDetail.name}</h2>
                        <p className="text-sm text-white/60">{studentDetail.email}</p>

                        <div className="w-full border-t border-white/10 my-6"></div>

                        <div className="space-y-4 text-left w-full">
                            <InfoPill icon={User} label="Level" value={studentDetail.level} />
                            <InfoPill icon={Calendar} label="Bergabung" value={studentDetail.joinDate} />
                            <InfoPill icon={Clock} label="Total Jam" value={`${studentDetail.totalHours} jam`} />
                        </div>
                    </motion.div>

                    {/* Assessment Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-gray-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <h3 className="font-semibold text-xl mb-6 flex items-center gap-3"><Award className="text-sky-400" /> Formulir Penilaian Performa</h3>
                        <div className="space-y-6">
                            <SliderInput label="Kehadiran & Partisipasi" value={performance.kehadiran} />
                            <SliderInput label="Daya Tangkap Materi" value={performance.dayaTangkap} />
                            <SliderInput label="Kelancaran Berbicara" value={performance.kelancaran} />
                            <SliderInput label="Pengerjaan Tugas" value={performance.tugasRumah} />

                            <div>
                                <label className="text-sm text-white/80 mb-2 block">Catatan & Feedback</label>
                                <textarea
                                    rows="4"
                                    placeholder="Tuliskan feedback kualitatif untuk murid..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-white/40"
                                ></textarea>
                            </div>

                            <Button size="lg" className="w-full bg-sky-500 hover:bg-sky-600 text-white gap-2 mt-4 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 hover:scale-[1.02]">
                                <Save className="w-4 h-4" /> Simpan Penilaian
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeacherStudentDetailPage;