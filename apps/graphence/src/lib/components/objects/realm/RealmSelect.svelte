<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { namedQueryStore } from '~/utils';
	import type { RealmInput } from '~/lib/types/schema';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
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

	const query = { fieldName: 'realmList', idName: 'id' };

	$: options =
		$namedQueryStore.response.data?.realmList?.map((item) => ({
			label: item?.name,
			value: item?.id,
			node: item
		})) || [];

	$: loading = $namedQueryStore.isFetching;

	$: if (Array.isArray(value)) {
		if (value.some((item) => !item?.name && item?.id)){
			namedQueryStore
				.fetch(query, {
					id: { opr: 'IN', arr: value?.map((item) => item?.id) }
				})
				.then((response) => {
					value = response.data?.realmList;
					selected = value?.map((item) => ({
						label: item?.name,
						value: item?.id,
						node: item
					}));
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
			namedQueryStore
				.fetch(query, { id: { opr: 'EQ', val: value.id } })
				.then((response) => {
					value = response.data?.realmList?.[0];
					selected = { label: value?.name, value: value?.id, node: value  };
				});
		} else {
			selected = { label: value?.name, value: value.id, node: value  };
		}
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
			namedQueryStore.fetch(query, { name: { opr: 'LK', val: `%${e.detail.searchValue}%` } });
		} else {
			namedQueryStore.fetch(query, { name: undefined, first: 10 });
		}
	}}
/>
