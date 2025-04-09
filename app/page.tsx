import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white pt-28">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Sydney Badminton Court Finder</h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Find and book available badminton courts across Sydney in just a few clicks
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#search"
            className="px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Find Courts Now
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Find Available Courts</h2>
          <SearchForm />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Location & Time</h3>
              <p className="text-gray-600">Enter your postcode or suburb and preferred date and time slot for playing.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Options</h3>
              <p className="text-gray-600">View available courts from different venues like NBC, KBC, and Alpha in one place.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-white">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Play</h3>
              <p className="text-gray-600">Select your preferred venue, book your court, and get ready to play!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Partner Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NBC */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">NBC</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">NBC Badminton Centre</h3>
              <p className="text-gray-600 mb-4">Premium courts with professional facilities across multiple Sydney locations.</p>
              <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">12 Locations</span>
            </div>
            
            {/* KBC */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">KBC</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">KBC Badminton</h3>
              <p className="text-gray-600 mb-4">Community-focused badminton venues with competitive pricing and friendly atmosphere.</p>
              <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">8 Locations</span>
            </div>
            
            {/* Alpha */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">Alpha</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Alpha Badminton Club</h3>
              <p className="text-gray-600 mb-4">High-quality courts with coaching services and tournament facilities.</p>
              <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">5 Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah L.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"This site saved me so much time! I used to call multiple venues to check availability, but now I can see everything at once. Booked a court at NBC in under 2 minutes!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"As someone who plays badminton twice a week, this website has been a game-changer. I can quickly compare prices across different venues and find the best deal."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Court?</h2>
          <p className="text-xl mb-8">Join thousands of badminton players in Sydney who use our platform to find and book courts.</p>
          <a
            href="#search"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            Search Courts Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
