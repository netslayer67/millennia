import { memo, useCallback, useEffect, useRef, useState } from "react";
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
import NavIcon from "./navbar/NavIcon";
import DropdownPanel from "./navbar/DropdownPanel";
import MobileDropdown from "./navbar/MobileDropdown";
import useDropdown from "./navbar/useDropdown";

const LOGO_SRC = "/Millennia.webp";

// Sanitize input
const sanitizeInput = (value) => {
  if (!value) return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, 200);
};

// Static nav structure (defined once, never recreated)
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
      { id: "junior-high", label: "Junior High", href: "/junior" },
      { id: "curriculum", label: "Curriculum & Assessment", href: "/curriculum" },
    ],
  },
  { type: "link", id: "calender", label: "School Calendar", icon: Calendar, href: "/calender" },
  { type: "link", id: "blog", label: "Blog", icon: BookOpen, href: "/blog" },
  { type: "link", id: "contact", label: "Contact", icon: MessageCircle, href: "/contact" },
];

// Main Navbar
const Navbar = memo(function Navbar({ scrollToSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const aboutDropdown = useDropdown();
  const academicsDropdown = useDropdown();

  // Ultra-optimized scroll handler (RAF + passive listener)
  useEffect(() => {
    let rafId = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 10) {
          setScrolled(currentScrollY > 20);
          lastScrollY = currentScrollY;
        }
        rafId = null;
      });
    };

    // Initial check
    setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Navigation handler (memoized with stable deps)
  const handleNavigate = useCallback(
    (target) => {
      setMobileOpen(false);
      aboutDropdown.close();
      academicsDropdown.close();

      if (!target) return;

      const safe = sanitizeInput(String(target));

      if (safe.startsWith("/")) {
        window.location.assign(safe);
        return;
      }

      if (scrollToSection) {
        scrollToSection(safe);
        return;
      }

      const el = document.getElementById(safe);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [aboutDropdown, academicsDropdown, scrollToSection]
  );

  const handleApply = useCallback(() => {
    window.open("/admission", "_blank", "noopener,noreferrer");
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll on mobile menu (optimized)
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: scrolled
            ? 'hsl(var(--background) / 0.95)'
            : 'hsl(var(--background) / 0)',
          borderBottom: scrolled ? '1px solid hsl(var(--border) / 0.2)' : '1px solid transparent',
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 rounded-lg px-2 -ml-2 transition-opacity duration-200 hover:opacity-90"
              style={{
                outlineColor: 'hsl(var(--ring) / 0.3)',
              }}
              aria-label="Homepage"
            >
              <img
                src={LOGO_SRC}
                alt="Millennia World School"
                className="w-[70px] lg:w-[70px] md:w-[60px]"
                width="70"
                height="70"
                loading="eager"
                decoding="async"
              />
              <div className="hidden md:flex flex-col leading-tight">
                <span
                  className="font-bold text-base bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--gold)), hsl(var(--primary)))',
                  }}
                >
                  Millennia World School
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
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
                      className="group relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                      style={{ color: 'hsl(var(--foreground) / 0.75)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--foreground))'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--foreground) / 0.75)'}
                      aria-label={nav.label}
                    >
                      <span className="flex items-center gap-2">
                        <NavIcon Icon={nav.icon} size={16} />
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
                        className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                        style={{ color: 'hsl(var(--foreground) / 0.75)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--foreground))'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--foreground) / 0.75)'}
                      >
                        <NavIcon Icon={nav.icon} size={16} />
                        <span>{nav.label}</span>
                        <ChevronDown
                          width={16}
                          height={16}
                          strokeWidth={1.6}
                          style={{
                            transform: dropdown.open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </button>

                      <DropdownPanel
                        items={nav.items}
                        isOpen={dropdown.open}
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
              {/* Desktop Apply Button */}
              <button
                onClick={handleApply}
                className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border shadow-md transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(to right, hsl(var(--card)), hsl(var(--primary) / 0.08), hsl(var(--card)))',
                  color: 'hsl(var(--primary))',
                  borderColor: 'hsl(var(--border) / 0.2)',
                }}
              >
                <Send width={16} height={16} strokeWidth={1.6} />
                Apply Now
              </button>

              {/* Mobile Apply Button */}
              <button
                onClick={handleApply}
                className="lg:hidden glass glass--frosted p-2.5 rounded-full border transition-transform duration-200 active:scale-95"
                style={{ borderColor: 'hsl(var(--border) / 0.4)' }}
                aria-label="Apply now"
              >
                <Send width={16} height={16} strokeWidth={1.6} style={{ color: 'hsl(var(--gold))' }} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobile}
                className="lg:hidden glass glass--frosted p-2.5 rounded-full border transition-transform duration-200 active:scale-95"
                style={{ borderColor: 'hsl(var(--border) / 0.4)' }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X width={20} height={20} strokeWidth={1.6} />
                ) : (
                  <Menu width={20} height={20} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div aria-hidden="true" className="h-20 lg:h-24" />

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMobile}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: 'hsl(var(--background) / 0.8)',
              animation: 'fadeIn 0.2s ease-out',
            }}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside
            className="fixed top-20 right-0 bottom-0 w-[85vw] max-w-sm z-50 lg:hidden"
            style={{ animation: 'slideIn 0.25s ease-out' }}
            aria-label="Mobile menu"
          >
            <div className="glass glass--frosted glass--deep h-full overflow-y-auto">
              <div className="glass__noise" />
              <div className="relative z-10 p-5 space-y-1.5">
                {NAV_STRUCTURE.map((nav) => {
                  if (nav.type === "link") {
                    return (
                      <button
                        key={nav.id}
                        onClick={() => handleNavigate(nav.href ?? nav.id)}
                        className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left font-semibold transition-all duration-200 active:scale-[0.98]"
                        style={{ color: 'hsl(var(--foreground) / 0.8)' }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.color = 'hsl(var(--foreground))';
                          e.currentTarget.style.background = 'linear-gradient(to right, hsl(var(--primary) / 0.1), hsl(var(--gold) / 0.05))';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.color = 'hsl(var(--foreground) / 0.8)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.15), hsl(var(--gold) / 0.1))',
                          }}
                        >
                          <NavIcon Icon={nav.icon} size={20} />
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
                          className="w-full flex items-center justify-between gap-3 p-3.5 rounded-xl text-left font-semibold transition-all duration-200 active:scale-[0.98]"
                          style={{ color: 'hsl(var(--foreground) / 0.8)' }}
                          onTouchStart={(e) => {
                            e.currentTarget.style.color = 'hsl(var(--foreground))';
                            e.currentTarget.style.background = 'linear-gradient(to right, hsl(var(--primary) / 0.1), hsl(var(--gold) / 0.05))';
                          }}
                          onTouchEnd={(e) => {
                            e.currentTarget.style.color = 'hsl(var(--foreground) / 0.8)';
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{
                                background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.15), hsl(var(--gold) / 0.1))',
                              }}
                            >
                              <NavIcon Icon={nav.icon} size={20} />
                            </div>
                            <span>{nav.label}</span>
                          </div>
                          <ChevronDown
                            width={16}
                            height={16}
                            strokeWidth={1.6}
                            style={{
                              transform: dropdown.open ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease',
                            }}
                          />
                        </button>

                        <MobileDropdown
                          items={nav.items}
                          isOpen={dropdown.open}
                          onNavigate={handleNavigate}
                        />
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Mobile Apply Button */}
                <button
                  onClick={handleApply}
                  className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--gold))',
                    color: 'hsl(var(--primary-foreground))',
                  }}
                >
                  <Send width={20} height={20} strokeWidth={1.6} />
                  Apply Now
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Lightweight CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;