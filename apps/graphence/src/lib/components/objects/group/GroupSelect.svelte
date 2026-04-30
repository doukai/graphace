<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { createQueryNamed_groupList_Store } from '~/lib/stores/query/query_groupList_store';
	import { loadEvent } from '~/utils';
	import type { GroupInput, QueryGroupListArgs } from '~/lib/types/schema';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryGroupListArgs | undefined = undefined;
	export let first: number | undefined = 10;
	export let selected: Option | Option[] | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let list: boolean | undefined = false;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const dispatch = createEventDispatcher<{
		change: {
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
		};
	}>();

	const queryNamed_groupList_Store = createQueryNamed_groupList_Store($loadEvent);

	$: options =
		$queryNamed_groupList_Store.response.data?.groupList?.map((item) => ({
			label: item?.name,
			value: item?.id,
			node: item
		})) || [];

	$: loading = $queryNamed_groupList_Store.isFetching;

	$: if (Array.isArray(value)) {
		if (value.some((item) => !item?.name && item?.id)){
			queryNamed_groupList_Store
				.fetch({
					id: { opr: 'IN', arr: value?.map((item) => item?.id) }
				})
				.then((response) => {
					value = response.data?.groupList;
				});
		} else {
			selected = value?.map((item) => ({
				label: item?.name,
				value: item?.id,
				node: item
			}))
		}
	} else if (value) {
		if (!value.name && value.id) {
			queryNamed_groupList_Store
				.fetch({ id: { opr: 'EQ', val: value.id } })
				.then((response) => {
					value = response.data?.groupList?.[0];
				});
		} else {
			selected = { label: value?.name, value: value.id, node: value  };
		}
	} else {
		selected = undefined;
	}
</script>

<ObjectSelect
	{id}
	{name}
	bind:value={selected}
	bind:options
	{list}
	{disabled}
	{readonly}
	{placeholder}
	{errors}
	{loading}
	class={className}
	on:change={(e) => {
		if (Array.isArray(e.detail.value)) {
			if (!e.detail.value.length) {
				value = null;
			} else {
				value = e.detail.value.map((item) => ({
					id: item.value,
					name: item.label,
					...item.node
				}));
			}
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { id: e.detail.value.value, name: e.detail.value.label, ...e.detail.value.node };
		} else {
			value = null;
		}
		dispatch('change', { value });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			queryNamed_groupList_Store.fetch(
				{ ...buildArguments(args), name: { opr: 'LK', val: `%${e.detail.searchValue}%` }, first }
			);
		} else {
			queryNamed_groupList_Store.fetch({ ...buildArguments(args), first });
		}
	}}
/>
