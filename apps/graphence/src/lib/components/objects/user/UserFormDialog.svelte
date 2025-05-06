<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { createQuery_user_Store } from '~/lib/stores/query/query_user_store';
	import { createMutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationUserArgs, UserInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: UserInput | null | undefined = {};
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
			value: UserInput | null | undefined;
		};
	}>();

	const query_user_Store = createQuery_user_Store(getLoadEvent());
	$: node = $query_user_Store.response.data?.user;
	const mutation_user_Store = createMutation_user_Store(getLoadEvent());
	let close: () => void;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const query = () => {
		query_user_Store.fetch({ id: { val: value?.id } }).then((result) => {
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
						dispatch('select', { value: result.data?.user });
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
					if (value?.id) {
						query();
					}
				}}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
	</div>
	<svelte:fragment let:zIndex>
		<UserForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_user_Store.isFetching}
			isMutating={$mutation_user_Store.isFetching}
			fields={{
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
