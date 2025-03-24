/*
  # Update Services Schema with Color Information

  1. Changes
    - Add color_scheme column with proper color information
    - Update existing services with correct colors
    - Add comments for color usage
  
  2. Security
    - Maintain existing security policies
*/

-- Update services table with new color scheme
UPDATE services SET
  color_scheme = jsonb_build_object(
    'primary', CASE service_identifier
      WHEN 'easy-bag' THEN 'bg-blue-600'
      WHEN 'wash-iron' THEN 'bg-purple-600'
      WHEN 'dry-cleaning' THEN 'bg-emerald-600'
      WHEN 'repairs' THEN 'bg-amber-600'
    END,
    'secondary', CASE service_identifier
      WHEN 'easy-bag' THEN 'bg-blue-50'
      WHEN 'wash-iron' THEN 'bg-purple-50'
      WHEN 'dry-cleaning' THEN 'bg-emerald-50'
      WHEN 'repairs' THEN 'bg-amber-50'
    END
  )
WHERE service_identifier IN ('easy-bag', 'wash-iron', 'dry-cleaning', 'repairs');

-- Add comment explaining color scheme usage
COMMENT ON COLUMN services.color_scheme IS 'JSON object containing primary and secondary colors for UI theming';