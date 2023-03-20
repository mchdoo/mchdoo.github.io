<script lang="ts">
	// @ts-nocheck
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	let hoveringRender: { name: string; active?: boolean } = {};
	let mouse: { x: number; y: number } = {};

	function handleCursor(e: MouseEvent) {
		mouse = {
			x: e.clientX,
			y: e.clientY + window.scrollY
		};
	}

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log(entry.target);
					entry.target.classList.add('show');
					entry.target.classList.remove('hide');
				} else {
					entry.target.classList.add('hide');
					entry.target.classList.remove('show');
				}
			});
			observer.unobserve(entry.target);
			observer.disconnect();
		});
		document.querySelectorAll('.render').forEach((el) => observer.observe(el));
	});
</script>

<svelte:head>
	<title>La Galería</title>
</svelte:head>

<svelte:body on:mousemove={(e) => handleCursor(e)} />

<section class="grid-cols-1 grid md:grid-cols-4 flex-grow gap-5">
	<div class="select-none" id="title">
		<h2 class="title">La Galería</h2>
		<p class="text-sm opacity-50 font-sans">
			estos son algunos de mis renders y dibujos. hacé click en alguno y comentá algo!
		</p>
	</div>

	<div class="col-span-3 columns-1 md:columns-2 gap-2">
		{#await data.renders}
			<div>
				<p>Esperame dos segundos.</p>
			</div>
		{:then renders}
			{#if hoveringRender.active}
				<p
					transition:slide
					class="absolute pointer-events-none button font-serif text-foreground bg-background/50"
					style="left:{mouse.x}px; top: {mouse.y}px; z-index: 9999;"
				>
					{hoveringRender.name}
				</p>
			{/if}
			{#each renders as render, index (index)}
				<a href="galeria/{render.name}">
					<img
						class="render relative z-10 max-h-[450px] w-full object-cover"
						src={render.url}
						alt="render {index}"
						on:focus={() => {}}
						on:mouseover={(e) => {
							hoveringRender = { name: render.name, active: true };
						}}
						on:mouseleave={() => (hoveringRender.active = false)}
					/>
				</a>
			{/each}
		{/await}
		{#if data.error}
			<h1 class="font-bold text-amber-400 text-3xl">Hubo un error!</h1>
			<p>{data.error}</p>
		{/if}
	</div>
</section>

<style lang="postcss" scoped>
	.render {
		@apply rounded-sm ease-out transition bg-foreground/20 duration-500 cursor-pointer mb-2 hover:ring ring-foreground/50 active:scale-90;
	}
</style>
