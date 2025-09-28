import { NextResponse } from 'next/server';
import connectMongoose from '@/lib/mongoose';
import { Admin, Volunteer, Donator } from '@/lib/models';

export async function POST() {
    const conn = await connectMongoose();
    if (!conn) return NextResponse.json({ success: false, message: 'MONGO_URI not set' }, { status: 400 });
    await Admin.create([{ name: 'Master Admin', email: 'admin@dibd.com', role: 'admin', access: ['all'], requestedAt: new Date() }]);
    await Volunteer.create([{ name: 'Seed Volunteer', phone: '01710000000', skills: 'Teaching', location: 'Dhaka' }]);
    await Donator.create([{ name: 'Seed Donor', amount: 500, mobile: '01720000000', donationType: 'monthly' }]);
    return NextResponse.json({ success: true });
}
