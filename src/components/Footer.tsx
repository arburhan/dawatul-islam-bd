'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Custom Mosque Icon Component (from user SVG)
const MosqueIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 -64 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V160H0v320zm579.16-192c17.86-17.39 28.84-37.34 28.84-58.91 0-52.86-41.79-93.79-87.92-122.9-41.94-26.47-80.63-57.77-111.96-96.22L400 0l-8.12 9.97c-31.33 38.45-70.01 69.76-111.96 96.22C233.79 135.3 192 176.23 192 229.09c0 21.57 10.98 41.52 28.84 58.91h358.32zM608 320H192c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h64v-72c0-48 48-72 48-72s48 24 48 72v72h64v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h32c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM64 0S0 32 0 96v32h128V96c0-64-64-96-64-96z" />
  </svg>
);

// Facebook Icon Component
const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  const quickLinks = [
    { name: t('about'), href: `/${locale}/about` },
    { name: t('projects'), href: `/${locale}/projects` },
    { name: t('markazActivity'), href: `/${locale}/markaz-activity` },
    { name: t('donator'), href: `/${locale}/donator` },
    { name: t('volunteer'), href: `/${locale}/volunteer` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];
  const supportLinks = [
    { name: t('donator'), href: `/${locale}/donator` },
    { name: t('volunteer'), href: `/${locale}/volunteer` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Organization Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <MosqueIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {locale === 'bn' ? 'দাওয়াতুল ইসলাম বাংলাদেশ' : 'Dawatul Islam Bangladesh'}
                </h3>
                <p className="text-islamic-accent font-semibold">Bangladesh</p>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {locale === 'bn'
                ? 'প্রজ্ঞা ও দাওয়াতের একটি বৈশ্বিক কেন্দ্রের স্বপ্ন:সমৃদ্ধির এক উজ্জ্বল আলোকবর্তিকা, যা বিশ্বব্যাপী জ্ঞানালোক প্রজ্বলিত করতে, মনকে অনুপ্রাণিত করতে এবং হৃদয়কে জাগিয়ে তুলতে উদ্যত।'
                : ' Envisioning a Global Center for Wisdom and Outreach: A radiant beacon of enrichment, poised to ignite global enlightenment, inspire minds, and awaken hearts.'
              }
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">{locale === 'bn' ? 'জরুরি প্রয়োজনে' : 'Emergency Contact'}</p>
                  <p className="text-islamic-accent font-bold text-lg">‎+880 1818-642166</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">{locale === 'bn' ? 'ইমেইল' : 'Email'}</p>
                  <p className="text-gray-300">dawatulislambdf@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">{locale === 'bn' ? 'অফিস' : 'Office'}</p>
                  <p className="text-gray-300">
                    {locale === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                  </p>
                  <a
                    href="https://tiny.cc/dawah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-islamic-accent hover:text-white underline text-sm transition-colors duration-200"
                  >
                    {locale === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'See in Google Maps'}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">{locale === 'bn' ? 'সেবার সময়' : 'Service Hours'}</p>
                  <p className="text-gray-300">
                    {locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Available'}
                  </p>
                </div>
              </div>

              {/* Facebook Contact */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <FacebookIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">{locale === 'bn' ? 'ফেসবুক' : 'Facebook'}</p>
                  <a
                    href="https://fb.com/newmuslimaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-islamic-accent hover:text-white transition-colors duration-200"
                  >
                    fb.com/newmuslimaid
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">{t('support')}</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Emergency Contact */}
            <div className="mt-8 p-6 bg-red-600/20 border-2 border-red-500/30 rounded-xl">
              <h5 className="font-bold text-red-300 mb-3 text-lg">
                {locale === 'bn' ? 'জরুরি সাহায্য' : 'Emergency Help'}
              </h5>
              <Link
                href={`/${locale}/contact?emergency=true`}
                className="text-red-200 hover:text-white transition-colors duration-200 flex items-center space-x-2 font-semibold"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>
                  {locale === 'bn' ? 'এখনই যোগাযোগ করুন' : 'Contact Now'}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300">
              © 2024 {locale === 'bn' ? 'দাওয়াতুল ইসলাম বাংলাদেশ' : 'New Muslim Support'}.
              {locale === 'bn' ? ' সকল অধিকার সংরক্ষিত।' : ' All rights reserved.'}
            </div>

            <div className="flex items-center space-x-8">
              <Link
                href={`/${locale}/under-development`}
                className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/under-development`}
                className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 