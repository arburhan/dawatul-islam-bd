import connectMongoose from './mongoose';
import { Admin, Volunteer, Donator, Note, Call } from './models';

export async function addAdminRequest(admin: { name: string; email: string }) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    await Admin.create({ name: admin.name, email: admin.email, role: 'requested', access: [], requestedAt: new Date() });
    return { success: true };
}

export async function listAdmins() {
    const conn = await connectMongoose();
    if (!conn) return [];
    const rows = await Admin.find().lean();
    return rows.map(r => ({ name: r.name || '', email: r.email || '', role: r.role || '', access: r.access || [] }));
}

export async function approveAdmin(email: string, access: string[] = []) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    await Admin.updateOne({ email }, { $set: { role: 'admin', access, requestedAt: new Date() } }, { upsert: true });
    return { success: true };
}

export async function appendNote(kind: 'volunteer' | 'donator' | 'admin', refId: string, note: string, author: string) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    const rec = await Note.create({ kind, refId, note, author, createdAt: new Date() });
    return { success: true, id: String(rec._id) };
}

export async function logCall(kind: 'volunteer' | 'donator', refId: string, phone: string, by: string) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    // Create call record
    await Call.create({ kind, refId, phone, by, at: new Date() });
    // If phone provided, mark contacted true. If phone empty, toggle contacted.
    if (kind === 'donator') {
        if (phone) {
            await Donator.updateOne({ _id: refId }, { $set: { contacted: true } });
        } else {
            const doc = await Donator.findById(refId).lean() as unknown as { contacted?: boolean } | null;
            const cur = doc?.contacted ? true : false;
            await Donator.updateOne({ _id: refId }, { $set: { contacted: !cur } });
        }
    } else if (kind === 'volunteer') {
        if (phone) {
            await Volunteer.updateOne({ _id: refId }, { $set: { contacted: true } });
        } else {
            const doc = await Volunteer.findById(refId).lean() as unknown as { contacted?: boolean } | null;
            const cur = doc?.contacted ? true : false;
            await Volunteer.updateOne({ _id: refId }, { $set: { contacted: !cur } });
        }
    }
    return { success: true };
}

export type VolunteerFormData = {
    name: string; email: string; phone: string; age?: number; location?: string; profession?: string; skills?: string; availability?: string; experience?: string; references?: string; message?: string; submittedAt?: string
}

export async function submitVolunteerForm(data: VolunteerFormData) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    const rec = await Volunteer.create({ ...data });
    return { success: true, id: String(rec._id) };
}

export type DonatorFormData = { name: string; address: string; mobile: string; donationType: string; amount: number | string; comment?: string; submittedAt?: string }

export async function appendDonationToSheet(data: DonatorFormData) {
    const conn = await connectMongoose();
    if (!conn) throw new Error('MONGO_URI not configured');
    const rec = await Donator.create({ ...data, amount: Number(data.amount) });
    return { success: true, id: String(rec._id) };
}

export async function listVolunteers() {
    const conn = await connectMongoose();
    if (!conn) return [];
    // sort so that not-contacted (false) come first, then most recent
    const rows = await Volunteer.find().sort({ contacted: 1, _id: -1 }).lean();
    // attach latest note for each volunteer
    const list = await Promise.all(rows.map(async (r) => {
        const note = await Note.findOne({ kind: 'volunteer', refId: String(r._id) }).sort({ createdAt: -1 }).lean();
        const noteText = (note as { note?: string } | null)?.note ?? null;
        return { id: String(r._id), name: r.name || '', email: r.email || '', phone: r.phone || '', skills: r.skills || '', location: r.location || '', contacted: !!r.contacted, note: noteText };
    }));
    return list;
}

export async function listDonators(period: 'monthly' | 'yearly') {
    const conn = await connectMongoose();
    if (!conn) return [];
    // sort so that not-contacted (false) come first, then most recent
    const rows = await Donator.find({ donationType: { $regex: new RegExp(period, 'i') } }).sort({ contacted: 1, _id: -1 }).lean();
    const list = await Promise.all(rows.map(async (r) => {
        const note = await Note.findOne({ kind: 'donator', refId: String(r._id) }).sort({ createdAt: -1 }).lean();
        const noteText = (note as { note?: string } | null)?.note ?? null;
        return { id: String(r._id), name: r.name || '', amount: r.amount || 0, phone: r.mobile || '', period, contacted: !!r.contacted, note: noteText };
    }));
    return list;
}
