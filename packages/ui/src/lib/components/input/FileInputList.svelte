<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import type { Errors, FileInfo } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, MinusSmall } from '@steeze-ui/heroicons';

	export let name: string | undefined = undefined;
	export let value: (FileInfo | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let downloadUrl = '/download';
	export let id: string | undefined = nanoid();
	let className: string | undefined = 'file-input-bordered w-full';
	export { className as class };

	const contextClass = getContext<string>('ui.input-list') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		upload: {
			file: File;
			then: (data: FileInfo | null | undefined) => void;
		};
	}>();

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

<div {id} class="{errors?.errors ? 'border-2 border-error' : ''} space-y-2">
	{#each value || [] as item, index}
		<div class="flex justify-between">
			{#if item}
				<a href={downloadUrl + '/' + item.id} class="link" download>{item.name}</a>
			{:else}
				<input
					type="file"
					id={id + index}
					{name}
					{placeholder}
					class="file-input {errors?.iterms && errors.iterms[index]
						? 'file-input-error'
						: ''} {className} {contextClass}"
					on:change={(e) => {
						if (e.currentTarget?.files?.[0]) {
							dispatch('upload', {
								file: e.currentTarget.files[0],
								then: (data) => {
									item = data;
								}
							});
						}
					}}
					{readonly}
					{disabled}
				/>
			{/if}
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
	<div class="tooltip flex items-center" data-tip={$LL.ui.inputList.add()}>
		<button
			class="btn btn-square btn-outline w-full"
			on:click|preventDefault={(e) => {
				addItem(value.length);
			}}
		>
			<Icon src={Plus} class="h-5 w-5" />
		</button>
	</div>
</div>
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
