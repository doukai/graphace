<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import type { Query_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { QueryRoleConnectionArgs, RoleOrderBy, MutationRoleArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_roleConnection_Store = data.query_roleConnection_Store as Query_roleConnection_Store;
	$: nodes = $query_roleConnection_Store.response.data?.roleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_roleConnection_Store.response.data?.roleConnection?.totalCount || 0;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let args: QueryRoleConnectionArgs = {};
	let orderBy: RoleOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_roleConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationRoleArgs) => {
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_role_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_role_Store.fetch(args).then((result) => {
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
		<RoleTable
			showRemoveButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_roleConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Role::name::WRITE'),
					disabled: !auth('Role::name::WRITE'),
					hidden: !auth('Role::name::READ')
				},
				description: {
					readonly: !auth('Role::description::WRITE'),
					disabled: !auth('Role::description::WRITE'),
					hidden: !auth('Role::description::READ')
				},
				users: {
					readonly: !auth('Role::users::WRITE'),
					disabled: !auth('Role::users::WRITE'),
					hidden: !auth('Role::users::READ')
				},
				groups: {
					readonly: !auth('Role::groups::WRITE'),
					disabled: !auth('Role::groups::WRITE'),
					hidden: !auth('Role::groups::READ')
				},
				composites: {
					readonly: !auth('Role::composites::WRITE'),
					disabled: !auth('Role::composites::WRITE'),
					hidden: !auth('Role::composites::READ')
				},
				permissions: {
					readonly: !auth('Role::permissions::WRITE'),
					disabled: !auth('Role::permissions::WRITE'),
					hidden: !auth('Role::permissions::READ')
				},
				realm: {
					readonly: !auth('Role::realm::WRITE'),
					disabled: !auth('Role::realm::WRITE'),
					hidden: !auth('Role::realm::READ')
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
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
					to(`/${$locale}/role/${e.detail.value.id}`, e.detail.value.name);
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
			on:create={(e) => to(`/${$locale}/role/_`, '_')}
			on:goto={(e) => to(`/${$locale}/role/${e.detail.path}`, e.detail.name)}
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
