<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	export let url: URL;
</script>

{#key url}
	<div
		in:fly={{ x: 50, duration: 250, delay: 300, easing: cubicOut }}
		out:fly={{ x: -50, duration: 250, easing: cubicIn }}
	>
		<slot />
	</div>
{/key}
