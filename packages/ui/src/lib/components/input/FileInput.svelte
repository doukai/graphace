<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MinusSmall } from '@steeze-ui/heroicons';
	import { nanoid } from 'nanoid';
	import type { Errors, FileInfo } from '@graphace/commons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let name: string | undefined = undefined;
	export let value: FileInfo | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let downloadUrl = '/download';
	export let id: string | undefined = nanoid();
	let className: string | undefined = 'file-input-bordered w-full';
	export { className as class };

	const contextClass = getContext<string>('ui.input') || '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		upload: {
			file: File;
			then: (value: FileInfo | null | undefined) => void;
		};
	}>();
</script>

{#if value}
	<div class="flex items-center justify-between">
		<a href={downloadUrl + '/' + value.id} class="link" download>{value.name}</a>
		<div class="tooltip flex iterms-center" data-tip={$LL.ui.inputList.remove()}>
			<button
				class="btn btn-xs btn-square btn-outline"
				on:click|preventDefault={(e) => {
					value = null;
				}}
			>
				<Icon src={MinusSmall} class="h-5 w-5" />
			</button>
		</div>
	</div>
{:else}
	<input
		type="file"
		{id}
		{name}
		{placeholder}
		class="file-input {errors?.errors ? 'file-input-error' : ''} {className} {contextClass}"
		on:change={(e) => {
			if (e.currentTarget?.files?.[0]) {
				dispatch('upload', {
					file: e.currentTarget.files[0],
					then: (value) => {
						value = value;
					}
				});
			}
		}}
		{readonly}
		{disabled}
	/>
{/if}
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
