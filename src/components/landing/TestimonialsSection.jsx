import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const TestimonialCard = ({ name, role, content, className }) => (
  <div
    className={cn(
      'relative w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white p-6 shadow-lg hover:shadow-xl transition-all duration-300',
      className
    )}
  >
    <Quote className="size-6 text-sky-400 mb-4" />
    <blockquote className="text-white/80 text-base leading-relaxed">
      “{content}”
    </blockquote>
    <figcaption className="mt-6">
      <div className="font-semibold text-white">{name}</div>
      <div className="text-sm text-white/60">{role}</div>
    </figcaption>
  </div>
);

const TestimonialsSection = ({ testimonials }) => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative isolate w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black py-28 text-white"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
          }}
        />
      </div>

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[130px] animate-pulse" />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold md:text-5xl tracking-tight"
        >
          Kisah Sukses dari <span className="text-sky-400">Murid Kami</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-white/70"
        >
          Pengalaman nyata mereka yang berhasil berkembang bersama tutor profesional dari Correctly.
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative mt-20 overflow-hidden">
        {/* Fading edge effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/60 to-transparent z-20 pointer-events-none" />

        {/* Auto-scroll slider */}
        <motion.div
          className="flex gap-6 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 50,
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
