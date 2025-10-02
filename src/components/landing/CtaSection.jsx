// CTASection.jsx
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Sparkles } from "lucide-react";

/**
 * Optimized CTASection
 * - Preserves the same visual layout/feel you provided
 * - Performance improvements:
 *   • React.memo
 *   • stable callbacks (useCallback)
 *   • CSS-driven hover & transitions
 *   • lazy + async image decoding
 *   • respects prefers-reduced-motion
 * - Mobile: faster blob animations via media query detection
 */

/* HERO IMAGES (stable constant so it doesn't re-create) */
const HERO_IMAGES = [
  {
    src:
      "https://millenniaws.sch.id/wp-content/uploads/2021/11/20180914-IMG_20180914_092639-1.png",
    alt: "Student microscope",
  },
  {
    src:
      "https://millenniaws.sch.id/wp-content/uploads/2021/11/20180914-IMG_20180914_0926392-1.png",
    alt: "Kindergarten play",
  },
  {
    src:
      "https://millenniaws.sch.id/wp-content/uploads/2021/11/20180914-IMG_20180914_0926393-1.png",
    alt: "Group activity",
  },
];

/* motion variants (reused, stable) */
const containerVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.9, 0.1, 1] } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: [0.2, 0.9, 0.1, 1] },
  }),
};

const CTASection = ({ handleCTAClick }) => {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile/compact viewport once client-side (affects animation speed)
  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    setIsMobile(m.matches);
    const handler = (ev) => setIsMobile(ev.matches);
    try {
      m.addEventListener ? m.addEventListener("change", handler) : m.addListener(handler);
      return () => {
        m.removeEventListener ? m.removeEventListener("change", handler) : m.removeListener(handler);
      };
    } catch {
      // ignore in older browsers
    }
  }, []);

  // stable click handler
  const handleClick = useCallback(
    (action) => {
      if (typeof handleCTAClick === "function") {
        handleCTAClick(action);
        return;
      }
      // fallback default navigation
      if (action === "apply") {
        window.location.href = "/apply";
      } else if (action === "contact") {
        window.location.href = "/contact";
      }
    },
    [handleCTAClick]
  );

  // motion transition for blobs: faster on mobile
  const blobTransition = useMemo(
    () => ({
      duration: isMobile ? 12 : 18,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    }),
    [isMobile]
  );

  return (
    <section
      id="cta"
      className="relative isolate w-full overflow-hidden py-16 md:py-24 lg:py-32"
      aria-label="Call to action - Where every learner thrives"
    >
      {/* subtle background patterns */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold)) 0.5px, transparent 0.5px),
                           linear-gradient(90deg, hsl(var(--gold)) 0.5px, transparent 0.5px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* decorative blobs (framer-motion) */}
      {!prefersReduced && (
        <>
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-[0.15] pointer-events-none"
            style={{ background: "hsl(var(--primary))" }}
            animate={{ y: [0, -30, 0], x: [0, 25, 0], scale: [1, 1.08, 1] }}
            transition={blobTransition}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
            style={{ background: "hsl(var(--gold))" }}
            animate={{ y: [0, 35, 0], x: [0, -28, 0], scale: [1, 1.1, 1] }}
            transition={{ ...blobTransition, duration: blobTransition.duration - 2 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* If reduced motion is preferred, keep subtle static blobs for visuals (no animation) */}
      {prefersReduced && (
        <>
          <div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-[0.12] pointer-events-none"
            style={{ background: "hsl(var(--primary))" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.08] pointer-events-none"
            style={{ background: "hsl(var(--gold))" }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="glass glass--frosted glass--deep rounded-3xl md:rounded-[2rem] overflow-hidden"
          style={{ border: "1px solid hsl(var(--border) / 0.4)" }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-6 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center order-2 lg:order-1">
              <div
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 w-fit"
                style={{
                  background: "hsl(var(--primary) / 0.12)",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
                aria-hidden="true"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: "hsl(var(--primary))" }} />
                <span className="text-xs md:text-sm font-semibold" style={{ color: "hsl(var(--primary))" }}>
                  WHERE EVERY LEARNER THRIVES
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 leading-tight"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Begin Your Journey
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>With Excellence</span>
              </h2>

              <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
                Discover a world-class education that nurtures potential, builds character, and prepares students for global success.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <button
                  onClick={() => handleClick("apply")}
                  className="cta-primary group inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-transform duration-300 focus:outline-none focus-visible:ring-4"
                  aria-label="Apply Now"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleClick("contact")}
                  className="cta-ghost inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base transition-transform duration-300 focus:outline-none focus-visible:ring-4"
                  aria-label="Contact Us"
                >
                  Contact Us
                </button>
              </div>

              {/* Quick contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { Icon: Phone, label: "Phone", text: "+62 xxx xxxx" },
                  { Icon: Mail, label: "Email", text: "info@millennia.sch.id" },
                  { Icon: MapPin, label: "Location", text: "Tangerang, ID" },
                ].map(({ Icon, label, text }, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 md:p-3 rounded-xl"
                    style={{ background: "hsl(var(--muted) / 0.5)", border: "1px solid hsl(var(--border) / 0.3)" }}
                    role="group"
                    aria-label={label}
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: "hsl(var(--gold))" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] md:text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {label}
                      </p>
                      <p className="text-xs md:text-sm font-semibold truncate" style={{ color: "hsl(var(--foreground))" }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Grid */}
            <div className="relative order-1 lg:order-2 min-h-[240px] md:min-h-[320px] lg:min-h-full">
              <div className="absolute inset-0 grid grid-cols-2 gap-2 md:gap-3 p-4 md:p-6">
                <motion.div
                  variants={imageVariant}
                  custom={0}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="col-span-2 row-span-2 rounded-2xl overflow-hidden group"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={HERO_IMAGES[0].src}
                      alt={HERO_IMAGES[0].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" aria-hidden="true" />
                  </div>
                </motion.div>

                {HERO_IMAGES.slice(1).map((img, i) => (
                  <motion.div
                    key={i}
                    variants={imageVariant}
                    custom={0.1 + i * 0.1}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="rounded-xl overflow-hidden group"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" aria-hidden="true" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* floating stat badge */}
              <motion.div
                variants={imageVariant}
                custom={0.4}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10"
              >
                <div className="glass glass--frosted px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-md" style={{ border: "1px solid hsl(var(--border) / 0.5)" }}>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold" style={{ color: "hsl(var(--primary))" }}>
                    25+ Years
                  </p>
                  <p className="text-[10px] md:text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Of Excellence
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* component-scoped styling (keeps hover/transition in CSS vs DOM style toggles) */}
      <style>{`
        /* CTA primary & ghost styles use tokens (no hardcoded hex) */
        .cta-primary {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          box-shadow: 0 6px 24px color-mix(in srgb, hsl(var(--primary)) 30%, transparent);
        }
        .cta-primary:hover, .cta-primary:focus-visible { transform: translateY(-3px); box-shadow: 0 12px 32px color-mix(in srgb, hsl(var(--primary)) 36%, transparent); }
        .cta-ghost {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
        }
        .cta-ghost:hover, .cta-ghost:focus-visible { background: hsl(var(--muted-foreground) / 0.08); transform: translateY(-2px); }

        /* reduce painting cost by only using transform & opacity on hover */
        .group-hover\\:scale-110:hover { transform: scale(1.10); will-change: transform; }
        .group-hover\\:scale-110 { transition: transform var(--transition) var(--easing); }

        /* focus ring accessible */
        .cta-primary:focus-visible, .cta-ghost:focus-visible {
          outline: none;
          box-shadow: 0 0 0 6px color-mix(in srgb, hsl(var(--ring)) 16%, transparent);
          border-radius: 9999px;
        }

        /* performance-minded: avoid heavy box-shadow changes frequently */
        .glass { transition: transform var(--transition), box-shadow var(--transition), background var(--transition); }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(16,24,40,0.08); }

        @media (prefers-reduced-motion: reduce) {
          .cta-primary, .cta-ghost, .group-hover\\:scale-110, .glass, .hover-lift { transition: none !important; transform: none !important; animation: none !important; }
        }

        @media (max-width: 640px) {
          /* keep the images focused on mobile and reduce overlay intensities */
          .glass img { object-position: center; }
        }
      `}</style>
    </section>
  );
};

CTASection.displayName = "CTASection";
export default memo(CTASection);
