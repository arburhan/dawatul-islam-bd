"use client";
import React from "react";

const AdminSidebar: React.FC<{ current: string; onNavigate: (s: string) => void }> = ({ current, onNavigate }) => {
    const items = [
        { key: 'requested', label: 'Requested Admin' },
        { key: 'other', label: 'Other Admin' },
        { key: 'volunteers', label: 'Volunteers' },
        { key: 'monthly', label: 'Monthly Donator' },
        { key: 'yearly', label: 'Yearly Donator' },
    ];

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-700">Admin Dashboard</h3>
                <p className="text-sm text-gray-500">Manage users and donors</p>
            </div>
            <nav className="space-y-2">
                {items.map(i => (
                    <button key={i.key} onClick={() => onNavigate(i.key)} className={`w-full text-left p-3 rounded-lg ${current === i.key ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}>
                        {i.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;
