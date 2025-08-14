<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { namedQueryStore } from '~/utils';
	import type { RoleInput } from '~/lib/types/schema';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let selected: Option | Option[] | undefined = undefined;
	export let val: string | null | undefined = undefined;
	export let arr: (string | null | undefined)[] | null | undefined = [];
	export let errors: Errors | undefined = undefined;
	export let list: boolean | undefined = false;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const dispatch = createEventDispatcher<{
		change: {
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined;
			val: string | null | undefined;
			arr: (string | null | undefined)[] | null | undefined;
		};
	}>();

	const query = { fieldName: 'roleList', idName: 'id' };

	$: options =
		$namedQueryStore.response.data?.roleList?.map((item) => ({
			label: item?.name,
			value: item?.id
		})) || [];

	$: loading = $namedQueryStore.isFetching;

	$: if (Array.isArray(value)) {
		if(value.some((item) => !item?.name)){
			namedQueryStore
				.fetch(query, {
					id: { opr: 'IN', arr: value?.map((item) => item?.id) }
				})
				.then((response) => {
					value = response.data?.roleList;
					selected = value?.map((item) => ({
						label: item?.name,
						value: item?.id
					}));
				});
		} else {
			selected = value?.map((item) => ({
				label: item?.name,
				value: item?.id
			}))
		}
	} else if (value) {
		if (!value.name) {
			namedQueryStore
				.fetch(query, { id: { opr: 'EQ', val: value.id } })
				.then((response) => {
					value = response.data?.roleList?.[0];
					selected = { label: value?.name, value: value?.id };
				});
		} else {
			selected = { label: value?.name, value: value.id };
		}
	} else if (val) {
		namedQueryStore.fetch(query, { id: { opr: 'EQ', val } }).then(
			(response) =>
				(selected = response.data?.roleList?.map((item) => ({
					label: item?.name,
					value: item?.id
				}))?.[0])
		);
	} else if (arr && arr.length > 0) {
		namedQueryStore.fetch(query, { id: { opr: 'IN', arr } }).then(
			(response) =>
				(selected = response.data?.roleList?.map((item) => ({
					label: item?.name,
					value: item?.id
				})))
		);
	}
</script>

<ObjectSelect
	{id}
	{name}
	{list}
	{disabled}
	{readonly}
	{placeholder}
	{errors}
	{loading}
	class={className}
	bind:options
	bind:value={selected}
	on:change={(e) => {
		if (Array.isArray(e.detail.value)) {
			value = e.detail.value.map((item) => ({
				id: item.value,
				name: item.label
			}));
			arr = e.detail.value.map((item) => item.value);
			val = undefined;
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { id: e.detail.value.value, name: e.detail.value.label };
			val = e.detail.value.value;
			arr = [];
		} else {
			value = undefined;
			val = undefined;
			arr = [];
		}
		dispatch('change', { value, val, arr });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			namedQueryStore.fetch(query, { name: { opr: 'LK', val: `%${e.detail.searchValue}%` } });
		} else {
			namedQueryStore.fetch(query, { name: undefined, first: 10 });
		}
	}}
/>
