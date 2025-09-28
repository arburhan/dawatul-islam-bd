import { NextResponse } from 'next/server';
import { addAdminRequest } from '../../../../lib/db';

export async function POST(req: Request) {
    const body = await req.json();
    if (!body?.name || !body?.email) return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    const res = await addAdminRequest({ name: body.name, email: body.email });
    return NextResponse.json(res);
}
