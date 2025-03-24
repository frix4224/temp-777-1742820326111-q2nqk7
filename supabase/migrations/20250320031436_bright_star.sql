/*
  # Create Business Inquiries Table

  1. New Table
    - `business_inquiries`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `business_type` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text)
      - `additional_info` (text)
      - `requirements` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow authenticated users to insert
    - Allow service role full access
*/

-- Drop existing table and related objects if they exist
DROP TABLE IF EXISTS business_inquiries CASCADE;

-- Create business_inquiries table
CREATE TABLE business_inquiries (
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

-- Create policies
CREATE POLICY "business_inquiries_insert_20250320"
  ON business_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "business_inquiries_read_own_20250320"
  ON business_inquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "business_inquiries_service_role_20250320"
  ON business_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at if handle_updated_at function exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at'
  ) THEN
    DROP TRIGGER IF EXISTS business_inquiries_updated_at ON business_inquiries;
    CREATE TRIGGER business_inquiries_updated_at
      BEFORE UPDATE ON business_inquiries
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;