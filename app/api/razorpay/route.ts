import { createRazorpayOrder } from '@/app/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    const order = await createRazorpayOrder(amount);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in Razorpay API route:', error);
    return NextResponse.json(
      { error: 'Error creating payment order' },
      { status: 500 }
    );
  }
} 