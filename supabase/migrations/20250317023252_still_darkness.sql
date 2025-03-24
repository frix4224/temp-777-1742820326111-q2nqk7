/*
  # Fix Business Inquiries RLS Policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper access control
    - Add service role bypass policy
  
  2. Security
    - Enable RLS on business_inquiries table
    - Allow any authenticated user to insert
    - Allow users to read their own inquiries
    - Allow service role full access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'business_inquiries') THEN
    DROP POLICY IF EXISTS "business_inquiries_insert_20250317" ON business_inquiries;
    DROP POLICY IF EXISTS "business_inquiries_read_20250317" ON business_inquiries;
    DROP POLICY IF EXISTS "business_inquiries_service_role_20250317" ON business_inquiries;
    DROP POLICY IF EXISTS "business_inquiries_insert_20250317_v2" ON business_inquiries;
    DROP POLICY IF EXISTS "business_inquiries_read_20250317_v2" ON business_inquiries;
    DROP POLICY IF EXISTS "business_inquiries_service_role_20250317_v2" ON business_inquiries;
  END IF;
END $$;

-- Create new policies with proper access control
CREATE POLICY "business_inquiries_insert_20250317_v3"
  ON business_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "business_inquiries_read_20250317_v3"
  ON business_inquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "business_inquiries_service_role_20250317_v3"
  ON business_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);