<script lang="ts">
	export let rows: number;
</script>

{#each { length: rows } as _}
	<div class="bg-base-200 px-12 py-12 sm:mt-px sm:pt-2 rounded animate-pulse" />
	<div class="divider" />
{/each}
