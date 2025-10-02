import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Mail, Lock, UserPlus, LogIn, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuthPage = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${mode === 'login' ? 'Login' : 'Register'} berhasil sebagai ${form.email}`);
        navigate('/');
    };

    const pageVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.15,
            },
        },
    };
    const panelVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };
    const fieldVariants = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.section
            variants={pageVariants}
            initial="hidden"
            animate="show"
            className="min-h-screen flex items-center justify-center px-6 py-32 lg:py-40 relative bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950 text-white overflow-hidden"
        >
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{
                        maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
                    }}
                />
            </div>

            {/* Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[140px] animate-pulse" />

            {/* Auth Panel */}
            <motion.div
                variants={panelVariants}
                className="relative z-10 grid lg:grid-cols-2 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
            >
                {/* Side Image */}
                <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="hidden lg:block relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60"
                        alt="Study Illustration"
                        className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/40 to-transparent" />
                </motion.div>

                {/* Auth Form */}
                <div className="flex items-center justify-center p-10 lg:p-14">
                    <div className="w-full max-w-md">
                        {/* Mode Toggle */}
                        <div className="flex justify-center gap-4 mb-10">
                            {[{ id: 'login', label: 'Login', icon: LogIn }, { id: 'register', label: 'Register', icon: UserPlus }].map((opt) => (
                                <Button
                                    key={opt.id}
                                    onClick={() => setMode(opt.id)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-semibold backdrop-blur-md transition ${mode === opt.id
                                            ? 'bg-sky-600 text-white border-sky-500 shadow-lg'
                                            : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    <opt.icon className="w-4 h-4" /> {opt.label}
                                </Button>
                            ))}
                        </div>

                        {/* Form Fields */}
                        <motion.form onSubmit={handleSubmit} className="space-y-7">
                            {mode === 'register' && (
                                <motion.div variants={fieldVariants} className="space-y-2">
                                    <label htmlFor="name" className="text-sm text-white/80">Nama Lengkap</label>
                                    <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
                                        <UserPlus className="w-4 h-4 text-sky-400 mr-3" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Nama Anda"
                                            className="bg-transparent flex-1 text-sm focus:outline-none placeholder:text-white/40"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Email */}
                            <motion.div variants={fieldVariants} className="space-y-2">
                                <label htmlFor="email" className="text-sm text-white/80">Email</label>
                                <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
                                    <Mail className="w-4 h-4 text-sky-400 mr-3" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        className="bg-transparent flex-1 text-sm focus:outline-none placeholder:text-white/40"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={fieldVariants} className="space-y-2">
                                <label htmlFor="password" className="text-sm text-white/80">Password</label>
                                <div className="relative flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
                                    <Lock className="w-4 h-4 text-sky-400 mr-3" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="bg-transparent flex-1 text-sm focus:outline-none placeholder:text-white/40"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-white/50 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Submit */}
                            <motion.div variants={fieldVariants}>
                                <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 hover:shadow-xl transition text-white py-3 rounded-xl text-sm font-semibold shadow-lg">
                                    {mode === 'login' ? 'Login' : 'Register'}
                                </Button>
                            </motion.div>
                        </motion.form>

                        {/* Mode Switch Prompt */}
                        <p className="mt-8 text-xs text-center text-white/50">
                            {mode === 'login' ? (
                                <>
                                    Belum punya akun? <button onClick={() => setMode('register')} className="underline hover:text-white">Daftar</button>
                                </>
                            ) : (
                                <>
                                    Sudah punya akun? <button onClick={() => setMode('login')} className="underline hover:text-white">Login</button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default AuthPage;
