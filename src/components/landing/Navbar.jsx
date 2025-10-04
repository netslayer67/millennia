// src/components/Navbar.jsx (ULTRA OPTIMIZED for Mobile)
// Removes heavy backdrop-blur, minimizes animations, optimizes re-renders
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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

/* ---------- stable nav structure ---------- */
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

/* ---------- useDropdown ---------- */
function useDropdown(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef(null);

  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
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

  return { open, toggle, ref, setOpen };
}

/* ---------- Lightweight Icon Component ---------- */
const NavIcon = memo(({ Icon, className = "" }) => (
  <Icon className={className} strokeWidth={1.6} aria-hidden="true" />
));
NavIcon.displayName = "NavIcon";

/* ---------- Desktop Dropdown Panel (NO Framer Motion) ---------- */
const DropdownPanel = memo(({ items, open, onNavigate }) => {
  if (!open) return null;

  return (
    <div
      className="absolute left-0 top-full mt-3 z-50 opacity-0 animate-fade-in"
      style={{
        animation: 'fadeIn 0.2s ease-out forwards',
      }}
    >
      <div className="glass glass--frosted glass--deep rounded-lg shadow-glass-lg border border-border/40 overflow-hidden min-w-[220px]">
        <ul role="menu" className="relative z-10 p-2 space-y-1">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => onNavigate(it.href ?? it.id)}
                className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium
                  text-foreground/80 hover:text-foreground
                  hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5
                  transition-colors duration-200"
                role="menuitem"
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
DropdownPanel.displayName = "DropdownPanel";

/* ---------- Mobile Dropdown (NO Framer Motion) ---------- */
const MobileDropdown = memo(({ items, open, onNavigate }) => {
  if (!open) return null;

  return (
    <div className="pl-4 mt-1 space-y-1">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onNavigate(it.href ?? it.id)}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium 
            text-foreground/75 hover:text-foreground hover:bg-surface/50 
            transition-colors duration-200"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            {it.label}
          </span>
        </button>
      ))}
    </div>
  );
});
MobileDropdown.displayName = "MobileDropdown";

/* ---------- Main Navbar Component ---------- */
const Navbar = memo(function Navbar({ className = "", scrollToSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const aboutDropdown = useDropdown(false);
  const academicsDropdown = useDropdown(false);

  // Optimized scroll handler with debouncing
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigation handler
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
      }
    },
    [aboutDropdown.setOpen, academicsDropdown.setOpen, scrollToSection]
  );

  const handleApply = useCallback(() => {
    window.open("/admission", "_blank");
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Header - NO Framer Motion, Pure CSS transitions */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}`}
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        }}
      >
        {/* REMOVED backdrop-blur - this is the heaviest performance killer on mobile */}
        <div className="w-full">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-20 lg:h-24">

              {/* Logo */}
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring/30 rounded-lg px-2 -ml-2"
                aria-label="Homepage"
              >
                <img
                  src={LOGO_SRC}
                  alt="Millennia World School"
                  className="w-[70px] lg:w-[70px] md:w-[60px]"
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
                {NAV_STRUCTURE.map((nav) => {
                  if (nav.type === "link") {
                    return (
                      <button
                        key={nav.id}
                        onClick={() => handleNavigate(nav.href ?? nav.id)}
                        className="group relative px-3 py-2 rounded-lg text-sm font-semibold 
                          text-foreground/75 hover:text-foreground transition-colors"
                        aria-label={nav.label}
                      >
                        <span className="flex items-center gap-2">
                          <NavIcon Icon={nav.icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                          <span>{nav.label}</span>
                        </span>
                      </button>
                    );
                  }

                  if (nav.type === "dropdown") {
                    const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                    return (
                      <div key={nav.id} ref={dropdown.ref} className="relative">
                        <button
                          onClick={dropdown.toggle}
                          aria-expanded={dropdown.open}
                          className="group relative inline-flex items-center gap-2 px-3 py-2 
                            rounded-lg text-sm font-semibold text-foreground/75 
                            hover:text-foreground transition-colors"
                        >
                          <NavIcon Icon={nav.icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                          <span>{nav.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${dropdown.open ? "rotate-180" : ""}`}
                            strokeWidth={1.6}
                          />
                        </button>

                        <DropdownPanel
                          items={nav.items}
                          open={dropdown.open}
                          onNavigate={handleNavigate}
                        />
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
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full 
                    bg-gradient-to-r from-card via-primary/8 to-card text-primary 
                    font-bold text-sm border border-border/20 shadow-glass-md 
                    hover:shadow-glass-lg transition-all"
                >
                  <Send className="w-4 h-4" strokeWidth={1.6} />
                  Apply Now
                </button>

                <button
                  onClick={handleApply}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50"
                  aria-label="Apply now"
                >
                  <Send className="w-4 h-4 text-gold" strokeWidth={1.6} />
                </button>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden glass glass--frosted p-2.5 rounded-full border border-border/50"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" strokeWidth={1.6} />
                  ) : (
                    <Menu className="w-5 h-5" strokeWidth={1.6} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div aria-hidden="true" className="h-20 lg:h-24" />

      {/* Mobile Menu - NO Framer Motion, Pure CSS */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-background/80 z-40 lg:hidden animate-fade-in"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          />

          {/* Sidebar - REMOVED backdrop-blur */}
          <aside
            className="fixed top-20 right-0 bottom-0 w-[85vw] max-w-sm z-50 lg:hidden animate-slide-in"
            style={{ animation: 'slideInRight 0.25s ease-out' }}
            aria-label="Mobile menu"
          >
            <div className="glass glass--frosted glass--deep h-full overflow-y-auto">
              <div className="relative z-10 p-6 space-y-2">
                {NAV_STRUCTURE.map((nav) => {
                  if (nav.type === "link") {
                    return (
                      <button
                        key={nav.id}
                        onClick={() => handleNavigate(nav.href ?? nav.id)}
                        className="w-full flex items-center gap-3 p-4 rounded-xl text-left 
                          font-semibold text-foreground/80 hover:text-foreground 
                          hover:bg-gradient-to-r hover:from-primary/10 hover:to-gold/5 
                          transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                          <nav.icon className="w-5 h-5 text-gold" strokeWidth={1.6} />
                        </div>
                        <span>{nav.label}</span>
                      </button>
                    );
                  }

                  if (nav.type === "dropdown") {
                    const dropdown = nav.id === "about" ? aboutDropdown : academicsDropdown;
                    return (
                      <div key={nav.id} ref={dropdown.ref}>
                        <button
                          onClick={dropdown.toggle}
                          className="w-full flex items-center justify-between gap-3 p-4 
                            rounded-xl text-left font-semibold text-foreground/80 
                            hover:text-foreground hover:bg-gradient-to-r 
                            hover:from-primary/10 hover:to-gold/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/18 to-gold/10">
                              <nav.icon className="w-5 h-5 text-gold" strokeWidth={1.6} />
                            </div>
                            <span>{nav.label}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${dropdown.open ? "rotate-180" : ""}`}
                            strokeWidth={1.6}
                          />
                        </button>

                        <MobileDropdown
                          items={nav.items}
                          open={dropdown.open}
                          onNavigate={handleNavigate}
                        />
                      </div>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={handleApply}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 
                    rounded-xl bg-gradient-to-r from-primary via-gold to-emerald 
                    text-primary-foreground font-bold transition-opacity"
                >
                  <Send className="w-5 h-5" strokeWidth={1.6} />
                  Apply Now
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;