import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wotfxbniypocfsgpawak.supabase.co';
const supabaseKey = 'sb_publishable_1mXXIEOdEwNAnIhNYf8vKA_rrxu3I-h';

export const supabase = createClient(supabaseUrl, supabaseKey);
