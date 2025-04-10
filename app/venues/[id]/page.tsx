"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Venue, fetchVenueById } from "../../api/courts/service";
import { getVenueById } from "../../api/data/venues";
import React from "react";

// Venue booking URLs
const VENUE_URLS = {
  nbc: "https://www.nbcsydney.com.au/court-booking",
  kbc: "https://kbcnsw.yepbooking.com.au/",
  alpha: "https://alphabadminton.yepbooking.com.au/"
};

// Move venueDetails outside the component to avoid re-creation on each render
const venueDetails = {
  facilities: [
    "Air conditioning", 
    "Pro shop", 
    "Parking", 
    "Changing rooms", 
    "Showers", 
    "Lounge area"
  ],
  courtTypes: [
    "Professional courts", 
    "BWF standard mats", 
    "LED lighting"
  ],
  photos: [
    "/venues/court1.jpg",
    "/venues/court2.jpg",
    "/venues/court3.jpg"
  ]
};

// Fallback venue data - moved outside component
const fallbackVenues = {
  "1": {
    id: 1,
    name: "NBC Sydney Olympic Park",
    address: "Sydney Olympic Park, NSW 2127",
    distance: 2.5,
    courts: [
      { id: 101, time: "9:00 AM", price: 22, available: true },
      { id: 102, time: "10:00 AM", price: 22, available: true },
      { id: 103, time: "11:00 AM", price: 22, available: true },
      { id: 104, time: "12:00 PM", price: 18, available: true },
      { id: 105, time: "1:00 PM", price: 18, available: true },
      { id: 106, time: "2:00 PM", price: 18, available: false },
    ],
    image: "/venues/nbc.jpg",
    rating: 4.7,
    reviews: 124,
    openingHours: "Monday-Friday: 6:30AM-11PM\nWeekends: 7AM-9PM",
    amenities: ["Air conditioning", "Pro shop", "Parking", "Shower facilities", "Cafe"],
    description: "Premier badminton facility at Sydney Olympic Park with 12 professional courts, pro shop, and coaching services."
  },
  "2": {
    id: 2,
    name: "KBC NSW",
    address: "Sydney, NSW",
    distance: 5.1,
    courts: [
      { id: 201, time: "9:00 AM", price: 16, available: true },
      { id: 202, time: "10:00 AM", price: 16, available: false },
      { id: 203, time: "11:00 AM", price: 16, available: true },
      { id: 204, time: "12:00 PM", price: 20, available: true },
      { id: 205, time: "1:00 PM", price: 20, available: true },
      { id: 206, time: "6:00 PM", price: 24, available: false },
    ],
    image: "/venues/kbc.jpg",
    rating: 4.2,
    reviews: 89
  },
  "3": {
    id: 3,
    name: "Alpha Badminton Centre",
    address: "Unit 47/2 Slough Avenue, Silverwater 2128",
    distance: 6.8,
    courts: [
      { id: 301, time: "10:00 AM", price: 19, available: false },
      { id: 302, time: "11:00 AM", price: 19, available: true },
      { id: 303, time: "12:00 PM", price: 19, available: true },
      { id: 304, time: "1:00 PM", price: 19, available: true },
      { id: 305, time: "6:00 PM", price: 24, available: false },
    ],
    image: "/venues/alpha.jpg",
    rating: 4.5,
    reviews: 67
  }
};

// Get the booking URL for the current venue
function getBookingUrl(id: string): string | null {
  if (id === "101" || id === "102" || id === "103") return VENUE_URLS.nbc;
  if (id === "201") return VENUE_URLS.kbc;
  if (id === "301" || id === "302") return VENUE_URLS.alpha;
  return null;
}

export default function VenueDetails() {
  const params = useParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  // Get the venue ID from the route parameters
  const venueId = params?.id?.toString() || "";

  // useEffect for loading the venue data - with proper cleanup and error handling
  useEffect(() => {
    let isActive = true; // Track if the component is still mounted
    
    const loadVenueData = async () => {
      try {
        if (isActive) {
          setLoading(true);
          setError(null);
        }
        
        // Simulate API delay (make the loading experience better than instant)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!isActive) return; // Don't update state if component unmounted
        
        // Convert venue ID to number
        const venueIdNum = parseInt(venueId);
        
        if (isNaN(venueIdNum)) {
          throw new Error("Invalid venue ID");
        }
        
        // Get venue data from our expanded dataset
        const venueData = getVenueById(venueIdNum);
        
        if (isActive) {
          if (venueData) {
            setVenue(venueData);
          } else {
            setError("Venue not found");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading venue:", error);
        if (isActive) {
          setError("Could not load venue details");
          setLoading(false);
        }
      }
    };
    
    // Load the venue data
    loadVenueData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isActive = false;
    };
  }, [venueId, selectedDate]);
  
  // Get booking URL
  const bookingUrl = React.useMemo(() => {
    return venue?.bookingUrl || null;
  }, [venue]);
  
  // Format the date for display
  const formattedDate = selectedDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading venue details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error handling
  if (error || !venue) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 mb-4">{error || "Venue not found"}</p>
            <Link 
              href="/#search" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Search
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Normal render with venue data
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Search Results
            </button>
          </div>
          
          {/* Venue Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
                <p className="text-gray-600 mb-2">{venue.address}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{venue.rating} ({venue.reviews} reviews)</span>
                  <span className="mx-2">•</span>
                  <span>{venue.distance.toFixed(1)} km away</span>
                </div>
                
                {venue.priceRange && (
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Price:</span> {venue.priceRange}
                  </p>
                )}
                
                {venue.phoneNumber && (
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Phone:</span> {venue.phoneNumber}
                  </p>
                )}
                
                {venue.website && (
                  <p className="text-gray-700 mb-2">
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      Visit website
                    </a>
                  </p>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Now at {venue.name}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Venue Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="relative h-64 md:h-96">
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              <Image 
                src={venue.image || '/venues/placeholder.jpg'}
                alt={venue.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          
          {/* Venue Information in Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About {venue.name}</h2>
                <p className="text-gray-700">{venue.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Amenities */}
                {venue.amenities && venue.amenities.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {venue.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Opening Hours */}
                {venue.openingHours && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                    <div className="text-gray-700 whitespace-pre-line">
                      {venue.openingHours}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Available Courts */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Available Courts for {formattedDate}</h2>
            
            {/* Date Selector */}
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input 
                type="date" 
                id="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setSelectedDate(date);
                }}
                min={new Date().toISOString().split('T')[0]}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Courts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {venue.courts && venue.courts.map((court) => (
                <div 
                  key={court.id}
                  className={`p-4 border rounded-lg ${court.available 
                    ? 'border-gray-200 hover:border-blue-400 cursor-pointer' 
                    : 'bg-gray-100 border-gray-200 opacity-70'}`}
                >
                  <p className="font-medium mb-1">{court.time}</p>
                  <p className={`text-xl ${court.available ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                    ${court.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {court.available ? 'Available' : 'Booked'}
                  </p>
                  {court.available && bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-center text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Book
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            {/* Empty state */}
            {(!venue.courts || venue.courts.length === 0) && (
              <div className="text-center p-8">
                <p className="text-gray-600 mb-4">No court availability information for this date.</p>
                <p className="text-gray-600">Please try another date or visit the venue website for booking.</p>
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Visit Booking Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 