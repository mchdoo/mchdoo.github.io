<script lang="ts">
	export let mode: 'flat' | 'duotone' | 'shadow' | undefined;
</script>

<button
	on:click={() => history.back()}
	class="button
	{mode === 'flat' ? 'shadow-none' : ''}
	{mode === 'shadow' ? 'shadow-lg shadow-foreground/20' : ''}
	{mode === 'duotone' ? 'shadow-none bg-foreground/10 hover:bg-foreground/20 text-foreground' : ''}
		h-10 w-10 p-0 rounded-full"
>
	←
</button>
