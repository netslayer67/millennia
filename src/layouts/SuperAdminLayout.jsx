import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, UserCheck, FileText, BarChart, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { superAdminData } from '@/data/superAdminData';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Manajemen Guru', icon: UserCheck, path: '/admin/teachers' },
    { name: 'Manajemen Murid', icon: Users, path: '/admin/students' },
    { name: 'Konten & Harga', icon: Settings, path: '/admin/content' },
    { name: 'Sertifikat', icon: FileText, path: '/admin/certificates' },
    { name: 'Laporan', icon: BarChart, path: '/admin/reports' },
];

const Sidebar = ({ isExpanded, setIsExpanded }) => {
    const navigate = useNavigate();
    return (
        <motion.aside
            initial={false}
            animate={{ width: isExpanded ? 260 : 88 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-col h-screen bg-purple-950/50 backdrop-blur-xl border-r border-white/10 text-white fixed z-50"
        >
            <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-6 h-20 border-b border-white/10 flex-shrink-0`}>
                {isExpanded && <h1 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">ADMIN</h1>}
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `relative flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 group ${isActive ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'hover:bg-white/5 text-white/70'}`}
                    >
                        <item.icon className="w-6 h-6 flex-shrink-0" />
                        {isExpanded && <span className="truncate">{item.name}</span>}
                        {!isExpanded && <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 border border-white/10 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">{item.name}</div>}
                    </NavLink>
                ))}
            </nav>
            <div className="border-t border-white/10 p-4 space-y-2 flex-shrink-0">
                <div className="flex items-center gap-3 p-3">
                    <img src={superAdminData.user.avatar} alt="Admin" className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-purple-400/50" />
                    {isExpanded && <div className="truncate"><h4 className="font-semibold text-sm">{superAdminData.user.name}</h4><p className="text-xs text-white/60">Super Administrator</p></div>}
                </div>
                <button onClick={() => navigate('/')} className="flex items-center gap-4 w-full p-3 rounded-lg text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

// --- TAMBAHAN: Komponen Menu untuk Mobile ---
const MobileMenu = ({ isOpen, closeMenu, navigate }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 flex flex-col p-6"
            >
                <div className="flex items-center justify-between pt-4 pb-8 border-b border-white/10">
                    <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">ADMIN MENU</h1>
                    <button onClick={closeMenu} className="p-2">
                        <X />
                    </button>
                </div>
                <nav className="mt-8 space-y-4 flex-1">
                    {navItems.map(item => (
                        <NavLink key={item.name} to={item.path} onClick={closeMenu}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-lg text-lg transition-colors ${isActive ? 'bg-purple-500/20 text-purple-300' : 'text-white/80 hover:bg-white/5'}`
                            }>
                            <item.icon className="w-6 h-6" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
                <button onClick={() => { navigate('/'); closeMenu(); }} className="flex items-center gap-4 p-4 w-full rounded-lg text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-auto">
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium text-lg">Logout</span>
                </button>
            </motion.div>
        )}
    </AnimatePresence>
);

export const SuperAdminLayout = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    // --- TAMBAHAN: State untuk menu mobile ---
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
                <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[150px] animate-pulse" />
            </div>
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <main className={`relative z-10 transition-[margin-left] duration-300 ease-in-out ${isExpanded ? 'lg:ml-[260px]' : 'lg:ml-[88px]'}`}>
                {/* --- TAMBAHAN: Header untuk Mobile --- */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 h-20">
                    <h1 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">ADMIN</h1>
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2">
                        <Menu />
                    </button>
                </header>
                <div className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
            {/* --- TAMBAHAN: Render komponen menu mobile --- */}
            <MobileMenu isOpen={isMobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} navigate={navigate} />
        </div>
    );
};