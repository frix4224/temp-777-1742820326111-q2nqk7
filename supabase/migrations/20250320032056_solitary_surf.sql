/*
  # Fix RLS Policies for Services

  1. Changes
    - Drop existing policies
    - Create new policies allowing public access
    - Add service role bypass policies
  
  2. Security
    - Allow public access to read services data
    - Maintain service role full access
*/

-- Drop existing policies
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services') THEN
    DROP POLICY IF EXISTS "services_read_public_20250320" ON services;
    DROP POLICY IF EXISTS "services_service_role_20250320" ON services;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories') THEN
    DROP POLICY IF EXISTS "categories_read_public_20250320" ON categories;
    DROP POLICY IF EXISTS "categories_service_role_20250320" ON categories;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_categories') THEN
    DROP POLICY IF EXISTS "service_categories_read_public_20250320" ON service_categories;
    DROP POLICY IF EXISTS "service_categories_service_role_20250320" ON service_categories;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'items') THEN
    DROP POLICY IF EXISTS "items_read_public_20250320" ON items;
    DROP POLICY IF EXISTS "items_service_role_20250320" ON items;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_category_items') THEN
    DROP POLICY IF EXISTS "service_category_items_read_public_20250320" ON service_category_items;
    DROP POLICY IF EXISTS "service_category_items_service_role_20250320" ON service_category_items;
  END IF;
END $$;

-- Create new policies that allow public access
CREATE POLICY "services_read_public_20250320"
  ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "categories_read_public_20250320"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "service_categories_read_public_20250320"
  ON service_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "items_read_public_20250320"
  ON items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "service_category_items_read_public_20250320"
  ON service_category_items
  FOR SELECT
  TO public
  USING (true);

-- Add service role bypass policies
CREATE POLICY "services_service_role_20250320"
  ON services
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "categories_service_role_20250320"
  ON categories
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_categories_service_role_20250320"
  ON service_categories
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "items_service_role_20250320"
  ON items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_category_items_service_role_20250320"
  ON service_category_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);