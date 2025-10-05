import React, { memo } from 'react';
import { m } from 'framer-motion';

const BackgroundBlob = memo(({ className, shouldReduceMotion, style = {} }) => (
    <m.div
        variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1.4, ease: [0.2, 0.9, 0.1, 1] },
            },
        }}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? false : 'visible'}
        className={className}
        style={style}
        aria-hidden="true"
    />
));
BackgroundBlob.displayName = 'BackgroundBlob';

export default BackgroundBlob;