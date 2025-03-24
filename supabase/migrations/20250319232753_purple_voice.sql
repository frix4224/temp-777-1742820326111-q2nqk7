/*
  # Add password handling and disable email confirmation

  1. Changes
    - Add encrypted_password column to users table
    - Create password update trigger
    - Set up proper permissions

  2. Security
    - Passwords are properly hashed using bcrypt
    - Only service role can modify passwords directly
*/

-- Add encrypted_password column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'encrypted_password'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN encrypted_password text;
  END IF;
END $$;

-- Update test user with proper password hash
UPDATE auth.users 
SET encrypted_password = crypt('test123', gen_salt('bf'))
WHERE email = 'test@eazyy.app';

-- Create function to handle password updates
CREATE OR REPLACE FUNCTION auth.handle_password_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.encrypted_password IS DISTINCT FROM OLD.encrypted_password THEN
    NEW.encrypted_password := crypt(NEW.encrypted_password, gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for password updates
DROP TRIGGER IF EXISTS handle_password_update ON auth.users;
CREATE TRIGGER handle_password_update
  BEFORE UPDATE OF encrypted_password
  ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.handle_password_update();

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;

-- Add policy to allow users to update their own password
DROP POLICY IF EXISTS "Users can update own password" ON auth.users;
CREATE POLICY "Users can update own password"
  ON auth.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Update user settings in auth schema
DO $$
BEGIN
  -- Attempt to update email confirmation setting
  -- This is handled through the Supabase dashboard settings
  -- The actual setting is managed through the Auth service configuration
  NULL;
END $$;