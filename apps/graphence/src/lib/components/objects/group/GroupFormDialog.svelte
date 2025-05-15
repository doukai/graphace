<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { createQuery_group_Store } from '~/lib/stores/query/query_group_store';
	import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { MutationGroupArgs, GroupInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: GroupInput | null | undefined = {};
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
			value: GroupInput | null | undefined;
		};
	}>();

	const query_group_Store = createQuery_group_Store(getLoadEvent());
	$: node = $query_group_Store.response.data?.group;
	const mutation_group_Store = createMutation_group_Store(getLoadEvent());
	let close: () => void;

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const query = () => {
		query_group_Store.fetch({ id: { val: value?.id } }).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationGroupArgs) => {
		validate('Mutation_group_Arguments', args, $locale)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(args).then((result) => {
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
						dispatch('select', { value: result.data?.group });
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
		<GroupForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_group_Store.isFetching}
			isMutating={$mutation_group_Store.isFetching}
			fields={{
				name: {
					readonly: !permissions.auth('Group::name::WRITE'),
					disabled: !permissions.auth('Group::name::WRITE'),
					hidden: !permissions.auth('Group::name::READ')
				},
				description: {
					readonly: !permissions.auth('Group::description::WRITE'),
					disabled: !permissions.auth('Group::description::WRITE'),
					hidden: !permissions.auth('Group::description::READ')
				},
				path: {
					readonly: !permissions.auth('Group::path::WRITE'),
					disabled: !permissions.auth('Group::path::WRITE'),
					hidden: !permissions.auth('Group::path::READ')
				},
				deep: {
					readonly: !permissions.auth('Group::deep::WRITE'),
					disabled: !permissions.auth('Group::deep::WRITE'),
					hidden: !permissions.auth('Group::deep::READ')
				},
				parentId: {
					readonly: !permissions.auth('Group::parentId::WRITE'),
					disabled: !permissions.auth('Group::parentId::WRITE'),
					hidden: !permissions.auth('Group::parentId::READ')
				},
				parent: {
					readonly: !permissions.auth('Group::parent::WRITE'),
					disabled: !permissions.auth('Group::parent::WRITE'),
					hidden: !permissions.auth('Group::parent::READ')
				},
				subGroups: {
					readonly: !permissions.auth('Group::subGroups::WRITE'),
					disabled: !permissions.auth('Group::subGroups::WRITE'),
					hidden: !permissions.auth('Group::subGroups::READ')
				},
				users: {
					readonly: !permissions.auth('Group::users::WRITE'),
					disabled: !permissions.auth('Group::users::WRITE'),
					hidden: !permissions.auth('Group::users::READ')
				},
				roles: {
					readonly: !permissions.auth('Group::roles::WRITE'),
					disabled: !permissions.auth('Group::roles::WRITE'),
					hidden: !permissions.auth('Group::roles::READ')
				},
				realm: {
					readonly: !permissions.auth('Group::realm::WRITE'),
					disabled: !permissions.auth('Group::realm::WRITE'),
					hidden: !permissions.auth('Group::realm::READ')
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
