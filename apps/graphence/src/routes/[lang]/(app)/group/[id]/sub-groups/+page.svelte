<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors, JsonSchema, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import GroupTableDialog from '~/lib/components/objects/group/GroupTableDialog.svelte';
	import type { Query_group_subGroupsConnection_Store } from '~/lib/stores/query/query_group_subGroupsConnection_store';
	import type { Mutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { GroupInput, MutationGroupArgs, QueryGroupConnectionArgs, GroupOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_group_subGroupsConnection_Store = data.query_group_subGroupsConnection_Store as Query_group_subGroupsConnection_Store;
	$: group = $query_group_subGroupsConnection_Store.response.data?.group;
	$: nodes = $query_group_subGroupsConnection_Store.response.data?.group?.subGroupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_group_subGroupsConnection_Store.response.data?.group?.subGroupsConnection?.totalCount || 0;
	$: mutation_group_subGroups_Store = data.mutation_group_subGroups_Store as Mutation_group_subGroups_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;
	let args: QueryGroupConnectionArgs = {};
	let orderBy: GroupOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};
	let validating = false;

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_group_subGroupsConnection_Store.fetch({ group_id: group?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationGroupArgs) => {
		validating = true;
		validate('Mutation_group_Arguments', args, $locale)
			.then((data) => {
				validating = false;
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
				validating = false;
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const merge = (args: GroupInput[]) => {
		validating = true;
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, subGroups: args }, $locale)
			.then((data) => {
				validating = false;
				errors = {};
				mutation_group_subGroups_Store.fetch({
					group_id: group?.id,
					group_subGroups: args
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
				validating = false;
				console.error(validErrors);
				errors = validErrors.subGroups.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<GroupTable
			showUnbindButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_group_subGroupsConnection_Store.isFetching}
			isMutating={validating || $mutation_group_subGroups_Store.isFetching || $mutation_group_Store.isFetching}
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
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						path: { opr: 'LK', val: e.detail.value },
						parentId: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => query()}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`../../group/${e.detail.value.id}`, e.detail.value.name);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							if (Array.isArray(e.detail.value)) {
								mutation({
									where: { id: { opr: 'IN', arr: e.detail.value.map((node) => node?.id) } },
									isDeprecated: true
								});
							} else {
								mutation({
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								});
							}
							return true;
						}
					});
				}
			}}
			on:unbind={(e) => {
				modal.open({
					title: $LL.graphence.components.modal.unbindModalTitle(),
					confirm: () => {
						if (Array.isArray(e.detail.value)) {
							merge(
								e.detail.value.map((node) => ({
									where: { id: { val: node?.id } },
									isDeprecated: true
								}))
							);
						} else {
							merge([
								{
									where: { id: { val: e.detail.value?.id } },
									isDeprecated: true
								}
							]);
						}
						return true;
					}
				});
			}}
			on:create={(e) => to('../../group/_', '_')}
			on:goto={(e) => to(`../../group/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			<GroupTableDialog
				args={{ not: true, parent: { id: { val: group?.id } } }}
				class="btn-accent"
				on:select={(e) => {
					if (Array.isArray(e.detail.value)) {
						merge(e.detail.value);
					} else {
						merge([e.detail.value]);
					}
				}}
			>
				<Icon slot="sm" src={Plus} class="h-6 w-6" solid />
			</GroupTableDialog>
		</GroupTable>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</CardBody>
</Card>
