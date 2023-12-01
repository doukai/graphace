<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { ObjectOption } from 'svelte-multiselect';
	import { graphql, GroupInput, Operator } from '$houdini';
	import { ObjectMultiSelect } from '@graphace/ui-graphql';

	export let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
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
			value: GroupInput | (GroupInput | null | undefined)[] | null | undefined;
		};
	}>();

	let searchText: string = '';
	let loading: boolean = false;
	let options: ObjectOption[] = [];
	let selected: ObjectOption[] = [];
	if (Array.isArray(value)) {
		value = value.map((item) => ({ ...item, id: undefined, where: { id: { val: item?.id } } }));
	} else if (value) {
		value = { ...value, id: undefined, where: { id: { val: value.id } } };
	}

	$: if (Array.isArray(value)) {
		selected = value?.map((item) => ({
			label: item?.name || '',
			value: item
		}));
	} else if (value) {
		selected = [{ label: value?.name || '', value: value }];
	} else {
		selected = [];
	}
	const GroupNodesQuery = graphql(`
		query GroupNameListQuery($name: StringExpression) {
			groupList(name: $name) {
				id
				name
				description
				path
				deep
				parentId
			}
		}
	`);

	$: options =
		$GroupNodesQuery.data?.groupList?.map((item) => ({
			label: item?.name || '',
			value: { ...item, id: undefined, where: { id: { val: item?.id } } }
		})) || [];

	$: if (searchText) {
		loading = true;
		GroupNodesQuery.fetch({
			variables: { name: { opr: Operator.LK, val: `%${searchText}%` } }
		}).finally(() => (loading = false));
	} else {
		GroupNodesQuery.fetch({ variables: { name: undefined } }).finally(() => (loading = false));
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
/>
