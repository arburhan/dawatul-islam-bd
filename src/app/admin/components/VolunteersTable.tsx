"use client";
import React, { useEffect, useState } from "react";

type Volunteer = { id: string; name: string; skills: string; location: string; phone: string; email?: string; other?: string; contacted?: boolean; note?: string };

const VolunteersTable: React.FC = () => {
    const [vols, setVols] = useState<Volunteer[]>([]);
    const [selected, setSelected] = useState<Volunteer | null>(null);
    const [note, setNote] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/admin/list-volunteers');
            const data = await res.json();
            const list = data.volunteers || [];
            // ensure not-contacted come first (false before true)
            list.sort((a: Volunteer, b: Volunteer) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
            setVols(list);
        })();
    }, []);

    const remove = (id: string) => {
        const v = vols.filter(x => x.id !== id);
        localStorage.setItem('volunteers', JSON.stringify(v));
        setVols(v);
        setSelected(null);
    }

    const saveNote = async () => {
        if (!selected) return;
        await fetch('/api/admin/add-note', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'volunteer', refId: selected.id, note, author: 'admin' }) });
        setNote('');
        // refresh list to show latest note
        const res = await fetch('/api/admin/list-volunteers');
        const data = await res.json();
        setVols(data.volunteers || []);
        // refresh selected with updated note
        const volunteersList = (data.volunteers || []) as Volunteer[];
        const updated = volunteersList.find(x => x.id === selected.id);
        setSelected(updated || null);
    }

    const logCallFor = async (v: Volunteer) => {
        await fetch('/api/admin/log-call', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'volunteer', refId: v.id, phone: v.phone, by: 'admin' }) });
        // refetch and ensure ordering: not-contacted first
        const res = await fetch('/api/admin/list-volunteers');
        const data = await res.json();
        const list = (data.volunteers || []) as Volunteer[];
        list.sort((a, b) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
        setVols(list);
        // update selected if open
        if (selected) {
            const updated = list.find(x => x.id === selected.id) || null;
            setSelected(updated);
        }
        // open phone dialer
        window.location.href = `tel:${v.phone}`;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Volunteers</h3>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left text-sm text-gray-500">
                            <th className="py-2">Name</th>
                            <th>Skills</th>
                            <th>Location</th>
                            <th>Phone</th>
                            <th>Contacted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vols.map(v => (
                            <tr key={v.id} className="border-t">
                                <td className="py-3">{v.name}</td>
                                <td>{v.skills}</td>
                                <td>{v.location}</td>
                                <td>
                                    <button onClick={() => logCallFor(v)} className="text-blue-600">📞</button>
                                </td>
                                <td>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!!v.contacted} readOnly />
                                        <span onClick={async () => {
                                            // toggle contacted via log-call (no phone)
                                            await fetch('/api/admin/log-call', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'volunteer', refId: v.id, phone: '', by: 'admin' }) });
                                            const res = await fetch('/api/admin/list-volunteers');
                                            const data = await res.json();
                                            const list = (data.volunteers || []) as Volunteer[];
                                            list.sort((a, b) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
                                            setVols(list);
                                            if (selected) setSelected(list.find(x => x.id === selected.id) || null);
                                        }} className={`px-3 py-1 rounded-full text-sm cursor-pointer ${v.contacted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{v.contacted ? 'Called' : 'Not Called'}</span>
                                    </label>
                                </td>
                                <td>
                                    <button onClick={async () => {
                                        // refresh list and open selected with updated data
                                        const res = await fetch('/api/admin/list-volunteers');
                                        const data = await res.json();
                                        const latest = (data.volunteers || []) as Volunteer[];
                                        // ensure ordering
                                        latest.sort((a, b) => (a.contacted ? 1 : 0) - (b.contacted ? 1 : 0));
                                        const found = latest.find(x => x.id === v.id);
                                        setVols(latest);
                                        setSelected(found || v);
                                    }} className="text-sm text-blue-600">See Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selected && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold">{selected.name}</h4>
                    <p className="text-sm text-gray-600">Phone: <a className="text-blue-600" href={`tel:${selected.phone}`}>{selected.phone}</a></p>
                    <p className="text-sm text-gray-600">Skills: {selected.skills}</p>
                    {selected.note && <p className="text-sm text-gray-700 mt-2"><strong>Last note:</strong> {selected.note}</p>}
                    <p className="text-sm text-gray-600">Location: {selected.location}</p>
                    <div className="mt-3">
                        <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border rounded" placeholder="Add note for this volunteer (saved to sheet)..." />
                        <div className="flex gap-2 mt-2">
                            <button onClick={saveNote} className="px-3 py-2 bg-green-600 text-white rounded">Save Note</button>
                            <button onClick={() => remove(selected.id)} className="px-3 py-2 bg-red-500 text-white rounded">Remove</button>
                            <button onClick={() => setSelected(null)} className="px-3 py-2 border rounded">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VolunteersTable;
