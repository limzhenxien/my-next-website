"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchForm = () => {
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

  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
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
              min={today}
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
  );
};

export default SearchForm; 