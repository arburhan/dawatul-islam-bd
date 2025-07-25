'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  UserGroupIcon,
  PhoneIcon,
  StarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';

import DIBLogo from '@/lib/images/DIBLogo.png';
import Image from 'next/image';


const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);


export default function Hero() {
  const locale = useLocale();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 flex items-center overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-islamic-primary/10 to-islamic-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-islamic-accent/15 to-islamic-light/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-islamic-secondary/8 to-islamic-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Geometric patterns */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-islamic-accent/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-islamic-primary/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-islamic-light/50 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="relative container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Enhanced Content */}
          <div className="space-y-10">
            {/* Premium Badge - Fixed Colors */}
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-8 py-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}>
                  <StarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-green-700">
                  {locale === 'bn' ? 'ইসলামি দাওয়াহ-ভিত্তিক অরাজনৈতিক সেবামুলক সংস্থা' : 'Islamic Dawah-based Non-political Service Organization'}
                </span>
              </div>
            </div>

            {/* Enhanced Main Heading - Reduced Size */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black leading-[0.9] text-gray-900">
                {locale === 'bn' ? (
                  <>
                    <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">প্রজ্ঞা ও দাওয়াতের একটি </span>
                    <span className="block text-green-600">স্বৈশ্বিক কেন্দ্রের স্বপ্ন:</span>
                    {/* <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">:</span> */}
                  </>
                ) : (
                  <>
                    <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Envisioning a Global Center for </span>
                    <span className="block text-green-600">Wisdom and Outreach:</span>
                    {/* <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Bangladesh</span> */}
                  </>
                )}
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                {locale === 'bn'
                  ? 'সমৃদ্ধির এক উজ্জ্বল আলোকবর্তিকা, যা বিশ্বব্যাপী জ্ঞানালোক প্রজ্বলিত করতে, মনকে অনুপ্রাণিত করতে এবং     হৃদয়কে জাগিয়ে তুলতে উদ্যত।'
                  : 'A radiant beacon of enrichment, poised to ignite global enlightenment, inspire minds, and awaken hearts.'
                }
              </p>
            </div>

            {/* Enhanced CTA Buttons - Fixed Colors */}
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href={`/${locale}/under-development`}
                className="group relative text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 overflow-hidden"
                style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <HeartIcon className="w-7 h-7 mr-4 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 text-white">{locale === 'bn' ? 'মাসিক দাতা হোন' : ' Monthly Donator '}</span>
                <ArrowRightIcon className="w-6 h-6 ml-4 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <a
                href="https://docs.google.com/forms/u/0/d/1SuoAiAINk5s2KauBBPRRyye7sezcKmxh3Jm14ahiDjA/edit?fromCopy=true&ct=2"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/95 backdrop-blur-sm hover:bg-white border-2 border-green-300 hover:border-green-500 text-green-700 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <UserGroupIcon className="w-7 h-7 mr-4 text-green-700 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-green-700">{locale === 'bn' ? ' বার্ষিক দাতা' : 'Yearly Donator'}</span>
              </a>
            </div>

            {/* Enhanced Trust Indicators */}
            {/*   <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
                <span className="font-bold text-gray-800">{locale === 'bn' ? '১০,০০০+ সাহায্যপ্রাপ্ত' : '10,000+ Helped New Muslims'}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
                <span className="font-bold text-gray-800">{locale === 'bn' ? '১০০+ স্বেচ্ছাসেবক ' : '100+ Volunteers'}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
                <span className="font-bold text-gray-800">{locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Service'}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <CheckCircleIcon className="w-7 h-7 text-green-500" />
                <span className="font-bold text-gray-800">{locale === 'bn' ? '৬টি প্রকল্প' : '6 Projects'}</span>
              </div>
            </div> */}
          </div>

          {/* Enhanced Visual Element */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white/98 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-islamic-accent/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-islamic-primary/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

              {/* Header - Fixed Colors */}
              <div className="text-center mb-10 relative z-10">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}>
                    <Image src={DIBLogo} alt="Dawatul Islam Bangladesh Logo" width={60} height={60} className="w-18 h-18 object-cover rounded-full" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--color-islamic-accent)' }}>
                    <SparklesIcon className="w-5 h-5" style={{ color: 'var(--color-islamic-dark)' }} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  {locale === 'bn' ? 'আপনার দানের হাতকে প্রসারিত করুন' : ' Extend Your Hand of Charity'}
                </h3>
                <p className="text-gray-600 text-xl font-medium">
                  {locale === 'bn' ? 'সম্পূর্ণ বিনামূল্যে এবং গোপনীয়' : 'Completely free and confidential'}
                </p>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div className="text-center group">
                  <div className="text-4xl font-black text-green-700 mb-2 group-hover:scale-110 transition-transform duration-300">{locale === 'bn' ? '১০,০০০+' : '10,000+'}</div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{locale === 'bn' ? 'সাহায্যপ্রাপ্ত' : 'Helped'}</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-green-700 mb-2 group-hover:scale-110 transition-transform duration-300">{locale === 'bn' ? '১০০+' : '100+'}</div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{locale === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteers'}</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-green-700 mb-2 group-hover:scale-110 transition-transform duration-300">{locale === 'bn' ? '২৪/৭' : '24/7'}</div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{locale === 'bn' ? 'সেবা' : 'Service'}</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-green-700 mb-2 group-hover:scale-110 transition-transform duration-300">{locale === 'bn' ? '৬টি' : '6'} </div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{locale === 'bn' ? 'প্রকল্প' : 'Projects'}</div>
                </div>
              </div>

              {/* Enhanced Emergency Contact */}
              <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-2 border-red-200/50 rounded-2xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <PhoneIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-red-800 text-2xl mb-1">
                      {locale === 'bn' ? 'জরুরি সাহায্য' : 'Emergency Help'}
                    </h4>
                    <p className="text-red-600 font-bold text-xl">
                      {locale === 'bn' ? 'কল করুন: ০১৮১৮৬৪২১৬৬' : 'Call: ‎01818642166'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Security Badge */}
              <div className="flex items-center justify-center pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-3 bg-green-50 rounded-full px-6 py-3">
                  <ShieldCheckIcon className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-bold text-green-700">
                    {locale === 'bn' ? 'সম্পূর্ণ নিরাপদ ও গোপনীয়' : 'Completely Safe & Confidential'}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-islamic-accent to-yellow-400 rounded-3xl shadow-2xl animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-islamic-light to-emerald-400 rounded-2xl shadow-xl animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-4 w-6 h-6 bg-islamic-primary rounded-xl shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Global Impact Indicator */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl">
            <GlobeAltIcon className="w-8 h-8 text-green-700" />
            <span className="text-lg font-bold text-gray-800">
              {locale === 'bn' ? 'বিশ্বব্যাপী মুসলিম সম্প্রদায়ের সাথে যুক্ত হোন' : 'Join the Global Muslim Community'}
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-islamic-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-islamic-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-islamic-light rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 