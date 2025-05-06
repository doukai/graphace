<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { createQuery_permission_Store } from '~/lib/stores/query/query_permission_store';
	import { createMutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationPermissionArgs, PermissionInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: PermissionInput | null | undefined = {};
	export let errors: Record<string, Errors> = {};
	export let select: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'p-1';
	export { className as class };

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		select: {
			value: PermissionInput | null | undefined;
		};
	}>();

	const query_permission_Store = createQuery_permission_Store(getLoadEvent());
	$: node = $query_permission_Store.response.data?.permission;
	const mutation_permission_Store = createMutation_permission_Store(getLoadEvent());
	let close: () => void;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const query = () => {
		query_permission_Store.fetch({ name: { val: value?.name } }).then((result) => {
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
						dispatch('select', { value: result.data?.permission });
						close();
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};
</script>

<Dialog bind:close>
	<div class="flex items-center" slot="trigger" let:trigger let:zIndex>
		<div class="tooltip hover:z-[{zIndex + 3}]" data-tip={$LL.ui.button.select()}>
			<button
				use:melt={trigger}
				class="btn btn-square btn-outline {className}"
				{disabled}
				on:click={(e) => {
					if (value?.name) {
						query();
					}
				}}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
	</div>
	<svelte:fragment let:zIndex>
		<PermissionForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$mutation_permission_Store.isFetching}
			fields={{
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
			}}
			on:save={(e) => {
				if (e.detail.value) {
					if (select) {
						dispatch('select', { value: e.detail.value });
						close();
					} else {
						mutation(e.detail.value);
					}
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					if (select) {
						dispatch('select', { value: undefined });
						close();
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
