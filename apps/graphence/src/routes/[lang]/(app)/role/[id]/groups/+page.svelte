<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import GroupTableDialog from '~/lib/components/objects/group/GroupTableDialog.svelte';
	import type { Query_role_groupsConnection_Store } from '~/lib/stores/query/query_role_groupsConnection_store';
	import type { Mutation_role_groups_Store } from '~/lib/stores/mutation/mutation_role_groups_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { GroupInput, MutationGroupArgs, QueryGroupConnectionArgs, GroupOrderBy } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_role_groupsConnection_Store = data.query_role_groupsConnection_Store as Query_role_groupsConnection_Store;
	$: role = $query_role_groupsConnection_Store.response.data?.role;
	$: nodes = $query_role_groupsConnection_Store.response.data?.role?.groupsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_groupsConnection_Store.response.data?.role?.groupsConnection?.totalCount || 0;
	$: mutation_role_groups_Store = data.mutation_role_groups_Store as Mutation_role_groups_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;
	let args: QueryGroupConnectionArgs = {};
	let orderBy: GroupOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_role_groupsConnection_Store.fetch({ role_id: role?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
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
						ot();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};

	const merge = (args: GroupInput[]) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, groups: args })
			.then((data) => {
				errors = {};
				mutation_role_groups_Store.fetch({
					role_id: role?.id,
					role_groups: args
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
				console.error(validErrors);
				errors = validErrors.groups.iterms;
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
			isFetching={$query_role_groupsConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_groups_Store.isFetching || $mutation_group_Store.isFetching}
			fields={{
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
			on:query={(e) => {
				args = e.detail.args;
				orderBy = e.detail.orderBy;
				query();
			}}
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
				args={{ not: true, roles: { id: { val: role?.id } } }}
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
