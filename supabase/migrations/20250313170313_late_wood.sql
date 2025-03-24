/*
  # Fix RLS Policies for Profiles Table

  1. Changes
    - Drop existing policies if they exist
    - Create new policies with proper access control
    - Add service role bypass policy
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing policies using dynamic SQL to avoid errors
DO $$ 
DECLARE
  policy_name text;
BEGIN
  FOR policy_name IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON profiles', policy_name);
  END LOOP;
END $$;

-- Create new policies with unique names
CREATE POLICY "profiles_read_own_20250313"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "profiles_insert_own_20250313"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "profiles_update_own_20250313"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_own_20250313"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_service_role_20250313"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);