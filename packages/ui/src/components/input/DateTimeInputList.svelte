<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PlusSm, MinusSm } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	export let name: string;
	export let value: (string | null | undefined)[] | null | undefined;
	export let placeholder: string = '';
	export let className: string = '';
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();

	const addItem = (index: number) => {
		if (!value) {
			value = [];
		}
		value = [...value.slice(0, index + 1), undefined, ...value.slice(index + 1)];
	};

	const removeItem = (index: number) => {
		if (value) {
			value = [...value.slice(0, index), ...value.slice(index + 1)];
		}
	};
</script>

<div class="w-full">
	<div
		{id}
		class="{error && error.message ? 'border-2 border-error p-1 rounded-xl' : ''} space-y-5"
	>
		{#each value || [] as item, index}
			<div class="flex space-x-1">
				<div class="form-control w-full max-w-xs">
					<input
						type="datetime-local"
						id={id + index}
						{name}
						{placeholder}
						class="input input-bordered {error && error.iterms && error.iterms[index]
							? 'input-error'
							: ''} {className}"
						bind:value={item}
						{readonly}
						{disabled}
					/>
					{#if error && error.iterms && error.iterms[index]}
						<label for={id + index} class="label">
							<span class="label-text-alt">
								<p class="text-error">{error.iterms[index].message}</p>
							</span>
						</label>
					{/if}
				</div>
				<div class="tooltip" data-tip={$LL.components.ui.inputList.add()}>
					<button
						class="mt-3 btn btn-xs btn-square btn-outline"
						on:click={(e) => {
							e.preventDefault();
							addItem(index);
						}}
					>
						<Icon src={PlusSm} solid class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip" data-tip={$LL.components.ui.inputList.remove()}>
					<button
						class="mt-3 btn btn-xs btn-square btn-outline"
						on:click={(e) => {
							e.preventDefault();
							removeItem(index);
						}}
					>
						<Icon src={MinusSm} solid class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
		{#if (value || []).length === 0}
			<div class="tooltip" data-tip={$LL.components.ui.inputList.add()}>
				<button
					class="btn btn-square btn-outline"
					on:click={(e) => {
						e.preventDefault();
						addItem(0);
					}}
				>
					<Icon src={Plus} solid class="h-5 w-5" />
				</button>
			</div>
		{/if}
	</div>
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
