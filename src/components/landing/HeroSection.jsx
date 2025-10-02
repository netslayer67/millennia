import React, { memo, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Users, GraduationCap, Sparkles } from 'lucide-react';

// ---------- Motion variants (moved out to avoid re-creation on each render) ----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.9, 0.1, 1] },
  },
};

const blobVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.2, 0.9, 0.1, 1] },
  },
};

// ---------- Helper: map color name to compiled Tailwind-safe classes ----------
const COLOR_MAP = Object.freeze({
  primary: {
    ring: 'ring-primary/30',
    text: 'text-primary',
    bg: 'from-primary to-gold',
    borderHover: 'hover:border-primary/40',
  },
  emerald: {
    text: 'text-emerald',
    borderHover: 'hover:border-emerald/50',
  },
  gold: {
    text: 'text-gold',
    borderHover: 'hover:border-gold/40',
  },
});

const HERO_BG = '/bg.webp';

const HeroSection = ({ scrollToSection }) => {
  // Respect OS-level reduced motion preferences
  const shouldReduceMotion = useReducedMotion();

  // Stable callbacks to avoid re-renders in memoized children
  const onEnroll = useCallback(() => scrollToSection?.('enrollment'), [scrollToSection]);
  const onPrograms = useCallback(() => scrollToSection?.('programs'), [scrollToSection]);

  // Stats list memoized so mapping doesn't recreate shapes each render
  const stats = useMemo(
    () => [
      { Icon: Users, value: '500+', label: 'Students', color: 'primary' },
      { Icon: GraduationCap, value: '98%', label: 'Success', color: 'emerald' },
      { Icon: Award, value: '15+', label: 'Awards', color: 'gold' },
    ],
    []
  );

  /*
    Notes on grid background sizing: avoid runtime window reads (SSR break & reflows).
    Tailwind arbitrary value classes provide the responsive background-size without JS.
  */

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Background Image Layer with Blur. Keep presentation identical but avoid reflows */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            filter: 'blur(2px)',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" aria-hidden />
      </div>

      {/* Decorative blobs - motion respects reduced-motion preference */}
      <motion.div
        variants={blobVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? false : 'visible'}
        className="absolute -top-24 -left-24 h-[450px] w-[450px] rounded-full bg-primary/20 blur-[80px] animate-blob-left"
        aria-hidden="true"
      />

      <motion.div
        variants={blobVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? false : 'visible'}
        className="absolute top-1/4 right-0 h-[380px] w-[380px] rounded-full bg-gold/16 blur-[70px] animate-blob-right"
        aria-hidden="true"
      />

      <motion.div
        variants={blobVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? false : 'visible'}
        className="absolute bottom-0 -right-20 h-[420px] w-[420px] rounded-full bg-emerald/18 blur-[75px] animate-blob-left"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />

      {/* Luxury Grid Pattern: responsive background-size purely via Tailwind classes, no JS */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" aria-hidden>
        <div
          className={
            'absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] ' +
            'bg-[length:40px_40px] md:bg-[length:56px_56px] '
          }
          style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)' }}
        />
      </div>

      {/* Main Content (motion container) */}
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-7">
            {/* Premium Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="glass glass-card group inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-glass-md cursor-default">
                <div className="glass__noise" />
                <Sparkles className="h-4 w-4 text-gold transition-all duration-300 group-hover:text-primary group-hover:rotate-12" />
                <span className="text-sm font-semibold text-foreground">Excellence Since 2021</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              Shaping Tomorrow's
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">Global Leaders</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              World-class international curriculum with personalized learning paths. <span className="font-semibold text-foreground">Achieving High Standards</span> through innovation, character, and academic excellence.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-1">
              <button
                onClick={onEnroll}
                className="group relative overflow-hidden bg-primary text-primary-foreground rounded-xl px-7 py-4 font-bold shadow-glass-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] border border-primary/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  Enroll Now
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={onPrograms}
                className={`group glass glass-card backdrop-blur-sm px-7 py-4 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 ${COLOR_MAP.emerald.borderHover} hover:scale-[1.02]`}
              >
                <div className="glass__noise" />
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-foreground group-hover:text-emerald transition-colors duration-300">
                  Explore Programs
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-3 lg:mt-5">
              {stats.map((stat, idx) => {
                const color = stat.color;
                const borderHoverClass = COLOR_MAP[color]?.borderHover ?? '';
                const iconClass = (COLOR_MAP[color]?.text ?? '') + ' transition-transform duration-300 group-hover:scale-110';

                return (
                  <div
                    key={stat.label}
                    className={`glass glass-card hover-lift group p-3 sm:p-4 lg:p-5 transition-all duration-300 ${borderHoverClass} cursor-default`}
                  >
                    <div className="glass__refract" />
                    <div className="glass__noise" />
                    <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-1.5">
                      <stat.Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconClass}`} />
                      <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground">{stat.value}</span>
                      <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground font-medium">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Visual: hidden on small screens. Image is lazy-loaded to avoid blocking LCP on mobile. */}
          <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-5 relative">
            <div className="glass glass--deep glass--frosted sheen-animate relative rounded-3xl p-3 shadow-glass-lg">
              <div className="glass__refract" />
              <div className="glass__refract--soft" />
              <div className="glass__noise" />

              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-primary/5 to-gold/5">
                <img
                  src={HERO_BG}
                  alt="Premium education at Millennia World School"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="1066"
                  fetchPriority="low"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass glass-card backdrop-blur-xl p-4 hover:border-gold/40 transition-all duration-300">
                    <div className="glass__noise" />
                    <div className="flex items-center gap-3.5">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center ${COLOR_MAP.primary.ring}`}>
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground leading-tight">Achieving High Standards</p>
                        <p className="text-xs text-muted-foreground mt-0.5">International Accreditation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Accent Cards */}
            <motion.div variants={itemVariants} className="absolute -top-4 -right-4 glass glass-card p-5 w-28 shadow-glass-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className="glass__noise" />
              <div className="text-center">
                <p className="text-3xl font-extrabold bg-gradient-to-br from-primary to-gold bg-clip-text text-transparent">A+</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Rating</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="absolute -bottom-4 -left-4 glass glass-card p-5 w-32 shadow-glass-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className="glass__noise" />
              <div className="text-center">
                <p className="text-3xl font-extrabold text-emerald">Top 1%</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Globally</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default memo(HeroSection);
