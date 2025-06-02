<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
	import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { Permission, MutationPermissionArgs, PermissionInput } from '~/lib/types/schema';
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

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
		field?: Option | undefined;
		type?: Option | undefined;
		permissionType?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: {
			readonly: !permissions.auth('Permission::name::WRITE'),
			disabled: !permissions.auth('Permission::name::WRITE'),
			hidden: !permissions.auth('Permission::name::READ')
		},
		description: {
			readonly: !permissions.auth('Permission::description::WRITE'),
			disabled: !permissions.auth('Permission::description::WRITE'),
			hidden: !permissions.auth('Permission::description::READ')
		},
		field: {
			readonly: !permissions.auth('Permission::field::WRITE'),
			disabled: !permissions.auth('Permission::field::WRITE'),
			hidden: !permissions.auth('Permission::field::READ')
		},
		type: {
			readonly: !permissions.auth('Permission::type::WRITE'),
			disabled: !permissions.auth('Permission::type::WRITE'),
			hidden: !permissions.auth('Permission::type::READ')
		},
		permissionType: {
			readonly: !permissions.auth('Permission::permissionType::WRITE'),
			disabled: !permissions.auth('Permission::permissionType::WRITE'),
			hidden: !permissions.auth('Permission::permissionType::READ')
		},
		roles: {
			readonly: !permissions.auth('Permission::roles::WRITE'),
			disabled: !permissions.auth('Permission::roles::WRITE'),
			hidden: !permissions.auth('Permission::roles::READ')
		},
		realm: {
			readonly: !permissions.auth('Permission::realm::WRITE'),
			disabled: !permissions.auth('Permission::realm::WRITE'),
			hidden: !permissions.auth('Permission::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: PermissionInput | null | undefined;
			original: PermissionInput | null | undefined;
		};
	}>();

	const query_permission_Store = createQuery_permission_Store(getLoadEvent());
	const mutation_permission_Store = createMutation_permission_Store(getLoadEvent());
	export let close: (() => void) | undefined = undefined;

 	$: if (value) {
		if (value?.name && !value.where) {
			value = { ...value, where: { name: { val: value.name } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_permission_Store
					.fetch({
						name: { opr: 'EQ', val: value.where?.name?.val }
					})
					.then((response) => {
						value = {
							...response.data?.permission,
							where: { name: { val: response.data?.permission?.name } }
						};
						text = value?.[textFieldName] + '';
					});
			} else {
				text = value?.[textFieldName] + '';
			}
		}
	}

	const query = () => {
		query_permission_Store.fetch({ name: { val: value?.where?.name?.val } }).then((result) => {
			value = result.data?.permission;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						dispatch('select', { value: result.data?.permission, original: args });
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
	<svelte:fragment slot="trigger" let:trigger let:zIndex>
		<div class="tooltip md:hidden" data-tip={text}>
			<button
				use:melt={trigger}
				class="btn {className} max-sm:btn-square"
				{disabled}
				on:click={(e) => {
					if (queryById && value?.name) {
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
		<button
			use:melt={trigger}
			class="btn {className} max-md:hidden"
			{disabled}
			on:click={(e) => {
				if (queryById && value?.name) {
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
	</svelte:fragment>
	<svelte:fragment let:zIndex>
		<PermissionForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$mutation_permission_Store.isFetching}
			{fields}
			on:save={(e) => {
				if (e.detail.value) {
					const original = e.detail.value;
					if (textFieldName) {
						text = original?.[textFieldName] + '';
					}
					value = { ...original, where: { name: { val: original.name } } };
					if (select) {
						dispatch('select', { value, original });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					} else {
						mutation(e.detail.value);
					}
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					const original = e.detail.value;
					text = undefined;
					value = null;
					if (select) {
						dispatch('select', { value, original });
						if (clearAfterSelect) {
							value = {};
						}
						if (close) {
							close();
						}
					} else {
						modal.open({
							title: $LL.graphence.components.modal.removeModalTitle(),
							confirm: () => {
								mutation({
									where: { name: { val: e.detail.value?.name } },
									isDeprecated: true
								});
								return true;
							}
						});
					}
				}
			}}
			on:goto={(e) => to(e.detail.path, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
