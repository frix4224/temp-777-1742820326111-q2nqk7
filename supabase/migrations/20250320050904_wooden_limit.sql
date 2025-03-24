/*
  # Enhance Services Table Schema

  1. Changes
    - Add short_description for previews
    - Add price_starts_at and price_unit
    - Add features and benefits arrays
    - Add color_scheme for UI theming
    - Add is_popular flag
    - Update existing data
  
  2. Security
    - Maintain public read access
*/

-- Add new columns to services table
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS short_description varchar(200),
  ADD COLUMN IF NOT EXISTS price_starts_at numeric(10,2),
  ADD COLUMN IF NOT EXISTS price_unit varchar(20),
  ADD COLUMN IF NOT EXISTS features text[],
  ADD COLUMN IF NOT EXISTS benefits text[],
  ADD COLUMN IF NOT EXISTS color_scheme jsonb DEFAULT '{"primary": "blue-600", "secondary": "blue-50"}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_popular boolean DEFAULT false;

-- Update existing services with enhanced data
UPDATE services SET
  short_description = 'Weight-based washing perfect for regular laundry',
  price_starts_at = 24.99,
  price_unit = 'per bag',
  features = ARRAY[
    'Up to 6kg per bag',
    'Wash, dry, and fold service',
    'Color sorting included',
    'Fabric-specific care',
    'Fresh scent options',
    'Next-day delivery available'
  ],
  benefits = ARRAY[
    'Most economical option',
    'Perfect for regular laundry',
    'No sorting required',
    'Professional cleaning'
  ],
  color_scheme = '{"primary": "blue-600", "secondary": "blue-50"}'::jsonb,
  is_popular = true
WHERE service_identifier = 'easy-bag';

UPDATE services SET
  short_description = 'Professional cleaning and pressing for individual items',
  price_starts_at = 4.99,
  price_unit = 'per item',
  features = ARRAY[
    'Individual item care',
    'Professional pressing',
    'Stain treatment included',
    'Fabric-specific detergents',
    'Precise temperature control',
    'Quality inspection'
  ],
  benefits = ARRAY[
    'Professional finish',
    'Perfect for business wear',
    'Individual item care',
    'Guaranteed crisp results'
  ],
  color_scheme = '{"primary": "purple-600", "secondary": "purple-50"}'::jsonb,
  is_popular = true
WHERE service_identifier = 'wash-iron';

UPDATE services SET
  short_description = 'Specialized cleaning for delicate garments',
  price_starts_at = 9.99,
  price_unit = 'per item',
  features = ARRAY[
    'Eco-friendly solvents',
    'Delicate fabric care',
    'Stain removal expertise',
    'Professional pressing',
    'Fabric protection',
    'Quality guarantee'
  ],
  benefits = ARRAY[
    'Safe for delicate items',
    'Expert stain removal',
    'Preserves fabric quality',
    'Professional finish'
  ],
  color_scheme = '{"primary": "emerald-600", "secondary": "emerald-50"}'::jsonb,
  is_popular = false
WHERE service_identifier = 'dry-cleaning';

UPDATE services SET
  short_description = 'Expert mending and alterations services',
  price_starts_at = 3.99,
  price_unit = 'per repair',
  features = ARRAY[
    'Expert tailors',
    'Quality materials',
    'Size adjustments',
    'Zipper replacements',
    'Button repairs',
    'Hem adjustments'
  ],
  benefits = ARRAY[
    'Extend garment life',
    'Perfect fit guarantee',
    'Professional service',
    'Quality materials'
  ],
  color_scheme = '{"primary": "amber-600", "secondary": "amber-50"}'::jsonb,
  is_popular = false
WHERE service_identifier = 'repairs';

-- Create index for popular services
CREATE INDEX IF NOT EXISTS idx_services_popular ON services(is_popular) WHERE is_popular = true;