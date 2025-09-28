"use client";
import React, { useEffect, useState } from "react";

type Donator = { id: string; name: string; amount: number; phone: string; period: 'monthly' | 'yearly'; contacted?: boolean; note?: string };

const DonatorsTable: React.FC<{ period: 'monthly' | 'yearly' }> = ({ period }) => {
    const [list, setList] = useState<Donator[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/admin/list-donators?period=${period}`);
            const data = await res.json();
            const filtered = data.donators || [];
            filtered.sort((a: Donator, b: Donator) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
            setList(filtered);
        })();
    }, [period]);

    const toggle = async (id: string) => {
        // for simplicity, log call to mark contacted and refetch
        await fetch('/api/admin/log-call', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'donator', refId: id, phone: '', by: 'admin' }) });
        // refetch
        const res = await fetch(`/api/admin/list-donators?period=${period}`);
        const data = await res.json();
        const filtered = (data.donators || []);
        filtered.sort((a: Donator, b: Donator) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
        setList(filtered);
    }

    const [selectedNoteFor, setSelectedNoteFor] = useState<string | null>(null);
    const [note, setNote] = useState('');

    const saveNote = async (id: string) => {
        await fetch('/api/admin/add-note', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'donator', refId: id, note, author: 'admin' }) });
        setNote('');
        setSelectedNoteFor(null);
        // refresh list
        const res = await fetch(`/api/admin/list-donators?period=${period}`);
        const data = await res.json();
        const filtered = (data.donators || []);
        filtered.sort((a: Donator, b: Donator) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
        setList(filtered);
    }

    const callDonor = async (d: Donator) => {
        await fetch('/api/admin/log-call', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'donator', refId: d.id, phone: d.phone, by: 'admin' }) });
        window.location.href = `tel:${d.phone}`;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">{period === 'monthly' ? 'Monthly Donators' : 'Yearly Donators'}</h3>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left text-sm text-gray-500">
                            <th className="py-2">Name</th>
                            <th>Amount</th>
                            <th>Phone</th>
                            <th>Note</th>
                            <th>Contacted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(d => (
                            <tr key={d.id} className="border-t">
                                <td className="py-3">{d.name}</td>
                                <td>{d.amount}</td>
                                <td><button onClick={() => callDonor(d)} className="text-blue-600">📞</button></td>
                                <td><button onClick={async () => {
                                    const res = await fetch(`/api/admin/list-donators?period=${period}`);
                                    const data = await res.json();
                                    const donors = (data.donators || []) as Donator[];
                                    const found = donors.find(x => x.id === d.id);
                                    setList(donors);
                                    setNote(found?.note || '');
                                    setSelectedNoteFor(d.id);
                                }} className="text-sm text-gray-600">📝</button></td>
                                <td>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!!d.contacted} readOnly />
                                        <span onClick={() => toggle(d.id)} className={`px-3 py-1 rounded-full text-sm cursor-pointer ${d.contacted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{d.contacted ? 'Called' : 'Not Called'}</span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedNoteFor && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold">Add note</h4>
                    <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border rounded mt-2" />
                    {(() => {
                        const existing = list.find(l => l.id === selectedNoteFor);
                        return existing && existing.note ? <p className="text-sm text-gray-700 mt-2"><strong>Last note:</strong> {existing.note}</p> : null;
                    })()}
                    <div className="flex gap-2 mt-2">
                        <button onClick={() => saveNote(selectedNoteFor)} className="px-3 py-2 bg-green-600 text-white rounded">Save</button>
                        <button onClick={() => setSelectedNoteFor(null)} className="px-3 py-2 border rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DonatorsTable;
