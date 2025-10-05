import { memo } from "react";

const BlogCTASection = memo(() => {
    return (
        <section className="py-12 md:py-16">
            <div className="glass rounded-2xl p-8 md:p-12 text-center space-y-5 border border-primary/10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    Join Our Community
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Where every child is valued, nurtured, and prepared for excellence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm md:text-base">
                        Apply Now
                    </button>
                    <button className="w-full sm:w-auto px-7 py-3.5 rounded-lg glass text-foreground font-semibold hover:bg-muted/20 border border-border/60 hover:border-primary/30 transition-all duration-300 text-sm md:text-base">
                        Schedule Visit
                    </button>
                </div>
            </div>
        </section>
    );
});

BlogCTASection.displayName = "BlogCTASection";

export default BlogCTASection;