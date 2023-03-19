// @ts-nocheck
import { supabase } from '$lib/supabaseClient';

export const ssr = true;

export async function load({}) {

	const { data }: {data: render[]} = await supabase.storage.from('renders').list('public');

	type render = {
		url: string,
		name: string
	}

	const renders: render[] = [];

	await data?.map((render) => {
		const renderUrl = supabase.storage.from('renders/public').getPublicUrl(render.name).data.publicUrl

		renders.push({
			url: renderUrl,
			name: renderUrl.split('/').pop()
		});
	});

	return {
		renders: renders ?? [],
	};
}
