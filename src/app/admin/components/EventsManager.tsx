"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Edit2, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import EventForm from './EventForm';
import Pagination from '@/components/Pagination';

interface Event {
    _id: string;
    title: string;
    slug: string;
    eventDate?: string;
    location?: string;
    published: boolean;
    createdAt: string;
}

export default function EventsManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/events?published=false&page=${page}&limit=10`);
            const data = await res.json();
            if (data.success) {
                setEvents(data.events);
                setCurrentPage(data.pagination.page);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('ইভেন্ট লোড করতে সমস্যা হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        fetchEvents(newPage);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('আপনি কি নিশ্চিত এই ইভেন্ট মুছে ফেলতে চান?')) {
            return;
        }

        try {
            const res = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                toast.success('ইভেন্ট সফলভাবে মুছে ফেলা হয়েছে');
                fetchEvents();
            } else {
                toast.error(data.error || 'ইভেন্ট মুছতে সমস্যা হয়েছে');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('ইভেন্ট মুছতে সমস্যা হয়েছে');
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingEvent(null);
        fetchEvents();
    };

    const filteredEvents = events.filter(event => {
        if (filter === 'published') return event.published;
        if (filter === 'draft') return !event.published;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (showForm) {
        return <EventForm event={editingEvent} onClose={handleFormClose} />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">ইভেন্ট ম্যানেজমেন্ট</h2>
                    <p className="text-gray-600 text-sm mt-1">সকল ইভেন্ট তৈরি এবং পরিচালনা করুন</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                    <Plus size={20} />
                    নতুন ইভেন্ট
                </button>
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    সব ({events.length})
                </button>
                <button
                    onClick={() => setFilter('published')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'published'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    প্রকাশিত ({events.filter(e => e.published).length})
                </button>
                <button
                    onClick={() => setFilter('draft')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'draft'
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    ড্রাফট ({events.filter(e => !e.published).length})
                </button>
            </div>

            {/* Events Table */}
            {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">কোনো ইভেন্ট পাওয়া যায়নি</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        প্রথম ইভেন্ট তৈরি করুন →
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ইভেন্ট
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    তারিখ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    স্থান
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    অবস্থা
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    অ্যাকশন
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredEvents.map((event) => (
                                <tr key={event._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{event.title}</div>
                                        <div className="text-sm text-gray-500">/{event.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {event.eventDate ? (
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(event.eventDate).toLocaleDateString('bn-BD')}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {event.location ? (
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                {event.location}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {event.published ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                <Eye size={12} />
                                                প্রকাশিত
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                                                <EyeOff size={12} />
                                                ড্রাফট
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="সম্পাদনা করুন"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="মুছে ফেলুন"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="border-t border-gray-200 py-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
