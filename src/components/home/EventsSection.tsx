"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Event {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    eventDate?: string;
    location?: string;
    image?: string;
}

export default function EventsSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const locale = params?.locale || 'bn';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`/api/events?published=true&limit=6&page=1`);
                const data = await res.json();
                if (data.success) {
                    setEvents(data.events || []);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="py-16 text-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto" />
            </div>
        );
    }

    if (events.length === 0) {
        return null; // hide section if no events
    }

    return (
        <section className="py-16 bg-gray-50 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div>
                        <h2 className=" text-3xl font-bold text-gray-900 font-bengali">
                            সর্বশেষ ইভেন্ট
                        </h2>
                        <p className="mt-2 text-gray-600 font-bengali">
                            আমাদের সাম্প্রতিক এবং আসন্ন কার্যক্রমসমূহ
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} locale={locale as string} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href={`/${locale}/events`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        আরো দেখুন
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function EventCard({ event, locale }: { event: Event; locale: string }) {
    const isUpcoming = event.eventDate && new Date(event.eventDate) > new Date();

    return (
        <Link
            href={`/${locale}/events/${event.slug}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-gray-100">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Calendar size={48} />
                    </div>
                )}

                {isUpcoming && (
                    <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        আসন্ন প্রোগ্রাম
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Date & Location */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    {event.eventDate && (
                        <div className="flex items-center gap-1.5">
                            <Calendar size={15} className="text-blue-600" />
                            <span>
                                {new Date(event.eventDate).toLocaleDateString('bn-BD', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 font-bengali">
                    {event.title}
                </h3>

                {event.excerpt && (
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                        {event.excerpt}
                    </p>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    {event.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 max-w-[60%]">
                            <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    )}

                    <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        বিস্তারিত
                        <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
