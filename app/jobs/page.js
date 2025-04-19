import JobCard from "@/components/JobCard";
import prisma from "@/lib/prisma";
import Link from 'next/link';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Current Job Openings</h1>

      {/* Search and Filters */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search jobs..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/2"
        />
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}
