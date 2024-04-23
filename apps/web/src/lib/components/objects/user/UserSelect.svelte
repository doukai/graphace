<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { ObjectMultiSelect } from '@graphace/ui-graphql';
	import type { ObjectOption } from 'svelte-multiselect';
	import { graphql, UserInput, Operator } from '$houdini';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
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
	
	let _value = value;
	if (Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		value = { where: { id: { val: value.id } } };
	}

	let searchText: string = '';
	let loading: boolean = false;
	let options: ObjectOption[] = [];
	let selected: ObjectOption[] = [];

	$: if (Array.isArray(_value)) {
		selected = _value?.map((item) => ({
			label: item?.name || '',
			value: { where: { id: { val: item?.id } } }
		}));
	} else if (_value) {
		selected = [{ label: _value?.name || '', value: { where: { id: { val: _value.id } } } }];
	} else {
		selected = [];
	}

	$: options =
		$UserNameListQuery.data?.userList?.map((item) => ({
			label: item?.name || '',
			value: { where: { id: { val: item?.id } } }
		})) || [];

	$: if (searchText) {
		loading = true;
		UserNameListQuery.fetch({
			variables: { name: { opr: Operator.LK, val: `%${searchText}%` } }
		}).finally(() => (loading = false));
	}
</script>

<ObjectMultiSelect
	{list}
	{id}
	{name}
	{disabled}
	{readonly}
	{placeholder}
	{errors}
	{className}
	bind:selected
	bind:options
	bind:searchText
	{loading}
	on:change={(e) => {
		if (e.detail.type === 'add') {
			if (list && Array.isArray(value)) {
				value = [...value, e.detail.option.value];
			} else if (list) {
				value = [e.detail.option.value];
			} else {
				value = e.detail.option.value;
			}
		} else if (e.detail.type === 'remove') {
			if (list && Array.isArray(value)) {
				value = [
					...value.filter((item) => item?.where?.id?.val !== e.detail.option.value?.where?.id?.val)
				];
			} else {
				value = undefined;
			}
		} else if (e.detail.type === 'removeAll') {
			value = undefined;
		}
		dispatch('change', { value });
	}}
	on:open={(e) => {
		if (searchText) {
			loading = true;
			UserNameListQuery.fetch({
				variables: { name: { opr: Operator.LK, val: `%${searchText}%` } }
			}).finally(() => (loading = false));
		} else {
			UserNameListQuery.fetch({ variables: { name: undefined, first: 10 } }).finally(() => (loading = false));
		}
	}}
/>
