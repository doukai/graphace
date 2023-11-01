<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import LL from '$i18n/i18n-svelte';
	import type { Group, GroupInput } from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let node: GroupInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: GroupInput;
			then: (data: Group | null | undefined) => void;
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
				args: {},
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
</script>

<Form
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={auth('Group::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={auth('Group::*::WRITE') && showGotoSelectButton}
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
	{#if auth('Group::name::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
	{/if}
	{#if auth('Group::description::*')}
	<StringItem label={$LL.graphql.objects.Group.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
	{/if}
	{#if auth('Group::parent::*')}
	<ObjectItem name="parent" namedStruct={ node.parent } path="_/parent" label={$LL.graphql.objects.Group.fields.parent.name()} errors={errors.parent} on:gotoField />
	{/if}
	{#if auth('Group::subGroups::*')}
	<ObjectItem name="subGroups" namedStruct={ node.subGroups } path="_/sub-groups" label={$LL.graphql.objects.Group.fields.subGroups.name()} errors={errors.subGroups} on:gotoField />
	{/if}
	{#if auth('Group::users::*')}
	<ObjectItem name="users" namedStruct={ node.users } path="_/users" label={$LL.graphql.objects.Group.fields.users.name()} errors={errors.users} on:gotoField />
	{/if}
	{#if auth('Group::roles::*')}
	<ObjectItem name="roles" namedStruct={ node.roles } path="_/roles" label={$LL.graphql.objects.Group.fields.roles.name()} errors={errors.roles} on:gotoField />
	{/if}
	{#if auth('Group::realm::*')}
	<ObjectItem name="realm" namedStruct={ node.realm } path="_/realm" label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>