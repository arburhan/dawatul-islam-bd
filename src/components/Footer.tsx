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
    <footer className="bg-islamic-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-islamic-accent rounded-lg flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-islamic-dark" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}
                </h3>
                <p className="text-sm text-gray-300">Bangladesh</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {locale === 'bn'
                ? 'বাংলাদেশে নতুন মুসলিমদের জন্য সম্পূর্ণ বিনামূল্যে সহায়তা ও গাইডেন্স প্রদান করি।'
                : 'Providing free support and guidance for new Muslims in Bangladesh.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-islamic-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-islamic-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-islamic-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('emergency')}</p>
                  <p className="text-gray-300 text-sm">017XXXXXXXX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-islamic-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('email')}</p>
                  <p className="text-gray-300 text-sm">info@newmuslimbd.org</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-islamic-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('office')}</p>
                  <p className="text-gray-300 text-sm">
                    {locale === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ClockIcon className="w-5 h-5 text-islamic-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('hours')}</p>
                  <p className="text-gray-300 text-sm">
                    {locale === 'bn' ? '২৪/৭ উপলব্ধ' : '24/7 Available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-islamic-secondary mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}. 
              {locale === 'bn' ? ' সকল অধিকার সংরক্ষিত।' : ' All rights reserved.'}
            </p>
            
            <div className="flex items-center space-x-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-300 hover:text-islamic-accent text-sm transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-300 hover:text-islamic-accent text-sm transition-colors"
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