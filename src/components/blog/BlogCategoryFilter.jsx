import { memo } from "react";

const BlogCategoryFilter = memo(({ categories, active, onSelect }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${active === cat
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "glass text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:border-border/60"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
});

BlogCategoryFilter.displayName = "BlogCategoryFilter";

export default BlogCategoryFilter;