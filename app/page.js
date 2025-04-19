import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Find Your Dream Job Today
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Browse through hundreds of job listings from top companies around the world.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
          <Link
            href="/auth/signup"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}