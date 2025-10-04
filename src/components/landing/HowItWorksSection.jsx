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

/* ---------- Motion variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.9, 0.1, 1] } }
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/* ---------- Memoized sub-components ---------- */
const CalendarDay = memo(({ day, event, isToday }) => {
  const base = "aspect-square flex items-center justify-center rounded-lg text-[10px] md:text-xs lg:text-sm font-medium";

  const classes = isToday
    ? `${base} bg-primary text-primary-foreground border-2 border-primary`
    : event
      ? `${base} ${COLOR_MAP[event.color]?.cell ?? "text-foreground/70 border border-border/20"}`
      : `${base} text-foreground/70 border border-border/20`;

  return (
    <div className={classes} role="button" tabIndex={0} aria-label={`Day ${day}`}>
      {day}
    </div>
  );
});
CalendarDay.displayName = "CalendarDay";

const EventItem = memo(({ event }) => {
  const colorCls = COLOR_MAP[event.color] ?? COLOR_MAP.primary;

  return (
    <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl glass border border-border/25">
      <div className={`flex-shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xs md:text-sm ${colorCls.badge}`}>
        {event.day}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-xs md:text-sm lg:text-base truncate text-foreground">
          {event.title}
        </p>
        <p className="text-[10px] md:text-xs text-muted-foreground">{event.date}</p>
      </div>
      <div className={`${colorCls.dot} w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0`} />
    </div>
  );
});
EventItem.displayName = "EventItem";

/* ---------- Optimized main component ---------- */
const HowItWorksSection = memo(() => {
  const [visibleCount, setVisibleCount] = useState(5);
  const currentMonth = "October 2025";
  const today = 2;

  const reduceMotion = useReducedMotion();

  const visibleEvents = useMemo(() => DUMMY_EVENTS.slice(0, visibleCount), [visibleCount]);

  const monthName = useMemo(() => currentMonth.split(" ")[0], []);

  const eventsMapForMonth = useMemo(() => {
    const map = new Map();
    for (const ev of DUMMY_EVENTS) {
      if (ev.month === monthName) map.set(ev.day, ev);
    }
    return map;
  }, [monthName]);

  const calendarCells = useMemo(() => {
    return Array.from({ length: 31 }, (_, idx) => {
      const day = idx + 1;
      const event = eventsMapForMonth.get(day) || null;
      const isToday = day === today && monthName === "October";
      return { day, event, isToday };
    });
  }, [eventsMapForMonth, monthName]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 3, DUMMY_EVENTS.length));
  }, []);

  const showLess = useCallback(() => setVisibleCount(5), []);

  const hasMore = visibleCount < DUMMY_EVENTS.length;
  const canShowLess = visibleCount > 5;

  return (
    <section
      id="how-it-works"
      className="relative isolate min-h-screen w-full overflow-hidden py-12 md:py-20 lg:py-28"
      style={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* OPTIMIZED: Single solid overlay instead of backdrop-blur */}
      <div
        className="absolute inset-0 bg-background/94"
        style={{ contentVisibility: 'auto' }}
        aria-hidden="true"
      />

      {/* OPTIMIZED: Simplified dot pattern - removed for better performance */}

      {/* OPTIMIZED: Removed animated blobs - major performance drain */}

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={headerVariants}
          className="text-center mb-8 md:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 bg-muted border border-border">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Stay Connected</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-foreground">
            Community & Events
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 text-muted-foreground">
            Discover achievements and upcoming celebrations
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Shoutout Wall */}
          <motion.div
            initial={reduceMotion ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            className="group"
          >
            <div className="glass glass--frosted glass--deep h-full p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-border/40">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-foreground">
                    Shoutout Wall
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    Student achievements & stories
                  </p>
                </div>
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl glass bg-primary/12">
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6 aspect-video md:aspect-[4/3]">
                <img
                  src="https://millenniaws.sch.id/wp-content/uploads/2021/11/IMG_20190925_145345.webp"
                  alt="Student Achievements"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>

              <p className="text-xs md:text-sm lg:text-base leading-relaxed mb-4 md:mb-6 text-muted-foreground">
                Celebrate creativity and spirit. Explore inspiring stories from our vibrant community.
              </p>

              <a
                href="/shoutout"
                className="group/btn inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-xs md:text-sm lg:text-base w-full md:w-auto bg-primary text-primary-foreground shadow-md shadow-primary/25"
              >
                <span className="hidden md:inline">Visit Shoutout Wall</span>
                <span className="md:hidden">Visit Wall</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={reduceMotion ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            className="group"
          >
            <div className="glass glass--frosted glass--deep h-full p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-border/40">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-foreground">
                    Upcoming Events
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base font-medium text-gold">
                    {currentMonth}
                  </p>
                </div>
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl glass bg-gold/12">
                  <Calendar className="w-4 h-4 md:w-6 md:h-6 text-gold" />
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="glass p-3 md:p-4 rounded-xl md:rounded-2xl mb-4 md:mb-6 bg-card/60">
                <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-2 md:mb-3">
                  {WEEKDAYS.map((d, i) => (
                    <div
                      key={i}
                      className="text-center text-[10px] md:text-xs font-semibold py-1 md:py-2 text-muted-foreground"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                  {calendarCells.map((cell) => (
                    <CalendarDay
                      key={cell.day}
                      day={cell.day}
                      event={cell.event}
                      isToday={cell.isToday}
                    />
                  ))}
                </div>
              </div>

              {/* Event List */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-48 md:max-h-64 lg:max-h-80 overflow-y-auto scrollbar-hide">
                {visibleEvents.map((event, idx) => (
                  <EventItem key={`${event.day}-${idx}`} event={event} />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 md:gap-3">
                {hasMore && (
                  <button
                    onClick={loadMore}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-gold/10 text-gold border border-gold/30"
                    aria-label="Load more events"
                  >
                    Load More <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                )}

                {canShowLess && (
                  <button
                    onClick={showLess}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm bg-muted text-muted-foreground border border-border"
                    aria-label="Show fewer events"
                  >
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