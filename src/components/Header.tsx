'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  UserPlusIcon,
  SparklesIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';


// Custom Mosque Icon Component (from user SVG)
const MosqueIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 -64 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V160H0v320zm579.16-192c17.86-17.39 28.84-37.34 28.84-58.91 0-52.86-41.79-93.79-87.92-122.9-41.94-26.47-80.63-57.77-111.96-96.22L400 0l-8.12 9.97c-31.33 38.45-70.01 69.76-111.96 96.22C233.79 135.3 192 176.23 192 229.09c0 21.57 10.98 41.52 28.84 58.91h358.32zM608 320H192c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h64v-72c0-48 48-72 48-72s48 24 48 72v72h64v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h32c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM64 0S0 32 0 96v32h128V96c0-64-64-96-64-96z" />
  </svg>
);


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations('navigation');
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainNavigation = [
    /* { name: t('about'), href: `/${locale}/about` }, */
    { name: t('projects'), href: `/${locale}/projects` },
    { name: t('markazActivity'), href: `/${locale}/markaz-activity` },
    { name: t('donator'), href: `/${locale}/donator` },
    { name: t('volunteer'), href: `/${locale}/volunteer` },
    { name: t('events'), href: `/${locale}/events` },
  ];
  const allNavigation = mainNavigation;

  // Define resourcesNavigation for the dropdown menu
  const resourcesNavigation = [
    { name: locale === 'bn' ? 'যোগাযোগ' : 'contact', href: `/admin/contact` },
    { name: locale === 'bn' ? 'লগইন' : 'login', href: `/admin/login` }

  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* Top Emergency Bar - Fixed */}
      <div className="bg-gradient-to-r  from-blue-600 to-cyan-500 text-white py-2.5">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">
                    {locale === 'bn' ? 'জরুরি সাহায্য:' : 'Emergency Help:'}
                  </span>
                  <span className="ml-2 font-bold text-white">‎01818642166</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white">
                    {locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Improved */}
      <div className="bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between py-5">
            {/* Logo - Fixed Colors */}
            <Link href={`/${locale}`} className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}>
                  <MosqueIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-islamic-accent)' }}>
                  <SparklesIcon className="w-2.5 h-2.5" style={{ color: 'var(--color-islamic-dark)' }} />
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                  {locale === 'bn' ? 'দাওয়াতুল ইসলাম বাংলাদেশ' : 'Dawatul Islam Bangladesh'}
                </h1>
                <p className="text-xs text-gray-500 font-medium flex items-center">
                  <span>Bangladesh</span>
                  <span className="ml-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-islamic-primary)' }}></span>
                  <span className="ml-1 text-xs">{locale === 'bn' ? 'বিশ্বস্ত' : 'Trusted'}</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Improved */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Main Links */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 rounded-lg hover:bg-green-50"
                >
                  {item.name}
                </Link>
              ))}

              {/* About Links */}
              {/* Removed aboutNavigation as it is not defined */}

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 rounded-lg hover:bg-green-50"
                >
                  <span>{locale === 'bn' ? 'আরও দেখুন' : 'More'}</span>
                  <ChevronDownIcon className={`w-4 h-4 ml-1 text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {resourcesNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Button & Mobile Menu - Fixed Colors */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push(`/bn/monthly-donate`)}
                className="hidden md:flex items-center text-white px-5 py-2.5 rounded-lg font-semibold text-sm bg-cyan-500  cursor-pointer"

              >
                <UserPlusIcon className="w-4 h-4 mr-2 text-white" />
                <span className="text-white">{locale === 'bn' ? 'মাসিক দাতা হতে চান?' : 'Become a Daaee'}</span>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

      {/* Mobile Menu - Improved */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container-custom py-4">
            <nav className="space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2"></div>
              {resourcesNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100">
                <a
                  href="https://docs.google.com/forms/u/0/d/1SuoAiAINk5s2KauBBPRRyye7sezcKmxh3Jm14ahiDjA/edit?fromCopy=true&ct=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white px-3 py-2 rounded-lg font-semibold w-full justify-center"
                  style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">{locale === 'bn' ? 'মাসিক দাতা হতে চান?' : 'Volunteer'}</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 