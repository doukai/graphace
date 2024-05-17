<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RealmInput } from '~/lib/types/schema';
	export let node: RealmInput | null | undefined;
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
			args: RealmInput;
			then: (data: RealmInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: RealmInput | null;
			then: (data: RealmInput | null | undefined) => void;
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
	title={$LL.graphql.objects.Realm.name()}
	showRemoveButton={permissions.auth('Realm::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('Realm::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('Realm::*::WRITE') && showGotoSelectButton}
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
		<FormLoading rows={2} />
	{:else}
		{#if node}
			{#if permissions.auth('Realm::name::*')}
			<StringItem label={$LL.graphql.objects.Realm.fields.name.name()} name="name" bind:value={node.name} readonly={!permissions.auth('Realm::name::WRITE')} errors={errors.name} />
			{/if}
			{#if permissions.auth('Realm::description::*')}
			<StringItem label={$LL.graphql.objects.Realm.fields.description.name()} name="description" bind:value={node.description} readonly={!permissions.auth('Realm::description::WRITE')} errors={errors.description} />
			{/if}
		{/if}
	{/if}
</Form>
