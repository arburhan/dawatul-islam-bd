import { NextResponse } from 'next/server';
import { approveAdmin } from '../../../../lib/db';

export async function POST(req: Request) {
    const body = await req.json();
    if (!body?.email) return NextResponse.json({ success: false, message: 'Missing email' }, { status: 400 });
    const access = Array.isArray(body.access) ? body.access : [];
    const res = await approveAdmin(body.email, access);
    return NextResponse.json(res);
}
