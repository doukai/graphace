<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { type StructQueryStores, ObjectSelect } from '@graphace/ui-graphql';
	import type { RealmInput } from '~/lib/types/schema';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
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
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
			val: string | null | undefined;
			arr: (string | null | undefined)[] | null | undefined;
		};
	}>();

	const { namedQueryStore } = getContext<StructQueryStores>('structQueryStores');
	const query = { fieldName: 'realmList', idName: 'id' };

	$: options =
		$namedQueryStore.response.data?.realmList?.map((item) => ({
			label: item?.name,
			value: item?.id
		})) || [];

	$: loading = $namedQueryStore.isFetching;

	$: if (Array.isArray(value)) {
		if (value.some((item) => item?.id && !item?.where)) {
			value = value.map((item) => ({ where: { id: { val: item?.id } }, name: item?.name }));
		}
		if(value.some((item) => !item?.name)){
			namedQueryStore
				.fetch(query, {
					id: { opr: 'IN', arr: value?.map((item) => item?.where?.id?.val) }
				})
				.then((response) => {
					value = response.data?.realmList?.map((item) => ({
						name: item?.name,
						where: { id: { val: item?.id } }
					}));
					selected = value?.map((item) => ({
						label: item?.name,
						value: item?.where?.id?.val
					}));
				});
		} else {
			selected = value?.map((item) => ({
				label: item?.name,
				value: item?.where?.id?.val
			}))
		}
	} else if (value) {
		if (value?.id && !value.where) {
			value = { where: { id: { val: value.id } }, name: value.name };
		}
		if (!value.name) {
			namedQueryStore
				.fetch(query, { id: { opr: 'EQ', val: value.where?.id?.val } })
				.then((response) => {
					value = response.data?.realmList?.map((item) => ({
						name: item?.name,
						where: { id: { val: item?.id } }
					}))?.[0];
					selected = { label: value?.name, value: value?.where?.id?.val };
				});
		} else {
			selected = { label: value?.name, value: value.where?.id?.val };
		}
	} else if (val) {
		namedQueryStore.fetch(query, { id: { opr: 'EQ', val } }).then(
			(response) =>
				(selected = response.data?.realmList?.map((item) => ({
					label: item?.name,
					value: item?.id
				}))?.[0])
		);
	} else if (arr && arr.length > 0) {
		namedQueryStore.fetch(query, { id: { opr: 'IN', arr } }).then(
			(response) =>
				(selected = response.data?.realmList?.map((item) => ({
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
				where: { id: { val: item.value } },
				name: item.label
			}));
			arr = e.detail.value.map((item) => item.value);
			val = undefined;
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { where: { id: { val: e.detail.value.value } }, name: e.detail.value.label };
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
