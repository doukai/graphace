<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { ot, to, canBack, Card, CardBody, Pagination, toast, modal } from '@graphace/ui';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import type { Query_role_permissionsConnection_Store } from '~/lib/stores/query/query_role_permissionsConnection_store';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { PermissionInput, MutationPermissionArgs, QueryPermissionConnectionArgs, PermissionOrderBy } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_role_permissionsConnection_Store = data.query_role_permissionsConnection_Store as Query_role_permissionsConnection_Store;
	$: role = $query_role_permissionsConnection_Store.response.data?.role;
	$: nodes = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_role_permissionsConnection_Store.response.data?.role?.permissionsConnection?.totalCount || 0;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;
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
		query_role_permissionsConnection_Store.fetch({ role_id: role?.id, ...buildArguments(args) }).then((result) => {
			if (result.errors) {
				console.error(errors);
				toast.error($LL.graphence.message.requestFailed());
			} else {
				errors = {};
			}
		});
	};

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
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

	const merge = (args: PermissionInput[]) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, permissions: args })
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store.fetch({
					role_id: role?.id,
					role_permissions: args
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
				errors = validErrors.permissions.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<PermissionTable
			showUnbindButton
			showEditButton
			showCreateButton
			showBackButton={$canBack}
			showSearchInput
			value={nodes}
			bind:args
			bind:orderBy
			{errors}
			isFetching={$query_role_permissionsConnection_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_permissions_Store.isFetching || $mutation_permission_Store.isFetching}
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
			on:create={(e) => to(`/${$locale}/role/${role?.id}/permissions/_`, '_')}
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		>
			<PermissionTableDialog
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
			</PermissionTableDialog>
		</PermissionTable>
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
