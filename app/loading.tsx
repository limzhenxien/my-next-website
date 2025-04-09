export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
} 