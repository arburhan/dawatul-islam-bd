import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminSessionProvider } from "./SessionProvider";

export const metadata: Metadata = {
    title: "Admin - Dawatul Islam",
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AdminSessionProvider>
            <html lang="en">
                <body className="min-h-screen bg-gray-50">
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                            <Link href="/" className="text-xl font-bold text-blue-700">Dawatul Islam</Link>
                            <nav>
                                <Link href="/admin/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
                            </nav>
                        </div>
                    </header>

                    <main className="py-8 px-4">{children}</main>
                </body>
            </html>
        </AdminSessionProvider>
    );
};

export default AdminLayout;
