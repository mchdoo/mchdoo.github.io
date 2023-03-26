<script lang="ts">
	import { fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { lazyLoad } from '$lib/utils/lazyLoad';
	import { supabaseRealtimeInit } from '$lib/supabaseClient';
	import { beforeNavigate } from '$app/navigation';

	let hoveringRender: { name?: string; active?: boolean } = {active: false};
	let mouse = spring(
		{ x: 0, y: 0 },
		{
			damping: 0.25,
			stiffness: 0.1
		}
	);

	function handleCursor(e: MouseEvent) {
		mouse.set({
			x: e.clientX,
			y: e.clientY + window.scrollY
		});
	}

	supabaseRealtimeInit();

	beforeNavigate((nav)=>{
		setTimeout(()=>{nav}, 200)
	})
</script>

<svelte:head>
	<title>La Galería de Pedro Machado</title>
</svelte:head>

<svelte:body on:mousemove={(e) => handleCursor(e)} />

<section class="grid-cols-1 grid md:grid-cols-4 flex-grow gap-3 px-6 md:p-0">
	<div class="select-none" id="title">
		<h2 class="title">La Galería</h2>
		<p class="text-sm opacity-50 font-sans">
			estos son algunos de mis renders y dibujos. hacé click en alguno y comentá algo!
		</p>
	</div>

	{#if hoveringRender.active}
		<p
			transition:fade
			class="absolute pointer-events-none button font-serif text-foreground bg-background/50"
			style="left:{$mouse.x}px; top: {$mouse.y}px; z-index: 9999;"
		>
			{hoveringRender.name}
		</p>
	{/if}

	<div class="col-span-3 columns-1 md:columns-2 gap-3">
		{#await data.renders}
			<div>
				<p class="font-sans text-center uppercase animate-pulse">Cargando</p>
			</div>
		{:then renders}
			{#each renders as render, index (index)}
				<a href="galeria/{render.name}">
					<img
						alt="render {index}"
						class="render relative z-10 max-h-[450px] w-full object-cover"
						use:lazyLoad={render.url}
						on:focus={() => {}}
						on:mouseover={() => {
							hoveringRender = { name: render.name, active: true };
						}}
						on:mouseleave={() => (hoveringRender.active = false)}
					/>
				</a>
			{/each}
		{/await}
	</div>
</section>

<style lang="postcss" scoped>
	.render {
		@apply rounded-sm ease-out transition bg-foreground/20 duration-500 cursor-pointer mb-3 hover:ring ring-foreground/50 active:scale-90;
	}
	img {
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}
</style>
