import MonthlyDonate from "./MonthlyDonate";

type Locale = 'en' | 'bn';

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'bn' }];
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params; // Await the params Promise
    return <MonthlyDonate locale={locale === 'en' ? 'en' : 'bn'} />;
}
