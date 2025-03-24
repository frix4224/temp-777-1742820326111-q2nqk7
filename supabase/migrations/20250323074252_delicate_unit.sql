/*
  # Create Storage Bucket for Quote Images

  1. Changes
    - Create storage bucket for quote images using built-in storage
    - Set up public access policies
    - Add security policies
  
  2. Security
    - Allow authenticated users to upload
    - Allow public read access
    - Add size and type restrictions
*/

-- Create storage bucket for quotes if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'quotes'
  ) THEN
    -- Create the bucket
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'quotes',
      'quotes',
      true,
      10485760, -- 10MB limit
      ARRAY[
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ]
    );

    -- Create policy to allow authenticated users to upload files
    CREATE POLICY "Authenticated users can upload quote images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'quotes' AND
      auth.role() = 'authenticated' AND
      (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp'))
    );

    -- Create policy to allow public read access
    CREATE POLICY "Public read access for quote images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'quotes');

    -- Create policy to allow users to delete their own uploads
    CREATE POLICY "Users can delete own quote images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'quotes' AND
      auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;