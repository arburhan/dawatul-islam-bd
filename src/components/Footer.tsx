'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  const quickLinks = [
    { name: t('whyIslam'), href: `/${locale}/why-islam` },
    { name: t('howToConvert'), href: `/${locale}/how-to-convert` },
    { name: t('newMuslimGuide'), href: `/${locale}/new-muslim-guide` },
    { name: t('challenges'), href: `/${locale}/challenges` },
  ];

  const supportLinks = [
    { name: t('projects'), href: `/${locale}/projects` },
    { name: t('volunteer'), href: `/${locale}/volunteer` },
    { name: t('about'), href: `/${locale}/about` },
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
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}
                </h3>
                <p className="text-islamic-accent font-semibold">Bangladesh</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {locale === 'bn'
                ? 'আমরা বাংলাদেশে নতুন মুসলিমদের ইসলামিক যাত্রায় সহায়তা প্রদান করি। আমাদের লক্ষ্য প্রতিটি নতুন মুসলিমকে সঠিক পথ দেখানো।'
                : 'We provide support to new Muslims in Bangladesh in their Islamic journey. Our goal is to guide every new Muslim on the right path.'
              }
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Emergency Hotline</p>
                  <p className="text-islamic-accent font-bold text-lg">+880 17XXXXXXXX</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300">info@newmuslimbd.org</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-300">
                    {locale === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-islamic-primary/20 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-islamic-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Service Hours</p>
                  <p className="text-gray-300">
                    {locale === 'bn' ? '২৪/৭ উপলব্ধ' : '24/7 Available'}
                  </p>
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
              © 2024 {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}. 
              {locale === 'bn' ? ' সকল অধিকার সংরক্ষিত।' : ' All rights reserved.'}
            </div>
            
            <div className="flex items-center space-x-8">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-300 hover:text-islamic-accent transition-colors duration-200 font-medium"
              >
                {t('terms')}
              </Link>
              
              <div className="text-gray-400 flex items-center space-x-2">
                <span>{locale === 'bn' ? 'ভালোবাসায় তৈরি' : 'Made with'}</span>
                <HeartIcon className="w-4 h-4 text-red-400" />
                <span>{locale === 'bn' ? 'বাংলাদেশে' : 'in Bangladesh'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 