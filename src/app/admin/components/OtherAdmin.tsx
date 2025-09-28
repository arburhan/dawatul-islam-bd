"use client";
import React, { useEffect, useState } from "react";

type Admin = { name: string; email: string; role?: string; access?: string[] };

const OtherAdmin: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        const a = JSON.parse(localStorage.getItem('admins') || '[]') as Admin[];
        setAdmins(a.filter(x => x.role === 'admin'));
    }, []);

    const revoke = (email: string) => {
        const a = JSON.parse(localStorage.getItem('admins') || '[]') as Admin[];
        const idx = a.findIndex(x => x.email === email);
        if (idx >= 0) {
            a[idx].role = 'requested';
            a[idx].access = [];
            localStorage.setItem('admins', JSON.stringify(a));
            setAdmins(a.filter(x => x.role === 'admin'));
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Other Admins</h3>
            <div className="space-y-3">
                {admins.length === 0 && <p className="text-gray-500">No admins</p>}
                {admins.map(a => (
                    <div key={a.email} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="font-semibold">{a.name}</div>
                            <div className="text-sm text-gray-500">{a.email}</div>
                            <div className="text-xs text-gray-400">Access: {(a.access || []).join(', ')}</div>
                        </div>
                        <div>
                            <button onClick={() => revoke(a.email)} className="px-3 py-2 bg-red-500 text-white rounded">Revoke</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherAdmin;
