'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  HeartIcon, 
  UserGroupIcon, 
  PhoneIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid';

export default function Hero() {
  const locale = useLocale();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-islamic-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-islamic-accent/10 rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      
      <div className="relative container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center bg-islamic-primary/10 border border-islamic-primary/20 rounded-full px-6 py-3">
              <StarIcon className="w-5 h-5 text-islamic-primary mr-3" />
              <span className="text-sm font-semibold text-islamic-primary">
                {locale === 'bn' ? 'বিশ্বস্ত ইসলামিক গাইডেন্স' : 'Trusted Islamic Guidance'}
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 text-gray-900">
                {locale === 'bn' ? (
                  <>
                    <span className="block">বাংলাদেশে</span>
                    <span className="block text-islamic-primary">নতুন মুসলিমদের</span>
                    <span className="block">সহায়তা</span>
                  </>
                ) : (
                  <>
                    <span className="block">New Muslim</span>
                    <span className="block text-islamic-primary">Support in</span>
                    <span className="block">Bangladesh</span>
                  </>
                )}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {locale === 'bn'
                  ? 'আপনি যদি ইসলাম গ্রহণ করার কথা ভাবছেন বা সম্প্রতি ইসলাম গ্রহণ করেছেন, আমরা আপনার পাশে আছি। আমাদের বিশেষজ্ঞ দল আপনাকে সাহায্য করবে।'
                  : 'Whether you\'re considering embracing Islam or have recently converted, we\'re here to support you. Our expert team will guide you through this journey.'
                }
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href={`/${locale}/how-to-convert`}
                className="group bg-islamic-primary hover:bg-islamic-secondary text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <HeartIcon className="w-6 h-6 mr-3" />
                <span>{locale === 'bn' ? 'ইসলাম গ্রহণ করুন' : 'Embrace Islam'}</span>
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={`/${locale}/volunteer`}
                className="group bg-white hover:bg-gray-50 border-2 border-islamic-primary text-islamic-primary px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <UserGroupIcon className="w-6 h-6 mr-3" />
                <span>{locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Become Volunteer'}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <span className="font-semibold">{locale === 'bn' ? '১২৫০+ সাহায্যপ্রাপ্ত' : '1250+ Helped'}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <span className="font-semibold">{locale === 'bn' ? '৮৫+ স্বেচ্ছাসেবক' : '85+ Volunteers'}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <span className="font-semibold">{locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Service'}</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HeartIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {locale === 'bn' ? 'আপনার যাত্রা শুরু করুন' : 'Start Your Journey'}
                </h3>
                <p className="text-gray-600 text-lg">
                  {locale === 'bn' ? 'সম্পূর্ণ বিনামূল্যে এবং গোপনীয়' : 'Completely free and confidential'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-islamic-primary mb-1">1250+</div>
                  <div className="text-sm text-gray-500 font-medium">{locale === 'bn' ? 'সাহায্যপ্রাপ্ত' : 'Helped'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-islamic-primary mb-1">85+</div>
                  <div className="text-sm text-gray-500 font-medium">{locale === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteers'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-islamic-primary mb-1">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">{locale === 'bn' ? 'সেবা' : 'Service'}</div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <PhoneIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 text-lg">
                      {locale === 'bn' ? 'জরুরি সাহায্য' : 'Emergency Help'}
                    </h4>
                    <p className="text-red-600 font-semibold text-lg">
                      {locale === 'bn' ? 'কল করুন: ০১৭XXXXXXXX' : 'Call: 017XXXXXXXX'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-100">
                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 font-medium">
                  {locale === 'bn' ? 'সম্পূর্ণ নিরাপদ ও গোপনীয়' : 'Completely Safe & Confidential'}
                </span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-islamic-accent rounded-2xl shadow-lg"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-islamic-light rounded-xl shadow-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 