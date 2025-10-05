import { memo } from "react";
import Icon from "./Icon";

// Social button component
const SocialButton = memo(({ IconComp, label, href }) => (
    <a
        href={href}
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

export default SocialButton;