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
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      {/* Top Emergency Bar */}
      <div className="bg-red-600 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'bn' ? 'জরুরি সাহায্য:' : 'Emergency Help:'} 
                <span className="ml-2 font-bold">017XXXXXXXX</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {locale === 'bn' ? '২৪/৭ উপলব্ধ' : '24/7 Available'}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <HeartIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-islamic-primary transition-colors">
                  {locale === 'bn' ? 'নতুন মুসলিম সহায়তা' : 'New Muslim Support'}
                </h1>
                <p className="text-sm text-gray-500 font-medium">Bangladesh</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-islamic-primary hover:bg-islamic-primary/5 rounded-lg font-medium transition-all duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-islamic-primary group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/${locale}/volunteer`}
                className="hidden md:flex items-center bg-islamic-primary hover:bg-islamic-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                {locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container-custom py-6">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-islamic-primary hover:bg-islamic-primary/5 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/volunteer`}
                className="flex items-center bg-islamic-primary text-white px-4 py-3 rounded-lg font-semibold mt-4 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                {locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 