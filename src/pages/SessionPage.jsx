import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video, VideoOff, Mic, MicOff, MessageSquare, Phone, Users, Share2, Edit3, Timer, User, Star, X, Menu
} from 'lucide-react';

// =================================================================================
// 🎨 --- Helper & Reusable Components ---
// =================================================================================

const ControlButton = ({ tooltip, onClick, children, danger = false, className = '' }) => (
    <div className="relative group">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-colors duration-300 ${danger
                ? 'bg-red-500/80 text-white hover:bg-red-500'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                } ${className}`}
        >
            {children}
        </motion.button>
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
            {tooltip}
        </div>
    </div>
);

const GlassmorphismCard = ({ children, className = '', ...props }) => (
    <div
        className={`bg-gray-950/50 backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
        {...props}
    >
        {children}
    </div>
);


// =================================================================================
// 🧩 --- Lazy Loaded Main Components ---
// =================================================================================
// In a real project, these would be in separate files inside a 'components' folder.

const LazyHeader = lazy(() => Promise.resolve({ default: SessionHeader }));
const LazyVideoGrid = lazy(() => Promise.resolve({ default: VideoGrid }));
const LazySidebar = lazy(() => Promise.resolve({ default: SidebarPanel }));
const LazyControlBar = lazy(() => Promise.resolve({ default: ControlBar }));


// =================== SessionHeader Component ===================
const SessionHeader = ({ timeLeft, setSidebarOpen, formatTime }) => (
    <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex justify-between items-center"
    >
        <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">TOEFL Speaking Practice</h1>
        </div>
        <div className="flex items-center gap-3">
            <GlassmorphismCard className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-sky-300">
                <Timer className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
            </GlassmorphismCard>
            <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <Menu className="w-5 h-5" />
            </button>
        </div>
    </motion.header>
);

// =================== VideoGrid Component ===================
const ParticipantCard = ({ p }) => (
    <motion.div
        layout
        variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1 }
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative aspect-video rounded-xl overflow-hidden bg-black/50 flex items-center justify-center transition-all duration-300
        ${p.isSpeaking ? 'border-2 border-sky-400 shadow-2xl shadow-sky-500/20 ring-4 ring-sky-500/20' : 'border border-white/10'}`}
    >
        {p.isVideoOn ? (
            <div className="w-full h-full bg-gray-800" /> // Placeholder for actual <video> tag
        ) : (
            <div className="flex flex-col items-center gap-2">
                <User className="w-12 h-12 text-white/20" />
                <VideoOff className="w-6 h-6 text-white/50" />
            </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
            {p.isSpeaking && <motion.div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
            {p.name}
        </div>
    </motion.div>
);

const VideoGrid = ({ participants }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-6 pt-24 pb-32"
    >
        {participants.map(p => <ParticipantCard key={p.id} p={p} />)}
    </motion.div>
);

// =================== SidebarPanel Component ===================
const SidebarPanel = ({ isOpen, setOpen, participants }) => {
    const [activeTab, setActiveTab] = useState('chat');

    const TabButton = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`relative flex-1 p-3 flex flex-col sm:flex-row justify-center items-center gap-2 text-sm font-medium transition-colors rounded-lg ${activeTab === id ? 'text-sky-300 bg-black/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
        >
            {icon}
            <span className="text-xs sm:text-sm">{label}</span>
            {activeTab === id && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" layoutId="activeTabIndicator" />}
        </button>
    );

    const ChatPanel = () => (
        <div className="text-sm space-y-4 flex flex-col h-full">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                <div className="p-3 rounded-lg bg-black/20 text-left"><b className="text-sky-400 block font-semibold">Emily (Tutor):</b>Welcome! Ready to start the TOEFL practice session? Let's focus on Question 1 first.</div>
                <div className="p-3 rounded-lg bg-green-900/30 text-right"><b className="text-green-400 block font-semibold">You:</b>Yes, I'm ready! Let's do it. 🙌</div>
            </div>
            <div className="mt-auto pt-2">
                <input type="text" placeholder="Type a message..." className="w-full text-sm px-3 py-2.5 rounded-md bg-white/10 placeholder-gray-500 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
            </div>
        </div>
    );

    const ParticipantsPanel = () => (
        <ul className="space-y-4">
            {participants.map(p => <li key={p.id} className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                <span className={`flex items-center gap-3 ${p.isTutor ? 'text-sky-300 font-semibold' : 'text-white'}`}>
                    {p.isTutor ? <Star size={16} /> : <User size={16} />}
                    {p.name}
                </span>
                <Mic className={`w-5 h-5 ${p.isSpeaking ? 'text-green-400 animate-pulse' : 'text-gray-600'}`} />
            </li>)}
        </ul>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    />
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ ease: 'easeInOut', duration: 0.4 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm z-40 flex flex-col"
                    >
                        <GlassmorphismCard className="w-full h-full flex flex-col rounded-l-2xl rounded-r-none">
                            <div className="flex items-center justify-between border-b border-white/10 p-4">
                                <h2 className="font-bold text-lg">Session Panel</h2>
                                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex border-b border-white/10 p-1.5 gap-1.5">
                                <TabButton id="chat" icon={<MessageSquare size={16} />} label="Chat" />
                                <TabButton id="participants" icon={<Users size={16} />} label={`Participants (${participants.length})`} />
                            </div>
                            <div className="flex-1 p-4 overflow-y-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="h-full">
                                        {activeTab === 'chat' && <ChatPanel />}
                                        {activeTab === 'participants' && <ParticipantsPanel />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </GlassmorphismCard>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

// =================== ControlBar Component ===================
const ControlBar = ({ isMicOn, setMicOn, isVideoOn, setVideoOn }) => (
    <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
    >
        <GlassmorphismCard className="flex items-center gap-2 sm:gap-3 p-2 shadow-2xl shadow-black/30">
            <ControlButton tooltip="Toggle Mic" onClick={() => setMicOn(!isMicOn)}>{isMicOn ? <Mic size={22} /> : <MicOff size={22} />}</ControlButton>
            <ControlButton tooltip="Toggle Video" onClick={() => setVideoOn(!isVideoOn)}>{isVideoOn ? <Video size={22} /> : <VideoOff size={22} />}</ControlButton>
            <div className="h-8 w-px bg-white/10 mx-1"></div>
            <ControlButton tooltip="Share Screen" onClick={() => { }}><Share2 size={22} /></ControlButton>
            <ControlButton tooltip="Whiteboard" onClick={() => { }}><Edit3 size={22} /></ControlButton>
            <div className="h-8 w-px bg-white/10 mx-1"></div>
            <ControlButton tooltip="Leave Session" onClick={() => alert("Leaving session...")} danger><Phone size={22} /></ControlButton>
        </GlassmorphismCard>
    </motion.div>
);


// =================================================================================
// 🚀 --- Main Session Page Component ---
// =================================================================================

const SessionPage = () => {
    const [isMicOn, setMicOn] = useState(true);
    const [isVideoOn, setVideoOn] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45 * 60);

    const [participants, setParticipants] = useState([
        { id: 1, name: 'Emily (Tutor)', isTutor: true, isSpeaking: true, isVideoOn: true },
        { id: 2, name: 'You', isTutor: false, isSpeaking: false, isVideoOn: true },
        { id: 3, name: 'David Lee', isTutor: false, isSpeaking: false, isVideoOn: false },
        { id: 4, name: 'Sarah Chen', isTutor: false, isSpeaking: false, isVideoOn: true },
    ]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        // Initially open sidebar on larger screens
        if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
        }
    }, [])

    const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-950 font-sans text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]" style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }} />
                <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px] animate-pulse" />
            </div>

            {/* Main Layout */}
            <div className="relative flex flex-1 overflow-hidden">
                <main className={`flex-1 overflow-y-auto transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:mr-[384px]' : 'lg:mr-0'}`}>
                    <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-gray-400">Loading Interface...</div>}>
                        <LazyHeader timeLeft={timeLeft} formatTime={formatTime} setSidebarOpen={setSidebarOpen} />
                        <LazyVideoGrid participants={participants} />
                        <LazyControlBar isMicOn={isMicOn} setMicOn={setMicOn} isVideoOn={isVideoOn} setVideoOn={setVideoOn} />
                    </Suspense>
                </main>

                <Suspense fallback={<div />}>
                    <LazySidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} participants={participants} />
                </Suspense>
            </div>
        </div>
    );
};

export default SessionPage;