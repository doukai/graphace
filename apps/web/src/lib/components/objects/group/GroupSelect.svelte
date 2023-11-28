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
		value = value.map((item) => ({ ...item, id: undefined, where: { id: { val: item?.id } } }));
		selected = value?.map((item) => ({
			label: item?.name || '',
			value: item
		}));
	} else if (!list && !Array.isArray(value) && value) {
		value = { ...value, id: undefined, where: { id: { val: value.id } } };
		selected = [{ label: value?.name || '', value: value }];
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
	outerDivClass="input input-bordered"
	liSelectedClass="badge badge-primary"
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
			if (list && Array.isArray(value)) {
				value = undefined;
			}
		}
	}}
/>

<style>
	:global(div.multiselect > ul.selected > li) {
		background: hsl(var(--p) / var(--tw-bg-opacity)) !important;
		color: hsl(var(--pc) / var(--tw-text-opacity)) !important;
	}
	:global(div.multiselect:focus-within) {
		border: var(
			--sms-focus-border,
			1px solid var(--sms-active-color, hsl(var(--bc) / var(--tw-border-opacity)))
		) !important;
	}
</style>
