<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { type StructQueryStores, ObjectSelect } from '@graphace/ui-graphql';
	import type { UserInput } from '~/lib/types/schema';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let list: boolean | undefined = false;
	export let id: string | null = null;
	export let name: string;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	export let className: string = '';
	export let containerClassName: string = '';
	export let tagClassName: string = '';
	export let menuClassName: string = '';

	const dispatch = createEventDispatcher<{
		change: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
		};
	}>();

	const { namedQueryStore } = getContext<StructQueryStores>('structQueryStores');

	$: options =
		$namedQueryStore.response.data?.userList?.map((item) => ({
			label: item?.name,
			value: item?.id
		})) || [];

	$: loading = $namedQueryStore.isFetching;

	let selected: Option | Option[] | undefined;

	if (Array.isArray(value)) {
		selected = value?.map((item) => ({
			label: item?.name,
			value: item?.id
		}));
	} else if (value) {
		selected = { label: value.name, value: value.id };
	}
</script>

<ObjectSelect
	{list}
	{id}
	{name}
	{disabled}
	{readonly}
	{placeholder}
	{errors}
	{loading}
	{className}
	{containerClassName}
	{tagClassName}
	{menuClassName}
	bind:options
	bind:value={selected}
	on:change={(e) => {
		if (Array.isArray(e.detail.value)) {
			value = e.detail.value.map((item) => ({ id: item.value, name: item.label }));
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { id: e.detail.value.value, name: e.detail.value.label };
		} else {
			value = undefined;
		}
		dispatch('change', { value });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			namedQueryStore.fetch(
				{ fieldName: 'userList', idName: 'id' },
				{ name: { opr: 'LK', val: `%${e.detail.searchValue}%` } }
			);
		} else {
			namedQueryStore.fetch(
				{ fieldName: 'userList', idName: 'id' },
				{ name: undefined, first: 10 }
			);
		}
	}}
/>
