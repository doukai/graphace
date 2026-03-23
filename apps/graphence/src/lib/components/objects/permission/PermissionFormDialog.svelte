<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal, type TabInfo } from '@graphace/ui';
	import { createQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
	import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { PermissionFields, PermissionFieldsArgs } from '~/lib/components/objects/permission/PermissionOption';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { Permission, QueryPermissionArgs, MutationPermissionArgs, PermissionInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: PermissionInput | null | undefined = {};
	export let textFieldName: (keyof Permission & keyof PermissionInput) | undefined = undefined;
	export let text: string | undefined = undefined;
	export let errors: Record<string, Errors> = {};
	export let select: boolean | undefined = false;
	export let queryById: boolean | undefined = false;
	export let clearAfterSelect: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryPermissionArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;
	export let tab: string | undefined = undefined;
	export let fields: PermissionFields | undefined = undefined;
	export let fieldsPatch: PermissionFields | undefined = undefined;
	export let fieldsArgs: PermissionFieldsArgs | undefined = undefined;

	const { validate } = validator;
	const { auth } = permissions;

	const dispatch = createEventDispatcher<{
		select: { value: PermissionInput | null | undefined };
	}>();

	const query_permission_Store = createQuery_permission_Store($loadEvent);
	const mutation_permission_Store = createMutation_permission_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName] && value.id) {
			query_permission_Store
				.fetch({
					id: { opr: 'EQ', val: value.id }
				})
				.then((response) => {
					value = {
						[textFieldName]: response.data?.permission?.[textFieldName],
						id: response.data?.permission?.id
					};
				});
		} else if (value) {
			text = value[textFieldName] + '';
		} else {
			text = undefined;
		}
	}

	const query = () => {
		query_permission_Store.fetch({ id: { val: value?.id } }).then((result) => {
			value = result.data?.permission;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						dispatch('select', { value: result.data?.permission });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Dialog bind:close>
	<div class="tooltip" data-tip={text} slot="trigger" let:trigger let:zIndex>
		<button
			use:melt={trigger}
			class="btn truncate {className} max-sm:hidden"
			{disabled}
			on:click={(e) => {
				if (queryById && value?.id) {
					query();
				}
			}}
		>
			<slot>
				{#if text}
					{text}
				{:else}
					{$LL.ui.button.select()}
				{/if}
			</slot>
		</button>
		<button
			use:melt={trigger}
			class="btn btn-square {className} sm:hidden"
			{disabled}
			on:click={(e) => {
				if (queryById && value?.id) {
					query();
				}
			}}
		>
			<slot name="sm">
				{#if text}
					{text}
				{:else}
					{$LL.ui.button.select()}
				{/if}
			</slot>
		</button>
	</div>
	<svelte:fragment let:zIndex>
		<PermissionForm
			showSaveButton={!readonly && auth('Permission::*::WRITE')}
			showRemoveButton={!readonly && auth('Permission::isDeprecated::WRITE')}
			{value}
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$mutation_permission_Store.isFetching}
			{tabs}
			{tab}
			{fields}
			{fieldsPatch}
			{fieldsArgs}
			on:save={(e) => {
				if (select) {
					dispatch('select', { value });
					if (clearAfterSelect) {
						value = {};
					}
					if (close) {
						close();
					}
				} else if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:remove={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.removeModalTitle(),
					confirm: () => {
						text = undefined;
						value = null;
						if (select) {
							dispatch('select', { value });
							if (clearAfterSelect) {
								value = {};
							}
							if (close) {
								close();
							}
						} else if (e.detail.value) {
							mutation({
								where: { id: { val: e.detail.value.id } },
								isDeprecated: true
							});
						}
						return true;
					}
				});
			}}
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`)}
		/>
	</svelte:fragment>
</Dialog>
