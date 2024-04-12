<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import UserSelectItem from '~/lib/components/objects/user/UserSelectItem.svelte';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Role, RoleInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: Role | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: RoleInput;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: RoleInput | null;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			let args = { ...node };
			dispatch('mutation', {
				args: args,
				then: (data) => {
					node = data;
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
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
				args: { where: { id: { val: node.id } }, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				then: (data) => {
					notifications.success($LL.web.message.unbindSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.unbindFailed());
				}
			});
		}
	};
</script>

<Form
	title={$LL.graphql.objects.Role.name()}
	showRemoveButton={permissions.auth('Role::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('Role::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('Role::*::WRITE') && showGotoSelectButton}
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
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.unbindModalTitle(),
			buttonName: $LL.web.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbind();
				return true;
			},
			button1: {
				name: $LL.web.components.table.removeBtn(),
				className: 'btn-error',
				onClick: () => {
					remove();
					return true;
				}
			}
		})}
	on:gotoSelect
	on:back
>
	{#if isFetching}
		<FormLoading rows={7} />
	{:else}
		{#if node}
			{#if permissions.auth('Role::name::*')}
			<StringItem label={$LL.graphql.objects.Role.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
			{/if}
			{#if permissions.auth('Role::description::*')}
			<StringItem label={$LL.graphql.objects.Role.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
			{/if}
			{#if permissions.auth('Role::users::*')}
			<UserSelectItem
				name="users"
				label={$LL.graphql.objects.Role.fields.users.name()}
				errors={errors.users}
				bind:value={node.users}
				list
			/>
			{/if}
			{#if permissions.auth('Role::groups::*')}
			<GroupSelectItem
				name="groups"
				label={$LL.graphql.objects.Role.fields.groups.name()}
				errors={errors.groups}
				bind:value={node.groups}
				list
			/>
			{/if}
			{#if permissions.auth('Role::composites::*')}
			<RoleSelectItem
				name="composites"
				label={$LL.graphql.objects.Role.fields.composites.name()}
				errors={errors.composites}
				bind:value={node.composites}
				list
			/>
			{/if}
			{#if permissions.auth('Role::permissions::*')}
			<ObjectItem name="permissions"  path={`${node.id}/permissions`} label={$LL.graphql.objects.Role.fields.permissions.name()} errors={errors.permissions} on:gotoField />
			{/if}
			{#if permissions.auth('Role::realm::*')}
			<ObjectItem name="realm" namedStruct={ node.realm } path={`${node.id}/realm`} label={$LL.graphql.objects.Role.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
