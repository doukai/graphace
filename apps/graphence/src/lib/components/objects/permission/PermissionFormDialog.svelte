<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
	import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
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
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };

	const { validate } = validator;
	const { auth } = permissions;
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
			readonly: !auth('Permission::name::WRITE'),
			disabled: !auth('Permission::name::WRITE'),
			hidden: !auth('Permission::name::READ')
		},
		description: {
			readonly: !auth('Permission::description::WRITE'),
			disabled: !auth('Permission::description::WRITE'),
			hidden: !auth('Permission::description::READ')
		},
		field: {
			readonly: !auth('Permission::field::WRITE'),
			disabled: !auth('Permission::field::WRITE'),
			hidden: !auth('Permission::field::READ')
		},
		type: {
			readonly: !auth('Permission::type::WRITE'),
			disabled: !auth('Permission::type::WRITE'),
			hidden: !auth('Permission::type::READ')
		},
		permissionType: {
			readonly: !auth('Permission::permissionType::WRITE'),
			disabled: !auth('Permission::permissionType::WRITE'),
			hidden: !auth('Permission::permissionType::READ')
		},
		roles: {
			readonly: !auth('Permission::roles::WRITE'),
			disabled: !auth('Permission::roles::WRITE'),
			hidden: !auth('Permission::roles::READ')
		},
		realm: {
			readonly: !auth('Permission::realm::WRITE'),
			disabled: !auth('Permission::realm::WRITE'),
			hidden: !auth('Permission::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: PermissionInput | null | undefined };
	}>();

	const query_permission_Store = createQuery_permission_Store($loadEvent);
	const mutation_permission_Store = createMutation_permission_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName]) {
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
	<svelte:fragment slot="trigger" let:trigger let:zIndex>
		<div class="tooltip md:hidden" data-tip={text}>
			<button
				use:melt={trigger}
				class="btn {className} max-sm:btn-square"
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
		<button
			use:melt={trigger}
			class="btn {className} max-md:hidden"
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
	</svelte:fragment>
	<svelte:fragment let:zIndex>
		<PermissionForm
			showSaveButton={!readonly && auth('Permission::*::WRITE')}
			showRemoveButton={!readonly && auth('Permission::isDeprecated::WRITE')}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$mutation_permission_Store.isFetching}
			{fields}
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
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
