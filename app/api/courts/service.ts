// This file simulates an API service that would fetch data from venue websites
import '../utils/init'; // Initialize API services
import { getVenueCourtData } from '../utils/scheduler';
import { generateCacheKey, getCachedData, setCachedData } from '../utils/cache';
import SYDNEY_VENUES, { VENUE_CODE_MAP, getVenueById } from '../data/venues';

// Types
export interface Court {
  id: number;
  time: string;
  price: number;
  available: boolean;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  distance: number;
  courts: Court[];
  image: string;
  rating: number;
  reviews: number;
  bookingUrl?: string;
  description?: string;
  amenities?: string[];
  openingHours?: string;
  priceRange?: string;
  phoneNumber?: string;
  website?: string;
}

// Real venue API endpoints
const VENUE_APIS = {
  alpha: {
    url: "https://alphabadminton.yepbooking.com.au/",
    name: "Alpha Badminton Centre",
    address: "Unit 47/2 Slough Avenue, Silverwater 2128",
    // Secondary location: 46 Egerton Street, Silverwater 2128
  },
  kbc: {
    url: "https://kbcnsw.yepbooking.com.au/",
    name: "KBC NSW",
    address: "Sydney, NSW",
    contactEmail: "raymond@kbcnsw.com.au",
  }
};

// Simulate courts data for each venue if not available
// This function populates court data for venues that don't have it
const populateCourtsForVenue = (venue: Venue, date?: string, timeSlot?: string): Venue => {
  if (venue.courts.length > 0) {
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
  const courts: Court[] = courtTimes.map((court, index) => {
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

// Simulated API functions
export async function fetchAvailableCourts(
  params: {
    postcode?: string;
    date?: string;
    timeSlot?: string;
    numPlayers?: string;
    venues?: string[];
  }
): Promise<Venue[]> {
  try {
    // Check if we have cached results for this query
    const cacheKey = generateCacheKey(params);
    const cachedVenues = getCachedData<Venue[]>(cacheKey);
    
    if (cachedVenues) {
      console.log('Returning cached venue data');
      return cachedVenues;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get venues from our comprehensive list
    let filteredVenues: Venue[] = [];
    
    // Filter by venue types if specified
    if (params.venues && params.venues.length > 0) {
      const allowedIds: number[] = [];
      
      params.venues.forEach(venueCode => {
        const venueIds = VENUE_CODE_MAP[venueCode] || [];
        allowedIds.push(...venueIds);
      });
      
      if (allowedIds.length > 0) {
        filteredVenues = SYDNEY_VENUES.filter(venue => allowedIds.includes(venue.id));
      } else {
        filteredVenues = [...SYDNEY_VENUES];
      }
    } else {
      filteredVenues = [...SYDNEY_VENUES];
    }
    
    // If we have real data for the requested date, use it
    if (params.date) {
      // Try to get real-time court data for venues
      try {
        // Alpha Badminton
        const alphaCourts = await getVenueCourtData('alpha', params.date);
        if (alphaCourts.length > 0) {
          // Update the Alpha venues with real-time data
          filteredVenues.forEach(venue => {
            if (venue.id === 301 || venue.id === 302) {
              venue.courts = alphaCourts;
              console.log(`Updated Alpha venue ${venue.id} with real-time data`);
            }
          });
        }
        
        // KBC
        const kbcCourts = await getVenueCourtData('kbc', params.date);
        if (kbcCourts.length > 0) {
          // Update the KBC venue with real-time data
          const kbcVenue = filteredVenues.find(v => v.id === 201);
          if (kbcVenue) {
            kbcVenue.courts = kbcCourts;
            console.log('Updated KBC venue with real-time data');
          }
        }
        
        // NBC - Multiple locations
        const nbcCourts = await getVenueCourtData('nbc', params.date);
        if (nbcCourts.length > 0) {
          // Update the NBC venues with real-time data
          filteredVenues.forEach(venue => {
            if (venue.id >= 101 && venue.id <= 103) {
              venue.courts = nbcCourts;
              console.log(`Updated NBC venue ${venue.id} with real-time data`);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching real-time court data:', error);
        // Continue with simulated data on error
      }
    }
    
    // Populate courts data for each venue if not available
    filteredVenues = filteredVenues.map(venue => 
      populateCourtsForVenue(venue, params.date, params.timeSlot)
    );
    
    // Filter by time slot
    if (params.timeSlot) {
      const timeRanges: Record<string, [number, number]> = {
        "Morning (6AM - 12PM)": [6, 12],
        "Afternoon (12PM - 5PM)": [12, 17],
        "Evening (5PM - 10PM)": [17, 22]
      };
      
      const range = timeRanges[params.timeSlot];
      if (range) {
        filteredVenues = filteredVenues.map(venue => {
          const filteredCourts = venue.courts.filter(court => {
            const hourMatch = court.time.match(/(\d+):00/);
            if (!hourMatch) return false;
            
            let hour = parseInt(hourMatch[1]);
            if (court.time.includes("PM") && hour !== 12) hour += 12;
            if (court.time.includes("AM") && hour === 12) hour = 0;
            
            return hour >= range[0] && hour < range[1];
          });
          
          return { ...venue, courts: filteredCourts };
        });
      }
    }
    
    // Filter out venues with no available courts in the time slot
    filteredVenues = filteredVenues.filter(venue => venue.courts.length > 0);
    
    // Sort by distance by default
    filteredVenues.sort((a, b) => a.distance - b.distance);
    
    // Cache the results for 30 minutes
    setCachedData<Venue[]>(cacheKey, filteredVenues, 1800);
    
    return filteredVenues;
  } catch (error) {
    console.error('Error fetching courts:', error);
    // Return some basic data as fallback
    return SYDNEY_VENUES.slice(0, 3).map(venue => 
      populateCourtsForVenue(venue)
    );
  }
}

// Get a specific venue by ID
export async function fetchVenueById(id: number): Promise<Venue | null> {
  try {
    // Try to get from cache first
    const cacheKey = `venue_${id}`;
    const cachedVenue = getCachedData<Venue>(cacheKey);
    
    if (cachedVenue) {
      return cachedVenue;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find venue in our comprehensive list
    const venue = getVenueById(id);
    
    if (!venue) {
      return null;
    }
    
    // If the venue has no courts data, populate it
    const venueWithCourts = populateCourtsForVenue(venue);
    
    // Cache the venue data for 1 hour
    setCachedData<Venue>(cacheKey, venueWithCourts, 3600);
    
    return venueWithCourts;
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    return null;
  }
}

// In a real implementation, these functions would make actual API calls to the venues

// YepBooking API integration (would be implemented in a production environment)
// This is a placeholder for a real implementation
async function fetchYepBookingData(venueUrl: string, date: string): Promise<Court[]> {
  try {
    // In a real implementation:
    // 1. We would need to authenticate with the YepBooking API
    // 2. Make a proper API request to fetch available courts
    // 3. Parse the response into our Court format
    console.log(`Would fetch data from ${venueUrl} for date: ${date}`);
    
    // For now, we return mock data
    return [];
  } catch (error) {
    console.error(`Error fetching data from ${venueUrl}:`, error);
    return [];
  }
}

// Specialized venue functions

// Alpha Badminton API client
async function fetchAlphaCourts(date: string, location: string) {
  console.log("Fetching Alpha courts for", date, location);
  console.log(`Would make a real API call to ${VENUE_APIS.alpha.url}`);
  
  // For a real implementation we'd call:
  // return await fetchYepBookingData(VENUE_APIS.alpha.url, date);
  
  // For now use our mock data
  return SYDNEY_VENUES.find(v => v.id === 3)?.courts || [];
}

// KBC API client
async function fetchKBCCourts(date: string, location: string) {
  console.log("Fetching KBC courts for", date, location);
  console.log(`Would make a real API call to ${VENUE_APIS.kbc.url}`);
  
  // For a real implementation we'd call:
  // return await fetchYepBookingData(VENUE_APIS.kbc.url, date);
  
  // For now use our mock data
  return SYDNEY_VENUES.find(v => v.id === 2)?.courts || [];
} 