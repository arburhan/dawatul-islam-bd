"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import AdminSidebar from "../components/AdminSidebar";
import RequestedAdmin from "../components/RequestedAdmin";
import OtherAdmin from "../components/OtherAdmin";
import VolunteersTable from "../components/VolunteersTable";
import DonatorsTable from "../components/DonatorsTable";
import EventsManager from "../components/EventsManager";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [section, setSection] = useState<string>("requested");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ Unauthenticated - login এ পাঠাবে
        if (status === 'unauthenticated') {
            router.push('/admin/login');
            return;
        }

        // ✅ যদি pending/requested role থাকে তাহলে pending page এ রিডাইরেক্ট করব
        if (status === 'authenticated') {
            const userRole = (session?.user as { role?: string })?.role;
            console.log('🔐 Dashboard Auth Check:', { role: userRole, email: session?.user?.email });

            if (userRole === 'requested') {
                console.log('⏳ Redirecting pending admin to pending page');
                router.push('/admin/pending');
                return;
            }

            // ✅ Admin role থাকলে dashboard দেখাবে
            if (userRole === 'admin') {
                setLoading(false);
            }
        }
    }, [status, router, session]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Dashboard লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    // ✅ Role check - যদি pending/requested থাকে তাহলে pending page এ যাওয়ার মেসেজ
    const userRole = (session?.user as { role?: string })?.role;
    if (userRole === 'requested') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">⏳ অনুমোদনের অপেক্ষায়</h1>
                    <p className="text-gray-600 mb-6">আপনার অ্যাডমিন অ্যাকাউন্ট এখনও অনুমোদনের জন্য অপেক্ষা করছে।</p>
                    <Link href="/admin/pending" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium inline-block">
                        অপেক্ষা পেজে যান →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* ✅ Header with Logout */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-blue-100 text-sm">Welcome, {session?.user?.name || session?.user?.email}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* ✅ Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                <Toaster />
                <aside className="lg:col-span-1">
                    <AdminSidebar current={section} onNavigate={(s: string) => setSection(s)} />
                </aside>
                <section className="lg:col-span-3 bg-white rounded-2xl p-6 shadow">
                    {section === "requested" && <RequestedAdmin />}
                    {section === "other" && <OtherAdmin />}
                    {section === "events" && <EventsManager />}
                    {section === "volunteers" && <VolunteersTable />}
                    {section === "monthly" && <DonatorsTable period="monthly" />}
                    {section === "yearly" && <DonatorsTable period="yearly" />}
                </section>
            </div>
        </div>
    );
}
