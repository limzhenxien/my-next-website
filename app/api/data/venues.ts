import { Venue } from '../courts/service';

// Comprehensive collection of badminton venues in Sydney with online booking
export const SYDNEY_VENUES: Venue[] = [
  // NBC (Sydney Olympic Park) - Multiple locations
  {
    id: 101,
    name: "NBC Sydney Olympic Park",
    address: "6 Figtree Drive, Sydney Olympic Park NSW 2127",
    distance: 2.5,
    courts: [],
    image: "/venues/nbc.jpg",
    rating: 4.7,
    reviews: 124,
    bookingUrl: "https://www.nbcsydney.com.au/court-booking",
    description: "Premier badminton facility at Sydney Olympic Park with 12 professional courts, pro shop, and coaching services. Features international-standard courts used for professional tournaments.",
    amenities: ["Air conditioning", "Pro shop", "Parking", "Shower facilities", "Cafe", "Racquet restringing", "Coaching", "Tournaments"],
    openingHours: "Monday-Friday: 6:30AM-11PM, Weekends: 7AM-9PM",
    priceRange: "$20-28 per hour",
    phoneNumber: "(02) 9764 2088",
    website: "https://www.nbcsydney.com.au"
  },
  {
    id: 102,
    name: "NBC Marrickville",
    address: "130 Marrickville Rd, Marrickville NSW 2204",
    distance: 6.3,
    courts: [],
    image: "/venues/nbc-marrickville.jpg",
    rating: 4.5,
    reviews: 87,
    bookingUrl: "https://www.nbcsydney.com.au/marrickville-booking",
    description: "NBC's inner-west location with 8 courts, coaching programs and regular tournaments. Popular with casual players and competitive leagues.",
    amenities: ["Air conditioning", "Pro shop", "Limited parking", "Water dispensers", "Coaching", "Leagues"],
    openingHours: "Monday-Friday: 9AM-10PM, Weekends: 9AM-8PM",
    priceRange: "$18-25 per hour",
    phoneNumber: "(02) 9558 1867",
    website: "https://www.nbcsydney.com.au/marrickville"
  },
  {
    id: 103,
    name: "NBC Artarmon",
    address: "1 Frederick Street, Artarmon NSW 2064",
    distance: 11.2,
    courts: [],
    image: "/venues/nbc-artarmon.jpg",
    rating: 4.3,
    reviews: 56,
    bookingUrl: "https://www.nbcsydney.com.au/artarmon-booking",
    description: "North shore NBC facility with 10 courts and full coaching programs. Great option for northern suburbs residents.",
    amenities: ["Air conditioning", "Street parking", "Water dispensers", "Pro shop", "Coaching"],
    openingHours: "Monday-Friday: 10AM-10PM, Weekends: 9AM-7PM",
    priceRange: "$19-24 per hour",
    phoneNumber: "(02) 9419 5622",
    website: "https://www.nbcsydney.com.au/artarmon"
  },

  // Alpha Badminton Locations
  {
    id: 301,
    name: "Alpha Badminton Centre - Silverwater",
    address: "Unit 47/2 Slough Avenue, Silverwater NSW 2128",
    distance: 6.8,
    courts: [],
    image: "/venues/alpha.jpg",
    rating: 4.5,
    reviews: 67,
    bookingUrl: "https://alphabadminton.yepbooking.com.au/",
    description: "Modern badminton centre in Silverwater with 8 professional courts and coaching programs. Known for its friendly community atmosphere.",
    amenities: ["Air conditioning", "Pro shop", "Free parking", "Water dispensers", "Coaching", "Tournaments"],
    openingHours: "Monday-Friday: 9:30AM-10:30PM, Weekends: 9AM-6PM",
    priceRange: "$18-24 per hour",
    phoneNumber: "(02) 9737 8636",
    website: "https://www.alphabadminton.com.au"
  },
  {
    id: 302,
    name: "Alpha Badminton Centre - Egerton",
    address: "46 Egerton Street, Silverwater NSW 2128",
    distance: 7.1,
    courts: [],
    image: "/venues/alpha-egerton.jpg",
    rating: 4.4,
    reviews: 42,
    bookingUrl: "https://alphabadminton.yepbooking.com.au/",
    description: "Alpha's second Silverwater location with 6 professional courts. Ideal for players looking for less crowded courts during peak hours.",
    amenities: ["Air conditioning", "Street parking", "Vending machines", "Coaching"],
    openingHours: "Monday-Friday: 10AM-10PM, Weekends: 10AM-6PM",
    priceRange: "$17-22 per hour",
    phoneNumber: "(02) 9737 8636",
    website: "https://www.alphabadminton.com.au"
  },

  // KBC Locations
  {
    id: 201,
    name: "KBC NSW - Lidcombe",
    address: "62 Parramatta Road, Lidcombe NSW 2141",
    distance: 5.1,
    courts: [],
    image: "/venues/kbc.jpg",
    rating: 4.2,
    reviews: 89,
    bookingUrl: "https://kbcnsw.yepbooking.com.au/",
    description: "Community-focused badminton venue with competitive pricing and 8 courts. KBC hosts regular tournaments and social events.",
    amenities: ["Air conditioning", "Free parking", "Pro shop", "Water dispensers", "Coaching", "Tournaments"],
    openingHours: "Monday-Friday: 10AM-11PM, Weekends: 9AM-8PM",
    priceRange: "$16-22 per hour",
    phoneNumber: "(02) 9648 7689",
    website: "https://www.kbcnsw.com.au"
  },
  {
    id: 202,
    name: "KBC NSW - Campsie",
    address: "44 Seventh Avenue, Campsie NSW 2194",
    distance: 9.8,
    courts: [],
    image: "/venues/kbc-campsie.jpg",
    rating: 4.0,
    reviews: 46,
    bookingUrl: "https://kbcnsw.yepbooking.com.au/campsie",
    description: "KBC's newest location in Campsie featuring 6 courts. Popular with local community and beginner players.",
    amenities: ["Air conditioning", "Street parking", "Snack machines", "Coaching"],
    openingHours: "Monday-Friday: 11AM-10PM, Weekends: 9AM-7PM",
    priceRange: "$15-20 per hour",
    phoneNumber: "(02) 9718 5422",
    website: "https://www.kbcnsw.com.au/campsie"
  },

  // Other Popular Sydney Venues
  {
    id: 401,
    name: "Sydney University Badminton Club",
    address: "University Sports & Aquatic Centre, Darlington NSW 2008",
    distance: 4.3,
    courts: [],
    image: "/venues/usyd.jpg",
    rating: 4.3,
    reviews: 56,
    bookingUrl: "https://www.susf.com.au/",
    description: "University-based badminton club with multiple courts available for booking. Offers student discounts and competitive leagues.",
    amenities: ["Air conditioning", "Parking (paid)", "Shower facilities", "Gym access available", "Student discounts"],
    openingHours: "Monday-Friday: 7AM-10PM, Weekends: 9AM-5PM",
    priceRange: "$15-22 per hour",
    phoneNumber: "(02) 9351 4960",
    website: "https://www.susf.com.au"
  },
  {
    id: 402,
    name: "SydBad Centre - Marrickville",
    address: "11-13 Meeks Road, Marrickville NSW 2204",
    distance: 8.2,
    courts: [],
    image: "/venues/sydbad.jpg",
    rating: 4.0,
    reviews: 42,
    bookingUrl: "https://www.sydbad.com.au/book-online",
    description: "Casual-friendly venue with 6 courts and flexible booking options. Great for beginners and social players.",
    amenities: ["Air conditioning", "Street parking", "Refreshments", "Beginner-friendly"],
    openingHours: "Monday-Friday: 10AM-9PM, Weekends: 10AM-6PM",
    priceRange: "$16-20 per hour",
    phoneNumber: "(02) 9558 6422",
    website: "https://www.sydbad.com.au"
  },
  {
    id: 403,
    name: "Willoughby Badminton Club",
    address: "Willoughby Leisure Centre, 219 Willoughby Road, Naremburn NSW 2065",
    distance: 13.7,
    courts: [],
    image: "/venues/willoughby.jpg",
    rating: 4.2,
    reviews: 28,
    bookingUrl: "https://www.willoughbybadminton.org.au/court-hire",
    description: "Community club with 5 courts and strong focus on junior development. Great family-friendly environment.",
    amenities: ["Air conditioning", "Free parking", "Water dispensers", "Junior programs"],
    openingHours: "Monday, Wednesday, Friday: 7PM-10PM, Sunday: 2PM-5PM",
    priceRange: "$14-18 per hour",
    phoneNumber: "(02) 9958 5799",
    website: "https://www.willoughbybadminton.org.au"
  },
  {
    id: 404,
    name: "Olympic Park Sports Centre",
    address: "Olympic Boulevard, Sydney Olympic Park NSW 2127",
    distance: 2.8,
    courts: [],
    image: "/venues/olympic-park.jpg",
    rating: 4.5,
    reviews: 38,
    bookingUrl: "https://www.aquaticscentre.com.au/book-online",
    description: "Multi-purpose sports facility with badminton court bookings available. Professional-grade courts in a world-class facility.",
    amenities: ["Air conditioning", "Parking (paid)", "Cafe", "Shower facilities", "Pro shop"],
    openingHours: "Monday-Friday: 6AM-10PM, Weekends: 7AM-7PM",
    priceRange: "$20-25 per hour",
    phoneNumber: "(02) 9714 7600",
    website: "https://www.aquaticscentre.com.au"
  },
  {
    id: 405,
    name: "PCYC Auburn",
    address: "44A Vine Street, Fairfield NSW 2165",
    distance: 14.2,
    courts: [],
    image: "/venues/pcyc.jpg",
    rating: 3.9,
    reviews: 31,
    bookingUrl: "https://www.pcycnsw.org.au/auburn/facilities-hire/",
    description: "Community sports center with badminton courts available for booking. Affordable option with focus on youth programs.",
    amenities: ["Parking", "Water dispensers", "Multi-purpose facility", "Youth programs"],
    openingHours: "Monday-Friday: 8:30AM-9PM, Saturday: 9AM-3PM, Sunday: Closed",
    priceRange: "$12-15 per hour",
    phoneNumber: "(02) 9646 1631",
    website: "https://www.pcycnsw.org.au/auburn"
  },
  {
    id: 406,
    name: "Eastwood Badminton Centre",
    address: "17 Lakeside Road, Eastwood NSW 2122",
    distance: 16.7,
    courts: [],
    image: "/venues/eastwood.jpg",
    rating: 4.1,
    reviews: 47,
    bookingUrl: "https://www.eastwoodbadminton.com.au/bookings",
    description: "Six-court facility in Eastwood with friendly community atmosphere. Popular with local residents and casual players.",
    amenities: ["Air conditioning", "Free parking", "Pro shop", "Snack machines", "Coaching"],
    openingHours: "Monday-Friday: 10AM-10PM, Weekends: 9AM-7PM",
    priceRange: "$16-22 per hour",
    phoneNumber: "(02) 9874 7922",
    website: "https://www.eastwoodbadminton.com.au"
  },
  {
    id: 407,
    name: "UNSW Badminton Club",
    address: "UNSW Fitness & Aquatic Centre, High St, Kensington NSW 2052",
    distance: 8.5,
    courts: [],
    image: "/venues/unsw.jpg",
    rating: 4.0,
    reviews: 23,
    bookingUrl: "https://www.unswbadminton.org.au/court-booking",
    description: "University-based badminton club with courts available for public booking. Student discounts available.",
    amenities: ["Air conditioning", "Parking (paid)", "Water dispensers", "Student discounts"],
    openingHours: "Tuesday, Thursday: 7PM-10PM, Sunday: 1PM-4PM",
    priceRange: "$15-20 per hour",
    phoneNumber: "(02) 9385 4881",
    website: "https://www.unswbadminton.org.au"
  },
  {
    id: 408,
    name: "Homebush Badminton Centre",
    address: "118 Underwood Road, Homebush NSW 2140",
    distance: 7.3,
    courts: [],
    image: "/venues/homebush.jpg", 
    rating: 4.3,
    reviews: 52,
    bookingUrl: "https://www.homebushbadminton.com.au/booking",
    description: "Modern 8-court facility in Homebush with excellent playing conditions and competitive pricing. Popular for casual and league play.",
    amenities: ["Air conditioning", "Free parking", "Cafe", "Pro shop", "Coaching", "Tournaments"],
    openingHours: "Monday-Friday: 9AM-11PM, Weekends: 8AM-9PM",
    priceRange: "$17-24 per hour",
    phoneNumber: "(02) 9764 3088",
    website: "https://www.homebushbadminton.com.au"
  }
];

// Map of venue short codes to venue IDs for easy reference
export const VENUE_CODE_MAP: Record<string, number[]> = {
  nbc: [101, 102, 103],
  kbc: [201, 202],
  alpha: [301, 302],
  other: [401, 402, 403, 404, 405, 406, 407, 408]
};

// Get venue by ID
export const getVenueById = (id: number): Venue | undefined => {
  return SYDNEY_VENUES.find(venue => venue.id === id);
};

// Get venues by venue code (nbc, kbc, alpha, other)
export const getVenuesByCode = (code: string): Venue[] => {
  const venueIds = VENUE_CODE_MAP[code] || [];
  return SYDNEY_VENUES.filter(venue => venueIds.includes(venue.id));
};

// Export the default list for backward compatibility
export default SYDNEY_VENUES; 