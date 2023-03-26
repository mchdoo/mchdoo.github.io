<script lang="ts">
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { TipoComentario } from '$lib/types';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Popup from './Popup.svelte';

	export let autor: string;
	export let comentario: TipoComentario;

	let unable: boolean;

	let hovering: boolean = false;

	async function handleDelete() {
		if (comentario.autor !== autor) {
			new Promise(() => {
				unable = true
				setTimeout(() => {
					unable = false;
				}, 2000);
			});
			return;
		}

		const { error } = await supabase.from('comentarios').delete().eq('id', comentario.id);

		error ?? console.log(error);
	}
</script>

<div
	class={`flex flex-col text-foreground mb-3 relative `}
	on:focus={() => (hovering = true)}
	on:mouseover={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	transition:slide={{ duration: 200, easing: cubicOut }}
>
	{#if hovering}
		<!-- content here -->
		<DeleteButton onConfirm={() => handleDelete()} />
	{/if}
	{#if unable}
		<Popup warn autoclose>
			<p class="font-sans">No sos autor/a de este comentario!</p>
		</Popup>
	{/if}
	<div class="mb-1 flex flex-col gap-1">
		<div class="col-span-5 flex items-center gap-2">
			{#if comentario.autor == 'Pedro'}
				<img
					class="bg-foreground/10 w-6 p-1 self-start rounded-full"
					src="/gradient-star.png"
					alt="ico"
				/>
			{:else}
				<div class="bg-foreground/10 w-6 aspect-square rounded-full" />
			{/if}
			<h2 class="opacity-70 font-bold text-sm">{comentario.autor}</h2>
			<p class="text-xs opacity-30">
				{new Date(comentario.created_at).toLocaleDateString('en-US', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				})}
			</p>
		</div>
	</div>
	<h4 class="font-bold text-lg">
		{comentario.contenido}
	</h4>
</div>
