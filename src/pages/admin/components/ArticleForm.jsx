import React, { memo, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, AlertCircle, Plus } from 'lucide-react';

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
const STATUSES = ['draft', 'published', 'archived'];

const ArticleForm = memo(({
    article,
    onSave,
    onCancel,
    isMobile
}) => {
    const [formData, setFormData] = useState({
        title: article?.title || '',
        category: article?.category || 'Education',
        excerpt: article?.excerpt || '',
        content: article?.content || [{ type: 'p', text: '' }],
        author: article?.author || '',
        tags: article?.tags || [],
        image: article?.image || '',
        featured: article?.featured || false,
        status: article?.status || 'draft'
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
                id: article?.id || `article-${Date.now()}`,
                date: article?.date || new Date().toISOString().split('T')[0],
                readTime: `${Math.max(3, Math.ceil(formData.content.length * 0.5))} min`
            };

            onSave(articleData);
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, onSave, article]);

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
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-foreground">
                    {article ? 'Edit Article' : 'Create New Article'}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Author and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Image Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                    Featured Image *
                </label>
                <div className="flex gap-3">
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
                    <div className="mt-2">
                        <img
                            src={formData.image}
                            alt="Preview"
                            className="w-32 h-20 object-cover rounded-lg border border-border/40"
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

            {/* Excerpt */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                    Excerpt *
                </label>
                <textarea
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg glass border transition-all duration-300 resize-none ${errors.excerpt ? 'border-destructive' : 'border-border/40 focus:border-primary'
                        }`}
                    rows={3}
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

            {/* Tags */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                    Tags
                </label>
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

            {/* Content Blocks */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                        Content
                    </label>
                    <button
                        type="button"
                        onClick={addContentBlock}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                        <Plus className="w-3 h-3" />
                        Add Block
                    </button>
                </div>

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
                            rows={block.type === 'p' ? 3 : 2}
                            placeholder={`Enter ${block.type} content...`}
                            maxLength={2000}
                        />
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg text-sm font-medium glass border border-border/40 hover:border-border transition-all duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            {article ? 'Update Article' : 'Create Article'}
                        </>
                    )}
                </button>
            </div>
        </motion.form>
    );
});

ArticleForm.displayName = 'ArticleForm';

export default ArticleForm;