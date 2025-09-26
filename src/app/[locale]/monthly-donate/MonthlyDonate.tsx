'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import donateImage from '@/lib/images/donate.png';
import toast, { Toaster } from 'react-hot-toast';

const labels = {
    en: {
        name: 'Name',
        address: 'Address',
        mobile: 'Mobile Number',
        amount: 'Amount',
        comment: 'Comment',
        submit: 'Submit',
        title: 'Monthly Donator Form',
        monthlyDonator: 'Add your name to the monthly donors list',
    },
    bn: {
        name: 'নাম',
        address: 'ঠিকানা',
        mobile: 'মোবাইল নাম্বার',
        amount: 'পরিমাণ',
        comment: 'মন্তব্য',
        submit: 'জমা দিন',
        title: 'মাসিক দাতা ফরম',
        monthlyDonator: 'মাসিক দানকারীদের তালিকায় আপনার নাম যুক্ত করুন',
    },
} as const;

type Locale = keyof typeof labels;

interface MonthlyDonateProps {
    locale?: Locale;
}

export default function MonthlyDonate({ locale = 'bn' }: MonthlyDonateProps) {
    const t = labels[locale];
    const [form, setForm] = useState({
        name: '',
        address: '',
        mobile: '',
        amount: '',
        comment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        try {
            const res = await fetch('/api/submit-donation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    donationType: 'monthly', // Fixed as monthly
                    submittedAt: new Date().toISOString()
                })
            });
            const result = await res.json();
            if (result.success) {
                toast.success(locale === 'bn' ? '🎉 জাযাকাল্লাহ খাইর! আপনার দানের তথ্য সফলভাবে সংরক্ষিত হয়েছে!' :
                    '🎉 Jajakallah khair! Your donation has been saved successfully!');

                setMessage(locale === 'bn'
                    ? '🎉 জাযাকাল্লাহ খাইর! আপনার দানের তথ্য সফলভাবে সংরক্ষিত হয়েছে!'
                    : '🎉 Jajakallah khair! Your donation has been saved successfully!');
                setForm({
                    name: '',
                    address: '',
                    mobile: '',
                    amount: '',
                    comment: '',
                });
            } else {
                toast.error(locale === 'bn' ? '❌ দুঃখিত, তথ্য সংরক্ষণে সমস্যা হয়েছে।' : '❌ Sorry, there was a problem saving your donation.');

            }
        } catch {
            toast.error(locale === 'bn' ? '❌ দুঃখিত, সার্ভার সমস্যা হয়েছে।' : '❌ Sorry, there was a server error.');

        }
    };

    return (
        <section className='py-5 md:py-18'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='py-5'>
                <h2 className='text-center text-amber-500 font-bold text-3xl'>{t.monthlyDonator}</h2>
                {message && (
                    <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${message.includes('সফল') || message.includes('successfully')
                        ? 'bg-green-100 border border-green-300 text-green-700'
                        : 'bg-red-100 border border-red-300 text-red-700'
                        }`}>
                        {message}
                    </div>
                )}
            </div>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center content-center">
                    <div className="hidden lg:block relative h-[600px] pt-20">
                        <Image
                            src={donateImage}
                            alt="Monthly Donate Image"
                            className='pt-20'
                            fill
                            priority
                        />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-2xl shadow-2xl p-6 space-y-6 border border-gray-300"
                    >
                        <h2 className="text-2xl font-extrabold text-center mb-4 text-primary-700 tracking-tight">
                            {t.title}
                        </h2>

                        {/* Monthly Donation Indicator */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-center">
                                <div className="bg-green-100 rounded-full p-2 mr-3">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-green-800 font-semibold">
                                    {locale === 'bn' ? 'মাসিক দান' : 'Monthly Donation'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-semibold text-gray-700" htmlFor="name">{t.name}</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-semibold text-gray-700" htmlFor="address">{t.address}</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                    autoComplete="street-address"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-semibold text-gray-700" htmlFor="mobile">{t.mobile}</label>
                                <input
                                    id="mobile"
                                    type="tel"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-semibold text-gray-700" htmlFor="amount">{t.amount} (৳)</label>
                                <input
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder={locale === 'bn' ? 'মাসিক দানের পরিমাণ' : 'Monthly donation amount'}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-base font-semibold text-gray-700" htmlFor="comment">{t.comment}</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={form.comment}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder={locale === 'bn' ? 'আপনার মাসিক দান সম্পর্কে কোন মন্তব্য...' : 'Any comments about your monthly donation...'}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary-400 focus:outline-none transition"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg transition mt-2 tracking-wide cursor-pointer"
                        >
                            {t.submit}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}