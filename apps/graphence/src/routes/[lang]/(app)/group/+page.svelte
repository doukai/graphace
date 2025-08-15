<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import type { Query_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { QueryGroupConnectionArgs, GroupOrderBy, MutationGroupArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_groupConnection_Store = data.query_groupConnection_Store as Query_groupConnection_Store;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;
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
		query_groupConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationGroupArgs) => {
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_group_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError,
								confirm: () => {
									query();
									return true;
								}
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						query();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};
</script>

<Card>
	<CardBody>
		<GroupTable
			showRemoveButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_groupConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_group_Store.isFetching}
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
					to(`/${$locale}/group/${e.detail.value.id}`, e.detail.value.name);
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
			on:create={(e) => to(`/${$locale}/group/_`, '_')}
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`, e.detail.name)}
		/>
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
