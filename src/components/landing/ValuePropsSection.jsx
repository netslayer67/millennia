// src/components/ValuePropsSection.jsx
"use client";

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
} from "lucide-react";

/* ---------- Dummy data (kept as you provided) ---------- */
const valueProps = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Adaptive Learning Pathways",
    description:
      "Personalized curriculum that evolves with each student's unique learning style and pace.",
    stat: "98%",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Mentorship",
    description:
      "Small cohorts with dedicated mentors who guide academic and personal development.",
    stat: "1:8",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Global Recognition",
    description:
      "International accreditations and partnerships with leading universities worldwide.",
    stat: "50+",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Innovation Lab",
    description:
      "State-of-the-art facilities for STEM, arts, and entrepreneurship exploration.",
    stat: "24/7",
  },
];

const articles = [
  {
    id: "1",
    title: "10 Gifts That Every Parent Should Give Their Children",
    date: "2025-03-19",
    slug: "/articles/10-gifts-parents",
    excerpt:
      "Discover the invaluable gifts beyond material possessions that shape character.",
  },
  {
    id: "2",
    title: "Compassion In Action 2023",
    date: "2023-04-11",
    slug: "/articles/compassion-in-action",
    excerpt: "How our students are making a difference in their communities.",
  },
];

/* ---------- small sanitizers (client-side hint — still validate server-side) ---------- */
const sanitizeUrl = (u = "") => {
  try {
    // keep internal/local links, otherwise return '#'
    const url = String(u).trim();
    if (!url) return "#";
    // disallow javascript:, data:, vbscript:
    if (/^\s*(javascript|data|vbscript)\:/i.test(url)) return "#";
    // allow relative / absolute safe paths
    return encodeURI(url);
  } catch {
    return "#";
  }
};

/* ---------- animation variants ---------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.2, 0.9, 0.1, 1] } },
};

/* ---------- Component ---------- */
function ValuePropsSection() {
  const reduceMotion = useReducedMotion();

  const listItems = useMemo(
    () =>
      valueProps.map((p, i) => (
        <motion.div
          key={i}
          variants={reduceMotion ? {} : item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="group"
        >
          <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shrink-0">
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                {p.stat && <div className="text-xl font-semibold text-primary mb-1">{p.stat}</div>}
                <h4 className="text-lg font-bold mb-2 text-foreground">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )),
    [reduceMotion]
  );

  const articleNodes = useMemo(
    () =>
      articles.map((a, idx) => (
        <motion.article
          key={a.id}
          variants={reduceMotion ? {} : item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          className="group"
        >
          <a
            href={sanitizeUrl(a.slug)}
            className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
              <time dateTime={a.date}>{a.date}</time>
            </div>

            <h5 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {a.title}
            </h5>

            {a.excerpt && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.excerpt}</p>
            )}

            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
              Read article <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </motion.article>
      )),
    [reduceMotion]
  );

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* faint pattern layer (very lightweight SVG background) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          variants={reduceMotion ? {} : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Excellence in Education</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Why Choose <span className="text-primary">MWS?</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            A transformative program preparing students for an unpredictable future — through innovation,
            character, and academic excellence.
          </p>
        </motion.div>

        {/* Top asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Large feature (left on desktop) */}
          <motion.div
            variants={reduceMotion ? {} : item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="relative h-full glass-card glass hover-lift bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors">
                  {valueProps[0].icon}
                </div>

                {valueProps[0].stat && (
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{valueProps[0].stat}</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground">{valueProps[0].title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{valueProps[0].description}</p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                aria-label="Learn more about adaptive pathways"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* stacked cards (right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {valueProps.slice(1, 3).map((prop, idx) => (
              <motion.div
                key={prop.title}
                variants={reduceMotion ? {} : item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <div className="glass-card glass bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary transition-colors shrink-0">
                      {prop.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      {prop.stat && <div className="text-xl font-semibold text-primary mb-1">{prop.stat}</div>}
                      <h4 className="text-lg font-bold mb-1 text-foreground">{prop.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* bottom wide card */}
          <motion.div
            variants={reduceMotion ? {} : item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="lg:col-span-12"
          >
            <div className="glass-card glass bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors shrink-0">
                    {valueProps[3].icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-foreground">{valueProps[3].title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{valueProps[3].description}</p>
                  </div>
                </div>

                {valueProps[3].stat && (
                  <div className="text-center md:text-right shrink-0">
                    <div className="text-3xl font-bold text-primary">{valueProps[3].stat}</div>
                    <div className="text-sm text-muted-foreground">Access</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background + articles area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            variants={reduceMotion ? {} : item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Our Foundation</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              Preparing Students for an <span className="block text-primary mt-1">Unpredictable Future</span>
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              In the 21st century, every educational system faces the challenge of preparing young generations for a future life that is not only complex but constantly changing as well, and hence, mostly unknown and unpredictable.  However, it is clear that intellectual flexibility, creative thinking, independent judgment, moral discernment, refined written and oral communication skills, and the ability to collaborate effectively are essential to success in today’s ever-changing .world Millennia World School(MWS) offers a…
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              Discover Our Philosophy
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            variants={reduceMotion ? {} : item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <Target className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Insights & Stories</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              Latest from <span className="block text-primary mt-1">Our Community</span>
            </h3>

            <div className="space-y-4">{articleNodes}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* export memoized to avoid unnecessary re-renders */
export default memo(ValuePropsSection);
