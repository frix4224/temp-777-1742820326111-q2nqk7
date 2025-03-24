/*
  # Update Services Schema for Better Service Selection

  1. Changes
    - Drop existing services table and related tables
    - Create new services table with enhanced fields
    - Add proper constraints and indexes
  
  2. Security
    - Disable RLS for public access
    - Add proper comments
*/

-- Drop existing tables
DROP TABLE IF EXISTS service_category_items CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- Create services table with enhanced fields
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

-- Disable RLS for public access
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Add comment
COMMENT ON TABLE services IS 'Public services catalog with enhanced fields for better UI presentation';

-- Create indexes
CREATE INDEX idx_services_sequence ON services(sequence);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_popular ON services(is_popular) WHERE is_popular = true;

-- Insert enhanced service data
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