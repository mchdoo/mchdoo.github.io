<script lang="ts">
	import Navbar from './Navbar.svelte';
	export let active: boolean = false;
	export const crossed: boolean = active;
	export let onClick: any;
	export let black: boolean = false;
</script>

<div class="relative grid ">
	<button on:click={onClick()} class="grid relative gap-1 justify-items-end">
		<span class="line" class:black class:crossed={"active"} class:active />
		<span class="line left" class:active class:crossed={"active"} class:black />
	</button>
</div>

<style lang="postcss">
	.line {
		@apply h-px w-5 bg-foreground transition duration-300 ease-in-out;
	}
	.active {
		@apply rotate-45 w-5;
	}
	.active.left {
		@apply -rotate-45 -translate-y-1;
	}
	.black {
		@apply bg-background;
	}
</style>
