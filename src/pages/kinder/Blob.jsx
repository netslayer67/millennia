import React, { memo } from "react";

const Blob = memo(({ className, size = "md" }) => {
    const sizeClass = size === "sm" ? "w-64 h-64" : size === "lg" ? "w-96 h-96" : "w-80 h-80";

    return (
        <div
            className={`absolute pointer-events-none rounded-full blur-3xl ${sizeClass} ${className} opacity-0 scale-90 animate-blob-fade-in`}
            style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
                animation: 'blobFadeIn 1.2s ease-out forwards'
            }}
        />
    );
});

Blob.displayName = "Blob";

export default Blob;