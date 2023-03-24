<script lang="ts">
	import DeleteIcon from '$lib/icons/DeleteIcon.svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { TipoComentario } from '$lib/types';
	import { fly } from 'svelte/transition';

	export let comentario: TipoComentario;

	let hovering: boolean = false;

	async function handleDelete() {
		const { error } = await supabase
			.from('comentarios')
			.delete()
			.eq('contenido', comentario.contenido);
			
		error??console.log(error);
	}
</script>

<div
	class={`flex flex-col text-foreground mb-3 relative `}
	on:focus={() => (hovering = true)}
	on:mouseover={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	{#if hovering}
		<button
			on:click={() => handleDelete()}
			transition:fly={{ x: 10, duration: 100 }}
			class="absolute top-0 right-0 opacity-50 hover:opacity-70 p-2 bg-foreground/10 rounded-full"
		>
			<DeleteIcon />
		</button>
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
