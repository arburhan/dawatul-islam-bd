'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: 'bn', name: t('bengali'), flag: '🇧🇩' },
    { code: 'en', name: t('english'), flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <LanguageIcon className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3 ${
                    locale === language.code ? 'bg-islamic-primary/10 text-islamic-primary' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {locale === language.code && (
                    <span className="ml-auto text-islamic-primary text-sm">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 