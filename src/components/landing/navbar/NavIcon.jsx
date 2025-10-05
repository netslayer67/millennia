import { memo } from "react";

// Lightweight icon wrapper (prevents re-renders)
const NavIcon = memo(({ Icon, size = 16 }) => (
    <Icon width={size} height={size} strokeWidth={1.6} aria-hidden="true" />
));
NavIcon.displayName = "NavIcon";

export default NavIcon;