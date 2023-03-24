import type { TipoComentario } from '$lib/types';
import { supabase } from '$lib/supabaseClient';
import type { RealtimeChannel } from 'node_modules/@supabase/realtime-js/dist/module';
import { onDestroy, onMount, setContext } from 'svelte';
import { commentStore, prueba } from './store';

export const ssr = true;

export async function load({ params }: any) {
	// Render
	const render = await supabase.storage.from('renders/public').getPublicUrl(params.name).data;

	// Comentarios
	const { data, error } = await supabase.from('comentarios').select().eq('render', params.name);
	commentStore.set(data ?? []);

	//Supabase Realtime
	supabase
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
					(oldComs) =>
						(oldComs = oldComs.splice(oldComs.findIndex((obj) => obj.id === payload.old.id)))
				);
			}
		)
		.subscribe();

	return {
		name: params.name,
		render,
		error
	};
}
