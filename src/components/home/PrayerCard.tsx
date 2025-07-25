'use client'
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    HeartIcon,
    HandRaisedIcon,
    ArrowPathIcon,
    XMarkIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    textColor?: string;
    onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    bgColor,
    textColor = 'text-gray-700',
    onClick
}) => {
    return (
        <div
            className={`${bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group`}
            onClick={onClick}
        >
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className={`text-2xl font-bold ${textColor}`}>
                    {title}
                </h3>
                <p className={`${textColor} leading-relaxed opacity-90`}>
                    {description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <SparklesIcon className={`w-6 h-6 ${textColor}`} />
                </div>
            </div>
        </div>
    );
};

const PrayerCard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<string>('');

    const handleCardClick = (feature: string) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    const features = [
        {
            icon: <HeartIcon className="w-8 h-8 text-white" />,
            title: "সহায়তা",
            description: "ডোনেশনের উপর নির্ভর করেই ফাউন্ডেশনের সকল কার্যক্রম পরিচালিত হবে। তাই আপনার সামর্থ্য অনুসারে বেশি বেশি দান করুন।",
            bgColor: "bg-gradient-to-br from-rose-500 to-pink-600",
            textColor: "text-white"
        },
        {
            icon: <HandRaisedIcon className="w-8 h-8 text-white" />,
            title: "দোয়া",
            description: "এগিয়ে চলার পথে সার্বিক সাপোর্ট ও অভিনন্দনের পাশাপাশি আপনাদের আন্তরিক দুআ আমাদের একান্ত কাম্য। এটাই হতে পারে আমাদের সকল কার্যক্রম সুষ্ঠু ও সুন্দরভাবে সম্পন্ন করার অন্যতম চালিকাশক্তি।",
            bgColor: "bg-gradient-to-br from-teal-600 to-cyan-700",
            textColor: "text-white"
        },
        {
            icon: <ArrowPathIcon className="w-8 h-8 text-gray-700" />,
            title: "ভাগাভাগি",
            description: "জ্ঞান ও অভিজ্ঞতা আমাদের সাথে শেয়ার করুন । সবাই মিলে একটি সুন্দর সমাজ গড়ি।",
            bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
            textColor: "text-gray-700"
        }
    ];

    const getModalContent = (feature: string) => {
        switch (feature) {
            case 'সহায়তা':
                return {
                    title: 'সহায়তা কেন্দ্র',
                    content: 'আমাদের সহায়তা কেন্দ্রে আপনি পাবেন ২৪/৭ সেবা, বিশেষজ্ঞদের পরামর্শ এবং কমিউনিটি সাপোর্ট।'
                };
            case 'দোয়া':
                return {
                    title: 'প্রার্থনা ও ধ্যান',
                    content: 'নিয়মিত প্রার্থনার মাধ্যমে আপনার মানসিক শান্তি এবং আধ্যাত্মিক উন্নতি লাভ করুন।'
                };
            case 'ভাগাভাগি':
                return {
                    title: 'জ্ঞান ভাগাভাগি',
                    content: 'আমাদের প্ল্যাটফর্মে আপনার অভিজ্ঞতা, জ্ঞান এবং দক্ষতা অন্যদের সাথে শেয়ার করুন।'
                };
            default:
                return { title: '', content: '' };
        }
    };

    const modalContent = getModalContent(selectedFeature);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        আমাদের জন্য কি করতে পারেন?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        আমাদের কার্যক্রমে অংশগ্রহণ করে, দান করে অথবা আপনার জ্ঞান ও অভিজ্ঞতা শেয়ার করে আমাদের সাহায্য করুন।
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            bgColor={feature.bgColor}
                            textColor={feature.textColor}
                            onClick={() => handleCardClick(feature.title)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-6">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold leading-6 text-gray-900"
                                        >
                                            {modalContent.title}
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-gray-600 leading-relaxed">
                                            {modalContent.content}
                                        </p>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            বুঝেছি
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PrayerCard;