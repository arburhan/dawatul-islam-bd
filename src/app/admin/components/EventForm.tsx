"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Dynamically import Lexical editor to avoid SSR issues
const LexicalEditor = dynamic(() => import('@/components/LexicalEditor'), { ssr: false });

interface EventFormProps {
    event?: any;
    onClose: () => void;
}

export default function EventForm({ event, onClose }: EventFormProps) {
    const [title, setTitle] = useState(event?.title || '');
    const [slug, setSlug] = useState(event?.slug || '');
    const [excerpt, setExcerpt] = useState(event?.excerpt || '');
    const [eventDate, setEventDate] = useState(
        event?.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : ''
    );
    const [location, setLocation] = useState(event?.location || '');
    const [image, setImage] = useState(event?.image || '');
    const [content, setContent] = useState(event?.content || '');
    const [published, setPublished] = useState(event?.published || false);
    const [saving, setSaving] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    // Auto-generate slug from title
    useEffect(() => {
        if (!event && title) {
            const autoSlug = title
                .toLowerCase()
                .replace(/[^\u0980-\u09FFa-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setSlug(autoSlug);
        }
    }, [title, event]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('শুধুমাত্র ছবি ফাইল নির্বাচন করুন');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('ছবির সাইজ সর্বোচ্চ 2MB হতে হবে');
            return;
        }

        setImageLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
            setImageLoading(false);
            toast.success('ছবি আপলোড সফল হয়েছে');
        };
        reader.onerror = () => {
            toast.error('ছবি আপলোড করতে সমস্যা হয়েছে');
            setImageLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (shouldPublish: boolean) => {
        if (!title || !slug || !content) {
            toast.error('শিরোনাম, স্লাগ এবং কন্টেন্ট আবশ্যক');
            return;
        }

        setSaving(true);

        try {
            const payload = {
                title,
                slug,
                content,
                excerpt,
                eventDate: eventDate || null,
                location,
                image,
                published: shouldPublish
            };

            const url = event ? `/api/events/${event._id}` : '/api/events';
            const method = event ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                toast.success(event ? 'ইভেন্ট আপডেট হয়েছে' : 'ইভেন্ট তৈরি হয়েছে');
                onClose();
            } else {
                toast.error(data.error || 'সমস্যা হয়েছে');
            }
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error('ইভেন্ট সেভ করতে সমস্যা হয়েছে');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {event ? 'ইভেন্ট সম্পাদনা' : 'নতুন ইভেন্ট তৈরি'}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        ইভেন্টের তথ্য পূরণ করুন
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        শিরোনাম *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ইভেন্টের শিরোনাম লিখুন"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        স্লাগ (URL) *
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="event-slug"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        URL: /events/{slug || 'event-slug'}
                    </p>
                </div>

                {/* Date and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ইভেন্টের তারিখ
                        </label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            স্থান
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="ইভেন্টের স্থান"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        কভার ইমেজ
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition">
                            <Upload size={18} />
                            {imageLoading ? 'আপলোড হচ্ছে...' : 'ছবি আপলোড করুন'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={imageLoading}
                            />
                        </label>
                        {image && (
                            <button
                                type="button"
                                onClick={() => setImage('')}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                                ছবি মুছুন
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        সর্বোচ্চ সাইজ: 2MB | ফরম্যাট: JPG, PNG, GIF, WebP
                    </p>
                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="mt-4 max-w-md rounded-lg border shadow-sm"
                        />
                    )}
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        সংক্ষিপ্ত বিবরণ
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ইভেন্টের সংক্ষিপ্ত বিবরণ (তালিকায় দেখানো হবে)"
                    />
                </div>

                {/* Content Editor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        বিস্তারিত বিবরণ *
                    </label>
                    <LexicalEditor
                        initialContent={content}
                        onChange={setContent}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                    >
                        বাতিল
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleSave(false)}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                        >
                            <Save size={18} />
                            {saving ? 'সেভ হচ্ছে...' : 'ড্রাফট সেভ'}
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                        >
                            <Eye size={18} />
                            {saving ? 'প্রকাশ হচ্ছে...' : 'প্রকাশ করুন'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
