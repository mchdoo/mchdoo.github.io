import { createClient } from '@supabase/auth-helpers-sveltekit';
import { commentStore } from '$lib/store';
import type { TipoComentario } from './types';
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

export const supabaseRealtimeInit = ()=>supabase
	.channel('any')
	.on(
		'postgres_changes',
		{ event: 'INSERT', schema: 'public', table: 'comentarios' },
		(payload) => {
			commentStore.update((oldComs) => (oldComs = [...oldComs, payload.new as TipoComentario]));
		}
	)
	.on(
		'postgres_changes',
		{ event: 'DELETE', schema: 'public', table: 'comentarios' },
		(payload) => {
			console.log('Change received!', payload);
			commentStore.update(
				(oldComs) => (oldComs = oldComs.filter((com) => com.id !== payload.old.id))
			);
		}
	)
	.subscribe();

