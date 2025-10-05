import { useCallback, useEffect, useRef, useState } from "react";

// Optimized dropdown hook (minimal state updates)
function useDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const closeTimeoutRef = useRef(null);

    const toggle = useCallback(() => setOpen((v) => !v), []);
    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;

        const onPointer = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                close();
            }
        };

        const onKey = (e) => {
            if (e.key === "Escape") close();
        };

        // Use capture phase for better performance
        document.addEventListener("pointerdown", onPointer, { capture: true, passive: true });
        document.addEventListener("keydown", onKey, { passive: true });

        return () => {
            document.removeEventListener("pointerdown", onPointer, { capture: true });
            document.removeEventListener("keydown", onKey);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, [open, close]);

    return { open, toggle, close, ref };
}

export default useDropdown;