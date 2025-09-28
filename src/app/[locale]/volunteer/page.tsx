'use client'
import { useLocale } from 'next-intl';
import { useState } from 'react';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
    name: string;
    email: string;
    phone: string;
    age: number | '';
    location: string;
    profession: string;
    skills: string;
    availability: string;
    experience: string;
    references?: string;
    message: string;
}


interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    age?: string;
    location?: string;
    profession?: string;
    skills?: string;
    availability?: string;
    experience?: string;
}

export default function VolunteerPage() {
    const locale = useLocale();
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        age: '',
        location: '',
        profession: '',
        skills: '',
        availability: '',
        experience: '',
        references: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) {
            newErrors.name = locale === 'bn' ? 'নাম আবশ্যক' : 'Name is required';
        } else if (form.name.trim().length < 2) {
            newErrors.name = locale === 'bn' ? 'নাম কমপক্ষে ২ অক্ষরের হতে হবে' : 'Name must be at least 2 characters';
        }

        if (!form.email.trim()) {
            newErrors.email = locale === 'bn' ? 'ইমেইল আবশ্যক' : 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = locale === 'bn' ? 'বৈধ ইমেইল ঠিকানা প্রয়োজন' : 'Valid email address required';
        }

        if (!form.phone.trim()) {
            newErrors.phone = locale === 'bn' ? 'ফোন নম্বর আবশ্যক' : 'Phone number is required';
        } else if (!/^[\+]?[0-9\-\(\)\s]{8,}$/.test(form.phone)) {
            newErrors.phone = locale === 'bn' ? 'বৈধ ফোন নম্বর প্রয়োজন' : 'Valid phone number required';
        }

        if (!form.age || Number(form.age) < 10) {
            newErrors.age = locale === 'bn' ? 'বয়স আবশ্যক' : 'Age is required';
        }

        if (!form.location.trim()) {
            newErrors.location = locale === 'bn' ? 'ঠিকানা আবশ্যক' : 'Location is required';
        }

        if (!form.profession.trim()) {
            newErrors.profession = locale === 'bn' ? 'পেশা আবশ্যক' : 'Profession is required';
        }

        if (!form.skills.trim()) {
            newErrors.skills = locale === 'bn' ? 'দক্ষতা আবশ্যক' : 'Skills are required';
        }

        if (!form.availability.trim()) {
            newErrors.availability = locale === 'bn' ? 'উপলব্ধতা আবশ্যক' : 'Availability is required';
        }

        if (!form.experience.trim()) {
            newErrors.experience = locale === 'bn' ? 'অভিজ্ঞতা আবশ্যক' : 'Experience is required';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'age' ? Number(value) || '' : value });

        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    submittedAt: new Date().toISOString()
                })
            });
            const result = await res.json();
            if (result.success) {
                toast.success(locale === 'bn' ? '🎉 জাযাকাল্লাহ খাইর! আপনার তথ্য সফলভাবে সংরক্ষিত হয়েছে!' :
                    '🎉 Jajakallah khair! Your data has been saved successfully!');
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            setForm({
                name: '',
                email: '',
                phone: '',
                age: '',
                location: '',
                profession: '',
                skills: '',
                availability: '',
                experience: '',
                references: '',
                message: '',
            });
        } catch {
            toast.error(locale === 'bn' ? 'ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।' : 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        // ensure this runs only in the browser and after render — schedule via setTimeout
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-0">
                            {locale === 'bn' ? 'ধন্যবাদ!' : 'Thank You!'}
                        </h1>

                        <p className="text-lg text-gray-600 max-w-prose">
                            {locale === 'bn'
                                ? 'আপনার নিবন্ধন সফল হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
                                : 'Your registration was successful. We will contact you soon.'}
                        </p>

                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 cursor-pointer"
                        >
                            {locale === 'bn' ? 'আরেকটি নিবন্ধন' : 'Register Another'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4 mx-auto">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="max-w-4xl mx-auto text-center">
                {/* Header Section */}
                <div className="text-center mb-12"></div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {locale === 'bn' ? 'স্বেচ্ছাসেবক নিবন্ধন' : 'Volunteer Registration'}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {locale === 'bn'
                        ? 'আমাদের সাথে যুক্ত হোন এবং সমাজের কল্যাণে অবদান রাখুন। আপনার ছোট প্রচেষ্টা বড় পরিবর্তন আনতে পারে।'
                        : 'Join us and contribute to the welfare of society. Your small effort can bring big changes.'}
                </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-4 md:mx-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
                    <h2 className="text-2xl font-bold text-white text-center">
                        {locale === 'bn' ? 'নিবন্ধন ফর্ম' : 'Registration Form'}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                    {/* Grid for two-column layout (all fields except message) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="name">
                                <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                                {locale === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.name
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                {errors.name && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="email">
                                <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-600" />
                                {locale === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Enter your email address'}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.email
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                {errors.email && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="phone">
                                <PhoneIcon className="w-5 h-5 mr-2 text-blue-600" />
                                {locale === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার ফোন নম্বর' : 'Enter your phone number'}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.phone
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                {errors.phone && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Age Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="age">
                                {locale === 'bn' ? 'বয়স' : 'Age'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    min={10}
                                    value={form.age}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার বয়স' : 'Your age'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.age
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.age && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.age && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.age}
                                </p>
                            )}
                        </div>

                        {/* Location Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="location">
                                {locale === 'bn' ? 'ঠিকানা' : 'Location'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার ঠিকানা' : 'Your location'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.location
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.location && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.location && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        {/* Profession Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="profession">
                                {locale === 'bn' ? 'পেশা' : 'Profession'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="profession"
                                    name="profession"
                                    value={form.profession}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার পেশা' : 'Your profession'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.profession
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.profession && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.profession && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.profession}
                                </p>
                            )}
                        </div>

                        {/* Skills Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="skills">
                                {locale === 'bn' ? 'দক্ষতা' : 'Skills'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={form.skills}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'আপনার দক্ষতা' : 'Your skills'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.skills
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.skills && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.skills && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.skills}
                                </p>
                            )}
                        </div>

                        {/* Availability Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="availability">
                                {locale === 'bn' ? 'উপলব্ধতা' : 'Availability'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="availability"
                                    name="availability"
                                    value={form.availability}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'কখন সময় দিতে পারবেন' : 'When are you available?'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.availability
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.availability && (
                                    <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.availability && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.availability}
                                </p>
                            )}
                        </div>

                        {/* Experience Field (span full width) */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="experience">
                                {locale === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    id="experience"
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder={locale === 'bn' ? 'আপনার পূর্বের অভিজ্ঞতা' : 'Your previous experience'}
                                    className={`w-full pl-4 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors.experience
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                />
                                {errors.experience && (
                                    <ExclamationCircleIcon className="absolute right-4 top-4 w-5 h-5 text-red-500" />
                                )}
                            </div>
                            {errors.experience && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    {errors.experience}
                                </p>
                            )}
                        </div>

                        {/* References Field (optional, span full width) */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="references">
                                {locale === 'bn' ? 'রেফারেন্স (ঐচ্ছিক)' : 'References (Optional)'}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="references"
                                    name="references"
                                    value={form.references}
                                    onChange={handleChange}
                                    placeholder={locale === 'bn' ? 'যদি থাকে' : 'If any'}
                                    className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Message Field (kept full width below the grid) */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" htmlFor="message">
                            <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-blue-600" />
                            {locale === 'bn' ? 'বার্তা (ঐচ্ছিক)' : 'Message (Optional)'}
                        </label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder={locale === 'bn'
                                    ? 'কেন আপনি স্বেচ্ছাসেবক হতে চান? আপনার আগ্রহের ক্ষেত্র সম্পর্কে লিখুন...'
                                    : 'Why do you want to be a volunteer? Tell us about your areas of interest...'}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
                            />
                            <ChatBubbleLeftRightIcon className="absolute left-4 top-6 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    {locale === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...'}
                                </div>
                            ) : (
                                <>
                                    {locale === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-blue-50 rounded-xl p-6 mt-8">
                        <p className="text-sm text-blue-800 text-center">
                            {locale === 'bn'
                                ? '🔒 আপনার তথ্য সুরক্ষিত রাখা হবে এবং শুধুমাত্র স্বেচ্ছাসেবী কার্যক্রমের জন্য ব্যবহৃত হবে।'
                                : '🔒 Your information will be kept secure and used only for volunteer activities.'}
                        </p>
                    </div>
                </form>
            </div >
        </div >
    );
}