import { useLocale } from 'next-intl';

export default function VolunteerPage() {
    const locale = useLocale();
    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">
                {locale === 'bn' ? 'স্বেচ্ছাসেবক নিবন্ধন' : 'Volunteer Registration'}
            </h1>
            <p className="text-lg text-gray-700">
                {locale === 'bn'
                    ? 'স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন এবং আমাদের কার্যক্রমে অংশ নিন।'
                    : 'Register as a volunteer and join our activities.'}
            </p>
        </div>
    );
}
