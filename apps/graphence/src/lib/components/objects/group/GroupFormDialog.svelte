<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_group_Store } from '~/lib/stores/query/query_group_store';
	import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import { getLoadEvent } from '~/utils';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { Group, MutationGroupArgs, GroupInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: GroupInput | null | undefined = {};
	export let textFieldName: (keyof Group & keyof GroupInput) | undefined = undefined;
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
		path?: Option | undefined;
		deep?: Option | undefined;
		parentId?: Option | undefined;
		parent?: Option | undefined;
		subGroups?: Option | undefined;
		users?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
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
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: GroupInput | null | undefined;
			original: GroupInput | null | undefined;
		};
	}>();

	const query_group_Store = createQuery_group_Store(getLoadEvent());
	const mutation_group_Store = createMutation_group_Store(getLoadEvent());
	export let close: (() => void) | undefined = undefined;

 	$: if (value) {
		if (value?.id && !value.where) {
			value = { ...value, where: { id: { val: value.id } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_group_Store
					.fetch({
						id: { opr: 'EQ', val: value.where?.id?.val }
					})
					.then((response) => {
						value = {
							...response.data?.group,
							where: { id: { val: response.data?.group?.id } }
						};
						text = value?.[textFieldName] + '';
					});
			} else {
				text = value?.[textFieldName] + '';
			}
		}
	}

	const query = () => {
		query_group_Store.fetch({ id: { val: value?.where?.id?.val } }).then((result) => {
			value = result.data?.group;
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
						dispatch('select', { value: result.data?.group, original: args });
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
		<GroupForm
			showSaveButton={!readonly}
			showRemoveButton={!readonly}
			bind:value
			{errors}
			isFetching={$query_group_Store.isFetching}
			isMutating={$mutation_group_Store.isFetching}
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
