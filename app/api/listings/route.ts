import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json()
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    kitchenCount,
    acCount,
    location,
    price
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
  })

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      kitchenCount,
      acCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}