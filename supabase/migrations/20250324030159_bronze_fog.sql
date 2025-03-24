/*
  # Fix User Addresses Table and Policies

  1. Changes
    - Drop existing table if it exists
    - Recreate table with proper schema
    - Add RLS policies
    - Add triggers and functions
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS ensure_single_default_address_trigger ON user_addresses;
DROP TRIGGER IF EXISTS user_addresses_updated_at ON user_addresses;
DROP FUNCTION IF EXISTS ensure_single_default_address();
DROP TABLE IF EXISTS user_addresses;

-- Create user_addresses table
CREATE TABLE user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their addresses"
  ON user_addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all addresses"
  ON user_addresses
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to ensure only one default address per user
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE user_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for default address
CREATE TRIGGER ensure_single_default_address_trigger
  BEFORE INSERT OR UPDATE OF is_default
  ON user_addresses
  FOR EACH ROW
  WHEN (NEW.is_default = true)
  EXECUTE FUNCTION ensure_single_default_address();

-- Create trigger for updated_at
CREATE TRIGGER user_addresses_updated_at
  BEFORE UPDATE ON user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for faster lookups
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_is_default ON user_addresses(is_default);