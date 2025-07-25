import { NextRequest, NextResponse } from 'next/server';
import { appendDonationToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        // Validate required fields
        if (!data.name || !data.address || !data.mobile || !data.donationType || !data.amount) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }
        // Append to Google Sheet
        await appendDonationToSheet(data);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to submit donation.' }, { status: 500 });
    }
}
