// src/pages/TeacherSchedulePage.jsx
import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import id from 'date-fns/locale/id';
import { motion } from 'framer-motion';
import { calendarEvents } from '@/data/teacherData'; // Ensure data path is correct
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button'; // Ensure component path is correct
import { PlusCircle } from 'lucide-react';

// --- LOCALIZATION SETUP ---
const locales = { 'id': id };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: id }),
    getDay,
    locales,
});

// --- CUSTOM STYLING FOR CALENDAR EVENTS ---
// DESIGN UPGRADE: More subtle and modern event styles.
const eventStyleGetter = (event) => {
    let style = {
        borderRadius: '6px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        padding: '2px 8px',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    };
    if (event.type === 'booked') {
        style.backgroundColor = 'rgba(56, 189, 248, 0.8)'; // Sky
        style.borderLeft = '3px solid rgba(125, 211, 252, 1)';
    } else if (event.type === 'available') {
        style.backgroundColor = 'rgba(16, 185, 129, 0.7)'; // Emerald
        style.borderLeft = '3px solid rgba(52, 211, 153, 1)';
    } else {
        style.backgroundColor = 'rgba(239, 68, 68, 0.7)'; // Red
        style.borderLeft = '3px solid rgba(248, 113, 113, 1)';
    }
    return { style };
};

// --- MAIN PAGE COMPONENT ---
const TeacherSchedulePage = () => {
    // FIX: Memoize the conversion of date strings to Date objects.
    const events = useMemo(() => calendarEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
    })), []); // Dependency array can be empty if calendarEvents is static

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

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-8"
            >
                {/* Page Header */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Manajemen Jadwal</h1>
                        <p className="text-white/60 mt-2 text-base">Atur ketersediaan dan lihat jadwal mengajarmu secara visual.</p>
                    </div>
                    <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white gap-2 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 hover:scale-105">
                        <PlusCircle className="w-5 h-5" /> Atur Ketersediaan
                    </Button>
                </div>

                {/* Calendar Container */}
                <div className="h-[75vh] bg-gray-900/50 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-xl rbc-pro-style">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        culture='id'
                        eventPropGetter={eventStyleGetter}
                        messages={{
                            next: "Berikutnya",
                            previous: "Sebelumnya",
                            today: "Hari Ini",
                            month: "Bulan",
                            week: "Minggu",
                            day: "Hari",
                            agenda: "Agenda",
                            showMore: total => `+${total} lainnya`
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default TeacherSchedulePage;