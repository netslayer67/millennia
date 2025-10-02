// src/components/Navbar.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Calendar
} from "lucide-react";

const LOGO_SRC = "/Millennia.svg";

/* sanitize as you had */
const sanitizeInput = (value) => {
  if (!value) return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, 200);
};

function useDropdown(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef(null);

  const toggle = useCallback((next) => {
    setOpen((v) => (typeof next === "boolean" ? next : !v));
  }, []);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current || !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) {
      document.addEventListener("pointerdown", onDoc);
      return () => document.removeEventListener("pointerdown", onDoc);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  return { open, toggle, ref, setOpen };
}

/* Decorative blob unchanged */
const DecorativeBlob = React.memo(({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.06, 1],
      x: [0, 8, 0],
      y: [0, -8, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute pointer-events-none blur-3xl ${className}`}
    style={{
      background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
      width: "260px",
      height: "260px",
    }}
  />
));

/* DropdownPanel unchanged except uses href when available */
const DropdownPanel = React.memo(({ items, open, id, onNavigate }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }}
        className="absolute left-0 top-full mt-3 z-50"
      >
        <div className="glass glass--frosted glass--deep rounded-lg shadow-glass-lg border border-border/40 overflow-hidden min-w-[220px]">
          <div className="glass__refract" />
          <div className="glass__noise" />
          <ul role="menu" aria-label={`${id}-menu`} className="relative z-10 p-2 space-y-1">
            {items.map((it, idx) => (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.18 }}
              >
                <button
                  onClick={() => onNavigate(it.href ?? it.id)}
                  className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium
                    text-foreground/80 hover:text-foreground
                    hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-ring/30 focus:ring-offset-1"
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {it.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

const Navbar = React.memo(function Navbar({ className = "", scrollToSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const scrollThreshold = 20;

  const aboutDropdown = useDropdown(false);
  const academicsDropdown = useDropdown(false);

  const navStructure = useMemo(
    () => [
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
          { id: "elementary", label: "Elementary", href: "/academics/elementary" },
          { id: "junior-high", label: "Junior High", href: "/academics/junior-high" },
          { id: "curriculum", label: "Curriculum & Assessment", href: "/academics/curriculum" },
        ],
      },
      { type: "link", id: "calender", label: "School Calender", icon: Calendar, href: "/calender" },
      { type: "link", id: "blog", label: "Blog", icon: BookOpen, href: "/blog" },
      { type: "link", id: "contact", label: "Contact", icon: MessageCircle, href: "/contact" },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setAtTop(y <= scrollThreshold);
        setScrolled(y > 10);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Improved navigation logic:
   * - If argument looks like a path (starts with '/'), navigate to that path (sanitized).
   * - Else, if scrollToSection exists, call it (for anchor-like behavior).
   * - Else, try to find element by id and scrollIntoView.
   */
  const handleNavigate = useCallback(
    (target) => {
      // close menus
      setMobileOpen(false);
      aboutDropdown.setOpen(false);
      academicsDropdown.setOpen(false);

      if (!target) return;

      // sanitize
      const safe = sanitizeInput(String(target));

      // if starts with '/', treat as route path
      if (safe.startsWith("/")) {
        // Use location.assign so browser handles it normally; this works in SPA & full page.
        // If you later use react-router and want client-side navigation, replace with router.push.
        window.location.assign(safe);
        return;
      }

      // If scrollToSection provided, call it
      if (typeof scrollToSection === "function") {
        scrollToSection(safe);
        return;
      }

      // fallback: try element by id
      const el = document.getElementById(safe);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // if nothing matches, no-op
        console.warn("Navigation target not found:", safe);
      }
    },
    [aboutDropdown, academicsDropdown, scrollToSection]
  );

  const handleApply = useCallback(() => {
    window.open("/admission", "_blank");
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* small icon helper to normalize lucide icons (display:block + stroke weight) */
  const IconNorm = ({ IconComp, className = "", size = 16 }) => (
    <IconComp
      className={className}
      strokeWidth={1.6}
      style={{ display: "block" }}
      width={size}
      height={size}
      aria-hidden="true"
    />
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: atTop ? "transparent" : "hsl(var(--card) / 0.75)",
        }}
        transition={{ duration: 0.3, ease: [0.2, 0.9, 0.1, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${className}`}
        style={{
          backdropFilter: scrolled ? "blur(18px) saturate(120%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(120%)" : "none",
        }}
      >
        {scrolled && (
          <>
            <DecorativeBlob className="top-0 -right-20 opacity-20" delay={0} />
            <DecorativeBlob className="top-0 -left-16 opacity-14" delay={0.6} />
          </>
        )}

        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 lg:h-24 transition-all duration-300">
            {/* Logo & brand */}
            <motion.button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring/30 rounded-lg px-2 -ml-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <motion.img
                src={LOGO_SRC}
                alt="Millennia World School"
                initial={false}
                animate={{
                  width: atTop ? 72 : 52,
                  height: atTop ? 72 : 52,
                }}
                transition={{ duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }}
                className="select-none drop-shadow-md"
                draggable={false}
              />
              <div className="hidden md:flex flex-col leading-tight">
                <motion.span
                  initial={false}
                  animate={{ fontSize: atTop ? "1.06rem" : "0.95rem" }}
                  transition={{ duration: 0.28 }}
                  className="font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent"
                >
                  Millennia World School
                </motion.span>
                <span className="text-xs text-muted-foreground font-medium">
                  Kindergarten • Elementary • Junior High
                </span>
              </div>
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navStructure.map((nav) => {
                if (nav.type === "link") {
                  const Icon = nav.icon;
                  return (
                    <motion.button
                      key={nav.id}
                      onClick={() => handleNavigate(nav.href ?? nav.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="group relative px-3 py-2 rounded-lg text-sm font-semibold
                        text-foreground/75 hover:text-foreground
                        transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-ring/30"
                    >
                      <span className="flex items-center gap-2">
                        <IconNorm IconComp={Icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" size={16} />
                        <span>{nav.label}</span>
                      </span>

                      <motion.div
                        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: "56%", x: "-50%" }}
                        transition={{ duration: 0.28 }}
                      />
                    </motion.button>
                  );
                }

                if (nav.type === "dropdown") {
                  const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                  const Icon = nav.icon;
                  return (
                    <div key={nav.id} ref={dropdown.ref} className="relative">
                      <motion.button
                        onClick={() => dropdown.toggle()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        aria-expanded={dropdown.open}
                        className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg
                          text-sm font-semibold text-foreground/75 hover:text-foreground
                          transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-ring/30"
                      >
                        <IconNorm IconComp={Icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" size={16} />
                        {nav.label}
                        <motion.div animate={{ rotate: dropdown.open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                          <ChevronDown className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
                        </motion.div>

                        <motion.div
                          className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full"
                          initial={{ width: 0, x: "-50%" }}
                          animate={{ width: dropdown.open ? "56%" : 0, x: "-50%" }}
                          transition={{ duration: 0.28 }}
                        />
                      </motion.button>

                      <DropdownPanel items={nav.items} open={dropdown.open} id={nav.id} onNavigate={handleNavigate} />
                    </div>
                  );
                }

                return null;
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <motion.button
                onClick={handleApply}
                whileHover={{ scale: 1.04, boxShadow: "0 10px 40px rgba(16,24,40,0.12)" }}
                whileTap={{ scale: 0.96 }}
                className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full
                  bg-gradient-to-r from-card via-primary/8 to-card
                  text-primary font-bold text-sm
                  border border-border/20
                  shadow-glass-md hover:shadow-glass-lg
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2"
                aria-label="Apply Now"
              >
                <Send className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
                Apply Now
              </motion.button>

              {/* Mobile CTA (icon-only) */}
              <motion.button
                onClick={handleApply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                aria-label="Apply now"
              >
                <Send className="w-4 h-4 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.2, 0.9, 0.1, 1] }}
              className="fixed top-20 right-0 bottom-0 w-[85vw] max-w-sm z-50 lg:hidden"
            >
              <div className="glass glass--frosted glass--deep h-full overflow-y-auto">
                <div className="glass__refract" />
                <div className="glass__noise" />
                <div className="relative z-10 p-6 space-y-2">
                  {navStructure.map((nav, idx) => {
                    if (nav.type === "link") {
                      const Icon = nav.icon;
                      return (
                        <motion.button
                          key={nav.id}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.2 }}
                          onClick={() => handleNavigate(nav.href ?? nav.id)}
                          className="w-full flex items-center gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/30"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                            <Icon className="w-5 h-5 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                          </div>
                          {nav.label}
                        </motion.button>
                      );
                    }

                    if (nav.type === "dropdown") {
                      const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                      const Icon = nav.icon;
                      return (
                        <motion.div key={nav.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05, duration: 0.2 }} ref={dropdown.ref}>
                          <button
                            onClick={() => dropdown.toggle()}
                            className="w-full flex items-center justify-between gap-3 p-4 rounded-xl text-left font-semibold text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                                <Icon className="w-5 h-5 text-gold" style={{ display: "block" }} strokeWidth={1.6} />
                              </div>
                              {nav.label}
                            </div>
                            <motion.div animate={{ rotate: dropdown.open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                              <ChevronDown className="w-4 h-4" style={{ display: "block" }} strokeWidth={1.6} />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {dropdown.open && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className="pl-4 mt-1 space-y-1 overflow-hidden">
                                {nav.items.map((it, subIdx) => (
                                  <motion.button
                                    key={it.id}
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIdx * 0.03, duration: 0.18 }}
                                    onClick={() => handleNavigate(it.href ?? it.id)}
                                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-surface/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/30"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                      {it.label}
                                    </span>
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return null;
                  })}

                  {/* Mobile CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navStructure.length * 0.05, duration: 0.2 }}
                    onClick={handleApply}
                    className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-gold to-emerald text-primary-foreground font-bold shadow-glass-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring/50"
                  >
                    <Send className="w-5 h-5" style={{ display: "block" }} strokeWidth={1.6} />
                    Apply Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
