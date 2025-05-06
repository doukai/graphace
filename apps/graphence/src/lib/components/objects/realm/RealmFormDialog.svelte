<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { createQuery_realm_Store } from '~/lib/stores/query/query_realm_store';
	import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationRealmArgs, RealmInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: RealmInput | null | undefined = {};
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
			value: RealmInput | null | undefined;
		};
	}>();

	const query_realm_Store = createQuery_realm_Store(getLoadEvent());
	$: node = $query_realm_Store.response.data?.realm;
	const mutation_realm_Store = createMutation_realm_Store(getLoadEvent());
	let close: () => void;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const query = () => {
		query_realm_Store.fetch({ id: { val: value?.id } }).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationRealmArgs) => {
		validate('Mutation_realm_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(args).then((result) => {
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
						dispatch('select', { value: result.data?.realm });
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
		<RealmForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_realm_Store.isFetching}
			isMutating={$mutation_realm_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Realm::name::WRITE'),
					disabled: !permissions.auth('Realm::name::WRITE'),
					hidden: !permissions.auth('Realm::name::READ')
				},
				description: {
					readonly: !permissions.auth('Realm::description::WRITE'),
					disabled: !permissions.auth('Realm::description::WRITE'),
					hidden: !permissions.auth('Realm::description::READ')
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
