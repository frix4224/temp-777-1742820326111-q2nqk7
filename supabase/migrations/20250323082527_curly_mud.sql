/*
  # Fix Authentication Persistence

  1. Changes
    - Clear stuck sessions
    - Reset auth settings
    - Add session cleanup trigger
  
  2. Security
    - Maintain proper session management
    - Add cleanup trigger for deleted users
*/

-- Clear any stuck sessions
DELETE FROM auth.sessions;

-- Reset auth settings to defaults
UPDATE auth.users
SET raw_app_meta_data = '{"provider": "email", "providers": ["email"]}'::jsonb,
    raw_user_meta_data = '{}'::jsonb,
    aud = 'authenticated',
    role = 'authenticated',
    updated_at = now()
WHERE raw_app_meta_data != '{"provider": "email", "providers": ["email"]}'::jsonb
   OR raw_user_meta_data != '{}'::jsonb;

-- Create function to handle session cleanup
CREATE OR REPLACE FUNCTION auth.handle_session_cleanup()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM auth.sessions WHERE user_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for session cleanup
DROP TRIGGER IF EXISTS handle_session_cleanup_trigger ON auth.users;
CREATE TRIGGER handle_session_cleanup_trigger
  BEFORE DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.handle_session_cleanup();