import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Noto_Sans_Bengali, Inter } from 'next/font/google';

// Configure Bengali font
const notoSansBengali = Noto_Sans_Bengali({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bengali',
});

// Configure English font
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const locales = ['bn', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLocale = locales.includes(locale);

  if (!isValidLocale) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dawatul-islam-bd.vercel.app';
  const title = locale === 'bn'
    ? 'দাওয়াতুল ইসলাম বাংলাদেশ'
    : "Dawatul Islam Bangladesh";
  const description = locale === 'bn'
    ? 'সমৃদ্ধির একটি উজ্জ্বল আলোকবর্তিকা, বিশ্বকে আলোকিত করতে, মনকে অনুপ্রাণিত করতে এবং হৃদয়কে জাগ্রত করতে প্রচেষ্টারত।'
    : 'A shining beacon of prosperity, striving to illuminate the world, inspire minds, and awaken hearts.';

  return {
    title,
    description,
    keywords: locale === 'bn'
      ? 'ইসলাম, মুসলিম, ধর্মান্তর, বাংলাদেশ, সহায়তা, গাইড, দাওয়াতুল ইসলাম, দাওয়াতুল ইসলাম বাংলাদেশ, দারুল কারার, ঢাকা দারুল কারার, দারুল কারার মসজিদ এবং মাদরাসা কমপ্লেক্স, দারুল কারার মসজিদ, দারুল কারার মাদরাসা, দারুল কারার কমপ্লেক্স'
      : 'Islam, Muslim, conversion, Bangladesh, support, guide, Dawatul Islam, Dawatul Islam Bangladesh, Darul Karam, Dhaka Darul Karam, DARUL KARAR MOSJID AND MADRASHA COMPLEX, DARUL KARAR MOSJID, DARUL KARAR MADRASHA, DARUL KARAR COMPLEX',
    authors: [{ name: 'Dawatul Islam Bangladesh' }],
    creator: 'Dawatul Islam Bangladesh',
    publisher: 'Dawatul Islam Bangladesh',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'bn': `${siteUrl}/bn`,
        'en': `${siteUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      url: `${siteUrl}/${locale}`,
      siteName: 'Dawatul Islam Bangladesh',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: locale === 'bn' ? 'দাওয়াতুল ইসলাম বাংলাদেশ' : 'Dawatul Islam Bangladesh',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
      creator: '@DawatulIslamBD',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // other: 'your-other-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${locale === 'bn' ? notoSansBengali.variable : inter.variable} ${locale === 'bn' ? 'font-bengali' : 'font-english'}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B4332" />
        <link rel="icon" href="/public/images/DIBLogo.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            {/* Main Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 