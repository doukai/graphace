<script lang="ts">
	import { createEventDispatcher, getContext  } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, IntItem, ObjectItem } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput } from '~/lib/types/schema';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/lib/utils/validate-util';
	import { permissions } from '~/lib/utils/auth-util';

	export let node: GroupInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

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
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
	<ObjectItem name="parent" namedStruct={node.parent} path="_/parent" label={$LL.graphql.objects.Group.fields.parent.name()} errors={errors.parent} on:gotoField />
	{/if}
	{#if permissions.auth('Group::subGroups::*')}
	<ObjectItem name="subGroups" namedStruct={node.subGroups} path="_/sub-groups" label={$LL.graphql.objects.Group.fields.subGroups.name()} errors={errors.subGroups} on:gotoField />
	{/if}
	{#if permissions.auth('Group::users::*')}
	<ObjectItem name="users" namedStruct={node.users} path="_/users" label={$LL.graphql.objects.Group.fields.users.name()} errors={errors.users} on:gotoField />
	{/if}
	{#if permissions.auth('Group::roles::*')}
	<ObjectItem name="roles" namedStruct={node.roles} path="_/roles" label={$LL.graphql.objects.Group.fields.roles.name()} errors={errors.roles} on:gotoField />
	{/if}
	{#if permissions.auth('Group::realm::*')}
	<ObjectItem name="realm" namedStruct={node.realm} path="_/realm" label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
	{/if}
</Form>