<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect, OperatorSelect } from '@graphace/ui-graphql';
	import { namedQueryStore } from '~/utils';
	import type { StringExpression } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let disabled = false;
	export let readonly = false;
	let className: string | undefined = undefined;
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	export let placeholder: string | null | undefined = $LL.ui_graphql.table.th.filterPlaceholder();

	let selected: Option | undefined = undefined;
	let selectedList: Option[] | undefined = undefined;

	const dispatch = createEventDispatcher<{
		change: {
			value: StringExpression | null | undefined;
		};
	}>();

	if (value == null || Object.keys(value).length === 0) {
		value = { opr: 'EQ', val: undefined, arr: [] };
	}

	const oprChange = (): void => {
		value = {
			...value,
			val: undefined,
			arr: undefined
		};
		selected = undefined;
		selectedList = undefined;
	};

	const query = { fieldName: 'groupList', idName: 'id' };

	$: options =
		$namedQueryStore.response.data?.groupList?.map((item) => ({
			label: item?.name,
			value: item?.id,
			node: item
		})) || [];

	$: loading = $namedQueryStore.isFetching;

	$: if (
		value?.arr?.length &&
		(selectedList === undefined ||
			value?.arr?.some((item) => !selectedList?.some((option) => option.value === item)))
	) {
		namedQueryStore.fetch(query, { id: { opr: 'IN', arr: value?.arr } }).then(
			(response) =>
				(selectedList = response.data?.groupList?.map((item) => ({
					label: item?.name,
					value: item?.id,
					node: item
				})))
		);
	} else if (value?.val != null && (selected === undefined || selected.value !== value.val)) {
		namedQueryStore.fetch(query, { id: { opr: 'EQ', val: value?.val } }).then(
			(response) =>
				(selected = response.data?.groupList?.map((item) => ({
					label: item?.name,
					value: item?.id,
					node: item
				}))?.[0])
		);
	}
</script>

{#if value}
	<OperatorSelect bind:value={value.opr} on:change={(e) => oprChange()} />
	{#if value?.opr === 'IN' || value?.opr === 'NIN' || value?.opr === 'BT' || value?.opr === 'NBT'}
		<ObjectSelect
			{id}
			{name}
			list
			{disabled}
			{readonly}
			{placeholder}
			{errors}
			{loading}
			class={className}
			bind:options
			bind:value={selectedList}
			on:change={(e) => {
				if (Array.isArray(e.detail.value)) {
					value = {
						...value,
						val: undefined,
						arr: e.detail.value.map((item) => item.value)
					};
				} else if (!e.detail.value) {
					value = {
						...value,
						val: undefined,
						arr: []
					};
				}
				dispatch('change', { value });
			}}
			on:search={(e) => {
				if (e.detail.searchValue) {
					namedQueryStore.fetch(query, { name: { opr: 'LK', val: `%${e.detail.searchValue}%` } });
				} else {
					namedQueryStore.fetch(query, { name: undefined, first: 10 });
				}
			}}
		/>
	{:else}
		<ObjectSelect
			{id}
			{name}
			{disabled}
			{readonly}
			{placeholder}
			{errors}
			{loading}
			class={className}
			bind:options
			bind:value={selected}
			on:change={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					value = {
						...value,
						val: e.detail.value.value,
						arr: []
					};
				} else if (!e.detail.value) {
					value = {
						...value,
						val: undefined,
						arr: []
					};
				}
				dispatch('change', { value });
			}}
			on:search={(e) => {
				if (e.detail.searchValue) {
					namedQueryStore.fetch(query, { name: { opr: 'LK', val: `%${e.detail.searchValue}%` } });
				} else {
					namedQueryStore.fetch(query, { name: undefined, first: 10 });
				}
			}}
		/>
	{/if}
{/if}