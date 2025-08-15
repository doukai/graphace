<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors } from '@graphace/commons';
	import { to, Dialog, toast, modal } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_group_Store } from '~/lib/stores/query/query_group_store';
	import { createMutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import {
		loadEvent,
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
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
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };

	const { validate } = validator;
	const { auth } = permissions;
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
			readonly: !auth('Group::name::WRITE'),
			disabled: !auth('Group::name::WRITE'),
			hidden: !auth('Group::name::READ')
		},
		description: {
			readonly: !auth('Group::description::WRITE'),
			disabled: !auth('Group::description::WRITE'),
			hidden: !auth('Group::description::READ')
		},
		path: {
			readonly: !auth('Group::path::WRITE'),
			disabled: !auth('Group::path::WRITE'),
			hidden: !auth('Group::path::READ')
		},
		deep: {
			readonly: !auth('Group::deep::WRITE'),
			disabled: !auth('Group::deep::WRITE'),
			hidden: !auth('Group::deep::READ')
		},
		parentId: {
			readonly: !auth('Group::parentId::WRITE'),
			disabled: !auth('Group::parentId::WRITE'),
			hidden: !auth('Group::parentId::READ')
		},
		parent: {
			readonly: !auth('Group::parent::WRITE'),
			disabled: !auth('Group::parent::WRITE'),
			hidden: !auth('Group::parent::READ')
		},
		subGroups: {
			readonly: !auth('Group::subGroups::WRITE'),
			disabled: !auth('Group::subGroups::WRITE'),
			hidden: !auth('Group::subGroups::READ')
		},
		users: {
			readonly: !auth('Group::users::WRITE'),
			disabled: !auth('Group::users::WRITE'),
			hidden: !auth('Group::users::READ')
		},
		roles: {
			readonly: !auth('Group::roles::WRITE'),
			disabled: !auth('Group::roles::WRITE'),
			hidden: !auth('Group::roles::READ')
		},
		realm: {
			readonly: !auth('Group::realm::WRITE'),
			disabled: !auth('Group::realm::WRITE'),
			hidden: !auth('Group::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: GroupInput | null | undefined };
	}>();

	const query_group_Store = createQuery_group_Store($loadEvent);
	const mutation_group_Store = createMutation_group_Store($loadEvent);
	export let close: (() => void) | undefined = undefined;

 	$: if (textFieldName) {
		if (value && !value?.[textFieldName]) {
			query_group_Store
				.fetch({
					id: { opr: 'EQ', val: value.id }
				})
				.then((response) => {
					value = {
						[textFieldName]: response.data?.group?.[textFieldName],
						id: response.data?.group?.id
					};
				});
		} else if (value) {
			text = value[textFieldName] + '';
		}
	}

	const query = () => {
		query_group_Store.fetch({ id: { val: value?.id } }).then((result) => {
			value = result.data?.group;
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const mutation = (args: MutationGroupArgs) => {
		validate('Mutation_group_Arguments', args)
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
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`, e.detail.name)}
		/>
	</svelte:fragment>
</Dialog>
