<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { IDItem, StringItem, ObjectItem } from '@graphace/ui-graphql';
	import PermissionTypeItem from '~/lib/components/enums/permission-type/PermissionTypeItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionInput } from '~/lib/types/schema';
	export let node: PermissionInput | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: PermissionInput;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: PermissionInput | null;
			then: (data: PermissionInput | null | undefined) => void;
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
					notifications.success($LL.graphence.message.saveSuccess());
					dispatch('back', {});
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { where: { name: { val: node.name } }, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.graphence.message.removeSuccess());
					dispatch('back', {});
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.removeFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				then: (data) => {
					notifications.success($LL.graphence.message.unbindSuccess());
					dispatch('back', {});
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.unbindFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};
</script>

<Form
	title={$LL.graphql.objects.Permission.name()}
	showRemoveButton={permissions.auth('Permission::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('Permission::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('Permission::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:save={(e) => save()}
	on:remove={(e) =>
		messageBoxs.open({
			title: $LL.graphence.components.table.removeModalTitle(),
			buttonName: $LL.graphence.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				remove();
				return true;
			}
		})}
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.graphence.components.table.unbindModalTitle(),
			buttonName: $LL.graphence.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbind();
				return true;
			},
			button1: {
				name: $LL.graphence.components.table.removeBtn(),
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
			{#if permissions.auth('Permission::name::*')}
			<IDItem label={$LL.graphql.objects.Permission.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.field.name()} name="field" bind:value={node.field} errors={errors.field} />
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<StringItem label={$LL.graphql.objects.Permission.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<PermissionTypeItem label={$LL.graphql.objects.Permission.fields.permissionType.name()} name="permissionType" bind:value={node.permissionType} errors={errors.permissionType} />
			{/if}
			{#if permissions.auth('Permission::roles::*')}
			<RoleSelectItem
				name="roles"
				label={$LL.graphql.objects.Permission.fields.roles.name()}
				errors={errors.roles}
				bind:value={node.roles}
				list
			/>
			{/if}
			{#if permissions.auth('Permission::realm::*')}
			<ObjectItem name="realm" namedStruct={node.realm} path={`${node.name}/realm`} label={$LL.graphql.objects.Permission.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
