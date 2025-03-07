import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const guests = Number(searchParams.get('guests')) || 1;
    const minPrice = Number(searchParams.get('minPrice'));
    const maxPrice = Number(searchParams.get('maxPrice'));
    const bedrooms = Number(searchParams.get('bedrooms'));
    const bathrooms = Number(searchParams.get('bathrooms'));

    const where: any = {
      guests: {
        gte: guests,
      },
    };

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (minPrice) {
      where.price = {
        ...where.price,
        gte: minPrice,
      };
    }

    if (maxPrice) {
      where.price = {
        ...where.price,
        lte: maxPrice,
      };
    }

    if (bedrooms) {
      where.bedrooms = bedrooms;
    }

    if (bathrooms) {
      where.bathrooms = bathrooms;
    }

    if (startDate && endDate) {
      where.NOT = {
        bookings: {
          some: {
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
      };
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average rating for each listing
    const listingsWithRating = listings.map((listing) => ({
      ...listing,
      averageRating:
        listing.reviews.reduce((acc, review) => acc + review.rating, 0) /
        (listing.reviews.length || 1),
    }));

    return NextResponse.json(listingsWithRating);
  } catch (error) {
    console.error('Error searching listings:', error);
    return NextResponse.json(
      { error: 'Failed to search listings' },
      { status: 500 }
    );
  }
} 