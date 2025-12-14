'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function VerifyEmail() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [dots, setDots] = useState('');

    useEffect(() => {
        // Animated dots
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // যদি session load হয়ে গেছে তাহলে check করব
        if (status === 'authenticated') {
            const userRole = (session?.user as { role?: string })?.role;
            
            console.log('🔐 Verify-Email Auth Check:', { role: userRole, email: session?.user?.email });
            
            // যদি pending থাকে তাহলে pending page এ যাবে
            if (userRole === 'requested') {
                console.log('⏳ User is pending - redirecting to pending page');
                router.push('/admin/pending');
                return;
            }
            
            // যদি admin থাকে তাহলে dashboard এ যাবে
            if (userRole === 'admin') {
                console.log('✅ User is admin - redirecting to dashboard');
                router.push('/admin/dashboard');
                return;
            }
        }

        // Default: dashboard এ redirect করব 5 seconds এর পর
        const timer = setTimeout(() => {
            console.log('⏱️ Redirecting to dashboard after 5 seconds');
            router.push('/admin/dashboard');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router, session, status]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">ইমেইল যাচাই করছি...</h1>
                <p className="text-gray-600 mb-6">
                    আপনার ইমেইল যাচাই করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-900">
                        <span className="font-medium">ℹ️ তথ্য:</span><br/>
                        যদি আপনি সাফল্যের পরেও pending দেখেন, তার মানে আপনার অ্যাকাউন্ট এখনও অনুমোদনের অপেক্ষায় আছে।
                    </p>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    প্রক্রিয়াধীন<span>{dots}</span>
                </p>
                
                <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition font-medium"
                >
                    এখনই যান
                </button>
            </div>
        </div>
    );
}
