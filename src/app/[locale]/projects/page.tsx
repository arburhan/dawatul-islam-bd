import Projects from '@/components/home/Projects';
import { useLocale } from 'next-intl';

export default function ProjectsPage() {
    const locale = useLocale();
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">
                {locale === 'bn' ? 'প্রকল্প' : 'Projects'}
            </h1>
            <p className="text-lg text-gray-700">
                {locale === 'bn'
                    ? 'আমাদের চলমান ও ভবিষ্যৎ প্রকল্পসমূহ এখানে দেখুন।'
                    : 'See our ongoing and upcoming projects here.'}
            </p>
            <Projects locale={locale as "bn" | "en" | undefined} />
        </div>
    );
}
