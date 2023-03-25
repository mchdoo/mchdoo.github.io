import { commentStore } from '$lib/store';
import { supabase, supabaseRealtimeInit } from '$lib/supabaseClient';

export async function load({ params }: any) {
	// Render
	const render = await supabase.storage.from('renders/public').getPublicUrl(params.name).data;

	// Comentarios
	const { data: initialComments, error } = await supabase.from('comentarios').select().eq('render', params.name);
	commentStore.set(initialComments!);

	//Supabase Realtime
	supabaseRealtimeInit()
	

	return {
		name: params.name,
		render,
		initialComments
	};
}
