<script lang="ts">
	import type {Comentario} from '$lib/types'

	export let comentario: Comentario;
</script>

<div class="shadow-2xl shadow-foreground/10 flex flex-col gap-1 rounded p-4 bg-foreground/90">
	<div class="inline-flex items-center gap-3">
		<img
			class=" self-start rounded-full"
			width="32px"
			src="/gradient-star.png"
			alt="ico"
		/>
		<div class="col-span-5">
				<p class="text-xs opacity-50">
					{new Date(comentario.created_at).toLocaleDateString('es-ar', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
			<h2 class="opacity-80 font-serif font-bold">{comentario.autor} dijo:</h2>
		</div>
	</div>
	<h4 class="font-bold text-xl uppercase">
		"{comentario.contenido}"
	</h4>
</div>
