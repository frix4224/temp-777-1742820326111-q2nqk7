/*
  # Create Items and Categories Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `sequence` (integer)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `items`
      - `id` (uuid, primary key)
      - `category_id` (uuid, references categories)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `is_custom_price` (boolean)
      - `is_popular` (boolean)
      - `sequence` (integer)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow public read access
    - Allow service role full access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

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

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "categories_read_public_20250324"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "categories_service_role_20250324"
  ON categories
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policies for items
CREATE POLICY "items_read_public_20250324"
  ON items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "items_service_role_20250324"
  ON items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_categories_sequence ON categories(sequence);
CREATE INDEX idx_categories_status ON categories(status);
CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_sequence ON items(sequence);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_popular ON items(is_popular) WHERE is_popular = true;

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