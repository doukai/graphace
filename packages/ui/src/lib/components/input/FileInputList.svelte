<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import type { Errors, FileInfo } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MinusSmall } from '@steeze-ui/heroicons';
	import { Dialog } from '~';

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
	export let open: (() => void) | undefined = undefined;

	const contextClass = getContext<string>('ui.input-list') || '';
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		upload: {
			file: File[];
			then: (data: (FileInfo | null | undefined)[] | null | undefined) => void;
		};
	}>();

	$: images = value?.filter((fileInfo) =>
		fileInfo.contentType.split(';')[0].trim().startsWith('image/')
	);
</script>

<div
	data-element="file-input-list"
	data-part="root"
	class="min-w-0 overflow-hidden space-y-1 {contextClass} {className}"
>
	{#if value && value.length > 0}
		<div data-part="list" {id} class={errors?.errors ? 'border-2 border-error' : ''}>
			{#each value || [] as item, index}
				<div data-part="file" class="flex items-center justify-between">
					{#if item.contentType.split(';')[0].trim().startsWith('image/')}
						<a data-part="link" href={undefined} class="link" on:click={(e) => open()}>
							{item.name}
						</a>
					{:else}
						<a data-part="link" href={downloadUrl + '/' + item.id} class="link" download>
							{item.name}
						</a>
					{/if}
					<div data-part="delete" class="tooltip grid h-12" data-tip={$LL.ui.inputList.remove()}>
						<button
							data-part="btn-delete"
							class="btn btn-xs btn-square btn-outline place-self-center"
							on:click|preventDefault={(e) => {
								if (value) {
									value = [...value.slice(0, index), ...value.slice(index + 1)];
								}
							}}
						>
							<Icon data-part="icon-delete" src={MinusSmall} class="h-5 w-5" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<input
		data-part="input"
		multiple
		type="file"
		{id}
		{name}
		{placeholder}
		class="file-input {errors?.iterms ? 'file-input-error' : ''} file-input-bordered w-full"
		on:change={(e) => {
			if (e.currentTarget?.files?.length) {
				dispatch('upload', {
					file: Array.from(e.currentTarget.files),
					then: (fileInfo) => {
						if (fileInfo.length) {
							value = [...(value || []), ...fileInfo];
						}
					}
				});
			}
		}}
		{readonly}
		{disabled}
	/>
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
	<div data-part="preview" class="flex gap-2 overflow-x-auto">
		{#each images as image}
			<img
				id={image.id}
				data-part="preview-image"
				src={downloadUrl + '/' + image.id}
				alt={image.name}
				class="carousel-item w-full"
			/>
		{/each}
	</div>
	<div class="flex justify-center w-full py-2 gap-2">
		{#each images as image, index}
			<a href="#{image.id}" class="btn btn-xs">{index + 1}</a>
		{/each}
	</div>
</Dialog>
