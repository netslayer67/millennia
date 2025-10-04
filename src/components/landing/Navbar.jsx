// src/components/Navbar.jsx (Performance Optimized)
import React, { memo, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { m, AnimatePresence, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
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

// ---------- Static Constants (moved outside to prevent recreation) ----------
const LOGO_SRC = "/Millennia.webp";
const SCROLL_THRESHOLD = 20;

// ---------- Optimized Input Sanitization ----------
const sanitizeInput = (value) => {
  if (!value || typeof value !== 'string') return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, 200);
};

// ---------- Frozen Navigation Structure ----------
const NAV_STRUCTURE = Object.freeze([
  Object.freeze({ type: "link", id: "home", label: "Home", icon: Home, href: "/" }),
  Object.freeze({
    type: "dropdown",
    id: "about",
    label: "About Us",
    icon: Users,
    href: "/about",
    items: Object.freeze([
      Object.freeze({ id: "about-overview", label: "About Millennia", href: "/about" }),
      Object.freeze({ id: "faqs", label: "FAQs", href: "/faqs" }),
    ]),
  }),
  Object.freeze({
    type: "dropdown",
    id: "academics",
    label: "Academics",
    icon: GraduationCap,
    href: "#",
    items: Object.freeze([
      Object.freeze({ id: "kindergarten", label: "Kindergarten", href: "/kinder" }),
      Object.freeze({ id: "elementary", label: "Elementary", href: "/elemen" }),
      Object.freeze({ id: "junior-high", label: "Junior High", href: "/academics/junior-high" }),
      Object.freeze({ id: "curriculum", label: "Curriculum & Assessment", href: "/academics/curriculum" }),
    ]),
  }),
  Object.freeze({ type: "link", id: "calender", label: "School Calender", icon: Calendar, href: "/calender" }),
  Object.freeze({ type: "link", id: "blog", label: "Blog", icon: BookOpen, href: "/blog" }),
  Object.freeze({ type: "link", id: "contact", label: "Contact", icon: MessageCircle, href: "/contact" }),
]);

// ---------- Motion Variants (frozen for performance) ----------
const MOTION_VARIANTS = Object.freeze({
  backdrop: Object.freeze({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.22 }
  }),
  mobileSidebar: Object.freeze({
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }
  }),
  dropdown: Object.freeze({
    initial: { opacity: 0, y: -6, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.99 },
    transition: { duration: 0.22 }
  }),
  mobileDropdown: Object.freeze({
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.22 }
  })
});

// ---------- Pre-computed Class Names ----------
const CLASS_NAMES = Object.freeze({
  navButton: "group relative px-3 py-2 rounded-lg text-sm font-semibold text-foreground/75 hover:text-foreground transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/30",
  dropdownButton: "group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-foreground/75 hover:text-foreground transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/30",
  mobileNavButton: "w-full flex items-center gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30",
  mobileDropdownButton: "w-full flex items-center justify-between gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30",
  iconContainer: "p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10",
  applyButton: "hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-card via-primary/8 to-card text-primary font-bold text-sm border border-border/20 shadow-glass-md hover:shadow-glass-lg transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring/50",
  mobileApplyButton: "w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-gold to-emerald text-primary-foreground font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/50"
});

// ---------- Optimized useDropdown Hook ----------
const useDropdown = (initial = false) => {
  const [open, setOpen] = useState(initial);
  const ref = useRef(null);

  const toggle = useCallback((next) => {
    setOpen(prev => typeof next === "boolean" ? next : !prev);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return useMemo(() => ({ open, toggle, ref, setOpen }), [open, toggle]);
};

// ---------- Memoized Icon Component ----------
const OptimizedIcon = memo(({ IconComp, className = "", size = 16, strokeWidth = 1.6 }) => (
  <IconComp
    className={className}
    strokeWidth={strokeWidth}
    width={size}
    height={size}
    aria-hidden="true"
    style={{ display: "block" }}
  />
));
OptimizedIcon.displayName = "OptimizedIcon";

// ---------- Memoized Dropdown Panel ----------
const DropdownPanel = memo(({ items, open, id, onNavigate }) => (
  <AnimatePresence>
    {open && (
      <m.div
        {...MOTION_VARIANTS.dropdown}
        className="absolute left-0 top-full mt-3 z-50"
      >
        <div className="glass glass--frosted glass--deep rounded-lg shadow-glass-lg border border-border/40 overflow-hidden min-w-[220px]">
          <div className="glass__refract" />
          <div className="glass__noise" />
          <ul role="menu" aria-label={`${id}-menu`} className="relative z-10 p-2 space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.href ?? item.id)}
                  className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-1"
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </m.div>
    )}
  </AnimatePresence>
));
DropdownPanel.displayName = "DropdownPanel";

// ---------- Memoized Navigation Items ----------
const DesktopNavItem = memo(({ nav, onNavigate, dropdown }) => {
  if (nav.type === "link") {
    return (
      <button
        onClick={() => onNavigate(nav.href ?? nav.id)}
        className={CLASS_NAMES.navButton}
        aria-label={nav.label}
      >
        <span className="flex items-center gap-2">
          <OptimizedIcon IconComp={nav.icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          <span>{nav.label}</span>
        </span>
        <span className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full transform -translate-x-1/2 w-0 group-hover:w-20 transition-all duration-200" />
      </button>
    );
  }

  if (nav.type === "dropdown") {
    return (
      <div ref={dropdown.ref} className="relative">
        <button
          onClick={() => dropdown.toggle()}
          aria-expanded={dropdown.open}
          className={CLASS_NAMES.dropdownButton}
        >
          <OptimizedIcon IconComp={nav.icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          <span>{nav.label}</span>
          <span className={`ml-1 transition-transform duration-200 ${dropdown.open ? "rotate-180" : "rotate-0"}`}>
            <ChevronDown className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
          </span>
        </button>
        <DropdownPanel items={nav.items} open={dropdown.open} id={nav.id} onNavigate={onNavigate} />
      </div>
    );
  }

  return null;
});
DesktopNavItem.displayName = "DesktopNavItem";

const MobileNavItem = memo(({ nav, onNavigate, dropdown }) => {
  if (nav.type === "link") {
    return (
      <button
        onClick={() => onNavigate(nav.href ?? nav.id)}
        className={CLASS_NAMES.mobileNavButton}
      >
        <div className={CLASS_NAMES.iconContainer}>
          <OptimizedIcon IconComp={nav.icon} className="w-5 h-5 text-gold" />
        </div>
        <span>{nav.label}</span>
      </button>
    );
  }

  if (nav.type === "dropdown") {
    return (
      <div ref={dropdown.ref}>
        <button
          onClick={() => dropdown.toggle()}
          className={CLASS_NAMES.mobileDropdownButton}
        >
          <div className="flex items-center gap-3">
            <div className={CLASS_NAMES.iconContainer}>
              <OptimizedIcon IconComp={nav.icon} className="w-5 h-5 text-gold" />
            </div>
            <span>{nav.label}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${dropdown.open ? "rotate-180" : "rotate-0"}`}
            style={{ display: "block" }}
            strokeWidth={1.6}
          />
        </button>

        <AnimatePresence>
          {dropdown.open && (
            <m.div
              {...MOTION_VARIANTS.mobileDropdown}
              className="pl-4 mt-1 space-y-1 overflow-hidden"
            >
              {nav.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.href ?? item.id)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    {item.label}
                  </span>
                </button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
});
MobileNavItem.displayName = "MobileNavItem";

// ---------- Main Navbar Component ----------
const Navbar = memo(({ className = "", scrollToSection }) => {
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Stable dropdown hooks
  const aboutDropdown = useDropdown(false);
  const academicsDropdown = useDropdown(false);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setScrolled(y > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimized navigation handler
  const handleNavigate = useCallback((target) => {
    // Close all dropdowns and mobile menu
    setMobileOpen(false);
    aboutDropdown.setOpen(false);
    academicsDropdown.setOpen(false);

    if (!target) return;

    const safeTarget = sanitizeInput(String(target));
    if (safeTarget.startsWith("/")) {
      window.location.assign(safeTarget);
      return;
    }

    if (typeof scrollToSection === "function") {
      scrollToSection(safeTarget);
      return;
    }

    const element = document.getElementById(safeTarget);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("Navigation target not found:", safeTarget);
    }
  }, [aboutDropdown.setOpen, academicsDropdown.setOpen, scrollToSection]);

  const handleApply = useCallback(() => {
    window.open("/admission", "_blank", "noopener,noreferrer");
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [mobileOpen]);

  // Memoized header animation
  const headerAnimation = useMemo(() => ({
    backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "transparent",
    transition: { duration: 0.28, ease: [0.2, 0.9, 0.1, 1] },
  }), [scrolled]);

  // Memoized dropdown mappings
  const dropdownMap = useMemo(() => ({
    about: aboutDropdown,
    academics: academicsDropdown
  }), [aboutDropdown, academicsDropdown]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.header
        initial={false}
        animate={reduceMotion ? {} : headerAnimation}
        className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      >
        <div className={`w-full transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-card/60" : "bg-transparent"}`}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-20 lg:h-24 transition-all duration-300">

              {/* Logo & Brand */}
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring/30 rounded-lg px-2 -ml-2"
                aria-label="Homepage"
              >
                <img
                  src={LOGO_SRC}
                  alt="Millennia World School"
                  className="select-none drop-shadow-md w-[70px] lg:w-[70px] md:w-[60px]"
                  draggable={false}
                  loading="eager"
                  decoding="sync"
                />
                <div className="hidden md:flex flex-col leading-tight">
                  <span className="font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
                    Millennia World School
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Kindergarten • Elementary • Junior High
                  </span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {NAV_STRUCTURE.map((nav) => (
                  <DesktopNavItem
                    key={nav.id}
                    nav={nav}
                    onNavigate={handleNavigate}
                    dropdown={dropdownMap[nav.id]}
                  />
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button onClick={handleApply} className={CLASS_NAMES.applyButton}>
                  <Send className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
                  Apply Now
                </button>

                <button
                  onClick={handleApply}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                  aria-label="Apply now"
                >
                  <Send className="w-4 h-4 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                </button>

                <button
                  onClick={() => setMobileOpen(prev => !prev)}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? (
                      <X className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    ) : (
                      <Menu className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </m.header>

      {/* Spacer */}
      <div aria-hidden="true" className="h-20 lg:h-24" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              {...MOTION_VARIANTS.backdrop}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
            />

            <m.aside
              {...MOTION_VARIANTS.mobileSidebar}
              className="fixed top-20 right-0 bottom-0 w-[85vw] max-w-sm z-50 lg:hidden"
              aria-label="Mobile menu"
            >
              <div className="glass glass--frosted glass--deep h-full overflow-y-auto">
                <div className="glass__refract" />
                <div className="glass__noise" />
                <div className="relative z-10 p-6 space-y-2">
                  {NAV_STRUCTURE.map((nav) => (
                    <MobileNavItem
                      key={nav.id}
                      nav={nav}
                      onNavigate={handleNavigate}
                      dropdown={dropdownMap[nav.id]}
                    />
                  ))}

                  <button onClick={handleApply} className={CLASS_NAMES.mobileApplyButton}>
                    <Send className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    Apply Now
                  </button>
                </div>
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
