<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, BooleanItem, ObjectItem } from '@graphace/ui-graphql';
	import GroupSelectItem from '~/lib/components/objects/group/GroupSelectItem.svelte';
	import RoleSelectItem from '~/lib/components/objects/role/RoleSelectItem.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';
	export let node: UserInput | null | undefined;
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
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput | null;
			then: (data: UserInput | null | undefined) => void;
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
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={permissions.auth('User::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('User::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('User::*::WRITE') && showGotoSelectButton}
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
		<FormLoading rows={11} />
	{:else}
		{#if node}
			{#if permissions.auth('User::name::*')}
			<StringItem label={$LL.graphql.objects.User.fields.name.name()} name="name" bind:value={node.name} readonly={!permissions.auth('User::name::WRITE')} errors={errors.name} />
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringItem label={$LL.graphql.objects.User.fields.description.name()} name="description" bind:value={node.description} readonly={!permissions.auth('User::description::WRITE')} errors={errors.description} />
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringItem label={$LL.graphql.objects.User.fields.lastName.name()} name="lastName" bind:value={node.lastName} readonly={!permissions.auth('User::lastName::WRITE')} errors={errors.lastName} />
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringItem label={$LL.graphql.objects.User.fields.login.name()} name="login" bind:value={node.login} readonly={!permissions.auth('User::login::WRITE')} errors={errors.login} />
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringItem label={$LL.graphql.objects.User.fields.email.name()} name="email" bind:value={node.email} readonly={!permissions.auth('User::email::WRITE')} errors={errors.email} />
			{/if}
			{#if permissions.auth('User::avatar::*')}
			<ObjectItem name="avatar"  path={`${node.id}/avatar`} label={$LL.graphql.objects.User.fields.avatar.name()} errors={errors.avatar} on:gotoField />
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringItem label={$LL.graphql.objects.User.fields.phones.name()} name="phones" bind:value={node.phones} readonly={!permissions.auth('User::phones::WRITE')} list errors={errors.phones} />
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanItem label={$LL.graphql.objects.User.fields.disable.name()} name="disable" bind:value={node.disable} readonly={!permissions.auth('User::disable::WRITE')} errors={errors.disable} />
			{/if}
			{#if permissions.auth('User::groups::*')}
			<GroupSelectItem
				name="groups"
				label={$LL.graphql.objects.User.fields.groups.name()}
				errors={errors.groups}
				bind:value={node.groups}
				readonly={!permissions.auth('User::groups::WRITE')}
				list
			/>
			{/if}
			{#if permissions.auth('User::roles::*')}
			<RoleSelectItem
				name="roles"
				label={$LL.graphql.objects.User.fields.roles.name()}
				errors={errors.roles}
				bind:value={node.roles}
				readonly={!permissions.auth('User::roles::WRITE')}
				list
			/>
			{/if}
			{#if permissions.auth('User::realm::*')}
			<ObjectItem name="realm" namedStruct={node.realm} path={`${node.id}/realm`} label={$LL.graphql.objects.User.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	{/if}
</Form>
