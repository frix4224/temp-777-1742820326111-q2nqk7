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