<script lang="ts">
	import type { Errors } from '@graphace/commons';

	export let errors: Errors | undefined = undefined;
	export let id: string | undefined = undefined;
</script>

{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
