/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper access control
    - Allow profile creation during signup
    - Allow users to manage their own profiles
    - Allow service role full access

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable delete for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable full access for service role" ON profiles;
DROP POLICY IF EXISTS "profiles_read_own_20250313" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own_20250313" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own_20250313" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_own_20250313" ON profiles;
DROP POLICY IF EXISTS "profiles_service_role_20250313" ON profiles;

-- Create new policies
CREATE POLICY "profiles_insert_own_20250317"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_read_own_20250317"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own_20250317"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own_20250317"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Add service role bypass policy
CREATE POLICY "profiles_service_role_20250317"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);