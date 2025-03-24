/*
  # Fix Services Schema

  1. Changes
    - Drop all existing service-related tables
    - Create services and items tables
    - Add proper constraints and indexes
  
  2. Security
    - Disable RLS for public catalog data
    - Add proper comments
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
  name varchar(100) NOT NULL,
  description text NOT NULL,
  short_description varchar(200) NOT NULL,
  icon varchar(50) NOT NULL,
  image_url text,
  price_starts_at numeric(10,2) NOT NULL,
  price_unit varchar(20) NOT NULL,
  features text[] NOT NULL,
  benefits text[] NOT NULL,
  service_identifier varchar(50) NOT NULL UNIQUE,
  color_scheme jsonb NOT NULL DEFAULT '{"primary": "blue", "secondary": "blue-light"}'::jsonb,
  sequence integer NOT NULL DEFAULT 0,
  is_popular boolean DEFAULT false,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text,
  sequence integer NOT NULL DEFAULT 0,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create items table
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2),
  is_custom_price boolean DEFAULT false,
  is_popular boolean DEFAULT false,
  sequence integer NOT NULL DEFAULT 0,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Disable RLS for public catalog data
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE items DISABLE ROW LEVEL SECURITY;

-- Add comments
COMMENT ON TABLE services IS 'Public services catalog with enhanced fields for better UI presentation';
COMMENT ON TABLE categories IS 'Service categories for organizing items';
COMMENT ON TABLE items IS 'Individual service items with pricing';

-- Create indexes
CREATE INDEX idx_services_sequence ON services(sequence);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_popular ON services(is_popular) WHERE is_popular = true;

CREATE INDEX idx_categories_sequence ON categories(sequence);
CREATE INDEX idx_categories_status ON categories(status);

CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_sequence ON items(sequence);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_popular ON items(is_popular) WHERE is_popular = true;

-- Insert services
INSERT INTO services (
  name,
  description,
  short_description,
  icon,
  price_starts_at,
  price_unit,
  features,
  benefits,
  service_identifier,
  color_scheme,
  sequence,
  is_popular
) VALUES
(
  'Eazyy Bag',
  'Our signature laundry service perfect for your regular washing needs. Simply fill the bag with your clothes and we''ll take care of the rest. Ideal for everyday laundry including clothes, towels, and bedding.',
  'Weight-based washing perfect for regular laundry',
  'package',
  24.99,
  'per bag',
  ARRAY[
    'Up to 6kg per bag',
    'Wash, dry, and fold service',
    'Color sorting included',
    'Fabric-specific care',
    'Fresh scent options',
    'Next-day delivery available'
  ],
  ARRAY[
    'Most economical option',
    'Perfect for regular laundry',
    'No sorting required',
    'Professional cleaning'
  ],
  'easy-bag',
  '{"primary": "blue-600", "secondary": "blue-50"}'::jsonb,
  1,
  true
),
(
  'Wash & Iron',
  'Professional washing and ironing service for your garments that need that extra care and attention. Each item is individually processed to ensure the best results. Perfect for business attire and formal wear.',
  'Professional cleaning and pressing for individual items',
  'shirt',
  4.99,
  'per item',
  ARRAY[
    'Individual item care',
    'Professional pressing',
    'Stain treatment included',
    'Fabric-specific detergents',
    'Precise temperature control',
    'Quality inspection'
  ],
  ARRAY[
    'Professional finish',
    'Perfect for business wear',
    'Individual item care',
    'Guaranteed crisp results'
  ],
  'wash-iron',
  '{"primary": "purple-600", "secondary": "purple-50"}'::jsonb,
  2,
  true
),
(
  'Dry Cleaning',
  'Expert dry cleaning service for your delicate and special care items. Using state-of-the-art equipment and eco-friendly solvents, we ensure your valuable garments receive the gentlest and most effective cleaning possible.',
  'Specialized cleaning for delicate garments',
  'wind',
  9.99,
  'per item',
  ARRAY[
    'Eco-friendly solvents',
    'Delicate fabric care',
    'Stain removal expertise',
    'Professional pressing',
    'Fabric protection',
    'Quality guarantee'
  ],
  ARRAY[
    'Safe for delicate items',
    'Expert stain removal',
    'Preserves fabric quality',
    'Professional finish'
  ],
  'dry-cleaning',
  '{"primary": "emerald-600", "secondary": "emerald-50"}'::jsonb,
  3,
  false
),
(
  'Repairs & Alterations',
  'Professional clothing repair and alteration services to give your favorite garments a new lease of life. From simple fixes to complex alterations, our experienced tailors ensure high-quality workmanship.',
  'Expert mending and alterations services',
  'scissors',
  3.99,
  'per repair',
  ARRAY[
    'Expert tailors',
    'Quality materials',
    'Size adjustments',
    'Zipper replacements',
    'Button repairs',
    'Hem adjustments'
  ],
  ARRAY[
    'Extend garment life',
    'Perfect fit guarantee',
    'Professional service',
    'Quality materials'
  ],
  'repairs',
  '{"primary": "amber-600", "secondary": "amber-50"}'::jsonb,
  4,
  false
);

-- Insert categories
INSERT INTO categories (name, description, icon, sequence) VALUES
  ('Mixed Items', 'All types of regular laundry', 'package', 1),
  ('Tops', 'Shirts, t-shirts, and blouses', 'shirt', 2),
  ('Bottoms', 'Pants, shorts, and skirts', 'pants', 3),
  ('Dresses', 'Dresses and jumpsuits', 'dress', 4),
  ('Outerwear', 'Jackets and coats', 'jacket', 5),
  ('Formal Wear', 'Suits and formal attire', 'suit', 6),
  ('Delicate Items', 'Silk and wool garments', 'delicate', 7),
  ('Special Care', 'Items requiring special attention', 'special', 8),
  ('Basic Repairs', 'Simple fixes and alterations', 'scissors', 9),
  ('Advanced Repairs', 'Complex repairs and modifications', 'tools', 10);

-- Insert items
INSERT INTO items (category_id, name, description, price, is_custom_price, is_popular, sequence) VALUES
  -- Eazyy Bag items
  ((SELECT id FROM categories WHERE name = 'Mixed Items'), 'Small Bag (up to 6kg)', 'Perfect for singles or couples', 24.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Mixed Items'), 'Medium Bag (up to 12kg)', 'Ideal for families', 44.99, false, true, 2),
  ((SELECT id FROM categories WHERE name = 'Mixed Items'), 'Large Bag (up to 18kg)', 'Best value for large loads', 59.99, false, false, 3),

  -- Wash & Iron items
  ((SELECT id FROM categories WHERE name = 'Tops'), 'Shirt', 'Business or casual shirts', 4.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Tops'), 'T-Shirt', 'Cotton t-shirts', 3.99, false, true, 2),
  ((SELECT id FROM categories WHERE name = 'Tops'), 'Polo Shirt', 'Polo or golf shirts', 4.49, false, false, 3),
  ((SELECT id FROM categories WHERE name = 'Tops'), 'Blouse', 'Women''s blouses', 5.99, false, false, 4),
  
  ((SELECT id FROM categories WHERE name = 'Bottoms'), 'Pants', 'Regular or dress pants', 5.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Bottoms'), 'Jeans', 'Denim jeans', 6.99, false, true, 2),
  ((SELECT id FROM categories WHERE name = 'Bottoms'), 'Shorts', 'Casual shorts', 4.99, false, false, 3),
  ((SELECT id FROM categories WHERE name = 'Bottoms'), 'Skirt', 'Regular or pleated skirts', 5.99, false, false, 4),

  -- Dry Cleaning items
  ((SELECT id FROM categories WHERE name = 'Formal Wear'), 'Suit (2-piece)', 'Complete suit cleaning', 19.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Formal Wear'), 'Blazer', 'Single blazer or jacket', 12.99, false, false, 2),
  ((SELECT id FROM categories WHERE name = 'Formal Wear'), 'Formal Dress', 'Evening or formal dresses', 15.99, false, false, 3),
  
  ((SELECT id FROM categories WHERE name = 'Delicate Items'), 'Silk Blouse', 'Delicate silk tops', 9.99, false, false, 1),
  ((SELECT id FROM categories WHERE name = 'Delicate Items'), 'Wool Sweater', 'Wool or cashmere sweaters', 11.99, false, true, 2),
  ((SELECT id FROM categories WHERE name = 'Delicate Items'), 'Silk Dress', 'Silk dresses', 14.99, false, false, 3),

  -- Repairs items
  ((SELECT id FROM categories WHERE name = 'Basic Repairs'), 'Button Replacement', 'Replace missing buttons', 3.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Basic Repairs'), 'Hem Adjustment', 'Basic hem adjustment', 6.99, false, false, 2),
  ((SELECT id FROM categories WHERE name = 'Basic Repairs'), 'Seam Repair', 'Fix loose seams', 5.99, false, false, 3),
  
  ((SELECT id FROM categories WHERE name = 'Advanced Repairs'), 'Zipper Replacement', 'Full zipper replacement', 12.99, false, true, 1),
  ((SELECT id FROM categories WHERE name = 'Advanced Repairs'), 'Lining Repair', 'Fix or replace lining', NULL, true, false, 2),
  ((SELECT id FROM categories WHERE name = 'Advanced Repairs'), 'Leather Repair', 'Professional leather fixing', NULL, true, false, 3);