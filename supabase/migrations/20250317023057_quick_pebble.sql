/*
  # Update Business Inquiries Table and Policies

  1. Changes
    - Drop existing policies if they exist
    - Create new policies with proper access control
    - Add function for updated_at handling

  2. Security
    - Enable RLS on business_inquiries table
    - Allow authenticated users to insert
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
  END IF;
END $$;

-- Create business_inquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS business_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  business_type text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  additional_info text,
  requirements jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT valid_status CHECK (status IN ('pending', 'contacted', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE business_inquiries ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "business_inquiries_insert_20250317_v2"
  ON business_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "business_inquiries_read_20250317_v2"
  ON business_inquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "business_inquiries_service_role_20250317_v2"
  ON business_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'business_inquiries_updated_at') THEN
    CREATE TRIGGER business_inquiries_updated_at
      BEFORE UPDATE ON business_inquiries
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;

-- Add table comment
COMMENT ON TABLE business_inquiries IS 'Stores business registration requests with detailed service requirements';

-- Add column comments
COMMENT ON COLUMN business_inquiries.requirements IS 'JSON object containing service-specific requirements including frequency, volume, and specifications';