export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <main className="flex flex-col items-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mt-10 mb-6">
          Welcome to the Sydney Badminton Court Finder
        </h1>
        <p className="text-xl mb-8">
          Find and book available badminton courts across Sydney
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/search"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Find Courts Now
          </a>
        </div>
      </main>
    </div>
  );
} 