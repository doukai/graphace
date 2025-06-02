<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_user_Store } from '~/lib/stores/query/query_user_store';
	import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { User, MutationUserArgs, UserInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: UserInput | null | undefined = {};
	export let textFieldName: (keyof User & keyof UserInput) | undefined = undefined;
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
		lastName?: Option | undefined;
		login?: Option | undefined;
		email?: Option | undefined;
		phones?: Option | undefined;
		disable?: Option | undefined;
		groups?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: {
			readonly: !permissions.auth('User::name::WRITE'),
			disabled: !permissions.auth('User::name::WRITE'),
			hidden: !permissions.auth('User::name::READ')
		},
		description: {
			readonly: !permissions.auth('User::description::WRITE'),
			disabled: !permissions.auth('User::description::WRITE'),
			hidden: !permissions.auth('User::description::READ')
		},
		lastName: {
			readonly: !permissions.auth('User::lastName::WRITE'),
			disabled: !permissions.auth('User::lastName::WRITE'),
			hidden: !permissions.auth('User::lastName::READ')
		},
		login: {
			readonly: !permissions.auth('User::login::WRITE'),
			disabled: !permissions.auth('User::login::WRITE'),
			hidden: !permissions.auth('User::login::READ')
		},
		email: {
			readonly: !permissions.auth('User::email::WRITE'),
			disabled: !permissions.auth('User::email::WRITE'),
			hidden: !permissions.auth('User::email::READ')
		},
		phones: {
			readonly: !permissions.auth('User::phones::WRITE'),
			disabled: !permissions.auth('User::phones::WRITE'),
			hidden: !permissions.auth('User::phones::READ')
		},
		disable: {
			readonly: !permissions.auth('User::disable::WRITE'),
			disabled: !permissions.auth('User::disable::WRITE'),
			hidden: !permissions.auth('User::disable::READ')
		},
		groups: {
			readonly: !permissions.auth('User::groups::WRITE'),
			disabled: !permissions.auth('User::groups::WRITE'),
			hidden: !permissions.auth('User::groups::READ')
		},
		roles: {
			readonly: !permissions.auth('User::roles::WRITE'),
			disabled: !permissions.auth('User::roles::WRITE'),
			hidden: !permissions.auth('User::roles::READ')
		},
		realm: {
			readonly: !permissions.auth('User::realm::WRITE'),
			disabled: !permissions.auth('User::realm::WRITE'),
			hidden: !permissions.auth('User::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: UserInput | null | undefined;
			original: UserInput | null | undefined;
		};
	}>();

	const query_user_Store = createQuery_user_Store(getLoadEvent());
	const mutation_user_Store = createMutation_user_Store(getLoadEvent());
	export let close: (() => void) | undefined = undefined;

 	$: if (value) {
		if (value?.id && !value.where) {
			value = { ...value, where: { id: { val: value.id } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_user_Store
					.fetch({
						id: { opr: 'EQ', val: value.where?.id?.val }
					})
					.then((response) => {
						value = {
							...response.data?.user,
							where: { id: { val: response.data?.user?.id } }
						};
						text = value?.[textFieldName] + '';
					});
			} else {
				text = value?.[textFieldName] + '';
			}
		}
	}

	const query = () => {
		query_user_Store.fetch({ id: { val: value?.where?.id?.val } }).then((result) => {
			value = result.data?.user;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationUserArgs) => {
		validate('Mutation_user_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_user_Store.fetch(args).then((result) => {
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
						dispatch('select', { value: result.data?.user, original: args });
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
		<UserForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_user_Store.isFetching}
			isMutating={$mutation_user_Store.isFetching}
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
