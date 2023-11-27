<script lang="ts">
	import MultiSelect, { ObjectOption } from 'svelte-multiselect';
	import { graphql, GroupInput, Operator } from '$houdini';
	import { notifications } from '@graphace/ui';
	import LL from '$i18n/i18n-svelte';

	export let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean | undefined = false;

	let searchText: string = '';
	let loading: boolean = false;
	let options: ObjectOption[] = [];
	let selected: ObjectOption[] = [];
	if (list && Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
		selected = value?.map((item) => ({
			label: item?.name || '',
			value: item?.id
		}));
	} else if (!list && !Array.isArray(value) && value) {
		value = { where: { id: { val: value.id } } };
		selected = [{ label: value?.name || '', value: value?.id }];
	}

	const GroupNodesQuery = graphql(`
		query GroupNameListQuery($name: StringExpression) {
			groupList(name: $name) {
				id
				name
			}
		}
	`);

	$: options =
		$GroupNodesQuery.data?.groupList?.map((item) => ({
			label: item?.name || '',
			value: item?.id
		})) || [];

	$: if (searchText) {
		loading = true;
		GroupNodesQuery.fetch({ variables: { name: { opr: Operator.LK, val: `%${searchText}%` } } })
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			})
			.finally(() => (loading = false));
	} else {
		GroupNodesQuery.fetch({ variables: { name: undefined } })
			.catch((errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			})
			.finally(() => (loading = false));
	}
</script>

<MultiSelect
	maxSelect={list ? undefined : 1}
	bind:selected
	bind:options
	bind:searchText
	{loading}
	on:change={(e) => {
		if (e.detail.type === 'add') {
			if (list && Array.isArray(value)) {
				value = [...value, { where: { id: { val: e.detail.option.value } } }];
			} else if (list) {
				value = [{ where: { id: { val: e.detail.option.value } } }];
			} else {
				value = { where: { id: { val: e.detail.option.value } } };
			}
		} else if (e.detail.type === 'remove') {
			if (list && Array.isArray(value)) {
				value = [...value.filter((item) => item?.where?.id?.val !== e.detail.option.value)];
			} else {
				value = undefined;
			}
		} else if (e.detail.type === 'removeAll') {
			if (list && Array.isArray(value)) {
				value = undefined;
			}
		}
	}}
/>
