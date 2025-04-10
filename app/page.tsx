"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [postcode, setPostcode] = useState("2000");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState("Evening (5PM - 10PM)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always include all venues in the search for demo purposes
    const params = new URLSearchParams();
    params.append("postcode", postcode);
    params.append("date", date);
    params.append("timeSlot", timeSlot);
    params.append("venues", "nbc");
    params.append("venues", "kbc");
    params.append("venues", "alpha");
    params.append("venues", "other");
    
    // Redirect to search results page
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Sydney Badminton Court Finder</h1>
        </div>
      </header>
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mt-6 mb-4">
              Find and Book Badminton Courts in Sydney
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search through Sydney's best badminton venues to find available courts for your next game
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold mb-6 text-center">Find Available Courts</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode or Suburb
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="e.g. 2000 or Sydney CBD"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    id="timeSlot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="Morning (6AM - 12PM)">Morning (6AM - 12PM)</option>
                    <option value="Afternoon (12PM - 5PM)">Afternoon (12PM - 5PM)</option>
                    <option value="Evening (5PM - 10PM)">Evening (5PM - 10PM)</option>
                  </select>
                </div>

                {/* Search Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Search Available Courts
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Find Local Courts</h3>
                <p className="text-gray-600">Search all badminton courts across Sydney by location</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Check Availability</h3>
                <p className="text-gray-600">See real-time court availability for your preferred date and time</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Book Instantly</h3>
                <p className="text-gray-600">Connect directly to venue booking systems for instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About SydneyShuttle</h3>
              <p className="text-gray-300">
                Sydney's leading badminton court booking platform. Find and book courts at the best venues across Sydney.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Major Venues</h3>
              <ul className="space-y-2 text-gray-300">
                <li>NBC Sydney Olympic Park</li>
                <li>KBC Badminton</li>
                <li>Alpha Badminton Centre</li>
                <li>Sydney University Badminton Club</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@sydneyshuttle.com.au</p>
              <p className="text-gray-300">Phone: (02) 1234 5678</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>© {new Date().getFullYear()} SydneyShuttle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 