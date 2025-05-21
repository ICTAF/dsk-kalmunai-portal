import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Landing from '@/pages/Landing';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import StaffDashboard from '@/components/dashboard/StaffDashboard';
import PublicDashboard from '@/components/dashboard/PublicDashboard';

const Index: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // If the auth is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dsk-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dsk-blue mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, redirect to the appropriate dashboard
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <AdminDashboard />;
    } else if (user.role === 'staff') {
      return <StaffDashboard />;
    } else if (user.role === 'public') {
      return <PublicDashboard />;
    }
  }

  // Otherwise, show the landing page
  return <Landing />;
};

export default Index;
