import React, { memo, useMemo } from "react";

const SubjectCard = memo(({ subject }) => {
    const accentStyles = useMemo(() => ({
        primary: "group-hover:bg-primary group-hover:text-primary-foreground",
        emerald: "group-hover:bg-emerald group-hover:text-emerald-foreground",
        gold: "group-hover:bg-gold group-hover:text-gold-foreground"
    }), []);

    return (
        <div className="glass group cursor-pointer">
            <div className="relative p-4 md:p-5">
                <div className="flex items-center gap-3">
                    <div className={`
                        flex-shrink-0 p-2.5 rounded-lg
                        bg-muted/30 text-muted-foreground
                        transition-colors duration-300
                        ${accentStyles[subject.accent]}
                    `}>
                        <subject.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground">
                        {subject.label}
                    </h3>
                </div>
                <div className="glass__refract" />
                <div className="glass__noise" />
            </div>
        </div>
    );
});

SubjectCard.displayName = "SubjectCard";

export default SubjectCard;