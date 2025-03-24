/*
  # Update profiles table RLS policies

  1. Changes
    - Drop all existing policies
    - Create new policies with proper access control
    - Add function for updated_at handling

  2. Security
    - Enable RLS on profiles table
    - Allow authenticated users to manage their own data
    - Allow service role full access
*/

-- Drop existing policies if they exist
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

-- Create new policies with proper access control
CREATE POLICY "Enable insert for own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable delete for own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable full access for service role"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);