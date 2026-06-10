import React from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, fallback: FallbackComponent }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0c0f14] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && FallbackComponent) {
    return <FallbackComponent />;
  }

  return children;
};