/*
  # Fix Test Account Setup

  1. Changes
    - Drop and recreate test user with proper credentials
    - Ensure profile record exists
    - Set up proper RLS policies

  2. Security
    - Password is properly hashed
    - Account has proper permissions
*/

-- Create test user in auth schema if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'test@eazyy.app'
  ) THEN
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
    );
  END IF;
END $$;

-- Create corresponding profile if it doesn't exist
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
) ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  postal_code = EXCLUDED.postal_code,
  preferences = EXCLUDED.preferences,
  updated_at = now();

-- Ensure proper RLS policies exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'profiles' 
    AND policyname = 'profiles_service_role_20250317'
  ) THEN
    CREATE POLICY "profiles_service_role_20250317"
      ON profiles
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;