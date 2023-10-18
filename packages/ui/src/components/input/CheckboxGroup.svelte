<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	export let value: string | (string | null | undefined)[] | null | undefined;
	export let containerClassName: string = '';
	export let errors: Errors | undefined = undefined;
	export let items: { name: string; value: string | null | undefined; description?: string }[] = [];
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();

	$: if (!value) {
		value = [];
	}
</script>

<div class={containerClassName ? containerClassName : 'w-full'}>
	<div class="{errors?.errors ? 'border-2 border-error p-1 rounded-xl' : ''} space-y-2">
		<div class="max-w-lg space-y-4">
			{#each items as item, row}
				<div class="relative flex items-start">
					<div class="flex items-center h-5">
						<input
							type="checkbox"
							id={id + row}
							value={item.value}
							bind:group={value}
							class="checkbox"
							{readonly}
							{disabled}
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for={id + row} class="font-medium">{item.name}</label>
						{#if item.description}
							<p>{item.description}</p>
						{/if}
					</div>
				</div>
			{/each}
			<slot {readonly} {disabled} />
		</div>
	</div>
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
