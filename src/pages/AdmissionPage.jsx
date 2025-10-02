import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Users,
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Instagram,
    Facebook,
} from 'lucide-react';

/* --------------------------- Utilities --------------------------- */
const sanitizeInput = (value = '') => {
    if (typeof value !== 'string') return '';
    return value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/<[^>]*>/gi, '')
        .trim()
        .slice(0, 2000);
};
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRE = /^(\+?\d{6,15}|[0-9\-\s()]{6,20})$/;
const validateNotEmpty = (s) => String(s || '').trim().length > 0;

/* --------------------------- Helpers/hooks --------------------------- */
function usePrefersReducedMotion() {
    const [prefers, setPrefers] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefers(mq.matches);
        const handler = () => setPrefers(mq.matches);
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);
    return prefers;
}

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, [breakpoint]);
    return isMobile;
}

/* --------------------------- Small UI atoms --------------------------- */
const FieldLabel = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="block text-xs sm:text-sm font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>
        {children} {required && <span className="text-primary">*</span>}
    </label>
);

const CompactInput = React.forwardRef(({ id, ...props }, ref) => (
    <input
        id={id}
        ref={ref}
        {...props}
        className="w-full rounded-lg px-3 py-2 text-sm border transition-all duration-300 outline-none"
        style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border) / 0.28)',
            color: 'hsl(var(--foreground))',
        }}
    />
));
CompactInput.displayName = 'CompactInput';

const CompactSelect = ({ id, children, ...props }) => (
    <select
        id={id}
        {...props}
        className="w-full rounded-lg px-3 py-2 text-sm border transition-all duration-300 outline-none"
        style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border) / 0.28)',
            color: 'hsl(var(--foreground))',
        }}
    >
        {children}
    </select>
);

const CompactTextarea = (props) => (
    <textarea
        {...props}
        rows={3}
        className="w-full rounded-lg px-3 py-2 text-sm border transition-all duration-300 outline-none resize-none"
        style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border) / 0.28)',
            color: 'hsl(var(--foreground))',
        }}
    />
);

/* --------------------------- Component --------------------------- */
const AdmissionPage = memo(function AdmissionPage({ onSubmit }) {
    const prefersReduced = usePrefersReducedMotion();
    const isMobile = useIsMobile(768);
    const useMotion = !isMobile && !prefersReduced; // disable motion on mobile / prefers-reduced

    const programs = useMemo(
        () => [
            { id: 'kg-pre', label: 'Kindergarten - PRA TK' },
            { id: 'kg-a', label: 'Kindergarten - TK (A)' },
            { id: 'kg-b', label: 'Kindergarten - TK (B)' },
            { id: 'elementary', label: 'Elementary - SD' },
            { id: 'junior', label: 'Junior High - SMP' },
        ],
        []
    );

    const [form, setForm] = useState({
        program: '',
        applicantName: '',
        gender: '',
        dob: '',
        nationality: '',
        fatherName: '',
        fatherPhone: '',
        motherName: '',
        motherPhone: '',
        email: '',
        homeAddress: '',
        instagram: '',
        facebook: '',
        note: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    /* handlers memoized */
    const handleChange = useCallback((key) => (e) => {
        const v = e?.target?.value ?? '';
        setForm((s) => ({ ...s, [key]: v }));
        setErrors((s) => ({ ...s, [key]: null }));
    }, []);

    const validate = useCallback((clean) => {
        const err = {};
        if (!validateNotEmpty(clean.program)) err.program = 'Please select a program';
        if (!validateNotEmpty(clean.applicantName)) err.applicantName = 'Applicant name required';
        if (!validateNotEmpty(clean.gender)) err.gender = 'Required';
        if (!validateNotEmpty(clean.dob)) err.dob = 'Required';
        if (!validateNotEmpty(clean.nationality)) err.nationality = 'Required';
        if (!validateNotEmpty(clean.fatherName)) err.fatherName = 'Required';
        if (clean.fatherPhone && !phoneRE.test(clean.fatherPhone)) err.fatherPhone = 'Invalid phone';
        if (!validateNotEmpty(clean.motherName)) err.motherName = 'Required';
        if (clean.motherPhone && !phoneRE.test(clean.motherPhone)) err.motherPhone = 'Invalid phone';
        if (clean.email && !emailRE.test(clean.email)) err.email = 'Invalid email';
        if (!validateNotEmpty(clean.homeAddress)) err.homeAddress = 'Required';
        return err;
    }, []);

    const defaultSubmit = useCallback(async (clean) => {
        // default: simulate api (replace with real endpoint)
        await new Promise((r) => setTimeout(r, 650));
        return { ok: true };
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (loading) return;

            // sanitize & limit size
            const clean = {};
            Object.keys(form).forEach((k) => {
                clean[k] = sanitizeInput(form[k]);
                if (['instagram', 'facebook', 'homeAddress', 'note'].includes(k)) {
                    clean[k] = clean[k].slice(0, 2000);
                } else {
                    clean[k] = clean[k].slice(0, 400);
                }
            });

            const validation = validate(clean);
            if (Object.keys(validation).length) {
                setErrors(validation);
                // focus first error for mobile usability
                const firstKey = Object.keys(validation)[0];
                const el = document.getElementById(firstKey);
                if (el) el.focus();
                return;
            }

            setLoading(true);
            setErrors({});
            try {
                const fn = typeof onSubmit === 'function' ? onSubmit : defaultSubmit;
                const res = await fn(clean);
                if (res && res.ok) {
                    setSuccess('Application submitted. Admissions will contact you soon.');
                    setForm({
                        program: '',
                        applicantName: '',
                        gender: '',
                        dob: '',
                        nationality: '',
                        fatherName: '',
                        fatherPhone: '',
                        motherName: '',
                        motherPhone: '',
                        email: '',
                        homeAddress: '',
                        instagram: '',
                        facebook: '',
                        note: '',
                    });
                    setTimeout(() => setSuccess(null), 7000);
                } else {
                    throw new Error(res?.message || 'Submission failed');
                }
            } catch (err) {
                console.error(err);
                setErrors({ global: 'Submission failed. Try again later.' });
            } finally {
                setLoading(false);
            }
        },
        [form, validate, onSubmit, defaultSubmit, loading]
    );

    /* Compact / mobile UI helpers */
    const SubmitBtn = () => (
        <>
            {/* desktop full */}
            <button
                type="submit"
                disabled={loading}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold shadow-glass-md transition-all duration-300 hover:shadow-glass-lg"
                style={{
                    background: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                }}
            >
                <Send className="w-4 h-4" />
                {loading ? 'Submitting…' : 'Submit Application'}
            </button>

            {/* mobile compact icon-only */}
            <button
                type="submit"
                disabled={loading}
                aria-label="Submit application"
                className="inline-flex sm:hidden items-center justify-center p-3 rounded-lg shadow-glass-sm transition-transform duration-200 active:scale-95"
                style={{
                    background: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                }}
            >
                <Send className="w-4 h-4" />
            </button>
        </>
    );

    /* conditional motion wrappers for perf */
    const MotionWrapper = ({ children, ...props }) =>
        useMotion ? <motion.div {...props}>{children}</motion.div> : <div {...props}>{children}</div>;

    return (
        <section className="relative py-8 sm:py-12 lg:py-16">
            {/* background grid & blobs (lightweight) */}
            <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--surface)) 100%)' }} />

            {!isMobile && (
                <>
                    <div aria-hidden className="absolute -top-32 -left-28 w-80 h-80 rounded-full blur-3xl" style={{ background: 'hsl(var(--primary) / 0.18)' }} />
                    <div aria-hidden className="absolute -bottom-20 right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'hsl(var(--gold) / 0.14)' }} />
                </>
            )}

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <MotionWrapper initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
                    <div className="text-center mb-6 sm:mb-10">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 shadow-glass-sm">
                                <Sparkles className="w-4 h-4 text-gold" />
                                <span className="text-xs sm:text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>

                                </span>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                            Admission <span className="bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">Application</span>
                        </h1>
                        <p className="text-xs sm:text-sm max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            A concise, secure application form — provide accurate contact details so our admissions team can follow up.
                        </p>
                    </div>
                </MotionWrapper>

                {/* success toast (small & nonintrusive) */}
                <AnimatePresence>
                    {success && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                            <div className="glass p-3 rounded-xl mb-4 border border-emerald/30 shadow-glass-sm" style={{ background: 'hsl(var(--emerald) / 0.06)' }}>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald" />
                                    <div>
                                        <div className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Application submitted</div>
                                        <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{success}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* form */}
                <form
                    onSubmit={handleSubmit}
                    className="glass p-4 sm:p-6 md:p-8 rounded-2xl border shadow-glass-md"
                    style={{
                        borderColor: isMobile ? 'hsl(var(--border) / 0.18)' : 'hsl(var(--border) / 0.32)',
                        backdropFilter: isMobile ? 'none' : undefined,
                        WebkitBackdropFilter: isMobile ? 'none' : undefined,
                    }}
                    noValidate
                >
                    <div className="glass__noise" />

                    {errors.global && (
                        <div className="mb-4 p-3 rounded-md" style={{ background: 'hsl(var(--primary) / 0.06)', border: '1px solid hsl(var(--primary) / 0.18)' }}>
                            <div className="text-xs sm:text-sm" style={{ color: 'hsl(var(--primary))' }}>{errors.global}</div>
                        </div>
                    )}

                    {/* STUDENT */}
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.12)' }}>
                                <User className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                            </div>
                            <h2 className="text-sm sm:text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Student information</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <FieldLabel htmlFor="program" required>Program</FieldLabel>
                                <CompactSelect id="program" value={form.program} onChange={handleChange('program')}>
                                    <option value="">Select program…</option>
                                    {programs.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                                </CompactSelect>
                                {errors.program && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.program}</div>}
                            </div>

                            <div>
                                <FieldLabel htmlFor="applicantName" required>Full name</FieldLabel>
                                <CompactInput id="applicantName" value={form.applicantName} onChange={handleChange('applicantName')} placeholder="Full name" />
                                {errors.applicantName && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.applicantName}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                            <div>
                                <FieldLabel htmlFor="gender" required>Gender</FieldLabel>
                                <div className="flex gap-3 items-center">
                                    {['male', 'female'].map((g) => (
                                        <label key={g} className="inline-flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange('gender')} style={{ accentColor: 'hsl(var(--primary))' }} />
                                            <span style={{ color: 'hsl(var(--foreground))' }}>{g}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.gender}</div>}
                            </div>

                            <div>
                                <FieldLabel htmlFor="dob" required>DOB</FieldLabel>
                                <CompactInput id="dob" type="date" value={form.dob} onChange={handleChange('dob')} />
                                {errors.dob && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.dob}</div>}
                            </div>

                            <div>
                                <FieldLabel htmlFor="nationality" required>Nationality</FieldLabel>
                                <CompactInput id="nationality" value={form.nationality} onChange={handleChange('nationality')} placeholder="Country" />
                                {errors.nationality && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.nationality}</div>}
                            </div>
                        </div>
                    </div>

                    {/* PARENTS (compact cards) */}
                    <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="glass p-3 rounded-xl border" style={{ borderColor: 'hsl(var(--border) / 0.2)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-gold" />
                                <h3 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Father</h3>
                            </div>
                            <FieldLabel htmlFor="fatherName" required>Name</FieldLabel>
                            <CompactInput id="fatherName" value={form.fatherName} onChange={handleChange('fatherName')} placeholder="Full name" />
                            {errors.fatherName && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.fatherName}</div>}

                            <div className="mt-2">
                                <FieldLabel htmlFor="fatherPhone" required>Phone</FieldLabel>
                                <CompactInput id="fatherPhone" value={form.fatherPhone} onChange={handleChange('fatherPhone')} placeholder="+62 ..." inputMode="tel" />
                                {errors.fatherPhone && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.fatherPhone}</div>}
                            </div>
                        </div>

                        <div className="glass p-3 rounded-xl border" style={{ borderColor: 'hsl(var(--border) / 0.2)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-gold" />
                                <h3 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Mother</h3>
                            </div>
                            <FieldLabel htmlFor="motherName" required>Name</FieldLabel>
                            <CompactInput id="motherName" value={form.motherName} onChange={handleChange('motherName')} placeholder="Full name" />
                            {errors.motherName && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.motherName}</div>}

                            <div className="mt-2">
                                <FieldLabel htmlFor="motherPhone" required>Phone</FieldLabel>
                                <CompactInput id="motherPhone" value={form.motherPhone} onChange={handleChange('motherPhone')} placeholder="+62 ..." inputMode="tel" />
                                {errors.motherPhone && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.motherPhone}</div>}
                            </div>
                        </div>
                    </div>

                    {/* CONTACT & SOCIAL */}
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Mail className="w-4 h-4 text-emerald" />
                            <h3 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Contact</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <CompactInput id="email" type="email" value={form.email} onChange={handleChange('email')} placeholder="parent@example.com" />
                                {errors.email && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.email}</div>}
                            </div>

                            <div>
                                <FieldLabel htmlFor="homeAddress" required>Address</FieldLabel>
                                <CompactInput id="homeAddress" value={form.homeAddress} onChange={handleChange('homeAddress')} placeholder="Full address" />
                                {errors.homeAddress && <div className="text-xs mt-1" style={{ color: 'hsl(var(--primary))' }}>{errors.homeAddress}</div>}
                            </div>
                        </div>

                        {/* social compact row */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                                <FieldLabel htmlFor="instagram">Instagram (optional)</FieldLabel>
                                <CompactInput id="instagram" value={form.instagram} onChange={handleChange('instagram')} placeholder="@username or URL" />
                            </div>
                            <div>
                                <FieldLabel htmlFor="facebook">Facebook (optional)</FieldLabel>
                                <CompactInput id="facebook" value={form.facebook} onChange={handleChange('facebook')} placeholder="username or URL" />
                            </div>
                        </div>

                        <div className="mt-3">
                            <FieldLabel htmlFor="note">Notes (optional)</FieldLabel>
                            <CompactTextarea id="note" value={form.note} onChange={handleChange('note')} placeholder="Anything we should know?" />
                        </div>
                    </div>

                    {/* actions row */}
                    <div className="mt-4 pt-3 sm:pt-4 border-t" style={{ borderColor: 'hsl(var(--border) / 0.12)' }}>
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                                Data is secure & stored privately
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm({
                                            program: '', applicantName: '', gender: '', dob: '', nationality: '',
                                            fatherName: '', fatherPhone: '', motherName: '', motherPhone: '',
                                            email: '', homeAddress: '', instagram: '', facebook: '', note: '',
                                        }); setErrors({});
                                    }}
                                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition duration-200"
                                    style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border) / 0.2)', color: 'hsl(var(--foreground))' }}
                                >
                                    Reset
                                </button>

                                <SubmitBtn />
                            </div>
                        </div>
                    </div>
                </form>

                {/* compact mobile hint */}
                <p className="mt-3 text-center text-xs sm:hidden" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Tap the icon to submit — form is optimized for small screens.
                </p>
            </div>
        </section>
    );
});

AdmissionPage.displayName = 'AdmissionPage';
export default AdmissionPage;
