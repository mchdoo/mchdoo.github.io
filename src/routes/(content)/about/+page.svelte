<script>
	import { slide } from "svelte/transition";


	let cosas = [
		{ hovering: false, title: 'desarrollo web', desc: 'esta página!' },
		{ hovering: false, title: 'diseño UI / UX', desc: 'esta página también! pero también móbil' },
		{ hovering: false, title: 'Videografía y musicalización', desc: 'mirá mi youtube!' },
		{ hovering: false, title: 'Edición de video', desc: 'mirá mi youtube!' },
		{ hovering: false, title: 'Colorización', desc: 'para que se vea todo lindo :)' },
		{ hovering: false, title: 'renderizado en 3D', desc: 'mirá miu youtube!' }
	];
</script>

<section class="grid grid-cols-4 gap-5 items-start">
	<span class="col-span-2 grid grid-cols-2 items-center gap-5">
		<img class="" src="/gradient-star.png" alt="Estrella degradado" />
		<div class="col-span-1">
			<h2 class="title">Hola!</h2>
			<p class="font-sans text-lg">Soy Pedro, de Necochea, y me gusta hacer un par de cosas...</p>
			<img class="w-2/3 mx-auto mt-5" src="/arrow.svg" alt="arrow" />
		</div>
	</span>
	<ul class="text-2xl grid gap-5">
		{#each cosas as cosa}
			<li class="item" on:mouseenter={() => cosa.hovering = true} on:mouseleave={() => cosa.hovering = false} id="item">{cosa.title}</li>
			{#if cosa.hovering}
				<p transition:slide class="bg-foreground text-background font-sans uppercase text-lg p-3 rounded-sm">{cosa.desc}</p>
			{/if}
		{/each}
	</ul>
	<ul>
		<h2 class="title">Encontrame acá</h2>

		<li class="link">YouTube</li>
		<li class="link">Instagram</li>
		<li class="link">GMail</li>
		<li class="link">Behance</li>
		<li class="link">GitHub</li>
	</ul>
</section>

<style scoped lang="postcss">
	.link {
		@apply font-sans uppercase hover:underline;
	}
	.item {
		@apply block opacity-70 hover:opacity-100 font-bold transition-all font-serif first-letter:capitalize ;
	}
</style>
