<script lang="ts">
	export let last: boolean | undefined = false;
</script>

<slot />
{#if !last}
	<div class="divider col-span-full my-0" />
{/if}
