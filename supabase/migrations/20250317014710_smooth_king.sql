/*
  # Create user management tables and policies

  1. New Tables
    - `roles`: Store user roles (user, admin, manager)
    - `user_types`: Store user types (individual, business)
    - `users`: Main users table with auth info
    - `user_addresses`: Store user delivery addresses
    - `user_devices`: Store user device information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name character varying(100) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_types table
CREATE TABLE IF NOT EXISTS user_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name character varying(200) NOT NULL,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier integer NOT NULL UNIQUE,
  name character varying(255),
  email character varying(255) NOT NULL UNIQUE,
  mobile character varying(12),
  email_verified_at timestamptz,
  is_mobile_verified boolean DEFAULT false,
  password character varying(255) NOT NULL,
  role_id uuid REFERENCES roles(id),
  device_id character varying(100),
  device_os character varying(10),
  type integer DEFAULT 0,
  user_type_id uuid REFERENCES user_types(id),
  provider_name character varying(100),
  provider_id text,
  remember_token character varying(100),
  status boolean DEFAULT false,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  address text NOT NULL,
  lat double precision NOT NULL,
  long double precision NOT NULL,
  type character varying(11) NOT NULL,
  specifications character varying(255),
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_devices table
CREATE TABLE IF NOT EXISTS user_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  device_id character varying(250),
  device_os character varying(10),
  fcm_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "roles_read_20250317" ON roles;
DROP POLICY IF EXISTS "user_types_read_20250317" ON user_types;
DROP POLICY IF EXISTS "users_read_own_20250317" ON users;
DROP POLICY IF EXISTS "users_manage_addresses_20250317" ON user_addresses;
DROP POLICY IF EXISTS "users_manage_devices_20250317" ON user_devices;

-- Create policies for roles
CREATE POLICY "roles_read_20250317"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_types
CREATE POLICY "user_types_read_20250317"
  ON user_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for users
CREATE POLICY "users_read_own_20250317"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for user_addresses
CREATE POLICY "users_manage_addresses_20250317"
  ON user_addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for user_devices
CREATE POLICY "users_manage_devices_20250317"
  ON user_devices
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Drop existing triggers
DROP TRIGGER IF EXISTS roles_updated_at ON roles;
DROP TRIGGER IF EXISTS user_types_updated_at ON user_types;
DROP TRIGGER IF EXISTS users_updated_at ON users;
DROP TRIGGER IF EXISTS user_addresses_updated_at ON user_addresses;
DROP TRIGGER IF EXISTS user_devices_updated_at ON user_devices;

-- Create triggers for updated_at
CREATE TRIGGER roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_types_updated_at
  BEFORE UPDATE ON user_types
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_addresses_updated_at
  BEFORE UPDATE ON user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_devices_updated_at
  BEFORE UPDATE ON user_devices
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert default roles
INSERT INTO roles (role_name, description)
SELECT 'user', 'Regular user'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'user');

INSERT INTO roles (role_name, description)
SELECT 'admin', 'Administrator'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'admin');

INSERT INTO roles (role_name, description)
SELECT 'manager', 'Manager'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'manager');

-- Insert default user types
INSERT INTO user_types (name)
SELECT 'individual'
WHERE NOT EXISTS (SELECT 1 FROM user_types WHERE name = 'individual');

INSERT INTO user_types (name)
SELECT 'business'
WHERE NOT EXISTS (SELECT 1 FROM user_types WHERE name = 'business');