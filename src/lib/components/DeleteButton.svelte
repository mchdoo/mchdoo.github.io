<script lang="ts">
	import { fly } from 'svelte/transition';

	let confirmed = false;

	export let onConfirm: ()=>void;
</script>

<button
	on:click={() => {
		if(!confirmed) {
			confirmed = true
			return
		}
		onConfirm()
	}}
	transition:fly={{ x: 10, duration: 150 }}
	class="absolute top-0 right-0 opacity-50 hover:opacity-70 p-2 bg-foreground/10 rounded-full"
>
	{#if !confirmed}
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="css-i6dzq1"
			><polyline points="3 6 5 6 21 6" /><path
				d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
			/><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg
		>
	{:else}
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="css-i6dzq1"><polyline points="20 6 9 17 4 12" /></svg
		>
	{/if}
</button>

<style lang="postcss">
	svg {
		@apply h-4 w-4 stroke-white;
	}
</style>
