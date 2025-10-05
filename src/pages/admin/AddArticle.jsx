import React, { memo, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, AlertCircle, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Security utilities for input sanitization
const sanitizeInput = (input, maxLength = 500) => {
    if (!input) return '';
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, ' ')
        .replace(/<|>/g, '')
        .trim()
        .slice(0, maxLength);
};

const sanitizeUrl = (url) => {
    if (!url) return '';
    try {
        const clean = url.trim();
        if (/^\s*(javascript|data|vbscript):/i.test(clean)) return '';
        return encodeURI(clean);
    } catch {
        return '';
    }
};

const CATEGORIES = ['Parenting', 'Education', 'Literacy', 'Wellness', 'Development'];
const STATUSES = ['draft', 'published'];

const AddArticle = memo(() => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Education',
        excerpt: '',
        content: [{ type: 'p', text: '' }],
        author: '',
        tags: [],
        image: '',
        featured: false,
        status: 'draft'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!sanitizeInput(formData.title, 200).trim()) {
            newErrors.title = 'Title is required';
        }
        if (!sanitizeInput(formData.excerpt, 500).trim()) {
            newErrors.excerpt = 'Excerpt is required';
        }
        if (!sanitizeInput(formData.author, 100).trim()) {
            newErrors.author = 'Author is required';
        }
        if (!sanitizeUrl(formData.image)) {
            newErrors.image = 'Valid image URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleInputChange = useCallback((field, value) => {
        const sanitized = field === 'image' ? sanitizeUrl(value) : sanitizeInput(value);
        setFormData(prev => ({ ...prev, [field]: sanitized }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const handleTagChange = useCallback((tags) => {
        const sanitizedTags = tags.map(tag => sanitizeInput(tag, 50)).filter(Boolean);
        setFormData(prev => ({ ...prev, tags: sanitizedTags }));
    }, []);

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            // Mock upload - in real app, upload to server
            const mockUrl = URL.createObjectURL(file);
            handleInputChange('image', mockUrl);
        }
    }, [handleInputChange]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const articleData = {
                ...formData,
                id: `article-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                readTime: `${Math.max(3, Math.ceil(formData.content.length * 0.5))} min`
            };

            // In a real app, this would save to backend
            console.log('Article created:', articleData);

            // Show success message and redirect
            toast({
                title: 'Success',
                description: 'Article created successfully!',
            });
            navigate('/admin/blog');
        } catch (error) {
            console.error('Save failed:', error);
            setErrors({ submit: 'Failed to create article. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, navigate]);

    const addContentBlock = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, { type: 'p', text: '' }]
        }));
    }, []);

    const updateContentBlock = useCallback((index, field, value) => {
        const sanitized = sanitizeInput(value, 2000);
        setFormData(prev => ({
            ...prev,
            content: prev.content.map((block, i) =>
                i === index ? { ...block, [field]: sanitized } : block
            )
        }));
    }, []);

    const removeContentBlock = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index)
        }));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-surface to-background relative overflow-hidden">
            {/* Decorative elements */}
            <div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: 'hsl(var(--primary))' }}
            />
            <div
                className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
                style={{ background: 'hsl(var(--gold))' }}
            />

            <div className="relative z-10 p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/blog')}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 hover:border-primary transition-all duration-300"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Admin
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Create New Article
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Fill in the details below to create a new blog article
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        {/* Basic Info */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <h2 className="text-xl font-bold text-foreground mb-6">Basic Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg glass border transition-all duration-300 ${errors.title ? 'border-destructive' : 'border-border/40 focus:border-primary'
                                            }`}
                                        placeholder="Article title"
                                        maxLength={200}
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Author *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => handleInputChange('author', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg glass border transition-all duration-300 ${errors.author ? 'border-destructive' : 'border-border/40 focus:border-primary'
                                            }`}
                                        placeholder="Author name"
                                        maxLength={100}
                                    />
                                    {errors.author && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.author}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300"
                                    >
                                        {STATUSES.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center space-x-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                        className="rounded border-border/40 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-foreground">
                                        Featured Article
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <h2 className="text-xl font-bold text-foreground mb-6">Featured Image</h2>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 hover:border-primary transition-all duration-300"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload Image
                                    </button>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => handleInputChange('image', e.target.value)}
                                        className={`flex-1 px-3 py-2 rounded-lg glass border transition-all duration-300 ${errors.image ? 'border-destructive' : 'border-border/40 focus:border-primary'
                                            }`}
                                        placeholder="Or paste image URL"
                                    />
                                </div>

                                {formData.image && (
                                    <div className="mt-4">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-48 h-32 object-cover rounded-lg border border-border/40"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60';
                                            }}
                                        />
                                    </div>
                                )}

                                {errors.image && (
                                    <p className="text-xs text-destructive flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <h2 className="text-xl font-bold text-foreground mb-6">Article Excerpt</h2>

                            <div className="space-y-2">
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg glass border transition-all duration-300 resize-none ${errors.excerpt ? 'border-destructive' : 'border-border/40 focus:border-primary'
                                        }`}
                                    rows={4}
                                    placeholder="Brief description of the article"
                                    maxLength={500}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {formData.excerpt.length}/500 characters
                                </p>
                                {errors.excerpt && (
                                    <p className="text-xs text-destructive flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.excerpt}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <h2 className="text-xl font-bold text-foreground mb-6">Tags</h2>

                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={formData.tags.join(', ')}
                                    onChange={(e) => handleTagChange(e.target.value.split(',').map(tag => tag.trim()))}
                                    className="w-full px-3 py-2 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300"
                                    placeholder="education, parenting, development"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Separate tags with commas
                                </p>
                            </div>
                        </div>

                        {/* Content Blocks */}
                        <div className="glass glass--deep p-6 md:p-8">
                            <div className="glass__noise" />
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-foreground">Article Content</h2>
                                <button
                                    type="button"
                                    onClick={addContentBlock}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                                >
                                    <Plus className="w-3 h-3" />
                                    Add Block
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.content.map((block, index) => (
                                    <div key={index} className="glass p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <select
                                                value={block.type}
                                                onChange={(e) => updateContentBlock(index, 'type', e.target.value)}
                                                className="px-2 py-1 rounded border border-border/40 text-xs"
                                            >
                                                <option value="p">Paragraph</option>
                                                <option value="h3">Heading</option>
                                                <option value="lead">Lead Text</option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => removeContentBlock(index)}
                                                className="p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={block.text}
                                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg glass border border-border/40 focus:border-primary transition-all duration-300 resize-none"
                                            rows={block.type === 'p' ? 4 : 3}
                                            placeholder={`Enter ${block.type} content...`}
                                            maxLength={2000}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border/40">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blog')}
                                className="px-6 py-3 rounded-lg text-sm font-medium glass border border-border/40 hover:border-border transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Create Article
                                    </>
                                )}
                            </button>
                        </div>

                        {errors.submit && (
                            <div className="glass glass--deep p-4 border border-destructive/30">
                                <div className="glass__noise" />
                                <p className="text-destructive text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.submit}
                                </p>
                            </div>
                        )}
                    </motion.form>
                </div>
            </div>
        </div>
    );
});

AddArticle.displayName = 'AddArticle';

export default AddArticle;