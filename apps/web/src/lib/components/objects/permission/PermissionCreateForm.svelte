<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { IDItem, StringItem, ObjectItem } from '@graphace/ui-graphql';
	import PermissionTypeItem from '~/lib/components/enums/permission-type/PermissionTypeItem.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Permission, PermissionInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: PermissionInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: PermissionInput;
			then: (data: Permission | null | undefined) => void;
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
	title={$LL.graphql.objects.Permission.name()}
	showRemoveButton={await $permissions.auth('Permission::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={await $permissions.auth('Permission::*::WRITE') && showGotoSelectButton}
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
	{#if await $permissions.auth('Permission::name::*')}
	<IDItem label={$LL.graphql.objects.Permission.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
	{/if}
	{#if await $permissions.auth('Permission::description::*')}
	<StringItem label={$LL.graphql.objects.Permission.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
	{/if}
	{#if await $permissions.auth('Permission::field::*')}
	<StringItem label={$LL.graphql.objects.Permission.fields.field.name()} name="field" bind:value={node.field} errors={errors.field} />
	{/if}
	{#if await $permissions.auth('Permission::type::*')}
	<StringItem label={$LL.graphql.objects.Permission.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
	{/if}
	{#if await $permissions.auth('Permission::permissionType::*')}
	<PermissionTypeItem label={$LL.graphql.objects.Permission.fields.permissionType.name()} name="permissionType" bind:value={node.permissionType} errors={errors.permissionType} />
	{/if}
	{#if await $permissions.auth('Permission::roles::*')}
	<ObjectItem name="roles" namedStruct={ node.roles } path="_/roles" label={$LL.graphql.objects.Permission.fields.roles.name()} errors={errors.roles} on:gotoField />
	{/if}
	{#if await $permissions.auth('Permission::realm::*')}
	<ObjectItem name="realm" namedStruct={ node.realm } path="_/realm" label={$LL.graphql.objects.Permission.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>