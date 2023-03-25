<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import MenuIcon from "./MenuIcon.svelte";


	export let isOpen: boolean = true;
	export let onClose: () => void;
</script>

{#if isOpen}
	<div
    transition:fade={{duration: 150}}
    class="-inset-0 fixed backdrop-brightness-50 z-50 grid place-content-center items-center justify-center
    "
	>
    <span class="flex justify-center">
        
        <MenuIcon onClick={onClose} active/>
    </span>

    <div transition:fly={{y: 30, duration: 400, easing: cubicOut}} class="p-6 mt-3 rounded-md bg-background shadow-xl shadow-background/20">
        <slot></slot>
    </div>
	</div>
{/if}
