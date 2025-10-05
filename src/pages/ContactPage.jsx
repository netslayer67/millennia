// src/pages/ContactPage.jsx
import React, { memo, useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Loader2 } from "lucide-react";

/* ---------------------- Input Sanitization ---------------------- */
const sanitizeInput = (value = "") => {
    if (typeof value !== "string") return "";
    return value
        .replace(/<[^>]*>?/gm, "")
        .replace(/\b(javascript|data|vbscript):/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .trim()
        .slice(0, 2000);
};

const sanitizeEmail = (email = "") => {
    if (typeof email !== "string") return "";
    const cleaned = email.trim().slice(0, 254);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return cleaned;
    return "";
};

/* ---------------------- Decorative Blobs ---------------------- */
const DecorativeBlobs = memo(() => (
    <>
        <motion.div
            className="absolute pointer-events-none"
            style={{
                top: "5%",
                right: "8%",
                width: "clamp(180px, 25vw, 320px)",
                height: "clamp(180px, 25vw, 320px)",
                background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
                borderRadius: "50%",
            }}
            animate={{
                x: [0, 20, 0],
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute pointer-events-none"
            style={{
                bottom: "10%",
                left: "5%",
                width: "clamp(200px, 28vw, 380px)",
                height: "clamp(200px, 28vw, 380px)",
                background: "radial-gradient(circle, hsl(var(--gold) / 0.06) 0%, transparent 70%)",
                filter: "blur(70px)",
                borderRadius: "50%",
            }}
            animate={{
                x: [0, -18, 0],
                y: [0, 12, 0],
                scale: [1, 1.04, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
    </>
));
DecorativeBlobs.displayName = "DecorativeBlobs";

/* ---------------------- Grid Pattern Background ---------------------- */
const GridPattern = memo(() => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
            backgroundImage: `
        linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
        linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
      `,
            backgroundSize: "48px 48px",
        }}
    />
));
GridPattern.displayName = "GridPattern";

/* ---------------------- Contact Info Card ---------------------- */
const InfoCard = memo(({ icon: Icon, label, children, accent = "primary" }) => (
    <div className="flex items-start gap-3 group">
        <div
            className="flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
                width: 40,
                height: 40,
                background: `hsl(var(--${accent}) / 0.08)`,
                color: `hsl(var(--${accent}))`,
                border: `1px solid hsl(var(--${accent}) / 0.12)`,
            }}
        >
            <Icon className="w-[18px] h-[18px]" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                {label}
            </div>
            <div className="text-[12px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                {children}
            </div>
        </div>
    </div>
));
InfoCard.displayName = "InfoCard";

/* ---------------------- Contact Form ---------------------- */
const ContactForm = memo(() => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState(null);
    const abortRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    const onChange = (k) => (e) => {
        setForm((s) => ({ ...s, [k]: e.target.value }));
        setErrors((s) => ({ ...s, [k]: null }));
    };

    const validate = () => {
        const next = {};
        if (!form.name.trim()) next.name = "Name required";
        if (!sanitizeEmail(form.email)) next.email = "Valid email required";
        if (!form.subject.trim()) next.subject = "Subject required";
        if (form.message.trim().length < 10) next.message = "Message too short (min 10 chars)";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (busy || !validate()) return;

        const payload = {
            name: sanitizeInput(form.name),
            email: sanitizeEmail(form.email),
            subject: sanitizeInput(form.subject),
            message: sanitizeInput(form.message),
            timestamp: new Date().toISOString(),
        };

        setBusy(true);
        setStatus(null);

        try {
            const controller = new AbortController();
            abortRef.current = controller;

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            if (!res.ok) throw new Error("Failed to submit");

            setStatus("ok");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            console.error("Contact submit:", err);
            setStatus("error");
        } finally {
            setBusy(false);
            abortRef.current = null;
        }
    };

    const inputClass = "w-full px-3 py-2.5 text-[13px] rounded-lg transition-all duration-300 focus:outline-none";
    const inputStyle = {
        background: "hsl(var(--input))",
        border: "1px solid hsl(var(--border) / 0.5)",
        color: "hsl(var(--foreground))",
    };

    return (
        <div onSubmit={submit}>
            <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium px-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                            Name *
                        </span>
                        <input
                            value={form.name}
                            onChange={onChange("name")}
                            placeholder="Your full name"
                            className={inputClass}
                            style={inputStyle}
                        />
                        {errors.name && <span className="text-[11px] px-1" style={{ color: "hsl(var(--primary))" }}>{errors.name}</span>}
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium px-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                            Email *
                        </span>
                        <input
                            value={form.email}
                            onChange={onChange("email")}
                            placeholder="you@domain.com"
                            inputMode="email"
                            className={inputClass}
                            style={inputStyle}
                        />
                        {errors.email && <span className="text-[11px] px-1" style={{ color: "hsl(var(--primary))" }}>{errors.email}</span>}
                    </label>
                </div>

                <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium px-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Subject *
                    </span>
                    <input
                        value={form.subject}
                        onChange={onChange("subject")}
                        placeholder="Brief subject"
                        className={inputClass}
                        style={inputStyle}
                    />
                    {errors.subject && <span className="text-[11px] px-1" style={{ color: "hsl(var(--primary))" }}>{errors.subject}</span>}
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium px-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Message *
                    </span>
                    <textarea
                        value={form.message}
                        onChange={onChange("message")}
                        rows={5}
                        placeholder="Write your message (no links please)"
                        className={inputClass}
                        style={inputStyle}
                    />
                    {errors.message && <span className="text-[11px] px-1" style={{ color: "hsl(var(--primary))" }}>{errors.message}</span>}
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
                    <motion.button
                        type="button"
                        onClick={submit}
                        whileTap={{ scale: 0.97 }}
                        disabled={busy}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300"
                        style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--primary-foreground))",
                            opacity: busy ? 0.6 : 1,
                        }}
                    >
                        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {busy ? "Sending..." : "Send Message"}
                    </motion.button>

                    {status === "ok" && (
                        <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: "hsl(var(--emerald))" }}>
                            <Check className="w-4 h-4" /> Sent successfully
                        </span>
                    )}
                    {status === "error" && (
                        <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: "hsl(var(--primary))" }}>
                            <AlertCircle className="w-4 h-4" /> Failed to send
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});
ContactForm.displayName = "ContactForm";

/* ---------------------- Map Component ---------------------- */
const MapSection = memo(() => {
    const address = "Jl. Merpati Raya No.103, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413";
    const mapsUrl = "https://www.google.com/maps/place/Millennia+World+School/@-6.2998397,106.729462,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f01d594e5df1:0x8820de6148c696a!8m2!3d-6.2998397!4d106.7320369!16s%2Fg%2F11c6cpk2pg?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D";

    return (
        <div className="glass rounded-2xl overflow-hidden" style={{ minHeight: 200 }}>
            <div className="glass__noise" />
            <div className="h-48 sm:h-56 flex items-center justify-center p-6">
                <div className="text-center space-y-3">
                    <MapPin className="w-10 h-10 mx-auto" style={{ color: "hsl(var(--primary))" }} />
                    <div>
                        <div className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                            Millennia World School Location
                        </div>
                        <div className="text-[11px] mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                            {address}
                        </div>
                    </div>
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--primary-foreground))",
                        }}
                    >
                        View on Google Maps
                    </a>
                </div>
            </div>
        </div>
    );
});
MapSection.displayName = "MapSection";

/* ---------------------- Main Contact Page ---------------------- */
function ContactPage() {
    const phone = "0821 1150 7100";
    const emails = ["info@millennia21.id", "recruitment@millennia21.id"];
    const address = "Jl. Merpati Raya No.103, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413";

    return (
        <main className="relative w-full min-h-screen overflow-x-hidden" style={{ background: "hsl(var(--background))" }}>
            <GridPattern />
            <DecorativeBlobs />

            {/* Hero Header */}
            <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-3"
                    >
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                            style={{ color: "hsl(var(--foreground))" }}
                        >
                            Get in Touch
                        </h1>
                        <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
                            We're here to answer your questions and help you join the Millennia World School community.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Contact Info Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-4 space-y-4"
                        >
                            <div className="glass p-5 sm:p-6 rounded-2xl">
                                <div className="glass__noise" />
                                <h2 className="text-base font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
                                    Contact Information
                                </h2>

                                <div className="space-y-4">
                                    <InfoCard icon={Phone} label="Phone / WhatsApp" accent="primary">
                                        <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                                            {phone}
                                        </a>
                                    </InfoCard>

                                    <InfoCard icon={Mail} label="Email" accent="gold">
                                        {emails.map((email, i) => (
                                            <a key={i} href={`mailto:${email}`} className="block hover:underline">
                                                {email}
                                            </a>
                                        ))}
                                    </InfoCard>

                                    <InfoCard icon={MapPin} label="Address" accent="emerald">
                                        {address}
                                    </InfoCard>
                                </div>
                            </div>

                            {/* CTA Card - Desktop only */}
                            <div className="hidden lg:block glass p-5 rounded-2xl">
                                <div className="glass__noise" />
                                <div className="text-[13px] font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                                    Ready to Apply?
                                </div>
                                <div className="text-[11px] mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                                    Start your journey with Millennia World School today.
                                </div>
                                <a
                                    href="/admissions"
                                    className="block text-center px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300"
                                    style={{
                                        background: "hsl(var(--primary))",
                                        color: "hsl(var(--primary-foreground))",
                                    }}
                                >
                                    Admissions
                                </a>
                            </div>
                        </motion.div>

                        {/* Form & Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-8 space-y-6"
                        >
                            <div className="glass p-5 sm:p-7 rounded-2xl">
                                <div className="glass__noise" />
                                <h3 className="text-base font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                                    Send a Message
                                </h3>
                                <p className="text-[12px] mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                                <ContactForm />
                            </div>

                            <MapSection />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default memo(ContactPage);