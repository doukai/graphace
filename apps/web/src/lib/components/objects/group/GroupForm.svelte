<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql';
	import GroupSelect from './GroupSelect.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Group, GroupInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: Group | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: GroupInput;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: GroupInput | null;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			let args = { ...node };
			// args.parent = undefined;
			// args.subGroups = undefined;
			args.users = undefined;
			args.roles = undefined;
			args.realm = undefined;
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
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('Group::*::WRITE') && showUnbindButton}
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
		<FormLoading rows={10} />
	{:else if node}
		{#if permissions.auth('Group::name::*')}
			<StringItem
				label={$LL.graphql.objects.Group.fields.name.name()}
				name="name"
				bind:value={node.name}
				errors={errors.name}
			/>
		{/if}
		{#if permissions.auth('Group::description::*')}
			<StringItem
				label={$LL.graphql.objects.Group.fields.description.name()}
				name="description"
				bind:value={node.description}
				errors={errors.description}
			/>
		{/if}
		{#if permissions.auth('Group::path::*')}
			<StringItem
				label={$LL.graphql.objects.Group.fields.path.name()}
				name="path"
				bind:value={node.path}
				errors={errors.path}
			/>
		{/if}
		{#if permissions.auth('Group::deep::*')}
			<IntItem
				label={$LL.graphql.objects.Group.fields.deep.name()}
				name="deep"
				bind:value={node.deep}
				errors={errors.deep}
			/>
		{/if}
		{#if permissions.auth('Group::parentId::*')}
			<StringItem
				label={$LL.graphql.objects.Group.fields.parentId.name()}
				name="parentId"
				bind:value={node.parentId}
				errors={errors.parentId}
			/>
		{/if}
		{#if permissions.auth('Group::parent::*')}
			<!-- <ObjectItem name="parent" namedStruct={ node.parent } path={`${node.id}/parent`} label={$LL.graphql.objects.Group.fields.parent.name()} errors={errors.parent} on:gotoField /> -->
			<GroupSelect bind:value={node.parent} />
		{/if}
		{#if permissions.auth('Group::subGroups::*')}
			<!-- <ObjectItem
				name="subGroups"
				namedStruct={node.subGroups}
				path={`${node.id}/sub-groups`}
				label={$LL.graphql.objects.Group.fields.subGroups.name()}
				errors={errors.subGroups}
				on:gotoField
			/> -->
			<GroupSelect bind:value={node.subGroups} list />
		{/if}
		{#if permissions.auth('Group::users::*')}
			<ObjectItem
				name="users"
				namedStruct={node.users}
				path={`${node.id}/users`}
				label={$LL.graphql.objects.Group.fields.users.name()}
				errors={errors.users}
				on:gotoField
			/>
		{/if}
		{#if permissions.auth('Group::roles::*')}
			<ObjectItem
				name="roles"
				namedStruct={node.roles}
				path={`${node.id}/roles`}
				label={$LL.graphql.objects.Group.fields.roles.name()}
				errors={errors.roles}
				on:gotoField
			/>
		{/if}
		{#if permissions.auth('Group::realm::*')}
			<ObjectItem
				name="realm"
				namedStruct={node.realm}
				path={`${node.id}/realm`}
				label={$LL.graphql.objects.Group.fields.realm.name()}
				errors={errors.realm}
				on:gotoField
			/>
		{/if}
	{/if}
</Form>
