import React, { memo, useMemo, useEffect, useRef, useState } from "react";

const AFFILIATIONS = [
  { id: 1, name: "Partner 1", logo: "/1.jpg" },
  { id: 2, name: "Partner 2", logo: "/2.jpg" },
  { id: 3, name: "Partner 3", logo: "/3.jpg" },
  { id: 4, name: "Partner 4", logo: "/4.jpg" },
  { id: 5, name: "Partner 5", logo: "/5.jpg" },
  { id: 6, name: "Partner 6", logo: "/6.jpg" },
  { id: 7, name: "Partner 7", logo: "/7.jpg" },
  { id: 8, name: "Partner 8", logo: "/8.jpg" },
  { id: 9, name: "Partner 9", logo: "/9.jpg" },
];

// Decorative Blob Component (GPU-optimized)
const DecorativeBlob = memo(({ className, delay = 0, duration = 12 }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    style={{
      background: `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--gold)) 50%, transparent 70%)`,
      animation: `blobFloat ${duration}s ease-in-out ${delay}s infinite`,
      willChange: 'transform',
    }}
    aria-hidden="true"
  />
));
DecorativeBlob.displayName = "DecorativeBlob";

// Logo Card Component (optimized render)
const LogoCard = memo(({ logo, name, index, isMobile }) => (
  <div
    className="glass glass--frosted hover-lift group flex-shrink-0 rounded-2xl transition-all duration-300 relative overflow-hidden"
    style={{
      width: isMobile ? '140px' : 'clamp(160px, 16vw, 200px)',
      height: isMobile ? '140px' : 'clamp(160px, 16vw, 200px)',
      border: '1px solid hsl(var(--border) / 0.2)',
      scrollSnapAlign: isMobile ? 'center' : 'unset',
    }}
  >
    {/* Refract layers for liquid glass effect */}
    <div className="glass__refract" />
    <div className="glass__refract--soft" />
    <div className="glass__noise" />

    {/* Content */}
    <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
      <img
        src={logo}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 group-hover:scale-105"
      />
    </div>

    {/* Hover glow effect */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
      style={{ background: 'hsl(var(--gold) / 0.15)' }}
      aria-hidden="true"
    />

    {/* Hover border accent */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--gold) / 0.1))',
        boxShadow: 'inset 0 0 20px hsl(var(--gold) / 0.2)'
      }}
      aria-hidden="true"
    />
  </div>
));
LogoCard.displayName = "LogoCard";

// Stat Card Component
const StatCard = memo(({ value, label }) => (
  <div
    className="glass glass--deep text-center rounded-2xl transition-all duration-300 hover-lift group relative overflow-hidden"
    style={{
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      border: '1px solid hsl(var(--border) / 0.3)',
    }}
  >
    <div className="glass__noise" />
    <div className="relative z-10">
      <div
        className="font-bold mb-2 transition-all duration-300 group-hover:scale-110"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'hsl(var(--primary))',
          textShadow: '0 0 20px hsl(var(--primary) / 0.3)',
        }}
      >
        {value}
      </div>
      <div
        className="font-medium uppercase tracking-wider transition-colors duration-300"
        style={{
          fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        {label}
      </div>
    </div>

    {/* Hover gradient overlay */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.05), transparent 70%)',
      }}
      aria-hidden="true"
    />
  </div>
));
StatCard.displayName = "StatCard";

const TestimonialSection = memo(() => {
  const logos = useMemo(() => AFFILIATIONS, []);
  const duplicated = useMemo(() => [...logos, ...logos, ...logos], [logos]);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const trackerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsMobile(mediaQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    const handleMotion = (e) => setPrefersReducedMotion(e.matches);

    mediaQuery.addEventListener('change', handleResize);
    motionQuery.addEventListener('change', handleMotion);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
      motionQuery.removeEventListener('change', handleMotion);
    };
  }, []);

  const stats = useMemo(() => [
    { value: "9+", label: "Global Partners" },
    { value: "25+", label: "Years Excellence" },
    { value: "100%", label: "Trust Rating" },
  ], []);

  return (
    <section
      id="affiliations"
      className="relative isolate w-full overflow-hidden"
      style={{ padding: 'clamp(3rem, 8vw, 6rem) 0' }}
      aria-labelledby="affiliations-title"
    >
      {/* Decorative animated blobs */}
      <DecorativeBlob
        className="w-96 h-96 -top-48 -left-48"
        delay={0}
        duration={15}
      />
      <DecorativeBlob
        className="w-80 h-80 top-1/3 -right-40"
        delay={3}
        duration={18}
      />
      <DecorativeBlob
        className="w-72 h-72 bottom-0 left-1/4"
        delay={6}
        duration={20}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: '1400px', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-4 transition-all duration-300 hover:scale-105"
            style={{
              padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)',
              background: 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--surface)))',
              border: '1px solid hsl(var(--border))',
              boxShadow: '0 4px 12px hsl(var(--primary) / 0.08)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <path
                d="M12 2l2.5 5.5 5.5.7-4 4 1.2 5.3L12 15l-5.2 2.5L8 12.2l-4-4 5.5-.7L12 2z"
                fill="hsl(var(--gold))"
              />
            </svg>
            <span
              className="font-semibold tracking-wide"
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                color: 'hsl(var(--gold-foreground))',
              }}
            >
              TRUSTED WORLDWIDE
            </span>
          </div>

          {/* Title */}
          <h2
            id="affiliations-title"
            className="font-bold mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              lineHeight: '1.1',
              color: 'hsl(var(--foreground))',
              letterSpacing: '-0.02em',
            }}
          >
            Elite{' '}
            <span
              className="relative inline-block"
              style={{ color: 'hsl(var(--primary))' }}
            >
              Global Partnerships
              <span
                className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)))',
                  opacity: 0.4,
                }}
                aria-hidden="true"
              />
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto"
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              maxWidth: '600px',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: '1.6',
            }}
          >
            Collaborating with world-class institutions to deliver excellence
          </p>
        </div>

        {/* Desktop Marquee */}
        {!isMobile && (
          <div className="relative hidden md:block">
            {/* Gradient fades */}
            <div
              className="absolute inset-y-0 left-0 z-20 pointer-events-none"
              style={{
                width: 'clamp(3rem, 8vw, 6rem)',
                background: 'linear-gradient(to right, hsl(var(--background)), transparent)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 right-0 z-20 pointer-events-none"
              style={{
                width: 'clamp(3rem, 8vw, 6rem)',
                background: 'linear-gradient(to left, hsl(var(--background)), transparent)',
              }}
              aria-hidden="true"
            />

            <div className="overflow-hidden" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0' }}>
              <div
                ref={trackerRef}
                className="flex gap-6 will-change-transform"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'marqueeFlow 45s linear infinite',
                }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                onFocus={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onBlur={(e) => e.currentTarget.style.animationPlayState = 'running'}
              >
                {duplicated.map((aff, idx) => (
                  <LogoCard
                    key={`${aff.id}-${idx}`}
                    logo={aff.logo}
                    name={aff.name}
                    index={idx}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Swipeable Grid */}
        {isMobile && (
          <div className="md:hidden">
            <div
              className="overflow-x-auto scrollbar-hide -mx-4 px-4"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="inline-flex gap-3 py-4">
                {logos.map((aff) => (
                  <LogoCard
                    key={aff.id}
                    logo={aff.logo}
                    name={aff.name}
                    index={aff.id}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>

            {/* Swipe indicator */}
            <div
              className="text-center mt-3 flex items-center justify-center gap-2"
              style={{
                fontSize: '0.75rem',
                color: 'hsl(var(--muted-foreground) / 0.7)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 12h10m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Swipe to explore
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div
          className="grid gap-4 mx-auto mt-12"
          style={{
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, minmax(0, 280px))',
            maxWidth: isMobile ? '100%' : '900px',
          }}
        >
          {stats.map((stat, idx) => (
            <StatCard key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marqueeFlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-25px, 20px) scale(0.95); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export default TestimonialSection;