"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from 'react-hot-toast';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status } = useSession();

    // ✅ যদি already authenticated থাকে তাহলে dashboard এ যাবে
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin/dashboard');
        }
    }, [status, router]);

    // ✅ URL থেকে error check করব
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            if (errorParam === 'unauthorized') {
                setError('❌ আপনার অ্যাকাউন্ট অনুমোদিত নয়। Admin এর সাথে যোগাযোগ করুন।');
            } else if (errorParam === 'AccessDenied') {
                setError('❌ অ্যাক্সেস প্রত্যাখ্যাত। দয়া করে আবার চেষ্টা করুন।');
            } else {
                setError(`❌ Error: ${errorParam}`);
            }
        }
    }, [searchParams]);

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('ইমেইল প্রবেশ করুন');
            return;
        }
        
        setError('');
        setLoading(true);
        
        try {
            const result = await signIn('email', {
                email,
                redirect: false,
            });

            if (result?.error) {
                setError('ইমেইল পাঠাতে ব্যর্থ হয়েছে');
                toast.error('ইমেইল পাঠাতে ব্যর্থ');
            } else if (result?.ok) {
                toast.success('✅ আপনার ইমেইলে সাইন-ইন লিঙ্ক পাঠানো হয়েছে');
                setEmail('');
            }
        } catch (err) {
            console.error('Email sign-in error:', err);
            setError('কোনো ত্রুটি ঘটেছে');
            toast.error('ত্রুটি');
        } finally {
            setLoading(false);
        }
    };

    // ✅ যখন ইমেইল লিঙ্ক থেকে আসে তখন লোডিং দেখাব
    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        
        if (token || email) {
            // ইমেইল লিঙ্ক থেকে এসেছে - লোডিং দেখাব
            setLoading(true);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {loading && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-50">
                        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
                            <div className="flex justify-center mb-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                            </div>
                            <p className="text-gray-700 font-medium">লগইন প্রক্রিয়াধীন...</p>
                            <p className="text-gray-500 text-sm mt-2">অনুগ্রহ করে অপেক্ষা করুন</p>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Admin Login</h2>
                <p className="text-center text-gray-600 mb-6 text-sm">শুধুমাত্র অনুমোদিত admin এর জন্য</p>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* ✅ Email Sign-In */}
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="আপনার ইমেইল"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                প্রক্রিয়াকরণ...
                            </>
                        ) : (
                            <>📧 ইমেইল লিঙ্ক পাঠান</>
                        )}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link className="text-blue-600 font-medium hover:underline" href="/admin/register">
                        এক্সপ্রেস অ্যাক্সেস রিকোয়েস্ট করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}
