import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, options?: { data?: any }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    mounted.current = true;

    // Clear any existing auth data on mount
    localStorage.removeItem('eazyy.auth.token');
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('returnTo');
    localStorage.removeItem('orderData');
    
    // Sign out on mount to ensure clean state
    supabase.auth.signOut().then(() => {
      if (mounted.current) {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted.current) {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
          
          // Clear any stored auth data
          localStorage.removeItem('eazyy.auth.token');
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('returnTo');
          localStorage.removeItem('orderData');
        }
        setLoading(false);
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (mounted.current && data) {
        console.log('Profile fetched:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Clear any existing auth data
      localStorage.removeItem('eazyy.auth.token');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('returnTo');
      localStorage.removeItem('orderData');
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      if (error) throw error;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;

      // Store return path and order data if they exist
      const returnTo = localStorage.getItem('returnTo');
      const orderData = localStorage.getItem('orderData');
      
      if (returnTo) {
        localStorage.setItem('returnTo', returnTo);
        if (orderData) {
          localStorage.setItem('orderData', orderData);
        }
      }

    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, options?: { data?: any }) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options?.data,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) throw signUpError;

      // If signup successful, create profile
      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: signUpData.user.id,
            first_name: options?.data?.first_name,
            last_name: options?.data?.last_name,
            phone: options?.data?.phone
          }])
          .select()
          .single();

        if (profileError) throw profileError;

        // Sign in the user immediately
        await signIn(email, password);
      }
    } catch (error: any) {
      if (error.message === 'over_email_send_rate_limit') {
        throw new Error('Please wait a moment before trying again');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clear all auth-related data
      localStorage.removeItem('eazyy.auth.token');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('returnTo');
      localStorage.removeItem('orderData');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user and profile state
      setUser(null);
      setProfile(null);
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;

    // Refresh profile
    await fetchProfile(user.id);
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};