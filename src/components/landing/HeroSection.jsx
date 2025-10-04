import React, { memo, useMemo, useCallback, useRef } from 'react';
import { m, useReducedMotion, LazyMotion, domAnimation } from 'framer-motion';
import { ArrowRight, Award, Users, GraduationCap, Sparkles } from 'lucide-react';

// ---------- Optimized Motion variants (frozen objects to prevent recreation) ----------
const motionVariants = Object.freeze({
  container: Object.freeze({
    hidden: { opacity: 0 },
    visible: Object.freeze({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    }),
  }),
  item: Object.freeze({
    hidden: { opacity: 0, y: 30 },
    visible: Object.freeze({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.9, 0.1, 1] },
    }),
  }),
  blob: Object.freeze({
    hidden: { opacity: 0, scale: 0.85 },
    visible: Object.freeze({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: [0.2, 0.9, 0.1, 1] },
    }),
  }),
});

// ---------- Optimized color mapping with pre-computed classes ----------
const COLOR_CLASSES = Object.freeze({
  primary: Object.freeze({
    ring: 'ring-primary/30',
    text: 'text-primary',
    bg: 'from-primary to-gold',
    borderHover: 'hover:border-primary/40',
    iconClass: 'text-primary transition-transform duration-300 group-hover:scale-110',
    borderClass: 'glass glass-card hover-lift group p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:border-primary/40 cursor-default',
  }),
  emerald: Object.freeze({
    text: 'text-emerald',
    borderHover: 'hover:border-emerald/50',
    iconClass: 'text-emerald transition-transform duration-300 group-hover:scale-110',
    borderClass: 'glass glass-card hover-lift group p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:border-emerald/50 cursor-default',
  }),
  gold: Object.freeze({
    text: 'text-gold',
    borderHover: 'hover:border-gold/40',
    iconClass: 'text-gold transition-transform duration-300 group-hover:scale-110',
    borderClass: 'glass glass-card hover-lift group p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:border-gold/40 cursor-default',
  }),
});

// ---------- Static constants ----------
const HERO_BG = '/bg.webp';
const GRID_BACKGROUND = 'absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[length:40px_40px] md:bg-[length:56px_56px]';
const MASK_STYLE = Object.freeze({ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)' });

// ---------- Memoized StatCard component ----------
const StatCard = memo(({ stat, colorConfig }) => (
  <div className={colorConfig.borderClass}>
    <div className="glass__refract" />
    <div className="glass__noise" />
    <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-1.5">
      <stat.Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorConfig.iconClass}`} />
      <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground">{stat.value}</span>
      <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground font-medium">{stat.label}</span>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';

// ---------- Memoized FloatingCard component ----------
const FloatingCard = memo(({ className, children, variants }) => (
  <m.div
    variants={variants}
    className={`absolute glass glass-card shadow-glass-md hover:-translate-y-1 transition-all duration-300 cursor-default ${className}`}
  >
    <div className="glass__noise" />
    <div className="text-center">
      {children}
    </div>
  </m.div>
));
FloatingCard.displayName = 'FloatingCard';

// ---------- Memoized BackgroundBlob component ----------
const BackgroundBlob = memo(({ className, shouldReduceMotion, style = {} }) => (
  <m.div
    variants={motionVariants.blob}
    initial={shouldReduceMotion ? false : 'hidden'}
    animate={shouldReduceMotion ? false : 'visible'}
    className={className}
    style={style}
    aria-hidden="true"
  />
));
BackgroundBlob.displayName = 'BackgroundBlob';

// ---------- Main HeroSection component ----------
const HeroSection = ({ scrollToSection }) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Memoized stable callbacks
  const handleEnroll = useCallback(() => scrollToSection?.('enrollment'), [scrollToSection]);
  const handlePrograms = useCallback(() => scrollToSection?.('programs'), [scrollToSection]);

  // Pre-computed stats with color configurations
  const statsWithConfig = useMemo(() => [
    {
      Icon: Users,
      value: '500+',
      label: 'Students',
      colorConfig: COLOR_CLASSES.primary
    },
    {
      Icon: GraduationCap,
      value: '98%',
      label: 'Success',
      colorConfig: COLOR_CLASSES.emerald
    },
    {
      Icon: Award,
      value: '15+',
      label: 'Awards',
      colorConfig: COLOR_CLASSES.gold
    },
  ], []);

  // Memoized background image style
  const backgroundImageStyle = useMemo(() => ({
    backgroundImage: `url(${HERO_BG})`,
    filter: 'blur(2px)',
  }), []);

  // Memoized blob animation style
  const blobDelayStyle = useMemo(() => ({ animationDelay: '1.5s' }), []);

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        ref={sectionRef}
        className="relative isolate min-h-screen w-full overflow-hidden"
      >
        {/* Optimized Background Layer */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={backgroundImageStyle}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" aria-hidden="true" />
        </div>

        {/* Optimized Decorative blobs */}
        <BackgroundBlob
          className="absolute -top-24 -left-24 h-[450px] w-[450px] rounded-full bg-primary/20 blur-[80px] animate-blob-left"
          shouldReduceMotion={shouldReduceMotion}
        />
        <BackgroundBlob
          className="absolute top-1/4 right-0 h-[380px] w-[380px] rounded-full bg-gold/16 blur-[70px] animate-blob-right"
          shouldReduceMotion={shouldReduceMotion}
        />
        <BackgroundBlob
          className="absolute bottom-0 -right-20 h-[420px] w-[420px] rounded-full bg-emerald/18 blur-[75px] animate-blob-left"
          shouldReduceMotion={shouldReduceMotion}
          style={blobDelayStyle}
        />

        {/* Optimized Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <div className={GRID_BACKGROUND} style={MASK_STYLE} />
        </div>

        {/* Main Content Container */}
        <m.div
          variants={motionVariants.container}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Left Content Section */}
            <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-7">

              {/* Premium Badge */}
              <m.div variants={motionVariants.item} className="inline-flex">
                <div className="glass glass-card group inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-glass-md cursor-default">
                  <div className="glass__noise" />
                  <Sparkles className="h-4 w-4 text-gold transition-all duration-300 group-hover:text-primary group-hover:rotate-12" />
                  <span className="text-sm font-semibold text-foreground">Excellence Since 2017</span>
                </div>
              </m.div>

              {/* Main Headline */}
              <m.h1
                variants={motionVariants.item}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
              >
                Shaping Tomorrow's
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                  Global Leaders
                </span>
              </m.h1>

              {/* Subheadline */}
              <m.p
                variants={motionVariants.item}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                World-class international curriculum with personalized learning paths. {' '}
                <span className="font-semibold text-foreground">Achieving High Standards</span> {' '}
                through innovation, character, and academic excellence.
              </m.p>

              {/* Call-to-Action Buttons */}
              <m.div variants={motionVariants.item} className="flex flex-col sm:flex-row gap-3 mt-1">
                <button
                  onClick={handleEnroll}
                  className="group relative overflow-hidden bg-primary text-primary-foreground rounded-xl px-7 py-4 font-bold shadow-glass-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] border border-primary/30"
                  type="button"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    Enroll Now
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                  onClick={handlePrograms}
                  className="group glass glass-card backdrop-blur-sm px-7 py-4 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:scale-[1.02]"
                  type="button"
                >
                  <div className="glass__noise" />
                  <span className="relative z-10 flex items-center justify-center gap-2.5 text-foreground group-hover:text-emerald transition-colors duration-300">
                    Explore Programs
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </button>
              </m.div>

              {/* Optimized Stats Grid */}
              <m.div variants={motionVariants.item} className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-3 lg:mt-5">
                {statsWithConfig.map((stat) => (
                  <StatCard
                    key={stat.label}
                    stat={stat}
                    colorConfig={stat.colorConfig}
                  />
                ))}
              </m.div>
            </div>

            {/* Right Visual Section - Desktop Only */}
            <m.div variants={motionVariants.item} className="hidden lg:block lg:col-span-5 relative">
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

                  {/* Overlay Card */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="glass glass-card backdrop-blur-xl p-4 hover:border-gold/40 transition-all duration-300">
                      <div className="glass__noise" />
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center ring-primary/30">
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
              <FloatingCard
                className="-top-4 -right-4 p-5 w-28"
                variants={motionVariants.item}
              >
                <p className="text-3xl font-extrabold bg-gradient-to-br from-primary to-gold bg-clip-text text-transparent">A+</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Rating</p>
              </FloatingCard>

              <FloatingCard
                className="-bottom-4 -left-4 p-5 w-32"
                variants={motionVariants.item}
              >
                <p className="text-3xl font-extrabold text-emerald">Top 1%</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Globally</p>
              </FloatingCard>
            </m.div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

HeroSection.displayName = 'HeroSection';

export default memo(HeroSection);
