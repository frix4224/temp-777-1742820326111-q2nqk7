/*
  # Fix Auth Sessions and Settings

  1. Changes
    - Clear any stuck sessions
    - Reset auth settings to defaults
    - Add proper session cleanup trigger
  
  2. Security
    - Maintain existing security policies
    - Ensure proper session cleanup
*/

-- Clear any stuck sessions
DELETE FROM auth.sessions;

-- Reset auth settings to defaults
UPDATE auth.users
SET raw_app_meta_data = '{"provider": "email", "providers": ["email"]}'::jsonb,
    raw_user_meta_data = '{}'::jsonb,
    email_confirmed_at = NULL,
    encrypted_password = NULL,
    aud = 'authenticated',
    role = 'authenticated',
    updated_at = now()
WHERE raw_app_meta_data != '{"provider": "email", "providers": ["email"]}'::jsonb
   OR raw_user_meta_data != '{}'::jsonb;

-- Create function to cleanup sessions on user deletion if it doesn't exist
CREATE OR REPLACE FUNCTION auth.cleanup_sessions()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM auth.sessions WHERE user_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for session cleanup if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'cleanup_sessions_trigger'
  ) THEN
    CREATE TRIGGER cleanup_sessions_trigger
      BEFORE DELETE ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION auth.cleanup_sessions();
  END IF;
END $$;