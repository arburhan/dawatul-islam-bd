"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    type Admin = { email: string; password: string; name?: string; role?: string };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // simple localStorage-based auth for demo
        // master admin shortcut
        if (email === 'admin@dibd.com' && password === 'adminDIBD@25') {
            localStorage.setItem('admin_session', JSON.stringify({ email }));
            router.push('/admin/dashboard');
            return;
        }

        const admins = (JSON.parse(localStorage.getItem("admins") || "[]") as Admin[]);
        const found = admins.find((a) => a.email === email && a.password === password && a.role === 'admin');
        if (found) {
            localStorage.setItem("admin_session", JSON.stringify({ email: found.email }));
            router.push("/admin/dashboard");
        } else {
            setError("Invalid email or password or not approved yet");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input className="w-full p-3 border rounded-lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg">Login</button>
                </form>
                <p className="text-sm text-center mt-4">{`Don't have an account?`} <Link className="text-blue-600 font-medium" href="/admin/register">Create one</Link></p>
            </div>
        </div>
    );
}
