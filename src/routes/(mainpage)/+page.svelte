<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { links } from '$lib/links';
	import MenuIcon from '$lib/components/MenuIcon.svelte';
	import { goto } from '$app/navigation';

	let w: number;
	const MOBILE_SCREEN = 768; /* TailwindCSS "md" breakpoint. */
	let navOpen: boolean = false;
</script>

<svelte:window bind:innerWidth={w} />

<svelte:head>
	<title>PEDRO MACHADO</title>
</svelte:head>

{#if navOpen && w < MOBILE_SCREEN}
	<Navbar />
{/if}
<nav class="w-screen p-4 bg-foreground">
	<p class="text-background font-sans">¡Esta página está en proceso! Estoy haciendo un poco siempre que pueda para que quede bien prolijo y poder darlo por terminado. Igualmente, el botoón de contacto funciona... ¡Usalo!</p>
</nav>
<section class="p-10 2xl:px-0 md:pt-24 relative max-w-[1280px] mx-auto">
	{#if w < MOBILE_SCREEN}
		<div class="absolute top-5 right-5">
			<MenuIcon active={navOpen} onClick={() => (navOpen = !navOpen)} />
		</div>
	{/if}
	<img src="/logo.svg" class="invert" alt="Pedro Machado" />
	<img
		class="md:absolute right-12 top-10 animate-spin-slow w-full md:w-auto md:h-2/5 xl:h-1/2"
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
				class="hover:scale-105 transition ease-in font-sans cursor-pointer hover:bg-foreground/10 p-3 rounded-sm {link.standout ? 'animate-bounce' : ''}"
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
