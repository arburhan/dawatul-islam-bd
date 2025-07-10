import Link from 'next/link';
import { useLocale } from 'next-intl';
import { 
  WrenchScrewdriverIcon, 
  SparklesIcon, 
  HeartIcon,
  ArrowLeftIcon,
  ClockIcon,
  RocketLaunchIcon,
  StarIcon,
  CheckCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function UnderDevelopmentPage() {
  const locale = useLocale();

  const features = [
    {
      icon: HeartIcon,
      title: locale === 'bn' ? 'আত্মিক উন্নতি' : 'Spiritual Growth',
      description: locale === 'bn' ? 'ইসলামের সুন্দর শিক্ষা এবং আত্মিক উন্নতির গাইড' : 'Beautiful Islamic teachings and spiritual growth guidance'
    },
    {
      icon: SparklesIcon,
      title: locale === 'bn' ? 'বিশেষজ্ঞ সহায়তা' : 'Expert Support',
      description: locale === 'bn' ? 'অভিজ্ঞ আলেম এবং কাউন্সেলরদের সহায়তা' : 'Support from experienced scholars and counselors'
    },
    {
      icon: CheckCircleIcon,
      title: locale === 'bn' ? 'সম্পূর্ণ গাইড' : 'Complete Guide',
      description: locale === 'bn' ? 'ইসলাম গ্রহণ থেকে শুরু করে দৈনন্দিন জীবনের সব দিক' : 'From conversion to daily life aspects'
    }
  ];

  // const progressItems = [
  //   { name: locale === 'bn' ? 'কন্টেন্ট প্রস্তুতি' : 'Content Preparation', progress: 85 },
  //   { name: locale === 'bn' ? 'ডিজাইন সম্পূর্ণকরণ' : 'Design Completion', progress: 90 },
  //   { name: locale === 'bn' ? 'পরীক্ষা এবং উন্নতি' : 'Testing & Improvement', progress: 70 },
  //   { name: locale === 'bn' ? 'চূড়ান্ত প্রকাশ' : 'Final Launch', progress: 60 }
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="pt-20 pb-16 text-center">
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold mb-8 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {locale === 'bn' ? 'হোমপেজ এ ফিরে যান' : 'Back to Homepage'}
          </Link>

          {/* Main Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <WrenchScrewdriverIcon className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-5 h-5 text-yellow-800" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {locale === 'bn' ? 'শীঘ্রই আসছে!' : 'Coming Soon!'}
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {locale === 'bn' 
              ? 'আমরা এই পেজটি আপনাদের জন্য প্রস্তুত করছি। খুব শীঘ্রই এটি পাবলিশ করা হবে ইন শা আল্লাহ।' 
              : 'We are preparing this section for you. It will be available very soon in sha Allah.'
            }
          </p>

          {/* Progress indicator */}
          <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-3 mb-12">
            <ClockIcon className="w-5 h-5 text-green-700 mr-2" />
            <span className="text-green-700 font-semibold">
              {locale === 'bn' ? 'প্রস্তুতি চলমান' : 'Development in Progress'}
            </span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'bn' ? 'আপনি কী আশা করতে পারেন' : 'What You Can Expect'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-20">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-12 text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <RocketLaunchIcon className="w-12 h-12 mr-4" />
              <StarIcon className="w-8 h-8" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4">
              {locale === 'bn' ? 'আমাদের সাথে থাকুন!' : 'Stay Tuned!'}
            </h3>
            
            <p className="text-xl mb-8 opacity-90">
              {locale === 'bn' 
                ? 'আমরা আপনার জন্য বিশেষ কিছু প্রস্তুত করছি। আপডেট পেতে আমাদের সাথে যোগাযোগ করুন।' 
                : 'We are preparing something special for you. Contact us to get updates.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                {locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              </Link>
              
              <Link
                href={`/${locale}`}
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-200"
              >
                {locale === 'bn' ? 'হোমপেজ' : 'Homepage'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 