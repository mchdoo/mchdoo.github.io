<script lang="ts">

  import { page } from "$app/stores";

</script>

<div class="grid place-content-center h-[calc(50vh)]">
  <h1 class="bold text-5xl">Hubo un <i>error.</i></h1>
  <p class="font-sans opacity-50">Algo malo pasó! ({$page.error?.message})</p>
</div>