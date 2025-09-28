import { NextResponse } from 'next/server';
import { listDonators } from '../../../../lib/db';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const period = url.searchParams.get('period') as 'monthly' | 'yearly' | null;
    if (!period) return NextResponse.json({ success: false, message: 'Missing period' }, { status: 400 });
    const list = await listDonators(period);
    return NextResponse.json({ donators: list });
}
