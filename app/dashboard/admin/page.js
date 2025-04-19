'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    jobType: 'Full-time',
    published: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch jobs and verify admin status
  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {
        try {
          if (session.user.role !== 'ADMIN') {
            router.push('/dashboard');
            return;
          }

          const res = await fetch('/api/jobs');
          if (!res.ok) throw new Error('Failed to fetch jobs');
          const data = await res.json();
          setJobs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        router.push('/auth/login');
      }
    };

    fetchData();
  }, [session, status, router]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newJob,
          userId: session?.user?.id
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || result.error || 'Failed to create job');
      }

      setSuccess(true);
      // Refresh job list
      const updatedRes = await fetch('/api/jobs');
      const updatedJobs = await updatedRes.json();
      setJobs(updatedJobs);
      
      // Reset form
      setNewJob({
        title: '',
        company: '',
        location: '',
        description: '',
        jobType: 'Full-time',
        published: true
      });
    } catch (err) {
      console.error('Job creation failed:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete job');
      }

      // Optimistic update
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Deletion error:', err);
      setError(err.message);
      // Re-fetch to ensure sync with server
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          Job created successfully!
        </div>
      )}

      {/* Add Job Form */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Job</h2>
        <form onSubmit={handleAddJob} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
              <input
                type="text"
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
              <select
                name="jobType"
                value={newJob.jobType}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </section>

      {/* Manage Jobs Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Jobs ({jobs.length})</h2>
        
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found</p>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                    <p className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mt-1">
                      {job.jobType}
                    </p>
                    <p className="mt-2 text-gray-700">{job.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Created: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    disabled={isLoading}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm disabled:opacity-50 ml-4"
                    aria-label={`Delete ${job.title} position`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}