'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  HeartIcon, 
  UserGroupIcon, 
  PhoneIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';

export default function Hero() {
  const locale = useLocale();

  return (
    <section className="relative bg-gradient-to-br from-islamic-primary to-islamic-secondary py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-islamic-primary/95 to-islamic-secondary/90"></div>
      
      <div className="relative container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center bg-islamic-accent/20 border border-islamic-accent/30 rounded-full px-4 py-2">
              <StarIcon className="w-4 h-4 text-islamic-accent mr-2" />
              <span className="text-sm font-medium text-islamic-accent">
                {locale === 'bn' ? 'বিশ্বস্ত ইসলামিক গাইডেন্স' : 'Trusted Islamic Guidance'}
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                {locale === 'bn' ? (
                  <>
                    <span className="block">বাংলাদেশে</span>
                    <span className="block text-islamic-accent">নতুন মুসলিমদের</span>
                    <span className="block">সহায়তা</span>
                  </>
                ) : (
                  <>
                    <span className="block">New Muslim</span>
                    <span className="block text-islamic-accent">Support in</span>
                    <span className="block">Bangladesh</span>
                  </>
                )}
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed max-w-xl">
                {locale === 'bn'
                  ? 'আপনি যদি ইসলাম গ্রহণ করার কথা ভাবছেন বা সম্প্রতি ইসলাম গ্রহণ করেছেন, আমরা আপনার পাশে আছি।'
                  : 'Whether you\'re considering embracing Islam or have recently converted, we\'re here to support you.'
                }
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/how-to-convert`}
                className="group bg-islamic-accent hover:bg-yellow-500 text-islamic-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <HeartIcon className="w-5 h-5 mr-3" />
                <span>{locale === 'bn' ? 'ইসলাম গ্রহণ করুন' : 'Embrace Islam'}</span>
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={`/${locale}/volunteer`}
                className="group bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center"
              >
                <UserGroupIcon className="w-5 h-5 mr-3" />
                <span>{locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Become Volunteer'}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-sm">
                <CheckCircleIcon className="w-5 h-5 text-islamic-accent mr-2" />
                <span className="text-gray-200">{locale === 'bn' ? '১২৫০+ সাহায্যপ্রাপ্ত' : '1250+ Helped'}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircleIcon className="w-5 h-5 text-islamic-accent mr-2" />
                <span className="text-gray-200">{locale === 'bn' ? '৮৫+ স্বেচ্ছাসেবক' : '85+ Volunteers'}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircleIcon className="w-5 h-5 text-islamic-accent mr-2" />
                <span className="text-gray-200">{locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Service'}</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-islamic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-islamic-primary mb-2">
                  {locale === 'bn' ? 'আপনার যাত্রা শুরু করুন' : 'Start Your Journey'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'bn' ? 'সম্পূর্ণ বিনামূল্যে এবং গোপনীয়' : 'Completely free and confidential'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-islamic-primary">1250+</div>
                  <div className="text-xs text-gray-500">{locale === 'bn' ? 'সাহায্যপ্রাপ্ত' : 'Helped'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-islamic-primary">85+</div>
                  <div className="text-xs text-gray-500">{locale === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteers'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-islamic-primary">24/7</div>
                  <div className="text-xs text-gray-500">{locale === 'bn' ? 'সেবা' : 'Service'}</div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-red-800 text-sm">
                      {locale === 'bn' ? 'জরুরি সাহায্য' : 'Emergency Help'}
                    </h4>
                    <p className="text-red-600 text-sm">
                      {locale === 'bn' ? 'কল করুন: ০১৭XXXXXXXX' : 'Call: 017XXXXXXXX'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-islamic-accent rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-islamic-light rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 