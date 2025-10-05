import { memo } from "react";

const FaqFilter = memo(({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeCategory === category.id
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                : "glass text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-border/40 hover:border-primary/30"
                            }`}
                    >
                        <span className="hidden sm:inline">{category.label}</span>
                        <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-current/20">
                            {category.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Active category indicator */}
            <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                    {activeCategory === 'all'
                        ? "Showing all questions"
                        : `Showing ${categories.find(c => c.id === activeCategory)?.label || 'selected'} questions`
                    }
                </p>
            </div>
        </div>
    );
});

FaqFilter.displayName = "FaqFilter";

export default FaqFilter;