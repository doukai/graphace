<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { getContext } from 'svelte';

	export let errors: Errors | undefined = undefined;
	export let id: string | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.error-labels') || '';
</script>

{#if errors?.errors}
	<label
		data-element="error-labels"
		data-part="root"
		for={id}
		class="label {className} {contextClass}"
	>
		{#each errors.errors as error}
			<span data-part="label-text-alt" class="label-text-alt">
				<p data-part="label-text" class="text-error">{error.message}</p>
			</span>
		{/each}
	</label>
{/if}
