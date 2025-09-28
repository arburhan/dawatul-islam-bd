import { NextResponse } from 'next/server';
import { appendNote } from '../../../../lib/db';

export async function POST(req: Request) {
    const body = await req.json();
    if (!body?.kind || !body?.refId || !body?.note || !body?.author) return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    const res = await appendNote(body.kind, body.refId, body.note, body.author);
    return NextResponse.json(res);
}
