import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import connectMongoose from '@/lib/mongoose';
import { Admin, Volunteer, Donator } from '@/lib/models';

const DATA_STORE = path.resolve(process.cwd(), 'data', 'store.json');
// Uses mongoose helper to detect DB

async function getMongoInfo() {
    const conn = await connectMongoose();
    if (!conn) return { available: false };
    try {
        const admins = await Admin.countDocuments();
        const volunteers = await Volunteer.countDocuments();
        const donators = await Donator.countDocuments();
        return { available: true, admins, volunteers, donators };
    } catch (e) {
        return { available: false, error: String(e) };
    }
}

export async function GET() {
    const exists = fs.existsSync(DATA_STORE);
    let content: unknown = null;
    try {
        if (exists) content = JSON.parse(fs.readFileSync(DATA_STORE, 'utf-8'));
    } catch (e) {
        content = { error: 'failed to read file', detail: String(e) };
    }

    const mongo = await getMongoInfo();

    return NextResponse.json({ dataStorePath: DATA_STORE, exists, content, mongo, env: { MONGO_URI: !!process.env.MONGO_URI, GOOGLE_SHEET_ID: !!process.env.GOOGLE_SPREADSHEET_ID } });
}
