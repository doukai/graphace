<script lang="ts">
	export let rows: number;
</script>

{#each { length: rows } as _}
	<div class="form-control w-full space-y-2">
		<div class="bg-base-200 h-4 w-10 rounded animate-pulse" />
		<div class="bg-base-200 h-10 rounded animate-pulse" />
	</div>
{/each}
