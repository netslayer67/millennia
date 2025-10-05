import { memo, useCallback } from "react";
import { Search } from "lucide-react";

const BlogSearchBar = memo(({ value, onChange }) => {
    const handlePaste = useCallback((e) => {
        const text = (e.clipboardData || window.clipboardData).getData("text");
        if (/https?:\/\//i.test(text) || /<|>|javascript:/i.test(text)) {
            e.preventDefault();
        }
    }, []);

    return (
        <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                onPaste={handlePaste}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl glass border border-border/40 text-sm md:text-base text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
                maxLength={100}
            />
        </div>
    );
});

BlogSearchBar.displayName = "BlogSearchBar";

export default BlogSearchBar;