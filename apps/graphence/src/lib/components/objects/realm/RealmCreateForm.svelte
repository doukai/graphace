<script lang="ts">
	import { createEventDispatcher, getContext  } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RealmInput } from '~/lib/types/schema';

	export let node: RealmInput = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		mutation: {
			args: RealmInput;
			then: (data: RealmInput | null | undefined) => void;
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
	title={$LL.graphql.objects.Realm.name()}
	showRemoveButton={permissions.auth('Realm::*::WRITE') && showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
	on:gotoSelect
	on:back
>
	{#if permissions.auth('Realm::name::*')}
	<StringItem label={$LL.graphql.objects.Realm.fields.name.name()} name="name" bind:value={node.name} readonly={!permissions.auth('Realm::name::WRITE')} errors={errors.name} />
	{/if}
	{#if permissions.auth('Realm::description::*')}
	<StringItem label={$LL.graphql.objects.Realm.fields.description.name()} name="description" bind:value={node.description} readonly={!permissions.auth('Realm::description::WRITE')} errors={errors.description} />
	{/if}
</Form>