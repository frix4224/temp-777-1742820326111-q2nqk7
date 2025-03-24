/*
  # Update Custom Price Quotes Table

  1. Changes
    - Drop and recreate table with user_id column
    - Update RLS policies
    - Add proper indexes
  
  2. Security
    - Enable RLS
    - Allow users to only see their own quotes
    - Allow service role full access
*/

-- Drop existing table and related objects
DROP TABLE IF EXISTS custom_price_quotes CASCADE;

-- Create custom_price_quotes table
CREATE TABLE custom_price_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  item_name text NOT NULL,
  description text NOT NULL,
  image_url text[],
  suggested_price numeric(10,2),
  status text NOT NULL DEFAULT 'pending',
  urgency text NOT NULL DEFAULT 'standard',
  created_at timestamptz DEFAULT now(),

  CONSTRAINT valid_status CHECK (status IN ('pending', 'quoted', 'accepted', 'declined')),
  CONSTRAINT valid_urgency CHECK (urgency IN ('standard', 'express'))
);

-- Enable RLS
ALTER TABLE custom_price_quotes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'custom_price_quotes') THEN
    DROP POLICY IF EXISTS "quotes_read_own_20250323" ON custom_price_quotes;
    DROP POLICY IF EXISTS "quotes_insert_own_20250323" ON custom_price_quotes;
    DROP POLICY IF EXISTS "quotes_service_role_20250323" ON custom_price_quotes;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "quotes_read_own_20250323"
  ON custom_price_quotes
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "quotes_insert_own_20250323"
  ON custom_price_quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "quotes_service_role_20250323"
  ON custom_price_quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_custom_price_quotes_user_id ON custom_price_quotes(user_id);
CREATE INDEX idx_custom_price_quotes_status ON custom_price_quotes(status);
CREATE INDEX idx_custom_price_quotes_created_at ON custom_price_quotes(created_at DESC);