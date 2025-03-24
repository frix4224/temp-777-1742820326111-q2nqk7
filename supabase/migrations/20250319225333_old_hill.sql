/*
  # Fix user_addresses table and add city column

  1. Changes
    - Drop and recreate user_addresses table with all required columns
    - Add proper constraints and indexes
    - Set up RLS policies
    - Create triggers for default address and updated_at

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing table and related objects
DROP TABLE IF EXISTS user_addresses CASCADE;

-- Create user_addresses table with all required columns
CREATE TABLE user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  is_default boolean DEFAULT false,
  validated boolean DEFAULT false,
  formatted_address text,
  validation_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Add constraints
  CONSTRAINT address_length_check CHECK (length(address) > 5),
  CONSTRAINT city_length_check CHECK (length(city) > 2)
);

-- Create function to ensure only one default address per user
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
  IF NEW.is_default THEN
    UPDATE user_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for default address
DROP TRIGGER IF EXISTS ensure_single_default_address_trigger ON user_addresses;
CREATE TRIGGER ensure_single_default_address_trigger
  BEFORE INSERT OR UPDATE OF is_default
  ON user_addresses
  FOR EACH ROW
  WHEN (NEW.is_default = true)
  EXECUTE FUNCTION ensure_single_default_address();

-- Create function to handle updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS user_addresses_updated_at ON user_addresses;
CREATE TRIGGER user_addresses_updated_at
  BEFORE UPDATE ON user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

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

-- Create indexes for faster lookups
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_is_default ON user_addresses(is_default);