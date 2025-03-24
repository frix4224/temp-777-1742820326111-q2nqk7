/*
  # Create Custom Price Quotes Table

  1. New Table
    - `custom_price_quotes`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `item_name` (text)
      - `description` (text)
      - `image_url` (text[])
      - `suggested_price` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS custom_price_quotes;

-- Create custom_price_quotes table
CREATE TABLE custom_price_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
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
CREATE POLICY "Users can read own quotes"
  ON custom_price_quotes
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = custom_price_quotes.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert quotes"
  ON custom_price_quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage quotes"
  ON custom_price_quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_custom_price_quotes_order_id ON custom_price_quotes(order_id);
CREATE INDEX idx_custom_price_quotes_status ON custom_price_quotes(status);