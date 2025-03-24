/*
  # Create Business Inquiries Table

  1. New Tables
    - `business_inquiries`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `business_type` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `postal_code` (text)
      - `vat_number` (text)
      - `employee_count` (text)
      - `monthly_volume` (text)
      - `services_needed` (text[])
      - `additional_info` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow authenticated users to insert
    - Allow service role full access
*/

-- Create business_inquiries table
CREATE TABLE IF NOT EXISTS business_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  business_type text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  vat_number text NOT NULL,
  employee_count text NOT NULL,
  monthly_volume text NOT NULL,
  services_needed text[] NOT NULL,
  additional_info text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT valid_status CHECK (status IN ('pending', 'contacted', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE business_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users"
  ON business_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for own inquiries"
  ON business_inquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Enable service role access"
  ON business_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER business_inquiries_updated_at
  BEFORE UPDATE ON business_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();