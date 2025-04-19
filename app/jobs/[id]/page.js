import prisma from '@/lib/prisma';

export default async function JobDetailPage({ params }) {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-2">{job.company}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {job.jobType}
          </span>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center text-gray-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
          
          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}