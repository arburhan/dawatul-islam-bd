import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongoose';
import { Event } from '@/lib/models';

// GET /api/events/[id] - Fetch single event by ID or slug
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        // Try to find by slug first, then by _id
        let event = await Event.findOne({ slug: id }).lean();
        if (!event) {
            event = await Event.findById(id).lean();
        }

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        // Check if user is admin
        const session = await getServerSession();
        const isAdmin = session?.user?.email;

        // If not admin and event is not published, deny access
        if (!isAdmin && !(event as any).published) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch event' },
            { status: 500 }
        );
    }
}

// PUT /api/events/[id] - Update event (admin only)
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const body = await req.json();
        const { title, slug, content, excerpt, eventDate, location, image, published } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { success: false, error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if new slug already exists (excluding current event)
        if (slug) {
            const existing = await Event.findOne({ slug, _id: { $ne: id } });
            if (existing) {
                return NextResponse.json(
                    { success: false, error: 'Slug already exists' },
                    { status: 400 }
                );
            }
        }

        const event = await Event.findByIdAndUpdate(
            id,
            {
                title,
                slug,
                content,
                excerpt,
                eventDate,
                location,
                image,
                published,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update event' },
            { status: 500 }
        );
    }
}

// DELETE /api/events/[id] - Delete event (admin only)
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}
