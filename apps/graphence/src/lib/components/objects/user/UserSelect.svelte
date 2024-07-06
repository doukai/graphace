<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { Option } from '@graphace/ui';
	import { ObjectSelect } from '@graphace/ui-graphql';
	import { graphql, UserInput, Operator } from '$houdini';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	export let selected: Option | Option[] | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let list: boolean | undefined = false;
	export let id: string | null = null;
	export let name: string;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	export let className: string = '';

	const dispatch = createEventDispatcher<{
		change: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
		};
	}>();

	const UserNameListQuery = graphql(`
		query UserNameListQuery($name: StringExpression, $first: Int) {
			userList(name: $name, first: $first) {
				id
				name
				description
			}
		}
	`);

	if (Array.isArray(value)) {
		selected = value?.map((item) => ({
			label: item?.name,
			value: item?.id
		}));
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		selected = { label: value.name, value: value.id };
		value = { where: { id: { val: value.id } } };
	}

	let loading: boolean = false;
	let options: Option[] = [];

	$: options =
		$UserNameListQuery.data?.userList?.map((item) => ({
			label: item?.name,
			value: item?.id
		})) || [];
</script>

<ObjectSelect
	{list}
	{id}
	{name}
	{disabled}
	{readonly}
	{placeholder}
	{errors}
	{className}
	bind:options
	bind:value={selected}
	{loading}
	on:change={(e) => {
		if (Array.isArray(e.detail.value)) {
			value = e.detail.value.map((item) => ({ where: { id: { val: item.value } } }));
		} else if (e.detail.value) {
			value = { where: { id: { val: e.detail.value.value } } };
		} else {
			value = undefined;
		}
		dispatch('change', { value });
	}}
	on:search={(e) => {
		if (e.detail.searchValue) {
			loading = true;
			UserNameListQuery.fetch({
				variables: { name: { opr: Operator.LK, val: `%${e.detail.searchValue}%` } }
			}).finally(() => (loading = false));
		} else {
			loading = true;
			UserNameListQuery.fetch({ variables: { name: undefined, first: 10 } }).finally(
				() => (loading = false)
			);
		}
	}}
/>
