/*
  # Remove Test Account

  1. Changes
    - Remove test user from auth.users
    - Remove associated profile data
    - Clean up any related sessions
  
  2. Security
    - Maintain existing security policies
    - Clean removal of test data
*/

-- Remove test user profile
DELETE FROM public.profiles 
WHERE id = '00000000-0000-0000-0000-000000000000';

-- Remove test user from auth
DELETE FROM auth.users 
WHERE id = '00000000-0000-0000-0000-000000000000';

-- Clean up any related sessions
DELETE FROM auth.sessions 
WHERE user_id = '00000000-0000-0000-0000-000000000000';

-- Remove test admin user
DELETE FROM admin_users 
WHERE auth_id = '00000000-0000-0000-0000-000000000000';