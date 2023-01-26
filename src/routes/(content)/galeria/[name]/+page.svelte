<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import Comentario from '$lib/components/Comentario.svelte';
	import { page } from '$app/stores';
	import { dataset_dev } from 'svelte/internal';

	export let data: any;

	const name = data.name.split('_')[0];

	let comment: string;

	async function handleComment() {
		if (comment == undefined) {
			alert('no');
		}
		const autor = await prompt('Cómo te llamas?');
		const { error } = await supabase.from('comentarios').insert({
			contenido: comment,
			render: data.name,
			autor: autor ? autor : 'Anónimo'
		});
		document.location.reload();

		if (error) {
			alert(error.message);
		}
	}
</script>

<svelte:head>
	<title>"{name}" de Pedro Machado</title>
</svelte:head>

<main class="grid grid-cols-3 gap-5">

	{#if $page.error}
	<p>{$page.error.message}</p>
	{/if}

	<section class="col-span-3 md:col-span-2">
		{#if !$page.error}
		<img class="render" src={data.render.publicUrl} alt={data.name} />
		{/if}
	</section>
	<!-- <div class="h-10 aspect-square bg-[{swatches[1].getHex()}]" ></div> -->
	<section class="col-span-3 md:col-span-1">
		<span class="flex gap-5">
			<h1 class="title">“{name}”</h1>
			{#if data.name.includes('drawing')}
				<p class="mt-2 font-sans opacity-75 blur-sm hover:blur-0 transition cursor-default">
					(hecho a mano)
				</p>
			{/if}
		</span>

		<div class="font-sans mt-5 col-span-3">
			<section class="grid gap-2 text-background/70 mb-2">
				<p class="text-foreground opacity-50 uppercase text-xs text-center">— Comentarios —</p>
				{#each data.comentarios as comentario}
					<Comentario {comentario} />
				{/each}
				{#if !data.comentarios}
					<p class="text-center text-foreground opacity-20">nadie comentó todavía</p>
				{/if}
			</section>

			<span class="relative">
				<textarea
					bind:value={comment}
					on:submit={() => handleComment()}
					on:keydown={(e) => {
						e.key == 'return' ? () => handleComment() : null;
					}}
					placeholder="algo para decir?"
					class="rounded p-3 h-fit placeholder:text-foreground/20 transition focus:ring-2 text-foreground/80 resize-y ring-foreground/30 outline-none bg-foreground/5 w-full"
				/>
				<button
					on:click={() => handleComment()}
					class="absolute right-2 mt-2 bg-foreground/10 h-10 aspect-square rounded-full hover:bg-foreground/20 backdrop-blur-sm"
				>
					→
				</button>
			</span>

			{#if data.error}
				<p>{data.error.message}</p>
			{/if}
		</div>
	</section>
</main>

<style lang="postcss" scoped>
	.render {
		@apply w-full rounded-sm max-h-[720px] object-contain bg-gradient-to-br from-foreground/10;
	}
</style>
