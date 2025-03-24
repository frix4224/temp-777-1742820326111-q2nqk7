/*
  # Update profiles table and policies

  1. Changes
    - Drop and recreate profiles table
    - Update RLS policies
    - Add proper constraints and triggers
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles') THEN
    DROP POLICY IF EXISTS "profiles_insert_own_20250317" ON profiles;
    DROP POLICY IF EXISTS "profiles_read_own_20250317" ON profiles;
    DROP POLICY IF EXISTS "profiles_update_own_20250317" ON profiles;
    DROP POLICY IF EXISTS "profiles_delete_own_20250317" ON profiles;
    DROP POLICY IF EXISTS "profiles_service_role_20250317" ON profiles;
  END IF;
END $$;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;

-- Drop and recreate the table
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  postal_code text,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "profiles_insert_own_20250320"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_read_own_20250320"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own_20250320"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own_20250320"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Add service role bypass policy
CREATE POLICY "profiles_service_role_20250320"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert test profile if it doesn't exist
INSERT INTO profiles (
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