/*
  # Fix RLS Policies for Profiles Table

  1. Changes
    - Drop existing policies
    - Create new policies with proper access control
    - Add service role bypass policy
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can read profiles" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update access for users based on id" ON profiles;
DROP POLICY IF EXISTS "Enable full access for service role" ON profiles;
DROP POLICY IF EXISTS "Enable read access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable delete for own profile" ON profiles;

-- Create new policies
CREATE POLICY "Enable read for authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable delete for users based on id"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Add service role bypass policy
CREATE POLICY "Service role bypass"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);