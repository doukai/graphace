<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction, GraphQLErrorsFunction } from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { FileInput } from '~/lib/types/schema';
	export let node: FileInput | null | undefined;
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
			args: FileInput;
			then: (data: FileInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: FileInput | null;
			then: (data: FileInput | null | undefined) => void;
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
	title={$LL.graphql.objects.File.name()}
	showRemoveButton={permissions.auth('File::*::WRITE') && showRemoveButton}
	showUnbindButton={permissions.auth('File::*::WRITE') && showUnbindButton}
	showGotoSelectButton={permissions.auth('File::*::WRITE') && showGotoSelectButton}
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
		<FormLoading rows={4} />
	{:else}
		{#if node}
			{#if permissions.auth('File::name::*')}
			<StringItem label={$LL.graphql.objects.File.fields.name.name()} name="name" bind:value={node.name} readonly={!permissions.auth('File::name::WRITE')} errors={errors.name} />
			{/if}
			{#if permissions.auth('File::contentType::*')}
			<StringItem label={$LL.graphql.objects.File.fields.contentType.name()} name="contentType" bind:value={node.contentType} readonly={!permissions.auth('File::contentType::WRITE')} errors={errors.contentType} />
			{/if}
			{#if permissions.auth('File::content::*')}
			<StringItem label={$LL.graphql.objects.File.fields.content.name()} name="content" bind:value={node.content} readonly={!permissions.auth('File::content::WRITE')} errors={errors.content} />
			{/if}
			{#if permissions.auth('File::url::*')}
			<StringItem label={$LL.graphql.objects.File.fields.url.name()} name="url" bind:value={node.url} readonly={!permissions.auth('File::url::WRITE')} errors={errors.url} />
			{/if}
		{/if}
	{/if}
</Form>
