import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

const CtaSection = ({ handleCTAClick }) => {
  return (
    <section className="relative isolate py-36 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
          }}
        />
      </div>

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[130px] animate-pulse" />

      {/* Blob Animations */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-sky-400 opacity-30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-bounce z-0" />
      <motion.svg
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 opacity-10 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#0ea5e9"
          d="M53.2,-59.7C65.4,-44.9,68.8,-22.5,66.1,-2.4C63.5,17.6,54.7,35.2,42.5,49.3C30.3,63.5,15.2,74.3,-2.6,77.5C-20.3,80.7,-40.5,76.4,-53.1,63.1C-65.7,49.7,-70.8,27.4,-70.5,6.6C-70.3,-14.3,-64.7,-33.6,-52.5,-48.6C-40.3,-63.7,-20.1,-74.4,1.5,-75.7C23.1,-77,46.2,-68.6,53.2,-59.7Z"
          transform="translate(100 100)"
        />
      </motion.svg>

      {/* Particle Background (Stars) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-[float_10s_linear_infinite] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      {/* Main CTA Box */}
      <div className="container-max px-6 relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-10 py-20 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-sky-700/30 transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium text-sky-300 bg-white/10 border border-white/10 backdrop-blur shadow">
              <Sparkles className="w-4 h-4" />
              #BelajarLebihPersonal
            </div>
          </div>

          {/* CTA Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Learn English <span className="text-sky-400">correctly</span> with Correctly
          </h2>

          {/* Subcopy */}
          <p className="text-lg text-white/80 font-light mb-10">
            Mulai perjalanan belajar Anda dengan sesi gratis 15 menit bersama tutor pilihan.
            Rasakan pendekatan yang personal, terstruktur, dan berdampak nyata.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => handleCTAClick('start-free-trial')}
              className="px-6 py-3 text-base font-semibold bg-sky-500 text-white rounded-xl hover:bg-sky-400 hover:scale-[1.05] transition-all duration-300 shadow-md"
            >
              Mulai Free Trial
              <ArrowRight className="size-4 ml-2" />
            </Button>
            <Button
              onClick={() => handleCTAClick('whatsapp')}
              className="px-6 py-3 text-base border border-white/20 text-white/90 hover:bg-white/10 hover:scale-[1.05] rounded-xl transition-all duration-300"
            >
              <MessageCircle className="size-4 mr-2" />
              Hubungi via WhatsApp
            </Button>
          </div>

          {/* Garansi */}
          <p className="text-sm text-white/60 mt-8">
            Tanpa Risiko • 100% Garansi Kepuasan • Free Trial 15 Menit Pertama
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
