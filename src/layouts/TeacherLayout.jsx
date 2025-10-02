import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, Users, BarChart3, LogOut, ChevronLeft, ChevronRight, Menu, User } from 'lucide-react';
import { teacherData } from '@/data/teacherData';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
    { name: 'Jadwal', icon: CalendarDays, path: '/teacher/schedule' },
    { name: 'Murid', icon: Users, path: '/teacher/students' },
    { name: 'Pendapatan', icon: BarChart3, path: '/teacher/earnings' },
];

/**
 * Komponen NavItem yang disempurnakan
 * - Animasi yang lebih halus untuk item aktif.
 * - Tooltip saat sidebar diciutkan (collapsed).
 */
const NavItem = ({ item, isExpanded }) => (
    <NavLink
        to={item.path}
        className={({ isActive }) =>
            `relative flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 group ${isActive ? 'bg-sky-500/10 text-white font-semibold' : 'hover:bg-white/5 text-white/70'
            } ${isExpanded ? 'justify-start' : 'justify-center'}`
        }
    >
        <item.icon className="w-6 h-6 flex-shrink-0" />
        <AnimatePresence>
            {isExpanded && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="truncate"
                >
                    {item.name}
                </motion.span>
            )}
        </AnimatePresence>
        {!isExpanded && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 border border-white/10 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-x-[-10px] group-hover:translate-x-0 z-20">
                {item.name}
            </div>
        )}
    </NavLink>
);

/**
 * Komponen Sidebar Utama
 */
const Sidebar = ({ isExpanded, setIsExpanded }) => {
    const navigate = useNavigate();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isExpanded ? 260 : 88 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-col h-screen bg-gray-900/70 backdrop-blur-xl border-r border-white/10 text-white fixed z-50"
        >
            <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-6 h-20 border-b border-white/10 flex-shrink-0`}>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-bold tracking-wider"
                        >
                            Correct.
                        </motion.h1>
                    )}
                </AnimatePresence>
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => <NavItem key={item.name} item={item} isExpanded={isExpanded} />)}
            </nav>

            <div className="border-t border-white/10 p-4 space-y-2 flex-shrink-0">
                <NavLink to="/teacher/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors group ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <img src={teacherData.user.avatar} alt="User" className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/20" />
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} exit={{ opacity: 0 }} className="truncate">
                                <h4 className="font-semibold text-sm">{teacherData.user.name}</h4>
                                <p className="text-xs text-white/60">Lihat Profil</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </NavLink>
                <button
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-4 w-full p-3 rounded-lg text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

/**
 * Menu Overlay untuk Mobile
 */
const MobileMenu = ({ isOpen, closeMenu, navigate }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="lg:hidden fixed inset-0 bg-gray-900/90 backdrop-blur-lg z-40 flex flex-col"
            >
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between pt-4 pb-8 border-b border-white/10">
                        <h1 className="text-2xl font-bold tracking-wider">Menu</h1>
                        <button onClick={closeMenu} className="p-2">
                            <motion.div initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }} >
                                X
                            </motion.div>
                        </button>
                    </div>
                    <nav className="mt-8 space-y-4 flex-1">
                        {navItems.map(item => (
                            <NavLink key={item.name} to={item.path} onClick={closeMenu}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 p-4 rounded-lg text-lg transition-colors ${isActive ? 'bg-sky-500/20 text-sky-300' : 'text-white/80 hover:bg-white/5'}`
                                }>
                                <item.icon className="w-6 h-6" />
                                {item.name}
                            </NavLink>
                        ))}
                        <NavLink to="/teacher/profile" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-4 p-4 rounded-lg text-lg transition-colors ${isActive ? 'bg-sky-500/20 text-sky-300' : 'text-white/80 hover:bg-white/5'}`}>
                            <User className="w-6 h-6" />
                            Profil Saya
                        </NavLink>
                    </nav>
                    <button onClick={() => { navigate('/'); closeMenu(); }} className="flex items-center gap-4 p-4 w-full rounded-lg text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-auto">
                        <LogOut className="w-6 h-6" />
                        <span className="font-medium text-lg">Logout</span>
                    </button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

/**
 * Komponen Layout Utama
 */
export const TeacherLayout = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => window.innerWidth >= 1024 && setMobileMenuOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]" style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }} />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
            </div>

            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

            <main className={`relative z-10 transition-[margin-left] duration-300 ease-in-out ${isExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'}`}>
                <header className="lg:hidden flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 h-20">
                    <h1 className="text-xl font-bold tracking-wider">Correct.</h1>
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2">
                        <Menu />
                    </button>
                </header>

                <div className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

            <MobileMenu isOpen={isMobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} navigate={navigate} />
        </div>
    );
};