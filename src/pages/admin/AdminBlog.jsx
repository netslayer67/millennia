import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Search, BookOpen, Sparkles, ArrowRight, FileText, User, Calendar, Clock, CheckSquare, Square, Trash2, Download, BarChart3, Settings, X, Edit3 } from 'lucide-react';
import ArticleCard from './components/ArticleCard';

// Security utilities for input sanitization
const sanitizeInput = (input, maxLength = 500) => {
    if (!input) return '';
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<|>/g, '')
        .trim()
        .slice(0, maxLength);
};

// Mock data for demonstration
const MOCK_ARTICLES = [
    {
        id: '10-gifts-every-parent',
        title: '10 Gifts That Every Parent Should Give to Their Children',
        category: 'Parenting',
        date: '2025-03-19',
        author: 'Mahrukh Bashir',
        readTime: '8 min',
        excerpt: 'Simple, intentional gifts that shape resilient, spiritually grounded children.',
        image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&q=60&auto=format&fit=crop',
        featured: true,
        status: 'published',
        tags: ['parenting', 'education', 'character'],
        content: [
            { type: 'lead', text: 'Parenting advice bombards us from every corner...' },
            { type: 'h3', text: '1. The Gift of Spirituality' },
            { type: 'p', text: 'There\'s a holy call beyond the noise...' }
        ]
    },
    {
        id: 'compassion-2023',
        title: 'Compassion In Action: How We Teach Empathy',
        category: 'Education',
        date: '2025-03-15',
        author: 'Sarah Johnson',
        readTime: '6 min',
        excerpt: 'Empathy practiced daily in our classrooms, not taught through lectures.',
        image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=60',
        featured: false,
        status: 'published',
        tags: ['empathy', 'education', 'compassion'],
        content: []
    }
];

// Optimized decorative blob component
const DecorativeBlob = memo(({ className, size = 'lg', color = 'primary' }) => {
    const sizeClass = size === 'sm' ? 'w-64 h-64' : size === 'lg' ? 'w-80 h-80' : 'w-96 h-96';
    const colorClass = `bg-${color}/6`;

    return (
        <div
            className={`absolute rounded-full blur-3xl pointer-events-none animate-blob-left ${sizeClass} ${colorClass} ${className}`}
            style={{ animation: 'blobFadeIn 1.5s ease-out forwards' }}
            aria-hidden
        />
    );
});

DecorativeBlob.displayName = 'DecorativeBlob';

// Main AdminBlog component
const AdminBlog = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [articles, setArticles] = useState(MOCK_ARTICLES);
    const [viewingArticle, setViewingArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isMobile, setIsMobile] = useState(false);
    const [selectedArticles, setSelectedArticles] = useState(new Set());
    const [showBulkActions, setShowBulkActions] = useState(false);


    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = !searchTerm ||
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.category.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || article.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [articles, searchTerm, statusFilter]);

    const stats = useMemo(() => ({
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        drafts: articles.filter(a => a.status === 'draft').length,
        featured: articles.filter(a => a.featured).length
    }), [articles]);


    const handleDeleteArticle = useCallback((articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            setArticles(prev => prev.filter(a => a.id !== articleId));
        }
    }, []);

    const handleViewArticle = useCallback((article) => {
        setViewingArticle(article);
    }, []);

    // Bulk selection handlers
    const handleSelectArticle = useCallback((articleId, selected) => {
        setSelectedArticles(prev => {
            const newSet = new Set(prev);
            if (selected) {
                newSet.add(articleId);
            } else {
                newSet.delete(articleId);
            }
            setShowBulkActions(newSet.size > 0);
            return newSet;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        if (selectedArticles.size === filteredArticles.length) {
            setSelectedArticles(new Set());
            setShowBulkActions(false);
        } else {
            setSelectedArticles(new Set(filteredArticles.map(a => a.id)));
            setShowBulkActions(true);
        }
    }, [selectedArticles.size, filteredArticles]);

    // Bulk actions
    const handleBulkDelete = useCallback(() => {
        if (selectedArticles.size === 0) return;

        if (window.confirm(`Delete ${selectedArticles.size} selected article(s)?`)) {
            setArticles(prev => prev.filter(a => !selectedArticles.has(a.id)));
            setSelectedArticles(new Set());
            setShowBulkActions(false);
            toast({
                title: 'Success',
                description: `${selectedArticles.size} articles deleted successfully`,
            });
        }
    }, [selectedArticles, toast]);

    const handleBulkPublish = useCallback(() => {
        setArticles(prev => prev.map(a =>
            selectedArticles.has(a.id) ? { ...a, status: 'published' } : a
        ));
        setSelectedArticles(new Set());
        setShowBulkActions(false);
        toast({
            title: 'Success',
            description: `${selectedArticles.size} articles published successfully`,
        });
    }, [selectedArticles, toast]);

    const handleBulkArchive = useCallback(() => {
        setArticles(prev => prev.map(a =>
            selectedArticles.has(a.id) ? { ...a, status: 'archived' } : a
        ));
        setSelectedArticles(new Set());
        setShowBulkActions(false);
        toast({
            title: 'Success',
            description: `${selectedArticles.size} articles archived successfully`,
        });
    }, [selectedArticles, toast]);


    // Export functionality
    const handleExport = useCallback(() => {
        const dataStr = JSON.stringify(filteredArticles, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `articles-export-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        toast({
            title: 'Success',
            description: 'Articles exported successfully',
        });
    }, [filteredArticles, toast]);

    if (viewingArticle) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background via-surface to-background p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setViewingArticle(null)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 hover:border-primary transition-all duration-300"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to Admin
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setEditingArticle(viewingArticle)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald text-emerald-foreground font-semibold hover:bg-emerald/90 transition-all duration-300"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Article
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('Delete this article?')) {
                                        handleDeleteArticle(viewingArticle.id);
                                        setViewingArticle(null);
                                    }
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition-all duration-300"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Article Header */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={viewingArticle.image}
                                    alt={viewingArticle.title}
                                    className="w-full md:w-48 h-48 md:h-32 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                            {viewingArticle.title}
                                        </h1>
                                        <div className="flex items-center gap-2">
                                            {viewingArticle.featured && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 backdrop-blur-sm text-sm font-semibold text-gold-foreground border border-gold/30">
                                                    <Sparkles className="w-4 h-4" />
                                                    Featured
                                                </span>
                                            )}
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${viewingArticle.status === 'published' ? 'bg-emerald/10 text-emerald border border-emerald/20' :
                                                viewingArticle.status === 'draft' ? 'bg-gold/10 text-gold border border-gold/20' :
                                                    'bg-muted text-muted-foreground border border-border'
                                                }`}>
                                                {viewingArticle.status}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {viewingArticle.excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <strong>Author:</strong> {viewingArticle.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <strong>Published:</strong> {new Date(viewingArticle.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <strong>Read time:</strong> {viewingArticle.readTime}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            <strong>Category:</strong> {viewingArticle.category}
                                        </span>
                                    </div>

                                    {viewingArticle.tags && viewingArticle.tags.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {viewingArticle.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <div className="prose prose-sm md:prose-base max-w-none">
                                {viewingArticle.content && viewingArticle.content.length > 0 ? (
                                    viewingArticle.content.map((block, index) => {
                                        if (block.type === 'h3') {
                                            return (
                                                <h3 key={index} className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-4 first:mt-0">
                                                    {block.text}
                                                </h3>
                                            );
                                        }
                                        if (block.type === 'lead') {
                                            return (
                                                <p key={index} className="text-lg text-muted-foreground font-medium leading-relaxed mb-6 first-line:uppercase">
                                                    {block.text}
                                                </p>
                                            );
                                        }
                                        return (
                                            <p key={index} className="text-foreground leading-relaxed mb-4">
                                                {block.text}
                                            </p>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">No content available for this article.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-surface to-background relative overflow-hidden">
            {/* Decorative elements */}
            <DecorativeBlob className="-top-40 -left-40" size="lg" color="primary" />
            <DecorativeBlob className="-bottom-40 -right-40" size="lg" color="gold" />
            <DecorativeBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="md" color="emerald" />

            <div className="relative z-10 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-primary">Blog Management</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                            Content Management System
                        </h1>

                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Create, edit, and manage your blog articles with our comprehensive admin interface.
                        </p>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { label: 'Total Articles', value: stats.total, color: 'primary' },
                            { label: 'Published', value: stats.published, color: 'emerald' },
                            { label: 'Drafts', value: stats.drafts, color: 'gold' },
                            { label: 'Featured', value: stats.featured, color: 'primary' }
                        ].map((stat, index) => (
                            <div key={stat.label} className="glass glass--deep p-4 md:p-6 text-center">
                                <div className="glass__noise" />
                                <div className={`text-2xl md:text-3xl font-bold text-${stat.color} mb-1`}>
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {/* Bulk Actions Bar */}
                        <AnimatePresence>
                            {showBulkActions && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="glass glass--deep p-4 rounded-lg border border-primary/30"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CheckSquare className="w-5 h-5 text-primary" />
                                            <span className="font-medium text-foreground">
                                                {selectedArticles.size} article{selectedArticles.size !== 1 ? 's' : ''} selected
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleBulkPublish}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/20 transition-all duration-300"
                                            >
                                                Publish
                                            </button>
                                            <button
                                                onClick={handleBulkArchive}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all duration-300"
                                            >
                                                Archive
                                            </button>
                                            <button
                                                onClick={handleBulkDelete}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all duration-300"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Controls */}
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(sanitizeInput(e.target.value, 100))}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300"
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2.5 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300"
                                >
                                    <option value="all">All Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Drafts</option>
                                    <option value="archived">Archived</option>
                                </select>

                                <button
                                    onClick={handleSelectAll}
                                    className={`inline-flex items-center gap-2 px-3 py-2.5 rounded-lg glass border transition-all duration-300 ${selectedArticles.size === filteredArticles.length && filteredArticles.length > 0
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border/40 hover:border-primary'
                                        }`}
                                >
                                    {selectedArticles.size === filteredArticles.length && filteredArticles.length > 0 ? (
                                        <CheckSquare className="w-4 h-4" />
                                    ) : (
                                        <Square className="w-4 h-4" />
                                    )}
                                    Select All
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleExport}
                                    className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg glass border border-border/40 hover:border-primary transition-all duration-300"
                                    title="Export articles"
                                >
                                    <Download className="w-4 h-4" />
                                    {!isMobile && 'Export'}
                                </button>

                                <button
                                    onClick={() => navigate('/admin/blog/add')}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                                >
                                    <Plus className="w-4 h-4" />
                                    {isMobile ? 'New' : 'New Article'}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {filteredArticles.length === 0 ? (
                            <div className="glass glass--deep p-12 text-center">
                                <div className="glass__noise" />
                                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    No articles found
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    {searchTerm || statusFilter !== 'all'
                                        ? 'Try adjusting your search or filters.'
                                        : 'Create your first article to get started.'
                                    }
                                </p>
                                <button
                                    onClick={() => navigate('/admin/blog/add')}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Article
                                </button>
                            </div>
                        ) : (
                            <div className={`grid gap-4 md:gap-6 ${isMobile
                                ? 'grid-cols-1'
                                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                }`}>
                                {filteredArticles.map((article, index) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        onEdit={(article) => navigate(`/admin/blog/edit/${article.id}`)}
                                        onDelete={handleDeleteArticle}
                                        onView={handleViewArticle}
                                        onSelect={handleSelectArticle}
                                        isSelected={selectedArticles.has(article.id)}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* CSS Animations */}
            <style>{`
                @keyframes blobFadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-blob-left {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
});

AdminBlog.displayName = 'AdminBlog';

export default AdminBlog;