import { useLocale } from 'next-intl';

export default function AboutPage() {
    const locale = useLocale();
    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">
                {locale === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </h1>
            <p className="text-lg text-gray-700">
                {locale === 'bn'
                    ? 'আমাদের সংস্থা ইসলামের দাওয়াত ও মানবিক সহায়তার জন্য নিবেদিত। আমরা নতুন মুসলিমদের জন্য সহায়তা, শিক্ষা ও কমিউনিটি গড়ে তুলতে কাজ করি।'
                    : 'Our organization is dedicated to Islamic outreach and humanitarian support. We work to provide support, education, and community for new Muslims.'}
            </p>
        </div>
    );
}
