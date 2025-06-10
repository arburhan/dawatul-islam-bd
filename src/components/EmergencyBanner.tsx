'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const locale = useLocale();

  if (!isVisible) return null;

  return (
    <div className="emergency-banner relative">
      <div className="container-custom">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <PhoneIcon className="w-5 h-5" />
            <span>
              {locale === 'bn' 
                ? 'জরুরি সাহায্যের জন্য কল করুন: ০১৭XXXXXXXX বা ০১৮XXXXXXXX' 
                : 'For emergency support call: 017XXXXXXXX or 018XXXXXXXX'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href={`/${locale}/contact?emergency=true`}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
            >
              {locale === 'bn' ? 'সাহায্য নিন' : 'Get Help'}
            </Link>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
              aria-label="Close banner"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 