import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://mukxqoxcmdmqjvjlnkbg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11a3hxb3hjbWRtcWp2amxua2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzMwNzYsImV4cCI6MjA2MzUwOTA3Nn0.NWKNOox9ATjL3ysfLK3H3j8NtiGjkvVQU2IRpsx0pcE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);