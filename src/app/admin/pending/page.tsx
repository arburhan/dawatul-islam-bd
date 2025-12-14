"use client";
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PendingPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [dots, setDots] = React.useState('');
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    // ✅ শুধুমাত্র admin role এর জন্য redirect - unauthenticated users stay here
    React.useEffect(() => {
        // যদি admin থাকে তাহলে dashboard এ যাবে
        const userRole = (session?.user as { role?: string })?.role;
        if (userRole === 'admin') {
            console.log('✅ User is admin - redirecting to dashboard');
            router.push('/admin/dashboard');
            return;
        }
    }, [session, router]);

    // ✅ Animated dots for loading effect
    React.useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // ✅ Logout handler
    const handleLogout = async () => {
        setIsLoggingOut(true);
        await signOut({ redirect: false });
        router.push('/admin/login');
    };

    // ✅ Show loading while checking auth status
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-6">
            {/* Logout Button - Top Right */}
            <div className="fixed top-6 right-6">
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition duration-200"
                >
                    {isLoggingOut ? 'লগআউট হচ্ছে...' : '🚪 লগআউট'}
                </button>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="text-6xl">⏳</div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">অনুমোদনের অপেক্ষায়</h1>
                    <p className="text-gray-600">আপনার অ্যাডমিন অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!</p>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
                    <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-xl">📋</span>
                        পরবর্তী পদক্ষেপ:
                    </h2>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-600 text-white font-bold">1</div>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">অ্যাডমিন পর্যালোচনা</p>
                                <p className="text-sm text-gray-600">আমাদের অ্যাডমিন টিম আপনার অনুরোধ পর্যালোচনা করছে</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-600 text-white font-bold">2</div>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">ইমেল বিজ্ঞপ্তি</p>
                                <p className="text-sm text-gray-600">অনুমোদিত হলে আপনি একটি ইমেল পাবেন</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-600 text-white font-bold">3</div>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">অ্যাক্সেস প্রাপ্ত করুন</p>
                                <p className="text-sm text-gray-600">অনুমোদনের পর আপনি এডমিন ড্যাশবোর্ডে প্রবেশ করতে পারবেন</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Animation */}
                <div className="text-center mb-8">
                    <div className="inline-block">
                        <p className="text-gray-700 font-medium">
                            অপেক্ষা করছি<span>{dots}</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row justify-center">
                    <Link 
                        href="/admin/login" 
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 text-center"
                    >
                        ← লগইনে ফিরুন
                    </Link>
                    <Link 
                        href="/admin/register" 
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition duration-200 text-center"
                    >
                        অন্য অ্যাকাউন্ট রেজিস্টার করুন
                    </Link>
                </div>

                {/* Info Message */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">💡 টিপস:</span> এই পেজটি খোলা রাখুন এবং অনুমোদনের জন্য অপেক্ষা করুন। 
                        অনুমোদিত হলে স্বয়ংক্রিয়ভাবে রিডাইরেক্ট হবে।
                    </p>
                </div>
            </div>
        </div>
    );
}
