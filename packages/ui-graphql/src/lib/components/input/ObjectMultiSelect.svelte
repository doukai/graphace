<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import MultiSelect, { type ObjectOption } from 'svelte-multiselect';
	import '~/components/css/multiselect.css';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let list: boolean | undefined = false;
	export let id: string | null = null;
	export let name: string;
	export let disabled = false;
	export let placeholder: string | null | undefined = undefined;
	export let searchText: string = '';
	export let loading: boolean = false;
	export let options: ObjectOption[] = [];
	export let selected: ObjectOption[] = [];
</script>

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
