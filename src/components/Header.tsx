'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PhoneIcon,
  HeartIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('navigation');

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('whyIslam'), href: `/${locale}/why-islam` },
    { name: t('howToConvert'), href: `/${locale}/how-to-convert` },
    { name: t('newMuslimGuide'), href: `/${locale}/new-muslim-guide` },
    { name: t('challenges'), href: `/${locale}/challenges` },
    { name: t('projects'), href: `/${locale}/projects` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-islamic-primary text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2" />
                <span>{locale === 'bn' ? 'জরুরি সাহায্য:' : 'Emergency:'} 017XXXXXXXX</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs">{locale === 'bn' ? '২৪/৭ সেবা উপলব্ধ' : '24/7 Service Available'}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <HeartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-islamic-primary">
                {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}
              </h1>
              <p className="text-xs text-gray-500">Bangladesh</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-islamic-primary font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-islamic-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href={`/${locale}/volunteer`}
              className="hidden md:flex items-center bg-islamic-primary hover:bg-islamic-secondary text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <UserPlusIcon className="w-4 h-4 mr-2" />
              {locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container-custom py-4">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-islamic-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/volunteer`}
                className="flex items-center bg-islamic-primary text-white px-4 py-2 rounded-lg font-medium mt-4 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlusIcon className="w-4 h-4 mr-2" />
                {locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 