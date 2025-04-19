// components/JobFilters.js
'use client';

export default function JobFilters({ filters, setFilters }) {
  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          className="px-4 py-2 rounded border"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
        {/* Add more filters as needed */}
      </div>
    </div>
  );
}