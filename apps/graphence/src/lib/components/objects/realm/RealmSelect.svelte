<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { graphql, RealmInput, Operator } from '$houdini';

	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let selected: Option | Option[] | undefined = undefined;
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
			value: RealmInput | (RealmInput | null | undefined)[] | null | undefined;
		};
	}>();

	const RealmNameListQuery = graphql(`
		query RealmNameListQuery($name: StringExpression, $first: Int) {
			realmList(name: $name, first: $first) {
				id
				name
				description
			}
		}
	`);

	$: options =
		$RealmNameListQuery.data?.realmList?.map((item) => ({
			label: item?.name,
			value: item?.id
		})) || [];

	$: loading = $RealmNameListQuery.fetching;
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
			value = e.detail.value.map((item) => ({ where: { id: { val: item.value } } }));
		} else if (e.detail.value && !Array.isArray(e.detail.value)) {
			value = { where: { id: { val: e.detail.value.value } } };
		} else {
			value = undefined;
		}
		dispatch('change', { value });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			RealmNameListQuery.fetch({
				variables: { name: { opr: Operator.LK, val: `%${e.detail.searchValue}%` } }
			});
		} else {
			RealmNameListQuery.fetch({ variables: { name: undefined, first: 10 } });
		}
	}}
/>
