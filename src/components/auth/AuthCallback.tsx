import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get returnTo path from localStorage if it exists
      const returnTo = localStorage.getItem('returnTo');
      const orderData = localStorage.getItem('orderData');
      
      // Clear stored paths
      localStorage.removeItem('returnTo');
      localStorage.removeItem('orderData');

      // Handle auth state change
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
        return;
      }

      if (session) {
        // If we have order data, return to the order flow
        if (orderData && returnTo) {
          navigate(returnTo, { state: JSON.parse(orderData) });
        } else {
          // Otherwise go to homepage
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;