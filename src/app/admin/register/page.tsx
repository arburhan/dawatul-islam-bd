"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/admin/request-admin', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, email }) });
        // store password locally for login demo only
        const saved = JSON.parse(localStorage.getItem('admins') || '[]');
        saved.push({ name, email, password, role: 'requested' });
        localStorage.setItem('admins', JSON.stringify(saved));
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Create Admin Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input className="w-full p-3 border rounded-lg" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                    <input className="w-full p-3 border rounded-lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="w-full py-3 bg-green-600 text-white rounded-lg">Create Account</button>
                </form>
                <p className="text-sm text-center mt-4">Already have an account? <Link className="text-green-600 font-medium" href="/admin/login">Login</Link></p>
            </div>
        </div>
    );
}
