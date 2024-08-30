<script lang="ts">
	import type { Errors, FileInfo } from '@graphace/commons';
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { nanoid } from 'nanoid';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MinusSmall } from '@steeze-ui/heroicons';
	export let name: string;
	export let value: FileInfo | null | undefined;
	export let placeholder: string = '';
	export let className: string = '';
	export let linkClassName: string = '';
	export let addBtnClassName: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let downloadUrl = '/download';
	export let id: string = nanoid();
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const dispatch = createEventDispatcher<{
		upload: {
			file: File;
			then: (data: FileInfo | null | undefined) => void;
		};
	}>();
</script>

<div class="form-control w-full">
	{#if value}
		<div class="input input-bordered flex items-center justify-between w-full {linkClassName}">
			<a href={downloadUrl + '/' + value.id} class="link" download>{value.name}</a>
			<div class="tooltip flex iterms-center ml-1" data-tip={$LL.ui.inputList.remove()}>
				<button
					class="btn btn-xs btn-square btn-outline {addBtnClassName}"
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
			class="file-input file-input-bordered {errors?.errors ? 'file-input-error' : ''} {className}"
			on:change={(e) => {
				if (e.currentTarget?.files?.[0]) {
					dispatch('upload', {
						file: e.currentTarget.files[0],
						then: (data) => {
							value = data;
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
</div>
