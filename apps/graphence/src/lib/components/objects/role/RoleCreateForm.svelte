<script lang="ts">
	import { createEventDispatcher, getContext  } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import UserSelectItem from '~/lib/components/objects/user/UserSelectItem.svelte';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RoleInput } from '~/lib/types/schema';

	export let node: RoleInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	const buildGraphQLErrors = getContext('buildGraphQLErrors') as GraphQLErrorsFunction;
	const buildGlobalGraphQLErrorMessage = getContext('buildGlobalGraphQLErrorMessage') as GlobalGraphQLErrorMessageFunction;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: RoleInput;
			then: (data: RoleInput | null | undefined) => void;
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
				args: {},
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
</script>

<Form
	title={$LL.graphql.objects.Role.name()}
	showRemoveButton={permissions.auth('Role::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
	showGotoSelectButton={permissions.auth('Role::*::WRITE') && showGotoSelectButton}
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
	on:gotoSelect
	on:back
>
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
	<ObjectItem name="permissions"  path="_/permissions" label={$LL.graphql.objects.Role.fields.permissions.name()} errors={errors.permissions} on:gotoField />
	{/if}
	{#if permissions.auth('Role::realm::*')}
	<ObjectItem name="realm" namedStruct={node.realm} path="_/realm" label={$LL.graphql.objects.Role.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>