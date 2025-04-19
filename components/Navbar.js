'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isLoading: true
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        
        if (response.ok) {
          setAuthState({ isLoggedIn: true, isLoading: false });
        } else {
          setAuthState({ isLoggedIn: false, isLoading: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({ isLoggedIn: false, isLoading: false });
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setAuthState({ isLoggedIn: false, isLoading: false });
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (authState.isLoading) {
    return (
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          JobBoard
        </Link>
        
        <div className="flex space-x-4">
          <Link href="/jobs" className="hover:text-blue-600">
            Browse Jobs
          </Link>
          
          {authState.isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}