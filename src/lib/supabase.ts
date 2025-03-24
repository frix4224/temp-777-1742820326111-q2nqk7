import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'eazyy.auth.token',
    storage: localStorage,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Add Google OAuth options
    providers: {
      google: {
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      }
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type UserAddress = Database['public']['Tables']['user_addresses']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Item = Database['public']['Tables']['items']['Row'];
export type AdminUser = Database['public']['Tables']['admin_users']['Row'];
export type BusinessInquiry = Database['public']['Tables']['business_inquiries']['Row'];