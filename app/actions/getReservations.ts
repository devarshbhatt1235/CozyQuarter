import prisma from "@/app/libs/prismadb"

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  type?: 'current' | 'past';
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId, type } = params;
    const currentDate = new Date();

    const query: any = {};

    if (listingId) {
        query.listingId = listingId;
    }

    if (userId) {
        query.userId = userId;
    }

    if (authorId) {
        query.listing = { userId: authorId };
    }

    // Add date filtering based on type
    if (type === 'current') {
        query.endDate = {
            gte: currentDate
        };
    } else if (type === 'past') {
        query.endDate = {
            lt: currentDate
        };
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeReservations = reservations.map((reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString()
        }
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}