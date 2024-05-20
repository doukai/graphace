<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import UserSelectItem from '~/lib/components/objects/user/UserSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput } from '~/lib/types/schema';
	export let node: GroupInput | null | undefined;
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
			args: GroupInput;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: GroupInput | null;
			then: (data: GroupInput | null | undefined) => void;
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
				args: { where: { id: { val: node.id } }, isDeprecated: true },
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
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('Group::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('Group::*::WRITE') && showGotoSelectButton}
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
		<FormLoading rows={10} />
	{:else}
		{#if node}
			{#if permissions.auth('Group::name::*')}
			<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} readonly={!permissions.auth('Group::name::WRITE')} errors={errors.name} />
			{/if}
			{#if permissions.auth('Group::description::*')}
			<StringItem label={$LL.graphql.objects.Group.fields.description.name()} name="description" bind:value={node.description} readonly={!permissions.auth('Group::description::WRITE')} errors={errors.description} />
			{/if}
			{#if permissions.auth('Group::path::*')}
			<StringItem label={$LL.graphql.objects.Group.fields.path.name()} name="path" bind:value={node.path} readonly={!permissions.auth('Group::path::WRITE')} errors={errors.path} />
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<IntItem label={$LL.graphql.objects.Group.fields.deep.name()} name="deep" bind:value={node.deep} readonly={!permissions.auth('Group::deep::WRITE')} errors={errors.deep} />
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<StringItem label={$LL.graphql.objects.Group.fields.parentId.name()} name="parentId" bind:value={node.parentId} readonly={!permissions.auth('Group::parentId::WRITE')} errors={errors.parentId} />
			{/if}
			{#if permissions.auth('Group::parent::*')}
			<GroupSelectItem
				name="parent"
				label={$LL.graphql.objects.Group.fields.parent.name()}
				errors={errors.parent}
				bind:value={node.parent}
				readonly={!permissions.auth('Group::parent::WRITE')}
			/>
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
			<GroupSelectItem
				name="subGroups"
				label={$LL.graphql.objects.Group.fields.subGroups.name()}
				errors={errors.subGroups}
				bind:value={node.subGroups}
				readonly={!permissions.auth('Group::subGroups::WRITE')}
				list
			/>
			{/if}
			{#if permissions.auth('Group::users::*')}
			<UserSelectItem
				name="users"
				label={$LL.graphql.objects.Group.fields.users.name()}
				errors={errors.users}
				bind:value={node.users}
				readonly={!permissions.auth('Group::users::WRITE')}
				list
			/>
			{/if}
			{#if permissions.auth('Group::roles::*')}
			<RoleSelectItem
				name="roles"
				label={$LL.graphql.objects.Group.fields.roles.name()}
				errors={errors.roles}
				bind:value={node.roles}
				readonly={!permissions.auth('Group::roles::WRITE')}
				list
			/>
			{/if}
			{#if permissions.auth('Group::realm::*')}
			<ObjectItem name="realm" namedStruct={node.realm} path={`${node.id}/realm`} label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
