import React, { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Users,
  Trophy,
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  Calendar,
  Award,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Sanitizer for URLs */
const sanitizeUrl = (u = "") => {
  try {
    const url = String(u).trim();
    if (!url) return "#";
    if (/^\s*(javascript|data|vbscript)\:/i.test(url)) return "#";
    return encodeURI(url);
  } catch {
    return "#";
  }
};

/* Data */
const valueProps = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Personalized curriculum evolving with each student's unique pace.",
    stat: "98%",
    label: "Success"
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Small cohorts with dedicated guides for holistic development.",
    stat: "1:8",
    label: "Ratio"
  },
  {
    icon: Trophy,
    title: "Global Recognition",
    description: "International partnerships with world-leading institutions.",
    stat: "50+",
    label: "Partners"
  },
  {
    icon: Sparkles,
    title: "Innovation Hub",
    description: "State-of-the-art facilities for STEM, arts, and entrepreneurship.",
    stat: "24/7",
    label: "Access"
  }
];

const articles = [
  {
    id: "1",
    title: "10 Gifts Every Parent Should Give",
    date: "2025-03-19",
    slug: "/articles/10-gifts-parents",
    excerpt: "Invaluable gifts beyond material possessions that shape character."
  },
  {
    id: "2",
    title: "Compassion In Action 2023",
    date: "2023-04-11",
    slug: "/articles/compassion-in-action",
    excerpt: "How students make a difference in their communities."
  }
];

/* Animation variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }
  }
};

/* Decorative Blob */
const DecorativeBlob = memo(({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, delay, ease: [0.2, 0.9, 0.1, 1] }}
    className={`absolute pointer-events-none rounded-full blur-3xl ${className}`}
    style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)'
    }}
  />
));

/* Feature Card Component */
const FeatureCard = memo(({ prop, index, variant = "default" }) => {
  const Icon = prop.icon;
  const reduceMotion = useReducedMotion();

  if (variant === "hero") {
    return (
      <motion.div
        variants={reduceMotion ? {} : itemVariants}
        className="relative h-full"
      >
        <div className="glass glass--frosted glass--deep hover-lift h-full group cursor-pointer">
          {/* Refraction layers */}
          <div className="glass__refract" />
          <div className="glass__refract--soft" />
          <div className="glass__noise" />

          <div className="relative p-6 md:p-8 h-full flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)] text-[hsl(var(--primary-foreground))] shadow-lg">
                <Icon className="w-6 h-6" />
              </div>

              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent">
                  {prop.stat}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] font-medium mt-1">
                  {prop.label}
                </div>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
              {prop.title}
            </h3>

            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6 flex-grow">
              {prop.description}
            </p>

            <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-medium text-sm group-hover:gap-3 transition-all duration-300">
              Explore <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={reduceMotion ? {} : itemVariants}
      className="h-full"
    >
      <div className="glass hover-lift h-full group cursor-pointer">
        <div className="glass__noise" />

        <div className="relative p-5 md:p-6 h-full">
          <div className="flex items-start gap-4 mb-3">
            <div className="p-2.5 rounded-lg bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-all duration-300 shrink-0">
              <Icon className="w-5 h-5" />
            </div>

            <div className="text-right ml-auto">
              <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                {prop.stat}
              </div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">
                {prop.label}
              </div>
            </div>
          </div>

          <h4 className="text-base md:text-lg font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
            {prop.title}
          </h4>

          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {prop.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

/* Article Card */
const ArticleCard = memo(({ article, index }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? {} : itemVariants}
    >
      <a
        href={sanitizeUrl(article.slug)}
        className="block glass hover-lift group"
      >
        <div className="glass__noise" />

        <div className="relative p-5 md:p-6">
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.date}>{article.date}</time>
          </div>

          <h5 className="text-base md:text-lg font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
            {article.title}
          </h5>

          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
            {article.excerpt}
          </p>

          <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] text-sm font-medium group-hover:gap-3 transition-all duration-300">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>
    </motion.article>
  );
});

/* Main Component */
function ValuePropsSection() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--surface))] to-[hsl(var(--background))]" />

      {/* Decorative Blobs */}
      <DecorativeBlob
        className="w-96 h-96 -top-48 -left-48 animate-blob-left"
        delay={0}
      />
      <DecorativeBlob
        className="w-[32rem] h-[32rem] -bottom-64 -right-64 animate-blob-right"
        delay={0.3}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          variants={reduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Award className="w-4 h-4" />
            <span>Excellence in Education</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-3 md:mb-4"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold))] bg-clip-text text-transparent">
              Millennia?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
          >
            Transforming education through innovation, character development, and unparalleled academic excellence.
          </motion.p>
        </motion.div>

        {/* Grid Layout - Mobile: 1 col, Tablet: 2 cols, Desktop: Asymmetric */}
        <motion.div
          variants={reduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 mb-10 md:mb-16"
        >
          {/* Hero Card - Full width on mobile, spans 7 cols on desktop */}
          <div className="lg:col-span-7">
            <FeatureCard prop={valueProps[0]} index={0} variant="hero" />
          </div>

          {/* Side Cards - Stack on mobile/tablet, column on desktop */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 md:gap-6">
            <FeatureCard prop={valueProps[1]} index={1} />
            <FeatureCard prop={valueProps[2]} index={2} />
          </div>

          {/* Wide Card - Full width */}
          <div className="lg:col-span-12">
            <motion.div variants={reduceMotion ? {} : itemVariants}>
              <div className="glass glass--frosted hover-lift">
                <div className="glass__noise" />

                <div className="relative p-5 md:p-6 lg:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold)/0.7)] text-[hsl(var(--gold-foreground))] shadow-lg shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-[hsl(var(--foreground))] mb-2">
                          {valueProps[3].title}
                        </h4>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {valueProps[3].description}
                        </p>
                      </div>
                    </div>

                    <div className="text-center md:text-right shrink-0 self-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
                        {valueProps[3].stat}
                      </div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        {valueProps[3].label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Philosophy Section */}
          <motion.div
            variants={reduceMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-medium text-sm">
              <BookOpen className="w-5 h-5" />
              <span className="uppercase tracking-wider">Our Foundation</span>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] leading-tight">
              Preparing for an{" "}
              <span className="block text-[hsl(var(--primary))] mt-1">
                Unpredictable Future
              </span>
            </motion.h3>

            <motion.p variants={itemVariants} className="text-sm md:text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
              Intellectual flexibility, creative thinking, independent judgment, and refined communication skills are essential for success in today's ever-changing world. MWS delivers transformative education that prepares students for tomorrow's challenges.
            </motion.p>

            <motion.button
              variants={itemVariants}
              onClick={() => (window.location.href = '/about')}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl font-medium hover:bg-[hsl(var(--primary)/0.9)] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discover Our Philosophy
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            variants={reduceMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-[hsl(var(--emerald))] font-medium text-sm">
              <Target className="w-5 h-5" />
              <span className="uppercase tracking-wider">Insights & Stories</span>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--foreground))] leading-tight">
              Latest from{" "}
              <span className="block text-[hsl(var(--emerald))] mt-1">
                Our Community
              </span>
            </motion.h3>

            <div className="space-y-4">
              {articles.map((article, idx) => (
                <ArticleCard key={article.id} article={article} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(ValuePropsSection);