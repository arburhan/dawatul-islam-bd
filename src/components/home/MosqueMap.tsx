import React from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const MosqueMap = () => {
    const locale = useLocale();
    const title = locale === 'bn' ? 'লোকেশন' : 'Location';
    const description = locale === 'bn'
        ? 'দারুল কারার মসজিদ ও মাদ্রাসা কমপ্লেক্সের অবস্থান নিচের মানচিত্রে দেখানো হয়েছে।'
        : 'The location of Darul Karar Mosque & Madrasa Complex is shown on the map below.';
    return (
        <section
            aria-label="Darul Karar Mosque Location"
            className="flex flex-col justify-center items-center py-8 bg-gray-50"
        >
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">
                {description}
                {' '}
                <Link href="https://tiny.cc/qarar" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">
                    {locale === 'bn' ? 'এখানে ক্লিক করুন' : 'Click Here To Show'}
                </Link>
            </p>
            <iframe
                title="Darul Karar Mosjid Madrasa Complex Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.893051153979!2d90.3310245!3d23.7757318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1000761064b%3A0xd90a77942dfcadcc!2sDarul%20Karar%20Mosjid%20Madrasa%20Complex!5e0!3m2!1sen!2sbd!4v1692258299983!5m2!1sen!2sbd"
                width="100%"
                height="450"
                className="rounded-lg shadow-lg border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );
};

export default MosqueMap;
