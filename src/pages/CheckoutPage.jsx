import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, ArrowLeft, Wallet, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Mengambil state dari navigasi atau menggunakan nilai default untuk mencegah error
    const { slot, mode } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('online');

    // Menetapkan nilai default jika state tidak ada untuk memastikan komponen tetap render
    const displaySlot = slot || 'Senin, 09:00';
    const displayMode = mode || 'online';

    const isCash = paymentMethod === 'cash';
    const basePrice = displayMode === 'online' ? 750000 : 850000;
    // Biaya admin hanya ditambahkan jika metode pembayaran adalah 'cash'
    const adminFee = isCash ? 15000 : 0;
    const totalPrice = basePrice + adminFee;

    // Format harga ke dalam format mata uang Rupiah tanpa desimal
    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(totalPrice);
    }, [totalPrice]);

    const handlePayment = () => {
        const message = isCash
            ? `Booking dikonfirmasi! Total yang harus dibayar tunai saat sesi pertama: ${formattedPrice}`
            : `Simulasi pembayaran online. Anda akan diarahkan ke halaman pembayaran Midtrans. Total: ${formattedPrice}`;
        alert(message);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <main className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-sky-950/20 to-gray-900" />
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"
                    style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, white 10%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-2xl bg-black/30"
                >
                    <div className="grid lg:grid-cols-2">
                        {/* Left Side: Order Summary */}
                        <div className="p-8 lg:p-12 space-y-8 border-b lg:border-r lg:border-b-0 border-white/10">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="size-4" /> Kembali ke pemilihan jadwal
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                    Ringkasan Pesanan
                                </h1>
                                <p className="text-gray-400 mt-2">Satu langkah lagi untuk memulai perjalanan Anda.</p>
                            </div>

                            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
                                <div className="pb-4 border-b border-white/10">
                                    <p className="text-sm text-gray-400">Paket</p>
                                    <p className="text-lg font-semibold text-white">
                                        {displayMode === 'online' ? 'Online Intensive' : 'Offline Reguler'}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Jadwal</span>
                                    <strong className="text-sm text-white">{displaySlot}</strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Metode</span>
                                    <strong className="text-sm text-white">{displayMode.toUpperCase()}</strong>
                                </div>
                            </div>
                            <ul className="space-y-3 text-white/90 text-sm">
                                {[
                                    '8x sesi belajar fleksibel (60 menit)',
                                    'Materi eksklusif & kurikulum terstruktur',
                                    'Sertifikat penyelesaian kursus',
                                    'Akses ke komunitas & event eksklusif'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side: Payment Panel */}
                        <div className="p-8 lg:p-12 flex flex-col justify-between">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-sm text-gray-400 mb-1">Total Pembayaran</h2>
                                    <div className="text-4xl font-bold text-white tracking-tight">{formattedPrice}</div>
                                    <AnimatePresence>
                                        {isCash && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: '8px' }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                className="text-xs text-yellow-400/80"
                                            >
                                                Termasuk biaya administrasi Rp 15.000 untuk pembayaran tunai.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-white">Pilih Metode Pembayaran</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'online', label: 'Online', icon: CreditCard },
                                            { id: 'cash', label: 'Cash', icon: Wallet }
                                        ].map(opt => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setPaymentMethod(opt.id)}
                                                className={`relative flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 overflow-hidden ${paymentMethod === opt.id
                                                    ? 'border-sky-500 text-white'
                                                    : 'border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5'
                                                    }`}
                                            >
                                                {paymentMethod === opt.id && (
                                                    <motion.div layoutId="payment-glow" className="absolute inset-0 bg-sky-500/20 blur-xl" />
                                                )}
                                                <opt.icon className="w-5 h-5 z-10" />
                                                <span className="z-10">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
                                    whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
                                    onClick={handlePayment}
                                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all text-white py-4 rounded-xl text-base font-bold shadow-lg shadow-sky-500/20"
                                >
                                    {isCash ? 'Konfirmasi Booking' : 'Lanjutkan Pembayaran'}
                                </motion.button>

                                <div className="text-xs text-gray-400 text-center">
                                    {isCash ? (
                                        <p>Anda akan membayar langsung kepada tutor saat sesi pertama dimulai.</p>
                                    ) : (
                                        <p className="flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> Transaksi aman & terenkripsi via Midtrans.</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-10 text-xs text-gray-500 text-center">
                                Dengan melanjutkan, Anda menyetujui <a href="#" className="underline hover:text-white">Syarat Ketentuan</a> dan <a href="#" className="underline hover:text-white">Kebijakan Privasi</a>.
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default CheckoutPage;