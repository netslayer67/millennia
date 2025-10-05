import React, { memo } from 'react';
import { m } from 'framer-motion';

const FloatingCard = memo(({ className, children, variants }) => (
    <m.div
        variants={variants}
        className={`absolute glass glass-card shadow-glass-md hover:-translate-y-1 transition-all duration-300 cursor-default ${className}`}
    >
        <div className="glass__noise" />
        <div className="text-center">
            {children}
        </div>
    </m.div>
));
FloatingCard.displayName = 'FloatingCard';

export default FloatingCard;