// src/components/Navbar.jsx  (optimized)
// Notes: visually identical behavior, lower runtime cost, stable references, mobile-safe spacer
import React, { memo, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  BookOpen,
  MessageCircle,
  Send,
  GraduationCap,
  Users,
  Calendar,
  Award
} from "lucide-react";

const LOGO_SRC = "/Millennia.webp";

/* sanitize */
const sanitizeInput = (value) => {
  if (!value) return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, 200);
};

/* ---------- stable nav structure at module level ---------- */
const NAV_STRUCTURE = [
  { type: "link", id: "home", label: "Home", icon: Home, href: "/" },
  {
    type: "dropdown",
    id: "about",
    label: "About Us",
    icon: Users,
    href: "/about",
    items: [
      { id: "about-overview", label: "About Millennia", href: "/about" },
      { id: "faqs", label: "FAQs", href: "/faqs" },
    ],
  },
  {
    type: "dropdown",
    id: "academics",
    label: "Academics",
    icon: GraduationCap,
    href: "#",
    items: [
      { id: "kindergarten", label: "Kindergarten", href: "/kinder" },
      { id: "elementary", label: "Elementary", href: "/elemen" },
      { id: "junior-high", label: "Junior High", href: "/academics/junior-high" },
      { id: "curriculum", label: "Curriculum & Assessment", href: "/academics/curriculum" },
    ],
  },
  { type: "link", id: "calender", label: "School Calender", icon: Calendar, href: "/calender" },
  { type: "link", id: "blog", label: "Blog", icon: BookOpen, href: "/blog" },
  { type: "link", id: "contact", label: "Contact", icon: MessageCircle, href: "/contact" },
];

/* ---------- useDropdown (stable returned object) ---------- */
function useDropdown(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef(null);

  const toggle = useCallback((next) => {
    setOpen((v) => (typeof next === "boolean" ? next : !v));
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (!ref.current || !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // return stable refs and setters
  return {
    open,
    toggle,
    ref,
    setOpen, // stable (React state setter is stable)
  };
}

/* ---------- small presentational: DecorativeBlob (CSS driven if possible) ---------- */
const DecorativeBlob = memo(({ className = "", css = {} }) => {
  // keep very lightweight: avoid framer-motion per-frame when not necessary
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none blur-3xl ${className}`}
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        width: 260,
        height: 260,
        ...css,
      }}
    />
  );
});
DecorativeBlob.displayName = "DecorativeBlob";

/* ---------- DropdownPanel (keeps animatepresence but fewer inner animations) ---------- */
const DropdownPanel = memo(({ items, open, id, onNavigate }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.99 }}
          transition={{ duration: 0.22 }}
          className="absolute left-0 top-full mt-3 z-50"
        >
          <div className="glass glass--frosted glass--deep rounded-lg shadow-glass-lg border border-border/40 overflow-hidden min-w-[220px]">
            <div className="glass__refract" />
            <div className="glass__noise" />
            <ul role="menu" aria-label={`${id}-menu`} className="relative z-10 p-2 space-y-1">
              {items.map((it) => (
                <li key={it.id}>
                  <button
                    onClick={() => onNavigate(it.href ?? it.id)}
                    className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium
                      text-foreground/80 hover:text-foreground
                      hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-1"
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {it.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
DropdownPanel.displayName = "DropdownPanel";

/* ---------- small stable icon normalizer moved out to avoid re-creation ---------- */
const IconNorm = memo(({ IconComp, className = "", size = 16 }) => (
  <IconComp className={className} strokeWidth={1.6} style={{ display: "block" }} width={size} height={size} aria-hidden="true" />
));
IconNorm.displayName = "IconNorm";

/* ---------- Navbar component ---------- */
const Navbar = memo(function Navbar({ className = "", scrollToSection }) {
  const reduceMotion = useReducedMotion();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollThreshold = 20;

  // stable dropdowns
  const aboutDropdown = useDropdown(false);
  const academicsDropdown = useDropdown(false);

  // stats or other stable small arrays could be moved here (not required)

  // scroll handler using rAF (keeps usage low)
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setScrolled(y > scrollThreshold);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // navigation: depend only on stable setters to avoid unneeded recreations
  const handleNavigate = useCallback(
    (target) => {
      setMobileOpen(false);
      aboutDropdown.setOpen(false);
      academicsDropdown.setOpen(false);

      if (!target) return;

      const safe = sanitizeInput(String(target));
      if (safe.startsWith("/")) {
        window.location.assign(safe);
        return;
      }
      if (typeof scrollToSection === "function") {
        scrollToSection(safe);
        return;
      }
      const el = document.getElementById(safe);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn("Navigation target not found:", safe);
      }
    },
    // setOpen functions are stable; scrollToSection may change (included)
    [aboutDropdown.setOpen, academicsDropdown.setOpen, scrollToSection]
  );

  const handleApply = useCallback(() => {
    window.open("/admission", "_blank");
  }, []);

  useEffect(() => {
    // lock body scroll when mobile menu open
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
  }, [mobileOpen]);

  // small motion variants (kept minimal)
  const headerAnim = useMemo(
    () => ({
      backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "transparent",
      transition: { duration: 0.28, ease: [0.2, 0.9, 0.1, 1] },
    }),
    [scrolled]
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={reduceMotion ? {} : headerAnim}
        className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      >
        {/* use class toggles for heavy paint properties to avoid inline style recreation */}
        <div className={`w-full ${scrolled ? "backdrop-blur-xl bg-card/60" : "bg-transparent"}`}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-20 lg:h-24 transition-all duration-300">
              {/* Logo & brand (button) */}
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring/30 rounded-lg px-2 -ml-2"
                aria-label="Homepage"
              >
                <img src={LOGO_SRC} alt="Millennia World School" className="select-none drop-shadow-md w-[70px] lg:w-[70px] md:w-[60px]" draggable={false} />
                <div className="hidden md:flex flex-col leading-tight">
                  <span className="font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">Millennia World School</span>
                  <span className="text-xs text-muted-foreground font-medium">Kindergarten • Elementary • Junior High</span>
                </div>
              </button>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {NAV_STRUCTURE.map((nav) => {
                  if (nav.type === "link") {
                    const Icon = nav.icon;
                    return (
                      <button
                        key={nav.id}
                        onClick={() => handleNavigate(nav.href ?? nav.id)}
                        className="group relative px-3 py-2 rounded-lg text-sm font-semibold text-foreground/75 hover:text-foreground transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/30"
                        aria-label={nav.label}
                      >
                        <span className="flex items-center gap-2">
                          <IconNorm IconComp={Icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" size={16} />
                          <span>{nav.label}</span>
                        </span>
                        <span className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full transform -translate-x-1/2 w-0 group-hover:w-20 transition-all duration-200" />
                      </button>
                    );
                  }

                  if (nav.type === "dropdown") {
                    const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                    const Icon = nav.icon;
                    return (
                      <div key={nav.id} ref={dropdown.ref} className="relative">
                        <button
                          onClick={() => dropdown.toggle()}
                          aria-expanded={dropdown.open}
                          className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-foreground/75 hover:text-foreground transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/30"
                        >
                          <IconNorm IconComp={Icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" size={16} />
                          <span>{nav.label}</span>
                          <span className={`ml-1 transition-transform duration-200 ${dropdown.open ? "rotate-180" : "rotate-0"}`}>
                            <ChevronDown className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
                          </span>
                        </button>

                        {/* Dropdown (kept lightweight) */}
                        <DropdownPanel items={nav.items} open={dropdown.open} id={nav.id} onNavigate={handleNavigate} />
                      </div>
                    );
                  }

                  return null;
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleApply}
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-card via-primary/8 to-card text-primary font-bold text-sm border border-border/20 shadow-glass-md hover:shadow-glass-lg transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/50"
                >
                  <Send className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />Apply Now
                </button>

                <button
                  onClick={handleApply}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                  aria-label="Apply now"
                >
                  <Send className="w-4 h-4 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                </button>

                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? <X className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} /> : <Menu className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from being overlapped by fixed header */}
      {/* This ensures every page body has correct top offset */}
      <div aria-hidden className="h-20 lg:h-24" />

      {/* Mobile menu (kept animate presence) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }}
              className="fixed top-20 right-0 bottom-0 w-[85vw] max-w-sm z-50 lg:hidden"
              aria-label="Mobile menu"
            >
              <div className="glass glass--frosted glass--deep h-full overflow-y-auto">
                <div className="glass__refract" />
                <div className="glass__noise" />
                <div className="relative z-10 p-6 space-y-2">
                  {NAV_STRUCTURE.map((nav, idx) => {
                    if (nav.type === "link") {
                      const Icon = nav.icon;
                      return (
                        <button
                          key={nav.id}
                          onClick={() => handleNavigate(nav.href ?? nav.id)}
                          className="w-full flex items-center gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                            <Icon className="w-5 h-5 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                          </div>
                          <span>{nav.label}</span>
                        </button>
                      );
                    }

                    if (nav.type === "dropdown") {
                      const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                      const Icon = nav.icon;
                      return (
                        <div key={nav.id} ref={dropdown.ref}>
                          <button
                            onClick={() => dropdown.toggle()}
                            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                                <Icon className="w-5 h-5 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                              </div>
                              <span>{nav.label}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${dropdown.open ? "rotate-180" : "rotate-0"}`} style={{ display: "block" }} strokeWidth={1.6} />
                          </button>

                          <AnimatePresence>
                            {dropdown.open && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="pl-4 mt-1 space-y-1 overflow-hidden">
                                {nav.items.map((it) => (
                                  <button key={it.id} onClick={() => handleNavigate(it.href ?? it.id)} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30">
                                    <span className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                      {it.label}
                                    </span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    return null;
                  })}

                  <button onClick={handleApply} className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-gold to-emerald text-primary-foreground font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/50">
                    <Send className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} /> Apply Now
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
