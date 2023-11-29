<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	export let label: string;
	export let errors: Errors | undefined = undefined;
	const id = nanoid();
</script>

<div class="form-control w-full">
	<label for={id} class="label">
		<span class="label-text text-base-content">{label}</span>
	</label>
	<slot {id} />
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
