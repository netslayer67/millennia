import { memo } from "react";
import Icon from "./Icon";

// Contact info row
const ContactRow = memo(({ IconComp, text, iconColor = 'hsl(var(--emerald))' }) => (
    <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
        <span style={{ color: iconColor }}>
            <Icon Component={IconComp} size={16} />
        </span>
        <span>{text}</span>
    </div>
));
ContactRow.displayName = "ContactRow";

export default ContactRow;