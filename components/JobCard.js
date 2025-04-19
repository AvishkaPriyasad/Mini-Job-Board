'use client';
import { useRouter } from 'next/navigation';

export default function JobCard({ job }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div 
      className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.user?.name || job.company}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${
          job.jobType === 'Full-time' ? 'bg-blue-100 text-blue-800' :
          job.jobType === 'Part-time' ? 'bg-green-100 text-green-800' :
          job.jobType === 'Contract' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {job.jobType}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center text-gray-500 mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
        
        <p className="text-gray-700 line-clamp-3">{job.description}</p>
      </div>
      
      <button
        onClick={handleDetailsClick}
        className="mt-4 inline-block text-blue-600 hover:underline text-sm"
      >
        View Details
      </button>
    </div>
  );
}