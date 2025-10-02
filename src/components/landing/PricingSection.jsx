import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Shield, Users, ArrowRight, Sparkles } from "lucide-react";

const DEFAULT_UNITS = [
  {
    id: "kg",
    title: "Kindergarten",
    subtitle: "Foundations of curiosity & discovery",
    img: "https://millenniaws.sch.id/wp-content/uploads/2021/11/IMG_20190925_145345.webp",
    href: "/apply?unit=kindergarten",
    color: "primary",
  },
  {
    id: "el",
    title: "Elementary",
    subtitle: "Core academics & creative thinking",
    img: "https://millenniaws.sch.id/wp-content/uploads/2021/11/IMG_20190925_145345.webp",
    href: "/apply?unit=elementary",
    color: "gold",
  },
  {
    id: "jh",
    title: "Junior High",
    subtitle: "Future-ready skills & leadership",
    img: "https://millenniaws.sch.id/wp-content/uploads/2021/11/IMG_20190925_145345.webp",
    href: "/apply?unit=junior-high",
    color: "emerald",
  },
];

const DEFAULT_FEATURES = [
  {
    id: 1,
    icon: Award,
    title: "Holistic Curriculum",
    desc: "Balanced academics & character"
  },
  {
    id: 2,
    icon: Users,
    title: "Small Classes",
    desc: "Personal attention guaranteed"
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Expert Faculty",
    desc: "Trained, passionate educators"
  },
  {
    id: 4,
    icon: Shield,
    title: "Safe Campus",
    desc: "Secure, modern facilities"
  },
];

const PricingSection = memo(({
  units = DEFAULT_UNITS,
  features = DEFAULT_FEATURES,
  onApply
}) => {
  const handleApply = useCallback((href) => {
    if (typeof onApply === "function") {
      onApply(href);
    } else {
      window.location.href = href || "/apply";
    }
  }, [onApply]);

  return (
    <section
      id="academic-units"
      className="relative isolate w-full overflow-hidden py-12 md:py-20 lg:py-28"
      aria-labelledby="academic-units-title"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 0.5px, transparent 0.5px),
                           linear-gradient(90deg, hsl(var(--primary)) 0.5px, transparent 0.5px)`,
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-[0.14] pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
        animate={{
          y: [0, -22, 0],
          x: [0, 18, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-[0.1] pointer-events-none"
        style={{ background: "hsl(var(--gold))" }}
        animate={{
          y: [0, 26, 0],
          x: [0, -22, 0],
          scale: [1, 1.06, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

        {/* Header - Compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <Sparkles
              className="w-3 h-3 md:w-4 md:h-4"
              style={{ color: "hsl(var(--primary))" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Excellence in Education
            </span>
          </div>

          <h2
            id="academic-units-title"
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Academic <span style={{ color: "hsl(var(--primary))" }}>Programs</span>
          </h2>
          <p
            className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Thoughtfully designed learning paths for every stage of growth
          </p>
        </motion.div>

        {/* Features Grid - 2 cols mobile, 4 cols desktop */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="glass glass--frosted p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover-lift group"
                style={{ border: "1px solid hsl(var(--border) / 0.3)" }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "hsl(var(--primary) / 0.12)",
                    }}
                  >
                    <Icon
                      className="w-4 h-4 md:w-5 md:h-5"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-xs md:text-sm font-semibold mb-0.5 md:mb-1"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-[10px] md:text-xs leading-tight"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Academic Units Cards - 1 col mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {units.map((unit, idx) => (
            <motion.article
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div
                className="glass glass--frosted glass--deep rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover-lift h-full"
                style={{ border: "1px solid hsl(var(--border) / 0.4)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] md:aspect-video">
                  <img
                    src={unit.img}
                    alt={unit.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Floating badge */}
                  <div
                    className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold backdrop-blur-sm"
                    style={{
                      background: `hsl(var(--${unit.color}) / 0.9)`,
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    Available
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <h3
                    className="text-lg md:text-xl lg:text-2xl font-bold mb-1.5 md:mb-2"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {unit.title}
                  </h3>
                  <p
                    className="text-xs md:text-sm mb-4 md:mb-5 line-clamp-2"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {unit.subtitle}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={() => handleApply(unit.href)}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all duration-300"
                      style={{
                        background: `hsl(var(--${unit.color}))`,
                        color: "hsl(var(--primary-foreground))",
                        boxShadow: `0 4px 16px hsl(var(--${unit.color}) / 0.3)`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 8px 24px hsl(var(--${unit.color}) / 0.4)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = `0 4px 16px hsl(var(--${unit.color}) / 0.3)`;
                      }}
                      aria-label={`Apply for ${unit.title}`}
                    >
                      <span className="hidden md:inline">Apply Now</span>
                      <span className="md:hidden">Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>

                    <a
                      href={`${unit.href}#details`}
                      className="hidden md:inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = `hsl(var(--${unit.color}))`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "hsl(var(--muted-foreground))";
                      }}
                    >
                      Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA - Full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div
            className="glass glass--frosted inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl w-full md:w-auto"
            style={{ border: "1px solid hsl(var(--border) / 0.4)" }}
          >
            <div className="flex-1 text-center md:text-left">
              <h3
                className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Ready to Join Us?
              </h3>
              <p
                className="text-xs md:text-sm"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Start your journey with Millennia World School today
              </p>
            </div>

            <button
              onClick={() => handleApply("/apply")}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 6px 20px hsl(var(--primary) / 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 32px hsl(var(--primary) / 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px hsl(var(--primary) / 0.3)";
              }}
              aria-label="Apply to Millennia World School"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

PricingSection.displayName = "PricingSection";

export default PricingSection;