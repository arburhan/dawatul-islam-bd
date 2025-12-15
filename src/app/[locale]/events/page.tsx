"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Pagination from '@/components/Pagination';

interface Event {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    eventDate?: string;
    location?: string;
    image?: string;
    published: boolean;
    createdAt: string;
}

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        limit: 30,
        total: 0,
        totalPages: 1,
        hasMore: false
    });

    const fetchEvents = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/events?published=true&page=${page}&limit=30`);
            const data = await res.json();

            if (data.success) {
                setEvents(data.events || []);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        fetchEvents(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Separate upcoming and past events
    const now = new Date();
    const upcomingEvents = events.filter(e =>
        e.eventDate && new Date(e.eventDate) >= now
    ).sort((a, b) =>
        new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime()
    );

    const pastEvents = events.filter(e =>
        !e.eventDate || new Date(e.eventDate) < now
    ).sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-bold mb-4">আমাদের ইভেন্টসমূহ</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        দাওয়াতুল ইসলাম বাংলাদেশ এর আয়োজিত বিভিন্ন ইভেন্ট এবং কার্যক্রম
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
                    </div>
                ) : (
                    <>
                        {/* Upcoming Events */}
                        {upcomingEvents.length > 0 && (
                            <section className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                    <Calendar className="text-blue-600" size={32} />
                                    আসন্ন ইভেন্ট
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event._id} event={event} isUpcoming />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Past Events */}
                        {pastEvents.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                    সাম্প্রতিক ইভেন্ট
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event._id} event={event} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Empty State */}
                        {events.length === 0 && (
                            <div className="text-center py-20">
                                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                                    কোনো ইভেন্ট পাওয়া যায়নি
                                </h3>
                                <p className="text-gray-500">
                                    শীঘ্রই নতুন ইভেন্ট যুক্ত করা হবে
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function EventCard({ event, isUpcoming = false }: { event: Event; isUpcoming?: boolean }) {
    return (
        <Link
            href={`/events/${event.slug}`}
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image */}
            {event.image && (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                    {isUpcoming && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            আসন্ন প্রোগ্রাম
                        </div>
                    )}
                </div>
            )}

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                    {event.title}
                </h3>

                {event.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.excerpt}
                    </p>
                )}

                <div className="space-y-2 mb-4">
                    {event.eventDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={16} className="text-blue-600" />
                            <span>
                                {new Date(event.eventDate).toLocaleDateString('bn-BD', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} className="text-green-600" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    বিস্তারিত দেখুন
                    <ArrowRight size={18} />
                </div>
            </div>
        </Link>
    );
}
