<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { createQueryNamed_realmList_Store } from '~/lib/stores/query/query_realmList_store';
	import { loadEvent } from '~/utils';
	import type { RealmInput, QueryRealmListArgs } from '~/lib/types/schema';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let args: QueryRealmListArgs | undefined = undefined;
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
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
		};
	}>();

	const queryNamed_realmList_Store = createQueryNamed_realmList_Store($loadEvent);

	$: options =
		$queryNamed_realmList_Store.response.data?.realmList?.map((item) => ({
			label: item?.name,
			value: item?.id,
			node: item
		})) || [];

	$: loading = $queryNamed_realmList_Store.isFetching;

	$: if (Array.isArray(value)) {
		if (value.some((item) => !item?.name && item?.id)){
			queryNamed_realmList_Store
				.fetch({
					id: { opr: 'IN', arr: value?.map((item) => item?.id) }
				})
				.then((response) => {
					value = response.data?.realmList;
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
			queryNamed_realmList_Store
				.fetch({ id: { opr: 'EQ', val: value.id } })
				.then((response) => {
					value = response.data?.realmList?.[0];
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
				name: item.label,
				...item.node
			}));
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { id: e.detail.value.value, name: e.detail.value.label, ...e.detail.value.node };
		} else {
			value = null;
		}
		dispatch('change', { value });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			queryNamed_realmList_Store.fetch(
				{ ...buildArguments(args), name: { opr: 'LK', val: `%${e.detail.searchValue}%` }, first }
			);
		} else {
			queryNamed_realmList_Store.fetch({ ...buildArguments(args), first });
		}
	}}
/>
