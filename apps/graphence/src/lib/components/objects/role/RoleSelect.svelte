<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { ObjectMultiSelect } from '@graphace/ui-graphql';
	import type { ObjectOption } from 'svelte-multiselect';
	import { graphql, RoleInput, Operator } from '$houdini';

	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let selected: ObjectOption[] = [];
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
			value: RoleInput | (RoleInput | null | undefined)[] | null | undefined;
		};
	}>();

	const RoleNameListQuery = graphql(`
		query RoleNameListQuery($name: StringExpression, $first: Int) {
			roleList(name: $name, first: $first) {
				id
				name
				description
			}
		}
	`);
	
	if (Array.isArray(value)) {
		selected = value?.map((item) => ({
			label: item?.name || '',
			value: { where: { id: { val: item?.id } } }
		}));
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		selected = [{ label: value?.name || '', value: { where: { id: { val: value.id } } } }];
		value = { where: { id: { val: value.id } } };
	} else {
		selected = [];
	}

	let searchText: string = '';
	let loading: boolean = false;
	let options: ObjectOption[] = [];

	$: options =
		$RoleNameListQuery.data?.roleList?.map((item) => ({
			label: item?.name || '',
			value: { where: { id: { val: item?.id } } }
		})) || [];

	$: if (searchText) {
		loading = true;
		RoleNameListQuery.fetch({
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
			RoleNameListQuery.fetch({
				variables: { name: { opr: Operator.LK, val: `%${searchText}%` } }
			}).finally(() => (loading = false));
		} else {
			RoleNameListQuery.fetch({ variables: { name: undefined, first: 10 } }).finally(() => (loading = false));
		}
	}}
/>
