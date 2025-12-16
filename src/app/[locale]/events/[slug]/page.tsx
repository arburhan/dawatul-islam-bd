import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import LexicalRenderer from '@/components/LexicalRenderer';

import connectDB from '@/lib/mongoose';
import { Event } from '@/lib/models';

interface EventType {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    eventDate?: string;
    location?: string;
    image?: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

async function getEvent(slug: string): Promise<EventType | null> {
    try {
        await connectDB();
        const decodedSlug = decodeURIComponent(slug);

        const event = await Event.findOne({ slug: decodedSlug }).lean();

        if (!event) return null;

        return {
            ...event,
            _id: event._id.toString(),
            createdAt: event.createdAt?.toISOString(),
            updatedAt: event.updatedAt?.toISOString(),
            eventDate: event.eventDate?.toISOString(),
        } as unknown as EventType;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.slug);

    if (!event) {
        return {
            title: 'ইভেন্ট পাওয়া যায়নি',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const description = event.excerpt || `${event.title} - দাওয়াতুল ইসলাম বাংলাদেশ`;

    return {
        title: `${event.title} | দাওয়াতুল ইসলাম বাংলাদেশ`,
        description,
        keywords: ['ইভেন্ট', 'দাওয়াতুল ইসলাম', 'বাংলাদেশ', event.title, event.location || ''].filter(Boolean),
        authors: [{ name: 'দাওয়াতুল ইসলাম বাংলাদেশ' }],
        openGraph: {
            title: event.title,
            description,
            url: `${baseUrl}/events/${event.slug}`,
            siteName: 'দাওয়াতুল ইসলাম বাংলাদেশ',
            images: event.image ? [
                {
                    url: event.image.startsWith('data:') ? `${baseUrl}/og-default.jpg` : event.image,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                }
            ] : [],
            locale: 'bn_BD',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: event.title,
            description,
            images: event.image && !event.image.startsWith('data:') ? [event.image] : [],
        },
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const resolvedParams = await params;
    const { locale, slug } = resolvedParams;
    const event = await getEvent(slug);

    if (!event) {
        notFound();
    }

    const isUpcoming = event.eventDate && new Date(event.eventDate) >= new Date();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.excerpt || event.title,
        startDate: event.eventDate,
        location: event.location ? {
            '@type': 'Place',
            name: event.location,
        } : undefined,
        image: event.image && !event.image.startsWith('data:') ? event.image : undefined,
        organizer: {
            '@type': 'Organization',
            name: 'দাওয়াতুল ইসলাম বাংলাদেশ',
            url: baseUrl,
        },
        eventStatus: isUpcoming ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventCancelled',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section with Image */}
            {event.image && (
                <div className="relative h-[400px] bg-gradient-to-br from-blue-600 to-green-600">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {isUpcoming && (
                        <div className="absolute top-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            আসন্ন প্রোগ্রাম
                        </div>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link
                    href={`/${locale}/events`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                    সকল ইভেন্ট
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {event.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                    {event.eventDate && (
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">তারিখ</div>
                                <div className="font-semibold text-gray-800">
                                    {new Date(event.eventDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'bn-BD', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <MapPin size={24} className="text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">স্থান</div>
                                <div className="font-semibold text-gray-800">{event.location}</div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Clock size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">প্রকাশিত</div>
                            <div className="font-semibold text-gray-800">
                                {new Date(event.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'bn-BD')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Excerpt */}
                {event.excerpt && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {event.excerpt}
                        </p>
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <LexicalRenderer content={event.content} />
                </div>

                {/* Bottom CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">
                        আরও ইভেন্ট দেখুন
                    </h3>
                    <p className="text-blue-100 mb-6">
                        দাওয়াতুল ইসলাম বাংলাদেশ এর অন্যান্য কার্যক্রম সম্পর্কে জানুন
                    </p>
                    <Link
                        href={`/${locale}/events`}
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                    >
                        সকল ইভেন্ট দেখুন
                    </Link>
                </div>
            </div>
        </div>
    );
}
