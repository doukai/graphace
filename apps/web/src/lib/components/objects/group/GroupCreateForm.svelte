<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import UserSelectItem from '~/lib/components/objects/user/UserSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { GroupInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: GroupInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: GroupInput;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				then: (data) => {
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back', {});
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: {},
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back', {});
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};
</script>

<Form
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={permissions.auth('Group::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:save={(e) => save()}
	on:remove={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.removeModalTitle(),
			buttonName: $LL.web.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				remove();
				return true;
			}
		})}
	on:gotoSelect
	on:back
>
	{#if permissions.auth('Group::name::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
	{/if}
	{#if permissions.auth('Group::description::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
	{/if}
	{#if permissions.auth('Group::path::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.path.name()} name="path" bind:value={node.path} errors={errors.path} />
	{/if}
	{#if permissions.auth('Group::deep::*')}
	<IntItem label={$LL.graphql.objects.Group.fields.deep.name()} name="deep" bind:value={node.deep} errors={errors.deep} />
	{/if}
	{#if permissions.auth('Group::parentId::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.parentId.name()} name="parentId" bind:value={node.parentId} errors={errors.parentId} />
	{/if}
	{#if permissions.auth('Group::parent::*')}
	<GroupSelectItem
		name="parent"
		label={$LL.graphql.objects.Group.fields.parent.name()}
		errors={errors.parent}
		bind:value={node.parent}
	/>
	{/if}
	{#if permissions.auth('Group::subGroups::*')}
	<GroupSelectItem
		name="subGroups"
		label={$LL.graphql.objects.Group.fields.subGroups.name()}
		errors={errors.subGroups}
		bind:value={node.subGroups}
		list
	/>
	{/if}
	{#if permissions.auth('Group::users::*')}
	<UserSelectItem
		name="users"
		label={$LL.graphql.objects.Group.fields.users.name()}
		errors={errors.users}
		bind:value={node.users}
		list
	/>
	{/if}
	{#if permissions.auth('Group::roles::*')}
	<RoleSelectItem
		name="roles"
		label={$LL.graphql.objects.Group.fields.roles.name()}
		errors={errors.roles}
		bind:value={node.roles}
		list
	/>
	{/if}
	{#if permissions.auth('Group::realm::*')}
	<ObjectItem name="realm" namedStruct={node.realm} path="_/realm" label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>