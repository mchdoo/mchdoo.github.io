<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { TipoComentario } from '$lib/types';
	import Comentario from '$lib/components/Comentario.svelte';
	import { page } from '$app/stores';
	import { commentStore, prueba } from './store';
	import type { PageData } from './$types';
	import Popup from '$lib/components/Popup.svelte';
	import { slide } from 'svelte/transition';

	let isOpen = false;
	export let data: PageData;

	const name = data.name.split('_')[0];

	let contenidoComentario: string;
	let autor: string;

	async function handleComment() {
		if (autor == undefined) {
			isOpen = true
		} else {
			const comentario: TipoComentario = {
				contenido: contenidoComentario,
				render: data.name,
				autor: autor,
				created_at: new Date('today')
			};
			isOpen = false;
			contenidoComentario = '';
			
			const { error } = await supabase.from('comentarios').insert(comentario);
		}
	}

	prueba.set('Cargado');
</script>

<svelte:head>
	<title>"{name}" de Pedro Machado</title>
</svelte:head>

<main class="grid grid-cols-3 gap-5">
	<section class="col-span-3 md:col-span-2">
		{#if !$page.error}
			<img class="render sticky top-6" src={data.render.publicUrl} alt={data.name} />
		{/if}
	</section>
	<!-- <div class="h-10 aspect-square bg-[{swatches[1].getHex()}]" ></div> -->
	<section class="col-span-3 md:col-span-1">
		<span class="flex gap-5">
			<h1 class="title">“{name}”</h1>
			{#if data.name.includes('drawing' || 'dibujo')}
				<p class="mt-2 font-sans opacity-75 blur-sm hover:blur-0 transition cursor-default">
					(hecho a mano)
				</p>
			{/if}
		</span>

		<div class="font-sans mt-5 col-span-3">
			<section class="grid gap-2 text-background/70 mb-2">
				<p class="text-foreground opacity-50 uppercase text-xs text-left">Comentarios</p>
				{#each $commentStore as comentario}
					<Comentario {comentario} />
				{/each}
				{#if $commentStore.length === 0}
					<p transition:slide={{duration: 200}} class="text-center text-foreground opacity-20">nadie comentó todavía</p>
				{/if}
			</section>

			<form class="relative" on:submit|preventDefault={() => (isOpen = true)}>
				<textarea
					required
					bind:value={contenidoComentario}
					on:submit={() => handleComment()}
					on:keydown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							handleComment()
						}
					}}
					style="transition: margin 200ms ease-out;"
					placeholder={$commentStore.length === 0 ? "Sé el primer comentario!" : "Algo para decir?"}
					class="resize-y break-words rounded p-3 placeholder:text-foreground/20 transition focus:ring-2 text-foreground/80 ring-foreground/30 outline-none bg-foreground/5 w-full"
				/>
				<button
					type="submit"
					class="absolute bottom-4 right-2 bg-foreground/10 h-9 aspect-square rounded-full hover:bg-foreground/20 backdrop-blur-sm"
				>
					→
				</button>
			</form>
		</div>
	</section>

	<Popup {isOpen} onClose={() => (isOpen = false)}>
		<h3 class="font-bold text-3xl mb-3">Antes de comentar</h3>
		<hr class="opacity-10 mb-3" />
		<form on:submit={() => handleComment()}>
			<label for="name" class="font-sans text-xs opacity-50 uppercase">Tu nombre</label>
			<input
				bind:value={autor}
				required
				autofocus
				autocomplete="off"
				name="name"
				placeholder="Leonel Messi"
				class="font-sans rounded p-3 h-fit placeholder:text-foreground/20 transition focus:ring-2 text-foreground/80 resize-y ring-foreground/30 outline-none bg-foreground/5 w-full"
				type="text"
			/>
			<button type="submit" class="button float-right mt-3"> Comentar </button>
		</form>
	</Popup>
</main>

<style lang="postcss" scoped>
	.render {
		@apply w-full rounded-sm max-h-[720px] object-contain bg-gradient-to-br from-foreground/10;
	}
</style>
