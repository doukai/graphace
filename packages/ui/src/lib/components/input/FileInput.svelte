<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MinusSmall } from '@steeze-ui/heroicons';
	import { nanoid } from 'nanoid';
	import type { Errors, FileInfo } from '@graphace/commons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { Dialog } from '~';

	export let name: string | undefined = undefined;
	export let value: FileInfo | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let downloadUrl = '/download';
	export let id: string | undefined = nanoid();
	let className: string | undefined = '';
	export { className as class };
	export let open: (() => void) | undefined = undefined;

	const contextClass = getContext<string>('ui.input') || '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		upload: {
			file: File;
			then: (value: FileInfo | null | undefined) => void;
		};
	}>();
</script>

<div
	data-element="file-input"
	data-part="root"
	class="grid min-w-0 overflow-hidden {contextClass} {className}"
>
	{#if value}
		<div data-element="file" class="flex items-center justify-between">
			{#if value.contentType.split(';')[0].trim().startsWith('image/')}
				<a data-part="link" href={undefined} class="link" on:click={(e) => open()}>
					{value.name}
				</a>
			{:else}
				<a data-part="link" href={downloadUrl + '/' + value.id} class="link" download>
					{value.name}
				</a>
			{/if}
			<div data-part="delete" class="tooltip grid h-12" data-tip={$LL.ui.inputList.remove()}>
				<button
					data-part="btn-delete"
					class="btn btn-xs btn-square btn-outline place-self-center"
					on:click|preventDefault={(e) => {
						value = null;
					}}
				>
					<Icon data-part="icon-delete" src={MinusSmall} class="h-5 w-5" />
				</button>
			</div>
		</div>
	{:else}
		<input
			data-part="input"
			type="file"
			{id}
			{name}
			{placeholder}
			class="file-input {errors?.errors ? 'file-input-error' : ''} file-input-bordered w-full"
			on:change={(e) => {
				if (e.currentTarget?.files?.[0]) {
					dispatch('upload', {
						file: e.currentTarget.files[0],
						then: (fileInfo) => {
							value = fileInfo;
						}
					});
				}
			}}
			{readonly}
			{disabled}
		/>
	{/if}
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
<Dialog title={$LL.ui.button.preview()} class="[&_[data-part=modal-box]]:max-w-full" bind:open>
	{#if value.contentType.split(';')[0].trim().startsWith('image/')}
		<img
			data-part="preview-image"
			src={downloadUrl + '/' + value.id}
			alt={value.name}
			class="w-full"
		/>
	{/if}
</Dialog>
