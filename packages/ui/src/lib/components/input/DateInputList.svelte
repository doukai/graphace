<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PlusSmall, MinusSmall } from '@steeze-ui/heroicons';

	export let name: string;
	export let value: (string | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let className: string = '';
	export let addBtnClassName: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();

	const dispatch = createEventDispatcher<{
		change: {
			value: (string | null | undefined)[] | null | undefined;
		};
	}>();

	const LL = getContext<Readable<TranslationFunctions>>('LL');

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
	<div {id} class="{errors?.errors ? 'border-2 border-error p-1 rounded-xl' : ''} space-y-2">
		{#each value || [] as item, index}
			<div class="flex items-center space-x-1">
				<div class="form-control w-full">
					<input
						type="date"
						id={id + index}
						{name}
						{placeholder}
						class="input input-bordered {errors?.iterms && errors.iterms[index]
							? 'input-error'
							: ''} {className}"
						bind:value={item}
						on:change={() => {
							dispatch('change', { value });
						}}
						{readonly}
						{disabled}
					/>
					{#if errors?.iterms}
						<label for={id + index} class="label">
							<span class="label-text-alt">
								{#each errors.iterms[index].errors || [] as error}
									<p class="text-error">{error.message}</p>
								{/each}
							</span>
						</label>
					{/if}
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui.inputList.add()}>
					<button
						class="btn btn-xs btn-square btn-outline"
						on:click|preventDefault={(e) => {
							addItem(index);
						}}
					>
						<Icon src={PlusSmall} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui.inputList.remove()}>
					<button
						class="btn btn-xs btn-square btn-outline"
						on:click|preventDefault={(e) => {
							removeItem(index);
						}}
					>
						<Icon src={MinusSmall} class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
		{#if (value || []).length === 0}
			<div class="tooltip flex items-center" data-tip={$LL.ui.inputList.add()}>
				<button
					class="btn btn-square btn-outline {addBtnClassName}"
					on:click|preventDefault={(e) => {
						addItem(0);
					}}
				>
					<Icon src={Plus} class="h-5 w-5" />
				</button>
			</div>
		{/if}
	</div>
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
