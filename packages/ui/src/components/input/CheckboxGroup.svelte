<script context="module" lang="ts">
	export type Checkbox = {
		name: string;
		description?: string;
		value: string | null | undefined;
	};
</script>

<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	export let checkboxs: Checkbox[];
	export let value: (string | null | undefined)[] | null | undefined;
	export let error: Error | undefined = undefined;
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
			{#each checkboxs as checkbox}
				<div class="relative flex items-start">
					<div class="flex items-center h-5">
						<input
							type="checkbox"
							id={checkbox.name}
							bind:group={value}
							class="checkbox"
							value={checkbox.value}
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for={checkbox.name} class="font-medium">{checkbox.name}</label>
						{#if checkbox.description}
							<p>{checkbox.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
