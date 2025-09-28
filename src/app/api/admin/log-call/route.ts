import { NextResponse } from 'next/server';
import { logCall } from '../../../../lib/db';

export async function POST(req: Request) {
    const body = await req.json();
    if (!body?.kind || !body?.refId || !body?.by) return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    const res = await logCall(body.kind, body.refId, body.phone || '', body.by);
    return NextResponse.json(res);
}
