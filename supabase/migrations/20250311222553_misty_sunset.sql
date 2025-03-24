/*
  # Create orders table and related security policies

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `status` (text)
      - `pickup_date` (timestamptz)
      - `delivery_date` (timestamptz)
      - `pickup_address` (text)
      - `delivery_address` (text)
      - `pickup_notes` (text)
      - `delivery_notes` (text)
      - `total_amount` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on orders table
    - Add policies for authenticated users to:
      - Read own orders
      - Create new orders
    - Add policy for service role to read and update orders
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  pickup_date timestamptz NOT NULL,
  delivery_date timestamptz NOT NULL,
  pickup_address text NOT NULL,
  delivery_address text NOT NULL,
  pickup_notes text,
  delivery_notes text,
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_dates CHECK (delivery_date > pickup_date),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'picked_up', 'processing', 'ready', 'delivered', 'cancelled'))
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can read and update orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();