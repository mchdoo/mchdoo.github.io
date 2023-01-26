<script lang="ts">
	export let title: string;
</script>

<div
	class="grid border-t-foreground/10 border-t bg-gradient-to-tr to-foreground/20 from-foreground/60 text-foreground p-6 py-10 rounded-md justify-end gap-3 mb-3 "
>
	<h2 class="text-5xl text-right font-light uppercase">{title}</h2>
	<p class=" text-xl italic text-justify opacity-70">
		<slot />
	</p>
</div>
