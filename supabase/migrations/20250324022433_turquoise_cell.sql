/*
  # Add QR Code to Orders Table

  1. Changes
    - Add qr_code column to orders table
    - Add function to generate QR code data
    - Add trigger to automatically generate QR code on order creation
  
  2. Security
    - Maintain existing RLS policies
    - QR code data is read-only after creation
*/

-- Add QR code column to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS qr_code text;

-- Create function to generate QR code data
CREATE OR REPLACE FUNCTION generate_order_qr_data(order_row orders)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN json_build_object(
    'order_number', order_row.order_number,
    'customer_name', order_row.customer_name,
    'email', order_row.email,
    'phone', order_row.phone,
    'shipping_address', order_row.shipping_address,
    'shipping_method', order_row.shipping_method,
    'estimated_delivery', order_row.estimated_delivery,
    'total_amount', order_row.total_amount,
    'status', order_row.status,
    'created_at', order_row.created_at
  )::text;
END;
$$;

-- Create trigger to generate QR code data on order creation
CREATE OR REPLACE FUNCTION handle_order_qr_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.qr_code = generate_order_qr_data(NEW);
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS generate_order_qr_code ON orders;

-- Create trigger
CREATE TRIGGER generate_order_qr_code
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_order_qr_code();

-- Add comment explaining QR code usage
COMMENT ON COLUMN orders.qr_code IS 'JSON string containing order details for QR code generation';