import { memo } from "react";

// Mobile dropdown (lightweight)
const MobileDropdown = memo(({ items, isOpen, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="pl-3 mt-1 space-y-0.5">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.href ?? item.id)}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{
                        color: 'hsl(var(--foreground) / 0.75)',
                    }}
                    onTouchStart={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--foreground))';
                        e.currentTarget.style.background = 'hsl(var(--surface) / 0.5)';
                    }}
                    onTouchEnd={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--foreground) / 0.75)';
                        e.currentTarget.style.background = 'transparent';
                    }}
                >
                    <span className="flex items-center gap-2">
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: 'hsl(var(--gold) / 0.6)' }}
                        />
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
});
MobileDropdown.displayName = "MobileDropdown";

export default MobileDropdown;