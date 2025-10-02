import React, { memo, useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Sparkles, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const BG_IMG = "/Millennia-Building.jpg";

/* ---------- Static events data ---------- */
const DUMMY_EVENTS = [
  { date: "Oct 2", day: 2, month: "October", title: "Batik Day", color: "primary" },
  { date: "Oct 9", day: 9, month: "October", title: "Science Fair", color: "gold" },
  { date: "Oct 14", day: 14, month: "October", title: "Teacher's Day", color: "emerald" },
  { date: "Oct 20", day: 20, month: "October", title: "Parents Gathering", color: "primary" },
  { date: "Oct 30", day: 30, month: "October", title: "Halloween Party", color: "gold" },
  { date: "Nov 5", day: 5, month: "November", title: "Sports Day", color: "emerald" },
  { date: "Nov 11", day: 11, month: "November", title: "Coding Festival", color: "primary" },
  { date: "Nov 22", day: 22, month: "November", title: "Music Showcase", color: "gold" },
  { date: "Nov 28", day: 28, month: "November", title: "Art Exhibition", color: "emerald" },
  { date: "Dec 2", day: 2, month: "December", title: "End-Year Celebration", color: "primary" }
];

/* ---------- Tailwind-safe class map for color tokens ---------- */
const COLOR_MAP = Object.freeze({
  primary: {
    cell: "bg-primary/20 text-primary border-primary/30",
    badge: "bg-primary/15 text-primary",
    dot: "bg-primary"
  },
  gold: {
    cell: "bg-gold/20 text-gold border-gold/30",
    badge: "bg-gold/15 text-gold",
    dot: "bg-gold"
  },
  emerald: {
    cell: "bg-emerald/20 text-emerald border-emerald/30",
    badge: "bg-emerald/15 text-emerald",
    dot: "bg-emerald"
  }
});

/* ---------- Motion variants (single source) ---------- */
const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.9, 0.1, 1] } } };

/* ---------- Optimized component ---------- */
const HowItWorksSection = memo(() => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentMonth] = useState("October 2025");
  const today = 2; // keep orig behaviour

  const reduceMotion = useReducedMotion();

  // Memoize visible events
  const visibleEvents = useMemo(() => DUMMY_EVENTS.slice(0, visibleCount), [visibleCount]);

  // Extract month name (stable) and build a map for O(1) lookups in calendar rendering
  const monthName = useMemo(() => currentMonth.split(" ")[0], [currentMonth]);

  const eventsMapForMonth = useMemo(() => {
    const map = new Map();
    for (let ev of DUMMY_EVENTS) {
      if (ev.month === monthName) map.set(ev.day, ev);
    }
    return map;
  }, [monthName]);

  // Calendar cells memoized to avoid recreating on each render
  const calendarCells = useMemo(() => {
    // preserve 31 cells as original to keep visual identical
    return Array.from({ length: 31 }, (_, idx) => {
      const day = idx + 1;
      const event = eventsMapForMonth.get(day) || null;
      const isToday = day === today && monthName === "October"; // keep original today logic
      return { day, event, isToday };
    });
  }, [eventsMapForMonth, monthName]);

  const loadMore = useCallback(() => setVisibleCount(prev => Math.min(prev + 3, DUMMY_EVENTS.length)), []);
  const showLess = useCallback(() => setVisibleCount(5), []);

  return (
    <section
      id="how-it-works"
      className="relative isolate min-h-screen w-full overflow-hidden py-12 md:py-20 lg:py-28 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${BG_IMG})` }}
    >
      {/* Layered overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/96 via-background/92 to-background/88 backdrop-blur-lg" aria-hidden />

      {/* Dot pattern & grid lines - small paint cost, cached background images */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }}
        aria-hidden
      />

      {/* Decorative blobs - prefer CSS animation classes; fall back to minimal JS if reduced motion */}
      {reduceMotion ? (
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-[0.18] blur-3xl bg-primary will-change-transform" aria-hidden />
      ) : (
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-[0.18] blur-3xl bg-primary animate-blob-left will-change-transform" aria-hidden />
      )}

      {reduceMotion ? (
        <div className="absolute bottom-0 -right-48 h-[28rem] w-[28rem] rounded-full opacity-[0.12] blur-3xl bg-gold will-change-transform" aria-hidden />
      ) : (
        <div className="absolute bottom-0 -right-48 h-[28rem] w-[28rem] rounded-full opacity-[0.12] blur-3xl bg-gold animate-blob-right will-change-transform" aria-hidden />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Header - use single motion container for entrance */}
        <motion.div
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          className="text-center mb-8 md:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 bg-muted border border-border">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Stay Connected</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-foreground">Community & Events</h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 text-muted-foreground">Discover achievements and upcoming celebrations</p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Shoutout Wall */}
          <motion.div initial={reduceMotion ? "show" : "hidden"} animate="show" variants={fadeUp} className="group">
            <div className="glass glass--frosted glass--deep h-full p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-border/40 transition-all duration-300 hover-lift">

              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-foreground">Shoutout Wall</h3>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Student achievements & stories</p>
                </div>
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl glass bg-primary/12 transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6 aspect-video md:aspect-[4/3]">
                <img
                  src="https://millenniaws.sch.id/wp-content/uploads/2021/11/IMG_20190925_145345.webp"
                  alt="Student Achievements"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-xs md:text-sm lg:text-base leading-relaxed mb-4 md:mb-6 text-muted-foreground">Celebrate creativity and spirit. Explore inspiring stories from our vibrant community.</p>

              <a
                href="/shoutout"
                className="group/btn inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-xs md:text-sm lg:text-base transition-all duration-300 w-full md:w-auto bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <span className="hidden md:inline">Visit Shoutout Wall</span>
                <span className="md:hidden">Visit Wall</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div initial={reduceMotion ? "show" : "hidden"} animate="show" variants={fadeUp} className="group">
            <div className="glass glass--frosted glass--deep h-full p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-border/40">

              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-foreground">Upcoming Events</h3>
                  <p className="text-xs md:text-sm lg:text-base font-medium text-gold">{currentMonth}</p>
                </div>
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl glass bg-gold/12 transition-transform duration-300 group-hover:scale-110">
                  <Calendar className="w-4 h-4 md:w-6 md:h-6 text-gold" />
                </div>
              </div>

              {/* Mini Calendar (pure CSS hover, no per-cell JS animations) */}
              <div className="glass p-3 md:p-4 rounded-xl md:rounded-2xl mb-4 md:mb-6 bg-card/60">
                <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-2 md:mb-3">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="text-center text-[10px] md:text-xs font-semibold py-1 md:py-2 text-muted-foreground">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                  {calendarCells.map((cell) => {
                    const { day, event, isToday } = cell;
                    const key = `cal-${day}`;
                    const base = "aspect-square flex items-center justify-center rounded-lg text-[10px] md:text-xs lg:text-sm font-medium transition-transform duration-150 will-change-transform";

                    const classes = isToday
                      ? `${base} bg-primary text-primary-foreground border-2 border-primary`
                      : event
                        ? `${base} ${COLOR_MAP[event.color]?.cell ?? "text-foreground/70 border border-border/20"}`
                        : `${base} text-foreground/70 border border-border/20`;

                    return (
                      <div key={key} className={classes} role="button" tabIndex={0} aria-label={`Day ${day}`}> {day} </div>
                    );
                  })}
                </div>
              </div>

              {/* Event List (lightweight list items) */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-48 md:max-h-64 lg:max-h-80 overflow-y-auto scrollbar-hide">
                {visibleEvents.map((event, idx) => {
                  const colorCls = COLOR_MAP[event.color] ?? COLOR_MAP.primary;
                  return (
                    <div
                      key={`ev-${event.day}-${idx}`}
                      className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl glass border border-border/25 hover:bg-opacity-10 transition-colors duration-200`}
                    >
                      <div className={`flex-shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xs md:text-sm ${colorCls.badge}`}>{event.day}</div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs md:text-sm lg:text-base truncate text-foreground">{event.title}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{event.date}</p>
                      </div>

                      <div className={`${colorCls.dot} w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0`} />
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 md:gap-3">
                {visibleCount < DUMMY_EVENTS.length && (
                  <button onClick={loadMore} className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 hover:border-gold/50 transition-transform duration-200">
                    Load More <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                )}

                {visibleCount > 5 && (
                  <button onClick={showLess} className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-muted text-muted-foreground border border-border hover:bg-muted-foreground/10 transition-transform duration-200">
                    Show Less <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = "HowItWorksSection";

export default HowItWorksSection;
