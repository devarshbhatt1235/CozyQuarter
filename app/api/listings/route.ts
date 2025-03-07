import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const price = Number(formData.get('price'));
    const guests = Number(formData.get('guests'));
    const bedrooms = Number(formData.get('bedrooms'));
    const bathrooms = Number(formData.get('bathrooms'));
    const images = formData.getAll('images') as File[];

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return uploadToCloudinary(buffer);
      })
    );

    // Create listing in database
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        location,
        price,
        guests,
        bedrooms,
        bathrooms,
        images: imageUrls,
        userId: session.user.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const guests = Number(searchParams.get('guests')) || 1;

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
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}