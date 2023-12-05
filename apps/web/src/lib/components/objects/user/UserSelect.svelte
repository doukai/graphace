<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { ObjectMultiSelect } from '@graphace/ui-graphql';
	import type { ObjectOption } from 'svelte-multiselect';
	import { graphql, UserInput, Operator } from '$houdini';
    import type { UserNameListQueryVariables } from './$houdini'

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

	let searchText: string = '';
	let loading: boolean = false;
	let options: ObjectOption[] = [];
	let selected: ObjectOption[] = [];
	if (Array.isArray(value)) {
		value = value.map((item) => ({ name: item?.name, description: item?.description, lastName: item?.lastName, login: item?.login, email: item?.email, phones: item?.phones, disable: item?.disable, isDeprecated: item?.isDeprecated, version: item?.version, realmId: item?.realmId, createUserId: item?.createUserId, createTime: item?.createTime, updateUserId: item?.updateUserId, updateTime: item?.updateTime, createGroupId: item?.createGroupId, where: { id: { val: item?.id } } }));
	} else if (value) {
		value = { name: value.name, description: value.description, lastName: value.lastName, login: value.login, email: value.email, phones: value.phones, disable: value.disable, isDeprecated: value.isDeprecated, version: value.version, realmId: value.realmId, createUserId: value.createUserId, createTime: value.createTime, updateUserId: value.updateUserId, updateTime: value.updateTime, createGroupId: value.createGroupId, where: { id: { val: value.id } } };
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

    export const _UserNameListQueryVariables: UserNameListQueryVariables = ({ props }) => {
        return { name: undefined }
    }

	const UserNameListQuery = graphql(`
		query UserNameListQuery($name: StringExpression) @load {
			userList(name: $name) {
				id
				name
				description
				lastName
				login
				email
				phones
				disable
				isDeprecated
				version
				realmId
				createUserId
				createTime
				updateUserId
				updateTime
				createGroupId
			}
		}
	`);

	$: options =
		$UserNameListQuery.data?.userList?.map((item) => ({
			label: item?.name || '',
			value: { name: item?.name, description: item?.description, lastName: item?.lastName, login: item?.login, email: item?.email, phones: item?.phones, disable: item?.disable, isDeprecated: item?.isDeprecated, version: item?.version, realmId: item?.realmId, createUserId: item?.createUserId, createTime: item?.createTime, updateUserId: item?.updateUserId, updateTime: item?.updateTime, createGroupId: item?.createGroupId, where: { id: { val: item?.id } } }
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
			UserNameListQuery.fetch({ variables: { name: undefined } }).finally(() => (loading = false));
		}
	}}
/>
