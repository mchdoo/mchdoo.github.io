import { createClient } from '@supabase/auth-helpers-sveltekit';

// const supabaseUrl = import.meta.env.DEV
// 	? import.meta.env.VITE_PUBLIC_SUPABASE_URL	
// 	: import.meta.env.SVELTE_APP_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.DEV
// 	? import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
// 	: import.meta.env.SVELTE_APP_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl: string = 'https://vrvunwatjzdzpfusjtjt.supabase.co';
const supabaseAnonKey: string =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnVud2F0anpkenBmdXNqdGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwNzc2MzYsImV4cCI6MTk4NTY1MzYzNn0.-VIy7oKl_NG6sBYT8P6p0dtXHZz_nv0EQR5EhdzeJLA'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
