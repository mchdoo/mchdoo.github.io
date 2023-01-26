import { supabase } from '$lib/supabaseClient';
import type { Actions } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
	const render = await supabase.storage.from('renders/public').getPublicUrl(params.name).data;
	const {data, error} = await supabase.from('comentarios').select().eq("render", params.name)
	return {
		name: params.name,
		render,
		comentarios: data,
		error
	};
}