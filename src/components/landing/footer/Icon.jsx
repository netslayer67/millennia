import { memo } from "react";

// Lightweight icon wrapper
const Icon = memo(({ Component, size = 16 }) => (
    <Component width={size} height={size} strokeWidth={1.6} aria-hidden="true" />
));
Icon.displayName = "Icon";

export default Icon;