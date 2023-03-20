<script lang="ts">
	import type { Comentario } from '$lib/types';

	export let comentario: Comentario;
</script>

<div
	class="shadow-2xl shadow-foreground/5 flex flex-col gap-1 rounded p-4 bg-foreground/5 border-foreground/10 border text-foreground"
>
	<div class="mb-3 flex flex-col gap-1">
		<p class="text-xs opacity-50">
			{new Date(comentario.created_at).toLocaleDateString('en-US', {
				day: '2-digit',
				weekday: 'long',
				month: 'short',
				year: 'numeric'
			})}
		</p>
		<div class="col-span-5 flex items-baseline gap-2">
			{#if comentario.autor == 'Pedro'}
				<img
					class="bg-background p-1 self-start rounded-full"
					width="24px"
					src="/gradient-star.png"
					alt="ico"
				/>
			{/if}
			<h2 class="opacity-70 font-serif font-bold">{comentario.autor}</h2>
		</div>
	</div>
	<h4 class="font-bold text-xl">
		{comentario.contenido}
	</h4>
</div>
