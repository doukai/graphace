<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema, PermissionsStore} from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, add, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import GroupTable from '~/lib/components/objects/group/GroupTable.svelte';
	import type { Query_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import type { QueryGroupConnectionArgs, MutationGroupArgs } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
	const permissions = getContext<PermissionsStore>('permissions');

	$: query_groupConnection_Store = data.query_groupConnection_Store as Query_groupConnection_Store;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (args: QueryGroupConnectionArgs) => {
		query_groupConnection_Store.fetch(args).then((result) => {
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
		validate('Mutation_group_Arguments', args, $locale)
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
									query({ first: pageSize, offset: 0 });
									return true;
								}
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						query({ first: pageSize, offset: (pageNumber - 1) * pageSize });
					}
				});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};
</script>

<Card>
	<CardBody>
		<GroupTable
			showRemoveButton={true}
			showEditButton={true}
			showCreateButton={true}
			showBackButton={$canBack}
			value={nodes}
			{errors}
			isFetching={$query_groupConnection_Store.isFetching}
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
					query({
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						path: { opr: 'LK', val: e.detail.value },
						parentId: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					});
				} else {
					query({ first: pageSize, offset: 0 });
				}
			}}
			on:query={(e) => {
				e.detail.args = buildArguments(e.detail.args);
				if (Object.keys(e.detail.orderBy).length > 0) {
					e.detail.args.orderBy = e.detail.orderBy;
				}
				query(e.detail.args);
			}}
			on:save={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					mutation(e.detail.value);
				}
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`./group/${e.detail.value.id}`);
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
			on:create={(e) => to('./group/_')}
			on:goto={(e) => {
				if (Array.isArray(e.detail.path)) {
					add(`./group/${e.detail.path[0].path}`, e.detail.path[0].name);
					to(`./group/${e.detail.path[1].path}`, e.detail.path[1].name);
				}
			}}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query({ first: pageSize, offset: (pageNumber - 1) * pageSize })}
			on:sizeChange={(e) => query({ first: pageSize, offset: 0 })}
		/>
	</CardBody>
</Card>
