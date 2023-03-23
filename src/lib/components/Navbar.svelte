<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { links } from '$lib/links';
</script>

<div
	transition:slide={{ easing: cubicInOut }}
	class="bg-foreground w-full h-fit p-2 grid grid-cols-2 md:grid-cols-4 gap-2 sticky"
>
	{#each links as link, index}
		<a
			href={link.link}
			rel="noreferrer"
			target={link.targetBlank ? '_blank' : ''}
			class="cursor-pointer group grow {link.link ? 'active:scale-95' : 'cursor-not-allowed opacity-50'} transition"
		>
			<div
				class="bg-background font-sans {link.link ? 'hover:bg-accent' : ''} transition-colors h-full relative rounded-sm p-2"
			>
				<h1 class="uppercase">{link.title}</h1>

				<div class="inline-flex gap-1">
					{#if link.sublinks}
						{#each link.sublinks as sublink}
							<a href={sublink.link} target="_blank" rel="noreferrer" class="active:scale-95 border-foreground border rounded-full px-3 p-1 hover:bg-foreground hover:text-background transition">
								<p>{sublink.title}</p>
							</a>
						{/each}
					{/if}
				</div>

				<i
					transition:fly={{ delay: 200 * index, y: -20, easing: cubicInOut }}
					class="absolute right-4 bottom-2">↗</i
				>
			</div>
		</a>
	{/each}
</div>