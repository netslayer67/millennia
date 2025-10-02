// src/pages/TeacherStudentsPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentList } from '@/data/teacherData'; // Ensure data path is correct
import { Search, ChevronDown, Check, User, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Ensure component path is correct
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
    exit: { y: -20, opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// --- REFINED COMPONENTS ---
const StudentCard = ({ student }) => {
    const navigate = useNavigate();
    const levelColor = student.level === 'Advanced' ? 'text-sky-400'
        : student.level === 'Intermediate' ? 'text-emerald-400'
            : 'text-amber-400';

    return (
        <motion.div
            variants={itemVariants}
            layout
            onClick={() => navigate(`/teacher/student/${student.id}`)}
            className="bg-gray-900/50 border border-white/10 rounded-2xl p-5 backdrop-blur-xl group cursor-pointer"
        >
            <div className="flex flex-col items-center text-center">
                <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-white/10 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className={`text-sm font-medium ${levelColor}`}>{student.level}</p>
                <p className="text-xs text-white/60 mt-1">Sesi Terakhir: {student.lastSession}</p>
            </div>
            <div className="mt-5 text-left">
                <p className="text-sm text-white/70 mb-2">Progress Belajar</p>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                    <motion.div
                        className="bg-sky-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${student.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const TeacherStudentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('All');
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredStudents = useMemo(() => {
        return studentList
            .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(s => filterLevel === 'All' || s.level === filterLevel);
    }, [searchTerm, filterLevel]);

    return (
        <div className="relative min-h-screen bg-gray-900 text-white font-sans overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
                />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-8"
            >
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Daftar Murid</h1>
                    <p className="text-white/60 mt-2 text-base">Kelola dan lihat perkembangan murid-murid Anda.</p>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Cari nama murid..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 backdrop-blur-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-white/40"
                        />
                    </div>

                    {/* NEW FEATURE: Animated Filter Dropdown */}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Button variant="outline" className="flex items-center justify-between gap-4 w-full md:w-48 bg-gray-900/50 border-white/10 hover:bg-white/5 text-white/80 h-12">
                                <span>{filterLevel === 'All' ? 'Filter Level' : filterLevel}</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                sideOffset={5}
                                className="w-48 bg-gray-800/80 border border-white/10 rounded-lg backdrop-blur-xl p-2 z-50 animate-in fade-in-90"
                            >
                                {levels.map(level => (
                                    <DropdownMenu.Item
                                        key={level}
                                        onSelect={() => setFilterLevel(level)}
                                        className="flex items-center justify-between p-2 rounded-md text-sm text-white/80 hover:bg-sky-500/20 hover:text-white focus:outline-none cursor-pointer"
                                    >
                                        {level}
                                        {filterLevel === level && <Check className="w-4 h-4" />}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>

                {/* Student Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredStudents.map(student => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TeacherStudentsPage;