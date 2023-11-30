<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import MultiSelect, { type ObjectOption } from 'svelte-multiselect';
	import type { Errors } from '@graphace/commons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let list: boolean | undefined = false;
	export let id: string | null = null;
	export let name: string;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	export let searchText: string = '';
	export let loading: boolean = false;
	export let options: ObjectOption[] = [];
	export let selected: ObjectOption[] = [];
	export let errors: Errors | undefined = undefined;
</script>

<div class="form-control w-full">
	{#if readonly}
		<input
			type="text"
			{id}
			{name}
			{placeholder}
			class="input input-bordered"
			value={selected.map((item) => item?.label).join(', ')}
			readonly
		/>
	{:else}
		<MultiSelect
			maxSelect={list ? undefined : 1}
			allowEmpty
			{id}
			{name}
			{disabled}
			{placeholder}
			bind:selected
			bind:options
			bind:searchText
			outerDivClass="input input-bordered"
			liSelectedClass="badge badge-primary"
			createOptionMsg={$LL.uiGraphql.multiSelect.createOptionMsg()}
			defaultDisabledTitle={$LL.uiGraphql.multiSelect.defaultDisabledTitle()}
			disabledInputTitle={$LL.uiGraphql.multiSelect.disabledInputTitle()}
			duplicateOptionMsg={$LL.uiGraphql.multiSelect.duplicateOptionMsg()}
			noMatchingOptionsMsg={$LL.uiGraphql.multiSelect.noMatchingOptionsMsg()}
			removeAllTitle={$LL.uiGraphql.multiSelect.removeAllTitle()}
			removeBtnTitle={$LL.uiGraphql.multiSelect.removeBtnTitle()}
			{loading}
			on:change
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

<style>
	:global(div.multiselect) {
		border: 1pt solid hsl(var(--bc) / var(--tw-border-opacity)) !important;
		border-radius: var(--rounded-btn, 0.5rem) !important;
	}
	:global(div.multiselect > ul.selected > li) {
		background: hsl(var(--p) / var(--tw-bg-opacity)) !important;
		color: hsl(var(--pc) / var(--tw-text-opacity)) !important;
	}
	:global(div.multiselect:focus-within) {
		border: 1pt solid hsl(var(--bc) / var(--tw-border-opacity)) !important;
	}
</style>
