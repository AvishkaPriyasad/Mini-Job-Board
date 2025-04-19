'use client';

export default function DashboardJobs({ jobs, onDelete }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Job Postings</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">{job.title}</h3>
              <button 
                onClick={() => onDelete(job.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}