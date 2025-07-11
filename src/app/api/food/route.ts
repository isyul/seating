import { NextResponse } from 'next/server';
import { prisma } from '~/lib/db';

// GET /api/food - Get all food options
export async function GET() {
  try {
    const foodOptions = await prisma.foodOption.findMany();
    return NextResponse.json(foodOptions);
  } catch (error) {
    console.error('Error fetching food options:', error);
    return NextResponse.json({ error: 'Failed to fetch food options' }, { status: 500 });
  }
}

// POST /api/food - Update a food option's selection status
export async function POST(request: Request) {
  try {
    const { id, selected } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Food option ID is required' }, { status: 400 });
    }
    
    const updatedOption = await prisma.foodOption.update({
      where: { id },
      data: { selected },
    });
    
    return NextResponse.json(updatedOption);
  } catch (error) {
    console.error('Error updating food option:', error);
    return NextResponse.json({ error: 'Failed to update food option' }, { status: 500 });
  }
}

// PUT /api/food/reset - Reset all food selections
export async function PUT() {
  try {
    await prisma.foodOption.updateMany({
      data: { selected: false },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resetting food options:', error);
    return NextResponse.json({ error: 'Failed to reset food options' }, { status: 500 });
  }
} 