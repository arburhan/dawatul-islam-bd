'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  HeartIcon,
  BookOpenIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  PhoneIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

export default function NavigationCards() {
  const locale = useLocale();
  const t = useTranslations('home');

  const cards = [
    {
      title: t('cards.whyIslam.title'),
      description: t('cards.whyIslam.description'),
      href: `/${locale}/why-islam`,
      icon: HeartIcon,
      color: 'bg-red-50 text-red-600 border-red-200',
      hoverColor: 'hover:bg-red-100'
    },
    {
      title: t('cards.howToConvert.title'),
      description: t('cards.howToConvert.description'),
      href: `/${locale}/how-to-convert`,
      icon: BookOpenIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      title: t('cards.newMuslimGuide.title'),
      description: t('cards.newMuslimGuide.description'),
      href: `/${locale}/new-muslim-guide`,
      icon: UserGroupIcon,
      color: 'bg-green-50 text-green-600 border-green-200',
      hoverColor: 'hover:bg-green-100'
    },
    {
      title: t('cards.challenges.title'),
      description: t('cards.challenges.description'),
      href: `/${locale}/challenges`,
      icon: ShieldCheckIcon,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      title: t('cards.projects.title'),
      description: t('cards.projects.description'),
      href: `/${locale}/projects`,
      icon: BriefcaseIcon,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      hoverColor: 'hover:bg-orange-100'
    },
    {
      title: t('cards.about.title'),
      description: t('cards.about.description'),
      href: `/${locale}/about`,
      icon: InformationCircleIcon,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      hoverColor: 'hover:bg-indigo-100'
    },
    {
      title: t('cards.contact.title'),
      description: t('cards.contact.description'),
      href: `/${locale}/contact`,
      icon: PhoneIcon,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      hoverColor: 'hover:bg-pink-100'
    },
    {
      title: t('cards.volunteer.title'),
      description: t('cards.volunteer.description'),
      href: `/${locale}/volunteer`,
      icon: HandRaisedIcon,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      hoverColor: 'hover:bg-yellow-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('navigationTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('navigationSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 ${card.hoverColor}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-islamic-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 