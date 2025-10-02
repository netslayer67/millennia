import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PenSquare, Tag, MessageSquare, Save } from 'lucide-react';
import { tutors, pricingPlans, testimonials } from '@/data/landingData';

const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const TutorsTab = () => (
    <motion.div key="tutors" variants={tabVariants} initial="hidden" animate="show" exit="exit" className="space-y-4">
        {tutors.map(tutor => (
            <div key={tutor.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                <img src={tutor.avatar} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <p className="font-semibold">{tutor.name}</p>
                    <p className="text-xs text-white/60">{tutor.specialty}</p>
                </div>
                <Button variant="outline" className="border-sky-500 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300">Edit</Button>
            </div>
        ))}
    </motion.div>
);

const PricingTab = () => (
    <motion.div key="pricing" variants={tabVariants} initial="hidden" animate="show" exit="exit" className="space-y-4">
        {pricingPlans.map(plan => (
            <div key={plan.name} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                <div className="flex-1">
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-xs text-white/60">{plan.price} • {plan.sessions} sesi</p>
                </div>
                <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300">Edit</Button>
            </div>
        ))}
    </motion.div>
);

const TestimonialsTab = () => (
    <motion.div key="testimonials" variants={tabVariants} initial="hidden" animate="show" exit="exit" className="space-y-4">
        {testimonials.map((testimonial, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                <img src={testimonial.avatar} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-white/60 truncate">"{testimonial.quote}"</p>
                </div>
                <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300">Edit</Button>
            </div>
        ))}
    </motion.div>
);


const tabs = [
    { id: 'tutors', label: 'Manajemen Tutor', icon: PenSquare, component: TutorsTab },
    { id: 'pricing', label: 'Manajemen Harga', icon: Tag, component: PricingTab },
    { id: 'testimonials', label: 'Manajemen Testimoni', icon: MessageSquare, component: TestimonialsTab },
];

const ContentManagementPage = () => {
    const [activeTab, setActiveTab] = useState('tutors');
    const ActiveComponent = tabs.find(tab => tab.id === activeTab).component;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Manajemen Konten</h1>
                <p className="text-white/60 mt-1">Ubah konten yang tampil di halaman utama secara dinamis.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-4 backdrop-blur-xl space-y-2">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 w-full p-4 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/5'}`}>
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </aside>
                <main className="lg:col-span-3 bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <ActiveComponent />
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default ContentManagementPage;