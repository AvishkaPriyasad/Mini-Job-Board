'use client';
import { useState, useEffect } from 'react';
import JobForm from '@/components/JobForm';
import DashboardJobs from '@/components/DashboardJobs';

export default function DashboardContent() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(setJobs);
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Create New Job</h2>
        <JobForm onSuccess={() => window.location.reload()} />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Manage Jobs</h2>
        <DashboardJobs jobs={jobs} />
      </section>
    </div>
  );
}