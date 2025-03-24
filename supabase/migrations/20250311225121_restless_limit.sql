/*
  # Create test account

  1. Changes
    - Insert test user into auth.users
    - Create corresponding profile record
    - Add secure but memorable credentials

  2. Security
    - Test account has same RLS restrictions as normal users
    - Password is hashed properly
*/

-- Create test user in auth schema
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'test@eazyy.app',
  crypt('test123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create corresponding profile
INSERT INTO public.profiles (
  id,
  first_name,
  last_name,
  phone,
  address,
  city,
  postal_code,
  preferences,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Test',
  'User',
  '+31612345678',
  'Teststraat 123',
  'Amsterdam',
  '1234AB',
  '{"notifications":{"email":true,"push":true,"sms":false},"theme":"light","language":"en"}',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;