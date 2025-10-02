// TestimonialSection.jsx
import React, { memo, useMemo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * TestimonialSection (Affiliations carousel optimized)
 * - Desktop: lightweight CSS marquee using duplicated content for seamless loop
 * - Mobile: horizontal scroll with scroll-snap for swipe gestures
 * - Respects prefers-reduced-motion; pauses on hover/focus
 * - Props: none required (uses internal AFFILIATIONS), but you can swap AFFILIATIONS array
 */

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

const TestimonialSection = memo(() => {
  const logos = useMemo(() => AFFILIATIONS, []);
  // duplicate for marquee (desktop)
  const duplicated = useMemo(() => [...logos, ...logos], [logos]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const trackerRef = useRef(null);

  // tiny helper to show/hide marquee vs native scroll on resize (mobile prefers swipe)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);

  // Pause marquee when user interacts (keyboard / hover) - handled in CSS for most cases,
  // but ensure we can pause programmatically (if needed) using animationPlayState
  useEffect(() => {
    if (!trackerRef.current) return;
    const el = trackerRef.current;
    const onFocus = () => (el.style.animationPlayState = "paused");
    const onBlur = () => (el.style.animationPlayState = "running");
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", onBlur);
    return () => {
      el.removeEventListener("focusin", onFocus);
      el.removeEventListener("focusout", onBlur);
    };
  }, []);

  return (
    <section
      id="affiliations"
      className="relative isolate w-full overflow-hidden py-12 md:py-20 lg:py-24"
      aria-labelledby="affiliations-title"
    >
      {/* subtle background patterns (kept as inline styles to use your tokens) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.12) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Header (kept exactly like your design) */}
        <div className="text-center mb-8 md:mb-12">
          <div
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2l2 5 5 .7-4 3 1.2 5L12 15l-4.2 1.7L9 10 5 7l5-.7L12 2z" fill="currentColor" />
            </svg>
            <span className="text-xs md:text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
              Trusted Partnerships
            </span>
          </div>

          <h2
            id="affiliations-title"
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Our <span style={{ color: "hsl(var(--primary))" }}>Affiliations</span>
          </h2>
          <p
            className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Collaborating with leading organizations worldwide
          </p>
        </div>

        {/* -------------------------
            DESKTOP: CSS Marquee (lightweight)
            MOBILE: Native scroll-snap (swipeable)
           ------------------------- */}

        {/* Desktop / Tablet marquee */}
        {!isMobile && (
          <div className="hidden md:block relative">
            {/* fade edges */}
            <div
              className="absolute inset-y-0 left-0 w-12 md:w-24 z-20 pointer-events-none"
              style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
              aria-hidden
            />
            <div
              className="absolute inset-y-0 right-0 w-12 md:w-24 z-20 pointer-events-none"
              style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
              aria-hidden
            />

            <div className="overflow-hidden py-6 md:py-8">
              {/* The animated track */}
              <div
                ref={trackerRef}
                className="will-change-transform"
                // use CSS animation defined below (keyframes marquee)
                // duration tuned: desktop slower (40s). For medium widths it becomes slightly faster by CSS media query.
                style={{
                  animation: prefersReducedMotion ? "none" : "marquee 40s linear infinite",
                }}
                aria-hidden={prefersReducedMotion ? "true" : "false"}
              >
                <div className="flex gap-4 md:gap-6 lg:gap-8 px-4">
                  {duplicated.map((aff, idx) => (
                    <div
                      key={`${aff.id}-${idx}`}
                      className="glass glass--frosted flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover-lift group"
                      style={{ border: "1px solid hsl(var(--border) / 0.3)" }}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={aff.logo}
                          alt={aff.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                          style={{ background: "hsl(var(--primary) / 0.06)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: native horizontal scroll with scroll-snap for swipe/pan */}
        {isMobile && (
          <div className="md:hidden">
            <div
              className="overflow-x-auto touch-pan-x scrollbar-hide -mx-3 px-3"
              role="region"
              aria-label="Affiliated partners list"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="inline-flex gap-3 py-3">
                {logos.map((aff) => (
                  <div
                    key={aff.id}
                    className="glass flex-shrink-0 w-40 h-24 rounded-lg p-3 flex items-center justify-center"
                    style={{
                      scrollSnapAlign: "center",
                      border: "1px solid hsl(var(--border) / 0.12)",
                      marginRight: 8,
                    }}
                  >
                    <img
                      src={aff.logo}
                      alt={aff.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 text-center text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              Swipe to view partners
            </div>
          </div>
        )}

        {/* Bottom Stats (kept as in your design) */}
        <div className="mt-8 md:mt-12 grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
          {[
            { value: "9+", label: "Partners" },
            { value: "25+", label: "Years" },
            { value: "100%", label: "Trust" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass glass--frosted text-center p-3 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 hover-lift"
              style={{ border: "1px solid hsl(var(--border) / 0.3)" }}
            >
              <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: "hsl(var(--primary))" }}>
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs lg:text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles: marquee keyframes, pause on hover/focus, reduced-motion support, responsive speed */}
      <style jsx>{`
        :root {
          --marquee-easing: linear;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause on hover/focus-within for accessibility */
        .will-change-transform:hover,
        .will-change-transform:focus-within {
          animation-play-state: paused !important;
        }

        /* Faster marquee on medium screens so it feels snappier */
        @media (min-width: 768px) and (max-width: 1024px) {
          .will-change-transform {
            animation-duration: 28s !important;
          }
        }

        /* Allow user to reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform {
            animation: none !important;
          }
        }

        /* Hide native scrollbar but keep touch scroll usable */
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

/* Helper hook below - small & safe */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);
  return reduced;
}
