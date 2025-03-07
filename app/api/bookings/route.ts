import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { propertyId, startDate, endDate, guests, totalPrice } = body;

    // Check if property exists and is available
    const property = await prisma.listing.findUnique({
      where: { id: propertyId },
      include: {
        bookings: {
          where: {
            OR: [
              {
                startDate: {
                  lte: new Date(startDate),
                },
                endDate: {
                  gte: new Date(startDate),
                },
              },
              {
                startDate: {
                  lte: new Date(endDate),
                },
                endDate: {
                  gte: new Date(endDate),
                },
              },
            ],
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (property.bookings.length > 0) {
      return NextResponse.json(
        { error: 'Property is not available for these dates' },
        { status: 400 }
      );
    }

    if (guests > property.guests) {
      return NextResponse.json(
        { error: 'Too many guests' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        propertyId,
        userId: session.user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        guests,
        totalPrice,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    const where: any = {
      userId: session.user.id,
    };

    if (propertyId) {
      where.propertyId = propertyId;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        property: {
          select: {
            title: true,
            images: true,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 