import React, { memo } from "react";

const FeatureCard = memo(({ icon: Icon, title, desc }) => (
    <div className="glass p-4 md:p-5 group">
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary
                group-hover:bg-primary group-hover:text-primary-foreground
                transition-colors duration-300">
                <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1.5">
                    {title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
        <div className="glass__noise" />
    </div>
));

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;