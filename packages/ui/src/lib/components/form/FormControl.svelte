<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';

	export let errors: Errors | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.form-control') || '';
	const id = nanoid();
</script>

<div class="form-control {className} {contextClass}">
	<slot {id} />
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
