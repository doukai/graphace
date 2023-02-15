<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	export let value: (string | null | undefined)[] | null | undefined;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
	if (!value) {
		value = [];
	}
</script>

<div class="w-full">
	<div
		{id}
		class="{error && error.message ? 'border-2 border-error p-1 rounded-xl' : ''} space-y-5"
	>
		<div class="max-w-lg space-y-4">
			<slot group={value} {readonly} {disabled} />
		</div>
	</div>
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
