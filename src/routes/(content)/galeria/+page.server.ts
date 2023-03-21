import { supabase } from '$lib/supabaseClient';
import type { FileObject } from 'node_modules/@supabase/storage-js/dist/module';

export const ssr = true;

export async function load({}) {
	const { data } = await supabase.storage.from('renders').list('public');

	type Render = {
		url: string;
		name?: string;
	};

	const renders: Render[] = [];

	await data?.map((render) => {
		const renderUrl = supabase.storage.from('renders/public').getPublicUrl(render.name)
			.data.publicUrl;

		renders.push({
			url: renderUrl,
			name: renderUrl.split('/').pop()
		});
	});

	return {
		renders: renders ?? []
	};
}
