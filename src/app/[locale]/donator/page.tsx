import DonatorForm from '@/components/home/DonatorForm';
import { useLocale } from 'next-intl';


export default function DonatorPage() {
    const locale = useLocale();
    return (
        <div className="max-w-7xl mx-auto py-5 px-4">
            <h1 className="text-3xl font-bold text-primary-700 text-center">
                {locale === 'bn' ? 'দাতা সদস্য হোন' : 'Become a Donor Member'}
            </h1>
            <DonatorForm locale={locale as "bn" | "en" | undefined} />
        </div>
    );
}
