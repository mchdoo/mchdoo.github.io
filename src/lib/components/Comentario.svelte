<script lang="ts">
	import type { Comentario } from '$lib/types';

	export let comentario: Comentario;
</script>

<div
	class="flex flex-col text-foreground mb-3"
>
	<div class="mb-1 flex flex-col gap-1">
		<div class="col-span-5 flex items-center gap-2">
			{#if comentario.autor == 'Pedro'}
			<img
			class="bg-foreground/10 w-6 p-1 self-start rounded-full"
			src="/gradient-star.png"
			alt="ico"
			/>
			{:else}
				<div class="bg-foreground/10 w-6 aspect-square rounded-full"></div> 
			{/if}
			<h2 class="opacity-70 font-bold text-sm">{comentario.autor}</h2>
			<p class="text-xs opacity-30">
				{new Date(comentario.created_at).toLocaleDateString('en-US', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				})}
			</p>
		</div>
	</div>
	<h4 class="font-bold text-lg">
		{comentario.contenido}
	</h4>
</div>
