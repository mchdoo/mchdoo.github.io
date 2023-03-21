<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { links } from '$lib/links';
	import MenuIcon from '$lib/components/MenuIcon.svelte';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let w: number;
	const MOBILE_SCREEN = 768; /* TailwindCSS "md" breakpoint. */
	let navOpen: boolean = false;
	let alertOpen: boolean;

	onMount(()=>{
		alertOpen = true;
	})
</script>

<svelte:window bind:innerWidth={w} />

<svelte:head>
	<title>PEDRO MACHADO</title>
</svelte:head>

{#if navOpen && w < MOBILE_SCREEN}
	<Navbar />
{/if}
{#if alertOpen}
	<!-- content here -->
	<nav transition:slide class="w-full p-4 bg-foreground/25 flex items-center justify-between">
		<p class="text-foreground font-sans">
			<span class="text-amber-500">⚠</span> Todavía no terminé este portfolio, pero mientras podés visitar la igualmente inconclusa <a
				class="italic underline underline-offset-2"
				href="/galeria">galería!</a
			>
		</p>
		<button class="button" on:click={() => (alertOpen = false)}>entendido</button>
	</nav>
{/if}

<section class="p-10 2xl:px-0 md:pt-24 relative max-w-[1280px] mx-auto">
	{#if w < MOBILE_SCREEN}
		<div class="absolute top-5 right-5">
			<MenuIcon active={navOpen} onClick={() => (navOpen = !navOpen)} />
		</div>
	{/if}
	<img src="/logo.svg" class="invert" alt="Pedro Machado" />
	<img
		class="md:absolute right-16 top-10 animate-spin-slow w-full md:w-auto md:h-2/5 xl:h-1/2"
		src="/gradient-star.png"
		alt="gradient star"
	/>

	<div class="col-span-4 flex items-center justify-between mb-5 md:my-5 select-none">
		<h3 class="italic text-3xl md:text-7xl">artist, designer</h3>
		<h3 class="font-sans uppercase md:text-2xl">de argentina</h3>
	</div>

	{#if w < MOBILE_SCREEN}
		<button
			on:click={() => {
				goto('/galeria');
			}}
			class="button w-full py-5">Ir a Galería →</button
		>
		<button
			on:click={() => {
				let link = links.pop()?.link;

				goto(link ? link : '/galeria');
			}}
			class="button w-full py-5 mt-2 border-foreground border bg-transparent text-foreground"
			>Contactame →</button
		>
	{/if}

	<section class="hidden md:grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
		{#each links as link}
			<a
				href={link.link}
				target={link.targetBlank ? '_blank' : ''}
				rel="noreferrer"
				class="hover:scale-105 transition ease-in font-sans cursor-pointer hover:bg-foreground/10 p-3 rounded-sm {link.standout
					? 'animate-bounce'
					: ''}"
			>
				<h4 class="uppercase">
					{link.title}
					{link.targetBlank ? '↗' : ''}
				</h4>
				{#if link.info}
					<p class="md:block opacity-50">{link.info}</p>
				{/if}
			</a>
		{/each}
	</section>
</section>