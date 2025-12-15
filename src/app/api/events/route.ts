import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongoose';
import { Event } from '@/lib/models';

// GET /api/events - Fetch all events with pagination
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const publishedOnly = searchParams.get('published') !== 'false';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '30');

        const session = await getServerSession();
        const isAdmin = session?.user?.email;

        // If not admin, only show published events
        const filter = (!isAdmin && publishedOnly) ? { published: true } : {};

        // Get total count for pagination
        const total = await Event.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const skip = (page - 1) * limit;

        const events = await Event.find(filter)
            .sort({ eventDate: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            events,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore: page < totalPages
            }
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// POST /api/events - Create new event (admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await req.json();
        const { title, slug, content, excerpt, eventDate, location, image, published } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { success: false, error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existing = await Event.findOne({ slug });
        if (existing) {
            return NextResponse.json(
                { success: false, error: 'Slug already exists' },
                { status: 400 }
            );
        }

        const event = await Event.create({
            title,
            slug,
            content,
            excerpt,
            eventDate,
            location,
            image,
            published: published || false,
            createdBy: session.user.email,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
