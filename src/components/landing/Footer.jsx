import { memo, useCallback, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const LOGO_SRC = "/MWS-Long.svg";

// Static framework text (module-level constant)
const FRAMEWORK_TEXT = "Our curriculum utilizes the full range of activities that are designed to enrich creative young minds. We use Finnish Waldorf Framework integrated with Indonesian National Curriculum, subjects are seamlessly integrated with each other providing nuance, context, understanding and deeper learning. Our deep and varied curriculum includes age-appropriate, rigorous academic work, as well as rich artistic experiences that combine to make learning an adventure, not a chore.";

// Sanitization utilities
const sanitizeHref = (href = "") => {
  try {
    const cleaned = String(href).trim();
    if (!cleaned) return "#";
    if (/^\s*(javascript|data|vbscript):/i.test(cleaned)) return "#";
    return cleaned;
  } catch {
    return "#";
  }
};

const sanitizeEmail = (str = "") => {
  return String(str)
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, 100);
};

// Lightweight icon wrapper
const Icon = memo(({ Component, size = 16 }) => (
  <Component width={size} height={size} strokeWidth={1.6} aria-hidden="true" />
));
Icon.displayName = "Icon";

// Social button component
const SocialButton = memo(({ IconComp, label, href }) => (
  <a
    href={sanitizeHref(href)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="glass p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
    style={{
      background: 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--surface)))',
      border: '1px solid hsl(var(--border) / 0.3)',
      color: 'hsl(var(--foreground))',
    }}
  >
    <Icon Component={IconComp} size={20} />
  </a>
));
SocialButton.displayName = "SocialButton";

// Contact info row
const ContactRow = memo(({ IconComp, text, iconColor = 'hsl(var(--emerald))' }) => (
  <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
    <span style={{ color: iconColor }}>
      <Icon Component={IconComp} size={16} />
    </span>
    <span>{text}</span>
  </div>
));
ContactRow.displayName = "ContactRow";

// Main Footer Component
const Footer = memo(function Footer({ scrollToSection }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const cleaned = sanitizeEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!emailRegex.test(cleaned)) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus(null), 3000);
  }, [email]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (scrollToSection) {
      scrollToSection("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollToSection]);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        borderTop: '1px solid hsl(var(--border) / 0.1)',
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <div
        className="absolute -top-16 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)',
          animation: 'blobFloat 14s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold) / 0.1), transparent 70%)',
          animation: 'blobFloat 16s ease-in-out infinite 2s',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto" style={{ padding: 'clamp(3rem, 8vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {/* Column 1: Branding */}
          <div className="space-y-4">
            <button
              onClick={handleLogoClick}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg transition-opacity duration-200 hover:opacity-90"
              style={{ outlineColor: 'hsl(var(--ring) / 0.3)' }}
              aria-label="Millennia World School Home"
            >
              <img
                src={LOGO_SRC}
                alt="Millennia World School"
                className="h-10"
                width="160"
                height="40"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </button>

            <p
              className="leading-relaxed max-w-[420px]"
              style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}
            >
              Achieving High Standards — a refined, international education that prepares students for a bold future.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <SocialButton IconComp={Facebook} label="Facebook" href="https://facebook.com" />
              <SocialButton IconComp={Twitter} label="Twitter" href="https://twitter.com" />
              <SocialButton IconComp={Instagram} label="Instagram" href="https://instagram.com" />
            </div>

            <div className="pt-3 space-y-1" style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
              <span className="block">Millennia World School</span>
              <span className="block">International Curriculum • Personalized Mentorship</span>
            </div>
          </div>

          {/* Column 2: Framework */}
          <div className="space-y-4">
            <h3
              className="font-semibold uppercase tracking-wider"
              style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}
            >
              Our Framework
            </h3>

            <div className="glass glass--frosted rounded-xl transition-transform duration-300 hover:translate-y-[-3px]" style={{ padding: 'clamp(1rem, 3vw, 1.25rem)' }}>
              <div className="glass__noise" />
              <p
                className="relative z-10 leading-relaxed"
                style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground))' }}
              >
                {FRAMEWORK_TEXT}
              </p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3
              className="font-semibold uppercase tracking-wider"
              style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}
            >
              Contact Us
            </h3>

            <div className="space-y-3">
              <ContactRow IconComp={Mail} text="info@millenniaws.sch.id" />
              <ContactRow IconComp={Phone} text="+62 812-3456-7890" />
              <ContactRow IconComp={MapPin} text="Millennia Campus, Jakarta, Indonesia" />
            </div>

            {/* Newsletter */}
            <div className="pt-3 space-y-2">
              <div className="flex w-full max-w-sm gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  className="flex-1 px-3 py-2 rounded-lg border outline-none transition-all duration-200"
                  style={{
                    background: 'hsl(var(--input))',
                    borderColor: 'hsl(var(--border) / 0.4)',
                    color: 'hsl(var(--foreground))',
                    fontSize: '0.875rem',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'hsl(var(--ring))';
                    e.target.style.boxShadow = '0 0 0 3px hsl(var(--ring) / 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'hsl(var(--border) / 0.4)';
                    e.target.style.boxShadow = 'none';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  maxLength={100}
                />
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: 'hsl(var(--gold))',
                    color: 'hsl(var(--gold-foreground))',
                    fontSize: '0.875rem',
                  }}
                >
                  Subscribe
                </button>
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--emerald))' }}>
                  Subscribed successfully!
                </p>
              )}
              {status === "error" && (
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--primary))' }}>
                  Invalid email address.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{
            marginTop: 'clamp(2.5rem, 6vw, 3rem)',
            borderTop: '1px solid hsl(var(--border) / 0.2)',
            fontSize: '0.75rem',
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          <span>© {currentYear} Millennia World School. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <a
              href="#privacy"
              className="transition-colors duration-200"
              style={{ color: 'hsl(var(--muted-foreground))' }}
              onMouseEnter={(e) => e.target.style.color = 'hsl(var(--foreground))'}
              onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="transition-colors duration-200"
              style={{ color: 'hsl(var(--muted-foreground))' }}
              onMouseEnter={(e) => e.target.style.color = 'hsl(var(--foreground))'}
              onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
      `}</style>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;