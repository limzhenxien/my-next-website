"use client";

import { useState } from "react";

const SearchForm = () => {
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [numPlayers, setNumPlayers] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search for courts and display results
    console.log("Searching for courts with:", { postcode, date, timeSlot, numPlayers });
    alert("Search functionality will be implemented in a future update!");
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <option value="">Select a time slot</option>
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 5PM)</option>
              <option value="evening">Evening (5PM - 10PM)</option>
              <option value="specific">Specific time</option>
            </select>
          </div>

          {/* Number of Players */}
          <div>
            <label htmlFor="numPlayers" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Players
            </label>
            <select
              id="numPlayers"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="1">1 player</option>
              <option value="2">2 players</option>
              <option value="3">3 players</option>
              <option value="4">4 players</option>
              <option value="more">5+ players</option>
            </select>
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Venue Options</label>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2">NBC</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2">KBC</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2">Alpha</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2">Other venues</span>
            </label>
          </div>
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