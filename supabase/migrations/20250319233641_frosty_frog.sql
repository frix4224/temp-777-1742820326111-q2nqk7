/*
  # Create Admin Users Table and RLS Policies

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `auth_id` (uuid, references auth.users)
      - `role` (text)
      - `permissions` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin access
    - Add service role bypass policy
*/

-- Create admin_users table
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