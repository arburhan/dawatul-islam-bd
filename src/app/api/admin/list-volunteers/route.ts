import { NextResponse } from 'next/server';
import { listVolunteers } from '../../../../lib/db';

export async function GET() {
    const vols = await listVolunteers();
    return NextResponse.json({ volunteers: vols });
}
