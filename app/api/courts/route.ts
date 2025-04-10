import { NextRequest, NextResponse } from 'next/server';
import { fetchAvailableCourts } from './service';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const postcode = searchParams.get('postcode') || undefined;
    const date = searchParams.get('date') || undefined;
    const timeSlot = searchParams.get('timeSlot') || undefined;
    const numPlayers = searchParams.get('numPlayers') || undefined;
    const venues = searchParams.getAll('venues');

    // Fetch data using our service
    const courts = await fetchAvailableCourts({
      postcode,
      date,
      timeSlot,
      numPlayers,
      venues: venues.length > 0 ? venues : undefined
    });

    // Return the results
    return NextResponse.json({
      success: true,
      data: courts
    });
  } catch (error) {
    console.error('Error fetching courts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch court data'
      },
      { status: 500 }
    );
  }
} 