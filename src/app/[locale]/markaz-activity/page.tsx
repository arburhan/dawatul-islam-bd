import MarkazActivity from '@/components/home/MarkazActivity';
import { useLocale } from 'next-intl';

export default function MarkazActivityPage() {
    const locale = useLocale();
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <MarkazActivity locale={locale as "bn" | "en" | undefined} />
        </div>
    );
}
