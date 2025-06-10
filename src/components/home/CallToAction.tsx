'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  HeartIcon, 
  UserGroupIcon, 
  PhoneIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

export default function CallToAction() {
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {locale === 'bn' 
            ? 'আপনার যাত্রা শুরু করুন আজই' 
            : 'Start Your Journey Today'
          }
        </h2>
        
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
          {locale === 'bn'
            ? 'আপনি যেখানেই থাকুন না কেন, আমরা আপনার পাশে আছি। আপনার ইসলামিক যাত্রায় আমাদের সাথে যুক্ত হন।'
            : 'Wherever you are, we are here for you. Join us in your Islamic journey.'
          }
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* New to Islam */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-islamic-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="w-8 h-8 text-islamic-dark" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'ইসলামে নতুন?' : 'New to Islam?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'ইসলাম গ্রহণের সম্পূর্ণ গাইড এবং প্রয়োজনীয় সহায়তা পান।'
                : 'Get complete guidance and necessary support for embracing Islam.'
              }
            </p>
            
            <Link
              href={`/${locale}/how-to-convert`}
              className="inline-flex items-center bg-islamic-accent hover:bg-yellow-500 text-islamic-dark font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'শুরু করুন' : 'Get Started'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Want to Help */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="w-8 h-8 text-islamic-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'সাহায্য করতে চান?' : 'Want to Help?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'স্বেচ্ছাসেবক হয়ে অন্যদের ইসলামিক যাত্রায় সহায়তা করুন।'
                : 'Become a volunteer and help others in their Islamic journey.'
              }
            </p>
            
            <Link
              href={`/${locale}/volunteer`}
              className="inline-flex items-center bg-white hover:bg-gray-100 text-islamic-primary font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'যোগ দিন' : 'Join Us'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Need Help */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'সাহায্য প্রয়োজন?' : 'Need Help?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন। আমরা আছি।'
                : 'Contact us for any problem. We are here for you.'
              }
            </p>
            
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold mb-4">
            {locale === 'bn' 
              ? 'আমাদের প্রতিশ্রুতি' 
              : 'Our Promise'
            }
          </h3>
          
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-6">
            {locale === 'bn'
              ? 'আমরা প্রতিশ্রুতি দিচ্ছি যে আপনার ইসলামিক যাত্রার প্রতিটি পদক্ষেপে আমরা আপনার পাশে থাকব। আপনার গোপনীয়তা রক্ষা করব এবং সর্বোচ্চ সম্মানের সাথে আপনাকে সেবা প্রদান করব।'
              : 'We promise to be with you at every step of your Islamic journey. We will protect your privacy and serve you with the utmost respect.'
            }
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-islamic-accent rounded-full"></div>
              <span>{locale === 'bn' ? '১০০% বিনামূল্যে' : '100% Free'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-islamic-accent rounded-full"></div>
              <span>{locale === 'bn' ? 'সম্পূর্ণ গোপনীয়' : 'Completely Confidential'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-islamic-accent rounded-full"></div>
              <span>{locale === 'bn' ? '২৪/৭ উপলব্ধ' : '24/7 Available'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-islamic-accent rounded-full"></div>
              <span>{locale === 'bn' ? 'বিশেষজ্ঞ গাইডেন্স' : 'Expert Guidance'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 