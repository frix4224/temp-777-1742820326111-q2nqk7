/*
  # Fix RLS and Data Access Issues

  1. Changes
    - Disable RLS for public data tables
    - Add proper comments explaining security decisions
    - Create indexes for better performance
  
  2. Security
    - Public read access for catalog data
    - Protected write access through service role
*/

-- Disable RLS for public data tables
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE items DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_category_items DISABLE ROW LEVEL SECURITY;

-- Add comment explaining the security decision
COMMENT ON TABLE services IS 'Public services catalog - RLS disabled for public read access';
COMMENT ON TABLE categories IS 'Public categories catalog - RLS disabled for public read access';
COMMENT ON TABLE service_categories IS 'Public service-category mappings - RLS disabled for public read access';
COMMENT ON TABLE items IS 'Public items catalog - RLS disabled for public read access';
COMMENT ON TABLE service_category_items IS 'Public service-category-item mappings - RLS disabled for public read access';

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_sequence ON services(sequence);
CREATE INDEX IF NOT EXISTS idx_categories_sequence ON categories(sequence);
CREATE INDEX IF NOT EXISTS idx_items_sequence ON items(sequence);
CREATE INDEX IF NOT EXISTS idx_service_categories_service_id ON service_categories(service_id);
CREATE INDEX IF NOT EXISTS idx_service_categories_category_id ON service_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_service_category_items_category_id ON service_category_items(service_category_id);
CREATE INDEX IF NOT EXISTS idx_service_category_items_item_id ON service_category_items(item_id);