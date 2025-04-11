<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { Query_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
	import type { Mutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_group_parent_Store = data.query_group_parent_Store as Query_group_parent_Store;
	$: group = $query_group_parent_Store.response.data?.group;
	$: node = group?.parent;
	$: mutation_group_parent_Store = data.mutation_group_parent_Store as Mutation_group_parent_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	let value = {};
	let showUnbindButton = false;
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
		showUnbindButton = true;
	}

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
						ot();
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const merge = (args: GroupInput | null) => {
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, parent: args }, $locale)
			.then((data) => {
				errors = {};
				mutation_group_parent_Store.fetch({
					group_id: group?.id,
					group_parent: args
				}).then((result) => {
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
						ot();
					}
				});
			})
			.catch((validErrors) => {
				errors = validErrors.parent.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<GroupForm
			showSaveButton={true}
			{showUnbindButton}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_group_parent_Store.isFetching}
			isMutating={$mutation_group_parent_Store.isFetching || $mutation_group_Store.isFetching}
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
					merge(e.detail.value);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
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
			}}
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						merge(null);
						return true;
					}
				});
			}}
			on:goto={(e) => to(`../../${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>