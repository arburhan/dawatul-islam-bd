"use client";
import React, { Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <>
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">লোড হচ্ছে...</p>
                    </div>
                </div>
            }>
                <LoginForm />
            </Suspense>
            <Toaster />
        </>
    );
}
