<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { IDItem, StringItem, ObjectItem } from '@graphace/ui-graphql';
	import PermissionTypeItem from '~/lib/components/enums/permission-type/PermissionTypeItem.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Permission, PermissionInput } from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let node: Permission | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: PermissionInput;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: PermissionInput | null;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			let args = { ...node };
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
				args: { where: { name: { val: node.name } }, isDeprecated: true },
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
	title={$LL.graphql.objects.Permission.name()}
	showRemoveButton={auth('Permission::*::WRITE') && showRemoveButton}
	showUnbindButton={auth('Permission::*::WRITE') && showUnbindButton}
	showGotoSelectButton={auth('Permission::*::WRITE') && showGotoSelectButton}
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
			{#if auth('Permission::name::*')}
			<IDItem label={$LL.graphql.objects.Permission.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
			{/if}
			{#if auth('Permission::description::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
			{/if}
			{#if auth('Permission::field::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.field.name()} name="field" bind:value={node.field} errors={errors.field} />
			{/if}
			{#if auth('Permission::type::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
			{/if}
			{#if auth('Permission::permissionType::*')}
			<PermissionTypeItem label={$LL.graphql.objects.Permission.fields.permissionType.name()} name="permissionType" bind:value={node.permissionType} errors={errors.permissionType} />
			{/if}
			{#if auth('Permission::roles::*')}
			<ObjectItem name="roles" namedStruct={ node.roles } path={`${node.name}/roles`} label={$LL.graphql.objects.Permission.fields.roles.name()} errors={errors.roles} on:gotoField />
			{/if}
			{#if auth('Permission::realm::*')}
			<ObjectItem name="realm" namedStruct={ node.realm } path={`${node.name}/realm`} label={$LL.graphql.objects.Permission.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
