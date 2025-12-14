"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            toast.error('নাম প্রবেশ করুন');
            return;
        }
        if (!email.includes('@')) {
            toast.error('বৈধ ইমেইল প্রবেশ করুন');
            return;
        }

        setLoading(true);

        try {
            // ✅ Step 1: Create admin request in database
            const res = await fetch('/api/admin/request-admin', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            const data = await res.json();

            if (!res.ok) {
                // ✅ Handle duplicate email
                if (data.error === 'DUPLICATE_EMAIL') {
                    toast.error('এই ইমেইল ইতিমধ্যে রেজিস্ট্রেশন করেছে');
                    setLoading(false);
                    return;
                }
                toast.error(data.message || 'Registration failed');
                setLoading(false);
                return;
            }

            // ✅ Registration successful!
            setRegistered(true);
            setName('');
            setEmail('');
            toast.success('✅ Registration successful!');

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/admin/login');
            }, 3000);

        } catch (err) {
            console.error('Registration error:', err);
            toast.error('কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
            setLoading(false);
        }
    };

    if (registered) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Success!</h2>
                    <p className="text-gray-600 mb-4">আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!</p>
                    <p className="text-sm text-gray-500 mb-6">আপনার ইমেইল চেক করুন, ইমেইল এ প্রাপ্ত লিঙ্ক থেকে ভেরিফাই করুন । </p>
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                    >
                        Login এ যান
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Admin Registration</h2>
                <p className="text-center text-gray-600 mb-6 text-sm">নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করুন</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="সম্পূর্ণ নাম"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                প্রক্রিয়াকরণ...
                            </>
                        ) : (
                            <>✨ অ্যাকাউন্ট তৈরি করুন</>
                        )}
                    </button>
                </form>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    <p className="font-medium mb-2">📧 পরবর্তী ধাপ:</p>
                    <ol className="space-y-1 list-decimal list-inside">
                        <li>এখানে রেজিস্ট্রেশন করুন</li>
                        <li>লগিন পেজে ইমেইল দিয়ে সাইন ইন করুন</li>
                        <li>ইমেইলে verification link পাবেন</li>
                        <li>Link এ ক্লিক করে email verify করুন</li>
                        <li>অ্যাডমিন approval এর জন্য অপেক্ষা করুন</li>
                    </ol>
                </div>

                <p className="text-sm text-center mt-4">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <Link className="text-green-600 font-medium hover:underline" href="/admin/login">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
}
