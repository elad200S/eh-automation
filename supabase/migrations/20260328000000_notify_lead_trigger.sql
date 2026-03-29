-- Enable pg_net extension for async HTTP calls from Postgres
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Function that fires an HTTP request to the notify-lead Edge Function
CREATE OR REPLACE FUNCTION public.trigger_notify_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM net.http_post(
    url     := 'https://dgsuukvywkxoecrpwddh.supabase.co/functions/v1/notify-lead',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key', true)
    ),
    body    := row_to_json(NEW)::text
  );
  RETURN NEW;
END;
$$;

-- Trigger: fires after every new contact submission
CREATE TRIGGER on_new_contact_submission
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_notify_lead();
