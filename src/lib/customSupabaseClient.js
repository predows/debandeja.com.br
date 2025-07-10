import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vuzwfylqxkelcnutsdkt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1endmeWxxeGtlbGNudXRzZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzAwNDgsImV4cCI6MjA2NzM0NjA0OH0.iF9XvXGJ3W6IrlbUX8Lt1q-lZ4ejs2R0SXPhS2GmboQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);