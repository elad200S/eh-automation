// Re-export the official Lovable Cloud client so every import from
// '@/lib/supabase' hits the same backend the Portal reads from.
export { supabase } from '@/integrations/supabase/client';
