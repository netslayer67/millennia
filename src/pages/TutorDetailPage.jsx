import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Star, MapPin, BookOpen, Award,
    Globe, School, ArrowLeft, BadgeCheck, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const dummyTutors = [
    {
        id: '1',
        name: 'Sarah Johnson',
        specialization: 'IELTS & Academic Writing',
        rating: 4.9,
        location: 'Jakarta',
        level: 'Advanced',
        experience: '5 tahun',
        imageUrl: 'https://images.unsplash.com/photo-1660485344976-e24706f5ba78',
        pricing: {
            online: [
                { label: '🎯 Trial 30min', price: 'Rp 50rb' },
                { label: '🔥 Intensive 4x/week', price: 'Rp 750rb' },
            ],
            offline: [
                { label: '📍 1x pertemuan (60min)', price: 'Rp 120rb' },
                { label: '📚 8x Offline Reguler', price: 'Rp 850rb' },
            ]
        },
        highlights: [
            'Sertifikasi TESOL & IELTS Trainer Resmi',
            'Berpengalaman dengan lebih dari 400 siswa',
            'Metode belajar fun & interaktif berbasis goals siswa',
            'Mampu mengajar secara bilingual (EN/ID)'
        ],
        schedule: {
            days: ['Senin', 'Selasa', 'Rabu'],
            times: ['09:00', '13:00', '19:00']
        }
    }
];

const TutorDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [mode, setMode] = useState('online');

    const tutor = dummyTutors.find((t) => t.id === id);
    if (!tutor) return <div className="text-center text-white py-20">Guru tidak ditemukan.</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 md:px-16 py-28"
        >
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
                />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <Button onClick={() => navigate(-1)} variant="ghost" className="mb-10 text-white hover:text-sky-400 hover:bg-transparent transition">
                    <ArrowLeft className="mr-2 size-4" /> Kembali ke Daftar Guru
                </Button>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Tutor Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img src={tutor.imageUrl} alt={tutor.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white rounded-full flex items-center gap-1">
                            <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
                            {tutor.rating}
                        </div>
                    </motion.div>

                    {/* Tutor Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl font-extrabold mb-1">{tutor.name}</h1>
                            <p className="text-sky-400 text-lg">{tutor.specialization}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
                            <div className="flex items-center"><MapPin className="size-4 mr-2" /> {tutor.location}</div>
                            <div className="flex items-center"><BookOpen className="size-4 mr-2" /> Level {tutor.level}</div>
                            <div className="flex items-center"><Award className="size-4 mr-2" /> {tutor.experience} pengalaman</div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <BadgeCheck className="size-5" /> Tentang Tutor
                            </h3>
                            <ul className="list-disc pl-6 text-white/80 space-y-1">
                                {tutor.highlights.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Mode Belajar */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Clock className="size-5" /> Pilih Mode Belajar
                            </h3>
                            <div className="flex gap-4">
                                {['online', 'offline'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setMode(opt)}
                                        className={`px-5 py-2 rounded-full border transition text-sm font-medium ${mode === opt ? 'bg-sky-600 text-white border-sky-500' : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'}`}
                                    >
                                        {opt === 'online' ? 'Online' : 'Offline'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Paket Harga */}
                        {tutor.pricing?.[mode]?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                    {mode === 'online' ? <Globe className="size-4" /> : <School className="size-4" />} Paket {mode === 'online' ? 'Online' : 'Offline'}
                                </h3>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                                    {tutor.pricing[mode].map((item, i) => (
                                        <div key={i} className="flex justify-between">
                                            <span>{item.label}</span>
                                            <span className="text-sky-300">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Jadwal */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Clock className="size-5" /> Jadwal Tersedia
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                {tutor.schedule.days.map((day) =>
                                    tutor.schedule.times.map((time) => {
                                        const slot = `${day} ${time} (${mode})`;
                                        const selected = selectedSlot === slot;
                                        return (
                                            <button
                                                key={slot}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`rounded-xl px-4 py-2 border transition ${selected ? 'bg-sky-600 text-white border-sky-500' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/20'}`}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Tombol Booking */}
                        <div className="pt-4">
                            <Button
                                onClick={() => navigate('/checkout', {
                                    state: { slot: selectedSlot, mode }
                                })}
                                className="bg-sky-600 hover:bg-sky-500 w-full text-base py-6 font-semibold transition"
                                disabled={!selectedSlot}
                            >
                                {selectedSlot ? `Booking: ${selectedSlot}` : 'Pilih Jadwal & Mode Belajar'}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default TutorDetailPage;
