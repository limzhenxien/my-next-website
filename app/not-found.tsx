"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // You can add analytics tracking for 404 errors here
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-6xl font-bold text-gray-800 mt-8 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you are looking for might have been removed or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            href="#contact"
            className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 