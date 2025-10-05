import { memo } from "react";

// Desktop dropdown panel (no animations, pure CSS)
const DropdownPanel = memo(({ items, isOpen, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute left-0 top-full mt-2 z-50">
            <div
                className="glass glass--frosted rounded-xl border overflow-hidden shadow-lg min-w-[220px]"
                style={{
                    borderColor: 'hsl(var(--border) / 0.3)',
                    animation: 'dropdownFade 0.15s ease-out'
                }}
            >
                <div className="glass__noise" />
                <ul role="menu" className="relative z-10 p-2 space-y-0.5">
                    {items.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onNavigate(item.href ?? item.id)}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                style={{
                                    color: 'hsl(var(--foreground) / 0.8)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'hsl(var(--foreground))';
                                    e.currentTarget.style.background = 'linear-gradient(to right, hsl(var(--primary) / 0.08), hsl(var(--gold) / 0.04))';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'hsl(var(--foreground) / 0.8)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                                role="menuitem"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
DropdownPanel.displayName = "DropdownPanel";

export default DropdownPanel;