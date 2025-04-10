"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Venue } from "../api/courts/service";
import SYDNEY_VENUES, { VENUE_CODE_MAP } from "../api/data/venues";

// Filter venues function - using the expanded venue dataset
const filterVenues = (selectedVenues: string[]): Venue[] => {
  if (!selectedVenues || selectedVenues.length === 0) {
    return SYDNEY_VENUES;
  }
  
  const allowedIds = selectedVenues.flatMap(venue => VENUE_CODE_MAP[venue] || []);
  if (allowedIds.length === 0) {
    return SYDNEY_VENUES;
  }
  
  return SYDNEY_VENUES.filter(venue => allowedIds.includes(venue.id));
};

// Function to populate courts for venues
const populateCourtsForVenue = (venue: Venue, timeSlot?: string): Venue => {
  if (venue.courts && venue.courts.length > 0) {
    return venue; // Already has courts data
  }
  
  // Base court times based on venue's opening hours
  let courtTimes = [];
  
  // Morning times
  courtTimes.push({ time: "9:00 AM", price: Math.floor(18 + Math.random() * 5) });
  courtTimes.push({ time: "10:00 AM", price: Math.floor(18 + Math.random() * 5) });
  courtTimes.push({ time: "11:00 AM", price: Math.floor(18 + Math.random() * 5) });
  
  // Afternoon times
  courtTimes.push({ time: "12:00 PM", price: Math.floor(15 + Math.random() * 5) });
  courtTimes.push({ time: "1:00 PM", price: Math.floor(15 + Math.random() * 5) });
  courtTimes.push({ time: "2:00 PM", price: Math.floor(15 + Math.random() * 5) });
  courtTimes.push({ time: "3:00 PM", price: Math.floor(15 + Math.random() * 5) });
  
  // Evening times (higher prices)
  courtTimes.push({ time: "5:00 PM", price: Math.floor(20 + Math.random() * 5) });
  courtTimes.push({ time: "6:00 PM", price: Math.floor(20 + Math.random() * 5) });
  courtTimes.push({ time: "7:00 PM", price: Math.floor(20 + Math.random() * 5) });
  courtTimes.push({ time: "8:00 PM", price: Math.floor(20 + Math.random() * 5) });
  
  // Filter by time slot if needed
  if (timeSlot) {
    const timeRanges: Record<string, [number, number]> = {
      "Morning (6AM - 12PM)": [6, 12],
      "Afternoon (12PM - 5PM)": [12, 17],
      "Evening (5PM - 10PM)": [17, 22]
    };
    
    const range = timeRanges[timeSlot];
    if (range) {
      courtTimes = courtTimes.filter(court => {
        const hourMatch = court.time.match(/(\d+):00/);
        if (!hourMatch) return false;
        
        let hour = parseInt(hourMatch[1]);
        if (court.time.includes("PM") && hour !== 12) hour += 12;
        if (court.time.includes("AM") && hour === 12) hour = 0;
        
        return hour >= range[0] && hour < range[1];
      });
    }
  }
  
  // Generate courts with random availability
  const courts = courtTimes.map((court, index) => {
    return {
      id: venue.id * 100 + index + 1,
      time: court.time,
      price: court.price,
      // Randomly set some courts as unavailable (20-30% chance)
      available: Math.random() > (0.2 + (Math.random() * 0.1))
    };
  });
  
  return {
    ...venue,
    courts
  };
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("distance");
  const [error, setError] = useState<string | null>(null);
  
  // Get search parameters
  const postcode = searchParams.get("postcode");
  const date = searchParams.get("date");
  const timeSlot = searchParams.get("timeSlot");
  const venueParams = searchParams.getAll("venues");
  
  // Memoize the data fetch function to prevent unnecessary recalculations
  const fetchVenueData = useCallback(() => {
    try {
      // Get venue data directly from our dataset
      const filteredVenues = filterVenues(venueParams);
      
      // Add court data to each venue
      return filteredVenues.map(venue => 
        populateCourtsForVenue(venue, timeSlot || undefined)
      );
    } catch (err) {
      console.error("Error processing venue data:", err);
      setError("Failed to process venue data. Please try again.");
      return [];
    }
  }, [timeSlot, venueParams]);
  
  // Load venue data on mount or when search params change
  useEffect(() => {
    // Mark as loading
    setLoading(true);
    setError(null);
    
    // Preload the data so it's ready when timeout completes
    const venueData = fetchVenueData();
    
    // Use a timeout to show the loading state for a brief period
    const timer = setTimeout(() => {
      setVenues(venueData);
      setLoading(false);
    }, 800);
    
    // Cleanup
    return () => clearTimeout(timer);
  }, [fetchVenueData, searchParams]);
  
  // Sort venues
  const sortedVenues = venues.sort((a, b) => {
    if (sortBy === "distance") {
      return a.distance - b.distance;
    } else if (sortBy === "price") {
      const aMinPrice = Math.min(...a.courts.filter(c => c.available).map(c => c.price));
      const bMinPrice = Math.min(...b.courts.filter(c => c.available).map(c => c.price));
      return aMinPrice - bMinPrice;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold">Sydney Badminton Court Finder</Link>
          <Link href="/" className="text-sm hover:underline">« Back to Home</Link>
        </div>
      </header>
      
      <main className="flex-grow p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Search Results Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Available Courts</h1>
                <p className="text-gray-600">
                  {date ? new Date(date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Any date'} 
                  {timeSlot ? ` • ${timeSlot}` : ''} 
                  {postcode ? ` • Near ${postcode}` : ''}
                </p>
                <p className="text-yellow-600 text-sm mt-2">
                  Note: Using demonstration data. In a real app, we would connect to venue booking systems.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Modify Search
                </Link>
              </div>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center">
              <span className="text-gray-700 mr-3">Sort by:</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSortBy('distance')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'distance' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Nearest
                </button>
                <button 
                  onClick={() => setSortBy('price')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'price' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Price (low to high)
                </button>
                <button 
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Rating
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for available courts...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Link 
                href="/" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try a Different Search
              </Link>
            </div>
          )}

          {/* Empty Results */}
          {!loading && !error && sortedVenues.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">No courts available for your search criteria.</p>
              <Link 
                href="/" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try a Different Search
              </Link>
            </div>
          )}

          {/* Results List */}
          {!loading && !error && sortedVenues.length > 0 && (
            <div className="space-y-6">
              {sortedVenues.map((venue) => (
                <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      {/* Venue Info */}
                      <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                        <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
                        <p className="text-gray-600 mb-2">{venue.address}</p>
                        <p className="text-gray-600 mb-4">{venue.distance.toFixed(1)} km away</p>
                        <div className="flex items-center mb-4">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>{venue.rating} ({venue.reviews} reviews)</span>
                        </div>
                        <Link 
                          href={`/venues/${venue.id}`} 
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View venue details
                        </Link>
                      </div>
                      
                      {/* Court Availability */}
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold mb-3">Available Courts</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {venue.courts.slice(0, 6).map((court) => (
                            <div 
                              key={court.id} 
                              className={`p-3 border rounded-lg text-center ${court.available ? 'border-gray-200 hover:border-blue-400 cursor-pointer' : 'bg-gray-100 border-gray-200 opacity-60'}`}
                            >
                              <p className="font-medium mb-1">{court.time}</p>
                              <p className={`text-lg ${court.available ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                                ${court.price}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {court.available ? 'Available' : 'Booked'}
                              </p>
                            </div>
                          ))}
                        </div>
                        
                        {venue.courts.length > 6 && (
                          <div className="mt-4 text-center">
                            <Link 
                              href={`/venues/${venue.id}`} 
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Show all available times
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} SydneyShuttle. All rights reserved.</p>
      </footer>
    </div>
  );
} 