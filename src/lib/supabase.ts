import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wotfxbniypocfsgpawak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdGZ4Ym5peXBvY2ZzZ3Bhd2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjUyNzQsImV4cCI6MjA5Njk0MTI3NH0._fL3RSiTsq6XoOPIAKw-FnMRFVYskCNxolefjEUelec';

export const supabase = createClient(supabaseUrl, supabaseKey);
