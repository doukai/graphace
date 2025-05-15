<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { createQuery_role_Store } from '~/lib/stores/query/query_role_store';
	import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationRoleArgs, RoleInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: RoleInput | null | undefined = {};
	export let triggerErrors: Errors | undefined = undefined;
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
			value: RoleInput | null | undefined;
		};
	}>();

	const query_role_Store = createQuery_role_Store(getLoadEvent());
	$: node = $query_role_Store.response.data?.role;
	const mutation_role_Store = createMutation_role_Store(getLoadEvent());
	let close: () => void;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const query = () => {
		query_role_Store.fetch({ id: { val: value?.id } }).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_role_Store.fetch(args).then((result) => {
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
						dispatch('select', { value: result.data?.role });
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
	<div class="flex space-x-1 items-center" slot="trigger" let:trigger let:zIndex>
		<div
			class="tooltip {triggerErrors ? 'tooltip-open tooltip-error ' : ''} hover:z-[{zIndex + 3}]"
			data-tip={triggerErrors
				? triggerErrors?.errors?.map((error) => error.message).join(', ')
				: $LL.ui.button.select()}
		>
			<button
				use:melt={trigger}
				class="btn btn-square btn-outline {className}"
				{disabled}
				on:click={(e) => {
					if (value?.id) {
						query();
					}
				}}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
		<slot/>
	</div>
	<svelte:fragment let:zIndex>
		<RoleForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_role_Store.isFetching}
			isMutating={$mutation_role_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Role::name::WRITE'),
					disabled: !permissions.auth('Role::name::WRITE'),
					hidden: !permissions.auth('Role::name::READ')
				},
				description: {
					readonly: !permissions.auth('Role::description::WRITE'),
					disabled: !permissions.auth('Role::description::WRITE'),
					hidden: !permissions.auth('Role::description::READ')
				},
				users: {
					readonly: !permissions.auth('Role::users::WRITE'),
					disabled: !permissions.auth('Role::users::WRITE'),
					hidden: !permissions.auth('Role::users::READ')
				},
				groups: {
					readonly: !permissions.auth('Role::groups::WRITE'),
					disabled: !permissions.auth('Role::groups::WRITE'),
					hidden: !permissions.auth('Role::groups::READ')
				},
				composites: {
					readonly: !permissions.auth('Role::composites::WRITE'),
					disabled: !permissions.auth('Role::composites::WRITE'),
					hidden: !permissions.auth('Role::composites::READ')
				},
				permissions: {
					readonly: !permissions.auth('Role::permissions::WRITE'),
					disabled: !permissions.auth('Role::permissions::WRITE'),
					hidden: !permissions.auth('Role::permissions::READ')
				},
				realm: {
					readonly: !permissions.auth('Role::realm::WRITE'),
					disabled: !permissions.auth('Role::realm::WRITE'),
					hidden: !permissions.auth('Role::realm::READ')
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
									where: { id: { val: e.detail.value?.id } },
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
