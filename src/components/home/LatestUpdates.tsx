'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CalendarIcon, ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function LatestUpdates() {
  const t = useTranslations('home');
  const locale = useLocale();

  // Mock data - in real app, this would come from Sanity CMS
  const updates = [
    {
      id: 1,
      title: locale === 'bn' 
        ? 'নতুন মুসলিমদের জন্য বিশেষ প্রশিক্ষণ কর্মসূচি'
        : 'Special Training Program for New Muslims',
      excerpt: locale === 'bn'
        ? 'আমরা নতুন মুসলিমদের জন্য একটি বিশেষ প্রশিক্ষণ কর্মসূচি চালু করেছি যা তাদের ইসলামিক জীবনযাত্রায় সহায়তা করবে।'
        : 'We have launched a special training program for new Muslims to help them in their Islamic lifestyle.',
      date: '2024-06-10',
      readTime: '5 মিনিট',
      category: locale === 'bn' ? 'প্রশিক্ষণ' : 'Training',
      image: '/images/training-program.jpg'
    },
    {
      id: 2,
      title: locale === 'bn'
        ? 'রমজান মাসে বিশেষ সহায়তা কার্যক্রম'
        : 'Special Support Program During Ramadan',
      excerpt: locale === 'bn'
        ? 'রমজান মাসে নতুন মুসলিমদের জন্য বিশেষ সহায়তা এবং গাইডেন্স প্রদান করা হবে।'
        : 'Special assistance and guidance will be provided for new Muslims during Ramadan.',
      date: '2024-06-08',
      readTime: '3 মিনিট',
      category: locale === 'bn' ? 'ইভেন্ট' : 'Event',
      image: '/images/ramadan-support.jpg'
    },
    {
      id: 3,
      title: locale === 'bn'
        ? 'নতুন স্বেচ্ছাসেবক নিয়োগ কার্যক্রম'
        : 'New Volunteer Recruitment Program',
      excerpt: locale === 'bn'
        ? 'আমরা আমাদের দলে নতুন স্বেচ্ছাসেবক নিয়োগ করছি যারা নতুন মুসলিমদের সহায়তা করতে আগ্রহী।'
        : 'We are recruiting new volunteers to our team who are interested in helping new Muslims.',
      date: '2024-06-05',
      readTime: '4 মিনিট',
      category: locale === 'bn' ? 'নিয়োগ' : 'Recruitment',
      image: '/images/volunteer-recruitment.jpg'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (locale === 'bn') {
      return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-islamic-primary mb-4">
          {t('latestUpdates')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {locale === 'bn'
            ? 'আমাদের সর্বশেষ কার্যক্রম, ইভেন্ট এবং গুরুত্বপূর্ণ আপডেট সম্পর্কে জানুন'
            : 'Stay informed about our latest activities, events, and important updates'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updates.map((update) => (
          <article
            key={update.id}
            className="card group hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">📰</div>
                <p className="text-sm opacity-75">
                  {locale === 'bn' ? 'ছবি লোড হচ্ছে...' : 'Image Loading...'}
                </p>
              </div>
            </div>

            {/* Category and Date */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block bg-islamic-primary/10 text-islamic-primary text-xs font-medium px-3 py-1 rounded-full">
                {update.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {formatDate(update.date)}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-islamic-primary transition-colors duration-200 line-clamp-2">
              {update.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {update.excerpt}
            </p>

            {/* Read More and Read Time */}
            <div className="flex items-center justify-between">
              <Link
                href={`/${locale}/under-development`}
                className="inline-flex items-center text-islamic-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-200"
              >
                <span className="mr-2">
                  {locale === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'}
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              
              <div className="flex items-center text-gray-400 text-xs">
                <ClockIcon className="w-3 h-3 mr-1" />
                {update.readTime}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href={`/${locale}/under-development`}
          className="inline-flex items-center btn-primary"
        >
          <span className="mr-2">
            {locale === 'bn' ? 'সব আপডেট দেখুন' : 'View All Updates'}
          </span>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
} 