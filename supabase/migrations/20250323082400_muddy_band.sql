/*
  # Fix Custom Price Quotes RLS Policies

  1. Changes
    - Drop and recreate custom_price_quotes table
    - Add proper RLS policies
    - Add indexes for performance
  
  2. Security
    - Enable RLS
    - Allow authenticated users to insert and read quotes
    - Allow service role full access
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS custom_price_quotes;

-- Create custom_price_quotes table
CREATE TABLE custom_price_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Create policies
CREATE POLICY "Users can insert quotes"
  ON custom_price_quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read quotes"
  ON custom_price_quotes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage quotes"
  ON custom_price_quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_custom_price_quotes_status ON custom_price_quotes(status);
CREATE INDEX idx_custom_price_quotes_created_at ON custom_price_quotes(created_at DESC);