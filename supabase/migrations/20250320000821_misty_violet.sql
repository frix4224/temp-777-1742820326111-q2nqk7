/*
  # Update admin_users table and disable email confirmation

  1. Changes
    - Drop and recreate admin_users table if it exists
    - Update RLS policies
    - Disable email confirmation for all users
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_users') THEN
    DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
    DROP POLICY IF EXISTS "Service role can manage admin users" ON admin_users;
  END IF;
END $$;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_admin_users_auth_id;

-- Drop and recreate the table
DROP TABLE IF EXISTS admin_users;

CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  permissions jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT valid_role CHECK (role IN ('admin', 'super_admin'))
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes
CREATE INDEX idx_admin_users_auth_id ON admin_users(auth_id);

-- Insert test admin user if it doesn't exist
INSERT INTO admin_users (auth_id, role, permissions)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  'super_admin',
  '{"can_manage_users": true, "can_manage_orders": true, "can_manage_settings": true}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users 
  WHERE auth_id = '00000000-0000-0000-0000-000000000000'
);

-- Disable email confirmation requirement for all users
UPDATE auth.users 
SET email_confirmed_at = CURRENT_TIMESTAMP 
WHERE email_confirmed_at IS NULL;