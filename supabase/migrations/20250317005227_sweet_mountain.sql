/*
  # Create Services Schema and Data

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (varchar)
      - `description` (varchar)
      - `service_identifier` (varchar, unique)
      - `icon` (varchar)
      - `image` (varchar)
      - `sequence` (integer)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `categories`
      - `id` (uuid, primary key)
      - `name` (varchar)
      - `description` (varchar)
      - `image` (varchar)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `service_categories`
      - `id` (uuid, primary key)
      - `service_id` (uuid, references services)
      - `category_id` (uuid, references categories)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `items`
      - `id` (uuid, primary key)
      - `name` (varchar)
      - `description` (varchar)
      - `unit` (varchar)
      - `price` (numeric)
      - `quantity` (integer)
      - `image` (varchar)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `service_category_items`
      - `id` (uuid, primary key)
      - `service_category_id` (uuid, references service_categories)
      - `item_id` (uuid, references items)

  2. Security
    - Enable RLS on all tables
    - Allow authenticated users to read data
    - Allow service role full access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS service_category_items CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- Create services table
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name character varying(45),
  description character varying(250),
  icon character varying(255) NOT NULL,
  image character varying(255),
  service_identifier character varying(45),
  status boolean DEFAULT true,
  sequence integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique index on service_identifier
CREATE UNIQUE INDEX services_service_identifier_key ON services(service_identifier);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name character varying(45),
  description character varying(45),
  image character varying(200),
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_categories table
CREATE TABLE service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id),
  category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create items table
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name character varying(255),
  description character varying(256),
  unit character varying(20),
  price numeric(10,2),
  quantity integer,
  image character varying(255),
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_category_items table
CREATE TABLE service_category_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_category_id uuid REFERENCES service_categories(id),
  item_id uuid REFERENCES items(id)
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_category_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
DECLARE
  _table text;
  _policy text;
BEGIN
  FOR _table IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('services', 'categories', 'service_categories', 'items', 'service_category_items')
  LOOP
    FOR _policy IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = _table
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON %I', _policy, _table);
    END LOOP;
  END LOOP;
END $$;

-- Create policies for services
CREATE POLICY "services_read_20250317"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for categories
CREATE POLICY "categories_read_20250317"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for service_categories
CREATE POLICY "service_categories_read_20250317"
  ON service_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for items
CREATE POLICY "items_read_20250317"
  ON items
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for service_category_items
CREATE POLICY "service_category_items_read_20250317"
  ON service_category_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert services
INSERT INTO services (name, description, icon, service_identifier, sequence) VALUES
  ('Eazyy Bag', 'Weight-based washing perfect for regular laundry', 'package', 'easy-bag', 1),
  ('Wash & Iron', 'Professional cleaning and pressing for individual items', 'shirt', 'wash-iron', 2),
  ('Dry Cleaning', 'Specialized cleaning for delicate garments', 'wind', 'dry-cleaning', 3),
  ('Repairs', 'Expert mending and alterations services', 'scissors', 'repairs', 4);

-- Insert categories
INSERT INTO categories (name, description) VALUES
  ('Mixed Items', 'All types of regular laundry'),
  ('Tops', 'Shirts, t-shirts, and blouses'),
  ('Bottoms', 'Pants, shorts, and skirts'),
  ('Dresses', 'Dresses and jumpsuits'),
  ('Outerwear', 'Jackets and coats'),
  ('Formal Wear', 'Suits and formal attire'),
  ('Delicate Items', 'Silk and wool garments'),
  ('Special Care', 'Items requiring special attention'),
  ('Basic Repairs', 'Simple fixes and alterations'),
  ('Advanced Repairs', 'Complex repairs and modifications');

-- Link services and categories
WITH service_categories_data AS (
  SELECT s.id as service_id, c.id as category_id
  FROM services s
  CROSS JOIN categories c
  WHERE 
    (s.service_identifier = 'easy-bag' AND c.name = 'Mixed Items') OR
    (s.service_identifier = 'wash-iron' AND c.name IN ('Tops', 'Bottoms', 'Dresses', 'Outerwear')) OR
    (s.service_identifier = 'dry-cleaning' AND c.name IN ('Formal Wear', 'Delicate Items', 'Special Care')) OR
    (s.service_identifier = 'repairs' AND c.name IN ('Basic Repairs', 'Advanced Repairs'))
)
INSERT INTO service_categories (service_id, category_id)
SELECT service_id, category_id FROM service_categories_data;

-- Insert items
INSERT INTO items (name, description, unit, price, quantity, status) VALUES
  -- Eazyy Bag items
  ('Small Bag (up to 6kg)', 'Perfect for singles or couples', 'bag', 24.99, 1, true),
  ('Medium Bag (up to 12kg)', 'Ideal for families', 'bag', 44.99, 1, true),
  ('Large Bag (up to 18kg)', 'Best value for large loads', 'bag', 59.99, 1, true),

  -- Wash & Iron items
  ('Shirt', 'Business or casual shirts', 'piece', 4.99, 1, true),
  ('T-Shirt', 'Cotton t-shirts', 'piece', 3.99, 1, true),
  ('Polo Shirt', 'Polo or golf shirts', 'piece', 4.49, 1, true),
  ('Blouse', 'Women''s blouses', 'piece', 5.99, 1, true),
  ('Pants', 'Regular or dress pants', 'piece', 5.99, 1, true),
  ('Jeans', 'Denim jeans', 'piece', 6.99, 1, true),
  ('Shorts', 'Casual shorts', 'piece', 4.99, 1, true),
  ('Skirt', 'Regular or pleated skirts', 'piece', 5.99, 1, true),

  -- Dry Cleaning items
  ('Suit (2-piece)', 'Complete suit cleaning', 'set', 19.99, 1, true),
  ('Blazer', 'Single blazer or jacket', 'piece', 12.99, 1, true),
  ('Formal Dress', 'Evening or formal dresses', 'piece', 15.99, 1, true),
  ('Silk Blouse', 'Delicate silk tops', 'piece', 9.99, 1, true),
  ('Wool Sweater', 'Wool or cashmere sweaters', 'piece', 11.99, 1, true),
  ('Silk Dress', 'Silk dresses', 'piece', 14.99, 1, true),

  -- Repairs items
  ('Button Replacement', 'Replace missing buttons', 'piece', 3.99, 1, true),
  ('Hem Adjustment', 'Basic hem adjustment', 'piece', 6.99, 1, true),
  ('Seam Repair', 'Fix loose seams', 'piece', 5.99, 1, true),
  ('Zipper Replacement', 'Full zipper replacement', 'piece', 12.99, 1, true),
  ('Lining Repair', 'Fix or replace lining', 'piece', NULL, 1, true),
  ('Leather Repair', 'Professional leather fixing', 'piece', NULL, 1, true);

-- Link items to service categories
WITH service_category_items_data AS (
  SELECT sc.id as service_category_id, i.id as item_id
  FROM service_categories sc
  JOIN services s ON sc.service_id = s.id
  JOIN categories c ON sc.category_id = c.id
  CROSS JOIN items i
  WHERE 
    (s.service_identifier = 'easy-bag' AND c.name = 'Mixed Items' AND i.name LIKE '%Bag%') OR
    (s.service_identifier = 'wash-iron' AND c.name = 'Tops' AND i.name IN ('Shirt', 'T-Shirt', 'Polo Shirt', 'Blouse')) OR
    (s.service_identifier = 'wash-iron' AND c.name = 'Bottoms' AND i.name IN ('Pants', 'Jeans', 'Shorts', 'Skirt')) OR
    (s.service_identifier = 'dry-cleaning' AND c.name = 'Formal Wear' AND i.name IN ('Suit (2-piece)', 'Blazer', 'Formal Dress')) OR
    (s.service_identifier = 'dry-cleaning' AND c.name = 'Delicate Items' AND i.name IN ('Silk Blouse', 'Wool Sweater', 'Silk Dress')) OR
    (s.service_identifier = 'repairs' AND c.name = 'Basic Repairs' AND i.name IN ('Button Replacement', 'Hem Adjustment', 'Seam Repair')) OR
    (s.service_identifier = 'repairs' AND c.name = 'Advanced Repairs' AND i.name IN ('Zipper Replacement', 'Lining Repair', 'Leather Repair'))
)
INSERT INTO service_category_items (service_category_id, item_id)
SELECT service_category_id, item_id FROM service_category_items_data;