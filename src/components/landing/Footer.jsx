// src/components/Footer.jsx
import React, { memo, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const LOGO = "/MWS-Long.svg";

// --- Sanitation helpers ---
const sanitizeHref = (href = "") => {
  try {
    const s = String(href).trim();
    if (!s) return "#";
    if (/^\s*(javascript|data|vbscript):/i.test(s)) return "#";
    return s;
  } catch {
    return "#";
  }
};
const sanitizeText = (str = "") =>
  String(str)
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, 500);

// --- Social Icon Button (clean, centered, consistent) ---
const SocialIconBtn = memo(({ Icon, label, href }) => (
  <a
    href={sanitizeHref(href)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {/* Make sure icon sits above glass pseudo layers */}
    <span className="relative z-10 block w-5 h-5">
      {/* Explicit strokeWidth for consistent weight across icons */}
      <Icon className="w-full h-full" strokeWidth={1.6} aria-hidden="true" />
    </span>

    {/* subtle decorative rim — below the icon (kept for polish, non-interfering) */}
    <span
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none rounded-xl"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -6px 12px rgba(0,0,0,0.03)",
      }}
    />
  </a>
));

// --- Footer ---
const Footer = memo(function Footer({ scrollToSection } = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const frameworkText = useMemo(
    () =>
      "Our curriculum utilizes the full range of activities that are designed to enrich creative young minds. We use Finnish Waldorf Framework integrated with Indonesian National Curriculum, subjects are seamlessly integrated with each other providing nuance, context, understanding and deeper learning. Our deep and varied curriculum includes age-appropriate, rigorous academic work, as well as rich artistic experiences that combine to make learning an adventure, not a chore.",
    []
  );

  const onSubmitEmail = useCallback(
    (e) => {
      e.preventDefault();
      const value = sanitizeText(email);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailPattern.test(value)) {
        setStatus("error");
        return;
      }
      setStatus("ok");
      setEmail("");
      setTimeout(() => setStatus(null), 3000);
    },
    [email]
  );

  const handleScrollTo = useCallback(
    (id) => {
      if (typeof scrollToSection === "function") {
        scrollToSection(id);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [scrollToSection]
  );

  return (
    <footer
      className="relative overflow-hidden bg-background text-foreground border-t border-border/10"
      aria-labelledby="footer-heading"
    >
      {/* Subtle premium grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 18%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Decorative animated blobs */}
      <div className="absolute -top-16 -left-24 w-72 h-72 rounded-full blur-3xl bg-primary/15 animate-blob-left opacity-80 pointer-events-none" />
      <div className="absolute -bottom-20 -right-24 w-72 h-72 rounded-full blur-3xl bg-gold/12 animate-blob-right opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-3 focus:outline-none"
              onClick={() => handleScrollTo("home")}
              aria-label="Millennia Home"
            >
              <img src={LOGO} alt="Millennia World School" className="h-10" draggable={false} />
            </button>
            <p className="text-sm text-muted-foreground max-w-[420px] leading-relaxed">
              Achieving High Standards — a refined, international education that prepares students for a bold future.
            </p>

            {/* CLEAN ICON ROW: uniform squares with good spacing */}
            <div className="flex items-center gap-3 mt-2">
              <SocialIconBtn Icon={Facebook} label="Facebook" href="https://facebook.com" />
              <SocialIconBtn Icon={Twitter} label="Twitter" href="https://twitter.com" />
              <SocialIconBtn Icon={Instagram} label="Instagram" href="https://instagram.com" />
            </div>

            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <span className="block">Millennia World School</span>
              <span className="block">International Curriculum • Personalized Mentorship</span>
            </div>
          </div>

          {/* Column 2: Framework */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Our Framework</h3>
            <div className="glass glass-card glass--frosted p-4 rounded-xl transition-transform duration-300 hover:translate-y-[-4px]">
              <div className="glass__noise" />
              <p className="text-sm text-foreground leading-relaxed">{frameworkText}</p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald" />
                <span>info@millenniaws.sch.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald" />
                <span>Millennia Campus, Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={onSubmitEmail} className="mt-4 flex w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email"
                className="flex-1 px-3 py-2 rounded-l-lg bg-input border border-border/40 text-sm focus:ring-2 focus:ring-ring/30 focus:outline-none transition-all duration-300"
              />
              <Button type="submit" className="rounded-l-none px-4 bg-gold text-gold-foreground hover:bg-gold/90 transition-all duration-300">
                Subscribe
              </Button>
            </form>
            {status === "ok" && <p className="text-xs text-emerald mt-2">Subscribed successfully!</p>}
            {status === "error" && <p className="text-xs text-primary mt-2">Invalid email address.</p>}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} Millennia World School. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-foreground transition-colors duration-300">Privacy</a>
            <a href="#terms" className="hover:text-foreground transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
