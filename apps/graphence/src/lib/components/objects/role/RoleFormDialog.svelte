<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_role_Store } from '~/lib/stores/query/query_role_store';
	import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { Role, MutationRoleArgs, RoleInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: RoleInput | null | undefined = {};
	export let textFieldName: (keyof Role & keyof RoleInput) | undefined = undefined;
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
		users?: Option | undefined;
		groups?: Option | undefined;
		composites?: Option | undefined;
		permissions?: Option | undefined;
		realm?: Option | undefined;
	} = {
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
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: RoleInput | null | undefined;
			original: RoleInput | null | undefined;
		};
	}>();

	const query_role_Store = createQuery_role_Store(getLoadEvent());
	const mutation_role_Store = createMutation_role_Store(getLoadEvent());
	export let close: (() => void) | undefined = undefined;

 	$: if (value) {
		if (value?.id && !value.where) {
			value = { ...value, where: { id: { val: value.id } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_role_Store
					.fetch({
						id: { opr: 'EQ', val: value.where?.id?.val }
					})
					.then((response) => {
						value = {
							...response.data?.role,
							where: { id: { val: response.data?.role?.id } }
						};
						text = value?.[textFieldName] + '';
					});
			} else {
				text = value?.[textFieldName] + '';
			}
		}
	}

	const query = () => {
		query_role_Store.fetch({ id: { val: value?.where?.id?.val } }).then((result) => {
			value = result.data?.role;
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
						dispatch('select', { value: result.data?.role, original: args });
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
		<RoleForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_role_Store.isFetching}
			isMutating={$mutation_role_Store.isFetching}
			{fields}
			on:save={(e) => {
				if (e.detail.value) {
					const original = e.detail.value;
					if (textFieldName) {
						text = original?.[textFieldName] + '';
					}
					value = { ...original, where: { id: { val: original.id } } };
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
