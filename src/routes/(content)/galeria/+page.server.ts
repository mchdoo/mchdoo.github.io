// @ts-nocheck
import { supabase } from '$lib/supabaseClient';
import { error as pageError } from '@sveltejs/kit';

export const ssr = true;
// async function loadRenders() {
// 	const {data, error} = supabase.storage.from('renders').select("*")
// }
function shuffle(array) {
	var copy = [],
		n = array.length,
		i;

	// While there remain elements to shuffle…
	while (n) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * array.length);

		// If not already shuffled, move it to the new array.
		if (i in array) {
			copy.push(array[i]);
			delete array[i];
			n--;
		}
	}

	return copy;
}

export async function load({}) {

	const { data: gradient } = await supabase.storage.from('assets').getPublicUrl('gradient');
	// const {data, error} = await supabase.storage.
	const { data: renders, error } = await supabase.storage.from('renders').list('public');

	type render = {
		url: string,
		name: string
	}

	const allResults: Array<render> = [];

	await renders?.map((render) => {
		
		const renderUrl = supabase.storage.from('renders/public').getPublicUrl(render.name).data.publicUrl

		allResults.push({
			url: renderUrl,
			name: renderUrl.split('/').pop()
		});
	});
	await allResults.shift();

	if (pageError) {
		throw error();
	}

	return {
		gradient: gradient.publicUrl,
		allResults: shuffle(allResults),
		names: renders.name,
		error: error?.message,
	};
}
