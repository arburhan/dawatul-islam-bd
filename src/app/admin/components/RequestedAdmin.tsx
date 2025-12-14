"use client";
import React, { useEffect, useState } from "react";

type ReqAdmin = { name: string; email: string; role?: string; access?: string[] };
type Admin = { name: string; email: string; password?: string; role?: string; access?: string[] };

const RequestedAdmin: React.FC = () => {
    const [requested, setRequested] = useState<ReqAdmin[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/admin/list-admins');
                if (!res.ok) {
                    console.error('/api/admin/list-admins failed', res.status, res.statusText);
                    setRequested([]);
                    return;
                }

                type ListAdminsResponse = { admins?: Admin[] };

                function isListAdminsResponse(obj: unknown): obj is ListAdminsResponse {
                    if (typeof obj !== 'object' || obj === null) return false;
                    const rec = obj as Record<string, unknown>;
                    return 'admins' in rec && Array.isArray(rec.admins);
                }

                // handle empty or invalid JSON bodies gracefully without using `any`
                let data: ListAdminsResponse = {};
                try {
                    const text = await res.text();
                    if (text) {
                        const parsed = JSON.parse(text);
                        if (isListAdminsResponse(parsed)) data = parsed;
                        else data = {};
                    }
                } catch (err) {
                    console.error('Failed to parse JSON from /api/admin/list-admins', err);
                    data = {};
                }

                const list = Array.isArray(data.admins) ? data.admins : [];
                setRequested(list.filter((a: Admin) => a.role === 'requested'));
            } catch (err) {
                console.error('Fetch error for /api/admin/list-admins', err);
                setRequested([]);
            }
        })();
    }, []);

    const approve = async (email: string) => {
        await fetch('/api/admin/approve-admin', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, access: ['volunteers', 'monthly', 'yearly'] }) });
        setRequested(requested.filter(r => r.email !== email));
    };

    const grantAccess = async (email: string, key: string) => {
        // set single access by calling approve-admin with one access entry
        await fetch('/api/admin/approve-admin', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, access: [key] }) });
        // refresh list quickly
        setRequested(requested.map(r => r.email === email ? { ...r, access: [...(r.access || []), key] } : r));
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Requested Admins</h3>
            <div className="space-y-3">
                {requested.length === 0 && <p className="text-gray-500">No pending requests</p>}
                {requested.map(r => (
                    <div key={r.email} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-sm text-gray-500">{r.email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <select onChange={(e) => grantAccess(r.email, e.target.value)} className="p-2 border rounded">
                                <option value="">Grant access...</option>
                                <option value="volunteers">Volunteers</option>
                                <option value="monthly">Monthly Donator</option>
                                <option value="yearly">Yearly Donator</option>
                            </select>
                            <button onClick={() => approve(r.email)} className="px-4 py-2 bg-blue-600 text-white rounded">Approve</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RequestedAdmin;
