/*
  # Update business_inquiries table to include requirements

  1. Changes
    - Add requirements column to store service-specific requirements
    - Update table constraints
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add requirements column to business_inquiries table
ALTER TABLE business_inquiries
ADD COLUMN IF NOT EXISTS requirements jsonb DEFAULT '{}'::jsonb;

-- Update table comment
COMMENT ON TABLE business_inquiries IS 'Stores business registration requests with detailed service requirements';

-- Update column comments
COMMENT ON COLUMN business_inquiries.requirements IS 'JSON object containing service-specific requirements including frequency, volume, and specifications';