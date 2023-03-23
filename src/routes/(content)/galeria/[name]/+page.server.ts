import { supabase } from '$lib/supabaseClient';
import type { Comentario } from '$lib/types';
import { onMount } from 'svelte';
import {comentarios} from './store' 

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
	// Render
	const render = await supabase.storage.from('renders/public').getPublicUrl(params.name).data;
	
	// Comentarios
	const { data, error } = await supabase.from('comentarios').select().eq('render', params.name);
	comentarios.set(data || [])

	return {
		name: params.name,
		render,
		comentarios: data,
		error
	};
}
