<script lang="ts">
	// @ts-nocheck
	import { page } from '$app/stores';
import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let renders = [];

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
		});
		document.querySelectorAll('.render').forEach((el) => observer.observe(el));
	});
</script>

<svelte:head>
	<title>La Galería</title>
</svelte:head>

<section class="grid-cols-1 grid md:grid-cols-4 flex-grow gap-5">
	<div class="select-none" id="title">
		<h2 class="title">La Galería</h2>
		<p class="text-xl opacity-50 font-sans">
			estos son algunos de mis renders y dibujos. hacé click en alguno y comentá algo!
		</p>
	</div>

	{#if $page.error}
		<div class="flex justify-center text-red-400">
			<p>Uy... dió error :( ({$page.error.message})</p>
		</div>
	{/if}

	<div class="col-span-3 columns-1 md:columns-2 gap-2">
		{#await data.allResults}
			<p>...</p>
		{:then allRenders}
			{#each allRenders as render, index (index)}
				<a href="galeria/{render.name}">
					<img
						class="render max-h-[450px] w-full object-cover"
						src={render.url}
						bind:this={renders[index]}
						alt="render {index}"
					/>
				</a>
			{/each}
		{/await}
		{#if data.error}
			<h1 class="font-bold text-amber-400 text-3xl">
				Hubo un error!</h1>
			<p>{data.error}</p>
		{/if}
	</div>
</section>

<style lang="postcss" scoped>
	.render {
		@apply rounded-sm ease-out transition bg-foreground/20 duration-500 cursor-pointer mb-2 hover:ring ring-foreground/50 active:scale-90;
	}
</style>
