import { createClient } from '@supabase/auth-helpers-sveltekit';

const supabaseUrl = import.meta.env.DEV
	? import.meta.env.VITE_PUBLIC_SUPABASE_URL
	: import.meta.env.SVELTE_APP_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.DEV
	? import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
	: import.meta.env.SVELTE_APP_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
