<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import MenuIcon from '$lib/components/MenuIcon.svelte';
	import GoBack from '$lib/components/GoBack.svelte';

	let opened: boolean;
</script>

{#if opened}
	<Navbar />
{/if}
<main class="w-5/6 max-w-[1080px] mx-auto">
	<nav class="justify-between w-full items-center md:items-center inline-flex my-10">
		<GoBack mode="duotone"/>
		<a href="/" class="opacity-50 hover:opacity-75 transition-opacity">
			<img src="/iso.svg" class="invert h-10" alt="PM" />
		</a>
		<MenuIcon onClick={() => (opened = !opened)} active={opened} />
	</nav>
	<slot />
</main>