'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { 
  UsersIcon, 
  HeartIcon, 
  FolderOpenIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const t = useTranslations('home.stats');
  const locale = useLocale();

  const stats = [
    {
      icon: UsersIcon,
      value: 1250,
      label: t('peopleHelped'),
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: HeartIcon,
      value: 85,
      label: t('volunteers'),
      suffix: '+',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100'
    },
    {
      icon: FolderOpenIcon,
      value: 24,
      label: t('projects'),
      suffix: '',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: MapPinIcon,
      value: 12,
      label: t('locations'),
      suffix: '',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-islamic-primary mb-4">
          {locale === 'bn' ? 'আমাদের প্রভাব' : 'Our Impact'}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {locale === 'bn'
            ? 'আমরা গর্বিত যে আমরা অনেক মানুষের জীবনে ইতিবাচক পরিবর্তন আনতে পেরেছি'
            : 'We are proud to have made a positive impact in many people\'s lives'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.label}
              className="stats-card group hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-8 h-8 ${stat.color}`} />
              </div>
              
              <div className="stats-number">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              
              <div className="stats-label">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="bg-islamic-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-islamic-primary mb-4">
            {locale === 'bn' ? 'আমাদের অঙ্গীকার' : 'Our Commitment'}
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {locale === 'bn'
              ? 'আমরা প্রতিটি নতুন মুসলিমকে তাদের ইসলামিক যাত্রায় সহায়তা করার জন্য প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো একটি সহায়ক এবং স্বাগত জানানো সম্প্রদায় তৈরি করা যেখানে প্রত্যেকে নিরাপদ এবং সমর্থিত বোধ করে।'
              : 'We are committed to supporting every new Muslim in their Islamic journey. Our goal is to create a supportive and welcoming community where everyone feels safe and supported.'
            }
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-islamic-primary">
              <div className="w-2 h-2 bg-islamic-primary rounded-full"></div>
              <span className="font-medium">
                {locale === 'bn' ? 'বিনামূল্যে সেবা' : 'Free Service'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-islamic-primary">
              <div className="w-2 h-2 bg-islamic-primary rounded-full"></div>
              <span className="font-medium">
                {locale === 'bn' ? '২৪/৭ সহায়তা' : '24/7 Support'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-islamic-primary">
              <div className="w-2 h-2 bg-islamic-primary rounded-full"></div>
              <span className="font-medium">
                {locale === 'bn' ? 'গোপনীয়তা সুরক্ষিত' : 'Privacy Protected'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-islamic-primary">
              <div className="w-2 h-2 bg-islamic-primary rounded-full"></div>
              <span className="font-medium">
                {locale === 'bn' ? 'বিশেষজ্ঞ গাইডেন্স' : 'Expert Guidance'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 