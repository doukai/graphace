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
	let className: string | undefined = '';
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

<div data-element="input-file-list" data-part="root" class="{className} {contextClass}">
	<div data-part="list" {id} class="{errors?.errors ? 'border-2 border-error' : ''} space-y-2">
		{#each value || [] as item, index}
			<div data-part="file" class="flex justify-between space-x-1">
				{#if item}
					<a data-part="link" href={downloadUrl + '/' + item.id} class="link" download>
						{item.name}
					</a>
				{:else}
					<input
						data-part="input"
						type="file"
						id={id + index}
						{name}
						{placeholder}
						class="file-input {errors?.iterms && errors.iterms[index]
							? 'file-input-error'
							: ''} file-input-bordered w-full"
						on:change={(e) => {
							if (e.currentTarget?.files?.[0]) {
								dispatch('upload', {
									file: e.currentTarget.files[0],
									then: (fileInfo) => {
										item = fileInfo;
									}
								});
							}
						}}
						{readonly}
						{disabled}
					/>
				{/if}
				<div
					data-part="delete"
					class="tooltip flex items-center"
					data-tip={$LL.ui.inputList.remove()}
				>
					<button
						data-part="btn-delete"
						class="btn btn-xs btn-square btn-outline"
						on:click|preventDefault={(e) => {
							removeItem(index);
						}}
					>
						<Icon data-part="icon-delete" src={MinusSmall} class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
		<div data-part="add" class="tooltip flex items-center" data-tip={$LL.ui.inputList.add()}>
			<button
				data-part="btn-add"
				class="btn btn-xs btn-square btn-outline w-full"
				on:click|preventDefault={(e) => {
					addItem(value?.length || 0);
				}}
			>
				<Icon data-part="icon-add" src={Plus} class="h-5 w-5" />
			</button>
		</div>
	</div>
	{#if errors?.errors}
		<label data-part="label" for={id} class="label">
			{#each errors.errors as error}
				<span data-part="label-text-alt" class="label-text-alt">
					<p data-part="label-text" class="text-error">{error.message}</p>
				</span>
			{/each}
		</label>
	{/if}
</div>
