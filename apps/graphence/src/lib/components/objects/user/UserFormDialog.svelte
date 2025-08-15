<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_user_Store } from '~/lib/stores/query/query_user_store';
	import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
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
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };

	const { validate } = validator;
	const { auth } = permissions;
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
			readonly: !auth('User::name::WRITE'),
			disabled: !auth('User::name::WRITE'),
			hidden: !auth('User::name::READ')
		},
		description: {
			readonly: !auth('User::description::WRITE'),
			disabled: !auth('User::description::WRITE'),
			hidden: !auth('User::description::READ')
		},
		lastName: {
			readonly: !auth('User::lastName::WRITE'),
			disabled: !auth('User::lastName::WRITE'),
			hidden: !auth('User::lastName::READ')
		},
		login: {
			readonly: !auth('User::login::WRITE'),
			disabled: !auth('User::login::WRITE'),
			hidden: !auth('User::login::READ')
		},
		email: {
			readonly: !auth('User::email::WRITE'),
			disabled: !auth('User::email::WRITE'),
			hidden: !auth('User::email::READ')
		},
		phones: {
			readonly: !auth('User::phones::WRITE'),
			disabled: !auth('User::phones::WRITE'),
			hidden: !auth('User::phones::READ')
		},
		disable: {
			readonly: !auth('User::disable::WRITE'),
			disabled: !auth('User::disable::WRITE'),
			hidden: !auth('User::disable::READ')
		},
		groups: {
			readonly: !auth('User::groups::WRITE'),
			disabled: !auth('User::groups::WRITE'),
			hidden: !auth('User::groups::READ')
		},
		roles: {
			readonly: !auth('User::roles::WRITE'),
			disabled: !auth('User::roles::WRITE'),
			hidden: !auth('User::roles::READ')
		},
		realm: {
			readonly: !auth('User::realm::WRITE'),
			disabled: !auth('User::realm::WRITE'),
			hidden: !auth('User::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: UserInput | null | undefined };
	}>();

	const query_user_Store = createQuery_user_Store($loadEvent);
	const mutation_user_Store = createMutation_user_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName]) {
			query_user_Store
				.fetch({
					id: { opr: 'EQ', val: value.id }
				})
				.then((response) => {
					value = {
						[textFieldName]: response.data?.user?.[textFieldName],
						id: response.data?.user?.id
					};
				});
		} else if (value) {
			text = value[textFieldName] + '';
		}
	}

	const query = () => {
		query_user_Store.fetch({ id: { val: value?.id } }).then((result) => {
			value = result.data?.user;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationUserArgs) => {
		validate('Mutation_user_Arguments', args)
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
						dispatch('select', { value: result.data?.user });
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
			showSaveButton={!readonly && auth('User::*::WRITE')}
			showRemoveButton={!readonly && auth('User::isDeprecated::WRITE')}
			bind:value
			{errors}
			isFetching={$query_user_Store.isFetching}
			isMutating={$mutation_user_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/user/${e.detail.path}`, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
