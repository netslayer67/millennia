import React, { memo, useMemo } from "react";

const ProgramCard = memo(({ program }) => {
    const gradients = useMemo(() => ({
        primary: "from-primary/25 via-primary/12 to-transparent",
        emerald: "from-emerald/25 via-emerald/12 to-transparent",
        gold: "from-gold/25 via-gold/12 to-transparent"
    }), []);

    const iconStyles = useMemo(() => ({
        primary: "bg-primary text-primary-foreground",
        emerald: "bg-emerald text-emerald-foreground",
        gold: "bg-gold text-gold-foreground"
    }), []);

    return (
        <div className="glass glass--deep group cursor-pointer overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={program.img}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradients[program.accent]} opacity-75`} />

                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                    <div className={`inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg mb-2 transition-colors duration-300 ${iconStyles[program.accent]}`}>
                        <program.icon className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-card mb-0.5">
                        {program.title}
                    </h3>
                    <p className="text-xs text-card/85">
                        {program.desc}
                    </p>
                </div>
                <div className="glass__noise opacity-15" />
            </div>
        </div>
    );
});

ProgramCard.displayName = "ProgramCard";

export default ProgramCard;