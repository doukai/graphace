<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import type { Query_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { QueryPermissionConnectionArgs, PermissionOrderBy, MutationPermissionArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_permissionConnection_Store = data.query_permissionConnection_Store as Query_permissionConnection_Store;
	$: nodes = $query_permissionConnection_Store.response.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_permissionConnection_Store.response.data?.permissionConnection?.totalCount || 0;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;
	let args: QueryPermissionConnectionArgs = {};
	let orderBy: PermissionOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_permissionConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationPermissionArgs) => {
		const row = nodes
			?.map((node) => node?.id)
			?.indexOf(args.id || args.where?.id?.val || undefined);
			
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_permission_Store.fetch(args).then((result) => {
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
		<PermissionTable
			showRemoveButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_permissionConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_permission_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Permission::name::WRITE'),
					disabled: !auth('Permission::name::WRITE'),
					hidden: !auth('Permission::name::READ')
				},
				description: {
					readonly: !auth('Permission::description::WRITE'),
					disabled: !auth('Permission::description::WRITE'),
					hidden: !auth('Permission::description::READ')
				},
				field: {
					readonly: !auth('Permission::field::WRITE'),
					disabled: !auth('Permission::field::WRITE'),
					hidden: !auth('Permission::field::READ')
				},
				type: {
					readonly: !auth('Permission::type::WRITE'),
					disabled: !auth('Permission::type::WRITE'),
					hidden: !auth('Permission::type::READ')
				},
				permissionType: {
					readonly: !auth('Permission::permissionType::WRITE'),
					disabled: !auth('Permission::permissionType::WRITE'),
					hidden: !auth('Permission::permissionType::READ')
				},
				roles: {
					readonly: !auth('Permission::roles::WRITE'),
					disabled: !auth('Permission::roles::WRITE'),
					hidden: !auth('Permission::roles::READ')
				},
				realm: {
					readonly: !auth('Permission::realm::WRITE'),
					disabled: !auth('Permission::realm::WRITE'),
					hidden: !auth('Permission::realm::READ')
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						field: { opr: 'LK', val: e.detail.value },
						type: { opr: 'LK', val: e.detail.value },
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
					to(`/${$locale}/permission/${e.detail.value.id}`, e.detail.value.id);
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
			on:create={(e) => to(`/${$locale}/permission/_`, '_')}
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`, e.detail.name)}
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
