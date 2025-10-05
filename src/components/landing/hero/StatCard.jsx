import React, { memo } from 'react';

const StatCard = memo(({ stat, colorConfig }) => (
    <div className={colorConfig.borderClass}>
        <div className="glass__refract" />
        <div className="glass__noise" />
        <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-1.5">
            <stat.Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorConfig.iconClass}`} />
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground">{stat.value}</span>
            <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground font-medium">{stat.label}</span>
        </div>
    </div>
));
StatCard.displayName = 'StatCard';

export default StatCard;