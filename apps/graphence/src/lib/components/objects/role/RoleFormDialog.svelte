<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_role_Store } from '~/lib/stores/query/query_role_store';
	import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
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
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };

	const { validate } = validator;
	const { auth } = permissions;
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
			readonly: !auth('Role::name::WRITE'),
			disabled: !auth('Role::name::WRITE'),
			hidden: !auth('Role::name::READ')
		},
		description: {
			readonly: !auth('Role::description::WRITE'),
			disabled: !auth('Role::description::WRITE'),
			hidden: !auth('Role::description::READ')
		},
		users: {
			readonly: !auth('Role::users::WRITE'),
			disabled: !auth('Role::users::WRITE'),
			hidden: !auth('Role::users::READ')
		},
		groups: {
			readonly: !auth('Role::groups::WRITE'),
			disabled: !auth('Role::groups::WRITE'),
			hidden: !auth('Role::groups::READ')
		},
		composites: {
			readonly: !auth('Role::composites::WRITE'),
			disabled: !auth('Role::composites::WRITE'),
			hidden: !auth('Role::composites::READ')
		},
		permissions: {
			readonly: !auth('Role::permissions::WRITE'),
			disabled: !auth('Role::permissions::WRITE'),
			hidden: !auth('Role::permissions::READ')
		},
		realm: {
			readonly: !auth('Role::realm::WRITE'),
			disabled: !auth('Role::realm::WRITE'),
			hidden: !auth('Role::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: RoleInput | null | undefined };
	}>();

	const query_role_Store = createQuery_role_Store($loadEvent);
	const mutation_role_Store = createMutation_role_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName]) {
			query_role_Store
				.fetch({
					id: { opr: 'EQ', val: value.id }
				})
				.then((response) => {
					value = {
						[textFieldName]: response.data?.role?.[textFieldName],
						id: response.data?.role?.id
					};
				});
		} else if (value) {
			text = value[textFieldName] + '';
		}
	}

	const query = () => {
		query_role_Store.fetch({ id: { val: value?.id } }).then((result) => {
			value = result.data?.role;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args)
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
			showSaveButton={!readonly && auth('Role::*::WRITE')}
			showRemoveButton={!readonly && auth('Role::isDeprecated::WRITE')}
			bind:value
			{errors}
			isFetching={$query_role_Store.isFetching}
			isMutating={$mutation_role_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/role/${e.detail.path}`, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
